import React, { useState, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { properties } from "../../data/properties";
import "./Properties.css";

const PRICE_RANGES = [
  { label: "All", min: 0, max: Infinity },
  { label: "Budget", min: 0, max: 7000 },
  { label: "Mid-Range", min: 7000, max: 14000 },
  { label: "Luxury", min: 14000, max: Infinity },
];

const SORT_OPTIONS = [
  { label: "Popular", value: "popular" },
  { label: "Price: Low → High", value: "price-asc" },
  { label: "Price: High → Low", value: "price-desc" },
  { label: "Rating", value: "rating" },
];

export default function Properties() {
  const [locationFilter, setLocationFilter] = useState("All");
  const [priceRange, setPriceRange] = useState("All");
  const [sortBy, setSortBy] = useState("popular");

  const locations = useMemo(() => {
    const cities = [...new Set(properties.map((p) => p.city))];
    return ["All", ...cities];
  }, []);

  const filtered = useMemo(() => {
    let result = [...properties];

    if (locationFilter !== "All") {
      result = result.filter((p) => p.city === locationFilter);
    }

    const range = PRICE_RANGES.find((r) => r.label === priceRange);
    if (range) {
      result = result.filter((p) => p.price >= range.min && p.price < range.max);
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        result.sort((a, b) => b.reviews - a.reviews);
    }

    return result;
  }, [locationFilter, priceRange, sortBy]);

  return (
    <div className="properties-page">
      {/* Hero Banner */}
      <section className="properties-hero">
        <div className="properties-hero__container">
          <h1 className="properties-hero__title">Our Properties</h1>
          <nav className="properties-hero__breadcrumb">
            <NavLink to="/" className="properties-hero__breadcrumb-link">Home</NavLink>
            <span className="properties-hero__breadcrumb-sep">›</span>
            <span className="properties-hero__breadcrumb-current">Properties</span>
          </nav>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="properties-filter-bar">
        <div className="properties-filter-bar__container">
          {/* Location */}
          <div className="properties-filter-bar__group">
            <label className="properties-filter-bar__label">Location</label>
            <select
              className="properties-filter-bar__select"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              {locations.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div className="properties-filter-bar__group">
            <label className="properties-filter-bar__label">Price Range</label>
            <div className="properties-filter-bar__buttons">
              {PRICE_RANGES.map((r) => (
                <button
                  key={r.label}
                  className={`properties-filter-bar__btn ${priceRange === r.label ? "properties-filter-bar__btn--active" : ""}`}
                  onClick={() => setPriceRange(r.label)}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div className="properties-filter-bar__group">
            <label className="properties-filter-bar__label">Sort By</label>
            <select
              className="properties-filter-bar__select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Property Grid */}
      <section className="properties-grid-section">
        <div className="properties-grid-section__container">
          {filtered.length === 0 ? (
            <div className="properties-grid-section__empty">
              <span className="properties-grid-section__empty-icon">🏔️</span>
              <h3>No properties found</h3>
              <p>Try adjusting your filters to discover more stays.</p>
            </div>
          ) : (
            <div className="properties-grid">
              {filtered.map((property) => (
                <NavLink
                  key={property.id}
                  to={`/property/${property.id}`}
                  className="property-card"
                >
                  <div className="property-card__image-wrapper">
                    <img
                      src={property.image}
                      alt={property.name}
                      className="property-card__image"
                      loading="lazy"
                    />
                    <div className="property-card__tags">
                      {property.tags.map((tag) => (
                        <span key={tag} className="property-card__tag">{tag}</span>
                      ))}
                    </div>
                    {property.originalPrice > property.price && (
                      <span className="property-card__discount">
                        {Math.round(((property.originalPrice - property.price) / property.originalPrice) * 100)}% OFF
                      </span>
                    )}
                  </div>
                  <div className="property-card__content">
                    <div className="property-card__header">
                      <h3 className="property-card__name">{property.name}</h3>
                      <div className="property-card__rating">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="#DCC7AA" stroke="none">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                        <span>{property.rating}</span>
                        <span className="property-card__reviews">({property.reviews})</span>
                      </div>
                    </div>
                    <p className="property-card__location">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7a8a86" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                        <circle cx="12" cy="9" r="2.5" />
                      </svg>
                      {property.location}
                    </p>
                    <div className="property-card__details">
                      <span className="property-card__detail">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7a8a86" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                        {property.guests} Guests
                      </span>
                      <span className="property-card__detail">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7a8a86" strokeWidth="2"><path d="M3 7v11a2 2 0 002 2h14a2 2 0 002-2V7"/><path d="M21 7H3l2-4h14l2 4z"/><path d="M12 4v16"/></svg>
                        {property.bedrooms} Beds
                      </span>
                      <span className="property-card__detail">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7a8a86" strokeWidth="2"><path d="M4 12h16a1 1 0 011 1v6H3v-6a1 1 0 011-1z"/><path d="M6 12V5a2 2 0 012-2h8a2 2 0 012 2v7"/></svg>
                        {property.bathrooms} Baths
                      </span>
                    </div>
                    <div className="property-card__footer">
                      <div className="property-card__price">
                        <span className="property-card__price-current">₹{property.price.toLocaleString("en-IN")}</span>
                        <span className="property-card__price-unit">/night</span>
                        {property.originalPrice > property.price && (
                          <span className="property-card__price-original">₹{property.originalPrice.toLocaleString("en-IN")}</span>
                        )}
                      </div>
                      <span className="property-card__cta">View Details →</span>
                    </div>
                  </div>
                </NavLink>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
