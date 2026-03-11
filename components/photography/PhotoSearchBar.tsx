"use client";

import { useEffect, useState, type FormEvent } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type PhotoSearchBarProps = {
  initialQuery: string;
};

export default function PhotoSearchBar({ initialQuery }: PhotoSearchBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const currentSearchParams = useSearchParams();
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextSearchParams = new URLSearchParams(currentSearchParams.toString());
    const trimmedQuery = query.trim();

    if (trimmedQuery) {
      nextSearchParams.set("q", trimmedQuery);
    } else {
      nextSearchParams.delete("q");
    }

    nextSearchParams.set("page", "1");

    const nextQueryString = nextSearchParams.toString();
    router.push(nextQueryString ? `${pathname}?${nextQueryString}` : pathname);
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full items-center gap-2 sm:gap-3">
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="搜索标题、标签、文件名，如：天空 风筝 日落"
        className="h-12 min-w-0 flex-1 rounded-xl border border-black/15 bg-white px-4 text-sm text-black outline-none transition focus:border-black/40 focus:ring-2 focus:ring-black/10"
      />
      <button
        type="submit"
        className="h-12 shrink-0 rounded-xl border border-black bg-black px-4 text-sm font-medium text-white transition hover:opacity-90 sm:px-6"
      >
        搜索
      </button>
    </form>
  );
}
