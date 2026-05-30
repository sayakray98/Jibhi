import React, { useState } from "react";
import "./Newsletter.css";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  return (
    <section className="newsletter">
      {/* Decorative elements */}
      <div className="newsletter__glow newsletter__glow--left"></div>
      <div className="newsletter__glow newsletter__glow--right"></div>

      <div className="newsletter__container">
        <div className="newsletter__icon">
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="4" width="20" height="16" rx="3" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
            <path d="M2 7L12 13L22 7" stroke="#DCC7AA" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>

        <h2 className="newsletter__title">Get Exclusive Deals & Updates</h2>

        <p className="newsletter__subtitle">
          Subscribe to our newsletter and never miss a special offer
        </p>

        <form className="newsletter__form" onSubmit={handleSubmit}>
          <div className="newsletter__input-group">
            <div className="newsletter__input-wrapper">
              <svg
                className="newsletter__input-icon"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#7a8a86"
                strokeWidth="2"
              >
                <rect x="2" y="4" width="20" height="16" rx="3" />
                <path d="M2 7L12 13L22 7" />
              </svg>
              <input
                type="email"
                className="newsletter__input"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="newsletter__button">
              {submitted ? (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Subscribed!
                </>
              ) : (
                <>
                  Subscribe
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </form>

        <p className="newsletter__disclaimer">
          No spam, ever. Unsubscribe anytime. We respect your privacy.
        </p>
      </div>
    </section>
  );
}
