"use client";

import Image from "next/image";
import { useState } from "react";
import type { Photo } from "@/data/photos";
import PhotoModal from "@/components/PhotoModal";

type PhotoGalleryProps = {
  photos: Photo[];
};

export default function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [activePhoto, setActivePhoto] = useState<Photo | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {photos.map((photo) => (
          <button
            key={photo.id}
            type="button"
            className="group text-left"
            onClick={() => setActivePhoto(photo)}
          >
            <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_10px_25px_rgba(0,0,0,0.04)]">
              <Image
                src={photo.image}
                alt={photo.title}
                width={640}
                height={426}
                quality={55}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                loading="lazy"
                className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <p className="mt-3 text-sm font-medium">{photo.title}</p>
            <p className="mt-1 text-xs text-black/50">{photo.category}</p>
          </button>
        ))}
      </div>

      <PhotoModal photo={activePhoto} onClose={() => setActivePhoto(null)} />
    </>
  );
}
