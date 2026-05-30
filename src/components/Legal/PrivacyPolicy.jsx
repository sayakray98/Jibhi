import React from "react";
import "./Legal.css";

export default function PrivacyPolicy() {
  return (
    <div className="legal-page">
      <div className="legal-page__hero">
        <div className="legal-page__hero-container">
          <h1 className="legal-page__title">Privacy Policy</h1>
          <p className="legal-page__subtitle">
            Your privacy is important to us. This policy explains how we handle
            your data.
          </p>
          <p className="legal-page__updated">Last updated: May 2026</p>
        </div>
      </div>

      <div className="legal-page__content">
        <div className="legal-page__container">
          <section className="legal-page__section">
            <h2>1. Information We Collect</h2>
            <p>
              We collect information that you provide directly to us when making
              a booking, creating an account, contacting us, or interacting with
              our website.
            </p>
            <ul>
              <li>
                <strong>Personal Information:</strong> Name, email address,
                phone number, postal address, and date of birth.
              </li>
              <li>
                <strong>Payment Information:</strong> Credit/debit card details,
                UPI IDs, and billing address (processed through secure payment
                gateways).
              </li>
              <li>
                <strong>Identity Documents:</strong> Government-issued photo ID
                as required for check-in.
              </li>
              <li>
                <strong>Usage Data:</strong> IP address, browser type, device
                information, pages visited, and time spent on our website.
              </li>
            </ul>
          </section>

          <section className="legal-page__section">
            <h2>2. How We Use Your Information</h2>
            <p>
              We use the information we collect for the following purposes:
            </p>
            <ul>
              <li>To process and manage your bookings and reservations.</li>
              <li>
                To communicate with you about your stay, including booking
                confirmations, updates, and customer support.
              </li>
              <li>
                To send promotional offers, newsletters, and marketing
                communications (with your consent).
              </li>
              <li>To improve our website, services, and user experience.</li>
              <li>
                To comply with legal obligations and protect our legal rights.
              </li>
            </ul>
          </section>

          <section className="legal-page__section">
            <h2>3. Data Sharing & Disclosure</h2>
            <p>
              We do not sell, trade, or rent your personal information to third
              parties. We may share your data in the following circumstances:
            </p>
            <ul>
              <li>
                <strong>Service Providers:</strong> With trusted third-party
                service providers who assist us in operating our website,
                processing payments, and delivering services.
              </li>
              <li>
                <strong>Legal Requirements:</strong> When required by law, court
                order, or governmental regulations.
              </li>
              <li>
                <strong>Business Transfers:</strong> In connection with a
                merger, acquisition, or sale of all or a portion of our
                business.
              </li>
              <li>
                <strong>Safety:</strong> To protect the rights, property, or
                safety of Jibhi Stays, our guests, or others.
              </li>
            </ul>
          </section>

          <section className="legal-page__section">
            <h2>4. Data Security</h2>
            <p>
              We implement appropriate technical and organizational security
              measures to protect your personal information against unauthorized
              access, alteration, disclosure, or destruction. These include:
            </p>
            <ul>
              <li>SSL/TLS encryption for all data transmissions.</li>
              <li>Secure payment processing through PCI-compliant gateways.</li>
              <li>
                Access controls limiting data access to authorized personnel
                only.
              </li>
              <li>Regular security audits and vulnerability assessments.</li>
            </ul>
            <p>
              However, no method of transmission over the internet is 100%
              secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="legal-page__section">
            <h2>5. Cookies & Tracking</h2>
            <p>
              Our website uses cookies and similar tracking technologies to
              enhance your browsing experience. Cookies are small data files
              stored on your device.
            </p>
            <ul>
              <li>
                <strong>Essential Cookies:</strong> Necessary for the website to
                function properly (e.g., session management, security).
              </li>
              <li>
                <strong>Analytics Cookies:</strong> Help us understand how
                visitors interact with our website to improve performance.
              </li>
              <li>
                <strong>Marketing Cookies:</strong> Used to deliver relevant
                advertisements and track campaign effectiveness.
              </li>
            </ul>
            <p>
              You can manage cookie preferences through your browser settings.
              Disabling certain cookies may affect website functionality.
            </p>
          </section>

          <section className="legal-page__section">
            <h2>6. Your Rights</h2>
            <p>
              Depending on your jurisdiction, you may have the following rights
              regarding your personal data:
            </p>
            <ul>
              <li>
                <strong>Right to Access:</strong> Request a copy of the personal
                data we hold about you.
              </li>
              <li>
                <strong>Right to Rectification:</strong> Request correction of
                inaccurate or incomplete data.
              </li>
              <li>
                <strong>Right to Erasure:</strong> Request deletion of your
                personal data (subject to legal obligations).
              </li>
              <li>
                <strong>Right to Object:</strong> Object to the processing of
                your data for marketing purposes.
              </li>
              <li>
                <strong>Right to Data Portability:</strong> Request transfer of
                your data to another service provider.
              </li>
            </ul>
            <p>
              To exercise any of these rights, please contact us using the
              details provided below.
            </p>
          </section>

          <section className="legal-page__section">
            <h2>7. Data Retention</h2>
            <p>
              We retain your personal information only for as long as necessary
              to fulfill the purposes outlined in this Privacy Policy, unless a
              longer retention period is required or permitted by law. Booking
              records are typically retained for a period of 5 years for
              compliance and tax purposes.
            </p>
          </section>

          <section className="legal-page__section">
            <h2>8. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. We are not
              responsible for the privacy practices or content of these external
              sites. We encourage you to review the privacy policies of any
              third-party websites you visit.
            </p>
          </section>

          <section className="legal-page__section">
            <h2>9. Children's Privacy</h2>
            <p>
              Our services are not directed to individuals under the age of 18.
              We do not knowingly collect personal information from children. If
              we become aware that we have collected data from a child, we will
              take steps to delete it promptly.
            </p>
          </section>

          <section className="legal-page__section">
            <h2>10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes
              will be posted on this page with an updated effective date. We
              encourage you to review this policy periodically to stay informed
              about how we protect your information.
            </p>
          </section>

          <section className="legal-page__section">
            <h2>Contact Us</h2>
            <p>
              If you have any questions or concerns about this Privacy Policy or
              our data practices, please contact us:
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
