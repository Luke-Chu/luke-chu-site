"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type ScrollSectionProps = {
  id: string;
  className?: string;
  direction?: "up" | "down";
  children: ReactNode;
};

export default function ScrollSection({
  id,
  className = "",
  direction = "up",
  children,
}: ScrollSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
          }
        });
      },
      { threshold: 0.2, rootMargin: "-10% 0px -10% 0px" },
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const hiddenMotionClass =
    direction === "down" ? "-translate-y-8 opacity-0" : "translate-y-8 opacity-0";

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`scroll-mt-24 flex min-h-screen items-center ${className}`}
    >
      <div
        className={`w-full py-16 transition-all duration-700 ${
          visible ? "translate-y-0 opacity-100" : hiddenMotionClass
        }`}
      >
        {children}
      </div>
    </section>
  );
}
