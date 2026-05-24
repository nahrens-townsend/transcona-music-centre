import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./InstrumentsSection.module.scss";
import guitarImage from "@/assets/images/guitar.jpg";
import singImage from "@/assets/images/sing.jpg";
import pianoImage from "@/assets/images/piano.jpg";
import violinImage from "@/assets/images/violin.jpg";

const INSTRUMENTS = [
  {
    name: "Guitar",
    route: "/guitar",
    image: guitarImage,
    alt: "Acoustic guitar resting against a warm background",
  },
  {
    name: "Voice",
    route: "/voice",
    image: singImage,
    alt: "Singer performing with a microphone",
  },
  {
    name: "Piano",
    route: "/piano",
    image: pianoImage,
    alt: "Close-up of piano keys",
  },
  {
    name: "Violin",
    route: "/violin",
    image: violinImage,
    alt: "Violin with bow on a dark surface",
  },
] as const;

// Time to wait after section enters viewport before enabling hover transitions.
// Covers the longest stagger: 3 × 0.3s + 1.7s duration + 0.35s title delay + buffer.
const REVEAL_COMPLETE_MS = 3200;

export default function InstrumentsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  // Enabled after all reveal animations finish so hover uses fast transitions
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (visible) return;

    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => setRevealed(true), REVEAL_COMPLETE_MS);
    return () => clearTimeout(timer);
  }, [visible]);

  const sectionClass = [
    styles.section,
    visible ? styles.sectionVisible : "",
    revealed ? styles.sectionRevealed : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      ref={sectionRef}
      className={sectionClass}
      aria-label="Instruments we teach"
    >
      {INSTRUMENTS.map((instrument) => (
        <Link
          key={instrument.name}
          to={instrument.route}
          className={styles.item}
          aria-label={`Explore ${instrument.name} lessons`}
        >
          <img
            className={styles.image}
            src={instrument.image}
            alt={instrument.alt}
            loading="lazy"
          />
          <div className={styles.imageOverlay} aria-hidden="true" />
          <div className={styles.titleWrap}>
            <h2 className={styles.title}>{instrument.name}</h2>
          </div>
        </Link>
      ))}
    </section>
  );
}
