import React, { useState, useMemo, useCallback } from "react";
import { NavLink } from "react-router-dom";
import { properties } from "../../data/properties";
import "./PhotoGallery.css";

const TABS = ["All", "Villas", "Nature", "Activities", "Food"];

/* Build gallery images from all properties */
function buildGalleryImages() {
  const imgs = [];
  properties.forEach((p) => {
    p.images.forEach((url, i) => {
      let cat = "Nature";
      if (p.tags.some((t) => ["Luxury", "Heritage", "Pool"].includes(t))) cat = "Villas";
      if (p.tags.some((t) => ["Glamping", "Unique Stay"].includes(t))) cat = "Activities";
      if (i === 0) cat = "Villas";
      imgs.push({
        id: `${p.id}-${i}`,
        url,
        alt: `${p.name} - Image ${i + 1}`,
        category: cat,
        property: p.name,
      });
    });
  });
  /* Add a couple food-tagged images for variety */
  imgs.push({
    id: "food-1",
    url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop",
    alt: "Himachali cuisine",
    category: "Food",
    property: "Local Cuisine",
  });
  imgs.push({
    id: "food-2",
    url: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&h=400&fit=crop",
    alt: "Mountain food",
    category: "Food",
    property: "Mountain Dining",
  });
  return imgs;
}

const ALL_IMAGES = buildGalleryImages();

export default function PhotoGallery() {
  const [activeTab, setActiveTab] = useState("All");
  const [lightbox, setLightbox] = useState({ open: false, index: -1 });

  const filtered = useMemo(() => {
    if (activeTab === "All") return ALL_IMAGES;
    return ALL_IMAGES.filter((img) => img.category === activeTab);
  }, [activeTab]);

  const openLightbox = useCallback((index) => {
    setLightbox({ open: true, index });
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightbox({ open: false, index: -1 });
    document.body.style.overflow = "";
  }, []);

  const navigate = useCallback((dir) => {
    setLightbox((prev) => {
      let next = prev.index + dir;
      if (next < 0) next = filtered.length - 1;
      if (next >= filtered.length) next = 0;
      return { ...prev, index: next };
    });
  }, [filtered.length]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") navigate(-1);
    if (e.key === "ArrowRight") navigate(1);
  }, [closeLightbox, navigate]);

  return (
    <div className="gallery-page">
      {/* Hero */}
      <section className="gallery-hero">
        <div className="gallery-hero__container">
          <h1 className="gallery-hero__title">Photo Gallery</h1>
          <p className="gallery-hero__subtitle">A visual journey through our stunning properties & experiences</p>
          <nav className="gallery-hero__breadcrumb">
            <NavLink to="/">Home</NavLink>
            <span>›</span>
            <span className="current">Gallery</span>
          </nav>
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="gallery-tabs">
        <div className="gallery-tabs__container">
          {TABS.map((tab) => (
            <button
              key={tab}
              className={`gallery-tabs__btn ${activeTab === tab ? "gallery-tabs__btn--active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry Grid */}
      <section className="gallery-masonry-section">
        <div className="gallery-masonry-section__container">
          <div className="gallery-masonry">
            {filtered.map((img, i) => (
              <div
                key={img.id}
                className="gallery-masonry__item"
                onClick={() => openLightbox(i)}
              >
                <img src={img.url} alt={img.alt} loading="lazy" />
                <div className="gallery-masonry__overlay">
                  <span className="gallery-masonry__view-text">View</span>
                  <span className="gallery-masonry__property">{img.property}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightbox.open && filtered[lightbox.index] && (
        <div
          className="gallery-lightbox"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          ref={(el) => el && el.focus()}
        >
          <div className="gallery-lightbox__inner" onClick={(e) => e.stopPropagation()}>
            <button className="gallery-lightbox__close" onClick={closeLightbox}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <button className="gallery-lightbox__nav gallery-lightbox__nav--prev" onClick={() => navigate(-1)}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <img
              src={filtered[lightbox.index].url.replace("w=600", "w=1200").replace("h=400", "h=800")}
              alt={filtered[lightbox.index].alt}
              className="gallery-lightbox__img"
            />
            <button className="gallery-lightbox__nav gallery-lightbox__nav--next" onClick={() => navigate(1)}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
            <div className="gallery-lightbox__caption">
              <span>{filtered[lightbox.index].property}</span>
              <span className="gallery-lightbox__counter">{lightbox.index + 1} / {filtered.length}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
