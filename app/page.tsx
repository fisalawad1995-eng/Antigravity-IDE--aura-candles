"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const heroSlides = [
  { src: "/candles/candle1.png", label: "Illuminate Every Moment" },
  { src: "/candles/candle2.png", label: "Minimalist Elegance" },
  { src: "/candles/candle3.png", label: "Botanically Inspired" },
];

const products = [
  {
    id: 1,
    name: "Minimalist Jar",
    scent: "Fresh Linen & White Tea",
    price: "$24.00",
    images: ["/candles/candle1.png", "/candles/candle2.png"],
    tag: "Bestseller",
  },
  {
    id: 2,
    name: "Cozy Wood Wick",
    scent: "Sandalwood & Vanilla",
    price: "$28.00",
    images: ["/candles/candle2.png", "/candles/candle3.png"],
    tag: "New",
  },
  {
    id: 3,
    name: "Midnight Pillar",
    scent: "Oud & Dark Amber",
    price: "$32.00",
    images: ["/candles/candle3.png", "/candles/candle4.png"],
    tag: null,
  },
  {
    id: 4,
    name: "Golden Tealights",
    scent: "Citrus & Neroli",
    price: "$18.00",
    images: ["/candles/candle4.png", "/candles/candle1.png"],
    tag: "Popular",
  },
  {
    id: 5,
    name: "Lavender Ceramic",
    scent: "Lavender & Sea Salt",
    price: "$26.00",
    images: ["/candles/candle5.png", "/candles/candle6.png"],
    tag: null,
  },
  {
    id: 6,
    name: "Citrus Amber",
    scent: "Bergamot & Warm Cedar",
    price: "$22.00",
    images: ["/candles/candle6.png", "/candles/candle5.png"],
    tag: "New",
  },
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
      setTimeout(() => setAnimating(false), 700);
    },
    [animating]
  );

  useEffect(() => {
    const t = setInterval(() => {
      goTo((current + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(t);
  }, [current, goTo]);

  return (
    <section className="hero-section" aria-label="Featured collection">
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
              sizes="100vw"
            />
            <div className="hero-overlay" />
          </div>
        ))}
      </div>

      <div className="hero-content">
        <p className="hero-eyebrow">Aura Candles — Artisan Collection</p>
        <h1 className="hero-title">{heroSlides[current].label}</h1>
        <p className="hero-sub">
          Premium handcrafted scents for a life beautifully lived.
        </p>
        <div className="hero-actions">
          <a href="#collection" className="btn-primary">
            Shop Now
          </a>
          <a href="#about" className="btn-ghost">
            Our Story
          </a>
        </div>
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
    </section>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────

function ProductCard({ product }: { product: (typeof products)[0] }) {
  const [imgIndex, setImgIndex] = useState(0);

  return (
    <article className="product-card">
      {product.tag && <span className="product-tag">{product.tag}</span>}

      {/* Image with click-to-cycle */}
      <div
        className="product-img-wrap"
        onClick={() => setImgIndex((imgIndex + 1) % product.images.length)}
        title="Click to see alternate view"
        role="button"
        tabIndex={0}
        onKeyDown={(e) =>
          e.key === "Enter" &&
          setImgIndex((imgIndex + 1) % product.images.length)
        }
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
          <span>&#8635; Tap to change photo</span>
        </div>

        {/* Dot indicators */}
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
        <div>
          <h3 className="product-name">{product.name}</h3>
          <p className="product-scent">{product.scent}</p>
        </div>
        <div className="product-bottom">
          <span className="product-price">{product.price}</span>
          <button className="btn-add" aria-label={`Add ${product.name} to cart`}>
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <style>{`
        /* ── Navbar ── */
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2.5rem;
          height: 68px;
          background: rgba(233,235,248,0.82);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border-bottom: 1px solid rgba(180,184,197,0.4);
        }
        .navbar-logo {
          font-size: 1.35rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #368672;
          text-decoration: none;
        }
        .navbar-links {
          display: flex;
          gap: 2rem;
          list-style: none;
        }
        .navbar-links a {
          font-size: 0.82rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #8D818C;
          text-decoration: none;
          transition: color 0.2s;
        }
        .navbar-links a:hover { color: #368672; }
        .navbar-cart {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.82rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          color: #8D818C;
          background: none;
          border: 1.5px solid #B4B8C5;
          border-radius: 999px;
          padding: 0.4rem 1rem;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s;
        }
        .navbar-cart:hover { border-color: #368672; color: #368672; }

        /* ── Hero ── */
        .hero-section {
          position: relative;
          width: 100%;
          height: 100svh;
          min-height: 560px;
          overflow: hidden;
        }
        .hero-slides { position: absolute; inset: 0; }
        .hero-slide {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.8s cubic-bezier(.4,0,.2,1);
        }
        .hero-slide.active { opacity: 1; }
        .hero-img {
          object-fit: cover;
          transition: transform 8s ease;
        }
        .hero-slide.active .hero-img { transform: scale(1.06); }
        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(54,134,114,0.55) 0%,
            rgba(141,129,140,0.35) 60%,
            rgba(0,0,0,0.15) 100%
          );
        }
        .hero-content {
          position: relative;
          z-index: 10;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 2.5rem;
          max-width: 700px;
        }
        .hero-eyebrow {
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(233,235,248,0.8);
          margin-bottom: 1rem;
        }
        .hero-title {
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 300;
          line-height: 1.08;
          letter-spacing: -0.01em;
          color: #E9EBF8;
          margin-bottom: 1.25rem;
          transition: opacity 0.5s;
        }
        .hero-sub {
          font-size: 1rem;
          font-weight: 300;
          color: rgba(233,235,248,0.75);
          max-width: 420px;
          line-height: 1.7;
          margin-bottom: 2rem;
        }
        .hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; }
        .btn-primary {
          display: inline-flex;
          align-items: center;
          padding: 0.75rem 2rem;
          border-radius: 999px;
          background: #368672;
          color: #E9EBF8;
          font-size: 0.875rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-decoration: none;
          transition: background 0.2s, transform 0.15s;
        }
        .btn-primary:hover { background: #2d7362; transform: translateY(-1px); }
        .btn-ghost {
          display: inline-flex;
          align-items: center;
          padding: 0.75rem 2rem;
          border-radius: 999px;
          border: 1.5px solid rgba(233,235,248,0.6);
          color: #E9EBF8;
          font-size: 0.875rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-decoration: none;
          transition: border-color 0.2s, background 0.2s;
        }
        .btn-ghost:hover { border-color: #E9EBF8; background: rgba(233,235,248,0.12); }
        .hero-dots {
          position: absolute;
          bottom: 2rem;
          left: 2.5rem;
          z-index: 10;
          display: flex;
          gap: 0.5rem;
        }
        .hero-dot {
          width: 28px;
          height: 3px;
          border-radius: 2px;
          border: none;
          background: rgba(233,235,248,0.35);
          cursor: pointer;
          transition: background 0.3s, width 0.3s;
          padding: 0;
        }
        .hero-dot.active { background: #E9EBF8; width: 48px; }

        /* ── Section labels ── */
        .section-label {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #368672;
          margin-bottom: 0.6rem;
        }
        .section-title {
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          font-weight: 300;
          letter-spacing: -0.01em;
          color: #2a2a2a;
          margin-bottom: 0.75rem;
        }
        .section-sub {
          font-size: 0.95rem;
          color: #8D818C;
          max-width: 460px;
          line-height: 1.7;
        }

        /* ── Collection section ── */
        .collection-section {
          padding: 6rem 2.5rem 4rem;
          background: #E9EBF8;
        }
        .collection-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 2rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }
        .collection-filters {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .filter-chip {
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          padding: 0.4rem 1.1rem;
          border-radius: 999px;
          border: 1.5px solid #B4B8C5;
          color: #8D818C;
          background: transparent;
          cursor: pointer;
          transition: all 0.2s;
        }
        .filter-chip:hover,
        .filter-chip.active {
          border-color: #368672;
          color: #368672;
          background: rgba(54,134,114,0.07);
        }

        /* ── Product grid ── */
        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 2rem;
        }

        /* ── Product card ── */
        .product-card {
          position: relative;
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 2px 12px rgba(141,129,140,0.10);
          transition: box-shadow 0.3s, transform 0.3s;
          display: flex;
          flex-direction: column;
        }
        .product-card:hover {
          box-shadow: 0 8px 32px rgba(54,134,114,0.16);
          transform: translateY(-4px);
        }
        .product-tag {
          position: absolute;
          top: 1rem;
          left: 1rem;
          z-index: 10;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          background: #368672;
          color: #E9EBF8;
          padding: 0.3rem 0.75rem;
          border-radius: 999px;
        }
        .product-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          overflow: hidden;
          cursor: pointer;
          background: #E9EBF8;
        }
        .product-img {
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(.4,0,.2,1), opacity 0.4s;
          animation: fadeIn 0.4s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(1.04); }
          to   { opacity: 1; transform: scale(1); }
        }
        .product-card:hover .product-img { transform: scale(1.05); }
        .product-img-hint {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 0.6rem 1rem;
          background: linear-gradient(to top, rgba(54,134,114,0.75), transparent);
          color: #E9EBF8;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          opacity: 0;
          transition: opacity 0.25s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .product-img-wrap:hover .product-img-hint { opacity: 1; }
        .product-img-dots {
          position: absolute;
          top: 1rem;
          right: 1rem;
          display: flex;
          gap: 4px;
          z-index: 5;
        }
        .product-img-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(233,235,248,0.5);
          transition: background 0.2s, transform 0.2s;
        }
        .product-img-dot.active {
          background: #E9EBF8;
          transform: scale(1.3);
        }
        .product-info {
          padding: 1.25rem 1.25rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          flex: 1;
        }
        .product-name {
          font-size: 1rem;
          font-weight: 600;
          color: #2a2a2a;
          margin-bottom: 0.2rem;
        }
        .product-scent {
          font-size: 0.8rem;
          color: #A5A299;
          font-style: italic;
        }
        .product-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto;
        }
        .product-price {
          font-size: 1.05rem;
          font-weight: 600;
          color: #368672;
        }
        .btn-add {
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          padding: 0.5rem 1.1rem;
          border-radius: 999px;
          border: none;
          background: #368672;
          color: #E9EBF8;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
        }
        .btn-add:hover { background: #2d7362; transform: translateY(-1px); }

        /* ── Marquee ── */
        .marquee-section {
          background: #368672;
          overflow: hidden;
          padding: 1rem 0;
        }
        .marquee-track {
          display: flex;
          white-space: nowrap;
          animation: marquee 24s linear infinite;
        }
        .marquee-item {
          display: inline-flex;
          align-items: center;
          gap: 1.5rem;
          padding: 0 2rem;
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(233,235,248,0.85);
        }
        .marquee-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(233,235,248,0.5);
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        /* ── About strip ── */
        .about-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 480px;
        }
        @media (max-width: 768px) {
          .about-section { grid-template-columns: 1fr; }
          .about-img-side { min-height: 280px; }
        }
        .about-img-side { position: relative; overflow: hidden; }
        .about-img { object-fit: cover; }
        .about-content-side {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 4rem 3.5rem;
          background: #B4B8C5;
          gap: 1.5rem;
        }
        .about-body {
          font-size: 0.95rem;
          color: #2a2a2a;
          line-height: 1.8;
          opacity: 0.85;
        }

        /* ── Footer ── */
        .footer {
          background: #2a2a2a;
          color: #A5A299;
          padding: 3.5rem 2.5rem 2rem;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 2.5rem;
        }
        @media (max-width: 768px) {
          .footer { grid-template-columns: 1fr; }
          .navbar { padding: 0 1.2rem; }
          .navbar-links { display: none; }
          .hero-content { padding: 0 1.2rem; }
          .collection-section { padding: 5rem 1.2rem 3rem; }
          .product-grid { grid-template-columns: 1fr; }
        }
        .footer-brand {
          font-size: 1.2rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #E9EBF8;
          margin-bottom: 0.75rem;
        }
        .footer-desc {
          font-size: 0.85rem;
          line-height: 1.7;
          max-width: 280px;
        }
        .footer-heading {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #E9EBF8;
          margin-bottom: 1rem;
        }
        .footer-links { list-style: none; display: flex; flex-direction: column; gap: 0.6rem; }
        .footer-links a {
          font-size: 0.85rem;
          color: #A5A299;
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-links a:hover { color: #368672; }
        .footer-bottom {
          background: #1e1e1e;
          text-align: center;
          font-size: 0.78rem;
          color: #8D818C;
          padding: 1.25rem;
          letter-spacing: 0.06em;
        }
      `}</style>

      {/* ── Navbar ── */}
      <nav className="navbar">
        <Link href="/" className="navbar-logo">Aura</Link>
        <ul className="navbar-links">
          <li><a href="#collection">Collection</a></li>
          <li><a href="#about">Our Story</a></li>
          <li><a href="#">Gifting</a></li>
          <li><a href="#">Wholesale</a></li>
        </ul>
        <button className="navbar-cart" aria-label="Shopping cart">
          🛍 Cart (0)
        </button>
      </nav>

      {/* ── Hero ── */}
      <HeroCarousel />

      {/* ── Marquee ── */}
      <div className="marquee-section" aria-hidden="true">
        <div className="marquee-track">
          {Array.from({ length: 2 }).flatMap(() => [
            "Free shipping over $60",
            "Handpoured in small batches",
            "100% natural soy wax",
            "Cotton-core wicks",
            "Cruelty free",
            "Gift wrapping available",
          ]).map((text, i) => (
            <span key={i} className="marquee-item">
              {text}
              <span className="marquee-dot" />
            </span>
          ))}
        </div>
      </div>

      {/* ── Collection ── */}
      <section id="collection" className="collection-section">
        <div className="collection-header">
          <div>
            <p className="section-label">Our Collection</p>
            <h2 className="section-title">Curated for Every Mood</h2>
            <p className="section-sub">
              Each candle is hand-poured with intention — crafted to fill your home with warmth, memory, and beauty.
            </p>
          </div>
          <div className="collection-filters">
            {["All", "Bestsellers", "New Arrivals", "Gifts"].map((f, i) => (
              <button key={f} className={`filter-chip${i === 0 ? " active" : ""}`}>
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="product-grid">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

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
          <p className="section-label">Our Story</p>
          <h2 className="section-title">Made with care,<br />lit with love.</h2>
          <p className="about-body">
            Aura began as a small kitchen project inspired by the belief that a single flickering candle can transform a room — and a mood. Every candle in our collection is hand-poured in small batches using 100% natural soy wax, sustainably sourced botanicals, and the finest fragrance oils.
          </p>
          <a href="#" className="btn-primary" style={{ alignSelf: "flex-start" }}>
            Discover More
          </a>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer">
        <div>
          <p className="footer-brand">Aura Candles</p>
          <p className="footer-desc">
            Handcrafted luxury scents designed to transform your everyday moments into something extraordinary.
          </p>
        </div>
        <div>
          <p className="footer-heading">Navigate</p>
          <ul className="footer-links">
            <li><a href="#collection">Shop</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#">Gifting</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>
        <div>
          <p className="footer-heading">Contact</p>
          <ul className="footer-links">
            <li><a href="#">hello@auracandles.com</a></li>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">Pinterest</a></li>
            <li><a href="#">TikTok</a></li>
          </ul>
        </div>
      </footer>
      <div className="footer-bottom">
        © {new Date().getFullYear()} Aura Candles — All rights reserved.
      </div>
    </>
  );
}
