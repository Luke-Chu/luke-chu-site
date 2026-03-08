"use client";

import { useEffect, useMemo, useState } from "react";

type SectionNavItem = {
  id: string;
  label: string;
};

type SectionNavProps = {
  items: SectionNavItem[];
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function SectionNav({ items }: SectionNavProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (items.length === 0) {
      return;
    }

    const sectionElements = items
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => element !== null);

    if (sectionElements.length === 0) {
      return;
    }

    let ticking = false;

    const updateActive = () => {
      const viewportCenter = window.innerHeight / 2;
      let closestIndex = 0;
      let minDistance = Number.POSITIVE_INFINITY;

      sectionElements.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const distance = Math.abs(sectionCenter - viewportCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
      ticking = false;
    };

    const onScrollOrResize = () => {
      if (ticking) {
        return;
      }

      ticking = true;
      window.requestAnimationFrame(updateActive);
    };

    updateActive();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [items]);

  const visibleItems = useMemo(() => {
    if (items.length <= 3) {
      return items;
    }

    const start = clamp(activeIndex - 1, 0, items.length - 3);
    return items.slice(start, start + 3);
  }, [activeIndex, items]);

  const handleClick = (index: number, id: string) => {
    const target = document.getElementById(id);
    if (!target) {
      return;
    }

    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${id}`);
    setActiveIndex(index);
  };

  return (
    <aside className="pointer-events-none fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
      <div className="pointer-events-auto rounded-full border border-black/10 bg-white/75 px-4 py-6 backdrop-blur">
        <ul className="space-y-3">
          {visibleItems.map((item) => {
            const index = items.findIndex((entry) => entry.id === item.id);
            const distance = Math.abs(index - activeIndex);
            const current = distance === 0;

            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => handleClick(index, item.id)}
                  className={`block text-left text-sm transition-all ${
                    current
                      ? "scale-100 font-medium text-black opacity-100"
                      : "scale-95 font-normal text-black/45 opacity-75 hover:text-black/70"
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
