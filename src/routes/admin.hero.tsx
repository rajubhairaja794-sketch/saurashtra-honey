import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import React, { useEffect, useState, useMemo } from "react";
import { toast } from "sonner";
import { listAdminSlides, upsertSlide, deleteSlide } from "@/lib/admin-catalog.functions";
import { IMAGE_KEYS, resolveImage, FALLBACK_IMAGE } from "@/lib/product-images";
import { supabase } from "@/integrations/supabase/client";
import {
  BtnGhost,
  BtnPrimary,
  Card,
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
  Pencil,
  Plus,
  RefreshCcw,
  Trash2,
  Upload,
  Eye,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/admin/hero")({ component: HeroPage });

type Slide = {
  id: string;
  page: string;
  eyebrow: string | null;
  title: string;
  title_accent: string | null;
  subtitle: string | null;
  image_key: string | null;
  image_url: string | null;
  cta_label: string | null;
  cta_href: string;
  align: string;
  sort_order: number;
  active: boolean;
};

const EMPTY: Partial<Slide> = {
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
  active: true,
};

const PAGE_OPTIONS = [
  { value: "home", label: "Home Page (1920×700)" },
  { value: "shop", label: "Shop (1920×600)" },
  { value: "our-story", label: "Our Story (1920×600)" },
  { value: "bee-farming", label: "Bee Farming (1920×600)" },
  { value: "blog", label: "Journal (1920×600)" },
  { value: "bulk-orders", label: "Bulk & Gifting (1920×600)" },
  { value: "contact", label: "Contact (1920×600)" },
];

function HeroPage() {
  const list = useServerFn(listAdminSlides);
  const del = useServerFn(deleteSlide);
  const [rows, setRows] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState<Partial<Slide> | null>(null);
  const [filterPage, setFilterPage] = useState<string>("all");

  async function load() {
    setLoading(true);
    try {
      const r = await list({});
      setRows(r.rows as unknown as Slide[]);
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
    // eslint-disable-next-line
  }, []);

  const filteredRows = useMemo(() => {
    if (filterPage === "all") return rows;
    return rows.filter((r) => r.page.toLowerCase() === filterPage.toLowerCase());
  }, [rows, filterPage]);

  if (edit) {
    return (
      <Editor
        initial={edit}
        onCancel={() => setEdit(null)}
        onSaved={async () => {
          setEdit(null);
          await load();
        }}
      />
    );
  }

  return (
    <div>
      <PageHeader
        title="Banner / Hero Slider Management"
        subtitle={`${rows.length} total hero slides across website pages`}
        actions={
          <>
            <BtnGhost onClick={load}>
              <RefreshCcw className="size-3.5" /> REFRESH
            </BtnGhost>
            <BtnPrimary onClick={() => setEdit(EMPTY)}>
              <Plus className="size-3.5" /> NEW SLIDE
            </BtnPrimary>
          </>
        }
      />

      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="text-xs font-bold text-forest-dark">Filter Page:</span>
        <button
          onClick={() => setFilterPage("all")}
          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
            filterPage === "all"
              ? "bg-forest-dark text-cream"
              : "bg-cream text-forest-dark border border-border"
          }`}
        >
          All ({rows.length})
        </button>
        {PAGE_OPTIONS.map((opt) => {
          const count = rows.filter((r) => r.page.toLowerCase() === opt.value).length;
          return (
            <button
              key={opt.value}
              onClick={() => setFilterPage(opt.value)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
                filterPage === opt.value
                  ? "bg-forest-dark text-cream"
                  : "bg-cream text-forest-dark border border-border"
              }`}
            >
              {opt.value.toUpperCase()} ({count})
            </button>
          );
        })}
      </div>

      <TableWrap>
        <thead>
          <tr>
            {["Page", "Sort", "Preview", "Title", "CTA", "Status", ""].map((h) => (
              <Th key={h}>{h}</Th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {loading && (
            <tr>
              <td colSpan={7} className="px-4 py-12 text-center text-muted-foreground">
                Loading slides…
              </td>
            </tr>
          )}
          {!loading && filteredRows.length === 0 && (
            <tr>
              <td colSpan={7} className="px-4 py-12 text-center text-muted-foreground">
                No slides found for this view. Click "NEW SLIDE" to add custom banners.
              </td>
            </tr>
          )}
          {!loading &&
            filteredRows.map((r) => {
              const previewImg = resolveImage(
                r.image_key,
                r.image_url,
                FALLBACK_IMAGE
              );
              return (
                <tr key={r.id} className="hover:bg-cream/40">
                  <Td className="text-xs font-bold uppercase text-brand-orange">
                    {r.page}
                  </Td>
                  <Td className="text-xs text-muted-foreground font-mono">
                    {r.sort_order}
                  </Td>
                  <Td>
                    <div className="size-12 rounded-lg overflow-hidden border border-border bg-cream shrink-0">
                      <img
                        src={previewImg}
                        alt={r.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Td>
                  <Td className="font-medium text-forest-dark">
                    <div>
                      {r.eyebrow && (
                        <div className="text-[10px] tracking-wider uppercase text-brand-orange font-bold">
                          {r.eyebrow}
                        </div>
                      )}
                      <span>{r.title}</span>{" "}
                      {r.title_accent && (
                        <span className="italic text-brand-orange">
                          {r.title_accent}
                        </span>
                      )}
                    </div>
                  </Td>
                  <Td className="text-xs">
                    {r.cta_label} → <span className="font-mono">{r.cta_href}</span>
                  </Td>
                  <Td>
                    <StatusPill s={r.active ? "live" : "disabled"} />
                  </Td>
                  <Td className="text-right whitespace-nowrap">
                    <button
                      onClick={() => setEdit(r)}
                      className="text-brand-orange hover:underline text-xs font-bold mr-3"
                    >
                      <Pencil className="size-3.5 inline" /> EDIT
                    </button>
                    <button
                      onClick={async () => {
                        if (!confirm("Delete this hero slide?")) return;
                        try {
                          await del({ data: { id: r.id } });
                          toast.success("Deleted slide");
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
              );
            })}
        </tbody>
      </TableWrap>
    </div>
  );
}

function Editor({
  initial,
  onCancel,
  onSaved,
}: {
  initial: Partial<Slide>;
  onCancel: () => void;
  onSaved: () => Promise<void> | void;
}) {
  const [f, setF] = useState<Partial<Slide>>({ ...initial });
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const save = useServerFn(upsertSlide);

  async function onUploadImage(file: File) {
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file (JPG, PNG, WEBP)");
      return;
    }
    setUploading(true);
    try {
      const safeName = file.name.replace(/[^\w.-]+/g, "_");
      const path = `hero/${Date.now()}_${safeName}`;
      const { data, error } = await supabase.storage
        .from("media")
        .upload(path, file, {
          contentType: file.type,
          cacheControl: "3600",
          upsert: true,
        });
      if (error) throw new Error(error.message);
      const { data: pubData } = supabase.storage
        .from("media")
        .getPublicUrl(data.path);
      setF((prev) => ({
        ...prev,
        image_url: pubData.publicUrl,
        image_key: null,
      }));
      toast.success("Banner image uploaded to Supabase Storage");
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setUploading(false);
    }
  }

  const previewImage = resolveImage(f.image_key, f.image_url, FALLBACK_IMAGE);
  const isHome = (f.page || "home").toLowerCase() === "home";

  return (
    <div>
      <button
        onClick={onCancel}
        className="inline-flex items-center gap-1 text-xs font-bold text-forest-dark mb-4"
      >
        <ArrowLeft className="size-4" /> BACK TO SLIDES
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form Fields */}
        <div className="lg:col-span-7">
          <Card className="p-6">
            <h2 className="font-serif text-2xl text-forest-dark mb-4">
              {f.id ? "Edit Hero Slide" : "New Hero Slide"}
            </h2>

            {/* Recommended Dimensions Box */}
            <div className="text-xs text-forest-dark bg-cream/70 border border-brand-orange/30 rounded-xl p-4 mb-4">
              <div className="flex items-center gap-2 font-bold text-brand-orange mb-1">
                <Sparkles className="size-4" />
                <span>Recommended Artwork Dimensions:</span>
              </div>
              <ul className="list-disc pl-5 space-y-1 mt-1 text-espresso/90">
                <li>
                  <strong>For Home Page banner uploads:</strong> Recommended size →{" "}
                  <span className="font-mono font-bold">1920 × 700 px</span> (Aspect Ratio 1920:700)
                </li>
                <li>
                  <strong>For Other Page banner uploads:</strong> Recommended size →{" "}
                  <span className="font-mono font-bold">1920 × 600 px</span> (Aspect Ratio 1920:600)
                </li>
              </ul>
              <p className="mt-2 text-[11px] text-espresso/70 italic font-medium">
                Warning: If an uploaded image has a different aspect ratio, cropping may occur automatically.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <Field label="Target Page *">
                <select
                  value={f.page ?? "home"}
                  onChange={(e) => setF({ ...f, page: e.target.value })}
                  className={inp}
                >
                  {PAGE_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Sort Order">
                <input
                  type="number"
                  value={f.sort_order ?? 0}
                  onChange={(e) =>
                    setF({ ...f, sort_order: Number(e.target.value) })
                  }
                  className={inp}
                />
              </Field>

              <Field label="Eyebrow Badge">
                <input
                  value={f.eyebrow ?? ""}
                  onChange={(e) => setF({ ...f, eyebrow: e.target.value })}
                  placeholder="e.g. 100% PURE & NATURAL"
                  className={inp}
                />
              </Field>

              <Field label="Text Alignment">
                <select
                  value={f.align ?? "left"}
                  onChange={(e) => setF({ ...f, align: e.target.value })}
                  className={inp}
                >
                  <option value="left">Left Aligned</option>
                  <option value="center">Center Aligned</option>
                </select>
              </Field>

              <Field label="Primary Heading *">
                <input
                  value={f.title ?? ""}
                  onChange={(e) => setF({ ...f, title: e.target.value })}
                  placeholder="e.g. Pure Honey."
                  className={inp}
                />
              </Field>

              <Field label="Orange Italic Accent Text">
                <input
                  value={f.title_accent ?? ""}
                  onChange={(e) => setF({ ...f, title_accent: e.target.value })}
                  placeholder="e.g. Proven Purity."
                  className={inp}
                />
              </Field>

              <div className="md:col-span-2">
                <Field label="Subtitle / Description">
                  <input
                    value={f.subtitle ?? ""}
                    onChange={(e) => setF({ ...f, subtitle: e.target.value })}
                    placeholder="e.g. Sustainably harvested from wild flora across Saurashtra..."
                    className={inp}
                  />
                </Field>
              </div>

              {/* Image Upload / Selector */}
              <div className="md:col-span-2 pt-2 border-t border-border">
                <div className="text-xs font-bold text-forest-dark mb-2">
                  Banner Background Image *
                </div>

                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <label className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-hover text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors shadow-sm">
                    <Upload className="size-3.5" />
                    <span>
                      {uploading ? "UPLOADING TO SUPABASE…" : "UPLOAD BANNER IMAGE"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={uploading}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) void onUploadImage(file);
                      }}
                    />
                  </label>
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                  <Field label="Or select built-in asset key">
                    <select
                      value={f.image_key ?? ""}
                      onChange={(e) =>
                        setF({
                          ...f,
                          image_key: e.target.value || null,
                          image_url: null,
                        })
                      }
                      className={inp}
                    >
                      <option value="">— Use custom URL / uploaded image —</option>
                      {IMAGE_KEYS.map((k) => (
                        <option key={k} value={k}>
                          {k}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Or paste Image URL (Supabase Storage URL)">
                    <input
                      value={f.image_url ?? ""}
                      onChange={(e) =>
                        setF({
                          ...f,
                          image_url: e.target.value || null,
                          image_key: null,
                        })
                      }
                      placeholder="https://..."
                      className={inp}
                    />
                  </Field>
                </div>
              </div>

              <Field label="CTA Button Label">
                <input
                  value={f.cta_label ?? ""}
                  onChange={(e) => setF({ ...f, cta_label: e.target.value })}
                  placeholder="SHOP PURE HONEY"
                  className={inp}
                />
              </Field>

              <Field label="CTA Button Target URL">
                <input
                  value={f.cta_href ?? "/shop"}
                  onChange={(e) => setF({ ...f, cta_href: e.target.value })}
                  placeholder="/shop"
                  className={inp}
                />
              </Field>

              <div className="md:col-span-2 pt-2">
                <label className="inline-flex items-center gap-2 text-sm font-bold text-forest-dark cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!!f.active}
                    onChange={(e) => setF({ ...f, active: e.target.checked })}
                    className="size-4 rounded border-border text-brand-orange"
                  />
                  <span>Active (Display this banner in the slider)</span>
                </label>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <BtnPrimary
                disabled={busy || uploading}
                onClick={async () => {
                  if (!f.title?.trim()) {
                    toast.error("Please provide a Primary Heading");
                    return;
                  }
                  setBusy(true);
                  try {
                    await save({
                      data: {
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
                        active: !!f.active,
                      } as never,
                    });
                    toast.success("Hero slide saved successfully");
                    await onSaved();
                  } catch (e) {
                    toast.error((e as Error).message);
                  } finally {
                    setBusy(false);
                  }
                }}
              >
                {busy ? "SAVING SLIDE…" : "SAVE SLIDE"}
              </BtnPrimary>
              <BtnGhost onClick={onCancel}>CANCEL</BtnGhost>
            </div>
          </Card>
        </div>

        {/* Right Column: Live Interactive Slide Preview */}
        <div className="lg:col-span-5">
          <Card className="p-5 sticky top-24">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-forest-dark uppercase tracking-wider flex items-center gap-1.5">
                <Eye className="size-4 text-brand-orange" /> LIVE BANNER PREVIEW
              </span>
              <span className="text-[11px] font-mono font-bold text-muted-foreground bg-cream px-2 py-0.5 rounded border border-border">
                {isHome ? "1920 × 700 px (Home)" : "1920 × 600 px (Inner)"}
              </span>
            </div>

            <div
              className={`relative rounded-2xl overflow-hidden shadow-lg border border-border bg-espresso w-full ${
                isHome ? "aspect-[1920/700]" : "aspect-[1920/600]"
              }`}
            >
              <img
                src={previewImage}
                alt={f.title || "Preview"}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-espresso/80 via-espresso/45 to-transparent pointer-events-none" />

              <div className="absolute inset-0 flex flex-col justify-center p-6 text-cream z-10">
                {f.eyebrow && (
                  <div className="inline-flex items-center gap-2 bg-espresso/85 border border-brand-orange/40 px-3 py-1 rounded-full w-max mb-2 backdrop-blur-md">
                    <span className="text-[10px] font-bold tracking-[0.15em] text-brand-orange uppercase">
                      {f.eyebrow}
                    </span>
                  </div>
                )}
                <h3
                  className={`font-serif font-bold leading-tight ${
                    isHome ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"
                  }`}
                >
                  {f.title || "Primary Heading"}
                  {f.title_accent && (
                    <>
                      <br />
                      <span className="italic text-brand-orange font-normal">
                        {f.title_accent}
                      </span>
                    </>
                  )}
                </h3>
                {f.subtitle && (
                  <p className="mt-2 text-cream/90 text-xs sm:text-sm line-clamp-2 max-w-sm">
                    {f.subtitle}
                  </p>
                )}

                {f.cta_label && (
                  <div className="mt-4">
                    <span className="inline-flex items-center gap-1.5 bg-[#B57420] text-white px-4 py-2 rounded-full text-[11px] font-bold tracking-widest uppercase shadow-md">
                      <span>{f.cta_label}</span>
                      <ArrowRight className="size-3" />
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-3 text-center text-xs text-muted-foreground">
              This interactive preview renders live as you type and select background imagery.
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
