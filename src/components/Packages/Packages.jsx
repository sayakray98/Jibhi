import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { packages } from "../../data/properties";
import "./Packages.css";

export default function Packages() {
  const navigate = useNavigate();

  const handleBookNow = (pkg) => {
    const params = new URLSearchParams({
      package: pkg.name,
      duration: pkg.duration,
      price: pkg.price.toString(),
    });
    navigate(`/contact?${params.toString()}`);
  };

  return (
    <div className="packages-page">
      {/* Hero */}
      <section className="packages-hero">
        <div className="packages-hero__container">
          <h1 className="packages-hero__title">Jibhi Packages</h1>
          <p className="packages-hero__subtitle">Curated experiences for every traveler</p>
          <nav className="packages-hero__breadcrumb">
            <NavLink to="/">Home</NavLink>
            <span>›</span>
            <span className="current">Packages</span>
          </nav>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="packages-grid-section">
        <div className="packages-grid-section__container">
          <div className="packages-grid">
            {packages.map((pkg) => (
              <div key={pkg.id} className="package-card">
                <div className="package-card__image-wrapper">
                  <img src={pkg.image} alt={pkg.name} className="package-card__image" loading="lazy" />
                  <span className="package-card__duration">{pkg.duration}</span>
                  <span className="package-card__best-for">Best for: {pkg.bestFor}</span>
                </div>
                <div className="package-card__content">
                  <h3 className="package-card__name">{pkg.name}</h3>

                  <div className="package-card__price">
                    <span className="package-card__price-current">₹{pkg.price.toLocaleString("en-IN")}</span>
                    <span className="package-card__price-unit">/person</span>
                    {pkg.originalPrice > pkg.price && (
                      <span className="package-card__price-original">₹{pkg.originalPrice.toLocaleString("en-IN")}</span>
                    )}
                    {pkg.originalPrice > pkg.price && (
                      <span className="package-card__price-save">
                        Save {Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)}%
                      </span>
                    )}
                  </div>

                  <div className="package-card__section">
                    <h4 className="package-card__section-title">Highlights</h4>
                    <ul className="package-card__list package-card__list--highlights">
                      {pkg.highlights.map((h, i) => (
                        <li key={i}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DCC7AA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="package-card__section">
                    <h4 className="package-card__section-title">Inclusions</h4>
                    <ul className="package-card__list package-card__list--inclusions">
                      {pkg.inclusions.map((inc, i) => (
                        <li key={i}>
                          <span className="package-card__check">✓</span>
                          {inc}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button className="package-card__cta" onClick={() => handleBookNow(pkg)}>Book Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
