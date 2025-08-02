import { FAQ, FAQCategory } from "@/types/ComponentTypes";

export const contactPageFaq: FAQ[] = [
  {
    question: "How long does it take to receive my order?",
    answer:
      "Customized products typically take 12-15 days to manufacture. For ready-made pieces from our catalog, delivery usually takes 5-7 days.",
  },
  {
    question: "Do you ship across India?",
    answer:
      "Yes, we provide PAN India shipping through our trusted delivery partners. Shipping charges and times may vary based on your location.",
  },
  {
    question: "Is fitting and assembly included?",
    answer:
      "No, fitting and assembly services are not included by default. You may arrange installation separately if needed.",
  },
];

export const faqCategories: FAQCategory[] = [
  {
    title: "Product & Delivery",
    faqs: [
      {
        question: "What materials do you use?",
        answer:
          "All materials are handpicked and tested thoroughly for durability, aesthetics, and quality assurance before production.",
      },
      {
        question: "What is the warranty on your products?",
        answer:
          "We offer a 1-year comprehensive warranty covering structural integrity, mechanical functionality, and craftsmanship. It includes:\n\n• Manufacturing defects\n• Structural components\n• Mechanical features\n• Surface finishes\n\nRepairs for covered manufacturing defects are provided free of charge during the warranty period.\n\n**Terms & Conditions:** Damage to leatherette, chrome plating, and wooden parts is not covered. Warranty applies only to normal use. Accidents, misuse, and natural disasters are excluded.",
      },
      {
        question: "Is repair service available after purchase?",
        answer:
          "Yes, paid repair services are available in areas where our authorized distributors operate. Please contact support to check service availability in your location.",
      },
      {
        question: "Do you accept bulk orders?",
        answer:
          "Absolutely! We cater to bulk and large-scale orders for offices, events, or institutions. Please reach out to us through our contact channels for personalized assistance and quotations.",
      },
    ],
  },
];
