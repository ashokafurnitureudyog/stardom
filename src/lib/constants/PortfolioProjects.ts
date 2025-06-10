import { PortfolioProject } from "@/types/ComponentTypes";

export const PortfolioProjects: PortfolioProject[] = [
  {
    id: "1",
    title: "Chitkara University Academic Block",
    tags: ["Educational", "Architecture", "Interior Design"],
    thumbnail: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3",
    description:
      "Modern academic block design featuring smart classrooms and collaborative spaces.",
    challenge:
      "Design an innovative learning environment that promotes student interaction and technological integration.",
    solution:
      "Implemented flexible learning spaces with modular furniture and state-of-the-art educational technology.",
    impact:
      "Increased student engagement by 40%, received Best Educational Architecture award 2022.",
    testimonial: {
      quote:
        "The new academic block has revolutionized how our students learn and interact.",
      author: "Dr. Madhu Chitkara",
      position: "Pro-Chancellor",
    },
    gallery: [
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1",
      "https://images.unsplash.com/photo-1562774053-701939374585",
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39",
    ],
  },
  {
    id: "2",
    title: "JLPL Commercial Complex",
    tags: ["Commercial", "Architecture", "Mixed Use"],
    thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
    description:
      "Mixed-use commercial complex with retail spaces and corporate offices.",
    challenge:
      "Create a sustainable commercial space that balances modern aesthetics with functionality.",
    solution:
      "Designed an energy-efficient building with green spaces and smart building management systems.",
    impact:
      "100% occupancy within first year, 25% reduction in energy consumption.",
    testimonial: {
      quote:
        "The innovative design has made this complex a landmark in the region.",
      author: "Rajesh Kumar",
      position: "Project Director, JLPL",
    },
    gallery: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00",
      "https://images.unsplash.com/photo-1531973576160-7125cd663d86",
      "https://images.unsplash.com/photo-1497366216548-37526070297c",
    ],
  },
  {
    id: "3",
    title: "Chandigarh University Student Center",
    tags: ["Educational", "Interior Design", "Recreational"],
    thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
    description:
      "Modern student activity center featuring recreational and study spaces.",
    challenge:
      "Design a multi-purpose space that caters to both academic and leisure activities.",
    solution:
      "Created zones for different activities with acoustic separation and flexible furniture.",
    impact: "Serves 5000+ students daily, 95% student satisfaction rate.",
    testimonial: {
      quote: "This space has become the heart of student life on campus.",
      author: "Dr. R.S. Bawa",
      position: "Vice Chancellor",
    },
    gallery: [
      "https://images.unsplash.com/photo-1522071901873-411886a10004",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      "https://images.unsplash.com/photo-1460518451285-97b6aa326961",
    ],
  },
];
