"use client";

import { useEffect, useRef, useState } from "react";
import { downloadPhoto, likePhoto, viewPhoto } from "@/lib/photo-api";

type PhotoActionBarProps = {
  photoUuid: string;
  filename?: string | null;
  likeCount: number;
  viewCount: number;
  downloadCount: number;
};

function triggerDownload(downloadUrl: string, filename?: string | null): void {
  const link = document.createElement("a");
  link.href = downloadUrl;
  link.target = "_blank";
  link.rel = "noopener noreferrer";

  if (filename) {
    link.download = filename;
  }

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default function PhotoActionBar({
  photoUuid,
  filename,
  likeCount,
  viewCount,
  downloadCount,
}: PhotoActionBarProps) {
  const [currentLikeCount, setCurrentLikeCount] = useState(likeCount);
  const [currentViewCount, setCurrentViewCount] = useState(viewCount);
  const [currentDownloadCount, setCurrentDownloadCount] = useState(downloadCount);
  const [isLiked, setIsLiked] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [viewError, setViewError] = useState<string | null>(null);
  const [likeError, setLikeError] = useState<string | null>(null);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const viewedUuidRef = useRef<string | null>(null);

  useEffect(() => {
    if (!photoUuid || viewedUuidRef.current === photoUuid) {
      return;
    }

    viewedUuidRef.current = photoUuid;

    const reportView = async () => {
      setIsViewing(true);
      setViewError(null);

      try {
        const data = await viewPhoto(photoUuid);
        setCurrentViewCount(data.viewCount);
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "浏览上报失败";
        setViewError(message);
      } finally {
        setIsViewing(false);
      }
    };

    void reportView();
  }, [photoUuid]);

  async function handleLike() {
    if (!photoUuid || isLiking) {
      return;
    }

    setIsLiking(true);
    setLikeError(null);

    try {
      const data = await likePhoto(photoUuid);
      setCurrentLikeCount(data.likeCount);
      setIsLiked(data.liked);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "点赞失败";
      setLikeError(message);
    } finally {
      setIsLiking(false);
    }
  }

  async function handleDownload() {
    if (!photoUuid || isDownloading) {
      return;
    }

    setIsDownloading(true);
    setDownloadError(null);

    try {
      const data = await downloadPhoto(photoUuid);
      setCurrentDownloadCount(data.downloadCount);
      triggerDownload(data.downloadUrl, filename);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "下载失败";
      setDownloadError(message);
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <section className="rounded-xl border border-black/10 bg-white p-4">
      <div className="grid grid-cols-3 gap-3 text-sm">
        <div className="rounded-lg bg-black/[0.03] px-3 py-2 text-center">
          <p className="text-xs text-black/50">点赞</p>
          <p className="mt-1 font-semibold">{currentLikeCount}</p>
        </div>
        <div className="rounded-lg bg-black/[0.03] px-3 py-2 text-center">
          <p className="text-xs text-black/50">浏览</p>
          <p className="mt-1 font-semibold">{currentViewCount}</p>
        </div>
        <div className="rounded-lg bg-black/[0.03] px-3 py-2 text-center">
          <p className="text-xs text-black/50">下载</p>
          <p className="mt-1 font-semibold">{currentDownloadCount}</p>
        </div>
      </div>

      {isViewing ? <p className="mt-2 text-xs text-black/50">正在更新浏览计数...</p> : null}
      {viewError ? <p className="mt-2 text-xs text-red-600">{viewError}</p> : null}
      {likeError ? <p className="mt-2 text-xs text-red-600">{likeError}</p> : null}
      {downloadError ? <p className="mt-2 text-xs text-red-600">{downloadError}</p> : null}

      <div className="mt-3 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={handleLike}
          disabled={isLiking}
          className="h-10 rounded-lg border border-black/20 text-sm transition hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLiking ? "点赞中..." : isLiked ? "已点赞" : "点赞"}
        </button>
        <button
          type="button"
          onClick={handleDownload}
          disabled={isDownloading}
          className="h-10 rounded-lg border border-black/20 text-sm transition hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isDownloading ? "下载中..." : "下载原图"}
        </button>
      </div>
    </section>
  );
}
