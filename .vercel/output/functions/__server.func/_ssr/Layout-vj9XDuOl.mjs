import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CWNNtKRC.mjs";
import { d as require_react_dom, f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { n as useAuth } from "./auth-6Mbne5z8.mjs";
import { c as useCompanyLogoUrl, o as getCategorySlug, s as useCart, u as useWishlist } from "./collection-helpers-BfZPBpPQ.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as fetchProducts } from "./product-catalog-nTITKWF8.mjs";
import { t as useServerFn } from "./useServerFn-BqzygRuj.mjs";
import { h as fetchPublicSiteSettings, p as fetchAnnouncements } from "./homepage-cms.functions-BAU0l-41.mjs";
import { n as fetchShopCategories, t as DEFAULT_SHOP_CATEGORIES } from "./category-catalog-8KCBEqqu.mjs";
import { n as subscribeNewsletter } from "./newsletter.functions-CMwaAROD.mjs";
import "../_libs/sonner.mjs";
import { C as ShoppingBag, H as Package, I as Phone, J as Menu, Mt as Facebook, O as Search, Ot as Flame, S as ShoppingCart, Tt as Gift, X as MapPin, Z as Mail, _ as Store, b as Sparkles, c as User, gt as Heart, ht as House, i as X, in as Bell, it as Leaf, nt as Linkedin, q as MessageCircle, qt as ChevronRight, r as Youtube, sn as ArrowUp, ut as Instagram, w as ShieldCheck } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Layout-vj9XDuOl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
var saurashtra_honey_logo_png_asset_default = {
	version: 1,
	asset_id: "8656025b-3999-4904-ac28-a3fab7d12365",
	project_id: "cfc1032a-f556-41cf-9103-b1605364168b",
	url: "/__l5e/assets-v1/8656025b-3999-4904-ac28-a3fab7d12365/saurashtra-honey-logo.png",
	r2_key: "a/v1/cfc1032a-f556-41cf-9103-b1605364168b/8656025b-3999-4904-ac28-a3fab7d12365/saurashtra-honey-logo.png",
	original_filename: "saurashtra-honey-logo.png",
	size: 648343,
	content_type: "image/png",
	created_at: "2026-07-23T15:11:03Z"
};
function FallbackBeeIcon({ className = "size-10" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 48 48",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		className,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "24",
				cy: "24",
				r: "22",
				fill: "#FDF8F0",
				stroke: "#C88A2B",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M24 10C24 10 16 16 16 24C16 32 24 38 24 38C24 38 32 32 32 24C32 16 24 10 24 10Z",
				fill: "#C88A2B",
				fillOpacity: "0.15",
				stroke: "#C88A2B",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "24",
				cy: "18",
				r: "4",
				fill: "#C88A2B"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M18 24H30M19 28H29M21 32H27",
				stroke: "#49301F",
				strokeWidth: "2",
				strokeLinecap: "round"
			})
		]
	});
}
function BeeLogo({ className = "max-h-[52px] w-auto object-contain shrink-0" }) {
	const primarySrc = useCompanyLogoUrl() || saurashtra_honey_logo_png_asset_default.url;
	const [srcIndex, setSrcIndex] = (0, import_react.useState)(0);
	const sources = [primarySrc, "/favicon.ico"];
	if (srcIndex >= sources.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FallbackBeeIcon, { className });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: sources[srcIndex],
		alt: "Saurashtra Honey Bee Farm",
		className,
		style: {
			filter: "none",
			opacity: 1,
			mixBlendMode: "normal",
			WebkitMask: "none",
			mask: "none"
		},
		loading: "eager",
		decoding: "async",
		onError: () => setSrcIndex((idx) => idx + 1)
	});
}
function BrandMark({ dark = false, alwaysShowText = false }) {
	const primarySrc = useCompanyLogoUrl() || saurashtra_honey_logo_png_asset_default.url;
	const [srcIndex, setSrcIndex] = (0, import_react.useState)(0);
	const sources = [primarySrc, "/favicon.ico"];
	const textContainerClasses = alwaysShowText ? "block" : "hidden sm:block";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-4 sm:gap-5 min-w-0",
		children: [srcIndex >= sources.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FallbackBeeIcon, { className: "h-[56px] w-auto sm:h-[64px] object-contain shrink-0" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: sources[srcIndex],
			alt: "Saurashtra Honey Bee Farm",
			className: "h-[56px] w-auto sm:h-[64px] object-contain shrink-0",
			style: {
				filter: "none",
				opacity: 1,
				mixBlendMode: "normal",
				WebkitMask: "none",
				mask: "none"
			},
			loading: "eager",
			decoding: "async",
			onError: () => setSrcIndex((idx) => idx + 1)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: `leading-none shrink-0 ${textContainerClasses}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: `block font-serif text-[18px] md:text-2xl font-bold tracking-tight ${dark ? "text-cream" : "text-espresso"}`,
				children: "Saurashtra"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: `block text-[8.5px] md:text-[10px] tracking-[0.35em] uppercase font-semibold mt-1 ${dark ? "text-cream/70" : "text-brand-orange"}`,
				children: "Honey Bee Farm"
			})]
		})]
	});
}
var fallbackMessages = [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
	className: "inline-flex items-center gap-2",
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "shrink-0",
		children: "🚚"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-white font-bold",
		children: "Free Delivery on orders above ₹400"
	})]
}, "1"), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
	className: "inline-flex items-center gap-2",
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "shrink-0",
		children: "🍯"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-white font-bold",
		children: "Up to 24% OFF All Honey + Up to 10% Off on Prepaid"
	})]
}, "2")];
function TopBar() {
	const [items, setItems] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		fetchAnnouncements().then((data) => {
			setItems(data);
			setLoading(false);
		});
	}, []);
	const renderMessage = (item, idx) => {
		const content = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "inline-flex items-center gap-2 hover:opacity-80 transition-opacity",
			children: [item.icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "shrink-0",
				children: item.icon
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-white font-bold",
				children: item.text
			})]
		}, `db-${item.id}-${idx}`);
		if (item.link) {
			if (item.link.startsWith("http")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: item.link,
				target: item.open_in_new_tab ? "_blank" : "_self",
				rel: "noreferrer",
				children: content
			}, `db-link-${item.id}-${idx}`);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: item.link,
				target: item.open_in_new_tab ? "_blank" : void 0,
				children: content
			}, `db-link-${item.id}-${idx}`);
		}
		return content;
	};
	const activeMessages = items.length > 0 ? items.map((item, idx) => renderMessage(item, idx)) : loading ? [] : fallbackMessages;
	const loopGroup = [...activeMessages, ...activeMessages];
	if (activeMessages.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "bg-[#B57420] w-full max-w-[100vw] text-white border-b border-white/10 py-2.5 px-4 text-xs sm:text-sm font-bold tracking-wide select-none overflow-hidden relative flex items-center",
		role: "region",
		"aria-label": "Announcement bar",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex w-max items-center animate-ticker",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center shrink-0",
				children: loopGroup.map((msg, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "px-5 sm:px-7 whitespace-nowrap",
					children: msg
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-white font-bold select-none px-1",
					children: "•"
				})] }, `half-1-${idx}`))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center shrink-0",
				"aria-hidden": "true",
				children: loopGroup.map((msg, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "px-5 sm:px-7 whitespace-nowrap",
					children: msg
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-white font-bold select-none px-1",
					children: "•"
				})] }, `half-2-${idx}`))
			})]
		})
	});
}
var primaryLinks = [
	{
		to: "/",
		label: "Home"
	},
	{
		to: "/shop",
		label: "Shop"
	},
	{
		to: "/our-story",
		label: "Our Story"
	},
	{
		to: "/bee-farming",
		label: "Bee Farming"
	},
	{
		to: "/blog",
		label: "Journal"
	},
	{
		to: "/bulk-gifting",
		label: "Bulk & Gifting"
	},
	{
		to: "/contact",
		label: "Contact"
	}
];
var categoryIcons = {
	"Single Flora": Leaf,
	Multiflora: Sparkles,
	"Raw Honey": Flame,
	"Honey Comb": Sparkles,
	"Gift Packs": Gift
};
var HISTORY_KEY = "sh_search_history_v1";
var POPULAR = [
	"Ajwain honey",
	"Gift packs",
	"Honey comb",
	"Lychee",
	"Multiflora"
];
function readHistory() {
	if (typeof window === "undefined") return [];
	try {
		return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
	} catch {
		return [];
	}
}
function pushHistory(q) {
	const list = readHistory().filter((x) => x.toLowerCase() !== q.toLowerCase());
	list.unshift(q);
	try {
		localStorage.setItem(HISTORY_KEY, JSON.stringify(list.slice(0, 6)));
	} catch {}
}
function Navbar() {
	const [mobileOpen, setMobileOpen] = (0, import_react.useState)(false);
	const [searchOpen, setSearchOpen] = (0, import_react.useState)(false);
	const [q, setQ] = (0, import_react.useState)("");
	const [shopOpen, setShopOpen] = (0, import_react.useState)(false);
	const [unread, setUnread] = (0, import_react.useState)(0);
	const [history, setHistory] = (0, import_react.useState)([]);
	const [dbCategories, setDbCategories] = (0, import_react.useState)(DEFAULT_SHOP_CATEGORIES);
	const [products, setProducts] = (0, import_react.useState)([]);
	const [bestSellers, setBestSellers] = (0, import_react.useState)([]);
	const [newArrivals, setNewArrivals] = (0, import_react.useState)([]);
	const [featuredForMenu, setFeaturedForMenu] = (0, import_react.useState)([]);
	const [uniqueCategories, setUniqueCategories] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		fetchShopCategories().then((res) => {
			if (res.length > 0) setDbCategories(res);
		});
		fetchProducts().then((res) => {
			if (res.length > 0) {
				setProducts(res);
				setUniqueCategories(Array.from(new Set(res.map((p) => p.category))));
				const bs = res.filter((p) => p.badge === "BESTSELLER").slice(0, 3);
				const na = res.filter((p) => p.badge === "NEW").slice(0, 3);
				setBestSellers(bs);
				setNewArrivals(na);
				setFeaturedForMenu((na.length ? na : res).slice(0, 3));
			}
		});
	}, []);
	const navCategories = (0, import_react.useMemo)(() => {
		const names = dbCategories.map((c) => c.name);
		return names.length > 0 ? names : Array.from(new Set(products.map((p) => p.category)));
	}, [dbCategories]);
	const { count, setOpen: setCartOpen } = useCart();
	const { count: wishCount } = useWishlist();
	const { user, isAdmin } = useAuth();
	const navigate = useNavigate();
	const searchRef = (0, import_react.useRef)(null);
	const [isHidden, setIsHidden] = (0, import_react.useState)(false);
	const lastScrollY = (0, import_react.useRef)(0);
	const ticking = (0, import_react.useRef)(false);
	const closeTimeoutRef = (0, import_react.useRef)(null);
	const handleMouseEnterShop = () => {
		if (closeTimeoutRef.current) {
			clearTimeout(closeTimeoutRef.current);
			closeTimeoutRef.current = null;
		}
		setShopOpen(true);
	};
	const handleMouseLeaveShop = () => {
		closeTimeoutRef.current = setTimeout(() => {
			setShopOpen(false);
		}, 280);
	};
	(0, import_react.useEffect)(() => {
		const onScroll = () => {
			if (ticking.current) return;
			ticking.current = true;
			requestAnimationFrame(() => {
				const currentScrollY = window.scrollY || document.documentElement.scrollTop;
				if (currentScrollY < 30 || mobileOpen) {
					setIsHidden(false);
					lastScrollY.current = currentScrollY;
					ticking.current = false;
					return;
				}
				const delta = currentScrollY - lastScrollY.current;
				if (Math.abs(delta) > 8) {
					if (delta > 0 && currentScrollY > 80) setIsHidden(true);
					else if (delta < 0) setIsHidden(false);
					lastScrollY.current = currentScrollY;
				}
				ticking.current = false;
			});
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, [mobileOpen]);
	(0, import_react.useEffect)(() => {
		document.body.style.overflow = mobileOpen ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [mobileOpen]);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if (e.key === "Escape") setMobileOpen(false);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);
	(0, import_react.useEffect)(() => {
		setHistory(readHistory());
	}, [searchOpen, mobileOpen]);
	(0, import_react.useEffect)(() => {
		if (!user) {
			setUnread(0);
			return;
		}
		(async () => {
			const { count } = await supabase.from("notifications").select("id", {
				count: "exact",
				head: true
			}).eq("user_id", user.id).eq("read", false);
			setUnread(count ?? 0);
		})();
	}, [user]);
	const suggestions = (0, import_react.useMemo)(() => {
		const t = q.trim().toLowerCase();
		if (!t) return [];
		return products.filter((p) => [
			p.name,
			p.category,
			p.flora ?? "",
			...p.benefits ?? []
		].join(" ").toLowerCase().includes(t)).slice(0, 6);
	}, [q]);
	const doSearch = (term) => {
		const t = (term ?? q).trim();
		if (!t) return;
		pushHistory(t);
		setSearchOpen(false);
		setMobileOpen(false);
		setQ("");
		navigate({
			to: "/shop",
			search: { q: t }
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: `sticky top-0 z-50 w-full transition-transform duration-300 ease-out ${isHidden ? "-translate-y-full" : "translate-y-0"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopBar, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-cream/95 backdrop-blur-xl border-b border-border/80 shadow-soft transition-all",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "container-page",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between h-[60px] px-2 lg:hidden w-full",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5 min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": "Open menu",
								onClick: () => setMobileOpen(true),
								className: "p-3 active:scale-95 transition-transform text-[#2B2118] hover:text-[#D97706] min-h-[48px] min-w-[48px] flex items-center justify-center shrink-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-[26px] stroke-[1.5]" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/",
								"aria-label": "Saurashtra Honey home",
								className: "flex items-center gap-2.5 min-w-0 shrink-0 pr-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BeeLogo, { className: "h-[38px] w-auto object-contain shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex flex-col justify-center pt-0.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-serif text-[18px] font-medium leading-[1.1] text-[#2B2118] tracking-tight truncate",
										children: "Saurashtra"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[9px] tracking-[0.2em] uppercase text-[#D97706] font-bold leading-none mt-[3px] truncate",
										children: "Honey"
									})]
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1 shrink-0 text-[#2B2118]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": "Search",
								onClick: () => setSearchOpen((s) => !s),
								className: "p-3 active:scale-95 transition-transform hover:text-[#D97706] min-h-[48px] min-w-[48px] flex items-center justify-center shrink-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-[22px] stroke-[1.5]" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								"aria-label": "Cart",
								onClick: () => setCartOpen(true),
								className: "p-3 active:scale-95 transition-transform hover:text-[#D97706] min-h-[48px] min-w-[48px] flex items-center justify-center shrink-0 relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "size-[22px] stroke-[1.5]" }), count > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute top-1.5 right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#D97706] text-white text-[10px] font-bold flex items-center justify-center shadow-sm",
									children: count
								})]
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden lg:grid grid-cols-[auto_1fr_auto] items-center h-20 gap-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								"aria-label": "Saurashtra Honey home",
								className: "shrink-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
								className: "flex items-center justify-center gap-7 text-[13.5px]",
								children: primaryLinks.map((l, idx) => {
									const isShop = l.to === "/shop";
									const isHome = l.label === "Home";
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "relative",
										onMouseEnter: () => {
											if (isShop) handleMouseEnterShop();
										},
										onMouseLeave: () => {
											if (isShop) handleMouseLeaveShop();
										},
										children: l.hash ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: `/#${l.hash}`,
											onClick: (e) => {
												const el = document.getElementById(l.hash);
												if (el) {
													e.preventDefault();
													el.scrollIntoView({ behavior: "smooth" });
												}
											},
											className: "text-foreground/90 hover:text-brand-orange transition-colors relative py-2 font-semibold tracking-wide",
											children: l.label
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: l.to,
											activeOptions: { exact: isHome },
											className: "text-foreground/90 hover:text-brand-orange transition-colors relative py-2 font-semibold tracking-wide [&.active]:text-brand-orange [&.active]:after:content-[''] [&.active]:after:absolute [&.active]:after:-bottom-1 [&.active]:after:left-0 [&.active]:after:right-0 [&.active]:after:h-0.5 [&.active]:after:bg-brand-orange",
											preload: false,
											children: l.label
										})
									}, idx);
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-4 text-foreground/80 justify-self-end",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										"aria-label": "Search",
										className: "hover:text-burnt-orange transition-colors",
										onClick: () => setSearchOpen((s) => !s),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-5" })
									}),
									isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/admin",
										"aria-label": "Admin",
										className: "hover:text-burnt-orange",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-5" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/wishlist",
										"aria-label": "Wishlist",
										className: "relative hover:text-burnt-orange transition-colors",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "size-5" }), wishCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "absolute -top-2 -right-2 bg-burnt-orange text-white text-[10px] font-bold size-4 rounded-full flex items-center justify-center",
											children: wishCount
										})]
									}),
									user && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/account",
										search: { tab: "notifications" },
										"aria-label": "Notifications",
										className: "relative hover:text-burnt-orange transition-colors",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-5" }), unread > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "absolute -top-2 -right-2 bg-destructive text-white text-[10px] font-bold size-4 rounded-full flex items-center justify-center",
											children: unread
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: user ? "/account" : "/auth",
										"aria-label": user ? "Account" : "Sign in",
										className: "hover:text-gold-deep transition-colors",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "size-5" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										"aria-label": "Cart",
										className: "relative hover:text-gold-deep transition-colors",
										onClick: () => setCartOpen(true),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "size-5" }), count > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "absolute -top-2 -right-2 bg-gold-deep text-cream text-[10px] font-bold size-4 rounded-full flex items-center justify-center",
											children: count
										})]
									})
								]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `hidden lg:block absolute left-0 right-0 top-full border-t border-border bg-cream shadow-lift origin-top transition-all duration-[220ms] ease-out ${shopOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}`,
					onMouseEnter: handleMouseEnterShop,
					onMouseLeave: handleMouseLeaveShop,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "container-page grid grid-cols-12 gap-10 py-10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "col-span-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] tracking-[0.28em] uppercase text-gold-deep font-bold mb-4",
									children: "Shop by Category"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "space-y-3",
									children: navCategories.map((cat) => {
										const Icon = categoryIcons[cat] ?? Leaf;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/collections/$slug",
											params: { slug: getCategorySlug(cat) },
											className: "group flex items-center gap-3 text-sm text-foreground/85 hover:text-gold-deep",
											onClick: () => setShopOpen(false),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "size-8 rounded-full bg-cream-deep group-hover:bg-gold/30 grid place-items-center transition-colors",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 text-forest-dark group-hover:text-gold-deep" })
											}), cat]
										}) }, cat);
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "col-span-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] tracking-[0.28em] uppercase text-gold-deep font-bold mb-4",
									children: "Best Sellers"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "space-y-3",
									children: bestSellers.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/product/$slug",
										params: { slug: p.slug },
										className: "flex items-center gap-3 group",
										onClick: () => setShopOpen(false),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: p.image,
											alt: "",
											className: "size-12 rounded-md object-cover bg-cream-deep",
											loading: "lazy"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm text-foreground/85 group-hover:text-gold-deep",
											children: p.name
										})]
									}) }, p.slug))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "col-span-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] tracking-[0.28em] uppercase text-gold-deep font-bold mb-4",
									children: "Explore"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
									className: "space-y-3 text-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/shop",
											className: "hover:text-gold-deep",
											onClick: () => setShopOpen(false),
											children: "All products"
										}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/compare",
											className: "hover:text-gold-deep",
											onClick: () => setShopOpen(false),
											children: "Compare products"
										}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/track-order",
											className: "hover:text-gold-deep",
											onClick: () => setShopOpen(false),
											children: "Track an order"
										}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/collections/$slug",
											params: { slug: "gift-hampers" },
											className: "hover:text-gold-deep",
											onClick: () => setShopOpen(false),
											children: "Gift packs & combos"
										}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/bulk-orders",
											className: "hover:text-gold-deep",
											onClick: () => setShopOpen(false),
											children: "Bulk & corporate gifting"
										}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/bee-farming",
											className: "hover:text-gold-deep",
											onClick: () => setShopOpen(false),
											children: "Trace your honey"
										}) })
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "col-span-3",
								children: featuredForMenu[0] && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/product/$slug",
									params: { slug: featuredForMenu[0].slug },
									className: "block group rounded-xl overflow-hidden bg-cream-deep relative",
									onClick: () => setShopOpen(false),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: featuredForMenu[0].image,
											alt: featuredForMenu[0].name,
											className: "w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500",
											loading: "lazy"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-linear-to-t from-forest-dark/80 to-transparent" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "absolute bottom-0 left-0 right-0 p-4 text-cream",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[10px] tracking-[0.28em] uppercase text-gold",
													children: "Featured"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "font-serif text-lg leading-tight mt-1",
													children: featuredForMenu[0].name
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "mt-2 inline-flex items-center gap-1 text-xs font-semibold text-gold",
													children: ["Shop now ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-3.5" })]
												})
											]
										})
									]
								})
							})
						]
					})
				}),
				searchOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-t border-border bg-cream animate-in fade-in slide-in-from-top-2 duration-200",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: (e) => {
							e.preventDefault();
							doSearch();
						},
						className: "container-page py-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									ref: searchRef,
									autoFocus: true,
									value: q,
									onChange: (e) => setQ(e.target.value),
									placeholder: "Search honey, gift packs, ajwain…",
									className: "flex-1 bg-background border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-gold-deep"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "bg-forest-dark text-cream rounded-lg px-5 text-xs font-bold tracking-widest hover:bg-forest",
									children: "SEARCH"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-label": "Close search",
									onClick: () => setSearchOpen(false),
									className: "rounded-lg px-3 border border-border hover:bg-cream-deep",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
								})
							]
						}), suggestions.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 grid sm:grid-cols-2 gap-2",
							children: suggestions.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/product/$slug",
								params: { slug: p.slug },
								onClick: () => {
									setSearchOpen(false);
									setQ("");
								},
								className: "flex items-center gap-3 p-2 rounded-lg hover:bg-cream-deep",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: p.image,
										alt: "",
										className: "size-10 rounded object-cover"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex-1 text-sm truncate",
										children: p.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs text-muted-foreground shrink-0",
										children: ["₹", p.price]
									})
								]
							}) }, p.slug))
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 grid sm:grid-cols-2 gap-4 text-[11px]",
							children: [history.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "tracking-widest font-bold text-forest-dark uppercase mb-1.5",
								children: "Recent searches"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-1.5",
								children: history.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => doSearch(h),
									className: "px-2.5 py-1 rounded-full border border-border bg-background hover:border-gold-deep text-forest-dark",
									children: h
								}, h))
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "tracking-widest font-bold text-forest-dark uppercase mb-1.5",
								children: "Popular"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-1.5",
								children: POPULAR.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => doSearch(h),
									className: "px-2.5 py-1 rounded-full bg-forest-dark text-cream hover:bg-forest",
									children: h
								}, h))
							})] })]
						})]
					})
				}),
				typeof document !== "undefined" && (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `lg:hidden fixed inset-0 z-[9999] overflow-hidden transition-all duration-300 ${mobileOpen ? "pointer-events-auto" : "pointer-events-none"}`,
					"aria-hidden": !mobileOpen,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": "Close menu overlay",
						onClick: () => setMobileOpen(false),
						className: `absolute inset-0 bg-espresso/60 backdrop-blur-xs transition-opacity duration-300 ${mobileOpen ? "opacity-100" : "opacity-0"}`
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: `absolute inset-y-0 left-0 w-[min(86vw,340px)] bg-cream shadow-lift flex flex-col transition-transform duration-300 ease-out ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between p-4 border-b border-border min-h-[64px]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/",
									onClick: () => setMobileOpen(false),
									className: "flex items-center gap-2.5 min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BeeLogo, { className: "max-h-[46px] w-auto object-contain shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block font-serif text-[15px] font-bold text-espresso truncate",
											children: "Saurashtra Honey"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block text-[9px] tracking-[0.2em] uppercase text-burnt-orange font-semibold truncate",
											children: "Bee Farm"
										})]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-label": "Close menu",
									onClick: () => setMobileOpen(false),
									className: "p-2 -mr-2 min-h-11 min-w-11 flex items-center justify-center text-espresso hover:text-burnt-orange transition-colors",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-6" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
								className: "flex-1 overflow-y-auto px-4 py-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
										className: "space-y-1",
										children: primaryLinks.map((l, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: l.hash ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: `/#${l.hash}`,
											onClick: (e) => {
												setMobileOpen(false);
												const el = document.getElementById(l.hash);
												if (el) {
													e.preventDefault();
													el.scrollIntoView({ behavior: "smooth" });
												}
											},
											className: "flex items-center justify-between px-3 py-3 rounded-xl text-[15px] font-semibold text-espresso hover:bg-cream-deep transition-colors",
											children: [l.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4 text-muted-foreground" })]
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: l.to,
											activeOptions: { exact: l.label === "Home" },
											className: "flex items-center justify-between px-3 py-3 rounded-xl text-[15px] font-semibold text-espresso hover:bg-cream-deep [&.active]:text-brand-orange [&.active]:bg-cream-deep/60 transition-colors",
											onClick: () => setMobileOpen(false),
											children: [l.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4 text-muted-foreground" })]
										}) }, idx))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-5 pt-5 border-t border-border/80",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] tracking-[0.25em] uppercase text-gold-deep font-bold mb-2 px-3",
											children: "Shop by Category"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
											className: "space-y-1",
											children: navCategories.map((cat) => {
												const Icon = categoryIcons[cat] ?? Leaf;
												return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
													to: "/shop",
													search: { category: cat },
													onClick: () => setMobileOpen(false),
													className: "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-foreground/85 hover:bg-cream-deep transition-colors",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 text-gold-deep shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "truncate",
														children: cat
													})]
												}) }, cat);
											})
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-5 pt-5 border-t border-border/80 pb-6",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] tracking-[0.25em] uppercase text-gold-deep font-bold mb-2 px-3",
											children: "My Account"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
											className: "space-y-1 text-sm font-medium",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
													to: "/account",
													search: { tab: "orders" },
													onClick: () => setMobileOpen(false),
													className: "flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-cream-deep transition-colors",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "size-4 text-gold-deep shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Orders" })]
												}) }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
													to: "/wishlist",
													onClick: () => setMobileOpen(false),
													className: "flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-cream-deep transition-colors",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "size-4 text-gold-deep shrink-0" }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Wishlist" }),
														wishCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "ml-auto text-xs font-bold text-burnt-orange bg-cream-deep px-2 py-0.5 rounded-full",
															children: wishCount
														})
													]
												}) }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
													to: "/track-order",
													onClick: () => setMobileOpen(false),
													className: "flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-cream-deep transition-colors",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "size-4 text-gold-deep shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Track Order" })]
												}) }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
													to: "/compare",
													onClick: () => setMobileOpen(false),
													className: "flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-cream-deep transition-colors",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4 text-gold-deep shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Compare" })]
												}) })
											]
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-t border-border p-4 grid grid-cols-2 gap-3 bg-cream/90 shrink-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: user ? "/account" : "/auth",
									onClick: () => setMobileOpen(false),
									className: "flex items-center justify-center gap-2 rounded-xl border border-border bg-white py-3 text-sm font-semibold text-espresso hover:bg-cream-deep transition-colors shadow-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "size-4 text-burnt-orange" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "truncate",
										children: user ? "My Account" : "Sign in"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => {
										setMobileOpen(false);
										setCartOpen(true);
									},
									className: "flex items-center justify-center gap-2 rounded-xl bg-espresso text-cream py-3 text-sm font-semibold hover:bg-burnt-orange transition-colors shadow-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "size-4 text-gold" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Cart" }),
										count > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-bold bg-burnt-orange text-white px-1.5 py-0.5 rounded-full",
											children: count
										})
									]
								})]
							})
						]
					})]
				}), document.body)
			]
		})]
	});
}
function FooterSection({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col space-y-4 lg:space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
			className: "font-serif text-[12px] font-bold uppercase tracking-[0.2em] text-[#C57A1C]",
			children: title
		}), children]
	});
}
function Footer() {
	const [email, setEmail] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [showTopBtn, setShowTopBtn] = (0, import_react.useState)(false);
	useServerFn(subscribeNewsletter);
	const [shopCategories, setShopCategories] = (0, import_react.useState)(DEFAULT_SHOP_CATEGORIES);
	const [settings, setSettings] = (0, import_react.useState)({});
	(0, import_react.useEffect)(() => {
		fetchShopCategories().then((res) => {
			if (res && Array.isArray(res) && res.length > 0) setShopCategories(res);
		});
		fetchPublicSiteSettings().then(setSettings);
		const handleScroll = () => {
			setShowTopBtn(window.scrollY > 300);
		};
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	};
	const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
	const helpLinks = [
		["FAQs", "/contact"],
		["Shipping & Delivery", "/contact"],
		["Returns & Refunds", "/contact"],
		["Terms & Conditions", "/contact"],
		["Privacy Policy", "/contact"],
		["Track Order", "/track-order"]
	];
	const aboutLinks = [
		["Our Story", "/our-story"],
		["Bee Farming", "/bee-farming"],
		["Quality Promise", "/bee-farming"],
		["Bulk & Gifting", "/bulk-gifting"],
		["Journal", "/blog"],
		["Contact", "/contact"]
	];
	const socialLinks = [
		{
			I: Instagram,
			href: settings?.social?.instagram || "https://instagram.com",
			label: "Instagram",
			show: !!settings?.social?.instagram
		},
		{
			I: Facebook,
			href: settings?.social?.facebook || "https://facebook.com",
			label: "Facebook",
			show: !!settings?.social?.facebook
		},
		{
			I: Youtube,
			href: settings?.social?.youtube || "https://youtube.com",
			label: "YouTube",
			show: !!settings?.social?.youtube
		},
		{
			I: MessageCircle,
			href: settings?.contact?.whatsapp ? `https://wa.me/${settings.contact.whatsapp}` : "https://wa.me/919687328404",
			label: "WhatsApp",
			show: !!settings?.contact?.whatsapp
		},
		{
			I: Linkedin,
			href: settings?.social?.linkedin || "https://linkedin.com",
			label: "LinkedIn",
			show: !!settings?.social?.linkedin
		}
	].filter((link) => link.show || Object.keys(settings).length === 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "relative bg-[#F9F4EC] text-[#2B1D14] pt-20 sm:pt-28 pb-4 overflow-hidden w-full max-w-full",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute top-0 left-1/4 w-1/2 h-full bg-gradient-to-b from-[#C57A1C]/5 to-transparent pointer-events-none opacity-50 blur-3xl animate-pulse",
				style: { animationDuration: "8s" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "container-page px-6 lg:px-8 pb-12",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col lg:grid lg:grid-cols-12 gap-x-8 gap-y-14 items-start",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "lg:col-span-4 space-y-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, { alwaysShowText: true }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[14px] sm:text-[15px] text-[#2B1D14]/80 max-w-[280px] leading-relaxed font-serif italic",
									children: [
										"\"",
										settings?.company?.tagline || "Handcrafted honey from the heart of Saurashtra.\nPure. Natural. Honest.",
										"\""
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center gap-4",
								children: socialLinks.map(({ I, href, label }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href,
									target: "_blank",
									rel: "noreferrer",
									"aria-label": label,
									className: "size-10 rounded-full bg-[#EFE8DA] border-none text-[#2B1D14]/80 flex items-center justify-center hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(197,122,28,0.15)] hover:text-[#C57A1C] transition-all duration-300",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(I, { className: "size-4" })
								}, label))
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "lg:col-span-8 w-full grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "col-span-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FooterSection, {
										title: "Shop",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
											className: "space-y-4 text-[14px] lg:text-[13px] text-[#2B1D14]/80 font-medium",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												to: "/shop",
												className: "hover:text-[#C57A1C] transition-colors duration-300",
												children: "All Products"
											}) }), shopCategories.slice(0, 6).map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												to: "/collections/$slug",
												params: { slug: getCategorySlug(cat.slug || cat.name) },
												className: "hover:text-[#C57A1C] transition-colors duration-300",
												children: cat.name
											}) }, cat.slug))]
										})
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "col-span-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FooterSection, {
										title: "Help",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
											className: "space-y-4 text-[14px] lg:text-[13px] text-[#2B1D14]/80 font-medium",
											children: helpLinks.map(([label, href]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												to: href,
												className: "hover:text-[#C57A1C] transition-colors duration-300",
												children: label
											}) }, label))
										})
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "col-span-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FooterSection, {
										title: "About",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
											className: "space-y-4 text-[14px] lg:text-[13px] text-[#2B1D14]/80 font-medium",
											children: aboutLinks.map(([label, href]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												to: href,
												className: "hover:text-[#C57A1C] transition-colors duration-300",
												children: label
											}) }, label))
										})
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "col-span-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FooterSection, {
										title: "Contact",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
											className: "space-y-4 text-[14px] lg:text-[13px] text-[#2B1D14]/80 font-medium",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
													href: `tel:${settings?.contact?.phone || "+919687328404"}`,
													className: "flex items-start gap-3 hover:text-[#C57A1C] transition-colors duration-300",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-4 text-[#C57A1C] shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: settings?.contact?.phone || "+91 96873 28404" })]
												}) }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
													href: `mailto:${settings?.contact?.email || "hello@saurastrahoney.com"}`,
													className: "flex items-start gap-3 hover:text-[#C57A1C] transition-colors duration-300",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-4 text-[#C57A1C] shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: settings?.contact?.email || "hello@saurastrahoney.com" })]
												}) }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-start gap-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-4 text-[#C57A1C] shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "leading-relaxed whitespace-pre-wrap",
														children: settings?.contact?.address || "At & Post: Dhrangadhra,\nSurendranagar, Gujarat – 363310"
													})]
												}) }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
													className: "pt-2",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
														href: settings?.contact?.whatsapp ? `https://wa.me/${settings.contact.whatsapp}` : "https://wa.me/919687328404",
														target: "_blank",
														rel: "noreferrer",
														className: "inline-flex items-center gap-2 text-[#C57A1C] font-bold text-[12px] uppercase tracking-widest hover:text-[#2B1D14] transition-colors duration-300",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-4" }), " Chat with us"]
													})
												})
											]
										})
									})
								})
							]
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "container-page px-6 lg:px-8 mt-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-full h-px bg-[#E6DEC8] opacity-60" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "py-10 flex flex-col items-center justify-center text-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11.5px] font-bold uppercase tracking-[0.25em] text-[#C57A1C]/90",
							children: "Crafted with Nature • Harvested with Care"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[12px] text-[#2B1D14]/50 font-medium",
							children: settings?.footer?.copyright || `© ${currentYear} Saurashtra Honey Bee Farm`
						})]
					})]
				})]
			}),
			showTopBtn && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: scrollToTop,
				"aria-label": "Scroll to top of page",
				className: "fixed bottom-24 right-4 md:right-6 z-40 size-11 sm:size-12 rounded-full bg-[#2B1D14] hover:bg-[#C57A1C] text-[#FBF7F0] flex items-center justify-center transition-all duration-300 shadow-xl hover:scale-110 hover:-translate-y-0.5 cursor-pointer",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "size-4.5 sm:size-5" })
			})
		]
	});
}
function MobileBottomNav() {
	const { count, setOpen } = useCart();
	const { count: wishCount } = useWishlist();
	const item = "group flex flex-col items-center justify-center gap-[4px] flex-1 py-3 text-[10px] font-medium tracking-wide uppercase text-[#6B6257] hover:text-[#D97706] min-h-[64px] transition-colors";
	const activeItem = "group flex flex-col items-center justify-center gap-[4px] flex-1 py-3 text-[10px] font-medium tracking-wide uppercase text-[#6B6257] hover:text-[#D97706] min-h-[64px] transition-colors !text-[#D97706] font-bold";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "md:hidden fixed bottom-0 inset-x-0 z-50 bg-white/85 backdrop-blur-xl border-t border-[#2B2118]/5 shadow-[0_-8px_32px_rgba(43,33,24,0.06)]",
		style: { paddingBottom: "env(safe-area-inset-bottom)" },
		"aria-label": "Mobile navigation",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-stretch px-1",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: item,
					activeProps: { className: activeItem },
					activeOptions: { exact: true },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, {
						className: "size-5 md:size-6 stroke-[1.5] group-active:scale-90 transition-transform duration-200",
						"aria-hidden": true
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Home" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/shop",
					className: item,
					activeProps: { className: activeItem },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, {
						className: "size-5 md:size-6 stroke-[1.5] group-active:scale-90 transition-transform duration-200",
						"aria-hidden": true
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Shop" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/wishlist",
					className: "group flex flex-col items-center justify-center gap-[4px] flex-1 py-3 text-[10px] font-medium tracking-wide uppercase text-[#6B6257] hover:text-[#D97706] min-h-[64px] transition-colors relative",
					activeProps: { className: activeItem },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, {
							className: "size-5 md:size-6 stroke-[1.5] group-active:scale-90 transition-transform duration-200",
							"aria-hidden": true
						}), wishCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute -top-1.5 -right-2 min-w-[16px] h-4 px-1 rounded-full bg-[#D97706] text-white text-[9px] font-bold flex items-center justify-center shadow-sm",
							children: wishCount
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Wishlist" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/account",
					className: item,
					activeProps: { className: activeItem },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, {
						className: "size-5 md:size-6 stroke-[1.5] group-active:scale-90 transition-transform duration-200",
						"aria-hidden": true
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Account" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setOpen(true),
					className: "group flex flex-col items-center justify-center gap-[4px] flex-1 py-3 text-[10px] font-medium tracking-wide uppercase text-[#6B6257] hover:text-[#D97706] min-h-[64px] transition-colors relative",
					"aria-label": "Open cart",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, {
							className: "size-5 md:size-6 stroke-[1.5] group-active:scale-90 transition-transform duration-200",
							"aria-hidden": true
						}), count > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute -top-1.5 -right-2 min-w-[16px] h-4 px-1 rounded-full bg-[#D97706] text-white text-[9px] font-bold flex items-center justify-center shadow-sm",
							children: count
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Cart" })]
				})
			]
		})
	});
}
function SiteLayout({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen flex flex-col bg-background w-full max-w-full overflow-x-clip",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1 pb-24 md:pb-0 w-full max-w-full min-w-0",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileBottomNav, {})
		]
	});
}
function SectionEyebrow({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "inline-flex items-center gap-2 text-[17px] sm:text-[19px] md:text-[20px] lg:text-[24px] font-semibold tracking-[0.14em] uppercase text-burnt-orange leading-snug",
		children
	});
}
//#endregion
export { SiteLayout as n, SectionEyebrow as t };
