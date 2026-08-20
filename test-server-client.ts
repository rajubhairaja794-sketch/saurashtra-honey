import { createServerClient } from "@supabase/ssr";
const supabase = createServerClient(process.env.VITE_SUPABASE_URL as string, process.env.VITE_SUPABASE_PUBLISHABLE_KEY as string, { cookies: {} });
async function run() {
  const { data: prod } = await supabase.from('products').select('*').eq('slug', 'ajwain-honey').single();
  const payload = {
    ...prod,
    images: ["https://lxdkcqdkfuuqjudsysrr.supabase.co/storage/v1/object/public/media/products/test-direct.png"],
    image_url: "https://lxdkcqdkfuuqjudsysrr.supabase.co/storage/v1/object/public/media/products/test-direct.png"
  };
  const { id, ...rest } = payload;
  const { data: updated, error } = await supabase.from("products").update(rest).eq("id", id).select("id, image_url, images").single();
  console.log("RESULT:", JSON.stringify(updated, null, 2), error);
}
run();
