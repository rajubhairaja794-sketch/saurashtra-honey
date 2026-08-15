import { createServerFn } from "@tanstack/react-start";
// Just a mental check, we can do:
/*
  const { data } = await context.supabase.from("categories").select("slug,name,image_url,sort_order,active,updated_at").eq("active", true).order("sort_order", { ascending: true });
  const json = JSON.stringify(data);
  await context.supabase.storage.from("media").upload("categories.json", json, { contentType: "application/json", upsert: true });
*/
