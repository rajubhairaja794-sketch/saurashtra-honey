const fs = require('fs');

const file = 'src/lib/admin-cms.functions.ts';
let content = fs.readFileSync(file, 'utf8');

// Define the publish function
const publishFn = `
export async function publishCategoriesJSON(contextSupabase: any) {
  try {
    const { data, error } = await contextSupabase
      .from("categories")
      .select("slug,name,image_url,sort_order,active,updated_at")
      .eq("active", true)
      .order("sort_order", { ascending: true });
    
    if (error || !data) return;
    
    const json = JSON.stringify(data);
    const buf = Buffer.from(json, "utf-8");
    await contextSupabase.storage
      .from("media")
      .upload("public_cache/categories.json", buf, { contentType: "application/json", upsert: true });
  } catch (e) {
    console.error("Failed to publish categories JSON", e);
  }
}
`;

// Insert it before upsertCategory
content = content.replace('export const upsertCategory =', publishFn + '\nexport const upsertCategory =');

// Call it at the end of upsertCategory
content = content.replace('return { ok: true };\n  });', 'await publishCategoriesJSON(context.supabase);\n    return { ok: true };\n  });');

// Call it at the end of deleteCategory
content = content.replace('return { ok: true };\n  });\n\nexport const listProducts', 'await publishCategoriesJSON(context.supabase);\n    return { ok: true };\n  });\n\nexport const listProducts');

// Also call it in seedDefaultCategoriesIfEmpty
content = content.replace('console.error("Failed to seed categories:", e);\n  }\n}', 'await publishCategoriesJSON(supabase);\n  } catch (e) {\n    console.error("Failed to seed categories:", e);\n  }\n}');

fs.writeFileSync(file, content, 'utf8');
