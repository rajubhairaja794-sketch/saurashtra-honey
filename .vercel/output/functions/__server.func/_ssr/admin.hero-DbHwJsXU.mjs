import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CWNNtKRC.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { n as IMAGE_KEYS, r as resolveImage, t as FALLBACK_IMAGE } from "./product-images-CqBKNuR8.mjs";
import { t as useServerFn } from "./useServerFn-BqzygRuj.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { Nt as Eye, P as Plus, R as Pencil, b as Sparkles, j as RefreshCcw, l as Upload, ln as ArrowRight, p as Trash2, un as ArrowLeft } from "../_libs/lucide-react.mjs";
import { a as PageHeader, c as Td, d as inp, i as Field, l as Th, n as BtnPrimary, o as StatusPill, r as Card, s as TableWrap, t as BtnGhost } from "./ui-Cij6S7ah.mjs";
import { d as upsertSlide, o as listAdminSlides, r as deleteSlide } from "./admin-catalog.functions-CgqqVjgd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.hero-DbHwJsXU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var EMPTY = {
	page: "home",
	eyebrow: "100% PURE & NATURAL",
	title: "New Golden Harvest",
	title_accent: "Direct From Our Hives",
	subtitle: "Sustainably harvested across Saurashtra floral farms.",
	image_key: "hero-honey",
	image_url: null,
	cta_label: "SHOP NOW",
	cta_href: "/shop",
	align: "left",
	sort_order: 1,
	active: true
};
var PAGE_OPTIONS = [
	{
		value: "home",
		label: "Home Page (1920×700)"
	},
	{
		value: "shop",
		label: "Shop (1920×600)"
	},
	{
		value: "our-story",
		label: "Our Story (1920×600)"
	},
	{
		value: "bee-farming",
		label: "Bee Farming (1920×600)"
	},
	{
		value: "blog",
		label: "Journal (1920×600)"
	},
	{
		value: "bulk-orders",
		label: "Bulk & Gifting (1920×600)"
	},
	{
		value: "contact",
		label: "Contact (1920×600)"
	}
];
function HeroPage() {
	const list = useServerFn(listAdminSlides);
	const del = useServerFn(deleteSlide);
	const [rows, setRows] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [edit, setEdit] = (0, import_react.useState)(null);
	const [filterPage, setFilterPage] = (0, import_react.useState)("all");
	async function load() {
		setLoading(true);
		try {
			const r = await list({});
			setRows(r.rows);
		} catch (e) {
			toast.error(e.message);
		} finally {
			setLoading(false);
		}
	}
	(0, import_react.useEffect)(() => {
		load();
	}, []);
	const filteredRows = (0, import_react.useMemo)(() => {
		if (filterPage === "all") return rows;
		return rows.filter((r) => r.page.toLowerCase() === filterPage.toLowerCase());
	}, [rows, filterPage]);
	if (edit) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Editor, {
		initial: edit,
		onCancel: () => setEdit(null),
		onSaved: async () => {
			setEdit(null);
			await load();
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Banner / Hero Slider Management",
			subtitle: `${rows.length} total hero slides across website pages`,
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BtnGhost, {
				onClick: load,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCcw, { className: "size-3.5" }), " REFRESH"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BtnPrimary, {
				onClick: () => setEdit(EMPTY),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), " NEW SLIDE"]
			})] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center gap-2 mb-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs font-bold text-forest-dark",
					children: "Filter Page:"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setFilterPage("all"),
					className: `px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${filterPage === "all" ? "bg-forest-dark text-cream" : "bg-cream text-forest-dark border border-border"}`,
					children: [
						"All (",
						rows.length,
						")"
					]
				}),
				PAGE_OPTIONS.map((opt) => {
					const count = rows.filter((r) => r.page.toLowerCase() === opt.value).length;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setFilterPage(opt.value),
						className: `px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${filterPage === opt.value ? "bg-forest-dark text-cream" : "bg-cream text-forest-dark border border-border"}`,
						children: [
							opt.value.toUpperCase(),
							" (",
							count,
							")"
						]
					}, opt.value);
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableWrap, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: [
			"Page",
			"Sort",
			"Preview",
			"Title",
			"CTA",
			"Status",
			""
		].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: h }, h)) }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", {
			className: "divide-y divide-border",
			children: [
				loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					colSpan: 7,
					className: "px-4 py-12 text-center text-muted-foreground",
					children: "Loading slides…"
				}) }),
				!loading && filteredRows.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					colSpan: 7,
					className: "px-4 py-12 text-center text-muted-foreground",
					children: "No slides found for this view. Click \"NEW SLIDE\" to add custom banners."
				}) }),
				!loading && filteredRows.map((r) => {
					const previewImg = resolveImage(r.image_key, r.image_url, FALLBACK_IMAGE);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "hover:bg-cream/40",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, {
								className: "text-xs font-bold uppercase text-brand-orange",
								children: r.page
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, {
								className: "text-xs text-muted-foreground font-mono",
								children: r.sort_order
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "size-12 rounded-lg overflow-hidden border border-border bg-cream shrink-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: previewImg,
									alt: r.title,
									className: "w-full h-full object-cover"
								})
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, {
								className: "font-medium text-forest-dark",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									r.eyebrow && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] tracking-wider uppercase text-brand-orange font-bold",
										children: r.eyebrow
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: r.title }),
									" ",
									r.title_accent && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "italic text-brand-orange",
										children: r.title_accent
									})
								] })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Td, {
								className: "text-xs",
								children: [
									r.cta_label,
									" → ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono",
										children: r.cta_href
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { s: r.active ? "live" : "disabled" }) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Td, {
								className: "text-right whitespace-nowrap",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setEdit(r),
									className: "text-brand-orange hover:underline text-xs font-bold mr-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-3.5 inline" }), " EDIT"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: async () => {
										if (!confirm("Delete this hero slide?")) return;
										try {
											await del({ data: { id: r.id } });
											toast.success("Deleted slide");
											load();
										} catch (e) {
											toast.error(e.message);
										}
									},
									className: "text-destructive hover:underline text-xs font-bold",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5 inline" })
								})]
							})
						]
					}, r.id);
				})
			]
		})] })
	] });
}
function Editor({ initial, onCancel, onSaved }) {
	const [f, setF] = (0, import_react.useState)({ ...initial });
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const save = useServerFn(upsertSlide);
	async function onUploadImage(file) {
		if (!file.type.startsWith("image/")) {
			toast.error("Please choose an image file (JPG, PNG, WEBP)");
			return;
		}
		setUploading(true);
		try {
			const safeName = file.name.replace(/[^\w.-]+/g, "_");
			const path = `hero/${Date.now()}_${safeName}`;
			const { data, error } = await supabase.storage.from("media").upload(path, file, {
				contentType: file.type,
				cacheControl: "3600",
				upsert: true
			});
			if (error) throw new Error(error.message);
			const { data: pubData } = supabase.storage.from("media").getPublicUrl(data.path);
			setF((prev) => ({
				...prev,
				image_url: pubData.publicUrl,
				image_key: null
			}));
			toast.success("Banner image uploaded to Supabase Storage");
		} catch (e) {
			toast.error(e.message);
		} finally {
			setUploading(false);
		}
	}
	const previewImage = resolveImage(f.image_key, f.image_url, FALLBACK_IMAGE);
	const isHome = (f.page || "home").toLowerCase() === "home";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		onClick: onCancel,
		className: "inline-flex items-center gap-1 text-xs font-bold text-forest-dark mb-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), " BACK TO SLIDES"]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid grid-cols-1 lg:grid-cols-12 gap-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "lg:col-span-7",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-serif text-2xl text-forest-dark mb-4",
						children: f.id ? "Edit Hero Slide" : "New Hero Slide"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-xs text-forest-dark bg-cream/70 border border-brand-orange/30 rounded-xl p-4 mb-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 font-bold text-brand-orange mb-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Recommended Artwork Dimensions:" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "list-disc pl-5 space-y-1 mt-1 text-espresso/90",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "For Home Page banner uploads:" }),
									" Recommended size →",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono font-bold",
										children: "1920 × 700 px"
									}),
									" (Aspect Ratio 1920:700)"
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "For Other Page banner uploads:" }),
									" Recommended size →",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono font-bold",
										children: "1920 × 600 px"
									}),
									" (Aspect Ratio 1920:600)"
								] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-[11px] text-espresso/70 italic font-medium",
								children: "Warning: If an uploaded image has a different aspect ratio, cropping may occur automatically."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid md:grid-cols-2 gap-4 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Target Page *",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: f.page ?? "home",
									onChange: (e) => setF({
										...f,
										page: e.target.value
									}),
									className: inp,
									children: PAGE_OPTIONS.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: o.value,
										children: o.label
									}, o.value))
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Sort Order",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									value: f.sort_order ?? 0,
									onChange: (e) => setF({
										...f,
										sort_order: Number(e.target.value)
									}),
									className: inp
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Eyebrow Badge",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: f.eyebrow ?? "",
									onChange: (e) => setF({
										...f,
										eyebrow: e.target.value
									}),
									placeholder: "e.g. 100% PURE & NATURAL",
									className: inp
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Text Alignment",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: f.align ?? "left",
									onChange: (e) => setF({
										...f,
										align: e.target.value
									}),
									className: inp,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "left",
										children: "Left Aligned"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "center",
										children: "Center Aligned"
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Primary Heading *",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: f.title ?? "",
									onChange: (e) => setF({
										...f,
										title: e.target.value
									}),
									placeholder: "e.g. Pure Honey.",
									className: inp
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Orange Italic Accent Text",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: f.title_accent ?? "",
									onChange: (e) => setF({
										...f,
										title_accent: e.target.value
									}),
									placeholder: "e.g. Proven Purity.",
									className: inp
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "md:col-span-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Subtitle / Description",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: f.subtitle ?? "",
										onChange: (e) => setF({
											...f,
											subtitle: e.target.value
										}),
										placeholder: "e.g. Sustainably harvested from wild flora across Saurashtra...",
										className: inp
									})
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "md:col-span-2 pt-2 border-t border-border",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs font-bold text-forest-dark mb-2",
										children: "Banner Background Image *"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex flex-wrap items-center gap-3 mb-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-hover text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors shadow-sm",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-3.5" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: uploading ? "UPLOADING TO SUPABASE…" : "UPLOAD BANNER IMAGE" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "file",
													accept: "image/*",
													className: "hidden",
													disabled: uploading,
													onChange: (e) => {
														const file = e.target.files?.[0];
														if (file) onUploadImage(file);
													}
												})
											]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid md:grid-cols-2 gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Or select built-in asset key",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
												value: f.image_key ?? "",
												onChange: (e) => setF({
													...f,
													image_key: e.target.value || null,
													image_url: null
												}),
												className: inp,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "",
													children: "— Use custom URL / uploaded image —"
												}), IMAGE_KEYS.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: k,
													children: k
												}, k))]
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Or paste Image URL (Supabase Storage URL)",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												value: f.image_url ?? "",
												onChange: (e) => setF({
													...f,
													image_url: e.target.value || null,
													image_key: null
												}),
												placeholder: "https://...",
												className: inp
											})
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "CTA Button Label",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: f.cta_label ?? "",
									onChange: (e) => setF({
										...f,
										cta_label: e.target.value
									}),
									placeholder: "SHOP PURE HONEY",
									className: inp
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "CTA Button Target URL",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: f.cta_href ?? "/shop",
									onChange: (e) => setF({
										...f,
										cta_href: e.target.value
									}),
									placeholder: "/shop",
									className: inp
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "md:col-span-2 pt-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "inline-flex items-center gap-2 text-sm font-bold text-forest-dark cursor-pointer",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										checked: !!f.active,
										onChange: (e) => setF({
											...f,
											active: e.target.checked
										}),
										className: "size-4 rounded border-border text-brand-orange"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Active (Display this banner in the slider)" })]
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BtnPrimary, {
							disabled: busy || uploading,
							onClick: async () => {
								if (!f.title?.trim()) {
									toast.error("Please provide a Primary Heading");
									return;
								}
								setBusy(true);
								try {
									await save({ data: {
										id: f.id,
										page: f.page || "home",
										eyebrow: f.eyebrow ?? null,
										title: f.title,
										title_accent: f.title_accent ?? null,
										subtitle: f.subtitle ?? null,
										image_key: f.image_key || null,
										image_url: f.image_url || null,
										cta_label: f.cta_label ?? null,
										cta_href: f.cta_href || "/shop",
										align: f.align === "center" ? "center" : "left",
										sort_order: Number(f.sort_order ?? 0),
										active: !!f.active
									} });
									toast.success("Hero slide saved successfully");
									await onSaved();
								} catch (e) {
									toast.error(e.message);
								} finally {
									setBusy(false);
								}
							},
							children: busy ? "SAVING SLIDE…" : "SAVE SLIDE"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BtnGhost, {
							onClick: onCancel,
							children: "CANCEL"
						})]
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "lg:col-span-5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-5 sticky top-24",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between mb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs font-bold text-forest-dark uppercase tracking-wider flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4 text-brand-orange" }), " LIVE BANNER PREVIEW"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[11px] font-mono font-bold text-muted-foreground bg-cream px-2 py-0.5 rounded border border-border",
							children: isHome ? "1920 × 700 px (Home)" : "1920 × 600 px (Inner)"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `relative rounded-2xl overflow-hidden shadow-lg border border-border bg-espresso w-full ${isHome ? "aspect-[1920/700]" : "aspect-[1920/600]"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: previewImage,
								alt: f.title || "Preview",
								className: "w-full h-full object-cover"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-r from-espresso/80 via-espresso/45 to-transparent pointer-events-none" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute inset-0 flex flex-col justify-center p-6 text-cream z-10",
								children: [
									f.eyebrow && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "inline-flex items-center gap-2 bg-espresso/85 border border-brand-orange/40 px-3 py-1 rounded-full w-max mb-2 backdrop-blur-md",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] font-bold tracking-[0.15em] text-brand-orange uppercase",
											children: f.eyebrow
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
										className: `font-serif font-bold leading-tight ${isHome ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"}`,
										children: [f.title || "Primary Heading", f.title_accent && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "italic text-brand-orange font-normal",
											children: f.title_accent
										})] })]
									}),
									f.subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-cream/90 text-xs sm:text-sm line-clamp-2 max-w-sm",
										children: f.subtitle
									}),
									f.cta_label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1.5 bg-[#B57420] text-white px-4 py-2 rounded-full text-[11px] font-bold tracking-widest uppercase shadow-md",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: f.cta_label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3" })]
										})
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 text-center text-xs text-muted-foreground",
						children: "This interactive preview renders live as you type and select background imagery."
					})
				]
			})
		})]
	})] });
}
//#endregion
export { HeroPage as component };
