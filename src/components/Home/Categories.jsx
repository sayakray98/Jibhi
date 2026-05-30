import React from "react";
import { categories } from "../../data/properties";
import "./Categories.css";

export default function Categories() {
  return (
    <section className="cat-section">
      <div className="cat-section__inner">
        {/* Header */}
        <div className="cat-section__header">
          <p className="cat-section__subtitle">Find What You Love</p>
          <h2 className="cat-section__title">Explore By Category</h2>
        </div>

        {/* Grid */}
        <div className="cat-section__grid">
          {categories.map((cat) => (
            <a key={cat.slug} className="cat-card" href={`#${cat.slug}`}>
              <div className="cat-card__emoji">{cat.icon}</div>
              <div className="cat-card__info">
                <span className="cat-card__name">{cat.name}</span>
                <span className="cat-card__count">{cat.count} properties</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
