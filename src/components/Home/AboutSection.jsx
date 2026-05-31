import React from "react";
import "./AboutSection.css";

const WHY_CHOOSE = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#DCC7AA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    title: "Handpicked Properties",
    desc: "Every property is personally inspected for quality, comfort, and authentic Himalayan charm.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#DCC7AA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "24/7 Guest Support",
    desc: "Round-the-clock assistance from our dedicated team to make your stay seamless.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#DCC7AA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Verified & Safe",
    desc: "All properties meet strict safety and hygiene standards for worry-free vacations.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#DCC7AA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
    title: "Local Experiences",
    desc: "Curated activities, treks, and cultural immersions designed by Himachal locals.",
  },
];

const ATTRACTIONS = [
  { name: "Jibhi Waterfall", distance: "1.5 km", icon: "lni lni-water-drop-1" },
  { name: "Serolsar Lake", distance: "5 km trek", icon: "lni lni-mountains-2" },
  { name: "Jalori Pass", distance: "11 km", icon: "lni lni-road-1" },
  { name: "Tirthan Valley", distance: "15 km", icon: "lni lni-trees-3" },
  { name: "Great Himalayan National Park", distance: "25 km", icon: "lni lni-leaf-1" },
  { name: "Chehni Kothi", distance: "8 km", icon: "lni lni-buildings-1" },
];

export default function AboutSection() {
  return (
    <>
      {/* ── About Jibhi ── */}
      <section className="about-section" id="about-jibhi">
        <div className="about-section__inner">
          <div className="about-section__content">
            <p className="about-section__tag">Discover</p>
            <h2 className="about-section__title">About Jibhi</h2>
            <p className="about-section__text">
              Nestled in the serene Banjar Valley of Himachal Pradesh, Jibhi is a hidden gem that offers
              an escape from the chaos of city life. Surrounded by dense pine and deodar forests, ancient
              temples, and crystal-clear streams, this tiny hamlet is the perfect destination for
              travelers seeking peace, adventure, and authentic mountain experiences.
            </p>
            <p className="about-section__text">
              Whether you are looking for a romantic getaway, a family vacation, or a solo adventure,
              Jibhi has something magical waiting for you — from trekking through pristine trails to
              stargazing from your private balcony.
            </p>
          </div>
          <div className="about-section__image">
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=450&fit=crop"
              alt="Jibhi Valley landscape"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ── About the Resort ── */}
      <section className="about-resort" id="about-resort">
        <div className="about-resort__inner">
          <div className="about-resort__image">
            <img
              src="https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=600&h=450&fit=crop"
              alt="Jibhi resort property"
              loading="lazy"
            />
          </div>
          <div className="about-resort__content">
            <p className="about-section__tag">Our Story</p>
            <h2 className="about-section__title">About Our Properties</h2>
            <p className="about-section__text">
              At Jibhi Stays, we curate the finest luxury villas, cottages, and unique stays in the
              heart of the Himalayas. Each property is handpicked for its stunning location, premium
              amenities, and the warmth of traditional Himachali hospitality.
            </p>
            <p className="about-section__text">
              From cedar-wood lodges perched on hillsides to riverside retreats with private gardens,
              our collection offers unforgettable experiences for every type of traveler.
            </p>
            <div className="about-resort__stats">
              <div className="about-resort__stat">
                <span className="about-resort__stat-num">50+</span>
                <span className="about-resort__stat-label">Premium Properties</span>
              </div>
              <div className="about-resort__stat">
                <span className="about-resort__stat-num">10K+</span>
                <span className="about-resort__stat-label">Happy Guests</span>
              </div>
              <div className="about-resort__stat">
                <span className="about-resort__stat-num">4.8</span>
                <span className="about-resort__stat-label">Avg Rating</span>
              </div>
              <div className="about-resort__stat">
                <span className="about-resort__stat-num">15+</span>
                <span className="about-resort__stat-label">Destinations</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="why-choose" id="why-choose">
        <div className="why-choose__inner">
          <p className="about-section__tag" style={{ textAlign: "center" }}>
            The Jibhi Standard
          </p>
          <h2 className="about-section__title" style={{ textAlign: "center", marginBottom: 48 }}>
            Why Choose Us
          </h2>
          <div className="why-choose__grid">
            {WHY_CHOOSE.map((item) => (
              <div key={item.title} className="why-choose__card">
                <div className="why-choose__icon">{item.icon}</div>
                <h3 className="why-choose__card-title">{item.title}</h3>
                <p className="why-choose__card-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Nearby Attractions ── */}
      <section className="attractions" id="attractions">
        <div className="attractions__inner">
          <p className="about-section__tag" style={{ textAlign: "center" }}>
            Explore
          </p>
          <h2
            className="about-section__title"
            style={{ textAlign: "center", marginBottom: 40 }}
          >
            Nearby Attractions
          </h2>
          <div className="attractions__grid">
            {ATTRACTIONS.map((a) => (
              <div key={a.name} className="attractions__card">
                <span className="attractions__emoji"><i className={a.icon}></i></span>
                <div className="attractions__info">
                  <h4 className="attractions__name">{a.name}</h4>
                  <span className="attractions__dist">{a.distance}</span>
                </div>
                <svg
                  className="attractions__arrow"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#DCC7AA"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
