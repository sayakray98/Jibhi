import React from "react";
import { NavLink } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  const companyLinks = [
    { label: "About Us", href: "#" },
    { label: "Careers", href: "#" },
    { label: "List Your Property", href: "#" },
    { label: "Design Services", href: "#" },
  ];
  const destinations = [
    { label: "Jibhi", href: "#" },
    { label: "Manali", href: "#" },
    { label: "Shimla", href: "#" },
    { label: "Kasauli", href: "#" },
    { label: "Nainital", href: "#" },
    { label: "Mussoorie", href: "#" },
    { label: "Goa", href: "#" },
    { label: "Udaipur", href: "#" },
  ];
  const quickLinks = [
    { label: "Properties", to: "/properties" },
    { label: "Packages", to: "/packages" },
    { label: "Photo Gallery", to: "/gallery" },
    { label: "Blog", to: "/blog" },
    { label: "Contact Us", to: "/contact" },
  ];

  return (
    <>
      <footer className="footer">
        <div className="footer__container">
          <div className="footer__grid">
            <div className="footer__column">
              <h4 className="footer__column-title">Company</h4>
              <ul className="footer__links">
                {companyLinks.map(l => (
                  <li key={l.label}><a href={l.href} className="footer__link">{l.label}</a></li>
                ))}
              </ul>
            </div>
            <div className="footer__column">
              <h4 className="footer__column-title">Popular Destinations</h4>
              <ul className="footer__links footer__links--destinations">
                {destinations.map(l => (
                  <li key={l.label}><a href={l.href} className="footer__link">{l.label}</a></li>
                ))}
              </ul>
            </div>
            <div className="footer__column">
              <h4 className="footer__column-title">Quick Links</h4>
              <ul className="footer__links">
                {quickLinks.map(l => (
                  <li key={l.label}><NavLink to={l.to} className="footer__link">{l.label}</NavLink></li>
                ))}
              </ul>
            </div>
            <div className="footer__column">
              <h4 className="footer__column-title">Contact Us</h4>
              <div className="footer__contact-list">
                <div className="footer__contact-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7a8a86" strokeWidth="1.8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span>Jibhi, Banjar, Kullu,<br/>Himachal Pradesh 175123</span>
                </div>
                <div className="footer__contact-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7a8a86" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  <a href="tel:+919167928471" className="footer__link">+91 9167928471</a>
                </div>
                <div className="footer__contact-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7a8a86" strokeWidth="1.8"><rect x="2" y="4" width="20" height="16" rx="3"/><path d="M2 7l10 6 10-6"/></svg>
                  <a href="mailto:hello@jibhistays.com" className="footer__link">hello@jibhistays.com</a>
                </div>
                <div className="footer__socials">
                  {[
                    { label:"Instagram", d:"M2 2h20v20H2z M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z M17.5 6.5h.01" },
                    { label:"Facebook", d:"M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" },
                  ].map(s=>(
                    <a key={s.label} href="#" className="footer__social-icon" aria-label={s.label}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d={s.d}/>
                      </svg>
                    </a>
                  ))}
                  <a href="https://wa.me/919167928471" target="_blank" rel="noopener noreferrer" className="footer__social-icon" aria-label="WhatsApp">
                    <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor"><path d="M16.004 0C7.165 0 .002 7.163.002 16c0 2.822.736 5.576 2.137 8.003L.014 32l8.204-2.098A15.94 15.94 0 0016.004 32C24.837 32 32 24.837 32 16S24.837 0 16.004 0z"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="footer__bottom">
            <p className="footer__copyright">© {new Date().getFullYear()} Jibhi Stays. All rights reserved.</p>
            <div className="footer__bottom-links">
              <NavLink to="/terms" className="footer__bottom-link">Terms & Conditions</NavLink>
              <span className="footer__bottom-divider">|</span>
              <NavLink to="/privacy" className="footer__bottom-link">Privacy Policy</NavLink>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp float */}
      <a href="https://wa.me/919167928471" className="whatsapp-float" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
        <svg width="26" height="26" viewBox="0 0 32 32" fill="#fff">
          <path d="M16.004 0C7.165 0 .002 7.163.002 16c0 2.822.736 5.576 2.137 8.003L.014 32l8.204-2.098A15.94 15.94 0 0016.004 32C24.837 32 32 24.837 32 16S24.837 0 16.004 0zm7.23 21.314c-.396-.198-2.344-1.157-2.708-1.289-.364-.132-.629-.198-.893.198-.265.396-1.025 1.289-1.257 1.554-.231.264-.463.297-.859.099-.396-.198-1.672-.616-3.185-1.965-1.177-1.05-1.97-2.346-2.202-2.742-.231-.396-.025-.61.174-.808.179-.178.396-.463.594-.694.198-.231.264-.396.396-.66.132-.265.066-.496-.033-.694-.099-.198-.893-2.152-1.224-2.947-.322-.773-.65-.668-.893-.681l-.762-.013c-.264 0-.694.099-1.058.496-.364.396-1.39 1.358-1.39 3.312s1.423 3.84 1.621 4.105c.198.264 2.8 4.274 6.783 5.993.948.41 1.688.654 2.265.838.952.302 1.818.26 2.502.157.764-.114 2.344-.958 2.674-1.884.33-.925.33-1.718.231-1.884-.099-.165-.364-.264-.76-.462z"/>
        </svg>
      </a>
    </>
  );
}