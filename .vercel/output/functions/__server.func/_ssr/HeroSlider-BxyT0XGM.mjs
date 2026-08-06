import { i as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { Jt as ChevronLeft, ln as ArrowRight, qt as ChevronRight } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/HeroSlider-BxyT0XGM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function HeroSlider({ slides, interval = 6e3, size = "md", variant }) {
	const [i, setI] = (0, import_react.useState)(0);
	const [dir, setDir] = (0, import_react.useState)(1);
	const timer = (0, import_react.useRef)(null);
	const paused = (0, import_react.useRef)(false);
	const touchX = (0, import_react.useRef)(null);
	const go = (n, d = 1) => {
		if (!slides || slides.length <= 1) return;
		setDir(d);
		setI((n + slides.length) % slides.length);
	};
	const next = () => go(i + 1, 1);
	const prev = () => go(i - 1, -1);
	(0, import_react.useEffect)(() => {
		if (paused.current || !slides || slides.length <= 1) return;
		timer.current = setTimeout(() => go(i + 1, 1), interval);
		return () => {
			if (timer.current) clearTimeout(timer.current);
		};
	}, [
		i,
		interval,
		slides?.length
	]);
	const effVariant = variant === "home" || size === "home" || size === "md" ? "home" : "inner";
	const heightCls = effVariant === "home" ? "h-[600px] max-h-[85vh] sm:h-[650px] md:h-[700px] lg:h-auto lg:aspect-[1920/700]" : "h-[400px] max-h-[70vh] sm:h-[450px] md:h-[500px] lg:h-auto lg:aspect-[1920/600]";
	const titleCls = effVariant === "inner" ? "mt-2 font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.06] font-bold text-cream" : "mt-2.5 font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.04] font-bold text-cream";
	if (!slides || slides.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "relative w-full overflow-hidden bg-[#120E0C]",
		onMouseEnter: () => {
			paused.current = true;
			if (timer.current) clearTimeout(timer.current);
		},
		onMouseLeave: () => {
			paused.current = false;
			setI((v) => v);
		},
		onTouchStart: (e) => {
			touchX.current = e.touches[0].clientX;
		},
		onTouchEnd: (e) => {
			if (touchX.current === null) return;
			const dx = e.changedTouches[0].clientX - touchX.current;
			if (Math.abs(dx) > 40) dx < 0 ? next() : prev();
			touchX.current = null;
		},
		"aria-roledescription": "carousel",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `relative w-full ${heightCls}`,
			children: [slides.map((s, idx) => {
				const isActive = idx === i;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"aria-hidden": !isActive,
					className: `absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isActive ? "translate-x-0 opacity-100 z-10" : `${dir === 1 ? "translate-x-full" : "-translate-x-full"} opacity-0 z-0`}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("picture", {
							className: "absolute inset-0 w-full h-full",
							children: [s.mobileImage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("source", {
								media: "(max-width: 767px)",
								srcSet: s.mobileImage
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: s.image,
								alt: "",
								className: "absolute inset-0 w-full h-full object-cover object-center",
								fetchPriority: idx === 0 ? "high" : "low",
								loading: idx === 0 ? "eager" : "lazy"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute inset-0 pointer-events-none",
							style: { backgroundColor: "rgba(18, 14, 12, 0.18)" }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute inset-0 pointer-events-none",
							style: { backgroundImage: s.align === "center" ? "radial-gradient(ellipse at center, rgba(15, 12, 10, 0.45) 0%, rgba(15, 12, 10, 0.18) 45%, rgba(15, 12, 10, 0.00) 80%)" : "linear-gradient(90deg, rgba(15, 12, 10, 0.48) 0%, rgba(15, 12, 10, 0.18) 38%, rgba(15, 12, 10, 0.00) 72%)" }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute inset-0 flex items-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "container-page w-full py-10",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `grid ${s.align === "center" ? "place-items-center text-center" : "lg:grid-cols-[1fr_auto] items-center gap-10"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: `max-w-md md:max-w-xl lg:max-w-2xl ${s.align === "center" ? "mx-auto" : ""}`,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "inline-flex items-center gap-2 bg-espresso/85 border border-burnt-orange/40 px-4.5 py-1.5 rounded-full backdrop-blur-md mb-4 shadow-md",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[15px] sm:text-[17px] md:text-[19px] lg:text-[22px] font-semibold tracking-[0.14em] text-burnt-orange uppercase leading-snug",
													children: s.eyebrow
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
												className: titleCls,
												children: s.title
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-3 md:mt-5 text-cream/90 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl font-normal",
												children: s.subtitle
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "mt-6 md:mt-8 flex flex-wrap items-center gap-4",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
													to: s.ctaTo,
													params: s.ctaParams,
													className: "inline-flex items-center gap-2.5 bg-burnt-orange hover:bg-terracotta text-white rounded-full px-7 md:px-8 py-3.5 md:py-4 text-xs md:text-sm font-bold tracking-widest shadow-lift transition-all hover:scale-105",
													children: [
														s.ctaText,
														" ",
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })
													]
												})
											}),
											effVariant === "home" && s.align !== "center" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-7 hidden sm:flex items-center gap-6 text-xs text-cream/85 font-semibold tracking-wide",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "flex items-center gap-2",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-burnt-orange" }), " Lab Tested Purity"]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "flex items-center gap-2",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-burnt-orange" }), " 100% Raw & Unprocessed"]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "flex items-center gap-2",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-burnt-orange" }), " Direct From Wildflower Farms"]
													})
												]
											})
										]
									}), effVariant === "home" && s.align !== "center" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "hidden lg:flex items-center justify-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "size-36 rounded-full border border-burnt-orange/50 bg-espresso/70 backdrop-blur-md p-4 flex flex-col items-center justify-center text-center shadow-2xl transition-transform hover:scale-105",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[10px] uppercase tracking-[0.25em] text-cream/80 font-bold",
													children: "Saurashtra"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-serif text-sm font-bold text-cream mt-0.5",
													children: "100% PURE"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[11px] font-bold text-burnt-orange tracking-widest mt-1",
													children: "LAB TESTED"
												})
											]
										})
									})]
								})
							})
						})
					]
				}, idx);
			}), slides.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: prev,
					"aria-label": "Previous slide",
					className: "absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 size-8 md:size-10 rounded-full bg-cream/15 hover:bg-cream/35 text-cream backdrop-blur-sm flex items-center justify-center transition-colors",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4 md:size-5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: next,
					"aria-label": "Next slide",
					className: "absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 size-8 md:size-10 rounded-full bg-cream/15 hover:bg-cream/35 text-cream backdrop-blur-sm flex items-center justify-center transition-colors",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4 md:size-5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2",
					children: slides.map((_, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => go(idx, idx > i ? 1 : -1),
						"aria-label": `Go to slide ${idx + 1}`,
						className: `h-1.5 rounded-full transition-all duration-300 ${idx === i ? "w-6 bg-burnt-orange" : "w-1.5 bg-cream/40 hover:bg-cream/70"}`
					}, idx))
				})
			] })]
		})
	});
}
//#endregion
export { HeroSlider as t };
