import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  listAdminProducts,
  upsertProduct,
  deleteProduct,
  listProductVariants,
  saveProductVariants,
  type VariantItem,
} from "@/lib/admin-catalog.functions";
import { listCategories, upsertCategory, uploadProductImage } from "@/lib/admin-cms.functions";
import { IMAGE_KEYS } from "@/lib/product-images";
import {
  BtnGhost,
  BtnPrimary,
  Card,
  csvDownload,
  Field,
  inp,
  PageHeader,
  StatusPill,
  TableWrap,
  Td,
  Th,
} from "@/components/admin/ui";
import {
  ArrowLeft,
  ArrowLeftRight,
  ArrowUp,
  ArrowDown,
  Copy,
  Download,
  ImageOff,
  Pencil,
  Plus,
  RefreshCcw,
  Star,
  Trash2,
  Upload,
} from "lucide-react";

export const Route = createFileRoute("/admin/products")({ component: ProductsPage });

type P = {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  description: string | null;
  category: string | null;
  flora: string | null;
  badge: string | null;
  price: number;
  price_max: number | null;
  mrp: number | null;
  rating: number | string;
  reviews_count: number;
  sizes: string[];
  benefits: string[];
  image_key: string | null;
  image_url: string | null;
  images: string[] | null;
  additional_images: string[] | null;
  stock_quantity: number;
  in_stock: boolean;
  published: boolean;
  sort_order: number;
  sku: string | null;
  barcode: string | null;
  brand: string | null;
  ingredients: string | null;
  usage_instructions: string | null;
  warnings: string | null;
  cost_price_paise: number | null;
  gst_percent: number | null;
  hsn_code: string | null;
  weight_g: number | null;
  low_stock_limit: number;
  status: "draft" | "published" | "archived";
  is_featured: boolean;
  is_bestseller: boolean;
  is_new_arrival: boolean;
  video_url: string | null;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  canonical_url: string | null;
  attributes?: Record<string, string | string[]>;
  show_on_homepage: boolean;
};

const EMPTY: Partial<P> = {
  slug: "",
  name: "",
  tagline: "",
  description: "",
  category: "Single Flora",
  flora: "",
  badge: null,
  price: 0,
  price_max: null,
  mrp: null,
  rating: 0,
  reviews_count: 0,
  sizes: [],
  benefits: [],
  image_key: null,
  image_url: null,
  images: [],
  additional_images: [],
  stock_quantity: 100,
  in_stock: true,
  published: true,
  sort_order: 0,
  low_stock_limit: 5,
  status: "published",
  is_featured: false,
  is_bestseller: false,
  is_new_arrival: false,
  attributes: {},
  show_on_homepage: false,
};

function ProductsPage() {
  const list = useServerFn(listAdminProducts);
  const save = useServerFn(upsertProduct);
  const del = useServerFn(deleteProduct);
  const getCats = useServerFn(listCategories);
  const [rows, setRows] = useState<P[]>([]);
  const [cats, setCats] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState<Partial<P> | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [q, setQ] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const saveV = useServerFn(saveProductVariants);

  async function load() {
    setLoading(true);
    try {
      const [r, c] = await Promise.all([list({}), getCats({})]);
      setRows(r.rows as unknown as P[]);
      setCats(c.rows || []);
      setSelected(new Set());
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    void load(); /* eslint-disable-next-line */
  }, []);

  async function onSave(p: Partial<P>, variants?: VariantItem[]) {
    const res = await save({
      data: {
        id: p.id,
        slug: p.slug!,
        name: p.name!,
        tagline: p.tagline ?? null,
        description: p.description ?? null,
        category: p.category ?? null,
        flora: p.flora || null,
        badge: p.badge || null,
        price: Number(p.price ?? 0),
        price_max: p.price_max ?? null,
        mrp: p.mrp ?? null,
        rating: Number(p.rating ?? 0),
        reviews_count: Number(p.reviews_count ?? 0),
        sizes: p.sizes ?? [],
        benefits: p.benefits ?? [],
        image_key: p.image_key || null,
        image_url: p.image_url || null,
        images: p.images ?? [],
        additional_images: p.additional_images ?? [],
        stock_quantity: Number(p.stock_quantity ?? 100),
        in_stock: !!p.in_stock,
        published: !!p.published,
        sort_order: Number(p.sort_order ?? 0),
        sku: p.sku || null,
        barcode: p.barcode || null,
        brand: p.brand || null,
        ingredients: p.ingredients || null,
        usage_instructions: p.usage_instructions || null,
        warnings: p.warnings || null,
        cost_price_paise: p.cost_price_paise ?? null,
        gst_percent: p.gst_percent ?? null,
        hsn_code: p.hsn_code || null,
        weight_g: p.weight_g ?? null,
        low_stock_limit: Number(p.low_stock_limit ?? 5),
        status: p.status ?? "published",
        is_featured: !!p.is_featured,
        is_bestseller: !!p.is_bestseller,
        is_new_arrival: !!p.is_new_arrival,
        show_on_homepage: !!p.show_on_homepage,
        video_url: p.video_url || null,
        meta_title: p.meta_title || null,
        meta_description: p.meta_description || null,
        meta_keywords: p.meta_keywords || null,
        canonical_url: p.canonical_url || null,
      } as never,
    });
    const savedId = res.id || p.id;
    if (savedId && variants && variants.length > 0) {
      try {
        await saveV({ data: { product_id: savedId, variants } });
      } catch (err) {
        console.error("Failed to save variants during product save:", err);
      }
    }
    toast.success("Saved");
    setEdit(null);
    await load();
  }

  async function bulkDelete() {
    if (!selected.size) return;
    if (!confirm(`Delete ${selected.size} product(s)?`)) return;
    try {
      for (const id of selected) await del({ data: { id } });
      toast.success(`Deleted ${selected.size}`);
      void load();
    } catch (e) {
      toast.error((e as Error).message);
    }
  }
  async function bulkPublish(publish: boolean) {
    if (!selected.size) return;
    try {
      for (const id of selected) {
        const r = rows.find((x) => x.id === id);
        if (r)
          await save({
            data: {
              ...r,
              id,
              published: publish,
              status: publish ? "published" : "draft",
            } as never,
          });
      }
      toast.success("Updated");
      void load();
    } catch (e) {
      toast.error((e as Error).message);
    }
  }

  async function duplicate(p: P) {
    try {
      await save({
        data: {
          ...p,
          id: undefined,
          slug: `${p.slug}-copy`,
          name: `${p.name} (Copy)`,
          published: false,
          status: "draft",
        } as never,
      });
      toast.success("Duplicated");
      void load();
    } catch (e) {
      toast.error((e as Error).message);
    }
  }

  if (edit)
    return (
      <ProductForm
        initial={edit}
        onCancel={() => setEdit(null)}
        onSave={async (p, variants) => {
          try {
            await onSave(p, variants);
          } catch (e) {
            toast.error((e as Error).message);
          }
        }}
      />
    );


  let filtered = rows;
  if (q.trim()) {
    const ql = q.toLowerCase();
    filtered = filtered.filter((r) =>
      [r.name, r.slug, r.sku, r.category].join(" ").toLowerCase().includes(ql),
    );
  }
  if (filterCategory !== "all") {
    filtered = filtered.filter((r) => r.category === filterCategory);
  }
  if (filterStatus !== "all") {
    filtered = filtered.filter((r) => r.status === filterStatus);
  }

  const cols = ["name", "slug", "sku", "category", "price", "stock_quantity", "status"];

  return (
    <div>
      <PageHeader
        title="Products"
        subtitle={`${rows.length} in catalogue`}
        actions={
          <>
            <BtnGhost
              onClick={() =>
                csvDownload(
                  rows as unknown as Record<string, unknown>[],
                  cols,
                  `products-${new Date().toISOString().slice(0, 10)}.csv`,
                )
              }
            >
              <Download className="size-3.5" /> CSV
            </BtnGhost>
            <BtnGhost onClick={load}>
              <RefreshCcw className="size-3.5" /> REFRESH
            </BtnGhost>
            <BtnPrimary onClick={() => setEdit(EMPTY)}>
              <Plus className="size-3.5" /> NEW PRODUCT
            </BtnPrimary>
          </>
        }
      />
      <div className="flex flex-col sm:flex-row gap-3 mb-6 items-start sm:items-center">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search products..."
          className="flex-1 w-full sm:max-w-xs border border-border rounded-xl px-4 py-2.5 text-sm bg-white shadow-sm focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all"
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="border border-border rounded-xl px-4 py-2.5 text-sm bg-white shadow-sm focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all cursor-pointer w-full sm:w-auto"
        >
          <option value="all">All Categories</option>
          {cats.map((c) => (
            <option key={c.id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border border-border rounded-xl px-4 py-2.5 text-sm bg-white shadow-sm focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all cursor-pointer w-full sm:w-auto"
        >
          <option value="all">All Statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      {selected.size > 0 && (
        <Card className="p-3 mb-6 flex flex-wrap gap-4 items-center bg-cream-deep border-brand-orange/30 shadow-sm rounded-xl">
          <span className="text-sm font-bold text-forest-dark pl-2">{selected.size} selected</span>
          <div className="flex items-center gap-2">
            <BtnGhost onClick={() => bulkPublish(true)} className="bg-white hover:bg-cream border border-border">
              PUBLISH
            </BtnGhost>
            <BtnGhost onClick={() => bulkPublish(false)} className="bg-white hover:bg-cream border border-border">
              DRAFT
            </BtnGhost>
            <BtnGhost
              onClick={bulkDelete}
              className="bg-white border border-destructive/20 text-destructive hover:bg-destructive hover:text-white transition-colors"
            >
              DELETE
            </BtnGhost>
          </div>
        </Card>
      )}
      <TableWrap>
        <thead>
          <tr>
            <Th>
              <input
                type="checkbox"
                checked={selected.size === filtered.length && filtered.length > 0}
                onChange={(e) =>
                  setSelected(e.target.checked ? new Set(filtered.map((r) => r.id)) : new Set())
                }
              />
            </Th>
            {["PRODUCT", "CATEGORY", "PRICE", "STOCK", "STATUS", "ACTIONS"].map((h) => (
              <Th key={h}>{h}</Th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {loading && (
            <tr>
              <Td className="text-center py-12 text-muted-foreground">Loading…</Td>
            </tr>
          )}
          {!loading && filtered.length === 0 && (
            <tr>
              <Td className="text-center py-12 text-muted-foreground">No products.</Td>
            </tr>
          )}
          {!loading &&
            filtered.map((r) => (
              <tr key={r.id} className="hover:bg-cream/40">
                <Td>
                  <input
                    type="checkbox"
                    checked={selected.has(r.id)}
                    onChange={(e) => {
                      const s = new Set(selected);
                      e.target.checked ? s.add(r.id) : s.delete(r.id);
                      setSelected(s);
                    }}
                  />
                </Td>
                <Td>
                  <div className="flex items-center gap-3">
                    {r.image_url ? (
                      <div className="size-10 rounded-lg overflow-hidden border border-border/50 shrink-0 bg-cream">
                        <img src={r.image_url} alt={r.name} className="w-full h-full object-cover" loading="lazy" />
                      </div>
                    ) : (
                      <div className="size-10 rounded-lg border border-border/50 shrink-0 bg-cream flex items-center justify-center text-muted-foreground">
                        <ImageOff className="size-4" />
                      </div>
                    )}
                    <div>
                      <div className="font-bold text-forest-dark text-[15px]">{r.name}</div>
                      <div className="text-xs text-muted-foreground font-mono mt-0.5">
                        {r.sku ? `${r.sku} • ${r.slug}` : r.slug}
                      </div>
                    </div>
                  </div>
                </Td>
                <Td className="text-xs">{r.category ?? "—"}</Td>
                <Td className="text-xs">
                  ₹{r.price}
                  {r.price_max ? `–₹${r.price_max}` : ""}
                </Td>
                <Td
                  className={`text-xs ${r.stock_quantity <= r.low_stock_limit ? "text-destructive font-bold" : ""}`}
                >
                  {r.stock_quantity}
                </Td>
                <Td>
                  <StatusPill s={r.status} />
                </Td>
                <Td className="text-right whitespace-nowrap">
                  <button
                    onClick={() => setEdit(r)}
                    className="text-gold-deep hover:underline text-xs font-bold mr-3"
                  >
                    <Pencil className="size-3.5 inline" />
                  </button>
                  <button
                    onClick={() => duplicate(r)}
                    className="text-forest-dark hover:underline text-xs font-bold mr-3"
                  >
                    <Copy className="size-3.5 inline" />
                  </button>
                  <button
                    onClick={async () => {
                      if (!confirm("Delete?")) return;
                      try {
                        await del({ data: { id: r.id } });
                        toast.success("Deleted");
                        void load();
                      } catch (e) {
                        toast.error((e as Error).message);
                      }
                    }}
                    className="text-destructive hover:underline text-xs font-bold"
                  >
                    <Trash2 className="size-3.5 inline" />
                  </button>
                </Td>
              </tr>
            ))}
        </tbody>
      </TableWrap>
    </div>
  );
}

function ProductForm({
  initial,
  onCancel,
  onSave,
}: {
  initial: Partial<P>;
  onCancel: () => void;
  onSave: (p: Partial<P>, variants?: VariantItem[]) => Promise<void>;
}) {
  const [f, setF] = useState<Partial<P>>({ ...initial });
  const [pendingVariants, setPendingVariants] = useState<VariantItem[]>([]);
  const [busy, setBusy] = useState(false);
  const [tab, setTab] = useState<"general" | "pricing" | "media" | "seo" | "details">("general");
  const tabs = [
    ["general", "General"],
    ["pricing", "Pricing & Stock"],
    ["media", "Media"],
    ["details", "Details"],
    ["seo", "SEO"],
  ] as const;
  const listCats = useServerFn(listCategories);
  const saveCat = useServerFn(upsertCategory);
  const [cats, setCats] = useState<{ name: string; slug: string }[]>([]);
  const [isNewCat, setIsNewCat] = useState(false);
  useEffect(() => {
    void listCats({}).then((r) => {
      if (r.rows) {
        setCats(
          (r.rows as any[])
            .filter(x => x.slug !== "all-products")
            .map((x) => ({ name: x.name, slug: x.slug }))
        );
      }
    });
  }, []);

  const uploadImg = useServerFn(uploadProductImage);
  const [uploadingMedia, setUploadingMedia] = useState(false);
  const galleryRef = useRef<HTMLInputElement>(null);
  const addRef0 = useRef<HTMLInputElement>(null);
  const addRef1 = useRef<HTMLInputElement>(null);
  const addRef2 = useRef<HTMLInputElement>(null);

  async function handleMediaUpload(file: File, mode: "gallery" | number, replaceIdx?: number) {
    setUploadingMedia(true);
    try {
      const b64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result).split(",")[1]);
        reader.onerror = () => reject(new Error("Could not read file"));
        reader.readAsDataURL(file);
      });
      const res = await uploadImg({ data: { filename: file.name, contentType: file.type, base64: b64 } });
      if (res && res.url) {
        if (mode === "gallery") {
          const cur = [...(f.images ?? [])];
          if (typeof replaceIdx === "number") {
            cur[replaceIdx] = res.url;
          } else if (cur.length < 9) {
            cur.push(res.url);
          }
          setF((prev) => ({
            ...prev,
            images: cur,
            image_url: cur[0] ?? prev.image_url,
          }));
        } else {
          const cur = [...(f.additional_images ?? [])];
          cur[mode as number] = res.url;
          setF((prev) => ({ ...prev, additional_images: cur }));
        }
        toast.success("Image uploaded");
      }
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setUploadingMedia(false);
    }
  }

  return (
    <div>
      <button
        onClick={onCancel}
        className="inline-flex items-center gap-1 text-xs font-bold text-forest-dark mb-4"
      >
        <ArrowLeft className="size-4" /> BACK
      </button>
      <Card className="p-6">
        <div className="flex flex-wrap justify-between items-start gap-3 mb-4">
          <h2 className="font-serif text-2xl text-forest-dark">
            {f.id ? "Edit product" : "New product"}
          </h2>
          <div className="inline-flex rounded-lg border border-border overflow-hidden">
            {tabs.map(([k, l]) => (
              <button
                key={k}
                onClick={() => setTab(k)}
                className={`px-3 py-2 text-[11px] font-bold tracking-widest ${tab === k ? "bg-forest-dark text-cream" : "bg-white text-forest-dark hover:bg-cream"}`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {tab === "general" && (
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <Field label="Slug *">
              <input
                value={f.slug ?? ""}
                onChange={(e) => setF({ ...f, slug: e.target.value })}
                className={inp}
              />
            </Field>
            <Field label="Name *">
              <input
                value={f.name ?? ""}
                onChange={(e) => setF({ ...f, name: e.target.value })}
                className={inp}
              />
            </Field>
            <Field label="Brand">
              <input
                value={f.brand ?? ""}
                onChange={(e) => setF({ ...f, brand: e.target.value })}
                className={inp}
              />
            </Field>
            <Field label="Category">
              <div className="space-y-1.5">
                {(() => {
                  const matchedCat = cats.find(
                    (c) =>
                      c.name.toLowerCase().trim() === (f.category ?? "").toLowerCase().trim() ||
                      c.slug.toLowerCase().trim() === (f.category ?? "").toLowerCase().trim(),
                  );
                  return (
                    <>
                      <select
                        value={
                          isNewCat ? "__NEW__" : matchedCat ? matchedCat.name : (f.category ?? "")
                        }
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === "__NEW__") {
                            setIsNewCat(true);
                            setF({ ...f, category: "" });
                          } else {
                            setIsNewCat(false);
                            setF({ ...f, category: val });
                          }
                        }}
                        className={inp}
                      >
                        <option value="">— Select Category —</option>
                        {cats.map((c) => (
                          <option key={c.slug} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                        {f.category && !matchedCat && (
                          <option value={f.category}>{f.category}</option>
                        )}
                        <option value="__NEW__">+ Create new category...</option>
                      </select>
                      {isNewCat && (
                        <input
                          value={f.category ?? ""}
                          onChange={(e) => setF({ ...f, category: e.target.value })}
                          placeholder="Type new category name (e.g. Single Flora Honey)..."
                          className={inp}
                        />
                      )}
                    </>
                  );
                })()}
              </div>
            </Field>
            <Field label="Flora / Type">
              <input
                value={f.flora ?? ""}
                onChange={(e) => setF({ ...f, flora: e.target.value })}
                className={inp}
              />
            </Field>
            <Field label="Badge">
              <input
                value={f.badge ?? ""}
                onChange={(e) => setF({ ...f, badge: e.target.value || null })}
                className={inp}
                placeholder="BESTSELLER / NEW / PREMIUM"
              />
            </Field>
            <div className="md:col-span-2 border border-border/80 rounded-xl p-4 bg-cream/30 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-espresso uppercase tracking-wider">
                    Dynamic Category Filter Attributes
                  </h4>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    Define attribute groups (e.g., &ldquo;Product Type&rdquo;, &ldquo;Skin Type&rdquo;, &ldquo;Candle Type&rdquo;) and values (e.g., &ldquo;Lip Care&rdquo;) to power faceted filtering on the Shop page.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const curr = { ...(f.attributes || {}) };
                    let idx = 1;
                    while (`Attribute ${idx}` in curr) idx++;
                    curr[`Attribute ${idx}`] = "";
                    setF({ ...f, attributes: curr });
                  }}
                  className="px-2.5 py-1.5 text-xs font-bold bg-espresso text-cream rounded-lg hover:bg-burnt-orange transition-colors shrink-0"
                >
                  + Add Attribute
                </button>
              </div>
              {Object.entries(f.attributes || {}).length === 0 ? (
                <p className="text-xs text-muted-foreground italic">No custom attributes defined yet.</p>
              ) : (
                <div className="space-y-2">
                  {Object.entries(f.attributes || {}).map(([key, val], idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Attribute group (e.g., Product Type)"
                        value={key}
                        onChange={(e) => {
                          const entries = Object.entries(f.attributes || {});
                          entries[idx] = [e.target.value, val];
                          setF({ ...f, attributes: Object.fromEntries(entries) });
                        }}
                        className={`${inp} text-xs w-1/2`}
                      />
                      <input
                        type="text"
                        placeholder="Value (e.g., Lip Care)"
                        value={Array.isArray(val) ? val.join(", ") : val}
                        onChange={(e) => {
                          const entries = Object.entries(f.attributes || {});
                          entries[idx] = [key, e.target.value];
                          setF({ ...f, attributes: Object.fromEntries(entries) });
                        }}
                        className={`${inp} text-xs w-1/2`}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const entries = Object.entries(f.attributes || {}).filter((_, i) => i !== idx);
                          setF({ ...f, attributes: Object.fromEntries(entries) });
                        }}
                        className="p-2 text-muted-foreground hover:text-red-600"
                        title="Remove attribute"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="md:col-span-2">
              <Field label="Tagline">
                <input
                  value={f.tagline ?? ""}
                  onChange={(e) => setF({ ...f, tagline: e.target.value })}
                  className={inp}
                />
              </Field>
            </div>
            <div className="md:col-span-2">
              <Field label="Short description">
                <textarea
                  rows={4}
                  value={f.description ?? ""}
                  onChange={(e) => setF({ ...f, description: e.target.value })}
                  className={inp}
                />
              </Field>
            </div>
            <Field label="Status">
              <select
                value={f.status ?? "published"}
                onChange={(e) =>
                  setF({
                    ...f,
                    status: e.target.value as never,
                    published: e.target.value === "published",
                  })
                }
                className={inp}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </Field>
            <Field label="Sort order">
              <input
                type="number"
                value={f.sort_order ?? 0}
                onChange={(e) => setF({ ...f, sort_order: Number(e.target.value) })}
                className={inp}
              />
            </Field>
            <label className="flex items-center gap-2 text-xs">
              <input
                type="checkbox"
                checked={!!f.is_featured}
                onChange={(e) => setF({ ...f, is_featured: e.target.checked })}
              />{" "}
              Featured
            </label>
            <label className="flex items-center gap-2 text-xs">
              <input
                type="checkbox"
                checked={!!f.is_bestseller}
                onChange={(e) => setF({ ...f, is_bestseller: e.target.checked })}
              />{" "}
              Best seller
            </label>
            <label className="flex items-center gap-2 text-xs">
              <input
                type="checkbox"
                checked={!!f.is_new_arrival}
                onChange={(e) => setF({ ...f, is_new_arrival: e.target.checked })}
              />{" "}
              New arrival
            </label>
            <label className="flex items-center gap-2 text-xs">
              <input
                type="checkbox"
                checked={!!f.show_on_homepage}
                onChange={(e) => setF({ ...f, show_on_homepage: e.target.checked })}
              />{" "}
              Show on Homepage (Our Finest Picks)
            </label>
          </div>
        )}

        {tab === "pricing" && (
          <div className="space-y-6">
            <VariantsEditor
              productId={f.id}
              productSlug={f.slug}
              initialSizes={f.sizes}
              productPrice={f.price}
              productMrp={f.mrp}
              productStock={f.stock_quantity}
              productSku={f.sku}
              productWeight={f.weight_g}
              onVariantsChange={(variants) => {
                setPendingVariants(variants);
                const defaultVar = variants.find((v) => v.is_default) || variants[0];
                if (defaultVar) {
                  const activeLabels = variants.filter((v) => v.is_active).map((v) => v.label);
                  const totalStock = variants
                    .filter((v) => v.is_active)
                    .reduce((sum, v) => sum + (v.stock_quantity || 0), 0);
                  setF((prev) => ({
                    ...prev,
                    price: defaultVar.price,
                    mrp: defaultVar.mrp,
                    stock_quantity: totalStock,
                    sku: defaultVar.sku || prev.sku,
                    weight_g: defaultVar.weight_g || prev.weight_g,
                    sizes: activeLabels,
                    in_stock: totalStock > 0,
                  }));
                }
              }}
            />

            <div className="border-t border-border pt-4">
              <h3 className="font-serif text-sm font-bold text-forest-dark mb-3">
                Product-Level Tax & Reference Fields
              </h3>
              <div className="grid md:grid-cols-3 gap-3 text-sm">
                <Field label="GST %">
                  <input
                    type="number"
                    step="0.5"
                    value={f.gst_percent ?? ""}
                    onChange={(e) =>
                      setF({ ...f, gst_percent: e.target.value ? Number(e.target.value) : null })
                    }
                    className={inp}
                  />
                </Field>
                <Field label="HSN code">
                  <input
                    value={f.hsn_code ?? ""}
                    onChange={(e) => setF({ ...f, hsn_code: e.target.value })}
                    className={inp}
                  />
                </Field>
                <Field label="Brand">
                  <input
                    value={f.brand ?? ""}
                    onChange={(e) => setF({ ...f, brand: e.target.value })}
                    className={inp}
                  />
                </Field>
              </div>
            </div>
          </div>
        )}

        {tab === "media" && (
          <div className="space-y-8 text-sm">
            {/* A. PRODUCT GALLERY IMAGES */}
            <div className="p-5 rounded-2xl bg-cream/40 border border-border/80 space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h3 className="font-serif text-lg font-bold text-espresso">Product Gallery Images</h3>
                  <p className="text-xs text-muted-foreground">
                    Upload up to 9 images. Recommended size: 1080 × 1080 px.
                  </p>
                </div>
                <div>
                  <input
                    ref={galleryRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) void handleMediaUpload(file, "gallery");
                      e.target.value = "";
                    }}
                  />
                  <BtnGhost
                    type="button"
                    disabled={uploadingMedia || (f.images ?? []).length >= 9}
                    onClick={() => galleryRef.current?.click()}
                    className="border-burnt-orange text-burnt-orange hover:bg-burnt-orange/10 font-bold text-xs"
                  >
                    <Upload className="size-3.5" />
                    {uploadingMedia ? "UPLOADING…" : "UPLOAD GALLERY IMAGE"}
                  </BtnGhost>
                </div>
              </div>

              {(f.images ?? []).length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {(f.images ?? []).map((u, i) => (
                    <div
                      key={i}
                      className={`relative group rounded-2xl border p-2 bg-white flex flex-col justify-between ${
                        i === 0 ? "border-2 border-burnt-orange shadow-md" : "border-border/80"
                      }`}
                    >
                      <div className="relative aspect-square rounded-xl overflow-hidden bg-cream-deep/30 mb-2">
                        <img src={u} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" />
                        {i === 0 && (
                          <span className="absolute top-2 left-2 bg-burnt-orange text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                            PRIMARY (MAIN)
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => {
                            const cur = [...(f.images ?? [])];
                            cur.splice(i, 1);
                            setF({ ...f, images: cur, image_url: cur[0] ?? null });
                          }}
                          className="absolute top-2 right-2 bg-destructive text-white rounded-full size-6 flex items-center justify-center text-xs shadow hover:scale-105 transition-transform"
                        >
                          ×
                        </button>
                      </div>

                      <div className="flex items-center justify-between gap-1 text-[11px]">
                        {i !== 0 ? (
                          <button
                            type="button"
                            onClick={() => {
                              const cur = [...(f.images ?? [])];
                              const [moved] = cur.splice(i, 1);
                              cur.unshift(moved);
                              setF({ ...f, images: cur, image_url: cur[0] ?? null });
                            }}
                            className="px-2 py-1 rounded bg-cream text-espresso font-semibold hover:bg-burnt-orange/20 hover:text-burnt-orange transition-colors"
                          >
                            MAKE PRIMARY
                          </button>
                        ) : (
                          <span className="text-xs font-bold text-burnt-orange">Main storefront image</span>
                        )}

                        <div className="flex items-center gap-1">
                          {i > 0 && (
                            <button
                              type="button"
                              onClick={() => {
                                const cur = [...(f.images ?? [])];
                                const tmp = cur[i - 1];
                                cur[i - 1] = cur[i];
                                cur[i] = tmp;
                                setF({ ...f, images: cur, image_url: cur[0] ?? null });
                              }}
                              className="size-6 rounded bg-cream hover:bg-cream-deep flex items-center justify-center text-espresso"
                              title="Move left/up"
                            >
                              ←
                            </button>
                          )}
                          {i < (f.images ?? []).length - 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                const cur = [...(f.images ?? [])];
                                const tmp = cur[i + 1];
                                cur[i + 1] = cur[i];
                                cur[i] = tmp;
                                setF({ ...f, images: cur, image_url: cur[0] ?? null });
                              }}
                              className="size-6 rounded bg-cream hover:bg-cream-deep flex items-center justify-center text-espresso"
                              title="Move right/down"
                            >
                              →
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 px-4 rounded-xl border-2 border-dashed border-border/80 text-center text-muted-foreground">
                  <p className="text-sm">No gallery images uploaded yet.</p>
                  <p className="text-xs mt-1">First image will automatically be selected as the Primary product image.</p>
                </div>
              )}

              <Field label="Or paste Gallery URLs (one per line)">
                <textarea
                  rows={4}
                  value={(f.images ?? []).join("\n")}
                  onChange={(e) => {
                    const lines = e.target.value
                      .split("\n")
                      .map((s) => s.trim())
                      .filter(Boolean)
                      .slice(0, 9);
                    setF({ ...f, images: lines, image_url: lines[0] ?? null });
                  }}
                  className={`${inp} font-mono text-xs`}
                  placeholder="Paste up to 9 image URLs, one per line"
                />
              </Field>
            </div>

            {/* B. ADDITIONAL PRODUCT IMAGES */}
            <div className="p-5 rounded-2xl bg-cream/40 border border-border/80 space-y-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-espresso">Additional Product Images</h3>
                <p className="text-xs text-muted-foreground">
                  Upload up to 8 images. Recommended size: 1080 × 1080 px.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {[0, 1, 2, 3, 4, 5, 6, 7].map((idx) => {
                  const url = (f.additional_images ?? [])[idx];
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl border border-border/80 p-3 bg-white flex flex-col justify-between space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-espresso">
                          Additional Image {idx + 1}
                        </span>
                        {url && (
                          <button
                            type="button"
                            onClick={() => {
                              const cur = [...(f.additional_images ?? [])];
                              cur[idx] = "";
                              setF({ ...f, additional_images: cur });
                            }}
                            className="text-destructive text-xs hover:underline font-semibold"
                          >
                            Remove
                          </button>
                        )}
                      </div>

                      <div className="aspect-square rounded-xl overflow-hidden bg-cream-deep/30 border border-border/40 grid place-items-center relative">
                        {url ? (
                          <img src={url} alt={`Additional ${idx + 1}`} className="w-full h-full object-cover" />
                        ) : (
                          <div className="text-center text-muted-foreground/60 p-4">
                            <ImageOff className="size-6 mx-auto mb-1 opacity-40" />
                            <span className="text-xs block">1080 × 1080 px</span>
                          </div>
                        )}
                      </div>

                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) void handleMediaUpload(file, idx);
                            e.target.value = "";
                          }}
                        />
                        <div className="flex gap-2">
                          <BtnGhost
                            type="button"
                            disabled={uploadingMedia}
                            onClick={(e) => {
                              const input = e.currentTarget.parentElement?.parentElement?.querySelector("input[type='file']") as HTMLInputElement;
                              if (input) input.click();
                            }}
                            className="flex-1 border-border text-espresso font-semibold text-xs py-2 px-1"
                          >
                            <Upload className="size-3.5" />
                            {url ? "REPLACE" : "UPLOAD"}
                          </BtnGhost>
                        </div>
                        <input
                          value={url ?? ""}
                          onChange={(e) => {
                            const cur = [...(f.additional_images ?? [])];
                            cur[idx] = e.target.value;
                            setF({ ...f, additional_images: cur });
                          }}
                          className={`${inp} mt-2 text-[10px] font-mono`}
                          placeholder="Or paste URL…"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* PRODUCT VIDEO URL */}
            <div className="p-5 rounded-2xl bg-cream/40 border border-border/80">
              <Field label="Product video URL">
                <input
                  value={f.video_url ?? ""}
                  onChange={(e) => setF({ ...f, video_url: e.target.value || null })}
                  className={inp}
                  placeholder="https://youtube.com/embed/… or MP4 URL"
                />
              </Field>
            </div>
          </div>
        )}

        {tab === "details" && (
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <div className="md:col-span-2">
              <Field label="Benefits (separate with |)">
                <input
                  value={(f.benefits ?? []).join(" | ")}
                  onChange={(e) =>
                    setF({
                      ...f,
                      benefits: e.target.value
                        .split("|")
                        .map((s) => s.trim())
                        .filter(Boolean),
                    })
                  }
                  className={inp}
                />
              </Field>
            </div>
            <div className="md:col-span-2">
              <Field label="Ingredients">
                <textarea
                  rows={4}
                  value={f.ingredients ?? ""}
                  onChange={(e) => setF({ ...f, ingredients: e.target.value })}
                  className={inp}
                />
              </Field>
            </div>
            <div className="md:col-span-2">
              <Field label="Usage / directions">
                <textarea
                  rows={4}
                  value={f.usage_instructions ?? ""}
                  onChange={(e) => setF({ ...f, usage_instructions: e.target.value })}
                  className={inp}
                />
              </Field>
            </div>
            <div className="md:col-span-2">
              <Field label="Warnings / disclaimers">
                <textarea
                  rows={3}
                  value={f.warnings ?? ""}
                  onChange={(e) => setF({ ...f, warnings: e.target.value })}
                  className={inp}
                />
              </Field>
            </div>
            <Field label="Rating (0–5)">
              <input
                type="number"
                step="0.1"
                value={(f.rating as number) ?? 0}
                onChange={(e) => setF({ ...f, rating: Number(e.target.value) })}
                className={inp}
              />
            </Field>
            <Field label="Reviews count">
              <input
                type="number"
                value={f.reviews_count ?? 0}
                onChange={(e) => setF({ ...f, reviews_count: Number(e.target.value) })}
                className={inp}
              />
            </Field>
          </div>
        )}

        {tab === "seo" && (
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <Field label="Meta title">
              <input
                value={f.meta_title ?? ""}
                onChange={(e) => setF({ ...f, meta_title: e.target.value })}
                className={inp}
              />
            </Field>
            <Field label="Canonical URL">
              <input
                value={f.canonical_url ?? ""}
                onChange={(e) => setF({ ...f, canonical_url: e.target.value })}
                className={inp}
              />
            </Field>
            <div className="md:col-span-2">
              <Field label="Meta description">
                <textarea
                  rows={3}
                  value={f.meta_description ?? ""}
                  onChange={(e) => setF({ ...f, meta_description: e.target.value })}
                  className={inp}
                />
              </Field>
            </div>
            <div className="md:col-span-2">
              <Field label="Meta keywords">
                <input
                  value={f.meta_keywords ?? ""}
                  onChange={(e) => setF({ ...f, meta_keywords: e.target.value })}
                  className={inp}
                  placeholder="comma, separated, keywords"
                />
              </Field>
            </div>
          </div>
        )}

        <div className="mt-6 flex gap-3">
          <BtnPrimary
            disabled={busy}
            onClick={async () => {
              setBusy(true);
              try {
                if (f.category && !cats.some((c) => c.name === f.category)) {
                  try {
                    const newSlug = f.category.toLowerCase().replace(/[^\w-]+/g, "-");
                    await saveCat({
                      data: {
                        slug: newSlug,
                        name: f.category,
                        active: true,
                        sort_order: cats.length + 1,
                      },
                    });
                  } catch {
                    /* ignore if already exists */
                  }
                }
                await onSave(f, pendingVariants);
              } finally {
                setBusy(false);
              }
            }}
          >
            {busy ? "SAVING…" : "SAVE"}
          </BtnPrimary>
          <BtnGhost onClick={onCancel}>CANCEL</BtnGhost>
        </div>
      </Card>
    </div>
  );
}

function buildFallbackVariants(
  slug?: string,
  productId?: string,
  sizes?: string[],
  defaultPrice?: number,
  defaultMrp?: number | null,
  defaultStock?: number,
  defaultSku?: string | null,
  defaultWeight?: number | null,
): VariantItem[] {
  const pid = productId || "";
  if (slug === "ajwain-honey" || slug === "prod-ajwain") {
    return [
      {
        product_id: pid,
        label: "250g",
        weight_g: 250,
        price: 349,
        mrp: 399,
        cost_price: 200,
        stock_quantity: 100,
        low_stock_threshold: 5,
        sku: "SH-AJW-250",
        barcode: "",
        is_default: true,
        is_active: true,
        sort_order: 0,
      },
      {
        product_id: pid,
        label: "500g",
        weight_g: 500,
        price: 649,
        mrp: 749,
        cost_price: 400,
        stock_quantity: 75,
        low_stock_threshold: 5,
        sku: "SH-AJW-500",
        barcode: "",
        is_default: false,
        is_active: true,
        sort_order: 1,
      },
      {
        product_id: pid,
        label: "1kg",
        weight_g: 1000,
        price: 1199,
        mrp: 1399,
        cost_price: 750,
        stock_quantity: 40,
        low_stock_threshold: 5,
        sku: "SH-AJW-1000",
        barcode: "",
        is_default: false,
        is_active: true,
        sort_order: 2,
      },
    ];
  }
  if (slug === "fennel-honey" || slug === "prod-fennel") {
    return [
      {
        product_id: pid,
        label: "250g",
        weight_g: 250,
        price: 349,
        mrp: 399,
        cost_price: 200,
        stock_quantity: 80,
        low_stock_threshold: 5,
        sku: "SH-FEN-250",
        barcode: "",
        is_default: true,
        is_active: true,
        sort_order: 0,
      },
      {
        product_id: pid,
        label: "500g",
        weight_g: 500,
        price: 649,
        mrp: 749,
        cost_price: 400,
        stock_quantity: 60,
        low_stock_threshold: 5,
        sku: "SH-FEN-500",
        barcode: "",
        is_default: false,
        is_active: true,
        sort_order: 1,
      },
      {
        product_id: pid,
        label: "1kg",
        weight_g: 1000,
        price: 1199,
        mrp: 1399,
        cost_price: 750,
        stock_quantity: 30,
        low_stock_threshold: 5,
        sku: "SH-FEN-1000",
        barcode: "",
        is_default: false,
        is_active: true,
        sort_order: 2,
      },
    ];
  }
  if (slug === "lychee-honey" || slug === "prod-lychee") {
    return [
      {
        product_id: pid,
        label: "250g",
        weight_g: 250,
        price: 399,
        mrp: 449,
        cost_price: 220,
        stock_quantity: 90,
        low_stock_threshold: 5,
        sku: "SH-LYC-250",
        barcode: "",
        is_default: true,
        is_active: true,
        sort_order: 0,
      },
      {
        product_id: pid,
        label: "500g",
        weight_g: 500,
        price: 749,
        mrp: 849,
        cost_price: 450,
        stock_quantity: 50,
        low_stock_threshold: 5,
        sku: "SH-LYC-500",
        barcode: "",
        is_default: false,
        is_active: true,
        sort_order: 1,
      },
      {
        product_id: pid,
        label: "1kg",
        weight_g: 1000,
        price: 1399,
        mrp: 1599,
        cost_price: 850,
        stock_quantity: 25,
        low_stock_threshold: 5,
        sku: "SH-LYC-1000",
        barcode: "",
        is_default: false,
        is_active: true,
        sort_order: 2,
      },
    ];
  }
  if (slug === "multiflora-honey" || slug === "prod-multiflora") {
    return [
      {
        product_id: pid,
        label: "250g",
        weight_g: 250,
        price: 299,
        mrp: 349,
        cost_price: 180,
        stock_quantity: 120,
        low_stock_threshold: 5,
        sku: "SH-MUL-250",
        barcode: "",
        is_default: true,
        is_active: true,
        sort_order: 0,
      },
      {
        product_id: pid,
        label: "500g",
        weight_g: 500,
        price: 549,
        mrp: 649,
        cost_price: 350,
        stock_quantity: 80,
        low_stock_threshold: 5,
        sku: "SH-MUL-500",
        barcode: "",
        is_default: false,
        is_active: true,
        sort_order: 1,
      },
      {
        product_id: pid,
        label: "1kg",
        weight_g: 1000,
        price: 999,
        mrp: 1199,
        cost_price: 650,
        stock_quantity: 45,
        low_stock_threshold: 5,
        sku: "SH-MUL-1000",
        barcode: "",
        is_default: false,
        is_active: true,
        sort_order: 2,
      },
    ];
  }
  if (sizes && sizes.length > 0) {
    return sizes.map((sz, i) => ({
      product_id: pid,
      label: sz,
      weight_g: defaultWeight || null,
      price: defaultPrice || 0,
      mrp: defaultMrp || null,
      cost_price: null,
      stock_quantity: defaultStock || 100,
      low_stock_threshold: 5,
      sku: defaultSku ? (i === 0 ? defaultSku : `${defaultSku}-${sz}`) : "",
      barcode: "",
      is_default: i === 0,
      is_active: true,
      sort_order: i,
    }));
  }
  return [
    {
      product_id: pid,
      label: "Default",
      weight_g: defaultWeight || null,
      price: defaultPrice || 0,
      mrp: defaultMrp || null,
      cost_price: null,
      stock_quantity: defaultStock || 100,
      low_stock_threshold: 5,
      sku: defaultSku || "",
      barcode: "",
      is_default: true,
      is_active: true,
      sort_order: 0,
    },
  ];
}

function VariantsEditor({
  productId,
  productSlug,
  initialSizes,
  productPrice,
  productMrp,
  productStock,
  productSku,
  productWeight,
  onVariantsChange,
}: {
  productId?: string;
  productSlug?: string;
  initialSizes?: string[];
  productPrice?: number;
  productMrp?: number | null;
  productStock?: number;
  productSku?: string | null;
  productWeight?: number | null;
  onVariantsChange: (variants: VariantItem[]) => void;
}) {
  const [variants, setVariants] = useState<VariantItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const listV = useServerFn(listProductVariants);
  const saveV = useServerFn(saveProductVariants);

  useEffect(() => {
    const defaultList = buildFallbackVariants(
      productSlug,
      productId,
      initialSizes,
      productPrice,
      productMrp,
      productStock,
      productSku,
      productWeight,
    );
    if (!productId) {
      setVariants(defaultList);
      onVariantsChange(defaultList);
      return;
    }
    setLoading(true);
    listV({ data: { product_id: productId } })
      .then((res) => {
        if (res && res.rows && res.rows.length > 0) {
          setVariants(res.rows);
          onVariantsChange(res.rows);
        } else {
          setVariants(defaultList);
          onVariantsChange(defaultList);
        }
      })
      .catch((err) => {
        console.error("Failed to load variants:", err);
        setVariants(defaultList);
        onVariantsChange(defaultList);
      })
      .finally(() => setLoading(false));
  }, [productId]);

  function updateVariant(idx: number, patch: Partial<VariantItem>) {
    const next = variants.map((v, i) => (i === idx ? { ...v, ...patch } : v));
    setVariants(next);
    onVariantsChange(next);
  }

  function handleSetDefault(idx: number) {
    const next = variants.map((v, i) => ({ ...v, is_default: i === idx }));
    setVariants(next);
    onVariantsChange(next);
  }

  function handleAddVariant() {
    const newVariant: VariantItem = {
      product_id: productId || "",
      label: "",
      weight_g: null,
      price: productPrice || 0,
      mrp: productMrp || null,
      cost_price: null,
      stock_quantity: 100,
      low_stock_threshold: 5,
      sku: "",
      barcode: "",
      is_default: variants.length === 0,
      is_active: true,
      sort_order: variants.length,
    };
    const next = [...variants, newVariant];
    setVariants(next);
    onVariantsChange(next);
  }

  function handleDeleteVariant(idx: number) {
    if (variants.length <= 1) {
      toast.error("A product must have at least one variant.");
      return;
    }
    const next = variants.filter((_, i) => i !== idx);
    if (!next.some((v) => v.is_default) && next.length > 0) {
      next[0].is_default = true;
    }
    setVariants(next);
    onVariantsChange(next);
  }

  async function handleSaveVariants() {
    if (!productId) {
      toast.error("Please save the product first before saving variants independently.");
      return;
    }
    setSaving(true);
    try {
      const res = await saveV({ data: { product_id: productId, variants } });
      toast.success("Variants saved successfully!");
      if (res && res.variants) {
        setVariants(res.variants);
        onVariantsChange(res.variants);
      }
    } catch (e) {
      toast.error("Error saving variants: " + (e as Error).message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 bg-cream/50 p-4 rounded-xl border border-border">
        <div>
          <h3 className="font-serif text-lg font-bold text-forest-dark">PRODUCT VARIANTS</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage independent size, price, MRP, cost, stock, SKU, barcode, and weight for each
            option. Only ONE variant can be marked Default.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <BtnGhost
            type="button"
            onClick={handleAddVariant}
            className="bg-white hover:bg-cream border border-border"
          >
            <Plus className="size-3.5" /> ADD VARIANT
          </BtnGhost>
          {productId && (
            <BtnPrimary type="button" onClick={handleSaveVariants} disabled={saving || loading}>
              {saving ? "SAVING..." : "SAVE VARIANTS"}
            </BtnPrimary>
          )}
        </div>
      </div>

      {loading ? (
        <div className="py-8 text-center text-xs text-muted-foreground">Loading variants…</div>
      ) : (
        <div className="space-y-3">
          {variants.map((v, i) => (
            <div
              key={v.id || `var-${i}`}
              className="w-full border border-border rounded-xl p-4 bg-white shadow-sm space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold bg-cream px-2 py-0.5 rounded text-forest-dark">
                    #{i + 1}
                  </span>
                  <span className="font-serif font-bold text-sm text-forest-dark">
                    {v.label || "New Variant"}
                  </span>
                  {v.is_default && (
                    <span className="bg-forest text-cream text-[11px] font-bold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                      <Star className="size-3 fill-current" /> ★ Default
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  {!v.is_default && (
                    <button
                      type="button"
                      onClick={() => handleSetDefault(i)}
                      className="text-xs font-semibold px-2.5 py-1 rounded-full border border-border hover:border-gold-deep text-forest-dark transition-colors"
                    >
                      Set Default
                    </button>
                  )}
                  <label className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest-dark cursor-pointer">
                    <input
                      type="checkbox"
                      checked={v.is_active}
                      onChange={(e) => updateVariant(i, { is_active: e.target.checked })}
                      className="rounded border-border text-forest"
                    />
                    Active
                  </label>
                  <button
                    type="button"
                    onClick={() => handleDeleteVariant(i)}
                    className="text-destructive hover:bg-destructive/10 p-1.5 rounded-lg text-xs font-bold inline-flex items-center gap-1 transition-colors"
                    title="Delete Variant"
                  >
                    <Trash2 className="size-3.5" /> Delete
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <Field label="Size / Label *">
                  <input
                    type="text"
                    value={v.label}
                    onChange={(e) => updateVariant(i, { label: e.target.value })}
                    placeholder="e.g. 250g, 500g, 1kg"
                    className={inp}
                  />
                </Field>
                <Field label="Weight (g)">
                  <input
                    type="number"
                    value={v.weight_g ?? ""}
                    onChange={(e) =>
                      updateVariant(i, { weight_g: e.target.value ? Number(e.target.value) : null })
                    }
                    placeholder="e.g. 250"
                    className={inp}
                  />
                </Field>
                <Field label="Selling Price ₹ *">
                  <input
                    type="number"
                    value={v.price}
                    onChange={(e) => updateVariant(i, { price: Number(e.target.value) })}
                    className={inp}
                  />
                </Field>
                <Field label="MRP ₹">
                  <input
                    type="number"
                    value={v.mrp ?? ""}
                    onChange={(e) =>
                      updateVariant(i, { mrp: e.target.value ? Number(e.target.value) : null })
                    }
                    className={inp}
                  />
                </Field>
                <Field label="Cost Price ₹">
                  <input
                    type="number"
                    value={v.cost_price ?? ""}
                    onChange={(e) =>
                      updateVariant(i, {
                        cost_price: e.target.value ? Number(e.target.value) : null,
                      })
                    }
                    className={inp}
                  />
                </Field>
                <Field label="Stock Quantity *">
                  <input
                    type="number"
                    value={v.stock_quantity}
                    onChange={(e) => updateVariant(i, { stock_quantity: Number(e.target.value) })}
                    className={inp}
                  />
                </Field>
                <Field label="Low Stock Threshold">
                  <input
                    type="number"
                    value={v.low_stock_threshold}
                    onChange={(e) =>
                      updateVariant(i, { low_stock_threshold: Number(e.target.value) })
                    }
                    className={inp}
                  />
                </Field>
                <Field label="SKU">
                  <input
                    type="text"
                    value={v.sku ?? ""}
                    onChange={(e) => updateVariant(i, { sku: e.target.value || null })}
                    placeholder="e.g. SH-AJW-250"
                    className={inp}
                  />
                </Field>
                <Field label="Barcode">
                  <input
                    type="text"
                    value={v.barcode ?? ""}
                    onChange={(e) => updateVariant(i, { barcode: e.target.value || null })}
                    placeholder="EAN / UPC code"
                    className={inp}
                  />
                </Field>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="pt-2 flex justify-start">
        <BtnGhost
          type="button"
          onClick={handleAddVariant}
          className="bg-white hover:bg-cream border border-border"
        >
          <Plus className="size-3.5" /> ADD VARIANT
        </BtnGhost>
      </div>
    </div>
  );
}
