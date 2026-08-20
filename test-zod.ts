import { z } from 'zod';
import { createClient } from '@supabase/supabase-js';

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
}).passthrough();

const supabase = createClient(process.env.VITE_SUPABASE_URL as string, process.env.VITE_SUPABASE_PUBLISHABLE_KEY as string);

async function run() {
  const { data: row } = await supabase.from('products').select('*').eq('slug', 'ajwain-honey').single();
  const payload = {
    ...row,
    price: Number(row.price) || 0,
    price_max: row.price_max ? Number(row.price_max) : null,
    stock_quantity: Number(row.stock_quantity) || 0,
    low_stock_limit: Number(row.low_stock_limit) || 5,
    images: ["https://example.com/test.png"],
    additional_images: row.attributes?.additional_images ?? []
  };
  
  try {
    const validated = productSchema.parse(payload);
    console.log("Zod validation PASSED!");
  } catch (err: any) {
    console.error("Zod validation FAILED!");
    console.log(err.errors);
  }
}
run();
