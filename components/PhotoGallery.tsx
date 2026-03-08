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
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {photos.map((photo) => (
          <button
            key={photo.id}
            type="button"
            className="group text-left"
            onClick={() => setActivePhoto(photo)}
          >
            <div className="overflow-hidden border border-[#27272a]">
              <Image
                src={photo.image}
                alt={photo.title}
                width={1200}
                height={800}
                className="h-72 w-full object-cover transition duration-300 group-hover:scale-105"
              />
            </div>
            <p className="mt-3 text-sm">{photo.title}</p>
            <p className="mt-1 text-xs text-[#a1a1aa]">{photo.category}</p>
          </button>
        ))}
      </div>

      <PhotoModal photo={activePhoto} onClose={() => setActivePhoto(null)} />
    </>
  );
}
