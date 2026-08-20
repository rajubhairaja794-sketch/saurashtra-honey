import { z } from 'zod';
const productSchema = z.object({
  id: z.string().uuid().optional(),
  slug: z.string().min(2).max(150),
  name: z.string().min(2).max(200),
  brand: z.string().max(100).nullable().optional(),
  category: z.string().max(100).nullable().optional(),
  flora: z.string().max(100).nullable().optional(),
  tagline: z.string().max(200).nullable().optional(),
  badge: z.string().max(50).nullable().optional(),
  description: z.string().max(3000).nullable().optional(),
  price: z.number().int().nonnegative(),
  price_max: z.number().int().nonnegative().nullable().optional(),
  stock_quantity: z.number().int().nonnegative().default(100),
  low_stock_limit: z.number().int().nonnegative().default(5),
  status: z.enum(["draft","published","archived"]).default("published"),
  is_featured: z.boolean().default(false),
  is_bestseller: z.boolean().default(false),
  is_new_arrival: z.boolean().default(false),
  show_on_homepage: z.boolean().default(false),
  images: z.array(z.string().max(2000)).default([]),
  additional_images: z.array(z.string().max(2000)).default([]).optional(),
  video_url: z.string().max(2000).nullable().optional(),
  meta_title: z.string().max(200).nullable().optional(),
  meta_description: z.string().max(400).nullable().optional(),
  meta_keywords: z.string().max(400).nullable().optional(),
  canonical_url: z.string().max(2000).nullable().optional(),
  attributes: z.record(z.string(), z.any()).optional(),
  image_key: z.string().nullable().optional(),
  image_url: z.string().nullable().optional(),
});
const testPayload = {
    id: "eecfa722-e1d5-4521-af9c-097a8a1c97a2",
    slug: "ajwain-honey",
    name: "Ajwain Honey",
    tagline: "Raw • Unfiltered • Unheated",
    description: "Sourced from the nectar of Ajwain flowers...",
    category: "Honey",
    flora: null,
    badge: "Bestseller",
    price: 349.99, // Float?
    price_max: 899.50,
    mrp: null,
    stock_quantity: 0,
    low_stock_limit: 5,
    status: "published",
    is_featured: false,
    is_bestseller: false,
    is_new_arrival: false,
    show_on_homepage: false,
    image_key: "prod-ajwain",
    image_url: null,
    images: ["prod-ajwain"],
    additional_images: [],
    attributes: {},
    sizes: ["250g"], // Wait, is sizes in the schema?!
    benefits: ["Supports digestion"], // Wait, is benefits in the schema?!
};
try {
  productSchema.parse(testPayload);
  console.log("PASS");
} catch(e: any) {
  console.log("FAIL", e.errors);
}
