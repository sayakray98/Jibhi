import React, { useState, useEffect, useRef, useCallback } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.webp";
import { properties } from "../../data/properties";
import "./Header.css";

const ABOUT_ITEMS = [
  { label: "About Jibhi", icon: "🏔️", to: "/#about-jibhi" },
  { label: "About the Resort", icon: "🏡", to: "/#about-resort" },
  { label: "Why Choose Us", icon: "⭐", to: "/#why-choose" },
  { label: "Nearby Attractions", icon: "📍", to: "/#attractions" },
];

const megaMenuProperties = properties.slice(0, 3);

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // 'about' | 'properties' | null
  const [mobileAccordion, setMobileAccordion] = useState(null); // 'about' | 'properties' | null
  const location = useLocation();
  const dropdownTimeout = useRef(null);
  const headerRef = useRef(null);

  // Pages that have a light background at top need solid header
  const needsSolidBg = /^\/(properties|property\/|packages|gallery|blog|contact|terms|privacy)/.test(location.pathname);

  // Close everything on route change
  useEffect(() => {
    setMobileOpen(false);
    setContactOpen(false);
    setActiveDropdown(null);
    setMobileAccordion(null);
  }, [location.pathname]);

  // Scroll listener
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Lock body scroll when mobile nav open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setActiveDropdown(null);
        setContactOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleDropdownEnter = useCallback((key) => {
    clearTimeout(dropdownTimeout.current);
    setActiveDropdown(key);
  }, []);

  const handleDropdownLeave = useCallback(() => {
    dropdownTimeout.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  }, []);

  const handleAnchorClick = (e, hash) => {
    if (location.pathname === "/") {
      e.preventDefault();
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    setActiveDropdown(null);
    setMobileOpen(false);
  };

  const toggleMobileAccordion = (key) => {
    setMobileAccordion((prev) => (prev === key ? null : key));
  };

  const formatPrice = (price) =>
    "₹" + price.toLocaleString("en-IN");

  return (
    <>
      <header
        ref={headerRef}
        className={`header${scrolled || needsSolidBg ? " header--scrolled" : ""}${mobileOpen ? " header--mobile-open" : ""}`}
      >
        <div className="header__inner">
          {/* Logo */}
          <NavLink to="/" className="header__logo" onClick={() => setMobileOpen(false)}>
            <img src={logo} alt="Jibhi Stays" />
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="header__nav">
            {/* Home */}
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                "header__nav-link" + (isActive ? " active" : "")
              }
            >
              Home
            </NavLink>

            {/* About - Dropdown */}
            <div
              className="header__nav-item header__nav-item--dropdown"
              onMouseEnter={() => handleDropdownEnter("about")}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                className={`header__nav-link header__nav-link--trigger${activeDropdown === "about" ? " open" : ""}`}
                onClick={() => setActiveDropdown(activeDropdown === "about" ? null : "about")}
                type="button"
              >
                About
                <svg className="header__chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              <div className={`header__dropdown header__dropdown--about${activeDropdown === "about" ? " open" : ""}`}>
                <div className="header__dropdown-inner">
                  {ABOUT_ITEMS.map((item) => {
                    const hash = item.to.replace("/", "");
                    return (
                      <NavLink
                        key={item.label}
                        to={item.to}
                        className="header__dropdown-item"
                        onClick={(e) => handleAnchorClick(e, hash)}
                      >
                        <span className="header__dropdown-icon">{item.icon}</span>
                        <span className="header__dropdown-label">{item.label}</span>
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Properties - Mega Menu */}
            <div
              className="header__nav-item header__nav-item--mega"
              onMouseEnter={() => handleDropdownEnter("properties")}
              onMouseLeave={handleDropdownLeave}
            >
              <NavLink
                to="/properties"
                className={({ isActive }) =>
                  `header__nav-link header__nav-link--trigger${isActive ? " active" : ""}${activeDropdown === "properties" ? " open" : ""}`
                }
              >
                Properties
                <svg className="header__chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </NavLink>
              <div className={`header__mega header__mega--properties${activeDropdown === "properties" ? " open" : ""}`}>
                <div className="header__mega-inner">
                  <div className="header__mega-header">
                    <h3 className="header__mega-title">Our Properties</h3>
                    <p className="header__mega-subtitle">Handpicked luxury stays in the Himalayas</p>
                  </div>
                  <div className="header__mega-grid">
                    {megaMenuProperties.map((property) => (
                      <NavLink
                        key={property.id}
                        to={`/property/${property.id}`}
                        className="header__mega-card"
                        onClick={() => setActiveDropdown(null)}
                      >
                        <div className="header__mega-card-img">
                          <img src={property.image} alt={property.name} loading="lazy" />
                          <div className="header__mega-card-badge">
                            ★ {property.rating}
                          </div>
                        </div>
                        <div className="header__mega-card-body">
                          <h4 className="header__mega-card-name">{property.name}</h4>
                          <p className="header__mega-card-location">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                              <circle cx="12" cy="10" r="3" />
                            </svg>
                            {property.location}
                          </p>
                          <div className="header__mega-card-price">
                            <span className="header__mega-card-price-current">{formatPrice(property.price)}</span>
                            <span className="header__mega-card-price-original">{formatPrice(property.originalPrice)}</span>
                            <span className="header__mega-card-price-unit">/ night</span>
                          </div>
                        </div>
                      </NavLink>
                    ))}
                  </div>
                  <div className="header__mega-footer">
                    <NavLink
                      to="/properties"
                      className="header__mega-view-all"
                      onClick={() => setActiveDropdown(null)}
                    >
                      View All Properties
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>

            {/* Packages */}
            <NavLink
              to="/packages"
              className={({ isActive }) =>
                "header__nav-link" + (isActive ? " active" : "")
              }
            >
              Packages
            </NavLink>

            {/* Gallery */}
            <NavLink
              to="/gallery"
              className={({ isActive }) =>
                "header__nav-link" + (isActive ? " active" : "")
              }
            >
              Gallery
            </NavLink>

            {/* Blog */}
            <NavLink
              to="/blog"
              className={({ isActive }) =>
                "header__nav-link" + (isActive ? " active" : "")
              }
            >
              Blog
            </NavLink>

            {/* Contact Us */}
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                "header__nav-link" + (isActive ? " active" : "")
              }
            >
              Contact Us
            </NavLink>
          </nav>

          {/* Desktop Actions */}
          <div className="header__actions">
            <button className="header__icon-btn" aria-label="Account">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
              </svg>
            </button>
            <div className="header__contact-wrap">
              <button
                className={`header__cta${contactOpen ? " header__cta--active" : ""}`}
                onClick={() => setContactOpen((o) => !o)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                Get in Touch
                <svg className={`header__cta-chevron${contactOpen ? " open" : ""}`} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              <div className={`header__contact-dropdown${contactOpen ? " open" : ""}`}>
                <a href="tel:+919167928471" className="header__contact-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                  <span>+91 9167928471</span>
                </a>
                <a href="https://wa.me/919167928471" target="_blank" rel="noopener noreferrer" className="header__contact-item">
                  <svg width="16" height="16" viewBox="0 0 32 32" fill="#25D366">
                    <path d="M16.004 0C7.165 0 .002 7.163.002 16c0 2.822.736 5.576 2.137 8.003L.014 32l8.204-2.098A15.94 15.94 0 0016.004 32C24.837 32 32 24.837 32 16S24.837 0 16.004 0zm7.23 21.314c-.396-.198-2.344-1.157-2.708-1.289-.364-.132-.629-.198-.893.198-.265.396-1.025 1.289-1.257 1.554-.231.264-.463.297-.859.099-.396-.198-1.672-.616-3.185-1.965-1.177-1.05-1.97-2.346-2.202-2.742-.231-.396-.025-.61.174-.808.179-.178.396-.463.594-.694.198-.231.264-.396.396-.66.132-.265.066-.496-.033-.694-.099-.198-.893-2.152-1.224-2.947-.322-.773-.65-.668-.893-.681l-.762-.013c-.264 0-.694.099-1.058.496-.364.396-1.39 1.358-1.39 3.312s1.423 3.84 1.621 4.105c.198.264 2.8 4.274 6.783 5.993.948.41 1.688.654 2.265.838.952.302 1.818.26 2.502.157.764-.114 2.344-.958 2.674-1.884.33-.925.33-1.718.231-1.884-.099-.165-.364-.264-.76-.462z" />
                  </svg>
                  <span>WhatsApp</span>
                </a>
                <NavLink to="/contact" className="header__contact-item" onClick={() => setContactOpen(false)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                  </svg>
                  <span>Make an Enquiry</span>
                </NavLink>
              </div>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            className={"header__toggle" + (mobileOpen ? " open" : "")}
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav className={"header__mobile-nav" + (mobileOpen ? " open" : "")}>
          <div className="header__mobile-scroll">
            {/* Home */}
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                "header__mobile-link" + (isActive ? " active" : "")
              }
              onClick={() => setMobileOpen(false)}
            >
              Home
            </NavLink>

            {/* About Accordion */}
            <div className="header__mobile-accordion">
              <button
                className={`header__mobile-link header__mobile-link--accordion${mobileAccordion === "about" ? " open" : ""}`}
                onClick={() => toggleMobileAccordion("about")}
              >
                About
                <svg className="header__mobile-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              <div className={`header__mobile-accordion-body${mobileAccordion === "about" ? " open" : ""}`}>
                {ABOUT_ITEMS.map((item) => {
                  const hash = item.to.replace("/", "");
                  return (
                    <NavLink
                      key={item.label}
                      to={item.to}
                      className="header__mobile-sub-link"
                      onClick={(e) => {
                        handleAnchorClick(e, hash);
                        setMobileOpen(false);
                      }}
                    >
                      <span className="header__mobile-sub-icon">{item.icon}</span>
                      {item.label}
                    </NavLink>
                  );
                })}
              </div>
            </div>

            {/* Properties Accordion */}
            <div className="header__mobile-accordion">
              <button
                className={`header__mobile-link header__mobile-link--accordion${mobileAccordion === "properties" ? " open" : ""}`}
                onClick={() => toggleMobileAccordion("properties")}
              >
                Properties
                <svg className="header__mobile-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              <div className={`header__mobile-accordion-body${mobileAccordion === "properties" ? " open" : ""}`}>
                {megaMenuProperties.map((property) => (
                  <NavLink
                    key={property.id}
                    to={`/property/${property.id}`}
                    className="header__mobile-sub-link header__mobile-sub-link--property"
                    onClick={() => setMobileOpen(false)}
                  >
                    <img
                      src={property.image}
                      alt={property.name}
                      className="header__mobile-sub-img"
                      loading="lazy"
                    />
                    <div className="header__mobile-sub-info">
                      <span className="header__mobile-sub-name">{property.name}</span>
                      <span className="header__mobile-sub-price">{formatPrice(property.price)} / night</span>
                    </div>
                  </NavLink>
                ))}
                <NavLink
                  to="/properties"
                  className="header__mobile-sub-link header__mobile-sub-link--viewall"
                  onClick={() => setMobileOpen(false)}
                >
                  View All Properties →
                </NavLink>
              </div>
            </div>

            {/* Packages */}
            <NavLink
              to="/packages"
              className={({ isActive }) =>
                "header__mobile-link" + (isActive ? " active" : "")
              }
              onClick={() => setMobileOpen(false)}
            >
              Packages
            </NavLink>

            {/* Gallery */}
            <NavLink
              to="/gallery"
              className={({ isActive }) =>
                "header__mobile-link" + (isActive ? " active" : "")
              }
              onClick={() => setMobileOpen(false)}
            >
              Gallery
            </NavLink>

            {/* Blog */}
            <NavLink
              to="/blog"
              className={({ isActive }) =>
                "header__mobile-link" + (isActive ? " active" : "")
              }
              onClick={() => setMobileOpen(false)}
            >
              Blog
            </NavLink>

            {/* Contact Us */}
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                "header__mobile-link" + (isActive ? " active" : "")
              }
              onClick={() => setMobileOpen(false)}
            >
              Contact Us
            </NavLink>

            {/* Mobile CTAs */}
            <div className="header__mobile-actions">
              <a href="tel:+919167928471" className="header__mobile-cta">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                +91 9167928471
              </a>
              <a href="https://wa.me/919167928471" target="_blank" rel="noopener noreferrer" className="header__mobile-cta header__mobile-cta--green">
                <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor">
                  <path d="M16.004 0C7.165 0 .002 7.163.002 16c0 2.822.736 5.576 2.137 8.003L.014 32l8.204-2.098A15.94 15.94 0 0016.004 32C24.837 32 32 24.837 32 16S24.837 0 16.004 0zm7.23 21.314c-.396-.198-2.344-1.157-2.708-1.289-.364-.132-.629-.198-.893.198-.265.396-1.025 1.289-1.257 1.554-.231.264-.463.297-.859.099-.396-.198-1.672-.616-3.185-1.965-1.177-1.05-1.97-2.346-2.202-2.742-.231-.396-.025-.61.174-.808.179-.178.396-.463.594-.694.198-.231.264-.396.396-.66.132-.265.066-.496-.033-.694-.099-.198-.893-2.152-1.224-2.947-.322-.773-.65-.668-.893-.681l-.762-.013c-.264 0-.694.099-1.058.496-.364.396-1.39 1.358-1.39 3.312s1.423 3.84 1.621 4.105c.198.264 2.8 4.274 6.783 5.993.948.41 1.688.654 2.265.838.952.302 1.818.26 2.502.157.764-.114 2.344-.958 2.674-1.884.33-.925.33-1.718.231-1.884-.099-.165-.364-.264-.76-.462z" />
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </nav>
      </header>

      {/* Overlay for dropdowns and mobile */}
      {(contactOpen || activeDropdown) && (
        <div
          className="header__overlay"
          onClick={() => {
            setContactOpen(false);
            setActiveDropdown(null);
          }}
        />
      )}
    </>
  );
}