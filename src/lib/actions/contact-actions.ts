"use server";

import { headers } from "next/headers";
import { ID, Query } from "node-appwrite";
import nodemailer from "nodemailer";
import { type ActionResult, failure, success } from "@/lib/server/action-result";
import { appwriteIds, createAdminClient } from "@/lib/server/appwrite";
import { renderContactEmail } from "@/lib/server/email/contact-email";
import { contactMessageSchema } from "@/lib/validations/cms";

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

let transporter: nodemailer.Transporter | null = null;

function mailer() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        type: "OAuth2",
        user: process.env.MAIL_USER,
        clientId: process.env.MAIL_CLIENT_ID,
        clientSecret: process.env.MAIL_CLIENT_SECRET,
        refreshToken: process.env.MAIL_REFRESH_TOKEN,
      },
    });
  }
  return transporter;
}

/**
 * Counts recent submissions from one address in the database rather than in
 * process memory. An in-memory counter is reset by every cold start and is not
 * shared between instances, so on a serverless deployment it limits nothing.
 *
 * Returns true when the sender is over the limit.
 */
async function isRateLimited(fingerprint: string): Promise<boolean> {
  const ids = appwriteIds();
  if (!ids.contactLog) return false;

  const { tables } = await createAdminClient();
  const since = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();

  const recent = await tables.listRows({
    databaseId: ids.database,
    tableId: ids.contactLog,
    queries: [
      Query.equal("fingerprint", fingerprint),
      Query.greaterThan("$createdAt", since),
      Query.limit(RATE_LIMIT_MAX),
      Query.select(["$id"]),
    ],
  });

  if (recent.total >= RATE_LIMIT_MAX) return true;

  await tables.createRow({
    databaseId: ids.database,
    tableId: ids.contactLog,
    rowId: ID.unique(),
    data: { fingerprint },
  });

  void pruneExpired(since);
  return false;
}

/**
 * Drops log rows older than the window. Nothing else reads them, so left alone
 * the table would grow for the life of the site.
 */
async function pruneExpired(cutoff: string) {
  const ids = appwriteIds();
  const tableId = ids.contactLog;
  if (!tableId) return;

  try {
    const { tables } = await createAdminClient();
    const stale = await tables.listRows({
      databaseId: ids.database,
      tableId,
      queries: [Query.lessThan("$createdAt", cutoff), Query.limit(100), Query.select(["$id"])],
    });

    await Promise.all(
      stale.rows.map((row) =>
        tables.deleteRow({ databaseId: ids.database, tableId, rowId: row.$id }),
      ),
    );
  } catch (error) {
    console.error("Could not prune the contact log:", error);
  }
}

/**
 * Sends an enquiry from the public contact form.
 */
export async function sendContactMessage(input: unknown): Promise<ActionResult<undefined>> {
  const parsed = contactMessageSchema.safeParse(input);
  if (!parsed.success) {
    const flattened = parsed.error.flatten();
    return failure("Please check the form", flattened.fieldErrors as Record<string, string[]>);
  }

  const recipient = process.env.MY_MAIL;
  if (!recipient || !process.env.MAIL_USER) {
    console.error("Contact mail is not configured");
    return failure("Contact form is unavailable right now");
  }

  const forwardedFor = (await headers()).get("x-forwarded-for") ?? "unknown";
  const fingerprint = `${forwardedFor.split(",")[0].trim()}|${parsed.data.email.toLowerCase()}`;

  try {
    if (await isRateLimited(fingerprint)) {
      return failure("Too many messages from this address. Please try again later.");
    }

    await mailer().sendMail({
      from: `"Stardom Digital" <${process.env.MAIL_USER}>`,
      to: recipient,
      replyTo: parsed.data.email,
      subject: `New enquiry: ${parsed.data.subject || parsed.data.name}`,
      html: renderContactEmail({
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone ?? "",
        subject: parsed.data.subject ?? "",
        message: parsed.data.message,
      }),
    });

    return success(undefined);
  } catch (error) {
    console.error("Failed to send contact message:", error);
    return failure("Could not send your message. Please email us directly.");
  }
}
