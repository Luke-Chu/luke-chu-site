"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "关于我" },
  { href: "/photography", label: "摄影" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b border-black/10 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl justify-center px-6 py-4">
        <div className="flex items-center gap-10 text-base">
          {links.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors ${
                  active
                    ? "font-medium text-black"
                    : "text-black/50 hover:text-black"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
