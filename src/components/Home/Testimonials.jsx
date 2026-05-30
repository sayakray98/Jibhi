import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { testimonials } from "../../data/properties";
import "./Testimonials.css";

export default function Testimonials() {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`testimonials__star ${i < rating ? "testimonials__star--filled" : ""}`}
      >
        ★
      </span>
    ));
  };

  return (
    <section className="testimonials">
      <div className="testimonials__container">
        <div className="testimonials__header">
          <span className="testimonials__badge">Loved by Guests</span>
          <h2 className="testimonials__title">What Our Guests Say</h2>
          <p className="testimonials__subtitle">
            Real experiences from travelers who made unforgettable memories at our properties
          </p>
        </div>

        <div className="testimonials__carousel">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={28}
            slidesPerView={1}
            navigation
            loop={true}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              640: { slidesPerView: 1, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 24 },
              1080: { slidesPerView: 3, spaceBetween: 28 },
            }}
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="testimonials__card">
                  <div className="testimonials__quote-icon">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M11 7H7.5C6.12 7 5 8.12 5 9.5V10C5 11.1 5.9 12 7 12H9V13C9 14.1 8.1 15 7 15H6.5C5.95 15 5.5 15.45 5.5 16C5.5 16.55 5.95 17 6.5 17H7C9.21 17 11 15.21 11 13V7ZM19 7H15.5C14.12 7 13 8.12 13 9.5V10C13 11.1 13.9 12 15 12H17V13C17 14.1 16.1 15 15 15H14.5C13.95 15 13.5 15.45 13.5 16C13.5 16.55 13.95 17 14.5 17H15C17.21 17 19 15.21 19 13V7Z"
                        fill="#DCC7AA"
                        opacity="0.25"
                      />
                    </svg>
                  </div>

                  <div className="testimonials__stars">
                    {renderStars(testimonial.rating)}
                  </div>

                  <p className="testimonials__text">"{testimonial.text}"</p>

                  <div className="testimonials__divider"></div>

                  <div className="testimonials__author">
                    <div className="testimonials__avatar">
                      {testimonial.avatar}
                    </div>
                    <div className="testimonials__author-info">
                      <span className="testimonials__name">{testimonial.name}</span>
                      <span className="testimonials__location">{testimonial.location}</span>
                    </div>
                  </div>

                  <div className="testimonials__meta">
                    <span className="testimonials__property">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7a8a86" strokeWidth="2">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                      </svg>
                      {testimonial.property}
                    </span>
                    <span className="testimonials__date">{testimonial.date}</span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
