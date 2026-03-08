"use client";

import { useEffect, useState } from "react";

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
        rootMargin: "-35% 0px -55% 0px",
        threshold: [0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    sectionElements.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [items]);

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
    <aside className="hidden lg:block">
      <div className="sticky top-[120px]">
        <h2 className="mb-4 text-xs uppercase tracking-[0.2em] text-[#a1a1aa]">About</h2>
        <nav aria-label="Section navigation">
          <ul className="space-y-3 text-sm">
            {items.map((item) => {
              const active = activeId === item.id;

              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => handleClick(item.id)}
                    className={`text-left transition-colors ${
                      active ? "text-white" : "text-[#a1a1aa] hover:text-white"
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
