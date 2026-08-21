import { createClient } from "@supabase/supabase-js";
const supabase = createClient("https://lxdkcqdkfuuqjudsysrr.supabase.co", "sb_publishable_E3rv2tJCU_jTt1wL_TyWDQ_u1_9ztgY");

async function run() {
  const { data: before } = await supabase.from('products').select('id, name, image_url, images').eq('slug', 'ajwain-honey');
  console.log("BEFORE:", JSON.stringify(before, null, 2));

  const id = before[0].id;
  const newImages = ["https://example.com/new_image.jpg", ...before[0].images];
  const newImageUrl = newImages[0];

  const payload = {
    image_url: newImageUrl,
    images: newImages,
  };

  const { data: updateRes, error: updateErr } = await supabase.from('products').update(payload).eq('id', id).select('id, image_url, images');
  console.log("UPDATE RES:", JSON.stringify(updateRes, null, 2));
  console.log("UPDATE ERR:", updateErr);

  const { data: after } = await supabase.from('products').select('id, name, image_url, images').eq('slug', 'ajwain-honey');
  console.log("AFTER:", JSON.stringify(after, null, 2));
}
run();
