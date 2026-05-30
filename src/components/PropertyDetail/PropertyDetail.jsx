import React, { useState, useMemo } from "react";
import { useParams, NavLink } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { properties } from "../../data/properties";
import "swiper/css";
import "swiper/css/navigation";
import "./PropertyDetail.css";

const AMENITY_MAP = {
  wifi: { icon: "📶", label: "Free Wi-Fi" },
  pool: { icon: "🏊", label: "Swimming Pool" },
  parking: { icon: "🅿️", label: "Free Parking" },
  kitchen: { icon: "🍳", label: "Full Kitchen" },
  fireplace: { icon: "🔥", label: "Fireplace" },
  "mountain-view": { icon: "🏔️", label: "Mountain View" },
  garden: { icon: "🌿", label: "Garden" },
  riverside: { icon: "🏞️", label: "Riverside" },
  balcony: { icon: "🌅", label: "Balcony" },
  bonfire: { icon: "🔥", label: "Bonfire Area" },
  meals: { icon: "🍽️", label: "Meals Included" },
  spa: { icon: "💆", label: "Spa & Wellness" },
};

export default function PropertyDetail() {
  const { id } = useParams();
  const property = properties.find((p) => p.id === Number(id));

  const [mainImage, setMainImage] = useState(0);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guestCount, setGuestCount] = useState(2);

  const similar = useMemo(() => {
    if (!property) return [];
    const others = properties.filter((p) => p.id !== property.id);
    const shuffled = [...others].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  }, [property]);

  if (!property) {
    return (
      <div className="property-detail-not-found">
        <h2>Property Not Found</h2>
        <p>The property you're looking for doesn't exist.</p>
        <NavLink to="/properties" className="property-detail-not-found__link">← Back to Properties</NavLink>
      </div>
    );
  }

  const nights = (() => {
    if (!checkIn || !checkOut) return 0;
    const diff = new Date(checkOut) - new Date(checkIn);
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  })();

  const total = nights * property.price;

  return (
    <div className="property-detail">
      {/* Breadcrumb */}
      <div className="property-detail__breadcrumb-bar">
        <div className="property-detail__breadcrumb-container">
          <NavLink to="/">Home</NavLink>
          <span>›</span>
          <NavLink to="/properties">Properties</NavLink>
          <span>›</span>
          <span className="current">{property.name}</span>
        </div>
      </div>

      {/* Image Gallery */}
      <section className="property-detail__gallery">
        <div className="property-detail__gallery-container">
          <div className="property-detail__gallery-main">
            <img
              src={property.images[mainImage]}
              alt={property.name}
              className="property-detail__gallery-main-img"
            />
          </div>
          <div className="property-detail__gallery-thumbs">
            {property.images.slice(0, 4).map((img, i) => (
              <div
                key={i}
                className={`property-detail__gallery-thumb ${mainImage === i ? "property-detail__gallery-thumb--active" : ""}`}
                onClick={() => setMainImage(i)}
              >
                <img src={img} alt={`${property.name} ${i + 1}`} />
                {i === 3 && property.images.length > 4 && (
                  <div className="property-detail__gallery-thumb-overlay">
                    +{property.images.length - 4}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content + Sidebar */}
      <section className="property-detail__main">
        <div className="property-detail__main-container">
          {/* Content */}
          <div className="property-detail__content">
            {/* Header */}
            <div className="property-detail__header">
              <div className="property-detail__header-top">
                <h1 className="property-detail__name">{property.name}</h1>
                <div className="property-detail__rating-badge">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#DCC7AA" stroke="none">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  <span className="property-detail__rating-value">{property.rating}</span>
                  <span className="property-detail__rating-count">({property.reviews} reviews)</span>
                </div>
              </div>
              <p className="property-detail__location">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7a8a86" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
                {property.location}
              </p>

              {/* Tags */}
              <div className="property-detail__tags">
                {property.tags.map((tag) => (
                  <span key={tag} className="property-detail__tag">{tag}</span>
                ))}
              </div>

              {/* Stats */}
              <div className="property-detail__stats">
                <div className="property-detail__stat">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DCC7AA" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  <span>{property.guests} Guests</span>
                </div>
                <div className="property-detail__stat">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DCC7AA" strokeWidth="2"><path d="M3 7v11a2 2 0 002 2h14a2 2 0 002-2V7"/><path d="M21 7H3l2-4h14l2 4z"/></svg>
                  <span>{property.bedrooms} Bedrooms</span>
                </div>
                <div className="property-detail__stat">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DCC7AA" strokeWidth="2"><path d="M4 12h16a1 1 0 011 1v6H3v-6a1 1 0 011-1z"/><path d="M6 12V5a2 2 0 012-2h8a2 2 0 012 2v7"/></svg>
                  <span>{property.bathrooms} Bathrooms</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="property-detail__section">
              <h2 className="property-detail__section-title">About This Property</h2>
              <p className="property-detail__description">{property.description}</p>

              {property.highlights && (
                <ul className="property-detail__highlights">
                  {property.highlights.map((h, i) => (
                    <li key={i} className="property-detail__highlight">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#DCC7AA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {h}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Amenities */}
            <div className="property-detail__section">
              <h2 className="property-detail__section-title">Amenities</h2>
              <div className="property-detail__amenities">
                {property.amenities.map((a) => {
                  const info = AMENITY_MAP[a] || { icon: "✨", label: a };
                  return (
                    <div key={a} className="property-detail__amenity">
                      <span className="property-detail__amenity-icon">{info.icon}</span>
                      <span className="property-detail__amenity-label">{info.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <aside className="property-detail__sidebar">
            <div className="property-detail__booking-card">
              <div className="property-detail__booking-price">
                <span className="property-detail__booking-current">₹{property.price.toLocaleString("en-IN")}</span>
                <span className="property-detail__booking-unit">/night</span>
                {property.originalPrice > property.price && (
                  <span className="property-detail__booking-original">₹{property.originalPrice.toLocaleString("en-IN")}</span>
                )}
              </div>

              <div className="property-detail__booking-fields">
                <div className="property-detail__booking-field">
                  <label>Check-in</label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div className="property-detail__booking-field">
                  <label>Check-out</label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    min={checkIn || new Date().toISOString().split("T")[0]}
                  />
                </div>
              </div>

              <div className="property-detail__booking-guests">
                <label>Guests</label>
                <div className="property-detail__booking-guest-control">
                  <button
                    onClick={() => setGuestCount((v) => Math.max(1, v - 1))}
                    disabled={guestCount <= 1}
                  >−</button>
                  <span>{guestCount}</span>
                  <button
                    onClick={() => setGuestCount((v) => Math.min(property.guests, v + 1))}
                    disabled={guestCount >= property.guests}
                  >+</button>
                </div>
                <span className="property-detail__booking-guest-max">Max {property.guests} guests</span>
              </div>

              {nights > 0 && (
                <div className="property-detail__booking-summary">
                  <div className="property-detail__booking-row">
                    <span>₹{property.price.toLocaleString("en-IN")} × {nights} nights</span>
                    <span>₹{total.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="property-detail__booking-row">
                    <span>Service fee</span>
                    <span>₹{Math.round(total * 0.05).toLocaleString("en-IN")}</span>
                  </div>
                  <div className="property-detail__booking-total">
                    <span>Total</span>
                    <span>₹{(total + Math.round(total * 0.05)).toLocaleString("en-IN")}</span>
                  </div>
                </div>
              )}

              <button className="property-detail__booking-btn">Book Now</button>
            </div>
          </aside>
        </div>
      </section>

      {/* Similar Properties */}
      {similar.length > 0 && (
        <section className="property-detail__similar">
          <div className="property-detail__similar-container">
            <h2 className="property-detail__similar-title">Similar Properties</h2>
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={24}
              slidesPerView={3}
              navigation
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              breakpoints={{
                0: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="property-detail__similar-swiper"
            >
              {similar.map((p) => (
                <SwiperSlide key={p.id}>
                  <NavLink to={`/property/${p.id}`} className="property-detail__similar-card">
                    <div className="property-detail__similar-card-img">
                      <img src={p.image} alt={p.name} />
                    </div>
                    <div className="property-detail__similar-card-info">
                      <h3>{p.name}</h3>
                      <p>{p.location}</p>
                      <div className="property-detail__similar-card-footer">
                        <span className="property-detail__similar-card-price">₹{p.price.toLocaleString("en-IN")}/night</span>
                        <span className="property-detail__similar-card-rating">
                          ★ {p.rating}
                        </span>
                      </div>
                    </div>
                  </NavLink>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      )}
    </div>
  );
}
