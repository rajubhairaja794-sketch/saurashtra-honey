import { i as __toESM } from "../_runtime.mjs";
import { n as honeycomb_bees_default } from "./prod-lychee-Di3dQ6EL.mjs";
import { i as honey_drizzle_default, n as bee_flower_default, r as family_honey_default, t as bee_farm_default } from "./team-beekeepers-Bb0crWjH.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { Wt as CircleCheck, _t as HeartHandshake, b as Sparkles, it as Leaf } from "../_libs/lucide-react.mjs";
import { n as SiteLayout } from "./Layout-vj9XDuOl.mjs";
import { r as hero_products_default } from "./hero-catalog-WFU6Elpd.mjs";
import { t as PageHeroSlider } from "./PageHeroSlider-mZMVe2Y7.mjs";
import { t as useEmblaCarousel } from "../_libs/embla-carousel-react+[...].mjs";
import { t as Autoplay } from "../_libs/embla-carousel-autoplay.mjs";
import { t as PremiumMobileCarousel } from "./PremiumMobileCarousel-CkEO3_mW.mjs";
import { n as breadcrumbLd, t as StructuredData } from "./StructuredData-C0TBI3qI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bee-farming-3HUg6WpX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function BeeFarming() {
	const approachCards = [
		{
			title: "Natural Habitat",
			desc: "Our bees thrive in clean, lush environments far from pollution.",
			img: bee_farm_default,
			Icon: Leaf
		},
		{
			title: "Healthy Bees",
			desc: "We ensure strong, disease-free colonies through natural care.",
			img: bee_flower_default,
			Icon: Sparkles
		},
		{
			title: "Ethical Practices",
			desc: "We follow sustainable methods that protect bees and nature.",
			img: family_honey_default,
			Icon: HeartHandshake
		}
	];
	const processSteps = [
		{
			num: 1,
			title: "Flowers Bloom",
			desc: "Bees collect nectar from wildflowers and plants.",
			img: bee_farm_default
		},
		{
			num: 2,
			title: "Bees Collect Nectar",
			desc: "Bees gather nectar and store it in honeycombs.",
			img: bee_flower_default
		},
		{
			num: 3,
			title: "Nectar is Converted",
			desc: "Bees naturally convert nectar into pure honey.",
			img: honeycomb_bees_default
		},
		{
			num: 4,
			title: "Careful Harvesting",
			desc: "We harvest honey with care, without harming the bees.",
			img: family_honey_default
		},
		{
			num: 5,
			title: "Cold Extraction",
			desc: "Honey is extracted at low temperatures to retain nutrients.",
			img: honey_drizzle_default
		},
		{
			num: 6,
			title: "Pure Honey to You",
			desc: "Lab-tested, packed with care and delivered to your home.",
			img: hero_products_default
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StructuredData, { data: breadcrumbLd([{
			name: "Home",
			url: "/"
		}, {
			name: "Bee Farming",
			url: "/bee-farming"
		}]) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeroSlider, { page: "bee-farming" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			id: "our-approach",
			className: "py-16 sm:py-24 bg-cream border-b border-border/80",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "container-page",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lg:col-span-4 space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs font-bold tracking-[0.25em] uppercase text-brand-orange mb-2",
								children: "OUR APPROACH"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-espresso leading-tight",
								children: [
									"Our Approach to",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"Bee Farming"
								]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm sm:text-base text-espresso/80 leading-relaxed",
								children: "We believe in ethical beekeeping that works in harmony with nature. Our bees are cared for with respect, without harming their colonies or the environment."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "space-y-3 pt-1",
								children: [
									"We do not over-harvest honey.",
									"We ensure healthy colonies and natural habitats.",
									"We support pollination and biodiversity.",
									"We follow seasonal harvesting for best quality."
								].map((point, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-start gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-5 text-brand-orange shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm sm:text-[15px] font-semibold text-espresso",
										children: point
									})]
								}, idx))
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lg:col-span-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "block sm:hidden mt-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PremiumMobileCarousel, {
								items: approachCards,
								slideClassName: "flex-[0_0_86vw] min-w-0",
								renderItem: ({ title, desc, img, Icon }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col items-center rounded-[22px] overflow-hidden bg-white shadow-[0_12px_30px_rgba(0,0,0,0.06)] transition-all duration-300 text-center pb-6 h-full",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "aspect-[4/3] w-full overflow-hidden bg-cream-deep relative",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: img,
												alt: title,
												loading: "lazy",
												className: "w-full h-full object-cover object-center pointer-events-none"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "size-12 rounded-full bg-cream border border-border text-brand-orange shadow-sm flex items-center justify-center -mt-6 relative z-10 mx-auto",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-serif text-[18px] font-bold text-espresso mt-2 px-3",
											children: title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[14px] text-espresso/75 leading-relaxed mt-1 px-4",
											children: desc
										})
									]
								})
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "hidden sm:grid sm:grid-cols-3 gap-6",
							children: approachCards.map(({ title, desc, img, Icon }, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col items-center rounded-3xl overflow-hidden bg-cream border border-border/80 shadow-xs hover:shadow-lift transition-all duration-300 text-center pb-6 group",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "aspect-[4/3] w-full overflow-hidden bg-cream-deep relative",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: img,
											alt: title,
											loading: "lazy",
											className: "w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "size-12 rounded-full bg-cream border border-border text-brand-orange shadow-sm flex items-center justify-center -mt-6 relative z-10 mx-auto",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-serif text-base sm:text-lg font-bold text-espresso mt-2 px-3",
										children: title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs sm:text-sm text-espresso/75 leading-relaxed mt-1 px-4",
										children: desc
									})
								]
							}, idx))
						})]
					})]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "py-20 sm:py-32 bg-[#FDFBF7] border-b border-border/60 overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "container-page",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center max-w-[700px] mx-auto mb-16 sm:mb-24",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[12px] font-bold tracking-[0.25em] uppercase text-[#D97706] mb-4",
							children: "OUR BEE FARMING PROCESS"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-serif text-[34px] sm:text-[44px] md:text-[56px] font-[500] text-[#2B2118] tracking-tight leading-[1.1] mb-6",
							children: "From Flower to Honey – The Natural Way"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[15px] sm:text-[17px] text-[#6B6257] leading-[1.7] max-w-[650px] mx-auto",
							children: "Follow the remarkable journey of pure honey—from wildflowers and hardworking bees to careful harvesting and gentle extraction—crafted by nature and preserved with care."
						})
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BeeFarmingProcessCarousel, { steps: processSteps })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "py-16 sm:py-24 bg-cream",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "container-page",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lg:col-span-5 space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs font-bold tracking-[0.25em] uppercase text-brand-orange mb-2",
								children: "WHY BEES MATTER"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-espresso leading-tight inline-flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									"Small Bees.",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"Big Impact."
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-2xl sm:text-3xl",
									children: "🐝"
								})]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm sm:text-base text-espresso/80 leading-relaxed",
								children: "Bees play a vital role in pollination, supporting food production and maintaining the balance of our ecosystem."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "space-y-3.5 pt-1",
								children: [
									"1/3 of the food we eat is pollinated by bees.",
									"Bees help plants, fruits and seeds grow.",
									"A healthy bee population means a healthy planet."
								].map((text, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-start gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-5 text-brand-orange shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm sm:text-[15px] font-semibold text-espresso",
										children: text
									})]
								}, idx))
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "lg:col-span-7",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-3xl sm:rounded-[2rem] overflow-hidden shadow-lift border border-border/80 bg-cream-deep aspect-[16/10] sm:aspect-[16/9]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: bee_farm_default,
								alt: "Saurashtra Honey — Natural Bee Farm & Apiary Boxes",
								loading: "lazy",
								className: "w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
							})
						})
					})]
				})
			})
		})
	] });
}
function BeeFarmingProcessCarousel({ steps }) {
	const [emblaRef, emblaApi] = useEmblaCarousel({
		loop: true,
		align: "start",
		duration: 60,
		skipSnaps: false
	}, [Autoplay({
		delay: 3e3,
		stopOnInteraction: true,
		playOnInit: false
	})]);
	import_react.useEffect(() => {
		if (!emblaApi) return;
		const autoplay = emblaApi.plugins().autoplay;
		if (!autoplay) return;
		const initTimeout = setTimeout(() => {
			autoplay.play();
		}, 3e3);
		const resumeAutoplay = () => {
			autoplay.play();
		};
		let timeoutId;
		const onInteract = () => {
			autoplay.stop();
			clearTimeout(timeoutId);
			clearTimeout(initTimeout);
			timeoutId = setTimeout(resumeAutoplay, 5e3);
		};
		emblaApi.on("pointerDown", onInteract);
		emblaApi.on("pointerUp", onInteract);
		return () => {
			emblaApi.off("pointerDown", onInteract);
			emblaApi.off("pointerUp", onInteract);
			clearTimeout(timeoutId);
			clearTimeout(initTimeout);
		};
	}, [emblaApi]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-hidden w-full pl-4 sm:pl-8 md:pl-12 lg:pl-[max(2rem,calc((100vw-1200px)/2))] pb-12",
		ref: emblaRef,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex touch-pan-y cursor-grab active:cursor-grabbing pb-6",
			style: { marginLeft: "-24px" },
			children: steps.map(({ num, title, desc, img }, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-[0_0_90vw] md:flex-[0_0_380px] xl:flex-[0_0_480px] min-w-0 pl-[24px]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col rounded-[24px] overflow-hidden bg-white border border-[#D97706]/15 shadow-[0_4px_24px_rgba(43,33,24,0.04)] hover:shadow-[0_16px_40px_rgba(43,33,24,0.08)] transition-all duration-500 relative group animate-in fade-in slide-in-from-bottom-8 fill-mode-both hover:-translate-y-2 h-[480px] md:h-[520px] xl:h-[580px]",
					style: { animationDelay: `${idx * 150}ms` },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-[82%] w-full overflow-hidden bg-[#F8F5EF] relative",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: img,
							alt: title,
							loading: "lazy",
							className: "w-full h-full object-cover object-center"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "h-[18%] px-5 sm:px-6 flex flex-col justify-center text-center bg-white relative z-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-[11px] font-bold uppercase tracking-widest text-[#D97706] mb-0.5",
								children: ["Step ", num]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-serif text-[18px] sm:text-[20px] font-bold text-[#2B2118] mb-1 line-clamp-1",
								children: title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[13px] sm:text-[14px] text-[#6B6257] leading-[1.6] line-clamp-2",
								children: desc
							})
						]
					})]
				})
			}, idx))
		})
	});
}
//#endregion
export { BeeFarming as component };
