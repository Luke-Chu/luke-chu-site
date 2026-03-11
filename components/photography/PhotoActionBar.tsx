"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { downloadPhoto, likePhoto, viewPhoto } from "@/lib/photo-api";

type PhotoActionBarProps = {
  photoUuid: string;
  filename?: string | null;
  likeCount: number;
  viewCount: number;
  downloadCount: number;
};

function getLikeStorageKey(photoUuid: string): string {
  return `photo-liked:${photoUuid}`;
}

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
  const [viewInfo, setViewInfo] = useState<string | null>(null);
  const [likeInfo, setLikeInfo] = useState<string | null>(null);
  const [downloadInfo, setDownloadInfo] = useState<string | null>(null);
  const viewedUuidRef = useRef<string | null>(null);

  useEffect(() => {
    if (!photoUuid || typeof window === "undefined") {
      return;
    }

    try {
      const savedLiked = window.localStorage.getItem(getLikeStorageKey(photoUuid));
      setIsLiked(savedLiked === "1");
      setLikeInfo(savedLiked === "1" ? "你已点赞过这张图片" : null);
    } catch {
      setIsLiked(false);
      setLikeInfo(null);
    }
  }, [photoUuid]);

  const reportViewCount = useCallback(async () => {
    if (!photoUuid || isViewing) {
      return;
    }

    setIsViewing(true);
    setViewError(null);
    setViewInfo("正在上报浏览计数...");

    try {
      const data = await viewPhoto(photoUuid);
      setCurrentViewCount(data.viewCount);
      setViewInfo("浏览计数已更新");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "浏览上报失败";
      setViewError(message);
      setViewInfo(null);
    } finally {
      setIsViewing(false);
    }
  }, [isViewing, photoUuid]);

  useEffect(() => {
    if (!photoUuid || viewedUuidRef.current === photoUuid) {
      return;
    }

    viewedUuidRef.current = photoUuid;
    void reportViewCount();
  }, [photoUuid, reportViewCount]);

  async function handleLike() {
    if (!photoUuid || isLiking) {
      return;
    }

    setIsLiking(true);
    setLikeError(null);
    setLikeInfo("正在提交点赞...");

    try {
      const data = await likePhoto(photoUuid);
      setCurrentLikeCount(data.likeCount);
      setIsLiked(data.liked);
      setLikeInfo(data.liked ? "点赞成功，感谢支持" : "已点赞过，本次未重复计数");

      if (typeof window !== "undefined") {
        if (data.liked) {
          window.localStorage.setItem(getLikeStorageKey(photoUuid), "1");
        } else {
          window.localStorage.removeItem(getLikeStorageKey(photoUuid));
        }
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "点赞失败";
      setLikeError(message);
      setLikeInfo(null);
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
    setDownloadInfo("正在请求下载链接...");

    try {
      const data = await downloadPhoto(photoUuid);
      setCurrentDownloadCount(data.downloadCount);
      setDownloadInfo("下载已开始");
      triggerDownload(data.downloadUrl, filename);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "下载失败";
      setDownloadError(message);
      setDownloadInfo(null);
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

      <div className="mt-2 space-y-1.5" aria-live="polite">
        {viewInfo ? <p className="text-xs text-black/55">{viewInfo}</p> : null}
        {viewError ? (
          <div className="flex flex-wrap items-center gap-2 text-xs text-red-600">
            <span>{viewError}</span>
            <button
              type="button"
              onClick={() => void reportViewCount()}
              disabled={isViewing}
              className="rounded border border-red-300 px-2 py-0.5 text-[11px] disabled:opacity-60"
            >
              重试浏览上报
            </button>
          </div>
        ) : null}

        {likeInfo ? <p className="text-xs text-black/55">{likeInfo}</p> : null}
        {likeError ? (
          <div className="flex flex-wrap items-center gap-2 text-xs text-red-600">
            <span>{likeError}</span>
            <button
              type="button"
              onClick={() => void handleLike()}
              disabled={isLiking || isLiked}
              className="rounded border border-red-300 px-2 py-0.5 text-[11px] disabled:opacity-60"
            >
              重试点赞
            </button>
          </div>
        ) : null}

        {downloadInfo ? <p className="text-xs text-black/55">{downloadInfo}</p> : null}
        {downloadError ? (
          <div className="flex flex-wrap items-center gap-2 text-xs text-red-600">
            <span>{downloadError}</span>
            <button
              type="button"
              onClick={() => void handleDownload()}
              disabled={isDownloading}
              className="rounded border border-red-300 px-2 py-0.5 text-[11px] disabled:opacity-60"
            >
              重试下载
            </button>
          </div>
        ) : null}
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={handleLike}
          disabled={isLiking || isLiked}
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
