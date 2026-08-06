import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CWNNtKRC.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { n as useAuth } from "./auth-6Mbne5z8.mjs";
import { _ as useNavigate, f as Outlet, g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as useServerFn } from "./useServerFn-BqzygRuj.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { At as FileText, Bt as ClipboardList, C as ShoppingBag, E as Settings, H as Package, J as Menu, K as MessageSquare, Q as LogOut, Y as Megaphone, Z as Mail, _ as Store, dn as ArrowLeftRight, en as Boxes, ft as Image, h as Tags, ht as House, i as X, kt as Film, m as Ticket, o as Users, on as Award, ot as LayoutDashboard, st as Layers, v as Star, w as ShieldCheck } from "../_libs/lucide-react.mjs";
import { t as claimAdmin } from "./admin.functions-BVMN6mgl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-BPTDIcbd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AutoSeeder() {
	const hasRun = (0, import_react.useRef)(false);
	const [status, setStatus] = (0, import_react.useState)("Checking product catalog...");
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		if (hasRun.current) return;
		hasRun.current = true;
		async function seedData() {
			try {
				console.log("AutoSeeder: Checking if products need to be seeded...");
				const { count, error: countErr } = await supabase.from("products").select("*", {
					count: "exact",
					head: true
				});
				if (countErr) {
					console.error("AutoSeeder count error:", countErr);
					setStatus("Error connecting to Supabase.");
					setLoading(false);
					return;
				}
				setStatus(`Synchronizing catalog (found ${count} products)...`);
				const res = await fetch("/products.json");
				if (!res.ok) {
					setStatus("Failed to load products.json");
					setLoading(false);
					return;
				}
				const products = await res.json();
				let successCount = 0;
				for (const p of products) {
					setStatus(`Syncing ${p.name}...`);
					const imageKey = p.image ? p.image.replace(".jpg", "").replace(".png", "") : null;
					const images = (p.images || []).map((img) => img.replace(".jpg", "").replace(".png", ""));
					const additionalImages = (p.additionalImages || []).map((img) => img.replace(".jpg", "").replace(".png", ""));
					const { data: prodData, error: pErr } = await supabase.from("products").upsert({
						slug: p.slug,
						name: p.name,
						tagline: p.tagline || null,
						description: p.description || null,
						category: p.category || null,
						flora: p.flora || null,
						badge: p.badge || null,
						price: p.price,
						price_max: p.priceMax || null,
						mrp: p.mrp || null,
						rating: p.rating || 0,
						reviews_count: p.reviews || 0,
						sizes: p.sizes || [],
						benefits: p.benefits || [],
						image_key: imageKey,
						image_url: null,
						images,
						additional_images: additionalImages,
						attributes: p.attributes || null,
						published: true
					}, { onConflict: "slug" }).select("id").single();
					if (pErr) {
						console.error(`AutoSeeder Error on product ${p.slug}:`, pErr);
						continue;
					}
					if (p.variants && p.variants.length > 0) for (let i = 0; i < p.variants.length; i++) {
						const v = p.variants[i];
						const { error: vErr } = await supabase.from("product_variants").upsert({
							product_id: prodData.id,
							label: v.label,
							price: v.price,
							mrp: v.mrp || null,
							stock_quantity: v.stock || 100,
							is_active: v.inStock !== false,
							is_default: !!v.isDefault,
							sku: v.sku || null,
							weight_g: v.weightG || null,
							sort_order: i
						}, { onConflict: "product_id,label" });
						if (vErr) console.error(`AutoSeeder Error on variant ${v.label} for ${p.slug}:`, vErr);
					}
					successCount++;
				}
				console.log(`AutoSeeder: Successfully synced ${successCount} products.`);
				setStatus(`Successfully synchronized ${successCount} products to Supabase.`);
				setLoading(false);
			} catch (err) {
				console.error("AutoSeeder: Uncaught error:", err);
				setStatus("An error occurred during synchronization.");
				setLoading(false);
			}
		}
		seedData();
	}, []);
	if (!loading && status.includes("Successfully")) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-primary/10 border border-primary/20 text-primary p-4 rounded-md mb-6 flex items-center justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "font-semibold",
			children: "Catalog Synchronization"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm opacity-90",
			children: status
		})] }), loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full" })]
	});
}
var NAV = [
	{
		label: "Dashboard",
		to: "/admin",
		icon: LayoutDashboard
	},
	{
		label: "Products",
		to: "/admin/products",
		icon: Package,
		perm: "products.manage"
	},
	{
		label: "Categories",
		to: "/admin/categories",
		icon: Tags,
		perm: "categories.manage"
	},
	{
		label: "Inventory",
		to: "/admin/inventory",
		icon: Boxes,
		perm: "products.manage"
	},
	{
		label: "Orders",
		to: "/admin/orders",
		icon: ShoppingBag,
		perm: "orders.manage"
	},
	{
		label: "Customers",
		to: "/admin/customers",
		icon: Users
	},
	{
		label: "Reviews",
		to: "/admin/reviews",
		icon: Star,
		perm: "reviews.moderate"
	},
	{
		label: "Coupons",
		to: "/admin/coupons",
		icon: Ticket,
		perm: "coupons.manage"
	},
	{
		label: "Blog",
		to: "/admin/blog",
		icon: FileText,
		perm: "blog.manage"
	},
	{
		label: "Media",
		to: "/admin/media",
		icon: Image,
		perm: "media.manage"
	},
	{
		label: "Homepage Management",
		to: "/admin/homepage",
		icon: House,
		perm: "settings.manage",
		dividerBefore: "HOMEPAGE"
	},
	{
		label: "↳ Hero Slider",
		to: "/admin/hero",
		icon: Layers,
		perm: "settings.manage",
		indent: true
	},
	{
		label: "↳ Videos & Stories",
		to: "/admin/stories",
		icon: Film,
		perm: "settings.manage",
		indent: true
	},
	{
		label: "Who We Supply",
		to: "/admin/who-we-supply",
		icon: Store,
		perm: "settings.manage",
		dividerBefore: "OTHER"
	},
	{
		label: "Submissions",
		to: "/admin/submissions",
		icon: MessageSquare
	},
	{
		label: "Newsletter",
		to: "/admin/newsletter",
		icon: Mail,
		perm: "settings.manage"
	},
	{
		label: "Loyalty & Rewards",
		to: "/admin/loyalty",
		icon: Award,
		perm: "settings.manage"
	},
	{
		label: "Marketing & SEO",
		to: "/admin/marketing",
		icon: Megaphone,
		perm: "settings.manage"
	},
	{
		label: "Redirects",
		to: "/admin/redirects",
		icon: ArrowLeftRight,
		perm: "settings.manage"
	},
	{
		label: "Site Settings",
		to: "/admin/settings",
		icon: Settings,
		perm: "settings.manage"
	},
	{
		label: "Users & Roles",
		to: "/admin/users",
		icon: ShieldCheck,
		perm: "users.manage"
	},
	{
		label: "Audit Logs",
		to: "/admin/audit",
		icon: ClipboardList,
		perm: "audit.read"
	}
];
function AdminShell() {
	const { user, isAdmin, loading, signOut } = useAuth();
	const navigate = useNavigate();
	const claim = useServerFn(claimAdmin);
	const [claiming, setClaiming] = (0, import_react.useState)(false);
	const [open, setOpen] = (0, import_react.useState)(false);
	const path = useRouterState({ select: (s) => s.location.pathname });
	const [perms, setPerms] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	(0, import_react.useEffect)(() => {
		if (!loading && !user) navigate({
			to: "/auth",
			search: { redirect: "/admin" }
		});
	}, [
		user,
		loading,
		navigate
	]);
	(0, import_react.useEffect)(() => {
		if (!user) return;
		(async () => {
			const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", user.id);
			const roleList = (roles ?? []).map((r) => r.role);
			if (!roleList.length) return setPerms(/* @__PURE__ */ new Set());
			const { data: rp } = await supabase.from("role_permissions").select("permission_key,role").in("role", roleList);
			setPerms(new Set((rp ?? []).map((r) => r.permission_key)));
		})();
	}, [user]);
	if (loading || !user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen flex items-center justify-center text-sm text-muted-foreground",
		children: "Loading…"
	});
	if (!isAdmin) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-cream/50 flex items-center justify-center p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md w-full bg-white rounded-2xl border border-border p-8 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "mx-auto size-12 text-gold-deep" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 font-serif text-2xl text-forest-dark",
					children: "Admin access required"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: [
						"Signed in as ",
						user.email,
						"."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					disabled: claiming,
					onClick: async () => {
						setClaiming(true);
						try {
							if ((await claim({})).claimed) {
								toast.success("You are now the admin");
								location.reload();
							} else toast.error("An admin already exists. Ask them to grant access.");
						} catch (e) {
							toast.error(e.message);
						} finally {
							setClaiming(false);
						}
					},
					className: "mt-6 bg-forest-dark text-cream rounded-lg px-6 py-3 text-xs font-bold tracking-widest hover:bg-forest disabled:opacity-60",
					children: claiming ? "CLAIMING…" : "CLAIM ADMIN (FIRST USER)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex justify-center gap-4 text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/account",
						className: "text-gold-deep hover:underline",
						children: "Back to account"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: async () => {
							await signOut();
							navigate({ to: "/" });
						},
						className: "text-muted-foreground hover:underline",
						children: "Sign out"
					})]
				})
			]
		})
	});
	const visible = NAV.filter((n) => !n.perm || perms.has(n.perm) || isAdmin);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-cream/40 flex",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: `${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 fixed lg:sticky top-0 left-0 z-40 h-screen w-64 bg-forest-dark text-cream flex flex-col transition-transform`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-5 h-14 flex items-center border-b border-white/10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "font-serif text-lg tracking-wide",
							children: ["Saurashtra ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-gold",
								children: "Admin"
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "flex-1 overflow-y-auto py-3",
						children: visible.map((item) => {
							const active = item.to === "/admin" ? path === "/admin" : path.startsWith(item.to);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [item.dividerBefore && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "px-5 pt-4 pb-1 text-[10px] font-bold tracking-[0.15em] text-cream/30 uppercase select-none",
								children: item.dividerBefore
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								onClick: () => setOpen(false),
								className: `flex items-center gap-3 py-2 text-sm transition ${item.indent ? "pl-8 pr-5" : "px-5"} ${active ? "bg-white/10 text-gold border-l-2 border-gold" : item.indent ? "text-cream/60 hover:bg-white/5 hover:text-cream/90" : "text-cream/80 hover:bg-white/5 hover:text-cream"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: `shrink-0 ${item.indent ? "size-3.5" : "size-4"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: item.indent ? "text-[13px]" : "",
									children: item.label
								})]
							})] }, item.to);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-t border-white/10 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-cream/60 truncate mb-2",
							children: user.email
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "flex-1 text-center text-[11px] font-bold tracking-widest bg-white/5 hover:bg-white/10 rounded px-2 py-2",
								children: "SITE"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: async () => {
									await signOut();
									navigate({ to: "/" });
								},
								className: "flex-1 inline-flex justify-center items-center gap-1 text-[11px] font-bold tracking-widest bg-white/5 hover:bg-white/10 rounded px-2 py-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-3" }), " LOGOUT"]
							})]
						})]
					})
				]
			}),
			open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				"aria-label": "Close menu",
				onClick: () => setOpen(false),
				className: "fixed inset-0 z-30 bg-black/40 lg:hidden"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "h-14 bg-white border-b border-border sticky top-0 z-20 flex items-center gap-3 px-4 lg:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "lg:hidden",
						onClick: () => setOpen((o) => !o),
						"aria-label": "Menu",
						children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/admin",
							className: "hover:text-forest-dark",
							children: "Admin"
						}), path !== "/admin" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							" ",
							"/",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-forest-dark font-semibold capitalize",
								children: path.split("/")[2]
							})
						] })]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
					className: "p-4 lg:p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AutoSeeder, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})]
				})]
			})
		]
	});
}
var SplitComponent = AdminShell;
//#endregion
export { SplitComponent as component };
