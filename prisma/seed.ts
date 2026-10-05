import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Placeholders are requested as .png on purpose. placehold.co serves SVG by
// default, and next/image refuses SVG unless `dangerouslyAllowSVG` is set —
// which would be the wrong trade here, since remotePatterns currently allows
// any https host, so an SVG from an arbitrary origin could carry script
// through the image optimizer. A raster placeholder sidesteps that entirely.
const placeholder = (label: string, tone = "f6ece8") =>
  `https://placehold.co/600x800.png/${tone}/6b4e58?text=${encodeURIComponent(label)}`;

// A stable, publicly hosted sample clip, here only so the hover-video path can
// be seen working before real product footage exists. Replace with your own
// asset — this is demo data, not something to ship.
const SAMPLE_VIDEO =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";

type SeedProduct = {
  slug: string;
  name: string;
  categorySlug: string;
  description: string;
  material: string;
  price: number;
  hoverVideoUrl?: string;
  galleryImages?: string[];
  variants: Array<{ size: string; color: string; sku: string; quantity: number }>;
};

const PRODUCTS: SeedProduct[] = [
  {
    slug: "noor-everyday-abaya",
    name: "Noor Everyday Abaya",
    categorySlug: "abayas",
    description: "Open front, soft crepe. Falls straight and moves easily.",
    material: "Nida crepe",
    price: 45000,
    // Carries video + gallery so the media path is exercised by the seed
    // rather than only being reachable once someone uploads real assets.
    hoverVideoUrl: SAMPLE_VIDEO,
    galleryImages: [placeholder("Sleeve detail", "f6ece8"), placeholder("Hem detail", "efe1dc")],
    variants: [
      { size: "52", color: "Dusty Rose", sku: "RFA-ABY-52-RSE", quantity: 6 },
      { size: "54", color: "Dusty Rose", sku: "RFA-ABY-54-RSE", quantity: 4 },
      { size: "56", color: "Taupe", sku: "RFA-ABY-56-TPE", quantity: 0 }
    ]
  },
  {
    slug: "layla-pleated-maxi-dress",
    name: "Layla Pleated Maxi Dress",
    categorySlug: "dresses",
    description: "Long sleeves, a high neck, pleats from the yoke.",
    material: "Chiffon with a satin lining",
    price: 52000,
    variants: [
      { size: "S", color: "Blush", sku: "RFA-DRS-S-BLS", quantity: 5 },
      { size: "M", color: "Blush", sku: "RFA-DRS-M-BLS", quantity: 3 },
      { size: "L", color: "Sage", sku: "RFA-DRS-L-SGE", quantity: 2 }
    ]
  },
  {
    slug: "premium-chiffon-hijab",
    name: "Premium Chiffon Hijab",
    categorySlug: "hijabs",
    description: "Non-slip chiffon. Holds a drape without pins sliding.",
    material: "Premium chiffon, 180 × 70 cm",
    price: 8500,
    galleryImages: [placeholder("Drape", "f6ece8")],
    variants: [
      { size: "One size", color: "Rose", sku: "RFA-HJB-OS-RSE", quantity: 20 },
      { size: "One size", color: "Ivory", sku: "RFA-HJB-OS-IVR", quantity: 14 },
      { size: "One size", color: "Mocha", sku: "RFA-HJB-OS-MCH", quantity: 9 }
    ]
  },
  {
    slug: "jersey-hijab",
    name: "Everyday Jersey Hijab",
    categorySlug: "hijabs",
    description: "Stretch jersey that holds its shape all day.",
    material: "Viscose jersey",
    price: 6500,
    variants: [
      { size: "One size", color: "Nude", sku: "RFA-JHB-OS-NDE", quantity: 18 },
      { size: "One size", color: "Black", sku: "RFA-JHB-OS-BLK", quantity: 11 }
    ]
  },
  {
    slug: "rose-oud-perfume-oil",
    name: "Rose Oud Perfume Oil",
    categorySlug: "fragrances",
    description: "Damask rose over oud and amber. Alcohol-free.",
    material: "Top: Damask rose · Heart: saffron · Base: oud, amber",
    price: 32000,
    variants: [
      { size: "6 ml", color: "Rose Oud", sku: "RFA-FRG-6-RSO", quantity: 15 },
      { size: "12 ml", color: "Rose Oud", sku: "RFA-FRG-12-RSO", quantity: 8 }
    ]
  },
  {
    slug: "royal-bakhoor",
    name: "Royal Bakhoor",
    categorySlug: "fragrances",
    description: "Oud-soaked wood chips, for the burner.",
    material: "Agarwood, musk, sandalwood",
    price: 15000,
    variants: [{ size: "40 g", color: "Royal", sku: "RFA-BKH-40-RYL", quantity: 0 }]
  },
  {
    slug: "pearl-hijab-pins",
    name: "Pearl Hijab Pins",
    categorySlug: "accessories",
    description: "Twelve pearl-headed pins.",
    material: "Faux pearl, stainless steel",
    price: 4500,
    variants: [{ size: "One size", color: "Pearl", sku: "RFA-PIN-OS-PRL", quantity: 30 }]
  }
];

// The shoot roster.
//
// Names are not unique in the schema — a three-to-five person roster does not
// need an identity constraint, and a real name is not an identifier — so this
// looks each one up before creating rather than upserting, which is what makes
// re-running the seed idempotent.
const MODELS: Array<{
  name: string;
  gender: string;
  heightCm: number;
  wearingSize: string;
  displayOrder: number;
}> = [
  { name: "Ama", gender: "Women", heightCm: 172, wearingSize: "S", displayOrder: 1 },
  { name: "Nadia", gender: "Women", heightCm: 178, wearingSize: "M", displayOrder: 2 },
  { name: "Zainab", gender: "Women", heightCm: 168, wearingSize: "S", displayOrder: 3 },
  { name: "Fatima", gender: "Women", heightCm: 175, wearingSize: "M", displayOrder: 4 }
];

async function main() {
  const categories = ["Abayas", "Dresses", "Hijabs", "Fragrances", "Accessories"];

  for (const name of categories) {
    const slug = name.toLowerCase().replace(/\s+/g, "-");
    await prisma.category.upsert({ where: { slug }, update: {}, create: { name, slug } });
  }

  for (const entry of MODELS) {
    const existing = await prisma.model.findFirst({ where: { name: entry.name } });
    if (existing) {
      await prisma.model.update({ where: { id: existing.id }, data: entry });
    } else {
      await prisma.model.create({
        data: { ...entry, referenceImageUrl: placeholder(`${entry.name} portrait`, "ece7e1") }
      });
    }
  }

  for (const entry of PRODUCTS) {
    const category = await prisma.category.findUniqueOrThrow({ where: { slug: entry.categorySlug } });

    const media = {
      frontImageUrl: placeholder(`${entry.name} front`),
      backImageUrl: placeholder(`${entry.name} back`),
      hoverVideoUrl: entry.hoverVideoUrl ?? null,
      galleryImages: entry.galleryImages ?? []
    };

    await prisma.product.upsert({
      where: { slug: entry.slug },
      // The media fields are refreshed on every run rather than left alone.
      // The previous seed used `update: {}`, so a database seeded before this
      // change would keep its old SVG placeholder URLs forever and keep
      // failing to render, even after running the corrected seed.
      update: media,
      create: {
        name: entry.name,
        slug: entry.slug,
        description: entry.description,
        material: entry.material,
        price: entry.price,
        currency: "GHS",
        categoryId: category.id,
        ...media,
        variants: {
          create: entry.variants.map((variant) => ({ ...variant, inStock: variant.quantity > 0 }))
        }
      }
    });
  }

  // One product gets an on-model shot, so the gallery's model slot and its
  // caption are reachable from a fresh database rather than only after someone
  // uploads real photography. These are placeholders standing in for images you
  // produce outside the site and upload in the admin product form.
  const abaya = await prisma.product.findUnique({ where: { slug: "noor-everyday-abaya" } });
  const nadia = await prisma.model.findFirst({ where: { name: "Nadia" } });

  if (abaya && nadia) {
    await prisma.productModelShot.upsert({
      // The unique pair is what makes re-seeding replace the shot rather than
      // failing on a constraint or stacking duplicates.
      where: { productId_modelId: { productId: abaya.id, modelId: nadia.id } },
      update: { imageUrl: placeholder(`Nadia in ${abaya.name}`, "efe1dc"), sortOrder: 0 },
      create: {
        productId: abaya.id,
        modelId: nadia.id,
        imageUrl: placeholder(`Nadia in ${abaya.name}`, "efe1dc"),
        sortOrder: 0
      }
    });
  }

  console.log(
    `Seeded ${PRODUCTS.length} products across ${categories.length} categories, and ${MODELS.length} models.`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
