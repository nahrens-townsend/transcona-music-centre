import { useEffect, useRef, useState } from "react";
import styles from "./VideoHero.module.scss";

import accordionVideo from "@/assets/videos/accordion.mp4";
import celloVideo from "@/assets/videos/cello.mp4";
import fluteVideo from "@/assets/videos/flute.mp4";
import pianoVideo from "@/assets/videos/piano.mp4";

const VIDEOS = [accordionVideo, celloVideo, fluteVideo, pianoVideo];
const SLIDE_DURATION = 5000;
const FADE_DURATION = 1200;

export default function VideoHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  // Single ref — only one fade is ever in-flight at a time (5s interval > 1.2s fade)
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Live-updating reduced-motion preference (responds to OS setting changes)
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Single source of truth for play/pause — reacts to both active video and motion pref
  useEffect(() => {
    const el = videoRefs.current[activeIndex];
    if (!el) return;
    if (reducedMotion) {
      el.pause();
    } else {
      void el.play().catch(() => {});
    }
  }, [activeIndex, reducedMotion]);

  // Auto-rotation — only runs when motion is allowed
  useEffect(() => {
    if (reducedMotion) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % VIDEOS.length;

        // Reset next video to start before it plays
        const nextEl = videoRefs.current[next];
        if (nextEl) nextEl.currentTime = 0;

        // Pause the outgoing video after the CSS fade completes
        const prevEl = videoRefs.current[prev];
        if (fadeTimerRef.current !== null) clearTimeout(fadeTimerRef.current);
        fadeTimerRef.current = setTimeout(() => {
          prevEl?.pause();
          fadeTimerRef.current = null;
        }, FADE_DURATION);

        return next;
      });
    }, SLIDE_DURATION);

    return () => {
      clearInterval(timer);
      if (fadeTimerRef.current !== null) {
        clearTimeout(fadeTimerRef.current);
        fadeTimerRef.current = null;
      }
    };
  }, [reducedMotion]);

  return (
    <section className={styles.hero} aria-label="Rotating instrument showcase">
      <div className={styles.videos} aria-hidden="true">
        {VIDEOS.map((src, i) => (
          <video
            key={src}
            ref={(el) => { videoRefs.current[i] = el; }}
            className={`${styles.video} ${i === activeIndex ? styles.active : ""}`}
            src={src}
            muted
            loop
            playsInline
          />
        ))}
      </div>
      <div className={styles.overlay} aria-hidden="true" />

      {/* Centred text — no aria-hidden so screen readers announce the page name */}
      <div className={styles.content}>
        <h1 className={styles.title}>Transcona Music Centre</h1>
        <p className={styles.subtitle}>Music for all&hellip;&nbsp;&nbsp;Music for a lifetime&hellip;</p>
      </div>
    </section>
  );
}
