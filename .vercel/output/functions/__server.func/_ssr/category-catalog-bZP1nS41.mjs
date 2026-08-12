import { a as prod_lychee_default, i as prod_honeycomb_default, n as honeycomb_bees_default, r as prod_giftpack_default, t as hero_honey_default } from "./prod-lychee-Di3dQ6EL.mjs";
import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { t as mortar_herbs_default } from "./mortar-herbs-hH1jIwW3.mjs";
import { t as createServerRpc } from "./createServerRpc-B90ckaqP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/category-catalog-bZP1nS41.js
var FALLBACK_IMAGE_BY_SLUG = {
	honey: hero_honey_default,
	beeswax: prod_honeycomb_default,
	"bee-pollen": mortar_herbs_default,
	"beeswax-candle": honeycomb_bees_default,
	"beeswax-products": prod_giftpack_default,
	"body-care": prod_lychee_default,
	"hair-care": prod_lychee_default,
	"lip-care": prod_giftpack_default,
	"skin-care": prod_lychee_default,
	"wood-leather-care": prod_honeycomb_default,
	"beauty-products": prod_lychee_default
};
var DISALLOWED_SLUGS = [
	"body-care",
	"hair-care",
	"lip-care",
	"skin-care",
	"wood-leather-care",
	"single-flora"
];
var listPublicCategoriesFn_createServerFn_handler = createServerRpc({
	id: "0ecc0eed542cf92ebb78d194ee7f8f39b0568a7fadc9b3a725d906dbad6ebfdd",
	name: "listPublicCategoriesFn",
	filename: "src/lib/category-catalog.ts"
}, (opts) => listPublicCategoriesFn.__executeServer(opts));
var listPublicCategoriesFn = createServerFn({ method: "POST" }).handler(listPublicCategoriesFn_createServerFn_handler, async () => {
	const { supabaseAdmin } = await import("./client.server-Bw6iWMJ-.mjs");
	const { seedDefaultCategoriesIfEmpty } = await import("./admin-cms.functions-D_VEO5GC.mjs");
	await seedDefaultCategoriesIfEmpty(supabaseAdmin);
	const { data, error } = await supabaseAdmin.from("categories").select("slug,name,image_url,sort_order,active").eq("active", true).order("sort_order", { ascending: true });
	if (error) throw new Error(error.message);
	return (data ?? []).filter((r) => !DISALLOWED_SLUGS.includes(r.slug.toLowerCase().trim())).map((r) => ({
		slug: r.slug,
		name: r.name,
		image: r.image_url || FALLBACK_IMAGE_BY_SLUG[r.slug] || "/assets/hero-honey-_5XoWxQ5.jpg",
		hasCustomImage: !!r.image_url
	}));
});
//#endregion
export { listPublicCategoriesFn_createServerFn_handler };
