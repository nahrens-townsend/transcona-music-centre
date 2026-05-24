import { useEffect, useRef, useState } from "react";
import styles from "./LessonsSection.module.scss";
import registrationPdf from "@/assets/pdfs/registration-letter.pdf";
import preauthorizationPdf from "@/assets/pdfs/preauthorization-form.pdf";

export default function LessonsSection() {
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
      aria-label="Our lessons"
    >
      <div className={styles.inner}>
        <h2 className={styles.title}>OUR LESSONS</h2>
        <p className={styles.body}>
          Our teaching year includes 40 lessons from September to June, though
          you can register at any time during the year even mid-month. Lessons
          are 30 minutes in duration on a weekly basis for a monthly fee of $95.
        </p>
        <div className={styles.buttons}>
          <a
            href={registrationPdf}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btn}
          >
            REGISTRATION FORM
          </a>
          <a
            href={preauthorizationPdf}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btn}
          >
            PREAUTHORIZATION FORM
          </a>
        </div>
      </div>
    </section>
  );
}
