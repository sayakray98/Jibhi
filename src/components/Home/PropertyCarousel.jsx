import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { properties } from "../../data/properties";

import "swiper/css";
import "swiper/css/navigation";
import "./PropertyCarousel.css";

function formatPrice(num) {
  return num.toLocaleString("en-IN");
}

function StarRating({ rating }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);

  return (
    <div className="prop-card__stars">
      {Array.from({ length: full }).map((_, i) => (
        <span key={"f" + i} className="prop-card__star">★</span>
      ))}
      {half && <span className="prop-card__star">★</span>}
      {Array.from({ length: empty }).map((_, i) => (
        <span key={"e" + i} className="prop-card__star prop-card__star--empty">★</span>
      ))}
    </div>
  );
}

function HeartIcon({ filled }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "#e74c3c" : "none"}
      stroke={filled ? "#e74c3c" : "#3d4f4b"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function PropertyCard({ property }) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="prop-card">
      {/* Image */}
      <div className="prop-card__img-wrap">
        <img
          className="prop-card__img"
          src={property.image}
          alt={property.name}
          loading="lazy"
        />

        {/* Favorite */}
        <button
          className="prop-card__fav"
          onClick={(e) => {
            e.stopPropagation();
            setLiked(!liked);
          }}
          aria-label="Add to favorites"
        >
          <HeartIcon filled={liked} />
        </button>

        {/* Tags */}
        {property.tags && property.tags.length > 0 && (
          <div className="prop-card__tags">
            {property.tags.map((tag) => (
              <span key={tag} className="prop-card__tag">{tag}</span>
            ))}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="prop-card__body">
        <h3 className="prop-card__name">{property.name}</h3>

        <p className="prop-card__location">
          <svg viewBox="0 0 24 24" fill="none" stroke="#7a8a86" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
          {property.location}
        </p>

        {/* Price */}
        <div className="prop-card__price-row">
          <span className="prop-card__price">₹{formatPrice(property.price)}</span>
          <span className="prop-card__price-label">/night</span>
          {property.originalPrice && (
            <span className="prop-card__orig-price">
              ₹{formatPrice(property.originalPrice)}
            </span>
          )}
        </div>

        {/* Meta */}
        <div className="prop-card__meta">
          <div className="prop-card__rating">
            <StarRating rating={property.rating} />
            <span className="prop-card__rating-num">{property.rating}</span>
            <span className="prop-card__reviews">({property.reviews})</span>
          </div>

          <div className="prop-card__details">
            <span className="prop-card__detail">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              {property.guests}
            </span>
            <span className="prop-card__detail">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 7v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7" />
                <path d="M21 7H3l2-4h14l2 4z" />
                <path d="M12 4v16" />
              </svg>
              {property.bedrooms}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PropertyCarousel() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const featuredProperties = properties.filter((p) => p.featured);

  return (
    <section className="prop-carousel">
      <div className="prop-carousel__inner">
        {/* Header */}
        <div className="prop-carousel__header">
          <div className="prop-carousel__title-group">
            <span className="prop-carousel__subtitle">Handpicked For You</span>
            <h2 className="prop-carousel__title">Trending Stays</h2>
          </div>
          <a href="#" className="prop-carousel__view-all">
            View All →
          </a>
        </div>

        {/* Carousel */}
        <div className="prop-carousel__swiper-wrap">
          <button
            ref={prevRef}
            className="prop-carousel__nav prop-carousel__nav--prev"
            aria-label="Previous properties"
          >
            &#8249;
          </button>

          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 16 },
              640: { slidesPerView: 2, spaceBetween: 18 },
              1024: { slidesPerView: 3, spaceBetween: 20 },
              1300: { slidesPerView: 4, spaceBetween: 20 },
            }}
          >
            {featuredProperties.map((property) => (
              <SwiperSlide key={property.id}>
                <PropertyCard property={property} />
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            ref={nextRef}
            className="prop-carousel__nav prop-carousel__nav--next"
            aria-label="Next properties"
          >
            &#8250;
          </button>
        </div>
      </div>
    </section>
  );
}
