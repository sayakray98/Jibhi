import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { destinations } from "../../data/properties";

import "swiper/css";
import "swiper/css/navigation";
import "./PickDestination.css";

export default function PickDestination() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="pick-dest">
      <div className="pick-dest__inner">
        {/* Header */}
        <div className="pick-dest__header">
          <p className="pick-dest__subtitle">Destinations Near You</p>
          <h2 className="pick-dest__title">Pick a Destination</h2>
        </div>

        {/* Carousel */}
        <div className="pick-dest__carousel">
          <button
            ref={prevRef}
            className="pick-dest__nav pick-dest__nav--prev"
            aria-label="Previous destinations"
          >
            &#8249;
          </button>

          <Swiper
            modules={[Navigation]}
            spaceBetween={8}
            slidesPerView={3}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            breakpoints={{
              0: { slidesPerView: 3, spaceBetween: 4 },
              480: { slidesPerView: 4, spaceBetween: 6 },
              640: { slidesPerView: 5, spaceBetween: 8 },
              900: { slidesPerView: 7, spaceBetween: 8 },
              1100: { slidesPerView: 8, spaceBetween: 10 },
              1300: { slidesPerView: 10, spaceBetween: 10 },
            }}
          >
            {destinations.map((dest) => (
              <SwiperSlide key={dest.slug}>
                <div className="dest-card">
                  <div className="dest-card__icon-wrap">
                    <img
                      className="dest-card__icon"
                      src={dest.image}
                      alt={dest.name}
                      loading="lazy"
                    />
                  </div>
                  <span className="dest-card__name">{dest.name}</span>
                  <span className="dest-card__count">
                    {dest.propertyCount} stays
                  </span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            ref={nextRef}
            className="pick-dest__nav pick-dest__nav--next"
            aria-label="Next destinations"
          >
            &#8250;
          </button>
        </div>
      </div>
    </section>
  );
}
