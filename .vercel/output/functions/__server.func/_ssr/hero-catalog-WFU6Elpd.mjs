import "../_runtime.mjs";
import { n as honeycomb_bees_default, t as hero_honey_default } from "./prod-lychee-Di3dQ6EL.mjs";
import { i as honey_drizzle_default, n as bee_flower_default, r as family_honey_default, t as bee_farm_default } from "./team-beekeepers-Bb0crWjH.mjs";
import { t as supabase } from "./client-CWNNtKRC.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { r as resolveImage, t as FALLBACK_IMAGE } from "./product-images-CqBKNuR8.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
var hero_products_default = "/assets/hero-products-Dvn7VLJs.jpg";
function heroRowToSlide(r, fallbackImg = FALLBACK_IMAGE) {
	return {
		image: resolveImage(r.image_key, r.image_url, fallbackImg),
		eyebrow: r.eyebrow ?? "",
		title: r.title_accent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			r.title,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "italic text-brand-orange",
				children: r.title_accent
			})
		] }) : r.title,
		subtitle: r.subtitle ?? "",
		ctaText: r.cta_label ?? "SHOP NOW",
		ctaTo: r.cta_href || "/shop",
		align: r.align === "center" ? "center" : "left"
	};
}
function getDefaultHeroSlides(page) {
	const p = page.toLowerCase();
	if (p === "home") return [
		{
			image: hero_honey_default,
			eyebrow: "100% PURE & NATURAL",
			title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				"Pure Honey.",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "italic text-brand-orange",
					children: "Proven Purity."
				})
			] }),
			subtitle: "Sustainably harvested from wild flora across Saurashtra. Raw, unfiltered, and lab-tested in every batch for your family's daily wellness.",
			ctaText: "SHOP PURE HONEY",
			ctaTo: "/shop",
			align: "left"
		},
		{
			image: hero_products_default,
			eyebrow: "RAW & UNFILTERED",
			title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				"Direct From Our",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "italic text-brand-orange",
					children: "Floral Apiaries."
				})
			] }),
			subtitle: "No heating, no processing, and no artificial sweeteners. Just unadulterated golden sweetness from wild wildflower farms.",
			ctaText: "EXPLORE COLLECTION",
			ctaTo: "/shop",
			align: "left"
		},
		{
			image: honey_drizzle_default,
			eyebrow: "LAB TESTED IN EVERY BATCH",
			title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				"Verified For Zero",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "italic text-brand-orange",
					children: "Sugar Adulteration."
				})
			] }),
			subtitle: "Every batch undergoes rigorous NMR & purity testing to guarantee 100% genuine, natural honey from hive to table.",
			ctaText: "VIEW TEST REPORTS",
			ctaTo: "/our-story",
			align: "left"
		},
		{
			image: bee_farm_default,
			eyebrow: "TRACEABLE BEE FARMING",
			title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				"Ethical Beekeeping",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "italic text-brand-orange",
					children: "Across Saurashtra."
				})
			] }),
			subtitle: "Our apiaries preserve healthy bee colonies while supporting local wildflower biodiversity and rural beekeeping families.",
			ctaText: "TRACE YOUR HONEY",
			ctaTo: "/bee-farming",
			align: "left"
		},
		{
			image: honeycomb_bees_default,
			eyebrow: "THE SAURASHTRA TRADITION",
			title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				"Three Generations",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "italic text-brand-orange",
					children: "of Honey Makers."
				})
			] }),
			subtitle: "Rooted in the golden soils of Gujarat, combining age-old harvesting wisdom with modern lab testing standards.",
			ctaText: "READ OUR STORY",
			ctaTo: "/our-story",
			align: "left"
		},
		{
			image: bee_flower_default,
			eyebrow: "DAILY FAMILY WELLNESS",
			title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				"Rich in Natural",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "italic text-brand-orange",
					children: "Enzymes & Pollen."
				})
			] }),
			subtitle: "Packed with natural antioxidants and immunity-boosting nutrients for your everyday health and vitality.",
			ctaText: "SHOP BEST SELLERS",
			ctaTo: "/shop",
			align: "left"
		},
		{
			image: family_honey_default,
			eyebrow: "BULK & CORPORATE GIFTING",
			title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				"Custom Golden",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "italic text-brand-orange",
					children: "Gift Hampers."
				})
			] }),
			subtitle: "Delight your partners, guests, and employees with premium honey hampers crafted with love from Saurashtra.",
			ctaText: "ENQUIRE NOW",
			ctaTo: "/bulk-orders",
			align: "left"
		}
	];
	if (p === "shop") return [
		{
			image: hero_products_default,
			eyebrow: "SAURASHTRA HONEY SHOP",
			title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				"100% Pure Raw Honey",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "italic text-brand-orange",
					children: "Direct From Our Apiary"
				})
			] }),
			subtitle: "Harvested ethically across the floral farms of Saurashtra. Every jar lab-tested for guaranteed purity.",
			ctaText: "EXPLORE HONEYS",
			ctaTo: "/shop",
			align: "left"
		},
		{
			image: honey_drizzle_default,
			eyebrow: "LIMITED FLAVOR HARVEST",
			title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				"Monofloral & Wild",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "italic text-brand-orange",
					children: "Artisanal Collections"
				})
			] }),
			subtitle: "From fragrant Lychee blossom to rare Ajwain honey, taste the authentic nectar of regional flora.",
			ctaText: "SHOP MONOFLORAL",
			ctaTo: "/shop",
			align: "left"
		},
		{
			image: hero_honey_default,
			eyebrow: "FAMILY WELLNESS PACKS",
			title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				"Pure Unprocessed",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "italic text-brand-orange",
					children: "Daily Health Essentials"
				})
			] }),
			subtitle: "Rich in enzymes and natural antioxidants. Zero heating, zero sugar syrups, 100% genuine.",
			ctaText: "VIEW BEST SELLERS",
			ctaTo: "/shop",
			align: "left"
		}
	];
	if (p === "our-story") return [
		{
			image: family_honey_default,
			eyebrow: "ROOTED IN SAURASHTRA",
			title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				"Our Heritage of",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "italic text-brand-orange",
					children: "Ethical Honey Craft"
				})
			] }),
			subtitle: "Three generations dedicated to preserving the purest traditions of natural beekeeping across Gujarat.",
			ctaText: "READ OUR HERITAGE",
			ctaTo: "/our-story",
			align: "left"
		},
		{
			image: honeycomb_bees_default,
			eyebrow: "FROM HIVE TO TABLE",
			title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				"No Middlemen.",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "italic text-brand-orange",
					children: "Pure Transparency."
				})
			] }),
			subtitle: "We oversee every step of the journey so you can trust what is inside your family's honey jar.",
			ctaText: "OUR PROMISE",
			ctaTo: "/our-story",
			align: "left"
		},
		{
			image: bee_farm_default,
			eyebrow: "LAB VERIFIED PURITY",
			title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				"Rigorous Science",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "italic text-brand-orange",
					children: "Meets Tradition"
				})
			] }),
			subtitle: "Uncompromising quality checks and independent NMR lab verification for every single batch we produce.",
			ctaText: "VIEW LAB REPORTS",
			ctaTo: "/our-story",
			align: "left"
		}
	];
	if (p === "bee-farming") return [
		{
			image: bee_farm_default,
			eyebrow: "ETHICAL BEEKEEPING",
			title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				"Respecting Bees,",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "italic text-brand-orange",
					children: "Protecting Nature"
				})
			] }),
			subtitle: "We never over-harvest or feed sugar syrups to our bee colonies. Sustainable apiaries across Saurashtra.",
			ctaText: "EXPLORE APIARIES",
			ctaTo: "/bee-farming",
			align: "left"
		},
		{
			image: bee_flower_default,
			eyebrow: "BIODIVERSITY & FLORA",
			title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				"Pollinating Our",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "italic text-brand-orange",
					children: "Wildflower Farms"
				})
			] }),
			subtitle: "Our hives contribute to local farm pollination while capturing the rich floral nectar of the region.",
			ctaText: "LEARN MORE",
			ctaTo: "/bee-farming",
			align: "left"
		},
		{
			image: honeycomb_bees_default,
			eyebrow: "TRACE YOUR HONEY",
			title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				"100% Traceable",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "italic text-brand-orange",
					children: "From Hive to Jar"
				})
			] }),
			subtitle: "Every batch is mapped to its exact floral origin and harvesting season for total peace of mind.",
			ctaText: "TRACE HARVEST",
			ctaTo: "/bee-farming",
			align: "left"
		}
	];
	if (p === "blog") return [
		{
			image: honeycomb_bees_default,
			eyebrow: "THE SAURASHTRA JOURNAL",
			title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				"Stories of Pure Honey",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "italic text-brand-orange",
					children: "& Natural Living"
				})
			] }),
			subtitle: "Explore wellness tips, authentic recipes, and beekeeping notes from our apiary experts.",
			ctaText: "READ LATEST POSTS",
			ctaTo: "/blog",
			align: "left"
		},
		{
			image: honey_drizzle_default,
			eyebrow: "RECIPES & REMEDIES",
			title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				"Daily Wellness",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "italic text-brand-orange",
					children: "With Raw Honey"
				})
			] }),
			subtitle: "Discover how to substitute refined sugar with antioxidant-rich raw honey in your daily meals.",
			ctaText: "EXPLORE RECIPES",
			ctaTo: "/blog",
			align: "left"
		},
		{
			image: bee_flower_default,
			eyebrow: "BEEKEEPER NOTES",
			title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				"Inside The Hive",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "italic text-brand-orange",
					children: "& Seasonal Harvests"
				})
			] }),
			subtitle: "Follow the seasonal journey of wild bees across Saurashtra's changing blossoms.",
			ctaText: "VIEW NOTES",
			ctaTo: "/blog",
			align: "left"
		}
	];
	if (p === "bulk-orders") return [
		{
			image: honey_drizzle_default,
			eyebrow: "BULK & CORPORATE GIFTING",
			title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				"Premium Honey Hampers",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "italic text-brand-orange",
					children: "& Bulk Supply"
				})
			] }),
			subtitle: "Custom golden gift boxes for corporate events, weddings, and hospitality partners across India.",
			ctaText: "REQUEST A QUOTE",
			ctaTo: "/bulk-orders",
			align: "left"
		},
		{
			image: hero_products_default,
			eyebrow: "CUSTOM BRANDING",
			title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				"Tailored Packaging",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "italic text-brand-orange",
					children: "For Your Organization"
				})
			] }),
			subtitle: "Personalized jars, wooden dippers, and bespoke gift boxes crafted to reflect your brand excellence.",
			ctaText: "VIEW OPTIONS",
			ctaTo: "/bulk-orders",
			align: "left"
		},
		{
			image: hero_honey_default,
			eyebrow: "WHOLESALE & RETAIL",
			title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				"Reliable Pan-India",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "italic text-brand-orange",
					children: "Bulk Honey Partner"
				})
			] }),
			subtitle: "Consistent quality, lab-certified purity, and seamless pan-India logistics for bulk orders.",
			ctaText: "ENQUIRE NOW",
			ctaTo: "/bulk-orders",
			align: "left"
		}
	];
	if (p === "contact") return [
		{
			image: bee_farm_default,
			eyebrow: "WE ARE HERE FOR YOU",
			title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				"Get in Touch With",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "italic text-brand-orange",
					children: "Saurashtra Honey"
				})
			] }),
			subtitle: "Have questions about our honeys, lab reports, or bulk orders? Our team is always ready to assist.",
			ctaText: "CONTACT SUPPORT",
			ctaTo: "/contact",
			align: "left"
		},
		{
			image: family_honey_default,
			eyebrow: "CUSTOMER CARE",
			title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				"Questions About",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "italic text-brand-orange",
					children: "Your Honey Order?"
				})
			] }),
			subtitle: "We are committed to transparent communication and complete customer satisfaction.",
			ctaText: "SEND A MESSAGE",
			ctaTo: "/contact",
			align: "left"
		},
		{
			image: hero_honey_default,
			eyebrow: "PARTNER WITH US",
			title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				"Retail & Distribution",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "italic text-brand-orange",
					children: "Inquiries Welcome"
				})
			] }),
			subtitle: "Join our growing network of wellness partners and bring pure Saurashtra Honey to your city.",
			ctaText: "BECOME A PARTNER",
			ctaTo: "/contact",
			align: "left"
		}
	];
	return getDefaultHeroSlides("home");
}
async function fetchHeroSlides(page) {
	try {
		const { data, error } = await supabase.from("hero_slides").select("*").eq("page", page).eq("active", true).order("sort_order", { ascending: true });
		if (error || !data || data.length === 0) return getDefaultHeroSlides(page);
		return data.map((r) => heroRowToSlide(r));
	} catch {
		return getDefaultHeroSlides(page);
	}
}
//#endregion
export { getDefaultHeroSlides as n, hero_products_default as r, fetchHeroSlides as t };
