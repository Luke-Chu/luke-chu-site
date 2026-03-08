"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "About" },
  { href: "/photography", label: "Photography" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b border-[#27272a] bg-black/60 backdrop-blur">
      <div className="mx-auto flex max-w-6xl justify-center px-6 py-4">
        <div className="flex items-center gap-10 text-sm">
          {links.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors ${
                  active ? "text-white" : "text-[#a1a1aa] hover:text-white"
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
