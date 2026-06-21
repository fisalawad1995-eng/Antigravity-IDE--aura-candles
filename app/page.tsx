"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback, useRef } from "react";

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
      "Four signature scents in travel-size vessels, presented in an elegant linen gift box. The perfect introduction to our world.",
    price: "89,000 IQD",
    image: "/gifts/discovery-set.png",
    tag: "Bestseller",
  },
  {
    id: "g2",
    name: "Matte Black Wick Trimmer",
    description:
      "Precision-forged stainless steel with a velvety matte finish. An essential ritual tool for the discerning candle lover.",
    price: "31,500 IQD",
    image: "/gifts/wick-trimmer.png",
    tag: null,
  },
  {
    id: "g3",
    name: "Custom Apothecary Matches",
    description:
      "Hand-tipped safety matches in a botanical-print apothecary box. Striking in every sense of the word.",
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
    description: "Dried French lavender paired with fluffy pampas plumes. Effortless boho elegance.",
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

// ─── Hero Carousel ────────────────────────────────────────────────────────────

function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (animating) return;
      setAnimating(true);
      setCurrent(index);
      setTimeout(() => setAnimating(false), 1200);
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
    <section className="hero-section" aria-label="Featured collection">
      {/* Left editorial panel */}
      <div className="hero-editorial">
        <p className="hero-eyebrow">Aura — Candles · Gifts · Florals</p>
        <h1 className="hero-title">
          {titleLines[0]}
          <br />
          <em>{titleLines[1]}</em>
        </h1>
        <p className="hero-sub">
          Premium handcrafted scents, curated gifts, and botanical arrangements
          — designed to transform your space into a sanctuary.
        </p>
        <div className="hero-actions">
          <a href="#collection" className="btn-primary">
            Explore the Collection
          </a>
          <a href="#about" className="btn-ghost">
            Our Story →
          </a>
        </div>
        <div className="hero-scroll-hint">
          <span className="hero-scroll-line" />
          Scroll
        </div>
        <div className="hero-float-badge">
          <span className="badge-icon">🌿</span>
          <span className="badge-text">100% Natural</span>
        </div>
      </div>

      {/* Right image panel */}
      <div className="hero-image-panel">
        <div className="hero-slides">
          {heroSlides.map((slide, i) => (
            <div
              key={i}
              className={`hero-slide ${i === current ? "active" : ""}`}
            >
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

        {/* Dot navigation */}
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

// ─── Quick View Panel ─────────────────────────────────────────────────────────

function QuickViewPanel({
  product,
  onClose,
}: {
  product: (typeof products)[0];
  onClose: () => void;
}) {
  const [selectedColor, setSelectedColor] = useState(0);
  const [closing, setClosing] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      onClose();
    }, 350);
  }, [onClose]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleEsc);
    document.body.classList.add("quickview-open");
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.classList.remove("quickview-open");
    };
  }, [handleClose]);

  return (
    <>
      <div
        className="quickview-backdrop"
        onClick={handleClose}
        style={closing ? { opacity: 0, transition: "opacity 0.3s ease" } : {}}
      />
      <div
        ref={panelRef}
        className={`quickview-panel ${closing ? "closing" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={`Quick view: ${product.name}`}
      >
        <button
          className="quickview-close"
          onClick={handleClose}
          aria-label="Close quick view"
        >
          ✕
        </button>

        <div className="quickview-image">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="product-img"
            sizes="520px"
          />
        </div>

        <div className="quickview-content">
          <span className="quickview-eyebrow">Signature Collection</span>
          <h3 className="quickview-name">{product.name}</h3>
          <p className="quickview-scent">{product.scent}</p>
          <p className="quickview-desc">{product.description}</p>

          <span className="quickview-price">{product.price}</span>

          {/* Color Swatches */}
          <div>
            <p className="quickview-label">Available Colors</p>
            <div className="quickview-colors">
              {product.colors.map((color, i) => (
                <button
                  key={i}
                  className={`color-swatch ${selectedColor === i ? "selected" : ""}`}
                  style={{ background: color }}
                  onClick={() => setSelectedColor(i)}
                  aria-label={`Select color ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Occasion Tags */}
          <div>
            <p className="quickview-label">Perfect For</p>
            <div className="quickview-tags">
              {product.occasions.map((tag) => (
                <span key={tag} className="occasion-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <button
            className="quickview-add"
            aria-label={`Add ${product.name} to cart`}
          >
            Add to Cart
          </button>
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
}: {
  product: (typeof products)[0];
  index: number;
  onQuickView: (product: (typeof products)[0]) => void;
}) {
  const [imgIndex, setImgIndex] = useState(0);

  return (
    <article className="product-card">
      {product.tag && <span className="product-tag">{product.tag}</span>}

      <div
        className="product-img-wrap"
        role="button"
        tabIndex={0}
        aria-label={`${product.name} — click to change photo`}
      >
        <Image
          key={imgIndex}
          src={product.images[imgIndex]}
          alt={product.name}
          fill
          className="product-img"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="product-img-hint">
          <button
            className="product-quickview-btn"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
          >
            Quick View
          </button>
          <span
            style={{
              fontSize: "0.62rem",
              letterSpacing: "0.15em",
              opacity: 0.7,
              cursor: "pointer",
            }}
            onClick={(e) => {
              e.stopPropagation();
              setImgIndex((imgIndex + 1) % product.images.length);
            }}
          >
            ↻ Alternate View
          </span>
        </div>
        <div className="product-img-dots">
          {product.images.map((_, i) => (
            <span
              key={i}
              className={`product-img-dot ${i === imgIndex ? "active" : ""}`}
            />
          ))}
        </div>
      </div>

      <div className="product-info">
        <p className="product-number">
          No. {String(index + 1).padStart(2, "0")}
        </p>
        <div>
          <h3 className="product-name">{product.name}</h3>
          <p className="product-scent">{product.scent}</p>
        </div>
        <div className="product-bottom">
          <span className="product-price">{product.price}</span>
          <button
            className="btn-add"
            aria-label={`Add ${product.name} to cart`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}

// ─── Gift Shop Section ────────────────────────────────────────────────────────

function GiftShopSection() {
  return (
    <section id="gifts" className="giftshop-section">
      <div className="giftshop-header">
        <div>
          <p className="section-eyebrow">The Gift Shop</p>
          <h2 className="section-title">
            Give the Gift of <em>Glow</em>
          </h2>
        </div>
        <p className="section-sub">
          Thoughtfully curated accessories and sets — because the best gifts
          come wrapped in warmth.
        </p>
      </div>
      <div className="giftshop-divider" />

      <div className="giftshop-grid">
        {/* Featured large card */}
        <div className="giftshop-featured">
          <GiftCard product={giftProducts[0]} />
        </div>

        {/* Stacked smaller cards */}
        <div className="giftshop-stack">
          <GiftCard product={giftProducts[1]} />
          <GiftCard product={giftProducts[2]} />
        </div>
      </div>
    </section>
  );
}

function GiftCard({
  product,
}: {
  product: (typeof giftProducts)[0];
}) {
  return (
    <article className="gift-card">
      {product.tag && <span className="gift-card-tag">{product.tag}</span>}
      <div className="gift-card-img-wrap">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="gift-card-img"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
        />
      </div>
      <div className="gift-card-info">
        <h3 className="gift-card-name">{product.name}</h3>
        <p className="gift-card-desc">{product.description}</p>
        <div className="gift-card-bottom">
          <span className="gift-card-price">{product.price}</span>
          <button
            className="btn-add-gift"
            aria-label={`Add ${product.name} to cart`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}

// ─── Floral Section ───────────────────────────────────────────────────────────

function FloralSection() {
  return (
    <section id="florals" className="floral-section">
      <div className="floral-header">
        <p className="section-eyebrow">Botanical Studio</p>
        <h2 className="section-title">
          Floral <em>Arrangements</em>
        </h2>
        <p className="section-sub">
          Hand-selected blooms and dried botanicals — each arrangement is a
          living work of art for your space.
        </p>
      </div>

      <div className="floral-grid">
        {floralProducts.map((product) => (
          <article key={product.id} className="floral-card">
            <div className="floral-card-img-wrap">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="floral-card-img"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="floral-card-info">
              <span className="floral-card-botanical">
                {product.botanical}
              </span>
              <h3 className="floral-card-name">{product.name}</h3>
              <p className="floral-card-desc">{product.description}</p>
              <div className="floral-card-bottom">
                <span className="floral-card-price">{product.price}</span>
                <button
                  className="btn-add-floral"
                  aria-label={`Add ${product.name} to cart`}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [quickViewProduct, setQuickViewProduct] = useState<
    (typeof products)[0] | null
  >(null);

  return (
    <>
      {/* ── Navbar ── */}
      <nav className="navbar">
        <Link href="/" className="navbar-logo">
          Aura<span> Candles</span>
        </Link>
        <ul className="navbar-links">
          <li>
            <a href="#collection">Candles</a>
          </li>
          <li>
            <a href="#gifts">Gifts</a>
          </li>
          <li>
            <a href="#florals">Florals</a>
          </li>
          <li>
            <a href="#about">Our Story</a>
          </li>
        </ul>
        <div className="navbar-actions">
          <button className="navbar-cart" aria-label="Shopping cart">
            Cart (0)
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <HeroCarousel />

      {/* ── Marquee ── */}
      <div className="marquee-section" aria-hidden="true">
        <div className="marquee-track">
          {Array.from({ length: 2 })
            .flatMap(() => marqueeItems)
            .map((text, i) => (
              <span key={i} className="marquee-item">
                {text}
                <span className="marquee-dot" />
              </span>
            ))}
        </div>
      </div>

      {/* ── Signature Candles Collection ── */}
      <section id="collection" className="collection-section">
        <div className="collection-header">
          <div>
            <p className="section-eyebrow">Signature Collection</p>
            <h2 className="section-title">
              Curated for <em>Every Mood</em>
            </h2>
          </div>
          <div className="collection-filters">
            {["All", "Bestsellers", "New Arrivals", "Gifts"].map((f, i) => (
              <button
                key={f}
                className={`filter-chip${i === 0 ? " active" : ""}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="collection-divider" />
        <p className="section-sub" style={{ marginBottom: "3.5rem" }}>
          Each candle is hand-poured with intention — crafted to fill your home
          with warmth, memory, and beauty.
        </p>

        <div className="product-grid">
          {products.map((p, i) => (
            <ProductCard
              key={p.id}
              product={p}
              index={i}
              onQuickView={setQuickViewProduct}
            />
          ))}
        </div>
      </section>

      {/* ── Features Strip ── */}
      <div className="features-section">
        {[
          {
            icon: "🌿",
            title: "Natural Soy Wax",
            desc: "100% clean-burning, sustainably sourced soy wax blend.",
          },
          {
            icon: "🔥",
            title: "Wood & Cotton Wicks",
            desc: "Slow, even burns with a gentle, authentic crackle.",
          },
          {
            icon: "🌸",
            title: "Phthalate-Free",
            desc: "Premium fragrance oils, safe for you and your home.",
          },
          {
            icon: "♻️",
            title: "Eco Packaging",
            desc: "All packaging is recyclable or compostable.",
          },
        ].map((feat) => (
          <div key={feat.title} className="feature-item">
            <div className="feature-icon">{feat.icon}</div>
            <p className="feature-title">{feat.title}</p>
            <p className="feature-desc">{feat.desc}</p>
          </div>
        ))}
      </div>

      {/* ── Gift Shop ── */}
      <GiftShopSection />

      {/* ── Floral Arrangements ── */}
      <FloralSection />

      {/* ── About ── */}
      <section id="about" className="about-section">
        <div className="about-img-side">
          <Image
            src="/candles/candle4.png"
            alt="The Aura Candles story — candles being hand-poured"
            fill
            className="about-img"
            sizes="50vw"
          />
        </div>
        <div className="about-content-side">
          <p className="section-eyebrow">Our Story</p>
          <h2 className="section-title">
            Made with care,
            <br />
            <em>lit with love.</em>
          </h2>
          <p className="about-body">
            Aura began as a small kitchen project inspired by the belief that a
            single flickering candle can transform a room — and a mood. Every
            candle in our collection is hand-poured in small batches using 100%
            natural soy wax, sustainably sourced botanicals, and the finest
            fragrance oils.
          </p>
          <div className="about-stat-row">
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
          <a
            href="#"
            className="btn-primary"
            style={{ alignSelf: "flex-start", marginTop: "1rem" }}
          >
            Discover More
          </a>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer">
        <div>
          <p className="footer-logo">
            Aura<span> Candles</span>
          </p>
          <p className="footer-desc">
            Handcrafted luxury scents, curated gifts, and botanical arrangements
            — designed to transform your everyday moments into something
            extraordinary.
          </p>
          <div className="footer-social">
            <a href="#">Instagram</a>
            <a href="#">Pinterest</a>
            <a href="#">TikTok</a>
          </div>
        </div>
        <div>
          <p className="footer-heading">Shop</p>
          <ul className="footer-links">
            <li>
              <a href="#collection">Candles</a>
            </li>
            <li>
              <a href="#gifts">Gift Shop</a>
            </li>
            <li>
              <a href="#florals">Florals</a>
            </li>
            <li>
              <a href="#">Accessories</a>
            </li>
          </ul>
        </div>
        <div>
          <p className="footer-heading">Contact</p>
          <ul className="footer-links">
            <li>
              <a href="#">hello@auracandles.com</a>
            </li>
            <li>
              <a href="#">+1 (555) 000-0000</a>
            </li>
            <li>
              <a href="#">Press Enquiries</a>
            </li>
          </ul>
        </div>
        <div>
          <p className="footer-heading">Policies</p>
          <ul className="footer-links">
            <li>
              <a href="#">Shipping</a>
            </li>
            <li>
              <a href="#">Returns</a>
            </li>
            <li>
              <a href="#">Privacy</a>
            </li>
            <li>
              <a href="#">Terms</a>
            </li>
          </ul>
        </div>
      </footer>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} Aura Candles. All rights reserved.
        </span>
        <span>Handpoured with ♡ in small batches.</span>
      </div>

      {/* ── Quick View Modal ── */}
      {quickViewProduct && (
        <QuickViewPanel
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </>
  );
}
