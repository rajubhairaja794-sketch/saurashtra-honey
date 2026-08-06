import { a as prod_lychee_default, i as prod_honeycomb_default, n as honeycomb_bees_default, r as prod_giftpack_default, t as hero_honey_default } from "./prod-lychee-Di3dQ6EL.mjs";
import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { t as createSsrRpc } from "./createSsrRpc-BCfEZsjq.mjs";
import { t as mortar_herbs_default } from "./mortar-herbs-hH1jIwW3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/category-catalog-8KCBEqqu.js
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
var DEFAULT_SHOP_CATEGORIES = [
	{
		slug: "honey",
		name: "Honey"
	},
	{
		slug: "beeswax",
		name: "Beeswax"
	},
	{
		slug: "bee-pollen",
		name: "Bee Pollen"
	},
	{
		slug: "beeswax-candle",
		name: "Beeswax Candle"
	},
	{
		slug: "beeswax-products",
		name: "Beeswax Products"
	},
	{
		slug: "beauty-products",
		name: "Beauty Products"
	}
].map((c) => ({
	...c,
	image: FALLBACK_IMAGE_BY_SLUG[c.slug] ?? "/assets/hero-honey-_5XoWxQ5.jpg",
	hasCustomImage: false
}));
var listPublicCategoriesFn = createServerFn({ method: "POST" }).handler(createSsrRpc("0ecc0eed542cf92ebb78d194ee7f8f39b0568a7fadc9b3a725d906dbad6ebfdd"));
async function fetchShopCategories() {
	try {
		return await listPublicCategoriesFn();
	} catch {
		return DEFAULT_SHOP_CATEGORIES;
	}
}
//#endregion
export { fetchShopCategories as n, DEFAULT_SHOP_CATEGORIES as t };
