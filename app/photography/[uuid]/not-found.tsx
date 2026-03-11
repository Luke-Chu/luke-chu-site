import Link from "next/link";

export default function PhotoDetailNotFound() {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-[#fcfcfc] px-6 py-16">
      <section className="mx-auto max-w-3xl rounded-2xl border border-black/10 bg-white p-8">
        <h1 className="text-2xl font-semibold tracking-tight">未找到该图片</h1>
        <p className="mt-3 text-sm text-black/65">该图片可能不存在、已被移除，或链接地址无效。</p>

        <Link
          href="/photography"
          className="mt-6 inline-flex h-10 items-center rounded-lg border border-black/20 px-4 text-sm transition hover:bg-black hover:text-white"
        >
          返回摄影列表
        </Link>
      </section>
    </main>
  );
}
