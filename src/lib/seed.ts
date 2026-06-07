import dbconnect from "@/lib/db";
import Footware from "@/models/Footware"; // Adjust path to where your schema is

export const data = [
    {
        name: "Urban Stride Sneaker - Lunar Grey",
        slug: "urban-stride-sneaker-lunar-grey",
        description: "A sleek white and grey modern sneaker with leather texture details, perfect for everyday streetwear.",
        gender: "Men",
        category: "Sneakers",
        price: 120.0,
        discountPrice: 99.99,
        images: [
            { url: "https://placehold.co/600x600/e2e8f0/1e293b.png?text=Lunar+Grey+1", altText: "Urban Stride Sneaker Front View", isPrimary: true },
            { url: "https://placehold.co/600x600/e2e8f0/1e293b.png?text=Lunar+Grey+2", altText: "Urban Stride Sneaker Side View", isPrimary: false },
            { url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", altText: "360 Degree Spin Video", isPrimary: false }
        ],
        variants: [
            { size: 8, stock: 15, sku: "URB-GRY-M-08" },
            { size: 9, stock: 22, sku: "URB-GRY-M-09" },
            { size: 10, stock: 0, sku: "URB-GRY-M-10" },
        ],
        isActive: true,
    },
    {
        name: "Urban Stride Sneaker - Midnight Black",
        slug: "urban-stride-sneaker-midnight-black",
        description: "All-black modern sneaker with matte finish details, perfect for stealthy streetwear.",
        gender: "Men",
        category: "Sneakers",
        price: 120.0,
        images: [
            { url: "https://placehold.co/600x600/1a1a1a/ffffff.png?text=Midnight+Black+1", altText: "Urban Stride Black Main", isPrimary: true },
            { url: "https://placehold.co/600x600/1a1a1a/ffffff.png?text=Midnight+Black+2", altText: "Urban Stride Black Sole", isPrimary: false },
        ],
        variants: [
            { size: 9, stock: 5, sku: "URB-BLK-M-09" },
            { size: 10, stock: 12, sku: "URB-BLK-M-10" },
            { size: 11, stock: 8, sku: "URB-BLK-M-11" },
        ],
        isActive: true,
    },
    {
        name: "Midnight Velvet Heels",
        slug: "midnight-velvet-heels",
        description: "Elegant stiletto heels featuring a soft velvet finish. Perfect for evening wear.",
        gender: "Women",
        category: "Heels",
        price: 150.0,
        images: [
            { url: "https://placehold.co/600x600/2d004b/ffffff.png?text=Velvet+Heels", altText: "Midnight Velvet Heels Main", isPrimary: true },
            { url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4", altText: "Runway Video Walk", isPrimary: false }
        ],
        variants: [
            { size: 6, stock: 5, sku: "MID-VEL-W-06" },
            { size: 7, stock: 12, sku: "MID-VEL-W-07" },
            { size: 8, stock: 8, sku: "MID-VEL-W-08" },
        ],
        isActive: true,
    },
    {
        name: "Trailblazer Hiking Boots - Olive",
        slug: "trailblazer-hiking-boots-olive",
        description: "Rugged, waterproof hiking boots designed for all-terrain adventures.",
        gender: "Unisex",
        category: "Boots",
        price: 185.0,
        discountPrice: 160.0,
        images: [
            { url: "https://placehold.co/600x600/4b5320/ffffff.png?text=Olive+Boots+1", altText: "Trailblazer Boots Side", isPrimary: true },
            { url: "https://placehold.co/600x600/4b5320/ffffff.png?text=Olive+Boots+2", altText: "Trailblazer Boots Tread", isPrimary: false }
        ],
        variants: [
            { size: 8, stock: 30, sku: "TRL-OLV-U-08" },
            { size: 9, stock: 45, sku: "TRL-OLV-U-09" },
            { size: 10, stock: 20, sku: "TRL-OLV-U-10" },
        ],
        isActive: true,
    },
    {
        name: "Kids Light-Up Dashers - Neon Blue",
        slug: "kids-light-up-dashers-blue",
        description: "Fun and playful sneakers that light up with every step. Easy velcro straps.",
        gender: "Kids",
        category: "Sneakers",
        price: 45.0,
        images: [
            { url: "https://placehold.co/600x600/0000ff/ffffff.png?text=Blue+Dashers", altText: "Light-up Dashers Blue", isPrimary: true },
            { url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", altText: "LED Light Demo Video", isPrimary: false }
        ],
        variants: [
            { size: 1, stock: 15, sku: "KID-BLU-01" },
            { size: 2, stock: 18, sku: "KID-BLU-02" },
            { size: 3, stock: 25, sku: "KID-BLU-03" },
        ],
        isActive: true,
    },
    {
        name: "Kids Light-Up Dashers - Hot Pink",
        slug: "kids-light-up-dashers-pink",
        description: "Fun and playful sneakers that light up with every step. Easy velcro straps.",
        gender: "Kids",
        category: "Sneakers",
        price: 45.0,
        images: [
            { url: "https://placehold.co/600x600/ff1493/ffffff.png?text=Pink+Dashers", altText: "Light-up Dashers Pink", isPrimary: true }
        ],
        variants: [
            { size: 1, stock: 10, sku: "KID-PNK-01" },
            { size: 2, stock: 5, sku: "KID-PNK-02" },
            { size: 3, stock: 0, sku: "KID-PNK-03" },
        ],
        isActive: true,
    },
    {
        name: "Classic Office Oxfords",
        slug: "classic-office-oxfords",
        description: "Premium genuine leather oxfords for a sharp, professional look.",
        gender: "Men",
        category: "Oxfords",
        price: 140.0,
        images: [
            { url: "https://placehold.co/600x600/8b4513/ffffff.png?text=Brown+Oxfords", altText: "Leather Oxfords Top", isPrimary: true },
            { url: "https://placehold.co/600x600/8b4513/ffffff.png?text=Oxfords+Side", altText: "Leather Oxfords Side", isPrimary: false }
        ],
        variants: [
            { size: 9, stock: 12, sku: "OXF-BRN-M-09" },
            { size: 10, stock: 14, sku: "OXF-BRN-M-10" },
            { size: 11, stock: 5, sku: "OXF-BRN-M-11" },
        ],
        isActive: true,
    },
    {
        name: "Summer Breeze Sandals",
        slug: "summer-breeze-sandals",
        description: "Lightweight and breathable strappy sandals ideal for beach days and casual summer outings.",
        gender: "Women",
        category: "Sandals",
        price: 65.0,
        discountPrice: 50.0,
        images: [
            { url: "https://placehold.co/600x600/f5deb3/000000.png?text=Sandals", altText: "Summer Breeze Sandals", isPrimary: true }
        ],
        variants: [
            { size: 6, stock: 40, sku: "SND-SUM-W-06" },
            { size: 7, stock: 55, sku: "SND-SUM-W-07" },
            { size: 8, stock: 30, sku: "SND-SUM-W-08" },
        ],
        isActive: true,
    },
    {
        name: "Cloud Comfort Runners - Neon Green",
        slug: "cloud-comfort-runners-green",
        description: "High-performance running shoes with extreme cushioning for long-distance runs.",
        gender: "Unisex",
        category: "Athletic",
        price: 160.0,
        images: [
            { url: "https://placehold.co/600x600/39ff14/000000.png?text=Neon+Runners", altText: "Cloud Runners Profile", isPrimary: true },
            { url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", altText: "Running Action Video", isPrimary: false }
        ],
        variants: [
            { size: 7, stock: 15, sku: "RUN-GRN-U-07" },
            { size: 8, stock: 25, sku: "RUN-GRN-U-08" },
            { size: 9, stock: 30, sku: "RUN-GRN-U-09" },
        ],
        isActive: true,
    },
    {
        name: "Cloud Comfort Runners - Glacier White",
        slug: "cloud-comfort-runners-white",
        description: "High-performance running shoes with extreme cushioning for long-distance runs.",
        gender: "Unisex",
        category: "Athletic",
        price: 160.0,
        images: [
            { url: "https://placehold.co/600x600/ffffff/000000.png?text=White+Runners", altText: "Cloud Runners White", isPrimary: true }
        ],
        variants: [
            { size: 8, stock: 10, sku: "RUN-WHT-U-08" },
            { size: 9, stock: 5, sku: "RUN-WHT-U-09" },
            { size: 10, stock: 0, sku: "RUN-WHT-U-10" },
        ],
        isActive: true,
    },
    {
        name: "Chelsea Suede Boots",
        slug: "chelsea-suede-boots",
        description: "Timeless slip-on Chelsea boots in a rich brown suede finish.",
        gender: "Men",
        category: "Boots",
        price: 135.0,
        images: [
            { url: "https://placehold.co/600x600/d2b48c/000000.png?text=Chelsea+Boots", altText: "Brown Suede Chelsea Boot", isPrimary: true },
            { url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4", altText: "Material Showcase Video", isPrimary: false }
        ],
        variants: [
            { size: 8, stock: 8, sku: "BTS-CHL-M-08" },
            { size: 9, stock: 12, sku: "BTS-CHL-M-09" },
            { size: 10, stock: 6, sku: "BTS-CHL-M-10" },
        ],
        isActive: true,
    },
    {
        name: "Ballet Core Flats",
        slug: "ballet-core-flats",
        description: "Minimalist ballet flats that provide all-day comfort without sacrificing style.",
        gender: "Women",
        category: "Flats",
        price: 55.0,
        images: [
            { url: "https://placehold.co/600x600/ffb6c1/000000.png?text=Ballet+Flats", altText: "Pink Ballet Flats", isPrimary: true }
        ],
        variants: [
            { size: 5, stock: 15, sku: "FLT-BAL-W-05" },
            { size: 6, stock: 22, sku: "FLT-BAL-W-06" },
            { size: 7, stock: 18, sku: "FLT-BAL-W-07" },
        ],
        isActive: true,
    },
    {
        name: "Toddler Splash Rainboots",
        slug: "toddler-splash-rainboots",
        description: "Bright yellow rubber boots to keep tiny feet dry during puddle-jumping sessions.",
        gender: "Kids",
        category: "Boots",
        price: 35.0,
        discountPrice: 25.0,
        images: [
            { url: "https://placehold.co/600x600/ffff00/000000.png?text=Yellow+Rainboots", altText: "Yellow Rainboots", isPrimary: true }
        ],
        variants: [
            { size: 3, stock: 40, sku: "KID-RNB-03" },
            { size: 4, stock: 35, sku: "KID-RNB-04" },
        ],
        isActive: true,
    },
    {
        name: "Retro Canvas High-Tops - Red",
        slug: "retro-canvas-high-tops-red",
        description: "Old-school high-top sneakers made from durable organic cotton canvas.",
        gender: "Unisex",
        category: "Sneakers",
        price: 75.0,
        images: [
            { url: "https://placehold.co/600x600/ff0000/ffffff.png?text=Red+High+Tops", altText: "Red High-Tops", isPrimary: true },
            { url: "https://placehold.co/600x600/ff0000/ffffff.png?text=Red+High+Tops+Side", altText: "Red High-Tops Side", isPrimary: false }
        ],
        variants: [
            { size: 6, stock: 50, sku: "SNK-RED-U-06" },
            { size: 7, stock: 45, sku: "SNK-RED-U-07" },
            { size: 8, stock: 60, sku: "SNK-RED-U-08" },
        ],
        isActive: true,
    },
    {
        name: "Penny Loafers Essential",
        slug: "penny-loafers-essential",
        description: "The ultimate smart-casual slip-on shoe, crafted from polished black leather.",
        gender: "Men",
        category: "Loafers",
        price: 115.0,
        images: [
            { url: "https://placehold.co/600x600/000000/ffffff.png?text=Black+Loafers", altText: "Black Penny Loafers", isPrimary: true }
        ],
        variants: [
            { size: 8, stock: 10, sku: "LOA-PEN-M-08" },
            { size: 9, stock: 15, sku: "LOA-PEN-M-09" },
            { size: 10, stock: 20, sku: "LOA-PEN-M-10" },
        ],
        isActive: true,
    },
    {
        name: "Chunky Platform Boots",
        slug: "chunky-platform-boots",
        description: "Edgy platform boots with a 3-inch chunky heel and side zipper.",
        gender: "Women",
        category: "Boots",
        price: 130.0,
        images: [
            { url: "https://placehold.co/600x600/1a1a1a/ffffff.png?text=Platform+Boots", altText: "Black Platform Boots", isPrimary: true },
            { url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4", altText: "Lookbook Video", isPrimary: false }
        ],
        variants: [
            { size: 6, stock: 12, sku: "BTS-PLT-W-06" },
            { size: 7, stock: 25, sku: "BTS-PLT-W-07" },
            { size: 8, stock: 14, sku: "BTS-PLT-W-08" },
        ],
        isActive: true,
    },
    {
        name: "Cozy Home Slippers",
        slug: "cozy-home-slippers",
        description: "Fleece-lined indoor slippers to keep your feet warm during winter.",
        gender: "Unisex",
        category: "Slippers",
        price: 30.0,
        discountPrice: 19.99,
        images: [
            { url: "https://placehold.co/600x600/808080/ffffff.png?text=Grey+Slippers", altText: "Grey Fleece Slippers", isPrimary: true }
        ],
        variants: [
            { size: 7, stock: 100, sku: "SLP-CZY-U-07" },
            { size: 9, stock: 120, sku: "SLP-CZY-U-09" },
            { size: 11, stock: 80, sku: "SLP-CZY-U-11" },
        ],
        isActive: true,
    },
    {
        name: "Kids Turf Soccer Cleats",
        slug: "kids-turf-soccer-cleats",
        description: "Durable soccer cleats designed for youth leagues and artificial turf.",
        gender: "Kids",
        category: "Athletic",
        price: 55.0,
        images: [
            { url: "https://placehold.co/600x600/00ff00/000000.png?text=Neon+Cleats", altText: "Neon Green Soccer Cleats", isPrimary: true }
        ],
        variants: [
            { size: 4, stock: 30, sku: "KID-SOC-04" },
            { size: 5, stock: 35, sku: "KID-SOC-05" },
        ],
        isActive: true,
    },
    {
        name: "Breathable Mesh Slip-ons",
        slug: "breathable-mesh-slip-ons",
        description: "Ultra-lightweight slip-on walking shoes with a breathable mesh upper.",
        gender: "Men",
        category: "Sneakers",
        price: 85.0,
        images: [
            { url: "https://placehold.co/600x600/000080/ffffff.png?text=Navy+Slip-on", altText: "Navy Mesh Slip-on", isPrimary: true }
        ],
        variants: [
            { size: 9, stock: 40, sku: "SNK-MSH-M-09" },
            { size: 10, stock: 45, sku: "SNK-MSH-M-10" },
            { size: 11, stock: 20, sku: "SNK-MSH-M-11" },
        ],
        isActive: true,
    },
    {
        name: "Winter Snow Muckers",
        slug: "winter-snow-muckers",
        description: "Insulated and fully waterproof boots for deep snow and extreme cold.",
        gender: "Men",
        category: "Boots",
        price: 160.0,
        discountPrice: 125.0,
        images: [
            { url: "https://placehold.co/600x600/4a4a4a/ffffff.png?text=Snow+Boots", altText: "Tall Winter Snow Boots", isPrimary: true },
            { url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4", altText: "Waterproof Test Video", isPrimary: false }
        ],
        variants: [
            { size: 9, stock: 15, sku: "BTS-SNW-M-09" },
            { size: 10, stock: 10, sku: "BTS-SNW-M-10" },
            { size: 12, stock: 5, sku: "BTS-SNW-M-12" },
        ],
        isActive: false, // Intentionally set false to test UI rendering logic
    }
];

export default async function seedData() {
	await dbconnect();

	// Clear out the old data (optional, be careful in production!)
	await Footware.deleteMany({});

	// Insert the 20 sample items
	// await Footware.insertMany(data);

	console.log("Database seeded successfully!");
}
