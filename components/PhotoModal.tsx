"use client";

import Image from "next/image";
import { useEffect } from "react";
import type { Photo } from "@/data/photos";

type PhotoModalProps = {
  photo: Photo | null;
  onClose: () => void;
};

export default function PhotoModal({ photo, onClose }: PhotoModalProps) {
  useEffect(() => {
    if (!photo) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [photo, onClose]);

  if (!photo) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl border border-[#27272a] bg-[#0a0a0a]"
        onClick={(event) => event.stopPropagation()}
      >
        <Image
          src={photo.image}
          alt={photo.title}
          width={1600}
          height={1000}
          className="h-auto max-h-[80vh] w-full object-contain"
        />
        <div className="flex items-center justify-between border-t border-[#27272a] p-4">
          <div>
            <p className="text-sm">{photo.title}</p>
            <p className="text-xs text-[#a1a1aa]">{photo.category}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="border border-[#27272a] px-3 py-1 text-xs text-[#a1a1aa] transition-colors hover:text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
