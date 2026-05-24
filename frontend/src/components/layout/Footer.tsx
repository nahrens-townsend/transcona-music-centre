import styles from "./Footer.module.scss";

const contactLinks = [
  {
    label: "5-549 Regent Ave. West",
    href: "https://maps.google.com/?q=5-549+Regent+Ave+West+Winnipeg+MB",
    external: true,
  },
  { label: "R2C 1R9, Winnipeg, MB", href: null },
  { label: "(204) 777-6212", href: "tel:+12047776212" },
];

const pageLinks = [
  { label: "Home", href: "/" },
  { label: "Guitar", href: "/lessons/guitar" },
  { label: "Voice", href: "/lessons/voice" },
  { label: "Piano", href: "/lessons/piano" },
  { label: "Violin", href: "/lessons/violin" },
  { label: "Calendar", href: "/calendar" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.inner}>
        {/* Column 1 — Contact */}
        <div className={styles.col}>
          <h3 className={styles.colHeading}>Contact Us</h3>
          <ul className={styles.list}>
            {contactLinks.map(({ label, href, external }) => (
              <li key={label}>
                {href ? (
                  <a
                    href={href}
                    className={styles.link}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {label}
                  </a>
                ) : (
                  <span className={styles.text}>{label}</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Column 2 — Site pages */}
        <div className={styles.col}>
          <h3 className={styles.colHeading}>Explore</h3>
          <ul className={styles.list}>
            {pageLinks.map(({ label, href }) => (
              <li key={href}>
                <a href={href} className={styles.link}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 — Google Map */}
        <div className={`${styles.col} ${styles.colMap}`}>
          <h3 className={styles.colHeading}>Find Us</h3>
          <div className={styles.mapWrapper}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2570.177112564686!2d-97.0195486!3d49.8954781!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x52ea7a226dd3b00f%3A0x5de8cc6c80a53de0!2sTranscona%20Music%20Centre!5e0!3m2!1sen!2sca!4v1779644989349!5m2!1sen!2sca"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Transcona Music Centre location"
            />
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>
          &copy; {new Date().getFullYear()} Transcona Music Centre. All rights
          reserved.
        </span>
      </div>
    </footer>
  );
}
