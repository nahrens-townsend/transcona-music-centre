import { useEffect, useRef, useState } from "react";
import styles from "./PhilosophySection.module.scss";
import QuarterNote from "@/assets/icons/quarter-note.svg?react";
import EighthNotes from "@/assets/icons/eighth-notes.svg?react";

export default function PhilosophySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

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

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${visible ? styles.sectionVisible : ""}`}
      aria-label="Our philosophy and teachers"
    >
      <div className={styles.inner}>
        <div className={`${styles.panel} ${styles.panelLeft}`}>
          <div className={styles.iconWrap} aria-hidden="true">
            <QuarterNote />
          </div>
          <div className={styles.content}>
            <h2 className={styles.title}>Our Philosophy</h2>
            <p className={styles.body}>
              Our focus is to give the best musical education.&ensp;We believe
              that anyone can learn and benefit through the individual
              expression of music.
            </p>
          </div>
        </div>

        <div className={styles.divider} aria-hidden="true" />

        <div className={`${styles.panel} ${styles.panelRight}`}>
          <div className={styles.iconWrap} aria-hidden="true">
            <EighthNotes />
          </div>
          <div className={styles.content}>
            <h2 className={styles.title}>Our Teachers</h2>
            <p className={styles.body}>
              We come from a diverse range of backgrounds, styles, interests and
              personalities.&ensp;We are all experienced, professional and
              qualified.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
