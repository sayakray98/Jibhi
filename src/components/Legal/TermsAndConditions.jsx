import React from "react";
import "./Legal.css";

export default function TermsAndConditions() {
  return (
    <div className="legal-page">
      <div className="legal-page__hero">
        <div className="legal-page__hero-container">
          <h1 className="legal-page__title">Terms & Conditions</h1>
          <p className="legal-page__subtitle">
            Please read these terms carefully before using our services
          </p>
          <p className="legal-page__updated">Last updated: May 2026</p>
        </div>
      </div>

      <div className="legal-page__content">
        <div className="legal-page__container">
          <section className="legal-page__section">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using the Jibhi Stays website and booking our
              accommodation services, you acknowledge that you have read,
              understood, and agree to be bound by these Terms & Conditions. If
              you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section className="legal-page__section">
            <h2>2. Booking & Reservations</h2>
            <p>
              All bookings are subject to availability. A reservation is
              confirmed only upon receipt of the booking confirmation email and
              any required advance payment. We reserve the right to refuse or
              cancel any booking at our discretion.
            </p>
            <ul>
              <li>
                Bookings must be made by individuals who are at least 18 years
                of age.
              </li>
              <li>
                Accurate and complete information must be provided at the time
                of booking.
              </li>
              <li>
                The lead guest is responsible for all members of their party.
              </li>
            </ul>
          </section>

          <section className="legal-page__section">
            <h2>3. Pricing & Payment</h2>
            <p>
              All prices displayed on our website are in Indian Rupees (₹) and
              are inclusive of applicable taxes unless stated otherwise. We
              reserve the right to modify pricing at any time without prior
              notice.
            </p>
            <ul>
              <li>
                Full payment or a deposit may be required at the time of
                booking.
              </li>
              <li>
                Payment can be made via credit/debit cards, UPI, net banking, or
                other accepted methods.
              </li>
              <li>
                Any additional charges incurred during your stay must be settled
                at the time of checkout.
              </li>
            </ul>
          </section>

          <section className="legal-page__section">
            <h2>4. Cancellation & Refund Policy</h2>
            <p>
              Cancellations made 7 or more days prior to the check-in date are
              eligible for a full refund (minus processing fees). Cancellations
              made within 3–7 days of check-in are eligible for a 50% refund.
              Cancellations within 3 days of check-in or no-shows are
              non-refundable.
            </p>
            <ul>
              <li>
                Refunds will be processed within 7–10 business days.
              </li>
              <li>
                Modifications to bookings are subject to availability and may
                incur additional charges.
              </li>
              <li>
                In case of force majeure events, special consideration will be
                given.
              </li>
            </ul>
          </section>

          <section className="legal-page__section">
            <h2>5. Check-in & Check-out</h2>
            <p>
              Standard check-in time is 2:00 PM and check-out time is 11:00 AM.
              Early check-in or late check-out is subject to availability and
              may incur additional charges.
            </p>
            <ul>
              <li>
                Valid government-issued photo identification is required at
                check-in for all guests.
              </li>
              <li>
                The property must be left in a reasonable condition upon
                checkout.
              </li>
            </ul>
          </section>

          <section className="legal-page__section">
            <h2>6. Guest Responsibilities</h2>
            <p>
              Guests are expected to conduct themselves in a respectful and
              responsible manner during their stay. Any damage to the property
              caused by the guest or their party will be charged to the guest.
            </p>
            <ul>
              <li>Smoking is prohibited inside all properties.</li>
              <li>
                Loud music or disturbances after 10:00 PM are not permitted.
              </li>
              <li>
                Pets are allowed only in designated pet-friendly properties.
              </li>
              <li>
                Illegal activities on the premises are strictly prohibited and
                will result in immediate eviction.
              </li>
            </ul>
          </section>

          <section className="legal-page__section">
            <h2>7. Liability Limitations</h2>
            <p>
              Jibhi Stays shall not be held liable for any loss, damage, or
              injury sustained during your stay unless caused by our proven
              negligence. We are not responsible for loss or theft of personal
              belongings.
            </p>
            <p>
              We recommend that guests carry adequate travel insurance covering
              health, accidents, and personal belongings.
            </p>
          </section>

          <section className="legal-page__section">
            <h2>8. Intellectual Property</h2>
            <p>
              All content on the Jibhi Stays website, including text, images,
              graphics, logos, and software, is the property of Jibhi Stays and
              is protected by applicable copyright and trademark laws.
              Unauthorized reproduction, distribution, or modification of any
              content is strictly prohibited.
            </p>
          </section>

          <section className="legal-page__section">
            <h2>9. Modifications to Terms</h2>
            <p>
              Jibhi Stays reserves the right to modify these Terms & Conditions
              at any time. Changes will be posted on this page with an updated
              revision date. Continued use of our services after any
              modifications constitutes acceptance of the revised terms.
            </p>
          </section>

          <section className="legal-page__section">
            <h2>10. Governing Law</h2>
            <p>
              These Terms & Conditions are governed by the laws of India. Any
              disputes arising from these terms shall be subject to the
              exclusive jurisdiction of the courts in Kullu, Himachal Pradesh,
              India.
            </p>
          </section>

          <section className="legal-page__section">
            <h2>Contact Us</h2>
            <p>
              If you have any questions about these Terms & Conditions, please
              contact us:
            </p>
            <div className="legal-page__contact-info">
              <p>
                <strong>Email:</strong> hello@jibhistays.com
              </p>
              <p>
                <strong>Phone:</strong> +91 9167928471
              </p>
              <p>
                <strong>Address:</strong> Jibhi, Banjar, Kullu, Himachal Pradesh
                175123
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
