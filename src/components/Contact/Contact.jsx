import React, { useState, useEffect } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import emailjs from "@emailjs/browser";
import "./Contact.css";

// ──────────────────────────────────────────────────────────────────
// EmailJS Configuration — Get these from https://www.emailjs.com
// 1. Create free account → connect your Gmail (selvanaretreat@gmail.com)
// 2. Create an Email Service (Gmail) → copy the Service ID
// 3. Create an Email Template → copy the Template ID
// 4. Go to Account → copy the Public Key
// ──────────────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = "service_quv0kxg";
const EMAILJS_TEMPLATE_ID = "template_q6bgsfp";
const EMAILJS_PUBLIC_KEY  = "KY7h0GU5zF2WyLNqL";

const FAQS = [
  { q: "What is the check-in and check-out time?", a: "Standard check-in is 2:00 PM and check-out is 11:00 AM. Early check-in and late check-out can be arranged on request, subject to availability." },
  { q: "Do you allow pets at your properties?", a: "Several of our properties are pet-friendly! You can filter by 'Pet Friendly' when browsing properties. Please inform us in advance if you plan to bring a pet." },
  { q: "Can I book for a large group?", a: "Absolutely! Many of our villas accommodate 10–20 guests. Use our Guests selector to filter properties that match your group size, or contact us for custom group bookings." },
  { q: "What is the cancellation policy?", a: "Free cancellation up to 7 days before check-in. 50% refund for cancellations 3–7 days before check-in. No refund within 3 days of check-in." },
  { q: "Are meals included in the booking?", a: "Some properties include breakfast or all meals — this is clearly mentioned in the property listing. You can also add meal packages when booking or contact us to arrange custom catering." },
  { q: "How do I list my property with Jibhi Stays?", a: "We'd love to have more amazing stays on our platform! Visit our 'List Your Property' page or drop us an email at properties@jibhistays.com with photos and details." },
];

const INFO_CARDS = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
      </svg>
    ),
    label: "Phone", value: "+91 9167928471", href: "tel:+919167928471",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="3"/><path d="M2 7l10 6 10-6"/>
      </svg>
    ),
    label: "Email", value: "hello@jibhistays.com", href: "mailto:hello@jibhistays.com",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: "Address", value: "Jibhi, Banjar, Kullu, Himachal Pradesh 175123", href: "#",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    label: "Support Hours", value: "Mon – Sun · 8:00 AM – 10:00 PM IST", href: null,
  },
];

export default function Contact() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [openFaq, setOpenFaq] = useState(null);

  // Package booking info from query params
  const packageName = searchParams.get("package");
  const packageDuration = searchParams.get("duration");
  const packagePrice = searchParams.get("price");
  const isBookingEnquiry = !!packageName;

  // Pre-fill form when arriving from a package booking
  useEffect(() => {
    if (isBookingEnquiry) {
      const priceFormatted = packagePrice
        ? `₹${Number(packagePrice).toLocaleString("en-IN")}`
        : "";
      setForm((f) => ({
        ...f,
        subject: "booking",
        message: `Hi, I am interested in booking the "${packageName}" package (${packageDuration}, ${priceFormatted}/person). Please share availability and further details.\n\nPreferred dates: \nNumber of guests: `,
      }));
    }
  }, []);

  const handle = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const clearBookingParams = () => {
    setSearchParams({}, { replace: true });
  };

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError("");

    // Build the subject label
    const SUBJECT_LABELS = {
      booking: "Booking Enquiry",
      properties: "Property Information",
      packages: "Package Details",
      listing: "List My Property",
      complaint: "Complaint / Feedback",
      other: "Other",
    };
    const subjectLabel = SUBJECT_LABELS[form.subject] || form.subject;

    // Build package info string for the email template
    let packageInfo = "";
    if (packageName) {
      const priceFormatted = packagePrice
        ? `₹${Number(packagePrice).toLocaleString("en-IN")}/person`
        : "N/A";
      packageInfo = `Package: ${packageName} | Duration: ${packageDuration || "N/A"} | Price: ${priceFormatted}`;
    }

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          phone: form.phone || "Not provided",
          subject: subjectLabel,
          message: form.message,
          package_info: packageInfo,
        },
        EMAILJS_PUBLIC_KEY
      );

      setSent(true);
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      clearBookingParams();
      setTimeout(() => setSent(false), 6000);
    } catch (err) {
      console.error("EmailJS error:", err);
      setError("Failed to send message. Please try again or contact us directly.");
      setTimeout(() => setError(""), 6000);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="contact-page">
      {/* Hero */}
      <section className="contact-hero">
        <div className="contact-hero__inner">
          <span className="contact-hero__tag">Get In Touch</span>
          <h1 className="contact-hero__title">We'd Love to Hear From You</h1>
          <p className="contact-hero__sub">Whether you have a question about a property, need help planning your stay, or just want to say hello — we're here.</p>
          <nav className="contact-hero__breadcrumb">
            <NavLink to="/">Home</NavLink>
            <span>›</span>
            <span>Contact Us</span>
          </nav>
        </div>
      </section>

      {/* Info Cards */}
      <section className="contact-info">
        <div className="contact-info__inner">
          {INFO_CARDS.map((card, i) => (
            <div key={i} className="contact-info-card">
              <div className="contact-info-card__icon">{card.icon}</div>
              <div className="contact-info-card__text">
                <span className="contact-info-card__label">{card.label}</span>
                {card.href
                  ? <a href={card.href} className="contact-info-card__value contact-info-card__value--link">{card.value}</a>
                  : <span className="contact-info-card__value">{card.value}</span>
                }
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Form + Map */}
      <section className="contact-body">
        <div className="contact-body__inner">
          {/* Form */}
          <div className="contact-form-wrap">
            <h2 className="contact-form-wrap__title">Send Us a Message</h2>
            <p className="contact-form-wrap__sub">Fill in the form below and our team will get back to you within 24 hours.</p>

            {/* Package Booking Banner */}
            {isBookingEnquiry && !sent && (
              <div className="contact-booking-banner">
                <div className="contact-booking-banner__icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                </div>
                <div className="contact-booking-banner__content">
                  <span className="contact-booking-banner__label">Booking Enquiry</span>
                  <span className="contact-booking-banner__pkg">{packageName}</span>
                  <span className="contact-booking-banner__meta">
                    {packageDuration} · ₹{Number(packagePrice).toLocaleString("en-IN")}/person
                  </span>
                </div>
                <button className="contact-booking-banner__close" onClick={clearBookingParams} title="Clear package selection">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
            )}

            {sent && (
              <div className="contact-success">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a7a5e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                Message sent successfully! We'll get back to you soon.
              </div>
            )}

            {error && (
              <div className="contact-error">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c0392b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="15" y1="9" x2="9" y2="15"/>
                  <line x1="9" y1="9" x2="15" y2="15"/>
                </svg>
                {error}
              </div>
            )}

            <form className="contact-form" onSubmit={submit}>
              <div className="contact-form__row">
                <div className="contact-form__field">
                  <label>Full Name <span>*</span></label>
                  <input name="name" value={form.name} onChange={handle} placeholder="Rahul Sharma" required />
                </div>
                <div className="contact-form__field">
                  <label>Email Address <span>*</span></label>
                  <input type="email" name="email" value={form.email} onChange={handle} placeholder="rahul@email.com" required />
                </div>
              </div>
              <div className="contact-form__row">
                <div className="contact-form__field">
                  <label>Phone Number</label>
                  <input name="phone" value={form.phone} onChange={handle} placeholder="+91 98765 43210" />
                </div>
                <div className="contact-form__field">
                  <label>Subject <span>*</span></label>
                  <select name="subject" value={form.subject} onChange={handle} required>
                    <option value="">Select a topic</option>
                    <option value="booking">Booking Enquiry</option>
                    <option value="properties">Property Information</option>
                    <option value="packages">Package Details</option>
                    <option value="listing">List My Property</option>
                    <option value="complaint">Complaint / Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="contact-form__field">
                <label>Message <span>*</span></label>
                <textarea name="message" value={form.message} onChange={handle}
                  placeholder="Tell us how we can help you…" rows={5} required />
              </div>
              <button type="submit" className={`contact-form__submit${sending ? " contact-form__submit--sending" : ""}`} disabled={sending}>
                {sending ? (
                  <>
                    <span className="contact-form__spinner"></span>
                    Sending…
                  </>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Side Info */}
          <div className="contact-side">
            {/* Quick Reach */}
            <div className="contact-quick">
              <h3 className="contact-quick__title">Quick Reach</h3>
              <a href="tel:+919167928471" className="contact-quick-btn contact-quick-btn--dark">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
                Call Us Now
              </a>
              <a href="https://wa.me/919167928471" target="_blank" rel="noopener noreferrer" className="contact-quick-btn contact-quick-btn--green">
                <svg width="18" height="18" viewBox="0 0 32 32" fill="currentColor">
                  <path d="M16.004 0C7.165 0 .002 7.163.002 16c0 2.822.736 5.576 2.137 8.003L.014 32l8.204-2.098A15.94 15.94 0 0016.004 32C24.837 32 32 24.837 32 16S24.837 0 16.004 0zm7.23 21.314c-.396-.198-2.344-1.157-2.708-1.289-.364-.132-.629-.198-.893.198-.265.396-1.025 1.289-1.257 1.554-.231.264-.463.297-.859.099-.396-.198-1.672-.616-3.185-1.965-1.177-1.05-1.97-2.346-2.202-2.742-.231-.396-.025-.61.174-.808.179-.178.396-.463.594-.694.198-.231.264-.396.396-.66.132-.265.066-.496-.033-.694-.099-.198-.893-2.152-1.224-2.947-.322-.773-.65-.668-.893-.681l-.762-.013c-.264 0-.694.099-1.058.496-.364.396-1.39 1.358-1.39 3.312s1.423 3.84 1.621 4.105c.198.264 2.8 4.274 6.783 5.993.948.41 1.688.654 2.265.838.952.302 1.818.26 2.502.157.764-.114 2.344-.958 2.674-1.884.33-.925.33-1.718.231-1.884-.099-.165-.364-.264-.76-.462z"/>
                </svg>
                Chat on WhatsApp
              </a>
              <div className="contact-quick__hours">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7a8a86" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                Available Mon–Sun · 8 AM – 10 PM IST
              </div>
            </div>

            {/* Map embed */}
            <div className="contact-map">
              <iframe
                title="Jibhi Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3412.5!2d77.302!3d31.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3905b6e8ac0c1f43%3A0x3b4b3b3b3b3b3b3b!2sJibhi%2C%20Himachal%20Pradesh!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                width="100%" height="240" style={{border:0}} allowFullScreen
                loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="contact-faq">
        <div className="contact-faq__inner">
          <div className="contact-faq__header">
            <span className="contact-hero__tag">FAQs</span>
            <h2 className="contact-faq__title">Frequently Asked Questions</h2>
            <p className="contact-faq__sub">Can't find what you're looking for? <a href="mailto:hello@jibhistays.com">Drop us an email.</a></p>
          </div>
          <div className="contact-faq__list">
            {FAQS.map((faq, i) => (
              <div key={i} className={"faq-item" + (openFaq === i ? " faq-item--open" : "")}>
                <button className="faq-item__q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {faq.q}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="faq-item__chevron">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
                <div className="faq-item__a">{faq.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}