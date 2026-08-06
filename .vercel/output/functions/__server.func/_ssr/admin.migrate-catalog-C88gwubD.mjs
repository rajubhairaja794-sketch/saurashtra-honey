import { i as __toESM } from "../_runtime.mjs";
import { a as products, n as getProductGallery, r as getProductVariants, t as getProductAdditionalImages } from "./products-BzIDWMnY.mjs";
import { t as supabase } from "./client-CWNNtKRC.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.migrate-catalog-C88gwubD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var runMigration = createServerFn("POST", async () => {
	const { count: beforeCount } = await supabase.from("products").select("*", {
		count: "exact",
		head: true
	});
	const allProducts = products;
	const results = {
		totalStatic: allProducts.length,
		totalBefore: beforeCount || 0,
		migrated: 0,
		errors: []
	};
	for (const p of allProducts) try {
		const { data: prodData, error: pErr } = await supabase.from("products").upsert({
			slug: p.slug,
			name: p.name,
			tagline: p.tagline || null,
			description: p.description,
			category: p.category,
			flora: p.flora || null,
			badge: p.badge || null,
			price: p.price,
			price_max: p.priceMax || null,
			mrp: p.mrp || null,
			rating: p.rating,
			reviews_count: p.reviews,
			sizes: p.sizes,
			benefits: p.benefits,
			image_key: p.image || null,
			image_url: p.image || null,
			images: getProductGallery(p),
			additional_images: getProductAdditionalImages(p),
			attributes: p.attributes || null,
			published: true
		}, { onConflict: "slug" }).select("id").single();
		if (pErr) throw new Error(`Product ${p.slug}: ${pErr.message}`);
		const productId = prodData.id;
		const variants = getProductVariants(p);
		for (let i = 0; i < variants.length; i++) {
			const v = variants[i];
			const { error: vErr } = await supabase.from("product_variants").upsert({
				product_id: productId,
				label: v.label,
				price: v.price,
				mrp: v.mrp || null,
				stock_quantity: v.stock ?? 100,
				is_active: v.inStock !== false,
				is_default: !!v.isDefault,
				sku: v.sku || null,
				weight_g: v.weightG || null,
				sort_order: i
			}, { onConflict: "product_id,label" });
			if (vErr) throw new Error(`Variant ${p.slug} - ${v.label}: ${vErr.message}`);
		}
		results.migrated++;
	} catch (e) {
		results.errors.push(e.message);
	}
	const { count: afterCount } = await supabase.from("products").select("*", {
		count: "exact",
		head: true
	});
	return {
		...results,
		totalAfter: afterCount || 0
	};
});
function MigrateCatalog() {
	const [res, setRes] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const handleMigrate = async () => {
		setLoading(true);
		try {
			const data = await runMigration();
			setRes(data);
		} catch (e) {
			setRes({ error: e.message });
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold mb-4",
				children: "Migrate Static Catalog to Supabase"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: handleMigrate,
				disabled: loading,
				className: "bg-blue-600 text-white px-4 py-2 rounded",
				children: loading ? "Migrating..." : "Run Migration"
			}),
			res && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
				className: "mt-8 bg-gray-100 p-4 rounded text-sm overflow-auto",
				children: JSON.stringify(res, null, 2)
			})
		]
	});
}
//#endregion
export { MigrateCatalog as component };
