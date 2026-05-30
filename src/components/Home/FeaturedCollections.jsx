import React from "react";
import "./FeaturedCollections.css";

const COLLECTIONS = [
  {
    id: 1,
    name: "Mountain Retreats",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&h=400&fit=crop",
  },
  {
    id: 2,
    name: "Riverside Escapes",
    image:
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=700&h=400&fit=crop",
  },
  {
    id: 3,
    name: "Heritage Stays",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=700&h=400&fit=crop",
  },
  {
    id: 4,
    name: "Luxury Villas",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=700&h=400&fit=crop",
  },
];

export default function FeaturedCollections() {
  return (
    <section className="feat-coll">
      <div className="feat-coll__inner">
        {/* Header */}
        <div className="feat-coll__header">
          <p className="feat-coll__subtitle">Curated For You</p>
          <h2 className="feat-coll__title">Our Collections</h2>
        </div>

        {/* 2×2 Grid */}
        <div className="feat-coll__grid">
          {COLLECTIONS.map((col) => (
            <a key={col.id} className="coll-card" href={`#${col.name}`}>
              <div className="coll-card__img-wrap">
                <img
                  className="coll-card__img"
                  src={col.image}
                  alt={col.name}
                  loading="lazy"
                />
              </div>
              <div className="coll-card__overlay" />
              <div className="coll-card__content">
                <h3 className="coll-card__name">{col.name}</h3>
                <span className="coll-card__cta">
                  Explore <span className="coll-card__cta-arrow">→</span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
