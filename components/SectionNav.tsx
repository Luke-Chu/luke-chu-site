"use client";

import { useEffect, useMemo, useState } from "react";

type SectionNavItem = {
  id: string;
  label: string;
};

type SectionNavProps = {
  items: SectionNavItem[];
};

export default function SectionNav({ items }: SectionNavProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const sectionElements = items
      .map((item) => document.getElementById(item.id))
      .filter((item): item is HTMLElement => item !== null);

    if (sectionElements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-45% 0px -45% 0px",
        threshold: [0.2, 0.4, 0.6, 0.8],
      },
    );

    sectionElements.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [items]);

  const activeIndex = Math.max(
    0,
    items.findIndex((item) => item.id === activeId),
  );

  const visibleItems = useMemo(
    () => items.filter((_, index) => Math.abs(index - activeIndex) <= 1),
    [activeIndex, items],
  );

  const handleClick = (id: string) => {
    const target = document.getElementById(id);
    if (!target) {
      return;
    }

    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${id}`);
    setActiveId(id);
  };

  return (
    <aside className="pointer-events-none fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
      <div className="pointer-events-auto rounded-full border border-black/10 bg-white/75 px-4 py-5 backdrop-blur">
        <ul className="space-y-3">
          {visibleItems.map((item) => {
            const index = items.findIndex((entry) => entry.id === item.id);
            const distance = Math.abs(index - activeIndex);
            const current = distance === 0;

            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => handleClick(item.id)}
                  className={`block text-left text-sm transition-all ${
                    current
                      ? "scale-100 font-medium text-black opacity-100"
                      : "scale-95 font-normal text-black/45 opacity-70 hover:text-black/70"
                  }`}
                >
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
