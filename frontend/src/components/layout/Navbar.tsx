import { useState, useEffect, useRef } from "react";
import styles from "./Navbar.module.scss";
import roostLogo from "@/assets/images/tmc-logo.webp";

const lessonsItems = [
  { label: "Guitar", href: "/lessons/guitar" },
  { label: "Voice", href: "/lessons/voice" },
  { label: "Piano", href: "/lessons/piano" },
  { label: "Violin", href: "/lessons/violin" },
];

const navLinks = [
  { label: "Calendar", href: "/calendar" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [lessonsOpen, setLessonsOpen] = useState(false);
  const [mobileLessonsOpen, setMobileLessonsOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(() => {
      document.documentElement.style.setProperty(
        "--navbar-height",
        `${el.offsetHeight}px`,
      );
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setLessonsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header ref={headerRef} className={styles.navbar}>
      <div className={styles.inner}>
        {/* Logo — far left */}
        <a
          href="/"
          className={styles.logo}
          aria-label="Transcona Music Centre — Home"
        >
          <img
            src={roostLogo}
            alt="Transcona Music Centre"
            className={styles.logoImg}
          />
        </a>

        {/* Desktop nav — far right */}
        <nav className={styles.nav} aria-label="Main navigation">
          {/* Lessons dropdown */}
          <div ref={dropdownRef} className={styles.dropdown}>
            <button
              className={styles.dropdownTrigger}
              onClick={() => setLessonsOpen((o) => !o)}
              aria-expanded={lessonsOpen}
              aria-haspopup="true"
            >
              Lessons
              <span
                className={`${styles.chevron}${lessonsOpen ? ` ${styles.chevronOpen}` : ""}`}
                aria-hidden="true"
              />
            </button>
            {lessonsOpen && (
              <div className={styles.dropdownMenu}>
                {lessonsItems.map(({ label, href }) => (
                  <a
                    key={href}
                    href={href}
                    className={styles.dropdownItem}
                    onClick={() => setLessonsOpen(false)}
                  >
                    {label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {navLinks.map(({ label, href }) => (
            <a key={href} href={href} className={styles.navLink}>
              {label}
            </a>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className={`${styles.hamburger}${isOpen ? ` ${styles.hamburgerOpen}` : ""}`}
          onClick={() => setIsOpen((o) => !o)}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile slide-down menu */}
      <div
        className={`${styles.mobileMenu}${isOpen ? ` ${styles.mobileMenuOpen}` : ""}`}
        aria-hidden={!isOpen}
      >
        <div className={styles.mobileMenuInner}>
          {/* Lessons accordion */}
          <button
            className={styles.mobileLink}
            onClick={() => setMobileLessonsOpen((o) => !o)}
            aria-expanded={mobileLessonsOpen}
          >
            Lessons
            <span
              className={`${styles.chevron}${mobileLessonsOpen ? ` ${styles.chevronOpen}` : ""}`}
              aria-hidden="true"
            />
          </button>
          {mobileLessonsOpen && (
            <div className={styles.mobileSubMenu}>
              {lessonsItems.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  className={styles.mobileSubLink}
                  onClick={() => {
                    setIsOpen(false);
                    setMobileLessonsOpen(false);
                  }}
                >
                  {label}
                </a>
              ))}
            </div>
          )}
          {navLinks.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className={styles.mobileLink}
              onClick={() => setIsOpen(false)}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
