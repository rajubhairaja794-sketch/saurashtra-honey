import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import React, { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { ShopCategorySection } from "@/components/shop/ShopCategorySection";
import { PremiumMobileCarousel } from "@/components/site/PremiumMobileCarousel";
import { DesktopFilterSheet, MobileFilterDrawer, defaultFilters, type FilterState } from "@/components/shop/ShopFilters";
import {
  ArrowRight,
  LayoutGrid,
  List,
  Search,
  X,
  Sparkles,
} from "lucide-react";
import { z } from "zod";
import { SiteLayout } from "@/components/site/Layout";
import { ProductCard } from "@/components/site/ProductCard";
import { QuickView } from "@/components/site/QuickView";
import { PageHeroSlider } from "@/components/site/PageHeroSlider";
import { type Product } from "@/lib/products";
import { fetchProducts } from "@/lib/product-catalog";
import {
  fetchShopCategories,
  DEFAULT_SHOP_CATEGORIES,
  type ShopCategory,
} from "@/lib/category-catalog";
import { track, toItem } from "@/lib/analytics";
import { StructuredData, breadcrumbLd } from "@/components/site/StructuredData";

// Assets for Shop Hero and Discover By Shop collections
import heroProductsImg from "@/assets/hero-products.jpg";
import heroHoneyImg from "@/assets/hero-honey.jpg";
import prodMultifloraImg from "@/assets/prod-multiflora.jpg";
import prodHoneycombImg from "@/assets/prod-honeycomb.jpg";
import prodGiftpackImg from "@/assets/prod-giftpack.jpg";
import honeycombBeesImg from "@/assets/honeycomb-bees.jpg";
import prodLiquidImg from "@/assets/prod-liquid.jpg";
import beeFlowerImg from "@/assets/bee-flower.jpg";
import honeyDrizzleImg from "@/assets/honey-drizzle.jpg";
import familyHoneyImg from "@/assets/family-honey.jpg";

const searchSchema = z
  .object({
    q: z.string().optional(),
    cat: z.string().optional(),
    category: z.string().optional(),
    sort: z.enum(["popular", "price-asc", "price-desc", "newest", "rating"]).optional(),
  })
  .catchall(z.unknown());

export const Route = createFileRoute("/shop")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "Shop Pure Raw Honey — Ajwain, Fennel, Lychee & More | Saurashtra Honey" },
      {
        name: "description",
        content:
          "Explore our range of raw, natural and unfiltered honey — Ajwain, Fennel, Lychee, Multiflora, honeycomb and gift packs from the floral farms of Saurashtra.",
      },
      { property: "og:title", content: "Shop — Saurashtra Honey" },
      { property: "og:description", content: "Pure Honey. Made by Nature." },
      { property: "og:type", content: "website" },
      {
        property: "og:url",
        content: "https://id-preview--f7347c5b-4839-4afc-a6bf-ed617bd76e1d.lovable.app/shop",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://id-preview--f7347c5b-4839-4afc-a6bf-ed617bd76e1d.lovable.app/shop",
      },
    ],
  }),
  component: Shop,
});

function Shop() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ShopCategory[]>(DEFAULT_SHOP_CATEGORIES);
  const [quick, setQuick] = useState<Product | null>(null);

  // Active state
  const initialCat = search.category || search.cat || "All Products";
  const [cat, setCat] = useState<string>(initialCat);
  const [q, setQ] = useState<string>(search.q || "");
  const [sort, setSort] = useState<"popular" | "price-asc" | "price-desc" | "newest" | "rating">(
    search.sort || "popular",
  );
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  const applyFilters = () => {
    // Note: Filters state is updated via Sheet/Drawer. 
    // In a real app we would refetch or filter the products list here.
  };

  // Fetch real database products and categories
  useEffect(() => {
    void fetchProducts().then((r) => {
      const mergedMap = new Map<string, Product>();
      
      // Add database products
      if (r && r.length > 0) {
        r.forEach((p) => {
          mergedMap.set(p.slug, p);
        });
      }

      // 3. Normalize categories to ensure exactly one of the 6 categories
      const validCategories = ["Honey", "Beeswax", "Bee Pollen", "Beeswax Candles", "Beauty Products", "Gift Hampers"];
      
      const normalizedProducts = Array.from(mergedMap.values()).map((p) => {
        let finalCat = p.category;
        
        // Fix legacy categories
        if (finalCat === "Beeswax Candle") finalCat = "Beeswax Candles";
        if (finalCat === "Beeswax Products") finalCat = "Beauty Products";
        if (p.name.includes("Gift Pack")) finalCat = "Gift Hampers";

        // Fallback if somehow totally invalid
        if (!validCategories.includes(finalCat)) {
           if (p.name.includes("Honey")) finalCat = "Honey";
           else finalCat = "Honey"; // safe fallback
        }
        
        return { ...p, category: finalCat };
      });
      
      setProducts(normalizedProducts);
    });
    void fetchShopCategories().then((r) => {
      if (r.length > 0) setCategories(r);
    });
  }, []);

  // Sync state with URL search params
  useEffect(() => {
    const nextCat = search.category || search.cat || "All Products";
    setCat(nextCat);
    if (search.q !== undefined) setQ(search.q || "");
    if (search.sort !== undefined) setSort(search.sort || "popular");
  }, [search.category, search.cat, search.q, search.sort]);

  const updateUrlWithoutScrolling = useCallback(
    (newCat: string, newQ: string, newSort: typeof sort) => {
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
    },
    [],
  );

  const handleSelectCategory = (newCatName: string) => {
    setCat(newCatName);
    updateUrlWithoutScrolling(newCatName, q, sort);
    setTimeout(() => {
      const el = document.getElementById("products-grid");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 40);
  };

  const handleSortChange = (newSort: typeof sort) => {
    setSort(newSort);
    updateUrlWithoutScrolling(cat, q, newSort);
  };

  // Filtered and sorted products array
  const filtered = useMemo(() => {
    let list = [...products];

    // Category filter
    if (cat !== "All Products" && cat !== "All" && cat !== "all") {
      const catLower = cat.toLowerCase().trim();
      list = list.filter((p) => {
        const pCat = p.category ? p.category.toLowerCase().trim() : "";
        return pCat === catLower;
      });
    }

    // Search query filter
    if (q.trim()) {
      const term = q.trim().toLowerCase();
      list = list.filter((p) =>
        [
          p.name,
          p.tagline,
          p.description,
          p.flora ?? "",
          p.category,
          ...(p.benefits ?? []),
        ]
          .join(" ")
          .toLowerCase()
          .includes(term),
      );
    }

    // Sort
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
      default:
        list.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
    }
    return list;
  }, [cat, q, sort, products]);

  // Analytics tracking
  useEffect(() => {
    track("view_item_list", {
      item_list_name: cat,
      items: filtered.slice(0, 20).map((p) => toItem(p)),
    });
  }, [cat, filtered]);

  // 5 Discover By Shop photographic cards matching reference image
  const shopCollections = [
    {
      title: "Pure Honey",
      img: prodMultifloraImg,
      filterName: "Single Flora",
    },
    {
      title: "Bee Essentials",
      img: prodHoneycombImg,
      filterName: "Honey Comb",
    },
    {
      title: "Gift & Celebrate",
      img: prodGiftpackImg,
      filterName: "Gift Packs",
    },
    {
      title: "Bulk & Wholesale",
      img: honeycombBeesImg,
      filterName: "Raw Honey",
    },
    {
      title: "All Products",
      img: heroProductsImg,
      filterName: "All Products",
    },
  ];

  return (
    <SiteLayout>
      <StructuredData
        data={breadcrumbLd([
          { name: "Home", url: "/" },
          { name: "Shop", url: "/shop" },
        ])}
      />

      {/* =========================================================================
          2. SHOP HERO (3-Slide Carousel, 1920x600 proportion)
         ========================================================================= */}
      <PageHeroSlider page="shop" />

      {/* =========================================================================
          2B. SHOP BY CATEGORY (Premium Horizontal Carousel)
         ========================================================================= */}
      <ShopCategorySection activeCategory={cat} />

      {/* =========================================================================
          3. SEARCH BAR
         ========================================================================= */}
      <section className="bg-cream pt-10 sm:pt-16 pb-4">
        <div className="container-page">
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 size-5 text-espresso/40 pointer-events-none" />
            <input
              type="text"
              placeholder="Search honey, bee products..."
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                updateUrlWithoutScrolling(cat, e.target.value, sort);
              }}
              className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white border border-border/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)] text-[15px] text-espresso placeholder:text-espresso/40 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all"
            />
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. CATEGORY FILTER CHIPS (Scrollable)
         ========================================================================= */}
      <section className="bg-cream border-b border-border/80 pt-2 pb-5 overflow-hidden">
        <div className="container-page">
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar scroll-smooth snap-x pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {["All Products", "Honey", "Beeswax", "Bee Pollen", "Beeswax Candles", "Beauty Products", "Gift Hampers"].map((chip) => {
              const isSelected = cat === chip || (chip === "All Products" && (cat === "All" || cat === "all"));
              return (
                <button
                  key={chip}
                  onClick={() => handleSelectCategory(chip)}
                  className={`shrink-0 snap-start px-6 py-3 rounded-full text-[13px] font-bold tracking-wide transition-all duration-[250ms] min-h-[48px] ${
                    isSelected
                      ? "bg-brand-orange text-white shadow-[0_4px_14px_rgba(217,119,6,0.2)]"
                      : "bg-[#FDFBF7] text-espresso border border-border/80 hover:border-brand-orange/50 hover:bg-[#F8F5EF]"
                  }`}
                >
                  {chip}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. FILTER + SORT TOOLBAR & PRODUCT GRID (#products-grid)
         ========================================================================= */}
      <section id="products-grid" className="py-10 sm:py-12 bg-cream">
        <div className="container-page">

          {/* Toolbar (Desktop & Mobile) - NO STICKY */}
          <div className="relative z-30 bg-cream py-4 mb-8 border-b sm:border-none border-border/80 flex flex-wrap items-center justify-between gap-4">
            
            <div className="hidden sm:block text-[15px] text-espresso/80 font-medium">
              Showing {filtered.length} products
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              {/* Filter Button (Desktop Slide Panel) */}
              <div className="hidden sm:block">
                <DesktopFilterSheet filters={filters} setFilters={setFilters} onApply={applyFilters}>
                  <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-border/80 text-[14px] font-bold text-espresso shadow-xs hover:border-brand-orange hover:text-brand-orange transition-colors min-h-[48px]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
                    Filter
                  </button>
                </DesktopFilterSheet>
              </div>

              {/* Sort Dropdown */}
              <select
                value={sort}
                onChange={(e) => handleSortChange(e.target.value as typeof sort)}
                className="border border-border/80 rounded-xl px-4 py-3 text-[14px] bg-white text-espresso font-bold focus:outline-none focus:border-brand-orange shadow-xs cursor-pointer min-h-[48px]"
              >
                <option value="popular">Featured</option>
                <option value="newest">Newest</option>
                <option value="popular">Best Selling</option>
                <option value="price-asc">Price Low to High</option>
                <option value="price-desc">Price High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>

              {/* Grid / List Toggle (Desktop) */}
              <div className="hidden sm:flex items-center gap-1 border border-border/80 rounded-xl p-1 bg-white shadow-xs">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={`size-10 rounded-lg flex items-center justify-center transition-colors ${viewMode === "grid" ? "bg-brand-orange text-white" : "text-muted-foreground hover:text-espresso"}`}
                >
                  <LayoutGrid className="size-4.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  className={`size-10 rounded-lg flex items-center justify-center transition-colors ${viewMode === "list" ? "bg-brand-orange text-white" : "text-muted-foreground hover:text-espresso"}`}
                >
                  <List className="size-4.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Product Grid — 5 columns on desktop matching reference image */}
          {filtered.length === 0 ? (
            <div className="bg-white border border-border/80 rounded-3xl p-16 text-center shadow-soft max-w-xl mx-auto my-12">
              <div className="text-5xl mb-4">🐝</div>
              <h3 className="font-serif text-2xl font-bold text-espresso">
                No honey matches your filter
              </h3>
              <p className="mt-2 text-sm text-espresso/70">
                Try selecting a different category or viewing all products.
              </p>
              <button
                onClick={() => {
                  setCat("All Products");
                  setQ("");
                  updateUrlWithoutScrolling("All Products", "", sort);
                }}
                className="mt-6 inline-flex items-center gap-2 bg-brand-orange text-white px-7 py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-brand-orange-hover transition-colors shadow-sm"
              >
                <span>VIEW ALL PRODUCTS</span>
              </button>
            </div>
          ) : (
            <>
              {/* Unified Mobile & Desktop View */}
              <div
                className={`grid gap-5 sm:gap-8 ${
                  viewMode === "grid"
                    ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                    : "grid-cols-1 md:grid-cols-2"
                }`}
              >
                {filtered.map((product, idx) => (
                  <div 
                    key={`${product.slug}-${cat}`}
                    className="animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out fill-mode-both"
                    style={{ animationDelay: `${idx * 40}ms` }}
                  >
                    <ProductCard
                      p={product}
                      onQuickView={(p) => setQuick(p)}
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* QUICK VIEW MODAL */}
      <QuickView product={quick} onClose={() => setQuick(null)} />

      {/* =========================================================================
          FLOATING FILTER BUTTON (MOBILE ONLY)
         ========================================================================= */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 block sm:hidden">
        <MobileFilterDrawer filters={filters} setFilters={setFilters} onApply={applyFilters}>
          <button className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-espresso text-white text-[14px] font-bold shadow-[0_8px_30px_rgba(0,0,0,0.12)] min-h-[48px] active:scale-95 transition-transform">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
            Filter & Sort
          </button>
        </MobileFilterDrawer>
      </div>
    </SiteLayout>
  );
}
