require("dotenv").config();
const mongoose = require("mongoose");
const PrebuiltPC = require("./models/PrebuiltPC");

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/coreforge";

const prebuilts = [
  {
    name: "Starter Forge",
    tier: "Starter",
    specs: { cpu: "AMD Ryzen 5 7600X", gpu: "NVIDIA RTX 4060", ram: "16GB DDR5", storage: "1TB NVMe SSD" },
    price: 74999,
    tagline: "Clean 1080p gaming and everyday work.",
    description:
      "A balanced entry build for smooth 1080p gaming, browsing, and office work. Runs cool and quiet in a compact airflow case.",
    image: "/pc-images/pc_image_1.webp",
  },
  {
    name: "Standard Forge",
    tier: "Standard",
    specs: { cpu: "Intel Core i5-14600K", gpu: "NVIDIA RTX 4070", ram: "32GB DDR5", storage: "1TB NVMe SSD" },
    price: 119999,
    tagline: "1440p gaming and content creation without compromise.",
    description:
      "Handles 1440p gaming at high frame rates and light-to-medium video editing without breaking a sweat.",
    image: "/pc-images/pc_image_2.webp",
  },
  {
    name: "Pro Forge",
    tier: "Pro",
    specs: { cpu: "AMD Ryzen 7 7800X3D", gpu: "NVIDIA RTX 4080 SUPER", ram: "32GB DDR5", storage: "2TB NVMe SSD" },
    price: 189999,
    tagline: "Built for editors, streamers, and serious gamers.",
    description:
      "Built around the gaming-favorite 7800X3D and a 4080 SUPER — smooth 4K gaming, fast exports, and streaming headroom.",
    image: "/pc-images/pc_image_3.avif",
  },
  {
    name: "Elite Forge",
    tier: "Elite",
    specs: { cpu: "Intel Core i9-14900K", gpu: "NVIDIA RTX 4090", ram: "64GB DDR5", storage: "2TB NVMe SSD" },
    price: 329999,
    tagline: "No ceiling. 4K gaming, rendering, and heavy multitasking.",
    description:
      "Our top-tier build for creators and enthusiasts who don't compromise — flagship CPU and GPU, 64GB of RAM, tuned for sustained heavy loads.",
    image: "/pc-images/pc_image_4.avif",
  },
];

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    await PrebuiltPC.deleteMany({});
    await PrebuiltPC.insertMany(prebuilts);
    console.log("Seeded prebuilt PCs");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
