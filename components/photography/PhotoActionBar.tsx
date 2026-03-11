type PhotoActionBarProps = {
  likeCount: number;
  viewCount: number;
  downloadCount: number;
};

export default function PhotoActionBar({ likeCount, viewCount, downloadCount }: PhotoActionBarProps) {
  return (
    <section className="rounded-xl border border-black/10 bg-white p-4">
      <div className="grid grid-cols-3 gap-3 text-sm">
        <div className="rounded-lg bg-black/[0.03] px-3 py-2 text-center">
          <p className="text-xs text-black/50">点赞</p>
          <p className="mt-1 font-semibold">{likeCount}</p>
        </div>
        <div className="rounded-lg bg-black/[0.03] px-3 py-2 text-center">
          <p className="text-xs text-black/50">浏览</p>
          <p className="mt-1 font-semibold">{viewCount}</p>
        </div>
        <div className="rounded-lg bg-black/[0.03] px-3 py-2 text-center">
          <p className="text-xs text-black/50">下载</p>
          <p className="mt-1 font-semibold">{downloadCount}</p>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <button
          type="button"
          disabled
          className="h-10 rounded-lg border border-black/20 text-sm text-black/45"
        >
          点赞功能开发中
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
