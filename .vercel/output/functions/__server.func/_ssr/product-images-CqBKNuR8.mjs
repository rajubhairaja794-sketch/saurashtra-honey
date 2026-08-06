import { a as prod_lychee_default, i as prod_honeycomb_default, r as prod_giftpack_default, t as hero_honey_default } from "./prod-lychee-Di3dQ6EL.mjs";
import { a as prod_ajwain_default, c as prod_beeswax_candles_default, d as prod_liquid_default, f as prod_luxury_hamper_default, h as team_beekeepers_default, i as honey_drizzle_default, l as prod_beeswax_pellets_default, m as prod_squeeze_default, n as bee_flower_default, o as prod_beauty_default, p as prod_multiflora_default, r as family_honey_default, s as prod_bee_pollen_default, t as bee_farm_default, u as prod_fennel_default } from "./team-beekeepers-Bb0crWjH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/product-images-CqBKNuR8.js
var imageMap = {
	"ajwain-honey": prod_ajwain_default,
	"prod-ajwain": prod_ajwain_default,
	"fennel-honey": prod_fennel_default,
	"prod-fennel": prod_fennel_default,
	"lychee-honey": prod_lychee_default,
	"prod-lychee": prod_lychee_default,
	"multiflora-honey": prod_multiflora_default,
	"prod-multiflora": prod_multiflora_default,
	"raw-honey-squeeze": prod_squeeze_default,
	"prod-squeeze": prod_squeeze_default,
	"honey-comb": prod_honeycomb_default,
	"prod-honeycomb": prod_honeycomb_default,
	"premium-gift-pack": prod_giftpack_default,
	"family-gift-pack": prod_giftpack_default,
	"prod-giftpack": prod_giftpack_default,
	"hero-honey": hero_honey_default,
	"bee-farm": bee_farm_default,
	"honey-drizzle": honey_drizzle_default,
	"family-honey": family_honey_default,
	"bee-flower": bee_flower_default,
	"prod-liquid": prod_liquid_default,
	"team-beekeepers": team_beekeepers_default,
	"prod-beeswax-pellets": prod_beeswax_pellets_default,
	"prod-bee-pollen": prod_bee_pollen_default,
	"prod-beeswax-candles": prod_beeswax_candles_default,
	"prod-beauty": prod_beauty_default,
	"prod-luxury-hamper": prod_luxury_hamper_default
};
var IMAGE_KEYS = Object.keys(imageMap);
var FALLBACK_IMAGE = hero_honey_default;
function resolveImage(key, url, fallback = FALLBACK_IMAGE) {
	if (url && /^https?:\/\//.test(url)) return url;
	if (key && imageMap[key]) return imageMap[key];
	return fallback;
}
//#endregion
export { IMAGE_KEYS as n, resolveImage as r, FALLBACK_IMAGE as t };
