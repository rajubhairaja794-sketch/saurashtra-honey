import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function assertAdmin(supabase: any, userId: string) {
  const { data, error } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Forbidden: admin role required");
}

// -------- PRODUCTS --------

export const listAdminProducts = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("products")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) throw new Error(error.message);
    const rows = (data ?? []).map((row: any) => {
      const attrs = row.attributes || {};
      return {
        ...row,
        additional_images: Array.isArray(attrs.additional_images) ? attrs.additional_images : [],
      };
    });
    return { rows };
  });

const productSchema = z.object({
  id: z.string().uuid().optional(),
  slug: z.string().min(2).max(120),
  name: z.string().min(1).max(200),
  tagline: z.string().max(300).nullable().optional(),
  description: z.string().max(4000).nullable().optional(),
  category: z.string().max(60).nullable().optional(),
  flora: z.string().max(60).nullable().optional(),
  badge: z.string().max(40).nullable().optional(),
  price: z.number().int().nonnegative(),
  price_max: z.number().int().nonnegative().nullable().optional(),
  mrp: z.number().int().nonnegative().nullable().optional(),
  rating: z.number().min(0).max(5).optional(),
  reviews_count: z.number().int().nonnegative().optional(),
  sizes: z.array(z.string()).default([]),
  benefits: z.array(z.string()).default([]),
  image_key: z.string().max(120).nullable().optional(),
  image_url: z.string().max(2000).nullable().optional(),
  stock_quantity: z.number().int().nonnegative().default(100),
  in_stock: z.boolean().default(true),
  published: z.boolean().default(true),
  sort_order: z.number().int().default(0),
  // Extended enterprise fields
  sku: z.string().max(80).nullable().optional(),
  barcode: z.string().max(80).nullable().optional(),
  brand: z.string().max(80).nullable().optional(),
  ingredients: z.string().max(4000).nullable().optional(),
  usage_instructions: z.string().max(4000).nullable().optional(),
  warnings: z.string().max(2000).nullable().optional(),
  cost_price_paise: z.number().int().nonnegative().nullable().optional(),
  gst_percent: z.number().min(0).max(50).nullable().optional(),
  hsn_code: z.string().max(40).nullable().optional(),
  weight_g: z.number().int().nonnegative().nullable().optional(),
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
});

export const upsertProduct = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: z.infer<typeof productSchema>) => productSchema.parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { id, ...rest } = data;
    if (rest.images && Array.isArray(rest.images) && rest.images.length > 0) {
      rest.image_url = rest.images[0];
    }
    const attrs = { ...(rest.attributes || {}) } as Record<string, unknown>;
    if (rest.additional_images) {
      attrs.additional_images = rest.additional_images;
    }
    rest.attributes = attrs as never;
    delete (rest as Record<string, unknown>).additional_images;
    if (id) {
      const { data: updated, error } = await supabaseAdmin.from("products").update(rest as never).eq("id", id).select("id").single();
      if (error) throw new Error(error.message);
      return { ok: true, id: updated?.id || id };
    }
    const { data: inserted, error } = await supabaseAdmin.from("products").insert(rest as never).select("id").single();
    if (error) throw new Error(error.message);
    return { ok: true, id: inserted?.id };
  });

export const deleteProduct = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("products").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// -------- PRODUCT VARIANTS --------

const variantInputSchema = z.object({
  id: z.string().uuid().optional(),
  product_id: z.string().uuid(),
  label: z.string().min(1, "Size/Label is required"),
  weight_g: z.number().nullable().optional(),
  price: z.number().int().nonnegative(),
  mrp: z.number().int().nullable().optional(),
  cost_price: z.number().int().nullable().optional(),
  stock_quantity: z.number().int().default(0),
  low_stock_threshold: z.number().int().default(5),
  sku: z.string().nullable().optional(),
  barcode: z.string().nullable().optional(),
  is_default: z.boolean().default(false),
  is_active: z.boolean().default(true),
  sort_order: z.number().int().default(0),
});

export type VariantItem = z.infer<typeof variantInputSchema>;

export const listProductVariants = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { product_id: string }) => z.object({ product_id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rows, error } = await supabaseAdmin
      .from("product_variants")
      .select("*")
      .eq("product_id", data.product_id)
      .order("sort_order", { ascending: true });
    if (error) {
      if (error.message.includes("does not exist")) return { rows: [] };
      throw new Error(error.message);
    }
    return { rows: (rows || []) as VariantItem[] };
  });

export const saveProductVariants = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { product_id: string; variants: VariantItem[] }) =>
    z.object({
      product_id: z.string().uuid(),
      variants: z.array(variantInputSchema),
    }).parse(d)
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { product_id, variants } = data;

    let hasDefault = false;
    const normalized = variants.map((v, i) => {
      let isDefault = !!v.is_default;
      if (isDefault) {
        if (hasDefault) isDefault = false;
        else hasDefault = true;
      }
      return { ...v, is_default: isDefault, sort_order: i };
    });
    if (!hasDefault && normalized.length > 0) {
      normalized[0].is_default = true;
    }

    const { data: existing } = await supabaseAdmin
      .from("product_variants")
      .select("id")
      .eq("product_id", product_id);

    const existingIds = new Set((existing || []).map((x) => x.id));
    const incomingIds = new Set(normalized.map((x) => x.id).filter(Boolean));

    const toDelete = [...existingIds].filter((id) => !incomingIds.has(id));
    if (toDelete.length > 0) {
      const { error: delErr } = await supabaseAdmin
        .from("product_variants")
        .delete()
        .in("id", toDelete);
      if (delErr) throw new Error(delErr.message);
    }

    await supabaseAdmin
      .from("product_variants")
      .update({ is_default: false } as never)
      .eq("product_id", product_id);

    const results = [];
    for (const v of normalized) {
      if (v.id) {
        const { id, ...rest } = v;
        const { data: updated, error: updErr } = await supabaseAdmin
          .from("product_variants")
          .update(rest as never)
          .eq("id", id)
          .select("*")
          .single();
        if (updErr) throw new Error(updErr.message);
        results.push(updated);
      } else {
        const { data: inserted, error: insErr } = await supabaseAdmin
          .from("product_variants")
          .insert(v as never)
          .select("*")
          .single();
        if (insErr) throw new Error(insErr.message);
        results.push(inserted);
      }
    }

    const defaultVar = results.find((x) => x.is_default) || results[0];
    if (defaultVar) {
      const activeLabels = results.filter((x) => x.is_active).map((x) => x.label);
      const totalStock = results.filter((x) => x.is_active).reduce((sum, x) => sum + (x.stock_quantity || 0), 0);
      await supabaseAdmin
        .from("products")
        .update({
          price: defaultVar.price,
          mrp: defaultVar.mrp,
          stock_quantity: totalStock,
          sku: defaultVar.sku,
          weight_g: defaultVar.weight_g,
          sizes: activeLabels,
          in_stock: totalStock > 0,
        } as never)
        .eq("id", product_id);
    }

    return { ok: true, variants: results as VariantItem[] };
  });

export const deleteProductVariant = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("product_variants")
      .delete()
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// -------- HERO SLIDES --------

export const listAdminSlides = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("hero_slides")
      .select("*")
      .order("page", { ascending: true })
      .order("sort_order", { ascending: true });
    if (error) throw new Error(error.message);
    return { rows: data ?? [] };
  });

const slideSchema = z.object({
  id: z.string().uuid().optional(),
  page: z.string().min(1).max(40).default("home"),
  title: z.string().min(1, "Title is required for Admin / SEO").max(120),
  image_key: z.string().max(120).nullable().optional(),
  image_url: z.string().max(2000).nullable().optional(),
  mobile_image_url: z.string().max(2000).nullable().optional(),
  cta_href: z.string().min(1).max(300).default("/shop"),
  sort_order: z.number().int().default(0),
  active: z.boolean().default(true),
});

export const upsertSlide = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: z.infer<typeof slideSchema>) => slideSchema.parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);

    const { data: { session } } = await context.supabase.auth.getSession();
    const { data: { user }, error: userError } = await context.supabase.auth.getUser();

    console.log('[HERO_SAVE_AUTH]', {
      hasSession: !!session,
      userId: user?.id,
      email: user?.email,
      accessTokenExists: !!session?.access_token,
      userError
    });

    const { id, ...rest } = data;
    
    console.log('[HERO_SAVE_START]', {
      operation: id ? 'UPDATE' : 'INSERT',
      table: 'hero_slides',
      userId: user?.id
    });

    if (id) {
      const result = await context.supabase.from("hero_slides").update(rest as never).eq("id", id);
      console.log('[HERO_SAVE_RESULT]', { data: result.data, error: result.error });
      if (result.error) throw new Error(result.error.message);
      return { ok: true };
    }
    
    const result = await context.supabase.from("hero_slides").insert(rest as never);
    console.log('[HERO_SAVE_RESULT]', { data: result.data, error: result.error });
    if (result.error) throw new Error(result.error.message);
    return { ok: true };
  });

export const deleteSlide = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { error } = await context.supabase.from("hero_slides").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// -------- REVIEWS --------

export const listAdminReviews = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { status?: string; product_slug?: string }) => d)
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    let q = supabaseAdmin
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);
    if (data.status && data.status !== "all") q = q.eq("status", data.status);
    if (data.product_slug) q = q.eq("product_slug", data.product_slug);
    const { data: rows, error } = await q;
    if (error) throw new Error(error.message);
    return { rows: rows ?? [] };
  });

export const moderateReview = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string; status: "approved" | "pending" | "rejected" }) =>
    z.object({ id: z.string().uuid(), status: z.enum(["approved", "pending", "rejected"]) }).parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("reviews")
      .update({ status: data.status } as never)
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteReview = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("reviews").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
