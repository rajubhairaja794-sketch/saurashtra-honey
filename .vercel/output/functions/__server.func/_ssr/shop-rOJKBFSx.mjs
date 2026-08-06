import { i as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, n as CheckboxIndicator, p as require_react, t as Checkbox$1 } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as fetchProducts } from "./product-catalog-nTITKWF8.mjs";
import { n as fetchShopCategories, t as DEFAULT_SHOP_CATEGORIES } from "./category-catalog-8KCBEqqu.mjs";
import { O as Search, Xt as Check, at as LayoutGrid, tt as List, x as SlidersHorizontal } from "../_libs/lucide-react.mjs";
import { n as SiteLayout } from "./Layout-vj9XDuOl.mjs";
import { n as toItem, r as track } from "./analytics-By36XOiQ.mjs";
import { r as hero_products_default } from "./hero-catalog-WFU6Elpd.mjs";
import { t as PageHeroSlider } from "./PageHeroSlider-mZMVe2Y7.mjs";
import { t as useEmblaCarousel } from "../_libs/embla-carousel-react+[...].mjs";
import { t as Autoplay } from "../_libs/embla-carousel-autoplay.mjs";
import { n as breadcrumbLd, t as StructuredData } from "./StructuredData-C0TBI3qI.mjs";
import { t as ProductCard } from "./ProductCard-CO0CmP46.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as QuickView } from "./QuickView-BwkTVJcc.mjs";
import { a as SheetTitle, i as SheetHeader, n as Sheet, o as SheetTrigger, r as SheetContent, t as Route } from "./shop-BjocE6mC.mjs";
import { t as Drawer } from "../_libs/vaul.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shop-rOJKBFSx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ShopCategorySection({ activeCategory }) {
	const [categories, setCategories] = (0, import_react.useState)([{
		name: "All Products",
		img: hero_products_default,
		filter: "",
		slug: "all"
	}]);
	(0, import_react.useEffect)(() => {
		fetchShopCategories().then((cats) => {
			const formatted = cats.map((c) => ({
				name: c.name,
				img: c.image,
				filter: c.name.toLowerCase(),
				slug: c.slug
			}));
			setCategories([{
				name: "All Products",
				img: hero_products_default,
				filter: "",
				slug: "all"
			}, ...formatted]);
		});
	}, []);
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
	const displayCats = [
		...categories,
		...categories,
		...categories
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "pt-24 pb-16 bg-[#F8F5EF] overflow-hidden flex flex-col items-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-page text-center mb-[70px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[12px] font-medium tracking-[5px] uppercase text-[#D97706] mb-3",
				children: "DISCOVER BY CATEGORY"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-serif text-[58px] font-[500] text-[#2B2118] leading-tight",
				children: "Shop by Category"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-[1596px] mx-auto relative pb-10 group px-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: scrollPrev,
					className: "absolute left-8 sm:left-12 top-[40%] -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/40 backdrop-blur-md border border-white/60 shadow-lg flex items-center justify-center text-[#3B2E24] opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white/70 hidden sm:flex",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
						className: "w-6 h-6",
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
					className: "absolute right-8 sm:right-12 top-[40%] -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/40 backdrop-blur-md border border-white/60 shadow-lg flex items-center justify-center text-[#3B2E24] opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white/70 hidden sm:flex",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
						className: "w-6 h-6",
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
						className: "flex gap-[24px] py-6 touch-pan-y cursor-grab active:cursor-grabbing",
						children: displayCats.map((cat, idx) => {
							const isActive = activeCategory === cat.name || cat.name === "All Products" && (activeCategory === "All Products" || activeCategory === "All" || activeCategory === "all") || activeCategory.toLowerCase() === cat.filter.toLowerCase();
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex-[0_0_48%] md:flex-[0_0_31%] lg:flex-[0_0_23%] xl:flex-[0_0_18.5%] min-w-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: cat.slug === "all" ? "/shop" : "/collections/$slug",
									params: cat.slug === "all" ? void 0 : { slug: cat.slug },
									className: `group relative flex flex-col shrink-0 cursor-pointer overflow-hidden bg-white
                      rounded-[24px] shadow-[0_12px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.12)]
                      transition-all duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)]
                      w-full aspect-[3/4]
                      ${isActive ? "ring-2 ring-[#D97706] ring-offset-2 ring-offset-[#F8F5EF]" : ""}
                      hover:scale-[1.03]
                    `,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-[80%] w-full overflow-hidden bg-[#F8F5EF]/50",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: cat.img,
											alt: cat.name,
											loading: "lazy",
											className: "w-full h-full object-cover transform transition-transform duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05] pointer-events-none"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-[20%] w-full bg-white flex items-center justify-center p-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: `font-serif text-[clamp(14px,1.5vw,18px)] font-medium transition-colors duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${isActive ? "text-[#D97706]" : "text-[#3B2E24] group-hover:text-[#D97706]"}`,
											children: cat.name
										})
									})]
								})
							}, idx);
						})
					})
				})
			]
		})]
	});
}
var Drawer$1 = ({ shouldScaleBackground = true, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Root, {
	shouldScaleBackground,
	...props
});
Drawer$1.displayName = "Drawer";
var DrawerTrigger = Drawer.Trigger;
var DrawerPortal = Drawer.Portal;
Drawer.Close;
var DrawerOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Overlay, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80", className),
	...props
}));
DrawerOverlay.displayName = Drawer.Overlay.displayName;
var DrawerContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Drawer.Content, {
	ref,
	className: cn("fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" }), children]
})] }));
DrawerContent.displayName = "DrawerContent";
var DrawerHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("grid gap-1.5 p-4 text-center sm:text-left", className),
	...props
});
DrawerHeader.displayName = "DrawerHeader";
var DrawerFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("mt-auto flex flex-col gap-2 p-4", className),
	...props
});
DrawerFooter.displayName = "DrawerFooter";
var DrawerTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Title, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DrawerTitle.displayName = Drawer.Title.displayName;
var DrawerDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Description, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DrawerDescription.displayName = Drawer.Description.displayName;
var Checkbox = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$1, {
	ref,
	className: cn("grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxIndicator, {
		className: cn("grid place-content-center text-current"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" })
	})
}));
Checkbox.displayName = Checkbox$1.displayName;
var FILTER_OPTIONS = {
	honeyType: [
		"Ajwain",
		"Multiflora",
		"Neem",
		"Fennel",
		"Wild Forest",
		"Organic"
	],
	packSize: [
		"250g",
		"500g",
		"1kg"
	],
	availability: ["In Stock", "Out of Stock"],
	rating: ["★★★★★", "★★★★☆"],
	discount: [
		"10% Off or more",
		"20% Off or more",
		"30% Off or more"
	]
};
var defaultFilters = {
	honeyType: [],
	packSize: [],
	availability: [],
	rating: [],
	discount: []
};
function FilterSections({ filters, setFilters }) {
	const toggleFilter = (category, value) => {
		setFilters((prev) => {
			const current = prev[category];
			const updated = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
			return {
				...prev,
				[category]: updated
			};
		});
	};
	const renderSection = (title, category, options) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "py-5 border-b border-[#2B2118]/10 last:border-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
			className: "font-serif text-[15px] font-bold text-[#2B2118] mb-3",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-2.5",
			children: options.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex items-center gap-3 cursor-pointer group",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
					checked: filters[category].includes(opt),
					onCheckedChange: () => toggleFilter(category, opt),
					className: "border-[#D97706]/30 data-[state=checked]:bg-[#D97706] data-[state=checked]:border-[#D97706] rounded-[4px] w-[18px] h-[18px]"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[14px] text-[#6B6257] group-hover:text-[#2B2118] transition-colors",
					children: opt
				})]
			}, opt))
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-1",
		children: [
			renderSection("Honey Type", "honeyType", FILTER_OPTIONS.honeyType),
			renderSection("Pack Size", "packSize", FILTER_OPTIONS.packSize),
			renderSection("Availability", "availability", FILTER_OPTIONS.availability),
			renderSection("Rating", "rating", FILTER_OPTIONS.rating),
			renderSection("Discount", "discount", FILTER_OPTIONS.discount)
		]
	});
}
function DesktopFilterSheet({ children, filters, setFilters, onApply }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const handleReset = () => {
		setFilters(defaultFilters);
	};
	const handleApply = () => {
		onApply();
		setOpen(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
		open,
		onOpenChange: setOpen,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
			asChild: true,
			children
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
			side: "right",
			className: "w-[380px] sm:w-[400px] p-0 border-l border-[#2B2118]/10 flex flex-col bg-[#FDFBF7]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetHeader, {
					className: "px-6 py-5 border-b border-[#2B2118]/10 flex flex-row items-center justify-between",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetTitle, {
						className: "font-serif text-xl font-bold text-[#2B2118] flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "size-5 text-[#D97706]" }), " Filters"]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1 overflow-y-auto px-6 py-2 custom-scrollbar",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterSections, {
						filters,
						setFilters
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-6 border-t border-[#2B2118]/10 bg-white grid grid-cols-2 gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: handleReset,
						className: "px-4 py-3.5 rounded-full border border-[#2B2118]/20 text-[#2B2118] font-bold text-[13px] tracking-widest uppercase hover:bg-[#F8F5EF] transition-colors",
						children: "Reset"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: handleApply,
						className: "px-4 py-3.5 rounded-full bg-[#2B2118] text-white font-bold text-[13px] tracking-widest uppercase hover:bg-[#D97706] transition-colors shadow-md hover:shadow-lg",
						children: "Apply Filters"
					})]
				})
			]
		})]
	});
}
function MobileFilterDrawer({ children, filters, setFilters, onApply }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const handleReset = () => {
		setFilters(defaultFilters);
	};
	const handleApply = () => {
		onApply();
		setOpen(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Drawer$1, {
		open,
		onOpenChange: setOpen,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerTrigger, {
			asChild: true,
			children
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerContent, {
			className: "bg-[#FDFBF7]/95 backdrop-blur-xl border-t border-[#2B2118]/10 rounded-t-[28px] max-h-[85vh]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerHeader, {
					className: "text-left px-6 py-4 border-b border-[#2B2118]/10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerTitle, {
						className: "font-serif text-xl font-bold text-[#2B2118] flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "size-5 text-[#D97706]" }), " Filters"]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1 overflow-y-auto px-6 py-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterSections, {
						filters,
						setFilters
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-5 pb-8 border-t border-[#2B2118]/10 bg-white/80 backdrop-blur-md grid grid-cols-2 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: handleReset,
						className: "px-4 py-3.5 rounded-[16px] border border-[#2B2118]/20 text-[#2B2118] font-bold text-[13px] tracking-widest uppercase active:scale-95 transition-transform",
						children: "Reset"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: handleApply,
						className: "px-4 py-3.5 rounded-[16px] bg-[#D97706] text-white font-bold text-[13px] tracking-widest uppercase shadow-md active:scale-95 transition-transform",
						children: "Apply Filters"
					})]
				})
			]
		})]
	});
}
function Shop() {
	const search = Route.useSearch();
	useNavigate({ from: Route.fullPath });
	const [products, setProducts] = (0, import_react.useState)([]);
	const [categories, setCategories] = (0, import_react.useState)(DEFAULT_SHOP_CATEGORIES);
	const [quick, setQuick] = (0, import_react.useState)(null);
	const [cat, setCat] = (0, import_react.useState)(search.category || search.cat || "All Products");
	const [q, setQ] = (0, import_react.useState)(search.q || "");
	const [sort, setSort] = (0, import_react.useState)(search.sort || "popular");
	const [viewMode, setViewMode] = (0, import_react.useState)("grid");
	const [filters, setFilters] = (0, import_react.useState)(defaultFilters);
	const applyFilters = () => {};
	(0, import_react.useEffect)(() => {
		fetchProducts().then((r) => {
			const mergedMap = /* @__PURE__ */ new Map();
			if (r && r.length > 0) r.forEach((p) => {
				mergedMap.set(p.slug, p);
			});
			const validCategories = [
				"Honey",
				"Beeswax",
				"Bee Pollen",
				"Beeswax Candles",
				"Beauty Products",
				"Gift Hampers"
			];
			const normalizedProducts = Array.from(mergedMap.values()).map((p) => {
				let finalCat = p.category;
				if (finalCat === "Beeswax Candle") finalCat = "Beeswax Candles";
				if (finalCat === "Beeswax Products") finalCat = "Beauty Products";
				if (p.name.includes("Gift Pack")) finalCat = "Gift Hampers";
				if (!validCategories.includes(finalCat)) if (p.name.includes("Honey")) finalCat = "Honey";
				else finalCat = "Honey";
				return {
					...p,
					category: finalCat
				};
			});
			setProducts(normalizedProducts);
		});
		fetchShopCategories().then((r) => {
			if (r.length > 0) setCategories(r);
		});
	}, []);
	(0, import_react.useEffect)(() => {
		const nextCat = search.category || search.cat || "All Products";
		setCat(nextCat);
		if (search.q !== void 0) setQ(search.q || "");
		if (search.sort !== void 0) setSort(search.sort || "popular");
	}, [
		search.category,
		search.cat,
		search.q,
		search.sort
	]);
	const updateUrlWithoutScrolling = (0, import_react.useCallback)((newCat, newQ, newSort) => {
		if (typeof window === "undefined") return;
		const params = new URLSearchParams(window.location.search);
		if (newCat && newCat !== "All Products" && newCat !== "All" && newCat !== "all") {
			params.set("cat", newCat);
			params.delete("category");
		} else {
			params.delete("cat");
			params.delete("category");
		}
		if (newQ.trim()) params.set("q", newQ.trim());
		else params.delete("q");
		if (newSort && newSort !== "popular") params.set("sort", newSort);
		else params.delete("sort");
		const queryStr = params.toString();
		const nextUrl = window.location.pathname + (queryStr ? `?${queryStr}` : "");
		window.history.replaceState(null, "", nextUrl);
	}, []);
	const handleSelectCategory = (newCatName) => {
		setCat(newCatName);
		updateUrlWithoutScrolling(newCatName, q, sort);
		setTimeout(() => {
			const el = document.getElementById("products-grid");
			if (el) el.scrollIntoView({
				behavior: "smooth",
				block: "start"
			});
		}, 40);
	};
	const handleSortChange = (newSort) => {
		setSort(newSort);
		updateUrlWithoutScrolling(cat, q, newSort);
	};
	const filtered = (0, import_react.useMemo)(() => {
		let list = [...products];
		if (cat !== "All Products" && cat !== "All" && cat !== "all") {
			const catLower = cat.toLowerCase().trim();
			list = list.filter((p) => {
				return (p.category ? p.category.toLowerCase().trim() : "") === catLower;
			});
		}
		if (q.trim()) {
			const term = q.trim().toLowerCase();
			list = list.filter((p) => [
				p.name,
				p.tagline,
				p.description,
				p.flora ?? "",
				p.category,
				...p.benefits ?? []
			].join(" ").toLowerCase().includes(term));
		}
		switch (sort) {
			case "price-asc":
				list.sort((a, b) => a.price - b.price);
				break;
			case "price-desc":
				list.sort((a, b) => b.price - a.price);
				break;
			case "rating":
				list.sort((a, b) => (b.rating || 5) - (a.rating || 5));
				break;
			case "newest":
				list.sort((a, b) => (b.badge === "NEW" ? 1 : 0) - (a.badge === "NEW" ? 1 : 0));
				break;
			default: list.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
		}
		return list;
	}, [
		cat,
		q,
		sort,
		products
	]);
	(0, import_react.useEffect)(() => {
		track("view_item_list", {
			item_list_name: cat,
			items: filtered.slice(0, 20).map((p) => toItem(p))
		});
	}, [cat, filtered]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StructuredData, { data: breadcrumbLd([{
			name: "Home",
			url: "/"
		}, {
			name: "Shop",
			url: "/shop"
		}]) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeroSlider, { page: "shop" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShopCategorySection, { activeCategory: cat }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-cream pt-10 sm:pt-16 pb-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "container-page",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative max-w-xl mx-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-5 top-1/2 -translate-y-1/2 size-5 text-espresso/40 pointer-events-none" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						placeholder: "Search honey, bee products...",
						value: q,
						onChange: (e) => {
							setQ(e.target.value);
							updateUrlWithoutScrolling(cat, e.target.value, sort);
						},
						className: "w-full pl-14 pr-6 py-4 rounded-2xl bg-white border border-border/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)] text-[15px] text-espresso placeholder:text-espresso/40 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all"
					})]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-cream border-b border-border/80 pt-2 pb-5 overflow-hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "container-page",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-3 overflow-x-auto no-scrollbar scroll-smooth snap-x pb-2",
					style: {
						scrollbarWidth: "none",
						msOverflowStyle: "none"
					},
					children: [
						"All Products",
						"Honey",
						"Beeswax",
						"Bee Pollen",
						"Beeswax Candles",
						"Beauty Products",
						"Gift Hampers"
					].map((chip) => {
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => handleSelectCategory(chip),
							className: `shrink-0 snap-start px-6 py-3 rounded-full text-[13px] font-bold tracking-wide transition-all duration-[250ms] min-h-[48px] ${cat === chip || chip === "All Products" && (cat === "All" || cat === "all") ? "bg-brand-orange text-white shadow-[0_4px_14px_rgba(217,119,6,0.2)]" : "bg-[#FDFBF7] text-espresso border border-border/80 hover:border-brand-orange/50 hover:bg-[#F8F5EF]"}`,
							children: chip
						}, chip);
					})
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			id: "products-grid",
			className: "py-10 sm:py-12 bg-cream",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-page",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-30 bg-cream py-4 mb-8 border-b sm:border-none border-border/80 flex flex-wrap items-center justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden sm:block text-[15px] text-espresso/80 font-medium",
						children: [
							"Showing ",
							filtered.length,
							" products"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "hidden sm:block",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DesktopFilterSheet, {
									filters,
									setFilters,
									onApply: applyFilters,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: "flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-border/80 text-[14px] font-bold text-espresso shadow-xs hover:border-brand-orange hover:text-brand-orange transition-colors min-h-[48px]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
											width: "18",
											height: "18",
											viewBox: "0 0 24 24",
											fill: "none",
											stroke: "currentColor",
											strokeWidth: "2",
											strokeLinecap: "round",
											strokeLinejoin: "round",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", { points: "22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" })
										}), "Filter"]
									})
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: sort,
								onChange: (e) => handleSortChange(e.target.value),
								className: "border border-border/80 rounded-xl px-4 py-3 text-[14px] bg-white text-espresso font-bold focus:outline-none focus:border-brand-orange shadow-xs cursor-pointer min-h-[48px]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "popular",
										children: "Featured"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "newest",
										children: "Newest"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "popular",
										children: "Best Selling"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "price-asc",
										children: "Price Low to High"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "price-desc",
										children: "Price High to Low"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "rating",
										children: "Highest Rated"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "hidden sm:flex items-center gap-1 border border-border/80 rounded-xl p-1 bg-white shadow-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setViewMode("grid"),
									className: `size-10 rounded-lg flex items-center justify-center transition-colors ${viewMode === "grid" ? "bg-brand-orange text-white" : "text-muted-foreground hover:text-espresso"}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutGrid, { className: "size-4.5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setViewMode("list"),
									className: `size-10 rounded-lg flex items-center justify-center transition-colors ${viewMode === "list" ? "bg-brand-orange text-white" : "text-muted-foreground hover:text-espresso"}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, { className: "size-4.5" })
								})]
							})
						]
					})]
				}), filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white border border-border/80 rounded-3xl p-16 text-center shadow-soft max-w-xl mx-auto my-12",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-5xl mb-4",
							children: "🐝"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-serif text-2xl font-bold text-espresso",
							children: "No honey matches your filter"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-espresso/70",
							children: "Try selecting a different category or viewing all products."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								setCat("All Products");
								setQ("");
								updateUrlWithoutScrolling("All Products", "", sort);
							},
							className: "mt-6 inline-flex items-center gap-2 bg-brand-orange text-white px-7 py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-brand-orange-hover transition-colors shadow-sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "VIEW ALL PRODUCTS" })
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `grid gap-5 sm:gap-8 ${viewMode === "grid" ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : "grid-cols-1 md:grid-cols-2"}`,
					children: filtered.map((product, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out fill-mode-both",
						style: { animationDelay: `${idx * 40}ms` },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, {
							p: product,
							onQuickView: (p) => setQuick(p)
						})
					}, `${product.slug}-${cat}`))
				}) })]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickView, {
			product: quick,
			onClose: () => setQuick(null)
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "fixed bottom-6 left-1/2 -translate-x-1/2 z-40 block sm:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileFilterDrawer, {
				filters,
				setFilters,
				onApply: applyFilters,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-espresso text-white text-[14px] font-bold shadow-[0_8px_30px_rgba(0,0,0,0.12)] min-h-[48px] active:scale-95 transition-transform",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
						width: "16",
						height: "16",
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "2.5",
						strokeLinecap: "round",
						strokeLinejoin: "round",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", { points: "22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" })
					}), "Filter & Sort"]
				})
			})
		})
	] });
}
//#endregion
export { Shop as component };
