import { Link, useNavigate } from "@tanstack/react-router";
import {
  ShoppingBag, User, Search, Menu, X, ShieldCheck, Heart, ChevronRight,
  Sparkles, Flame, Gift, Leaf, Package, Bell,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { BrandMark, BeeLogo } from "./BeeLogo";
import { TopBar } from "./TopBar";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { products } from "@/lib/products";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { fetchShopCategories, DEFAULT_SHOP_CATEGORIES, type ShopCategory } from "@/lib/category-catalog";
import { getCategorySlug } from "@/lib/collection-helpers";

type PrimaryLink = { to: string; label: string; hash?: string };
const primaryLinks: readonly PrimaryLink[] = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/our-story", label: "Our Story" },
  { to: "/bee-farming", label: "Bee Farming" },
  { to: "/blog", label: "Journal" },
  { to: "/bulk-gifting", label: "Bulk & Gifting" },
  { to: "/contact", label: "Contact" },
] as const;

const categoryIcons: Record<string, typeof Leaf> = {
  "Single Flora": Leaf, Multiflora: Sparkles, "Raw Honey": Flame, "Honey Comb": Sparkles, "Gift Packs": Gift,
};

const HISTORY_KEY = "sh_search_history_v1";
const POPULAR = ["Ajwain honey", "Gift packs", "Honey comb", "Lychee", "Multiflora"];

function readHistory(): string[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]") as string[]; } catch { return []; }
}
function pushHistory(q: string) {
  const list = readHistory().filter((x) => x.toLowerCase() !== q.toLowerCase());
  list.unshift(q);
  try { localStorage.setItem(HISTORY_KEY, JSON.stringify(list.slice(0, 6))); } catch {/* ignore */}
}

const uniqueCategories = Array.from(new Set(products.map((p) => p.category)));
const bestSellers = products.filter((p) => p.badge === "BESTSELLER").slice(0, 3);
const newArrivals = products.filter((p) => p.badge === "NEW").slice(0, 3);
const featuredForMenu = (newArrivals.length ? newArrivals : products).slice(0, 3);

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const [shopOpen, setShopOpen] = useState(false);
  const [unread, setUnread] = useState(0);
  const [history, setHistory] = useState<string[]>([]);
  const [dbCategories, setDbCategories] = useState<ShopCategory[]>(DEFAULT_SHOP_CATEGORIES);
  useEffect(() => {
    void fetchShopCategories().then((res) => {
      if (res.length > 0) setDbCategories(res);
    });
  }, []);
  const navCategories = useMemo(() => {
    const names = dbCategories.map((c) => c.name);
    return names.length > 0 ? names : Array.from(new Set(products.map((p) => p.category)));
  }, [dbCategories]);
  const { count, setOpen: setCartOpen } = useCart();
  const { count: wishCount } = useWishlist();
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const searchRef = useRef<HTMLInputElement | null>(null);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnterShop = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setShopOpen(true);
  };

  const handleMouseLeaveShop = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setShopOpen(false);
    }, 280);
  };

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY || document.documentElement.scrollTop;
        if (currentScrollY < 30 || mobileOpen) {
          setIsHidden(false);
          lastScrollY.current = currentScrollY;
          ticking.current = false;
          return;
        }
        const delta = currentScrollY - lastScrollY.current;
        if (Math.abs(delta) > 8) {
          if (delta > 0 && currentScrollY > 80) {
            setIsHidden(true);
          } else if (delta < 0) {
            setIsHidden(false);
          }
          lastScrollY.current = currentScrollY;
        }
        ticking.current = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mobileOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => { setHistory(readHistory()); }, [searchOpen, mobileOpen]);

  useEffect(() => {
    if (!user) { setUnread(0); return; }
    (async () => {
      const { count } = await supabase.from("notifications").select("id", { count: "exact", head: true }).eq("user_id", user.id).eq("read", false);
      setUnread(count ?? 0);
    })();
  }, [user]);

  const suggestions = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return [];
    return products
      .filter((p) => [p.name, p.category, p.flora ?? "", ...(p.benefits ?? [])].join(" ").toLowerCase().includes(t))
      .slice(0, 6);
  }, [q]);

  const doSearch = (term?: string) => {
    const t = (term ?? q).trim();
    if (!t) return;
    pushHistory(t);
    setSearchOpen(false); setMobileOpen(false); setQ("");
    navigate({ to: "/shop", search: { q: t } as never });
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-transform duration-300 ease-out ${
        isHidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <TopBar />
      <div className="bg-cream/95 backdrop-blur-xl border-b border-border/80 shadow-soft transition-all">
        <div className="container-page">
        {/* Mobile row: MENU + LOGO | SEARCH + CART */}
        <div className="flex items-center justify-between h-[60px] px-2 lg:hidden w-full">
          {/* Left group: Hamburger + Logo */}
          <div className="flex items-center gap-1.5 min-w-0">
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
              className="p-3 active:scale-95 transition-transform text-[#2B2118] hover:text-[#D97706] min-h-[48px] min-w-[48px] flex items-center justify-center shrink-0"
            >
              <Menu className="size-[26px] stroke-[1.5]" />
            </button>
            <Link to="/" aria-label="Saurashtra Honey home" className="flex items-center gap-2.5 min-w-0 shrink-0 pr-2">
              <BeeLogo className="h-[38px] w-auto object-contain shrink-0" />
              <div className="min-w-0 flex flex-col justify-center pt-0.5">
                <span className="font-serif text-[18px] font-medium leading-[1.1] text-[#2B2118] tracking-tight truncate">Saurashtra</span>
                <span className="text-[9px] tracking-[0.2em] uppercase text-[#D97706] font-bold leading-none mt-[3px] truncate">Honey</span>
              </div>
            </Link>
          </div>

          {/* Right group: Search + Cart */}
          <div className="flex items-center gap-1 shrink-0 text-[#2B2118]">
            <button
              type="button"
              aria-label="Search"
              onClick={() => setSearchOpen((s) => !s)}
              className="p-3 active:scale-95 transition-transform hover:text-[#D97706] min-h-[48px] min-w-[48px] flex items-center justify-center shrink-0"
            >
              <Search className="size-[22px] stroke-[1.5]" />
            </button>
            <button
              type="button"
              aria-label="Cart"
              onClick={() => setCartOpen(true)}
              className="p-3 active:scale-95 transition-transform hover:text-[#D97706] min-h-[48px] min-w-[48px] flex items-center justify-center shrink-0 relative"
            >
              <ShoppingBag className="size-[22px] stroke-[1.5]" />
              {count > 0 && (
                <span className="absolute top-1.5 right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#D97706] text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Desktop row */}
        <div className="hidden lg:grid grid-cols-[auto_1fr_auto] items-center h-20 gap-8">
          <Link to="/" aria-label="Saurashtra Honey home" className="shrink-0">
            <BrandMark />
          </Link>

          <nav className="flex items-center justify-center gap-7 text-[13.5px]">
            {primaryLinks.map((l, idx) => {
              const isShop = l.to === "/shop";
              const isHome = l.label === "Home";
              return (
                <div 
                  key={idx} 
                  className="relative" 
                  onMouseEnter={() => { if (isShop) handleMouseEnterShop(); }}
                  onMouseLeave={() => { if (isShop) handleMouseLeaveShop(); }}
                >
                  {l.hash ? (
                    <a
                      href={`/#${l.hash}`}
                      onClick={(e) => {
                        const el = document.getElementById(l.hash!);
                        if (el) {
                          e.preventDefault();
                          el.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      className="text-foreground/90 hover:text-brand-orange transition-colors relative py-2 font-semibold tracking-wide"
                    >
                      {l.label}
                    </a>
                  ) : (
                    <Link
                      to={l.to}
                      activeOptions={{ exact: isHome }}
                      className="text-foreground/90 hover:text-brand-orange transition-colors relative py-2 font-semibold tracking-wide [&.active]:text-brand-orange [&.active]:after:content-[''] [&.active]:after:absolute [&.active]:after:-bottom-1 [&.active]:after:left-0 [&.active]:after:right-0 [&.active]:after:h-0.5 [&.active]:after:bg-brand-orange"
                      preload={false}
                    >
                      {l.label}
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-4 text-foreground/80 justify-self-end">
            <button aria-label="Search" className="hover:text-burnt-orange transition-colors" onClick={() => setSearchOpen((s) => !s)}>
              <Search className="size-5" />
            </button>
            {isAdmin && (
              <Link to="/admin" aria-label="Admin" className="hover:text-burnt-orange"><ShieldCheck className="size-5" /></Link>
            )}
            <Link to="/wishlist" aria-label="Wishlist" className="relative hover:text-burnt-orange transition-colors">
              <Heart className="size-5" />
              {wishCount > 0 && <span className="absolute -top-2 -right-2 bg-burnt-orange text-white text-[10px] font-bold size-4 rounded-full flex items-center justify-center">{wishCount}</span>}
            </Link>
            {user && (
              <Link to="/account" search={{ tab: "notifications" } as never} aria-label="Notifications" className="relative hover:text-burnt-orange transition-colors">
                <Bell className="size-5" />
                {unread > 0 && <span className="absolute -top-2 -right-2 bg-destructive text-white text-[10px] font-bold size-4 rounded-full flex items-center justify-center">{unread}</span>}
              </Link>
            )}
            <Link to={user ? "/account" : "/auth"} aria-label={user ? "Account" : "Sign in"} className="hover:text-gold-deep transition-colors">
              <User className="size-5" />
            </Link>
            <button aria-label="Cart" className="relative hover:text-gold-deep transition-colors" onClick={() => setCartOpen(true)}>
              <ShoppingBag className="size-5" />
              {count > 0 && <span className="absolute -top-2 -right-2 bg-gold-deep text-cream text-[10px] font-bold size-4 rounded-full flex items-center justify-center">{count}</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Mega Menu — Shop (desktop) */}
      <div className={`hidden lg:block absolute left-0 right-0 top-full border-t border-border bg-cream shadow-lift origin-top transition-all duration-[220ms] ease-out ${shopOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}`}
        onMouseEnter={handleMouseEnterShop} onMouseLeave={handleMouseLeaveShop}>
        <div className="container-page grid grid-cols-12 gap-10 py-10">
          <div className="col-span-3">
            <p className="text-[11px] tracking-[0.28em] uppercase text-gold-deep font-bold mb-4">Shop by Category</p>
            <ul className="space-y-3">
              {navCategories.map((cat) => {
                const Icon = categoryIcons[cat] ?? Leaf;
                return (
                  <li key={cat}>
                    <Link to="/collections/$slug" params={{ slug: getCategorySlug(cat) }} className="group flex items-center gap-3 text-sm text-foreground/85 hover:text-gold-deep" onClick={() => setShopOpen(false)}>
                      <span className="size-8 rounded-full bg-cream-deep group-hover:bg-gold/30 grid place-items-center transition-colors">
                        <Icon className="size-4 text-forest-dark group-hover:text-gold-deep" />
                      </span>
                      {cat}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="col-span-3">
            <p className="text-[11px] tracking-[0.28em] uppercase text-gold-deep font-bold mb-4">Best Sellers</p>
            <ul className="space-y-3">
              {bestSellers.map((p) => (
                <li key={p.slug}>
                  <Link to="/product/$slug" params={{ slug: p.slug }} className="flex items-center gap-3 group" onClick={() => setShopOpen(false)}>
                    <img src={p.image} alt="" className="size-12 rounded-md object-cover bg-cream-deep" loading="lazy" />
                    <span className="text-sm text-foreground/85 group-hover:text-gold-deep">{p.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-3">
            <p className="text-[11px] tracking-[0.28em] uppercase text-gold-deep font-bold mb-4">Explore</p>
            <ul className="space-y-3 text-sm">
              <li><Link to="/shop" className="hover:text-gold-deep" onClick={() => setShopOpen(false)}>All products</Link></li>
              <li><Link to="/compare" className="hover:text-gold-deep" onClick={() => setShopOpen(false)}>Compare products</Link></li>
              <li><Link to="/track-order" className="hover:text-gold-deep" onClick={() => setShopOpen(false)}>Track an order</Link></li>
              <li><Link to="/collections/$slug" params={{ slug: "gift-hampers" }} className="hover:text-gold-deep" onClick={() => setShopOpen(false)}>Gift packs & combos</Link></li>
              <li><Link to="/bulk-orders" className="hover:text-gold-deep" onClick={() => setShopOpen(false)}>Bulk & corporate gifting</Link></li>
              <li><Link to="/bee-farming" className="hover:text-gold-deep" onClick={() => setShopOpen(false)}>Trace your honey</Link></li>
            </ul>
          </div>
          <div className="col-span-3">
            {featuredForMenu[0] && (
              <Link to="/product/$slug" params={{ slug: featuredForMenu[0].slug }} className="block group rounded-xl overflow-hidden bg-cream-deep relative" onClick={() => setShopOpen(false)}>
                <img src={featuredForMenu[0].image} alt={featuredForMenu[0].name} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-linear-to-t from-forest-dark/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-cream">
                  <p className="text-[10px] tracking-[0.28em] uppercase text-gold">Featured</p>
                  <p className="font-serif text-lg leading-tight mt-1">{featuredForMenu[0].name}</p>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-gold">Shop now <ChevronRight className="size-3.5" /></span>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Search dropdown (desktop + mobile) */}
      {searchOpen && (
        <div className="border-t border-border bg-cream animate-in fade-in slide-in-from-top-2 duration-200">
          <form onSubmit={(e) => { e.preventDefault(); doSearch(); }} className="container-page py-4">
            <div className="flex gap-2">
              <input ref={searchRef} autoFocus value={q} onChange={(e) => setQ(e.target.value)}
                placeholder="Search honey, gift packs, ajwain…"
                className="flex-1 bg-background border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-gold-deep" />
              <button className="bg-forest-dark text-cream rounded-lg px-5 text-xs font-bold tracking-widest hover:bg-forest">SEARCH</button>
              <button type="button" aria-label="Close search" onClick={() => setSearchOpen(false)} className="rounded-lg px-3 border border-border hover:bg-cream-deep">
                <X className="size-4" />
              </button>
            </div>
            {suggestions.length > 0 ? (
              <ul className="mt-3 grid sm:grid-cols-2 gap-2">
                {suggestions.map((p) => (
                  <li key={p.slug}>
                    <Link to="/product/$slug" params={{ slug: p.slug }} onClick={() => { setSearchOpen(false); setQ(""); }}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-cream-deep">
                      <img src={p.image} alt="" className="size-10 rounded object-cover" />
                      <span className="flex-1 text-sm truncate">{p.name}</span>
                      <span className="text-xs text-muted-foreground shrink-0">₹{p.price}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-4 grid sm:grid-cols-2 gap-4 text-[11px]">
                {history.length > 0 && (
                  <div>
                    <div className="tracking-widest font-bold text-forest-dark uppercase mb-1.5">Recent searches</div>
                    <div className="flex flex-wrap gap-1.5">
                      {history.map((h) => (
                        <button key={h} type="button" onClick={() => doSearch(h)} className="px-2.5 py-1 rounded-full border border-border bg-background hover:border-gold-deep text-forest-dark">{h}</button>
                      ))}
                    </div>
                  </div>
                )}
                <div>
                  <div className="tracking-widest font-bold text-forest-dark uppercase mb-1.5">Popular</div>
                  <div className="flex flex-wrap gap-1.5">
                    {POPULAR.map((h) => (
                      <button key={h} type="button" onClick={() => doSearch(h)} className="px-2.5 py-1 rounded-full bg-forest-dark text-cream hover:bg-forest">{h}</button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      )}

      {/* Mobile drawer (Portal to document.body so it is never clipped by sticky header stacking context) */}
      {typeof document !== "undefined" &&
        createPortal(
          <div
            className={`lg:hidden fixed inset-0 z-[9999] overflow-hidden transition-all duration-300 ${mobileOpen ? "pointer-events-auto" : "pointer-events-none"}`}
            aria-hidden={!mobileOpen}
          >
            <button
              type="button"
              aria-label="Close menu overlay"
              onClick={() => setMobileOpen(false)}
              className={`absolute inset-0 bg-espresso/60 backdrop-blur-xs transition-opacity duration-300 ${mobileOpen ? "opacity-100" : "opacity-0"}`}
            />
            <aside
              className={`absolute inset-y-0 left-0 w-[min(86vw,340px)] bg-cream shadow-lift flex flex-col transition-transform duration-300 ease-out ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
              {/* Drawer Header: LOGO + X */}
              <div className="flex items-center justify-between p-4 border-b border-border min-h-[64px]">
                <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2.5 min-w-0">
                  <BeeLogo className="max-h-[46px] w-auto object-contain shrink-0" />
                  <div className="min-w-0">
                    <span className="block font-serif text-[15px] font-bold text-espresso truncate">Saurashtra Honey</span>
                    <span className="block text-[9px] tracking-[0.2em] uppercase text-burnt-orange font-semibold truncate">Bee Farm</span>
                  </div>
                </Link>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setMobileOpen(false)}
                  className="p-2 -mr-2 min-h-11 min-w-11 flex items-center justify-center text-espresso hover:text-burnt-orange transition-colors"
                >
                  <X className="size-6" />
                </button>
              </div>

              {/* Drawer Navigation */}
              <nav className="flex-1 overflow-y-auto px-4 py-3">
                <ul className="space-y-1">
                  {primaryLinks.map((l, idx) => (
                    <li key={idx}>
                      {l.hash ? (
                        <a
                          href={`/#${l.hash}`}
                          onClick={(e) => {
                            setMobileOpen(false);
                            const el = document.getElementById(l.hash!);
                            if (el) {
                              e.preventDefault();
                              el.scrollIntoView({ behavior: "smooth" });
                            }
                          }}
                          className="flex items-center justify-between px-3 py-3 rounded-xl text-[15px] font-semibold text-espresso hover:bg-cream-deep transition-colors"
                        >
                          {l.label}
                          <ChevronRight className="size-4 text-muted-foreground" />
                        </a>
                      ) : (
                        <Link
                          to={l.to}
                          activeOptions={{ exact: l.label === "Home" }}
                          className="flex items-center justify-between px-3 py-3 rounded-xl text-[15px] font-semibold text-espresso hover:bg-cream-deep [&.active]:text-brand-orange [&.active]:bg-cream-deep/60 transition-colors"
                          onClick={() => setMobileOpen(false)}
                        >
                          {l.label}
                          <ChevronRight className="size-4 text-muted-foreground" />
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 pt-5 border-t border-border/80">
                  <p className="text-[10px] tracking-[0.25em] uppercase text-gold-deep font-bold mb-2 px-3">
                    Shop by Category
                  </p>
                  <ul className="space-y-1">
                    {navCategories.map((cat) => {
                      const Icon = categoryIcons[cat] ?? Leaf;
                      return (
                        <li key={cat}>
                          <Link
                            to="/shop"
                            search={{ category: cat } as never}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-foreground/85 hover:bg-cream-deep transition-colors"
                          >
                            <Icon className="size-4 text-gold-deep shrink-0" />
                            <span className="truncate">{cat}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="mt-5 pt-5 border-t border-border/80 pb-6">
                  <p className="text-[10px] tracking-[0.25em] uppercase text-gold-deep font-bold mb-2 px-3">
                    My Account
                  </p>
                  <ul className="space-y-1 text-sm font-medium">
                    <li>
                      <Link
                        to="/account"
                        search={{ tab: "orders" } as never}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-cream-deep transition-colors"
                      >
                        <Package className="size-4 text-gold-deep shrink-0" />
                        <span>Orders</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/wishlist"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-cream-deep transition-colors"
                      >
                        <Heart className="size-4 text-gold-deep shrink-0" />
                        <span>Wishlist</span>
                        {wishCount > 0 && (
                          <span className="ml-auto text-xs font-bold text-burnt-orange bg-cream-deep px-2 py-0.5 rounded-full">
                            {wishCount}
                          </span>
                        )}
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/track-order"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-cream-deep transition-colors"
                      >
                        <Package className="size-4 text-gold-deep shrink-0" />
                        <span>Track Order</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/compare"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-cream-deep transition-colors"
                      >
                        <ChevronRight className="size-4 text-gold-deep shrink-0" />
                        <span>Compare</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </nav>

              <div className="border-t border-border p-4 grid grid-cols-2 gap-3 bg-cream/90 shrink-0">
                <Link
                  to={user ? "/account" : "/auth"}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-xl border border-border bg-white py-3 text-sm font-semibold text-espresso hover:bg-cream-deep transition-colors shadow-xs"
                >
                  <User className="size-4 text-burnt-orange" />
                  <span className="truncate">{user ? "My Account" : "Sign in"}</span>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    setCartOpen(true);
                  }}
                  className="flex items-center justify-center gap-2 rounded-xl bg-espresso text-cream py-3 text-sm font-semibold hover:bg-burnt-orange transition-colors shadow-sm"
                >
                  <ShoppingBag className="size-4 text-gold" />
                  <span>Cart</span>
                  {count > 0 && <span className="text-xs font-bold bg-burnt-orange text-white px-1.5 py-0.5 rounded-full">{count}</span>}
                </button>
              </div>
            </aside>
          </div>,
          document.body
        )}
      </div>
    </header>
  );
}
