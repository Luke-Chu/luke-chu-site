"use client";

import { useEffect, useRef, useState } from "react";
import { likePhoto, viewPhoto } from "@/lib/photo-api";

type PhotoActionBarProps = {
  photoUuid: string;
  likeCount: number;
  viewCount: number;
  downloadCount: number;
};

export default function PhotoActionBar({
  photoUuid,
  likeCount,
  viewCount,
  downloadCount,
}: PhotoActionBarProps) {
  const [currentLikeCount, setCurrentLikeCount] = useState(likeCount);
  const [currentViewCount, setCurrentViewCount] = useState(viewCount);
  const [isLiked, setIsLiked] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [viewError, setViewError] = useState<string | null>(null);
  const [likeError, setLikeError] = useState<string | null>(null);
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
          <p className="mt-1 font-semibold">{downloadCount}</p>
        </div>
      </div>

      {isViewing ? <p className="mt-2 text-xs text-black/50">正在更新浏览计数...</p> : null}
      {viewError ? <p className="mt-2 text-xs text-red-600">{viewError}</p> : null}
      {likeError ? <p className="mt-2 text-xs text-red-600">{likeError}</p> : null}

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
          disabled
          className="h-10 rounded-lg border border-black/20 text-sm text-black/45"
        >
          下载功能开发中
        </button>
      </div>
    </section>
  );
}
