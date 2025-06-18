import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { FacilityContentProps, FacilityData } from "@/types/ComponentTypes";

const FacilityContent: React.FC<FacilityContentProps> = ({ facility }) => {
  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
        <span className="font-bold text-neutral-700 dark:text-neutral-200">
          {facility.highlight}
        </span>{" "}
        {facility.description}
      </p>
      <img
        src="https://images.unsplash.com/photo-1598625776361-024551c79cb5"
        alt="Facility showcase"
        className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-cover rounded-xl mt-8"
      />
    </div>
  );
};

const facilitiesData: FacilityData[] = [
  {
    category: "Production",
    title: "State-of-the-Art Manufacturing Unit",
    src: "/images/Workshop/leather-work.jpg",
    highlight: "100,000 sq. ft. of excellence in furniture crafting.",
    description:
      "Our flagship facility combines advanced automation with traditional craftsmanship. Equipped with the latest CNC machinery and robotics-assisted production lines, we ensure precision in every piece we create.",
    content: (
      <FacilityContent
        facility={{
          highlight: "Precision meets innovation.",
          description:
            "Our manufacturing hub features advanced CNC machines, automated assembly lines, and quality control stations. Every piece of furniture passes through multiple stages of careful inspection and refinement.",
        }}
      />
    ),
  },
  {
    category: "Craftsmanship",
    title: "Specialized Workshop Units",
    src: "/images/Workshop/workshop-1.jpg",
    highlight: "Dedicated spaces for master craftsmen.",
    description:
      "Custom workshops where skilled artisans bring unique designs to life. Each unit is equipped with specialized tools and equipment for specific furniture categories.",
    content: (
      <FacilityContent
        facility={{
          highlight: "Where artistry meets expertise.",
          description:
            "Our specialized workshops are where traditional craftsmanship meets modern techniques. Master craftsmen work with precision tools to create distinctive pieces that reflect our commitment to quality.",
        }}
      />
    ),
  },
  {
    category: "Quality",
    title: "Testing and Finishing Center",
    src: "https://images.unsplash.com/photo-1551704065-daae88df2555",
    highlight: "Comprehensive quality assurance facility.",
    description:
      "Dedicated space for final quality checks, material testing, and finishing processes. Every product undergoes rigorous testing before approval.",
    content: (
      <FacilityContent
        facility={{
          highlight: "Excellence in every detail.",
          description:
            "Our testing center ensures each piece meets international quality standards. Advanced finishing equipment and careful inspection processes guarantee superior results.",
        }}
      />
    ),
  },
];

const ManufacturingFacilities: React.FC = () => {
  const cards = facilitiesData.map((facility, index) => (
    <Card key={facility.title} card={facility} index={index} />
  ));

  return (
    <div className="w-full h-full">
      <Carousel items={cards} />
    </div>
  );
};

export default ManufacturingFacilities;
