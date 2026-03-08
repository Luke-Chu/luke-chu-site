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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-white"
        onClick={(event) => event.stopPropagation()}
      >
        <Image
          src={photo.image}
          alt={photo.title}
          width={1600}
          height={1000}
          unoptimized
          loading="eager"
          sizes="100vw"
          className="h-auto max-h-[80vh] w-full object-contain bg-[#f6f6f6]"
        />
        <div className="flex items-center justify-between border-t border-black/10 p-4">
          <div>
            <p className="text-sm font-medium">{photo.title}</p>
            <p className="text-xs text-black/55">{photo.category}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-black/15 px-3 py-1 text-xs text-black/60 transition-colors hover:text-black"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  );
}
