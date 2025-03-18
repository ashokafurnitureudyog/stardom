import { Product } from "@/types/ComponentTypes";

export const mockProducts: Product[] = [
  {
    id: "a7e91f53-1c72-4d74-a64f-c7ba23226e25",
    name: "Vistara Executive Chair",
    description:
      "Premium executive chair with genuine leather upholstery, adjustable lumbar support and advanced tilt mechanism. Made for long work hours with supreme comfort for senior management.",
    category: "chairs",
    collection: "premium",
    images: [
      "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?q=80&w=1000", // Main executive chair image
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=1000", // Side angle of executive chair
      "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?q=80&w=1000", // Detail shot of leather chair
    ],
    features: [
      "Genuine leather upholstery",
      "Pneumatic height adjustment",
      "5-point heavy duty base",
      "Advanced tilt mechanism",
      "High-density cushion",
    ],
    colors: ["Black", "Brown", "Tan"],
  },
  {
    id: "b8d45e20-11c3-48f1-95e3-4fca3bb9264c",
    name: "Indus Conference Table",
    description:
      "Elegant boat-shaped conference table crafted from premium teak wood with wire management system. Ideal for corporate boardrooms accommodating up to 12 executives.",
    category: "tables",
    collection: "premium",
    images: [
      "https://images.unsplash.com/photo-1568992687947-868a62a9f521?q=80&w=1000", // Large conference table
      "https://images.unsplash.com/photo-1598893468037-efa75d8b4fde?q=80&w=1000", // Detail of wooden surface
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000", // Table in use in boardroom
    ],
    features: [
      "Premium teak wood finish",
      "Integrated wire management",
      "Modular power outlets",
      "Boat-shaped design",
      "Scratch-resistant coating",
    ],
    colors: ["Natural Teak", "Mahogany", "Walnut"],
  },
  {
    id: "c9f32a76-5e7d-49c8-b078-22b95d9852a1",
    name: "Trellis Modular Workstation",
    description:
      "Contemporary modular workstation system with 60mm thick partitions and integrated power solutions. Customizable configuration for optimal space utilization in modern offices.",
    category: "workstations",
    collection: "functional",
    images: [
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1000", // Office workstations layout
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1000", // Modular office setup
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1000", // Detail of workspace partition
    ],
    features: [
      "60mm thick acoustic partitions",
      "Integrated power and data ports",
      "Under-desk cable management",
      "Pre-laminated particle board tops",
      "Customizable configurations",
    ],
    colors: ["White/Grey", "Beige/Brown", "Light Oak/White"],
  },
  {
    id: "d2c11f39-81e5-40c7-bd72-e6dd29e9858d",
    name: "Rajasthan Reception Desk",
    description:
      "Contemporary reception counter with stone and wood accents inspired by Rajasthani architecture. Features hidden storage and built-in LED accent lighting.",
    category: "reception",
    collection: "signature",
    images: [
      "https://images.unsplash.com/photo-1560264641-1b5238e5de5b?q=80&w=1000", // Modern reception desk
      "https://images.unsplash.com/photo-1498409785966-ab341407de6e?q=80&w=1000", // Detail of stone/wood accents
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1000", // Reception area with desk
    ],
    features: [
      "Combination of stone and wood elements",
      "Built-in LED accent lighting",
      "Concealed storage compartments",
      "Wire management system",
      "Customizable dimensions",
    ],
    colors: ["Sandstone/Teak", "White Marble/Oak", "Black Granite/Mahogany"],
  },
  {
    id: "e3b04c87-9f12-45e2-a051-7042311fd845",
    name: "Ganga Office Storage System",
    description:
      "Comprehensive storage solution with combination of open shelves, drawers, and cabinets. Heavy-duty steel construction with premium powder coating for durability.",
    category: "storage",
    collection: "functional",
    images: [
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=1000", // Office storage cabinets
      "https://images.unsplash.com/photo-1600494448754-63c8469a2f9e?q=80&w=1000", // Filing drawer closeup
      "https://images.unsplash.com/photo-1595428823442-ebd72a1e80a8?q=80&w=1000", // Office storage in use
    ],
    features: [
      "Heavy-duty steel construction",
      "Anti-rust treatment",
      "Security locking system",
      "Adjustable shelves",
      "Soft-closing drawers",
    ],
    colors: ["Light Grey", "White", "Ivory", "Metallic Grey"],
  },
  {
    id: "f4a53b12-6c21-42a9-be38-c18d752f96e2",
    name: "Himalaya Manager Chair",
    description:
      "Mid-back ergonomic chair with breathable mesh back and high-density foam seat. Perfect for middle management with optimal balance of comfort and value.",
    category: "chairs",
    collection: "ergonomic",
    images: [
      "https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?q=80&w=1000", // Ergonomic office chair
      "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=1000", // Detail of mesh backrest
      "https://images.unsplash.com/photo-1589884629108-3193400c7cc9?q=80&w=1000", // Side view of chair
    ],
    features: [
      "Breathable mesh back",
      "Height-adjustable armrests",
      "Synchronized tilt mechanism",
      "Lumbar support",
      "Nylon wheelbase",
    ],
    colors: ["Black", "Grey", "Blue", "Red"],
  },
  {
    id: "g5d67c29-7e34-47b0-9f15-d283645ad720",
    name: "Mumbai Meeting Table",
    description:
      "Round meeting table with wire management solutions and solid wood legs. Perfect for small team discussions and collaborative sessions up to 6 people.",
    category: "tables",
    collection: "collaborative",
    images: [
      "https://images.unsplash.com/photo-1565954786194-d22afc162b3c?q=80&w=1000", // Round meeting table
      "https://images.unsplash.com/photo-1572025442067-c401c158fcbc?q=80&w=1000", // Detail of table surface
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1000", // Table in meeting room setting
    ],
    features: [
      "Central wire management",
      "25mm thick table top",
      "Solid wood legs",
      "Cable port",
      "Scratch-resistant finish",
    ],
    colors: ["White", "Light Oak", "Mahogany"],
  },
  {
    id: "h6e78d30-8f45-48c1-a027-e394756ad831",
    name: "Asana Office Sofa Set",
    description:
      "Modern office lounge seating with plush cushions and sleek design. Modular components allow for flexible arrangements in reception and waiting areas.",
    category: "lounges",
    collection: "comfort",
    images: [
      "https://images.unsplash.com/photo-1549187774-b4e9b0445b41?q=80&w=1000", // Modern office sofa
      "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?q=80&w=1000", // Detail of upholstery
      "https://images.unsplash.com/photo-1581541234264-28d5fb5964b6?q=80&w=1000", // Modular arrangement
    ],
    features: [
      "High-resilience foam",
      "Stain-resistant fabric",
      "Modular components",
      "Solid wood frame",
      "Heavy-duty legs",
    ],
    colors: ["Navy Blue", "Light Grey", "Charcoal", "Olive Green"],
  },
  {
    id: "i7f89e41-9g56-49d2-b138-f4a5867bc942",
    name: "Lotus Training Room Desk",
    description:
      "Foldable training desk with castors for easy mobility and storage. Features flip-top mechanism to save space when not in use.",
    category: "training",
    collection: "functional",
    images: [
      "https://images.unsplash.com/photo-1517502884422-41eabc9d2ed2?q=80&w=1000", // Training room setup
      "https://images.unsplash.com/photo-1626220674995-c7914b58607e?q=80&w=1000", // Folding mechanism detail
      "https://images.unsplash.com/photo-1522071901873-411886a10004?q=80&w=1000", // Training desks in use
    ],
    features: [
      "Flip-top mechanism",
      "Lockable castors",
      "Powder-coated metal frame",
      "Easy nesting capability",
      "Modesty panel",
    ],
    colors: ["White/Silver", "Beige/Black", "Maple/Black"],
  },
  {
    id: "j8g90f52-0h67-50e3-c249-g5b6978cd053",
    name: "Taj Executive Desk",
    description:
      "Premium executive desk with side storage unit and leather insert top. Handcrafted from seasoned hardwood with detailed craftsmanship for senior executives.",
    category: "desks",
    collection: "premium",
    images: [
      "https://images.unsplash.com/photo-1622148404393-07f5ea5f6b78?q=80&w=1000", // Executive desk front view
      "https://images.unsplash.com/photo-1581167889210-87df33e270cd?q=80&w=1000", // Detail of woodwork
      "https://images.unsplash.com/photo-1497681883844-82b4f0a359a4?q=80&w=1000", // Desk in executive office
    ],
    features: [
      "Leather insert top",
      "Integrated side storage unit",
      "Handcrafted details",
      "Wire management",
      "Lockable drawers",
    ],
    colors: ["Cherry", "Ebony", "Rosewood"],
  },
  {
    id: "k9h01g63-1i78-51f4-d350-h6c7089de164",
    name: "Kaveri Filing Cabinet",
    description:
      "Heavy-duty steel filing cabinet with anti-tilt mechanism and central locking system. Features smooth drawer slides for easy access to documents.",
    category: "storage",
    collection: "functional",
    images: [
      "https://images.unsplash.com/photo-1600494448644-34eccc94e3cd?q=80&w=1000", // Steel filing cabinet
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1000", // Detail of drawer mechanism
      "https://images.unsplash.com/photo-1607604760790-ec3b50856ca3?q=80&w=1000", // Cabinet in office setting
    ],
    features: [
      "Anti-tilt mechanism",
      "Central locking system",
      "Smooth ball-bearing slides",
      "Label holders",
      "Heavy-duty construction",
    ],
    colors: ["Light Grey", "White", "Black", "Beige"],
  },
  {
    id: "l0i12h74-2j89-52g5-e461-i7d8190ef275",
    name: "Jamuna Glass Partition System",
    description:
      "Modular glass partition system with aluminum frames for creating elegant office divisions. Sound-insulating properties with customizable frosted or clear panels.",
    category: "partitions",
    collection: "modern",
    images: [
      "https://images.unsplash.com/photo-1519742866993-66d3cfef4bbd?q=80&w=1000", // Glass office partitions
      "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?q=80&w=1000", // Detail of glass/frame
      "https://images.unsplash.com/photo-1604480133435-25b86862d276?q=80&w=1000", // Partitions in modern office
    ],
    features: [
      "10mm toughened glass",
      "Aluminum frame system",
      "Sound insulation",
      "Customizable panel opacity",
      "Easy installation",
    ],
    colors: [
      "Clear Glass/Silver",
      "Frosted Glass/Black",
      "Tinted Glass/Silver",
    ],
  },
  {
    id: "m1j23i85-3k90-53h6-f572-j8e9201fg386",
    name: "Brahmaputra Cafeteria Set",
    description:
      "Durable cafeteria furniture set with stain-resistant tables and stackable chairs. Designed for high-traffic corporate cafeterias with easy maintenance.",
    category: "cafeteria",
    collection: "functional",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1000", // Cafeteria furniture set
      "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?q=80&w=1000", // Chairs detail
      "https://images.unsplash.com/photo-1520032628782-58193dcd5ade?q=80&w=1000", // Cafeteria in use
    ],
    features: [
      "Stain-resistant laminate tops",
      "Stackable chairs",
      "High-durability plastic",
      "Easy-clean surfaces",
      "Space-efficient design",
    ],
    colors: ["Orange/White", "Blue/Grey", "Green/White"],
  },
  {
    id: "n2k34j96-4l01-54i7-g683-k9f0312gh497",
    name: "Delhi Director's Chair",
    description:
      "High-back director's chair with premium full-grain leather and polished aluminum base. Features synchronized tilt mechanism and adjustable headrest.",
    category: "chairs",
    collection: "premium",
    images: [
      "https://images.unsplash.com/photo-1506439752176-3e6fca25403b?q=80&w=1000", // Director's chair
      "https://images.unsplash.com/photo-1670264736611-8650ae116ad5?q=80&w=1000", // Detail of leather finish
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1000", // Chair in executive setting
    ],
    features: [
      "Full-grain leather upholstery",
      "Polished aluminum base",
      "Synchronized tilt mechanism",
      "Adjustable headrest",
      "Memory foam cushion",
    ],
    colors: ["Black", "Burgundy", "Dark Brown"],
  },
  {
    id: "o3l45k07-5m12-55j8-h794-l0g1423hi508",
    name: "Ganges Collaborative Bench",
    description:
      "Open-office collaborative bench system with acoustic privacy panels and integrated power. Promotes team interaction while maintaining personal workspace.",
    category: "workstations",
    collection: "collaborative",
    images: [
      "https://images.unsplash.com/photo-1520032628782-58193dcd5ade?q=80&w=1000", // Collaborative workstations
      "https://images.unsplash.com/photo-1572025442646-866d16c84a54?q=80&w=1000", // Privacy panel detail
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1000", // Bench workstations in use
    ],
    features: [
      "Acoustic privacy panels",
      "Integrated power modules",
      "Shared cable management",
      "Adjustable monitor arms",
      "Customizable configurations",
    ],
    colors: ["White/Blue", "Oak/Grey", "White/Green"],
  },
];
