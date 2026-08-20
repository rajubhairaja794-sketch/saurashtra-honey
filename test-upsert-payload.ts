import { createClient } from '@supabase/supabase-js';
const supabase = createClient(process.env.VITE_SUPABASE_URL as string, process.env.VITE_SUPABASE_PUBLISHABLE_KEY as string);
async function run() {
  const { data: prod } = await supabase.from('products').select('*').eq('slug', 'ajwain-honey').single();
  const rest = { ...prod };
  delete rest.id;
  
  // Simulate what frontend sends
  rest.images = ["https://lxdkcqdkfuuqjudsysrr.supabase.co/storage/v1/object/public/media/products/1787220264264_1.png"];
  
  // Simulate what upsertProduct does
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
  delete rest.additional_images;
  
  console.log("PAYLOAD BEFORE UPDATE:");
  console.log("images:", rest.images);
  console.log("image_url:", rest.image_url);

  // Now attempt the update!
  const { data: updated, error } = await supabase.from("products").update(rest).eq("id", prod.id).select("id, images, image_url").single();
  
  console.log("DATABASE AFTER UPDATE:");
  console.log(updated, error);
}
run();
