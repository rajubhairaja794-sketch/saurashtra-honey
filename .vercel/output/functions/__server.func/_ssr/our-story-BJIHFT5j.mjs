import "../_runtime.mjs";
import { n as honeycomb_bees_default } from "./prod-lychee-Di3dQ6EL.mjs";
import { i as honey_drizzle_default, n as bee_flower_default, r as family_honey_default, t as bee_farm_default } from "./team-beekeepers-Bb0crWjH.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { Ct as Globe, Wt as CircleCheck, _t as HeartHandshake, b as Sparkles, it as Leaf, ln as ArrowRight, o as Users } from "../_libs/lucide-react.mjs";
import { n as SiteLayout } from "./Layout-vj9XDuOl.mjs";
import { r as hero_products_default } from "./hero-catalog-WFU6Elpd.mjs";
import { t as PageHeroSlider } from "./PageHeroSlider-mZMVe2Y7.mjs";
import { t as PremiumMobileCarousel } from "./PremiumMobileCarousel-CkEO3_mW.mjs";
import { n as breadcrumbLd, r as organizationLd, t as StructuredData } from "./StructuredData-C0TBI3qI.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
function OurStory() {
	const values = [
		{
			title: "Purity",
			desc: "No shortcuts. Just 100% pure honey.",
			Icon: Leaf
		},
		{
			title: "Sustainability",
			desc: "We protect bees today for a better tomorrow.",
			Icon: Sparkles
		},
		{
			title: "Trust",
			desc: "Lab-tested and family-approved.",
			Icon: HeartHandshake
		},
		{
			title: "Community",
			desc: "Empowering beekeepers and rural communities.",
			Icon: Users
		},
		{
			title: "Responsibility",
			desc: "Ethical practices for a healthier planet.",
			Icon: Globe
		}
	];
	const processSteps = [
		{
			step: "1. Natural Beekeeping",
			desc: "We care for bees using ethical and natural methods.",
			img: bee_farm_default
		},
		{
			step: "2. Healthy Colonies",
			desc: "Strong bees, healthy hives and rich floral sources.",
			img: honeycomb_bees_default
		},
		{
			step: "3. Hand Harvested",
			desc: "Honey is harvested with care, preserving its purity.",
			img: family_honey_default
		},
		{
			step: "4. Cold Extracted",
			desc: "Extracted at low temperature to retain nutrients.",
			img: honey_drizzle_default
		},
		{
			step: "5. Lab Tested & Packed",
			desc: "Every batch is tested for purity and packed with love.",
			img: hero_products_default
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StructuredData, { data: organizationLd() }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StructuredData, { data: breadcrumbLd([{
			name: "Home",
			url: "/"
		}, {
			name: "Our Story",
			url: "/our-story"
		}]) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeroSlider, { page: "our-story" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			id: "our-journey",
			className: "py-14 md:py-20 lg:py-24 bg-cream border-b border-border/80",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "container-page",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-14 items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lg:col-span-6 space-y-5 md:space-y-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs font-bold tracking-[0.25em] uppercase text-brand-orange mb-2",
							children: "OUR JOURNEY"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "font-serif text-[34px] leading-[1.15] md:text-4xl lg:text-5xl font-bold text-espresso",
							children: [
								"A Journey That",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"Began with a Dream"
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4 text-[16px] md:text-lg text-espresso/80 leading-relaxed",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Saurashtra Honey Bee Farm was born out of a deep love for nature and a vision to bring pure, unadulterated honey to every household. What started as a small beekeeping passion has today grown into a trusted brand that thousands of families rely on." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "We believe in working with nature, not against it. Every drop of honey we produce is a result of care, patience and respect for bees." })]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "lg:col-span-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-3xl sm:rounded-[2rem] overflow-hidden shadow-lift border border-border/80 bg-cream-deep aspect-[4/3] md:aspect-[16/10] lg:aspect-[4/3]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: bee_farm_default,
								alt: "Saurashtra Honey Bee Farm Apiary",
								loading: "lazy",
								className: "w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
							})
						})
					})]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "py-14 md:py-20 lg:py-24 bg-cream border-b border-border/80",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-page",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center max-w-2xl mx-auto mb-10 md:mb-12 lg:mb-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs font-bold tracking-[0.25em] uppercase text-brand-orange mb-2",
						children: "OUR VALUES"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-serif text-[34px] leading-[1.15] md:text-4xl lg:text-5xl font-bold text-espresso tracking-tight",
						children: "The Values That Guide Us"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8",
					children: values.map(({ title, desc, Icon }, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center text-center p-4 rounded-2xl hover:bg-cream-deep/50 transition-colors",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "size-16 sm:size-20 rounded-full bg-cream border border-border flex items-center justify-center text-brand-orange shadow-xs mb-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-7 sm:size-8" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-serif text-base sm:text-lg font-bold text-espresso",
								children: title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs sm:text-sm text-espresso/75 leading-relaxed mt-1.5 max-w-[180px]",
								children: desc
							})
						]
					}, idx))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "py-14 md:py-20 lg:py-24 bg-cream border-b border-border/80",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-page",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center max-w-2xl mx-auto mb-10 md:mb-12 lg:mb-16",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs font-bold tracking-[0.25em] uppercase text-brand-orange mb-2",
							children: "OUR BEEKEEPING PROCESS"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-serif text-[34px] leading-[1.15] md:text-4xl lg:text-5xl font-bold text-espresso tracking-tight",
							children: "From Our Farm to Your Table"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "block md:hidden mt-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PremiumMobileCarousel, {
							items: processSteps,
							slideClassName: "flex-[0_0_86vw] sm:flex-[0_0_55vw]",
							renderItem: ({ step, desc, img }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col h-full rounded-[22px] overflow-hidden bg-white shadow-[0_12px_30px_rgba(0,0,0,0.06)] relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "aspect-[4/3] w-full overflow-hidden bg-[#F8F5EF]/50",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: img,
										alt: step,
										loading: "lazy",
										className: "w-full h-full object-cover pointer-events-none"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-6 flex flex-col flex-1 bg-white",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-serif text-[18px] font-bold text-[#2B2118]",
										children: step
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[14px] text-[#6B6257] leading-relaxed mt-2",
										children: desc
									})]
								})]
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "hidden md:grid md:grid-cols-3 lg:grid-cols-5 md:gap-6 items-start relative",
						children: processSteps.map(({ step, desc, img }, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col rounded-2xl overflow-hidden bg-cream border border-border/80 shadow-xs hover:shadow-lift transition-all duration-300 relative group h-full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "aspect-[4/3] md:aspect-[16/10] lg:aspect-[4/3] overflow-hidden bg-cream-deep",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: img,
									alt: step,
									loading: "lazy",
									className: "w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-5 flex flex-col justify-between flex-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-serif text-sm sm:text-base font-bold text-espresso group-hover:text-brand-orange transition-colors",
									children: step
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs sm:text-sm text-espresso/75 leading-relaxed mt-1.5",
									children: desc
								})] })
							})]
						}, idx))
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "py-14 md:py-20 lg:py-24 bg-cream",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "container-page",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 lg:grid-cols-12 gap-x-4 gap-y-10 md:gap-10 items-stretch",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "col-span-2 lg:col-span-4 flex flex-col justify-center space-y-5 md:space-y-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs font-bold tracking-[0.25em] uppercase text-brand-orange mb-2",
									children: "WHY CHOOSE US"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "font-serif text-[34px] leading-[1.15] md:text-4xl lg:text-5xl font-bold text-espresso",
									children: [
										"Naturally Sweet.",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										"Truly Wholesome."
									]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[16px] md:text-lg text-espresso/80 leading-relaxed",
									children: "Our honey is more than just a sweetener — it's nature's gift in its purest form."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "space-y-3.5 pt-1",
									children: [
										"Pure & Unadulterated Honey",
										"Ethically Sourced & Sustainably Harvested",
										"Lab Tested for Moisture, HMF & Purity",
										"No Artificial Flavours or Preservatives"
									].map((text, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-start gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-5 text-brand-orange shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm sm:text-[15px] font-semibold text-espresso",
											children: text
										})]
									}, idx))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "pt-2 self-start",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/shop",
										className: "inline-flex items-center justify-center gap-2 bg-brand-orange hover:bg-brand-orange-hover text-white px-8 py-4 rounded-full font-bold text-xs tracking-widest uppercase transition-all duration-300 shadow-md hover:scale-[1.02]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "KNOW MORE ABOUT US" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "col-span-1 lg:col-span-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full rounded-2xl md:rounded-3xl overflow-hidden shadow-lift border border-border/80 bg-cream-deep aspect-square md:aspect-auto md:min-h-[440px]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: honey_drizzle_default,
									alt: "Raw honey pouring",
									loading: "lazy",
									className: "w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "col-span-1 lg:col-span-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full rounded-2xl md:rounded-3xl overflow-hidden shadow-lift border border-border/80 bg-cream-deep aspect-square md:aspect-auto md:min-h-[440px]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: bee_flower_default,
									alt: "Honey bee collecting nectar from wild flora",
									loading: "lazy",
									className: "w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
								})
							})
						})
					]
				})
			})
		})
	] });
}
//#endregion
export { OurStory as component };
