"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback, useRef } from "react";
import SocialCards from "@/components/ui/card-fan-carousel";

// ─── Data ────────────────────────────────────────────────────────────────────

const heroSlides = [
  { src: "/hero-lifestyle.png", label: "Illuminate\nEvery Moment" },
  { src: "/candles/candle1.png", label: "Artisan\nElegance" },
  { src: "/candles/candle3.png", label: "Botanically\nInspired" },
];

const products = [
  {
    id: 1,
    name: "Minimalist Jar",
    scent: "Fresh Linen & White Tea",
    description:
      "A serene blend of crisp linen and delicate white tea. Clean, airy, and endlessly calming — perfect for morning rituals and quiet evenings.",
    price: "31,500 IQD",
    images: ["/candles/candle1.png", "/candles/candle2.png"],
    tag: "Bestseller",
    colors: ["#F5F0E8", "#2C2926", "#C4B49A", "#C4754A"],
    occasions: ["Housewarming", "Birthday", "Self-Care"],
  },
  {
    id: 2,
    name: "Cozy Wood Wick",
    scent: "Sandalwood & Vanilla",
    description:
      "Rich sandalwood meets creamy Madagascar vanilla, accompanied by the gentle crackle of a natural wood wick. Warmth, bottled.",
    price: "37,000 IQD",
    images: ["/candles/candle2.png", "/candles/candle3.png"],
    tag: "New",
    colors: ["#8B6F4E", "#2C2926", "#F5F0E8"],
    occasions: ["Anniversary", "Weddings", "Date Night"],
  },
  {
    id: 3,
    name: "Midnight Pillar",
    scent: "Oud & Dark Amber",
    description:
      "An opulent fusion of rare oud wood and smoldering dark amber. Mysterious, sophisticated, and utterly unforgettable.",
    price: "42,000 IQD",
    images: ["/candles/candle3.png", "/candles/candle4.png"],
    tag: null,
    colors: ["#1A1714", "#4A3728", "#8B6F4E"],
    occasions: ["Anniversary", "Luxury Gift", "Weddings"],
  },
  {
    id: 4,
    name: "Golden Tealights",
    scent: "Citrus & Neroli",
    description:
      "Bright Sicilian citrus brightened by the ethereal sweetness of neroli blossom. A burst of Mediterranean sunshine in every flicker.",
    price: "24,000 IQD",
    images: ["/candles/candle4.png", "/candles/candle1.png"],
    tag: "Popular",
    colors: ["#B8843A", "#F5F0E8", "#C4754A"],
    occasions: ["Birthday", "Thank You", "Newborn Baby"],
  },
  {
    id: 5,
    name: "Lavender Ceramic",
    scent: "Lavender & Sea Salt",
    description:
      "French lavender fields meet the briny freshness of coastal sea salt. Deeply relaxing and beautifully grounding.",
    price: "34,000 IQD",
    images: ["/candles/candle5.png", "/candles/candle6.png"],
    tag: null,
    colors: ["#9B8BB4", "#F5F0E8", "#C4B49A"],
    occasions: ["Self-Care", "Housewarming", "Newborn Baby"],
  },
  {
    id: 6,
    name: "Citrus Amber",
    scent: "Bergamot & Warm Cedar",
    description:
      "Italian bergamot zest layered over warm Virginia cedar. A sophisticated unisex scent that fills any room with quiet confidence.",
    price: "29,000 IQD",
    images: ["/candles/candle6.png", "/candles/candle5.png"],
    tag: "New",
    colors: ["#C4754A", "#2C2926", "#A89880"],
    occasions: ["Weddings", "Anniversary", "Housewarming"],
  },
];

const giftProducts = [
  {
    id: "g1",
    name: "Luxury Discovery Set",
    description:
      "Four signature scents in travel-size vessels, presented in an elegant linen gift box.",
    price: "89,000 IQD",
    image: "/gifts/discovery-set.png",
    tag: "Bestseller",
  },
  {
    id: "g2",
    name: "Matte Black Wick Trimmer",
    description:
      "Precision-forged stainless steel with a velvety matte finish. An essential ritual tool.",
    price: "31,500 IQD",
    image: "/gifts/wick-trimmer.png",
    tag: null,
  },
  {
    id: "g3",
    name: "Custom Apothecary Matches",
    description:
      "Hand-tipped safety matches in a botanical-print apothecary box.",
    price: "21,000 IQD",
    image: "/gifts/matches.png",
    tag: "New",
  },
];

const floralProducts = [
  {
    id: "f1",
    name: "Dried Eucalyptus Bundle",
    botanical: "Eucalyptus cinerea",
    description: "Silvery-green preserved eucalyptus, hand-tied with natural twine. Lasts for months.",
    price: "55,000 IQD",
    image: "/florals/eucalyptus.png",
  },
  {
    id: "f2",
    name: "Fresh Peonies Bouquet",
    botanical: "Paeonia lactiflora",
    description: "Lush, romantic blush peonies wrapped in kraft paper. Seasonal and stunning.",
    price: "76,000 IQD",
    image: "/florals/peonies.png",
  },
  {
    id: "f3",
    name: "Lavender & Pampas Grass",
    botanical: "Lavandula & Cortaderia",
    description: "Dried French lavender paired with fluffy pampas plumes. Effortless elegance.",
    price: "63,000 IQD",
    image: "/florals/lavender-pampas.png",
  },
];

const marqueeItems = [
  "Small-batch handpoured",
  "100% natural soy wax",
  "Cotton & wood wicks",
  "Phthalate-free fragrance",
  "Cruelty free",
  "Free shipping over 90,000 IQD",
  "Gift wrapping available",
  "Recyclable packaging",
];

// ─── Scroll Reveal Hook ───────────────────────────────────────────────────────

function useScrollReveal(rootRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elements = rootRef.current?.querySelectorAll(".reveal") ?? [];

    if (prefersReduced) {
      elements.forEach((el) => el.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -48px 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [rootRef]);
}

// ─── Sticky navbar scroll state ───────────────────────────────────────────────
function useNavbarScrolled(): boolean {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return scrolled;
}

// ─── Toast Hook ───────────────────────────────────────────────────────────────
function useToast() {
  const [toast, setToast] = useState<{ msg: string; id: number } | null>(null);

  const showToast = useCallback((msg: string) => {
    const id = Date.now();
    setToast({ msg, id });
    setTimeout(() => setToast(null), 2400);
  }, []);

  return { toast, showToast };
}

// ─── Hero Carousel ────────────────────────────────────────────────────────────

function HeroCarousel({ onShopClick }: { onShopClick: () => void }) {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (animating) return;
      setAnimating(true);
      setCurrent(index);
      setTimeout(() => setAnimating(false), 1000);
    },
    [animating]
  );

  useEffect(() => {
    const t = setInterval(() => {
      goTo((current + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(t);
  }, [current, goTo]);

  const titleLines = heroSlides[current].label.split("\n");

  return (
    <section className="hero-section" aria-label="Hero — Featured collection">
      {/* Left editorial */}
      <div className="hero-editorial">
        <p className="hero-eyebrow">Aura — Handcrafted Luxury</p>
        <h1 className="hero-title">
          {titleLines[0]}
          <br />
          <em>{titleLines[1]}</em>
        </h1>
        <p className="hero-sub">
          Premium handcrafted scents, curated gifts, and botanical arrangements
          — designed to transform everyday moments into something extraordinary.
        </p>
        <div className="hero-actions">
          <button className="btn-primary" onClick={onShopClick}>
            Shop the Collection →
          </button>
          <a href="#about" className="btn-ghost">
            Our Story
          </a>
        </div>
        {/* Trust micro-badges */}
        <div className="hero-trust">
          <div className="hero-trust-item">
            <span className="hero-trust-icon">🚚</span> Free Shipping
          </div>
          <div className="hero-trust-item">
            <span className="hero-trust-icon">↩️</span> Free Returns
          </div>
          <div className="hero-trust-item">
            <span className="hero-trust-icon">🔒</span> Secure Checkout
          </div>
        </div>
        <div className="hero-scroll-hint">
          <span className="hero-scroll-line" />
          Scroll to explore
        </div>
        <div className="hero-float-badge">
          <span>🌿</span> 100% Natural Ingredients
        </div>
      </div>

      {/* Right image panel */}
      <div className="hero-image-panel">
        <div className="hero-slides">
          {heroSlides.map((slide, i) => (
            <div key={i} className={`hero-slide ${i === current ? "active" : ""}`}>
              <Image
                src={slide.src}
                alt={slide.label}
                fill
                priority={i === 0}
                className="hero-img"
                sizes="50vw"
              />
              <div className="hero-overlay" />
            </div>
          ))}
        </div>
        <div className="hero-dots" role="tablist" aria-label="Slide navigation">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={`Go to slide ${i + 1}`}
              className={`hero-dot ${i === current ? "active" : ""}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Newsletter Popup ─────────────────────────────────────────────────────────

function NewsletterPopup() {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem("aura-nl-seen")) {
      const t = setTimeout(() => {
        setVisible(true);
        sessionStorage.setItem("aura-nl-seen", "1");
      }, 9000);
      return () => clearTimeout(t);
    }
  }, []);

  const close = useCallback(() => {
    setClosing(true);
    setTimeout(() => { setVisible(false); setClosing(false); }, 300);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="newsletter-backdrop"
      onClick={close}
      style={closing ? { opacity: 0, transition: "opacity 0.3s ease" } : {}}
    >
      <div
        className="newsletter-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal
        aria-label="Newsletter signup"
        style={closing ? { opacity: 0, transform: "translateY(12px)", transition: "all 0.3s ease" } : {}}
      >
        <button className="newsletter-close" onClick={close} aria-label="Close">✕</button>
        <div className="newsletter-emoji">🕯️</div>
        <h3 className="newsletter-title">Get 10% Off</h3>
        <p className="newsletter-desc">
          Subscribe for exclusive offers, new arrivals, and a 10% discount on your first order.
        </p>
        <div className="newsletter-form">
          <input type="email" className="newsletter-input" placeholder="your@email.com" aria-label="Email" />
          <button className="newsletter-submit" type="button">Subscribe</button>
        </div>
      </div>
    </div>
  );
}

// ─── Quick View Panel ─────────────────────────────────────────────────────────

function QuickViewPanel({
  product,
  onClose,
  onAddToCart,
}: {
  product: (typeof products)[0];
  onClose: () => void;
  onAddToCart: (name: string) => void;
}) {
  const [selectedColor, setSelectedColor] = useState(0);
  const [closing, setClosing] = useState(false);

  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(onClose, 300);
  }, [onClose]);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    document.addEventListener("keydown", onEsc);
    document.body.classList.add("quickview-open");
    return () => {
      document.removeEventListener("keydown", onEsc);
      document.body.classList.remove("quickview-open");
    };
  }, [handleClose]);

  return (
    <>
      <div
        className="quickview-backdrop"
        onClick={handleClose}
        style={closing ? { opacity: 0, transition: "opacity 0.25s ease" } : {}}
      />
      <div
        className={`quickview-panel ${closing ? "closing" : ""}`}
        role="dialog"
        aria-modal
        aria-label={`Quick view: ${product.name}`}
      >
        <button className="quickview-close" onClick={handleClose} aria-label="Close quick view">✕</button>

        <div className="quickview-image">
          <Image src={product.images[0]} alt={product.name} fill className="product-img" sizes="520px" />
        </div>

        <div className="quickview-content">
          <span className="quickview-eyebrow">Signature Collection</span>
          <h3 className="quickview-name">{product.name}</h3>
          <p className="quickview-scent">{product.scent}</p>
          <p className="quickview-desc">{product.description}</p>

          <span className="quickview-price">{product.price}</span>

          <div>
            <p className="quickview-label">Available Colors</p>
            <div className="quickview-colors">
              {product.colors.map((c, i) => (
                <button
                  key={i}
                  className={`color-swatch ${selectedColor === i ? "selected" : ""}`}
                  style={{ background: c, border: "2.5px solid " + (c === "#FFFFFF" || c === "#F5F0E8" ? "#E5E7EB" : "transparent") }}
                  onClick={() => setSelectedColor(i)}
                  aria-label={`Color ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <div>
            <p className="quickview-label">Perfect For</p>
            <div className="quickview-tags">
              {product.occasions.map((tag) => (
                <span key={tag} className="occasion-tag">{tag}</span>
              ))}
            </div>
          </div>

          <button
            className="quickview-add"
            onClick={() => { onAddToCart(product.name); handleClose(); }}
          >
            Add to Cart
          </button>

          <div className="trust-badges">
            <div className="trust-badge"><span className="trust-badge-icon">🔒</span> Secure Payment</div>
            <div className="trust-badge"><span className="trust-badge-icon">🚚</span> Free Shipping</div>
            <div className="trust-badge"><span className="trust-badge-icon">↩️</span> Easy Returns</div>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────

function ProductCard({
  product,
  index,
  onQuickView,
  onAddToCart,
}: {
  product: (typeof products)[0];
  index: number;
  onQuickView: (p: (typeof products)[0]) => void;
  onAddToCart: (name: string) => void;
}) {
  const [imgIndex, setImgIndex] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);

  const delayClass = index < 3 ? `reveal-delay-${index + 1}` : "";

  const tagClass =
    product.tag === "New"
      ? "tag-new"
      : product.tag === "Popular"
        ? "tag-popular"
        : "";

  return (
    <article className={`product-card reveal ${delayClass}`}>
      {product.tag && (
        <span className={`product-tag ${tagClass}`}>{product.tag}</span>
      )}

      <button
        className={`wishlist-btn ${wishlisted ? "active" : ""}`}
        onClick={() => setWishlisted(!wishlisted)}
        aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
      >
        {wishlisted ? "♥" : "♡"}
      </button>

      <div
        className="product-img-wrap"
        role="button"
        tabIndex={0}
        aria-label={`${product.name} image`}
        onKeyDown={(e) => {
          if (e.key === "Enter") setImgIndex((imgIndex + 1) % product.images.length);
        }}
      >
        <Image
          key={imgIndex}
          src={product.images[imgIndex]}
          alt={product.name}
          fill
          loading="lazy"
          className="product-img"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="product-img-hint">
          <button
            className="product-quickview-btn"
            onClick={(e) => { e.stopPropagation(); onQuickView(product); }}
          >
            Quick View
          </button>
        </div>
        {product.images.length > 1 && (
          <div className="product-img-dots">
            {product.images.map((_, i) => (
              <span
                key={i}
                className={`product-img-dot ${i === imgIndex ? "active" : ""}`}
                onClick={() => setImgIndex(i)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="product-info">
        <p className="product-number">No. {String(index + 1).padStart(2, "0")}</p>
        <div>
          <h3 className="product-name">{product.name}</h3>
          <p className="product-scent">{product.scent}</p>
        </div>
        {!product.tag && (
          <div className="stock-indicator">
            <span className="stock-dot" />
            Low Stock
          </div>
        )}
        <div className="product-bottom">
          <span className="product-price">{product.price}</span>
          <button
            className="btn-add"
            onClick={() => onAddToCart(product.name)}
            aria-label={`Add ${product.name} to cart`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}

// ─── Gift Card ────────────────────────────────────────────────────────────────

function GiftCard({
  product,
  onAddToCart,
}: {
  product: (typeof giftProducts)[0];
  onAddToCart: (name: string) => void;
}) {
  return (
    <article className="gift-card">
      {product.tag && <span className="gift-card-tag">{product.tag}</span>}
      <div className="gift-card-img-wrap">
        <Image
          src={product.image}
          alt={product.name}
          fill
          loading="lazy"
          className="gift-card-img"
          sizes="(max-width: 640px) 100vw, 40vw"
        />
      </div>
      <div className="gift-card-info">
        <h3 className="gift-card-name">{product.name}</h3>
        <p className="gift-card-desc">{product.description}</p>
        <div className="gift-card-bottom">
          <span className="gift-card-price">{product.price}</span>
          <button
            className="btn-add-gift"
            onClick={() => onAddToCart(product.name)}
            aria-label={`Add ${product.name} to cart`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}

// ─── Toast Component ──────────────────────────────────────────────────────────

function Toast({ msg }: { msg: string }) {
  return (
    <div className="toast" role="status" aria-live="polite">
      <span className="toast-icon">✓</span>
      {msg} added to cart
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [quickViewProduct, setQuickViewProduct] = useState<(typeof products)[0] | null>(null);
  const [activeProductIndex, setActiveProductIndex] = useState(3);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartBouncing, setCartBouncing] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const navScrolled = useNavbarScrolled();
  const { toast, showToast } = useToast();

  useScrollReveal(rootRef);

  const handleAddToCart = useCallback((name: string) => {
    showToast(name);
    setCartBouncing(true);
    setTimeout(() => setCartBouncing(false), 500);
  }, [showToast]);

  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

  const scrollToCollection = useCallback(() => {
    document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div ref={rootRef}>
      {/* ── Navbar ── */}
      <nav className={`navbar ${navScrolled ? "scrolled" : ""}`} role="navigation">
        <Link href="/" className="navbar-logo">
          Aura<span className="logo-dot" />
        </Link>
        <ul className="navbar-links">
          <li><a href="#collection">Candles</a></li>
          <li><a href="#gifts">Gifts</a></li>
          <li><a href="#florals">Florals</a></li>
          <li><a href="#about">Our Story</a></li>
        </ul>
        <div className="navbar-actions">
          <button
            className={`navbar-cart ${cartBouncing ? "bounce" : ""}`}
            aria-label="Shopping cart"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            Cart (0)
          </button>
          <button
            className={`mobile-menu-btn ${mobileMenuOpen ? "open" : ""}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile nav */}
      <div className={`mobile-nav ${mobileMenuOpen ? "open" : ""}`} role="dialog" aria-label="Mobile navigation">
        <a href="#collection" onClick={closeMobileMenu}>Candles</a>
        <a href="#gifts" onClick={closeMobileMenu}>Gifts</a>
        <a href="#florals" onClick={closeMobileMenu}>Florals</a>
        <a href="#about" onClick={closeMobileMenu}>Our Story</a>
      </div>

      {/* ── Hero ── */}
      <HeroCarousel onShopClick={scrollToCollection} />

      {/* ── Marquee strip ── */}
      <div className="marquee-section" aria-hidden="true">
        <div className="marquee-track">
          {Array.from({ length: 2 })
            .flatMap(() => marqueeItems)
            .map((text, i) => (
              <span key={i} className="marquee-item">
                {text}<span className="marquee-dot" />
              </span>
            ))}
        </div>
      </div>

      {/* ── Features strip ── */}
      <div className="features-section" role="list" aria-label="Our promises">
        {[
          { icon: "🌿", title: "Natural Soy Wax", desc: "100% clean-burning, sustainably sourced soy wax blend." },
          { icon: "🔥", title: "Wood & Cotton Wicks", desc: "Slow, even burns with an authentic gentle crackle." },
          { icon: "🌸", title: "Phthalate-Free", desc: "Premium fragrance oils — safe for you and your home." },
          { icon: "♻️", title: "Eco Packaging", desc: "All packaging is 100% recyclable or compostable." },
        ].map((feat) => (
          <div key={feat.title} className="feature-item reveal" role="listitem">
            <span className="feature-icon">{feat.icon}</span>
            <p className="feature-title">{feat.title}</p>
            <p className="feature-desc">{feat.desc}</p>
          </div>
        ))}
      </div>

      {/* ── Signature Collection ── */}
      <section id="collection" className="collection-section">
        <div className="collection-header">
          <div className="reveal">
            <p className="section-eyebrow">Signature Collection</p>
            <h2 className="section-title">Curated for <em>Every Mood</em></h2>
          </div>
          <div className="collection-filters reveal reveal-delay-1">
            {["All", "Bestsellers", "New Arrivals", "Gifts"].map((f, i) => (
              <button key={f} className={`filter-chip${i === 0 ? " active" : ""}`}>{f}</button>
            ))}
          </div>
        </div>
        <p className="section-sub reveal" style={{ marginBottom: "2rem" }}>
          Each candle is hand-poured with intention — crafted to fill your home with warmth, memory, and beauty.
        </p>
        <div style={{ marginBottom: "3rem", width: "100%", overflow: "hidden" }}>
          <SocialCards 
            cards={products.map(p => ({ imgUrl: p.images[0], alt: p.name }))} 
            onActiveChange={setActiveProductIndex}
            onCardClick={(index) => setQuickViewProduct(products[index])}
          />
        </div>
        
        {products[activeProductIndex] && (
          <div className="reveal" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", maxWidth: "400px", margin: "0 auto 4rem auto" }}>
            <p className="product-number" style={{ marginBottom: "0.5rem" }}>No. {String(activeProductIndex + 1).padStart(2, "0")}</p>
            <h3 className="product-name" style={{ fontSize: "1.5rem", marginBottom: "0.25rem" }}>{products[activeProductIndex].name}</h3>
            <p className="product-scent" style={{ marginBottom: "1rem" }}>{products[activeProductIndex].scent}</p>
            
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1.5rem", marginTop: "1rem", width: "100%" }}>
              <span className="product-price" style={{ fontSize: "1.2rem", fontWeight: 500, color: "var(--text-main)" }}>{products[activeProductIndex].price}</span>
              <button
                className="btn-add"
                onClick={() => handleAddToCart(products[activeProductIndex].name)}
                aria-label={`Add ${products[activeProductIndex].name} to cart`}
              >
                Add to Cart
              </button>
            </div>
            <button 
              className="btn-secondary" 
              style={{ marginTop: "1.5rem", fontSize: "0.8rem", padding: "0.5rem 1.25rem", borderRadius: "100px", border: "1px solid var(--border-light)", color: "var(--text-muted)" }}
              onClick={() => setQuickViewProduct(products[activeProductIndex])}
            >
              Quick View
            </button>
          </div>
        )}
      </section>

      {/* ── Gift Shop ── */}
      <section id="gifts" className="giftshop-section">
        <div className="giftshop-header">
          <div className="reveal">
            <p className="section-eyebrow">The Gift Shop</p>
            <h2 className="section-title">Give the Gift of <em>Glow</em></h2>
          </div>
          <p className="section-sub reveal reveal-delay-1">
            Thoughtfully curated accessories and sets — because the best gifts come wrapped in warmth.
          </p>
        </div>
        <div className="giftshop-grid">
          <div className="giftshop-featured reveal">
            <GiftCard product={giftProducts[0]} onAddToCart={handleAddToCart} />
          </div>
          <div className="giftshop-stack">
            <div className="reveal reveal-delay-1">
              <GiftCard product={giftProducts[1]} onAddToCart={handleAddToCart} />
            </div>
            <div className="reveal reveal-delay-2">
              <GiftCard product={giftProducts[2]} onAddToCart={handleAddToCart} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Florals ── */}
      <section id="florals" className="floral-section">
        <div className="floral-header reveal">
          <p className="section-eyebrow">Botanical Studio</p>
          <h2 className="section-title">Floral <em>Arrangements</em></h2>
          <p className="section-sub">
            Hand-selected blooms and dried botanicals — each arrangement is a living work of art for your space.
          </p>
        </div>
        <div className="floral-grid">
          {floralProducts.map((p, i) => (
            <article key={p.id} className={`floral-card reveal reveal-delay-${i + 1}`}>
              <div className="floral-card-img-wrap">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  loading="lazy"
                  className="floral-card-img"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </div>
              <div className="floral-card-info">
                <span className="floral-card-botanical">{p.botanical}</span>
                <h3 className="floral-card-name">{p.name}</h3>
                <p className="floral-card-desc">{p.description}</p>
                <div className="floral-card-bottom">
                  <span className="floral-card-price">{p.price}</span>
                  <button className="btn-add-floral" onClick={() => handleAddToCart(p.name)}>Add to Cart</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="about-section">
        <div className="about-img-side">
          <Image
            src="/candles/candle4.png"
            alt="Hand-pouring candles at Aura studio"
            fill
            loading="lazy"
            className="about-img"
            sizes="50vw"
          />
        </div>
        <div className="about-content-side">
          <p className="section-eyebrow reveal">Our Story</p>
          <h2 className="section-title reveal">
            Made with care,<br />
            <em>lit with love.</em>
          </h2>
          <p className="about-body reveal">
            Aura began as a small kitchen project inspired by the belief that a single flickering candle
            can transform a room — and a mood. Every candle in our collection is hand-poured in small
            batches using 100% natural soy wax, sustainably sourced botanicals, and the finest fragrance oils.
          </p>
          <div className="about-stat-row reveal">
            {[
              { num: "6+", label: "Years of craft" },
              { num: "40k", label: "Happy homes" },
              { num: "100%", label: "Natural ingredients" },
            ].map((s) => (
              <div key={s.label}>
                <div className="about-stat-num">{s.num}</div>
                <div className="about-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
          <button
            className="btn-primary reveal"
            style={{ alignSelf: "flex-start" }}
            onClick={scrollToCollection}
          >
            Shop Now →
          </button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer">
        <div>
          <p className="footer-logo">Aura<span className="logo-dot" /></p>
          <p className="footer-desc">
            Handcrafted luxury scents, curated gifts, and botanical arrangements — designed to
            transform your everyday moments into something extraordinary.
          </p>
          <div className="footer-social">
            <a href="#" aria-label="Instagram">Instagram</a>
            <a href="#" aria-label="Pinterest">Pinterest</a>
            <a href="#" aria-label="TikTok">TikTok</a>
          </div>
        </div>
        <div>
          <p className="footer-heading">Shop</p>
          <ul className="footer-links">
            <li><a href="#collection">Candles</a></li>
            <li><a href="#gifts">Gift Shop</a></li>
            <li><a href="#florals">Florals</a></li>
            <li><a href="#">Accessories</a></li>
          </ul>
        </div>
        <div>
          <p className="footer-heading">Contact</p>
          <ul className="footer-links">
            <li><a href="#">hello@auracandles.com</a></li>
            <li><a href="#">+1 (555) 000-0000</a></li>
            <li><a href="#">Press Enquiries</a></li>
          </ul>
        </div>
        <div>
          <p className="footer-heading">Policies</p>
          <ul className="footer-links">
            <li><a href="#">Shipping</a></li>
            <li><a href="#">Returns</a></li>
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Terms</a></li>
          </ul>
        </div>
        <div className="footer-newsletter">
          <p className="footer-newsletter-text">Stay in the loop — get offers & new arrivals.</p>
          <div className="footer-newsletter-form">
            <input type="email" className="footer-newsletter-input" placeholder="your@email.com" aria-label="Email for newsletter" />
            <button className="footer-newsletter-btn" type="button">Subscribe</button>
          </div>
        </div>
      </footer>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Aura Candles. All rights reserved.</span>
        <span>Handpoured with ♡ in small batches.</span>
      </div>

      {/* ── Modals & Notifications ── */}
      {quickViewProduct && (
        <QuickViewPanel
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}
      <NewsletterPopup />
      {toast && <Toast msg={toast.msg} />}
    </div>
  );
}
