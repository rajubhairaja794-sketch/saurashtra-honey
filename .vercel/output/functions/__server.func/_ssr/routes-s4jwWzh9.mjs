import { i as __toESM } from "../_runtime.mjs";
import { n as honeycomb_bees_default, r as prod_giftpack_default } from "./prod-lychee-Di3dQ6EL.mjs";
import { d as prod_liquid_default, i as honey_drizzle_default, n as bee_flower_default, r as family_honey_default, t as bee_farm_default } from "./team-beekeepers-Bb0crWjH.mjs";
import { t as supabase } from "./client-CWNNtKRC.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as fetchProducts } from "./product-catalog-nTITKWF8.mjs";
import { t as useServerFn } from "./useServerFn-BqzygRuj.mjs";
import { d as fetchAllHomepageFeaturedProducts, f as fetchAllHomepageTrustItems, m as fetchHomepageSections, u as fetchAllHomepageCategories } from "./homepage-cms.functions-BAU0l-41.mjs";
import { n as fetchShopCategories } from "./category-catalog-8KCBEqqu.mjs";
import { Dt as FlaskConical, Wt as CircleCheck, Xt as Check, _t as HeartHandshake, b as Sparkles, it as Leaf, ln as ArrowRight, on as Award, t as lucide_react_exports, v as Star, w as ShieldCheck } from "../_libs/lucide-react.mjs";
import { n as SiteLayout } from "./Layout-vj9XDuOl.mjs";
import { t as HeroSlider } from "./HeroSlider-BxyT0XGM.mjs";
import { n as getDefaultHeroSlides, r as hero_products_default, t as fetchHeroSlides } from "./hero-catalog-WFU6Elpd.mjs";
import { t as useEmblaCarousel } from "../_libs/embla-carousel-react+[...].mjs";
import { t as Autoplay } from "../_libs/embla-carousel-autoplay.mjs";
import { t as PremiumMobileCarousel } from "./PremiumMobileCarousel-CkEO3_mW.mjs";
import { n as breadcrumbLd, r as organizationLd, t as StructuredData } from "./StructuredData-C0TBI3qI.mjs";
import { i as listPublicPosts } from "./blog-server.functions-_6V80-4t.mjs";
import { i as resolvePostImage, n as formatPostDate } from "./blog-client-helpers-9aR9Z58R.mjs";
import { t as ProductCard } from "./ProductCard-CO0CmP46.mjs";
import { t as QuickView } from "./QuickView-BwkTVJcc.mjs";
import { t as ShoppableVideoCarousel } from "./ShoppableVideoCarousel-BOpztcuw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-s4jwWzh9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function HomeHero() {
	const [slides, setSlides] = import_react.useState(() => getDefaultHeroSlides("home"));
	import_react.useEffect(() => {
		fetchHeroSlides("home").then((res) => {
			if (res && res.length > 0) setSlides(res);
		});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroSlider, {
		slides,
		interval: 6e3,
		size: "home",
		variant: "home"
	});
}
function HomeTrustStrip({ settings }) {
	const [dbItems, setDbItems] = import_react.useState([]);
	const [loading, setLoading] = import_react.useState(true);
	import_react.useEffect(() => {
		fetchAllHomepageTrustItems().then((data) => setDbItems(data)).catch((err) => console.warn("Failed to fetch trust items, using fallback", err)).finally(() => setLoading(false));
	}, []);
	const fallbackItems = [
		{
			label: "100% Pure No Additives",
			iconName: "ShieldCheck",
			Icon: ShieldCheck
		},
		{
			label: "Raw & Unprocessed",
			iconName: "FlaskConical",
			Icon: FlaskConical
		},
		{
			label: "Natural Floral Sources",
			iconName: "Leaf",
			Icon: Leaf
		},
		{
			label: "Rich in Nutrients",
			iconName: "Sparkles",
			Icon: Sparkles
		},
		{
			label: "Lab Tested",
			iconName: "Award",
			Icon: Award
		},
		{
			label: "Ethical Beekeeping",
			iconName: "HeartHandshake",
			Icon: HeartHandshake
		}
	];
	const items = dbItems.length > 0 ? dbItems.map((item) => ({
		label: item.title,
		Icon: item.icon && lucide_react_exports[item.icon] ? lucide_react_exports[item.icon] : Check
	})) : fallbackItems;
	if (loading) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-cream-deep/40 border-y border-border/80 py-8 sm:py-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "container-page",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8",
				children: items.map(({ label, Icon }, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center text-center p-3 rounded-2xl hover:bg-cream/60 transition-colors",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "size-11 rounded-full bg-cream border border-border flex items-center justify-center text-brand-orange shadow-xs mb-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs sm:text-[13px] font-bold text-espresso leading-snug",
						children: label
					})]
				}, idx))
			})
		})
	});
}
function HomeShopByCategory({ settings }) {
	const [displayCats, setDisplayCats] = import_react.useState([]);
	const [loading, setLoading] = import_react.useState(true);
	const [emblaRef, emblaApi] = useEmblaCarousel({
		loop: true,
		dragFree: true,
		align: "start"
	}, [Autoplay({
		delay: 2500,
		stopOnInteraction: false,
		stopOnMouseEnter: true
	})]);
	const scrollPrev = (0, import_react.useCallback)(() => {
		if (emblaApi) emblaApi.scrollPrev();
	}, [emblaApi]);
	const scrollNext = (0, import_react.useCallback)(() => {
		if (emblaApi) emblaApi.scrollNext();
	}, [emblaApi]);
	const HOME_CATEGORIES = [
		{
			name: "Raw Honey",
			img: prod_liquid_default,
			filter: "raw-honey"
		},
		{
			name: "Beeswax",
			img: honeycomb_bees_default,
			filter: "beeswax"
		},
		{
			name: "Bee Pollen",
			img: bee_flower_default,
			filter: "bee-pollen"
		},
		{
			name: "Beeswax Candles",
			img: honey_drizzle_default,
			filter: "candles"
		},
		{
			name: "Beauty & Personal Care",
			img: family_honey_default,
			filter: "beauty"
		},
		{
			name: "Gift Hampers",
			img: prod_giftpack_default,
			filter: "gift-hampers"
		},
		{
			name: "All Products",
			img: hero_products_default,
			filter: ""
		}
	];
	import_react.useEffect(() => {
		Promise.all([fetchShopCategories(), fetchAllHomepageCategories()]).then(([allCats, selections]) => {
			if (selections.length > 0) {
				const mappedCats = selections.map((sel) => {
					const cat = allCats.find((c) => c.slug === sel.category_slug);
					return {
						name: cat?.name || sel.category_slug,
						img: cat?.image || "/assets/prod-liquid-CKR42HH0.jpg",
						filter: sel.category_slug
					};
				});
				setDisplayCats([
					...mappedCats,
					...mappedCats,
					...mappedCats
				]);
			} else setDisplayCats([
				...HOME_CATEGORIES,
				...HOME_CATEGORIES,
				...HOME_CATEGORIES
			]);
		}).catch((err) => {
			console.warn("Failed to fetch shop categories, using fallback", err);
			setDisplayCats([
				...HOME_CATEGORIES,
				...HOME_CATEGORIES,
				...HOME_CATEGORIES
			]);
		}).finally(() => {
			setLoading(false);
		});
	}, []);
	if (loading) return null;
	const s_eyebrow = settings?.eyebrow ?? "DISCOVER";
	const s_heading = settings?.heading ?? "Explore Our World";
	const s_desc = settings?.description ?? "Discover every expression of pure honey—from everyday favourites to rare treasures, thoughtfully crafted by nature.";
	const s_cta_text = settings?.cta_text ?? "VIEW ALL CATEGORIES";
	const s_cta_url = settings?.cta_url ?? "/shop";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "pt-24 pb-20 bg-[#F8F5EF] overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "container-page mb-14",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[12px] uppercase tracking-[6px] text-[#D97706] font-[600] mb-2 sm:mb-4",
						children: s_eyebrow
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-serif text-[34px] md:text-[44px] lg:text-[56px] font-[500] text-[#2B2118] leading-tight mb-[20px]",
						children: s_heading
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[17px] md:text-[21px] text-[#6B6257] max-w-[700px] leading-[1.7] mb-[36px]",
						children: s_desc
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: s_cta_url,
						className: "inline-flex items-center gap-2 text-[14px] font-bold tracking-wider text-[#D97706] hover:text-[#B46204] uppercase group",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: s_cta_text }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4 transition-transform duration-300 group-hover:translate-x-[6px]" })]
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-[1696px] mx-auto relative group px-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: scrollPrev,
					className: "absolute left-0 sm:left-8 lg:left-12 top-[40%] -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white sm:bg-white/40 backdrop-blur-md border border-gray-200 sm:border-white/60 shadow-md sm:shadow-lg flex items-center justify-center text-[#3B2E24] opacity-100 sm:opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-gray-50 sm:hover:bg-white/70",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
						className: "w-5 h-5 sm:w-6 sm:h-6",
						fill: "none",
						stroke: "currentColor",
						viewBox: "0 0 24 24",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							strokeLinecap: "round",
							strokeLinejoin: "round",
							strokeWidth: 2,
							d: "M15 19l-7-7 7-7"
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: scrollNext,
					className: "absolute right-0 sm:right-8 lg:right-12 top-[40%] -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white sm:bg-white/40 backdrop-blur-md border border-gray-200 sm:border-white/60 shadow-md sm:shadow-lg flex items-center justify-center text-[#3B2E24] opacity-100 sm:opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-gray-50 sm:hover:bg-white/70",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
						className: "w-5 h-5 sm:w-6 sm:h-6",
						fill: "none",
						stroke: "currentColor",
						viewBox: "0 0 24 24",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							strokeLinecap: "round",
							strokeLinejoin: "round",
							strokeWidth: 2,
							d: "M9 5l7 7-7 7"
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-hidden w-full",
					ref: emblaRef,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-4 sm:gap-[24px] py-6 touch-pan-y cursor-grab active:cursor-grabbing",
						children: displayCats.map((cat, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-[calc(50%_-_8px)] shrink-0 sm:shrink sm:w-auto sm:flex-[0_0_48%] md:flex-[0_0_31%] lg:flex-[0_0_23%] xl:flex-[0_0_18.5%] min-w-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/shop",
								search: cat.filter ? { category: cat.filter } : { category: "All Products" },
								className: "group relative flex flex-col shrink-0 overflow-hidden bg-white rounded-[16px] sm:rounded-[22px] shadow-[0_8px_20px_rgba(0,0,0,0.05)] sm:shadow-[0_10px_25px_rgba(0,0,0,0.05)] hover:shadow-[0_15px_35px_rgba(217,119,6,0.15)] transition-all duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] w-full aspect-square sm:aspect-[16/21] hover:scale-[1.03]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex-1 w-full overflow-hidden bg-[#F8F5EF]/50",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: cat.img,
										alt: cat.name,
										loading: "lazy",
										className: "w-full h-full object-cover transform transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05] pointer-events-none"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-[48px] sm:h-[18%] w-full bg-white flex items-center justify-center px-2 py-1 sm:p-2 shrink-0",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-serif text-[clamp(13px,1.5vw,18px)] sm:text-[18px] text-[#2B2118] font-medium transition-colors duration-[400ms] ease-out group-hover:text-[#D97706] text-center leading-tight",
										children: cat.name
									})
								})]
							})
						}, idx))
					})
				})
			]
		})]
	});
}
function HomeBestSellers({ products, onQuickView, settings }) {
	const [displayList, setDisplayList] = import_react.useState([]);
	const [loading, setLoading] = import_react.useState(true);
	import_react.useEffect(() => {
		const applyFallback = () => {
			const bestSellers = products.filter((p) => p.badge === "BESTSELLER" || (p.reviews || 0) > 200).slice(0, 4);
			setDisplayList(bestSellers.length >= 4 ? bestSellers : products.slice(0, 4));
		};
		fetchAllHomepageFeaturedProducts().then((selections) => {
			if (selections.length > 0) {
				const mappedProducts = selections.map((sel) => products.find((p) => p.slug === sel.product_slug)).filter((p) => p !== void 0);
				if (mappedProducts.length > 0) setDisplayList(mappedProducts);
				else applyFallback();
			} else applyFallback();
		}).catch((err) => {
			console.warn("Failed to fetch featured products, using fallback", err);
			applyFallback();
		}).finally(() => {
			setLoading(false);
		});
	}, [products]);
	if (loading) return null;
	const bs_eyebrow = settings?.eyebrow ?? "CURATED FOR YOU";
	const bs_heading = settings?.heading ?? "Our Finest Picks";
	const bs_desc = settings?.description ?? "A handpicked selection of our most loved honey and bee-crafted essentials, chosen for their exceptional purity and quality.";
	const bs_cta_text = settings?.cta_text ?? "VIEW ALL PRODUCTS";
	const bs_cta_url = settings?.cta_url ?? "/shop";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "pt-[100px] pb-14 sm:pb-20 bg-cream-deep/30 border-y border-border/60",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-page",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center text-center mb-[70px]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[12px] uppercase tracking-[6px] text-[#D97706] font-[600] mb-2 sm:mb-4",
							children: bs_eyebrow
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-serif text-[34px] md:text-[44px] lg:text-[56px] font-[500] text-[#2B2118] leading-tight mb-[20px]",
							children: bs_heading
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[17px] md:text-[21px] text-[#6B6257] max-w-[700px] leading-[1.7] mb-[36px]",
							children: bs_desc
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: bs_cta_url,
							className: "inline-flex items-center gap-2 text-[14px] font-bold tracking-wider text-[#D97706] hover:text-[#B46204] uppercase group",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: bs_cta_text }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4 transition-transform duration-300 group-hover:translate-x-[6px]" })]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "block md:hidden mt-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PremiumMobileCarousel, {
						items: displayList,
						slideClassName: "flex-[0_0_86vw] min-w-0",
						renderItem: (product) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, {
							p: product,
							onQuickView
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8",
					children: displayList.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, {
						p: product,
						onQuickView
					}, product.slug))
				})
			]
		})
	});
}
function HomeWhyChoose({ settings }) {
	const benefits = [
		"Pure & Unadulterated Honey",
		"Ethically Sourced & Sustainably Harvested",
		"Lab Tested for Moisture, HMF & Purity",
		"No Artificial Flavours or Preservatives"
	];
	const wc_eyebrow = settings?.eyebrow ?? "OUR HERITAGE";
	const wc_heading = settings?.heading ?? "Where Purity Begins";
	const wc_desc = settings?.description ?? "Every drop reflects generations of beekeeping, sustainable farming, and an unwavering commitment to quality.";
	const wc_cta_text = settings?.cta_text ?? "KNOW MORE ABOUT US";
	const wc_cta_url = settings?.cta_url ?? "/our-story";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "why-saurashtra-honey",
		className: "py-16 sm:py-24 bg-cream",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-page",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center text-center mb-[70px]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[12px] uppercase tracking-[6px] text-[#D97706] font-[600] mb-2 sm:mb-4",
							children: wc_eyebrow
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-serif text-[34px] md:text-[44px] lg:text-[56px] font-[500] text-[#2B2118] leading-tight mb-[20px]",
							children: wc_heading
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[17px] md:text-[21px] text-[#6B6257] max-w-[700px] leading-[1.7] mb-[36px]",
							children: wc_desc
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: wc_cta_url,
							className: "inline-flex items-center gap-2 text-[14px] font-bold tracking-wider text-[#D97706] hover:text-[#B46204] uppercase group",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: wc_cta_text }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4 transition-transform duration-300 group-hover:translate-x-[6px]" })]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-8 lg:hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-8 rounded-[24px] bg-white border border-[#2B2118]/10 space-y-4 shadow-sm text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "inline-flex items-center justify-center size-12 rounded-full bg-[#D97706]/10 text-[#D97706] mb-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-6" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "font-serif text-[26px] font-medium text-[#2B2118] leading-tight",
									children: [
										"Naturally Sweet.",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										"Truly Wholesome."
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[15px] text-[#6B6257] leading-relaxed px-2",
									children: "Experience the authentic aroma and floral notes of honey straight from the comb. No processing, no overheating—just 100% natural goodness."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "px-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "space-y-4",
								children: benefits.map((text, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-start gap-3 bg-white/50 p-4 rounded-[16px] border border-[#2B2118]/5 shadow-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-[22px] text-[#D97706] shrink-0 mt-[2px]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[15px] font-medium text-[#2B2118]",
										children: text
									})]
								}, idx))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-4 mt-2 px-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "rounded-[24px] overflow-hidden aspect-[4/5] shadow-sm",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: honey_drizzle_default,
									alt: "Raw honey pouring",
									loading: "lazy",
									className: "w-full h-full object-cover object-center"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "rounded-[24px] overflow-hidden aspect-[4/5] shadow-sm",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: bee_flower_default,
									alt: "Honey bee collecting nectar",
									loading: "lazy",
									className: "w-full h-full object-cover object-center"
								})
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hidden lg:grid grid-cols-12 gap-10 items-stretch",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "col-span-4 flex flex-col justify-center space-y-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "space-y-3.5 pt-1",
								children: benefits.map((text, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-start gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-5 text-brand-orange shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm sm:text-[15px] font-semibold text-espresso",
										children: text
									})]
								}, idx))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "col-span-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full rounded-3xl overflow-hidden shadow-lift border border-border/80 bg-cream-deep min-h-[340px] sm:min-h-[440px]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: honey_drizzle_default,
									alt: "Raw honey pouring",
									loading: "lazy",
									className: "w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "col-span-4 flex flex-col justify-between gap-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-8 rounded-3xl bg-cream-deep/60 border border-border/80 space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "inline-flex items-center justify-center size-12 rounded-2xl bg-brand-orange/15 text-brand-orange",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-6" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
										className: "font-serif text-2xl sm:text-3xl font-bold text-espresso leading-snug",
										children: [
											"Naturally Sweet.",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
											"Truly Wholesome."
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs sm:text-sm text-espresso/75 leading-relaxed",
										children: "Experience the authentic aroma and floral notes of honey straight from the comb. No processing, no overheating—just 100% natural goodness."
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex-1 rounded-3xl overflow-hidden shadow-lift border border-border/80 bg-cream-deep min-h-[220px]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: bee_flower_default,
									alt: "Honey bee collecting nectar from wild flora",
									loading: "lazy",
									className: "w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
								})
							})]
						})
					]
				})
			]
		})
	});
}
function HomeFarmBanner({ settings }) {
	const fb_eyebrow = settings?.eyebrow ?? "BEEKEEPING";
	const fb_heading = settings?.heading ?? "The Art of Beekeeping";
	const fb_desc = settings?.description ?? "A closer look at the people, passion, and practices that make our honey naturally exceptional.";
	const fb_cta_text = settings?.cta_text ?? "LEARN ABOUT OUR FARMS";
	const fb_cta_url = settings?.cta_url ?? "/bee-farming";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative overflow-hidden my-6 sm:my-10 bg-espresso text-white",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "absolute inset-0 z-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: bee_farm_default,
				alt: "Saurashtra Beekeeping farm",
				loading: "lazy",
				className: "w-full h-full object-cover object-center opacity-40"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-r from-espresso/95 via-espresso/80 to-espresso/60" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative z-10 container-page py-16 sm:py-24",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center text-center max-w-none mb-[70px]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[12px] uppercase tracking-[6px] text-[#D97706] font-[600] mb-2 sm:mb-4",
						children: fb_eyebrow
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-serif text-[34px] md:text-[44px] lg:text-[56px] font-[500] text-[#FFF9ED] leading-tight mb-[20px]",
						children: fb_heading
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[17px] md:text-[21px] text-[#FFF9ED]/80 max-w-[700px] leading-[1.7] mb-[36px]",
						children: fb_desc
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: fb_cta_url,
						className: "inline-flex items-center gap-2 text-[14px] font-bold tracking-wider text-[#D97706] hover:text-[#B46204] uppercase group",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: fb_cta_text }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4 transition-transform duration-300 group-hover:translate-x-[6px]" })]
					})
				]
			})
		})]
	});
}
function HomeStatsStrip({ settings }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-cream-deep/50 border-b border-border/80 py-10 sm:py-12",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "container-page",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 text-center",
				children: (Array.isArray(settings?.stats) && settings.stats.length > 0 ? settings.stats : [
					{
						value: "15+ Years",
						label: "Beekeeping Experience"
					},
					{
						value: "2000+",
						label: "Happy Customers Across India"
					},
					{
						value: "500+",
						label: "Bee Boxes Under Care"
					},
					{
						value: "100%",
						label: "Lab Tested For Purity"
					},
					{
						value: "0%",
						label: "Additives Always Pure"
					}
				]).map(({ value, label }, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4 rounded-2xl bg-cream/70 border border-border/60 shadow-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-serif text-2xl sm:text-3xl font-bold text-brand-orange",
						children: value
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs sm:text-sm font-semibold text-espresso/80 mt-1",
						children: label
					})]
				}, idx))
			})
		})
	});
}
function HomeTestimonials({ reviews, settings }) {
	const fallbackTestimonials = [
		{
			id: "t1",
			author_name: "Neha Shah",
			location: "Ahmedabad, Gujarat",
			content: "The Ajwain flora honey is incredible. You can actually smell and taste the difference from commercial store brands. My family loves it!",
			rating: 5,
			avatar: family_honey_default
		},
		{
			id: "t2",
			author_name: "Karan Mehta",
			location: "Rajkot, Gujarat",
			content: "Finally found an authentic raw honey brand from Gujarat. Every bottle comes with NABL test purity reports. Super trustworthy!",
			rating: 5,
			avatar: honey_drizzle_default
		},
		{
			id: "t3",
			author_name: "Ritika Verma",
			location: "Surat, Gujarat",
			content: "The raw honeycomb was a hit with my kids! Truly unfiltered, natural sweetness without any artificial aftertaste.",
			rating: 5,
			avatar: bee_flower_default
		}
	];
	const items = reviews && reviews.length >= 3 ? reviews.slice(0, 3).map((r, i) => ({
		id: r.id,
		author_name: r.author_name,
		location: r.location || "Gujarat, India",
		content: r.content,
		rating: r.rating || 5,
		avatar: fallbackTestimonials[i % fallbackTestimonials.length]?.avatar
	})) : fallbackTestimonials;
	const tm_eyebrow = settings?.eyebrow ?? "TRUSTED BY MANY";
	const tm_heading = settings?.heading ?? "Loved Across India";
	const tm_desc = settings?.description ?? "Real experiences shared by customers who choose purity every day.";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "py-16 sm:py-24 bg-cream",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-page",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center text-center mb-[70px]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[12px] uppercase tracking-[6px] text-[#D97706] font-[600] mb-2 sm:mb-4",
							children: tm_eyebrow
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-serif text-[34px] md:text-[44px] lg:text-[56px] font-[500] text-[#2B2118] leading-tight mb-[20px]",
							children: tm_heading
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[17px] md:text-[21px] text-[#6B6257] max-w-[700px] leading-[1.7]",
							children: tm_desc
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "block md:hidden mt-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PremiumMobileCarousel, {
						items,
						slideClassName: "flex-[0_0_86vw] min-w-0",
						renderItem: (item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col justify-between p-7 rounded-[22px] bg-white border border-border/80 shadow-[0_12px_30px_rgba(0,0,0,0.06)] h-full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center gap-1 text-brand-orange mb-4",
								"aria-label": `${item.rating} out of 5 stars`,
								children: [...Array(item.rating)].map((_, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-4 fill-brand-orange text-brand-orange" }, idx))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
								className: "text-[14px] text-espresso/90 leading-relaxed italic mb-6",
								children: [
									"“",
									item.content,
									"”"
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3.5 pt-4 border-t border-border/60",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "size-12 rounded-full overflow-hidden border-2 border-brand-orange/40 shrink-0 bg-cream",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: item.avatar,
										alt: item.author_name,
										loading: "lazy",
										className: "w-full h-full object-cover pointer-events-none"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-serif font-bold text-[14px] text-espresso",
									children: item.author_name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[12px] text-muted-foreground",
									children: item.location
								})] })]
							})]
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hidden md:grid md:grid-cols-3 gap-6 sm:gap-8",
					children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col justify-between p-7 sm:p-8 rounded-3xl bg-cream-deep/40 border border-border/80 shadow-sm hover:shadow-md transition-shadow",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center gap-1 text-brand-orange mb-4",
							"aria-label": `${item.rating} out of 5 stars`,
							children: [...Array(item.rating)].map((_, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-4 fill-brand-orange text-brand-orange" }, idx))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
							className: "text-sm sm:text-base text-espresso/90 leading-relaxed italic mb-6",
							children: [
								"“",
								item.content,
								"”"
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3.5 pt-4 border-t border-border/60",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "size-12 rounded-full overflow-hidden border-2 border-brand-orange/40 shrink-0 bg-cream",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: item.avatar,
									alt: item.author_name,
									loading: "lazy",
									className: "w-full h-full object-cover"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-serif font-bold text-sm sm:text-base text-espresso",
								children: item.author_name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground",
								children: item.location
							})] })]
						})]
					}, item.id))
				})
			]
		})
	});
}
function HomeJournalPreview({ posts, settings }) {
	const displayPosts = posts.slice(0, 3);
	const jp_eyebrow = settings?.eyebrow ?? "JOIN OUR JOURNEY";
	const jp_heading = settings?.heading ?? "Follow Our Hive";
	const jp_desc = settings?.description ?? "Stay connected for new harvests, behind-the-scenes moments, and everyday inspiration from our farms.";
	const jp_cta_text = settings?.cta_text ?? "READ OUR STORIES";
	const jp_cta_url = settings?.cta_url ?? "/blog";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "py-16 sm:py-24 bg-cream-deep/25 border-t border-border/80",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-page",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center text-center mb-[70px]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[12px] uppercase tracking-[6px] text-[#D97706] font-[600] mb-2 sm:mb-4",
							children: jp_eyebrow
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-serif text-[34px] md:text-[44px] lg:text-[56px] font-[500] text-[#2B2118] leading-tight mb-[20px]",
							children: jp_heading
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[17px] md:text-[21px] text-[#6B6257] max-w-[700px] leading-[1.7] mb-[36px]",
							children: jp_desc
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: jp_cta_url,
							className: "inline-flex items-center gap-2 text-[14px] font-bold tracking-wider text-[#D97706] hover:text-[#B46204] uppercase group",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: jp_cta_text }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4 transition-transform duration-300 group-hover:translate-x-[6px]" })]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "block md:hidden mt-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PremiumMobileCarousel, {
						items: displayPosts,
						slideClassName: "flex-[0_0_86vw] min-w-0",
						renderItem: (post) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "group flex flex-col rounded-[22px] overflow-hidden bg-white border border-border/80 shadow-[0_12px_30px_rgba(0,0,0,0.06)] transition-all duration-300 h-full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/blog/$slug",
								params: { slug: post.slug },
								className: "block overflow-hidden aspect-[16/10]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: post.image,
									alt: post.title,
									loading: "lazy",
									className: "w-full h-full object-cover object-center pointer-events-none"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-6 flex flex-col flex-1 justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "inline-block text-[11px] font-bold uppercase tracking-widest text-brand-orange",
										children: post.category
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-serif text-[18px] font-bold leading-snug text-espresso",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/blog/$slug",
											params: { slug: post.slug },
											children: post.title
										})
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/blog/$slug",
									params: { slug: post.slug },
									className: "inline-flex items-center gap-2 text-[12px] font-bold tracking-widest text-brand-orange hover:text-[#B46204] transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "READ ARTICLE" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5" })]
								})]
							})]
						}, post.slug)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hidden md:grid md:grid-cols-3 gap-6 sm:gap-8",
					children: displayPosts.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "group flex flex-col rounded-3xl overflow-hidden bg-cream border border-border/80 shadow-xs hover:shadow-lift transition-all duration-300",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/blog/$slug",
							params: { slug: post.slug },
							className: "block overflow-hidden aspect-[16/10]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: post.image,
								alt: post.title,
								loading: "lazy",
								className: "w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-6 sm:p-7 flex flex-col flex-1 justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "inline-block text-[10px] sm:text-xs font-bold uppercase tracking-widest text-brand-orange",
										children: post.category
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-serif text-lg sm:text-xl font-bold leading-snug text-espresso group-hover:text-brand-orange transition-colors",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/blog/$slug",
											params: { slug: post.slug },
											children: post.title
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs sm:text-sm text-espresso/75 line-clamp-2 leading-relaxed",
										children: post.excerpt
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "pt-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/blog/$slug",
									params: { slug: post.slug },
									className: "inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold tracking-widest text-brand-orange hover:text-[#B46204] transition-colors group-hover:translate-x-1 duration-300",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "READ ARTICLE" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5" })]
								})
							})]
						})]
					}, post.slug))
				})
			]
		})
	});
}
var CANONICAL_SECTIONS = [
	"hero",
	"trust_strip",
	"shop_by_category",
	"featured_products",
	"shoppable_videos",
	"why_choose",
	"farm_banner",
	"stats_strip",
	"testimonials",
	"journal"
];
function Home() {
	const [quick, setQuick] = (0, import_react.useState)(null);
	const [list, setList] = (0, import_react.useState)([]);
	const [reviews, setReviews] = (0, import_react.useState)([]);
	const [cmsMap, setCmsMap] = (0, import_react.useState)({});
	const [cmsLoaded, setCmsLoaded] = (0, import_react.useState)(false);
	const [homePosts, setHomePosts] = (0, import_react.useState)([]);
	const fetchPostsFn = useServerFn(listPublicPosts);
	(0, import_react.useEffect)(() => {
		fetchProducts().then((r) => {
			if (r.length > 0) setList(r);
		});
		fetchHomepageSections().then((data) => {
			const map = {};
			for (const sec of data) map[sec.section_key] = sec;
			setCmsMap(map);
		}).catch((err) => {
			console.warn("[Homepage] CMS sections unavailable — rendering defaults:", err);
		}).finally(() => {
			setCmsLoaded(true);
		});
		fetchPostsFn({ data: {
			page: 1,
			pageSize: 3
		} }).then((res) => {
			if (res.rows && res.rows.length > 0) setHomePosts(res.rows.map((p) => ({
				slug: p.slug,
				title: p.title,
				excerpt: p.excerpt || "",
				category: p.category_name || "Journal",
				displayDate: formatPostDate(p.published_at || p.created_at),
				readTime: p.reading_time || "5 min read",
				image: resolvePostImage(p.cover_image_url, p.category_name || p.slug)
			})));
		});
		supabase.from("reviews").select("id, author_name, content, rating, location").eq("featured_on_homepage", true).order("created_at", { ascending: false }).limit(6).then(({ data, error }) => {
			if (!error && data && data.length >= 3) setReviews(data);
			else supabase.from("reviews").select("id, author_name, content, rating, location").eq("status", "approved").order("created_at", { ascending: false }).limit(6).then((res) => {
				if (res.data && res.data.length >= 3) setReviews(res.data);
			});
		});
	}, []);
	const orderedSections = (() => {
		const allKeysInCms = CANONICAL_SECTIONS.every((k) => cmsMap[k] !== void 0);
		let keys;
		if (allKeysInCms) keys = [...CANONICAL_SECTIONS].sort((a, b) => {
			return (cmsMap[a]?.sort_order ?? 999) - (cmsMap[b]?.sort_order ?? 999);
		});
		else keys = [...CANONICAL_SECTIONS];
		return keys.filter((k) => {
			const rec = cmsMap[k];
			if (!rec) return true;
			return rec.enabled !== false;
		});
	})();
	const renderSection = (key) => {
		const settings = cmsMap[key]?.settings ?? {};
		switch (key) {
			case "hero": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeHero, {}, "hero");
			case "trust_strip": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeTrustStrip, { settings }, "trust_strip");
			case "shop_by_category": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeShopByCategory, { settings }, "shop_by_category");
			case "featured_products": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeBestSellers, {
				products: list,
				onQuickView: setQuick,
				settings
			}, "featured_products");
			case "shoppable_videos": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppableVideoCarousel, { placementContext: "homepage" }, "shoppable_videos");
			case "why_choose": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeWhyChoose, { settings }, "why_choose");
			case "farm_banner": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeFarmBanner, { settings }, "farm_banner");
			case "stats_strip": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeStatsStrip, { settings }, "stats_strip");
			case "testimonials": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeTestimonials, {
				reviews,
				settings
			}, "testimonials");
			case "journal": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeJournalPreview, {
				posts: homePosts,
				settings
			}, "journal");
			default: return null;
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StructuredData, { data: organizationLd() }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StructuredData, { data: breadcrumbLd([{
			name: "Home",
			url: "/"
		}]) }),
		orderedSections.map(renderSection),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickView, {
			product: quick,
			onClose: () => setQuick(null)
		})
	] });
}
//#endregion
export { Home as component };
