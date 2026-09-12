import "server-only";

import { cacheLife, cacheTag } from "next/cache";
import { Query } from "node-appwrite";
import type {
  ClientTestimonial,
  CompanyInfo,
  PortfolioProject,
  SocialLink,
  TeamMember,
} from "@/types/ComponentTypes";
import type { HeroMedia } from "@/types/MediaTypes";
import { appwriteIds, createAdminClient } from "./appwrite";

export const HERO_MEDIA_TAG = "hero-media";
export const COMPANY_TAG = "company-info";
export const TESTIMONIALS_TAG = "testimonials";
export const PORTFOLIO_TAG = "portfolio";

const PAGE_SIZE = 100;

type Row = Record<string, unknown>;

async function rows(tableId: string, queries: string[] = []): Promise<Row[]> {
  const { tables } = await createAdminClient();
  const result = await tables.listRows({
    databaseId: appwriteIds().database,
    tableId,
    queries: [Query.limit(PAGE_SIZE), ...queries],
  });
  return result.rows as unknown as Row[];
}

/**
 * Hero slideshow media, in the order the dashboard stores it. Read on the
 * server so the first slide is in the HTML rather than two round trips away.
 */
export async function getHeroMedia(): Promise<HeroMedia[]> {
  "use cache";
  cacheTag(HERO_MEDIA_TAG);
  cacheLife("max");

  const ids = appwriteIds();
  if (!ids.heroMedia) return [];

  return (await rows(ids.heroMedia)).map((row) => ({
    id: row.$id as string,
    type: row.type as HeroMedia["type"],
    src: row.src as string,
    alt: (row.alt as string) || undefined,
    poster: (row.poster as string) || undefined,
    preload: (row.preload as boolean) || undefined,
    webmSrc: (row.webmSrc as string) || undefined,
    lowResSrc: (row.lowResSrc as string) || undefined,
  }));
}

export interface CompanyData {
  companyInfo: CompanyInfo | null;
  socialLinks: SocialLink[];
  teamMembers: TeamMember[];
}

/**
 * Company details, social links and the team, fetched in one pass. The three
 * tables are independent, so they are read concurrently rather than in series.
 */
export async function getCompanyData(): Promise<CompanyData> {
  "use cache";
  cacheTag(COMPANY_TAG);
  cacheLife("max");

  const ids = appwriteIds();
  if (!ids.companyInfo || !ids.socialLinks || !ids.teamMembers) {
    return { companyInfo: null, socialLinks: [], teamMembers: [] };
  }

  const [company, social, team] = await Promise.all([
    rows(ids.companyInfo, [Query.limit(1)]),
    rows(ids.socialLinks),
    rows(ids.teamMembers),
  ]);

  const doc = company[0];

  return {
    companyInfo: doc
      ? ({
          name: doc.name,
          parentCompany: doc.parentCompany,
          established: doc.established,
          address: {
            street: doc.street,
            city: doc.city,
            Country: doc.country,
            zip: doc.zip,
            coordinates: [doc.latitude, doc.longitude] as [number, number],
          },
          hours: { weekday: doc.weekdayHours, sunday: doc.sundayHours },
          phone: doc.phone,
          email: doc.email,
          website: doc.website,
          mapsLink: doc.mapsLink,
        } as CompanyInfo)
      : null,
    socialLinks: social.map((row) => ({
      platform: row.platform as string,
      url: row.url as string,
      id: row.$id as string,
    })) as SocialLink[],
    teamMembers: team.map((row) => ({
      id: row.$id as string,
      name: row.name as string,
      role: row.role as string,
      bio: row.bio as string,
      image: row.image as string,
    })) as TeamMember[],
  };
}

export async function getTestimonials(): Promise<ClientTestimonial[]> {
  "use cache";
  cacheTag(TESTIMONIALS_TAG);
  cacheLife("max");

  const ids = appwriteIds();
  if (!ids.testimonials) return [];

  return (await rows(ids.testimonials)).map((row) => ({
    id: row.$id as string,
    name: row.name as string,
    title: row.title as string,
    location: row.location as string,
    context: row.context as string,
    purchaseDate: row.purchaseDate as string,
    verified: row.verified as boolean,
    quote: row.quote as string,
    img: row.img as string,
  })) as ClientTestimonial[];
}

export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  "use cache";
  cacheTag(PORTFOLIO_TAG);
  cacheLife("max");

  const ids = appwriteIds();
  if (!ids.portfolio) return [];

  return (await rows(ids.portfolio)).map((row) => ({
    id: row.$id as string,
    title: row.title as string,
    tags: (row.tags as string[]) || [],
    thumbnail: row.thumbnail as string,
    description: row.description as string,
    challenge: row.challenge as string,
    solution: row.solution as string,
    impact: row.impact as string,
    testimonial: {
      quote: (row.testimonial_quote as string) || "",
      author: (row.testimonial_author as string) || "",
      position: (row.testimonial_position as string) || "",
    },
    gallery: (row.gallery as string[]) || [],
  }));
}
