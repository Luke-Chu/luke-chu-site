import Link from "next/link";

type PhotoDetailErrorProps = {
  message: string;
};

export default function PhotoDetailError({ message }: PhotoDetailErrorProps) {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-[#fcfcfc] px-6 py-16">
      <section className="mx-auto max-w-3xl rounded-2xl border border-red-200 bg-red-50 p-8">
        <h1 className="text-lg font-semibold text-red-700">加载图片详情失败</h1>
        <p className="mt-3 text-sm text-red-700/90">{message}</p>

        <Link
          href="/photography"
          className="mt-6 inline-flex h-10 items-center rounded-lg border border-red-300 bg-white px-4 text-sm text-red-700"
        >
          返回摄影列表
        </Link>
      </section>
    </main>
  );
}
