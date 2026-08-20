import { z } from "zod";

const productSchema = z.object({
  id: z.string().uuid().optional(),
  slug: z.string().min(2).max(150).optional(),
  name: z.string().min(2).max(200).optional(),
  image_url: z.string().nullable().optional(),
  images: z.array(z.string().max(2000)).default([]),
  additional_images: z.array(z.string().max(2000)).default([]).optional(),
  attributes: z.record(z.string(), z.any()).optional(),
}).passthrough();

const data = productSchema.parse({
  id: "5c332116-8ebe-47b1-bca1-6977513fa69c",
  slug: "ajwain-honey",
  name: "Ajwain Honey",
  image_url: "https://lxdkcqdkfuuqjudsysrr.supabase.co/storage/v1/object/public/media/products/1787220264264_1.png",
  images: ["https://lxdkcqdkfuuqjudsysrr.supabase.co/storage/v1/object/public/media/products/1787220264264_1.png"],
  additional_images: ["https://lxdkcqdkfuuqjudsysrr.supabase.co/storage/v1/object/public/media/products/1786077860408_2.png"]
});

const { id, ...rest } = data;
if (rest.images && Array.isArray(rest.images)) {
  rest.images = rest.images.filter((img) => typeof img === "string" && img.startsWith("http"));
  if (rest.images.length > 0) {
    rest.image_url = rest.images[0];
  } else {
    rest.image_url = null;
  }
}
const attrs = { ...(rest.attributes || {}) } as Record<string, unknown>;
if (rest.additional_images && Array.isArray(rest.additional_images)) {
  attrs.additional_images = rest.additional_images.filter((img) => typeof img === "string" && img.startsWith("http"));
}
rest.attributes = attrs as never;
delete (rest as Record<string, unknown>).additional_images;

console.log("PAYLOAD TO SUPABASE:");
console.log(JSON.stringify(rest, null, 2));
