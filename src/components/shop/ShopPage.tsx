import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import React, { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { CategoryThumbnailNav } from "@/components/shop/CategoryThumbnailNav";
import { PremiumMobileCarousel } from "@/components/site/PremiumMobileCarousel";
import { DesktopFilterSheet, MobileFilterDrawer, defaultFilters, type FilterState } from "@/components/shop/ShopFilters";
import {
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

export function ShopPage({ 
  overrideCategorySlug, 
  initialCategories = DEFAULT_SHOP_CATEGORIES, 
  initialProducts = [] 
}: { 
  overrideCategorySlug?: string;
  initialCategories?: ShopCategory[];
  initialProducts?: Product[];
}) {
  // Temporary development diagnostic
  console.table(
    initialCategories.map(c => ({
      slug: c.slug,
      name: c.name,
      image_url: c.image_url,
      image: (c as any).image,
      updated_at: c.updated_at
    }))
  );

  const search = useSearch({ strict: false }) as Record<string, any>;
  const navigate = useNavigate();

  // Normalize products synchronously based on passed initialProducts
  const normalizedInitialProducts = useMemo(() => {
    const mergedMap = new Map<string, Product>();
    
    // Add database products
    if (initialProducts && initialProducts.length > 0) {
      initialProducts.forEach((p) => {
        mergedMap.set(p.slug, p);
      });
    }

    // Normalize categories to ensure exactly one of the 6 categories
    const validCategories = ["Honey", "Beeswax", "Bee Pollen", "Beeswax Candles", "Beeswax Products", "Beauty Products"];
    
    return Array.from(mergedMap.values()).map((p) => {
      let finalCat = p.category;
      
      // Fix legacy categories
      if (finalCat === "Beeswax Candle") finalCat = "Beeswax Candles";
      if (p.name.includes("Gift Pack")) finalCat = "Honey";

      // Fallback if somehow totally invalid
      if (!validCategories.includes(finalCat)) {
         if (p.name.includes("Honey")) finalCat = "Honey";
         else finalCat = "Honey"; // safe fallback
      }
      
      return { ...p, category: finalCat };
    });
  }, [initialProducts]);

  const [products, setProducts] = useState<Product[]>(normalizedInitialProducts);
  const [categories, setCategories] = useState<ShopCategory[]>(initialCategories);
  const [quick, setQuick] = useState<Product | null>(null);

  // Active state
  const initialCat = overrideCategorySlug ? overrideCategorySlug : (search.category || search.cat || "All Products");
  const [cat, setCat] = useState<string>(initialCat);
  const [q, setQ] = useState<string>(search.q || "");
  const [sort, setSort] = useState<"popular" | "price-asc" | "price-desc" | "newest" | "rating">(
    search.sort || "popular",
  );
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  const applyFilters = () => {
    // Note: Filters state is updated via Sheet/Drawer. 
    // In a real app we would refetch or filter the products list here.
  };

  // Sync state if props change (unlikely in TanStack Start unless navigation occurs, but good practice)
  useEffect(() => {
    setProducts(normalizedInitialProducts);
  }, [normalizedInitialProducts]);
  
  useEffect(() => {
    setCategories(initialCategories);
  }, [initialCategories]);

  // Sync state with URL search params
  useEffect(() => {
    if (overrideCategorySlug) {
      setCat(overrideCategorySlug);
    } else {
      const nextCat = search.category || search.cat || "All Products";
      setCat(nextCat);
    }
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
    let activeCat = overrideCategorySlug || cat;
    if (activeCat !== "All Products" && activeCat !== "All" && activeCat !== "all" && activeCat !== "all-products") {
      const catLower = activeCat.toLowerCase().trim();
      
      // Match either the category slug or name
      const matchedCatDef = categories.find(c => c.slug.toLowerCase() === catLower || c.name.toLowerCase() === catLower)
        || DEFAULT_SHOP_CATEGORIES.find(c => c.slug.toLowerCase() === catLower || c.name.toLowerCase() === catLower);

      if (matchedCatDef) {
        list = list.filter((p) => {
          const pCat = p.category ? p.category.toLowerCase().trim() : "";
          return pCat === matchedCatDef.slug.toLowerCase() || pCat === matchedCatDef.name.toLowerCase();
        });
      } else {
        // Fallback exact match on product category string if definition isn't found
        list = list.filter((p) => {
          const pCat = p.category ? p.category.toLowerCase().trim() : "";
          return pCat === catLower;
        });
      }
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
      {!overrideCategorySlug ? (
        <PageHeroSlider page="shop" />
      ) : (
        <section className="relative bg-cream-deep/40 py-16 sm:py-24 overflow-hidden">
          <div className="container-page relative z-10 text-center flex flex-col items-center">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-espresso font-medium mb-4">
              {categories.find(c => c.slug === overrideCategorySlug)?.name || overrideCategorySlug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())}
            </h1>
          </div>
        </section>
      )}

      {/* (Old ShopCategorySection removed in favor of the Premium Nav below) */}


      {/* =========================================================================
          4. SHOP BY CATEGORY (Only show on main /shop route)
         ========================================================================= */}
      {!overrideCategorySlug && (
        <section className="bg-cream pb-10">
        <div className="container-page">
          <div className="mb-8">
            <h2 className="font-serif text-[28px] sm:text-[36px] text-espresso font-[500]">Shop by Category</h2>
            <p className="text-espresso/70 text-[15px] max-w-2xl mt-2">Explore our pure, authentic honey and bee-crafted essentials.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {[
              categories.find((c) => c.slug === "all-products" || c.name.toLowerCase() === "all products") || 
              { slug: "all-products", name: "All Products", image_url: heroProductsImg, hasCustomImage: false },
              ...categories.filter((c) => c.slug !== "all-products" && c.name.toLowerCase() !== "all products")
            ].map((c) => c.slug === "all-products" || c.name.toLowerCase() === "all products" ? (
              <Link
                key={c.slug}
                to="/shop"
                className="group relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-500 aspect-square"
              >
                <img
                  src={c.image_url || undefined}
                  alt={c.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                  loading="lazy"
                  onError={(event) => {
                    console.error("[CATEGORY IMAGE FAILED]", { slug: c.slug, name: c.name, src: event.currentTarget.src });
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 flex items-end justify-center">
                  <h3 className="font-serif text-[16px] sm:text-[18px] font-bold text-white text-center drop-shadow-sm group-hover:text-brand-orange transition-colors">
                    {c.name}
                  </h3>
                </div>
              </Link>
            ) : (
              <Link
                key={c.slug}
                to="/shop/$slug"
                params={{ slug: c.slug }}
                className="group relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-500 aspect-square"
              >
                <img
                  src={c.image_url || undefined}
                  alt={c.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                  loading="lazy"
                  onError={(event) => {
                    console.error("[CATEGORY IMAGE FAILED]", { slug: c.slug, name: c.name, src: event.currentTarget.src });
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 flex items-end justify-center">
                  <h3 className="font-serif text-[16px] sm:text-[18px] font-bold text-white text-center drop-shadow-sm group-hover:text-brand-orange transition-colors">
                    {c.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      )}



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


            </div>
          </div>

          {/* Product Grid — 5 columns on desktop matching reference image */}
          {filtered.length === 0 ? (
            <div className="bg-white border border-border/80 rounded-3xl p-16 text-center shadow-soft max-w-xl mx-auto my-12">
              <div className="text-5xl mb-4">🐝</div>
              <h3 className="font-serif text-2xl font-bold text-espresso">
                {overrideCategorySlug ? "No products found in this category." : "No honey matches your filter"}
              </h3>
              <p className="mt-2 text-sm text-espresso/70">
                {overrideCategorySlug ? "Please try checking back later or browse our other collections." : "Try selecting a different category or viewing all products."}
              </p>
              {overrideCategorySlug ? (
                <Link
                  to="/shop"
                  className="mt-6 inline-flex items-center gap-2 bg-brand-orange text-white px-7 py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-brand-orange-hover transition-colors shadow-sm"
                >
                  <span>VIEW ALL PRODUCTS</span>
                </Link>
              ) : (
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
              )}
            </div>
          ) : (
            <>
              {/* Unified Mobile & Desktop View */}
              <div
                className="grid gap-5 sm:gap-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
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
