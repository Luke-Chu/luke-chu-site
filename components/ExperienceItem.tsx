import type { ExperienceEntry } from "@/data/resume";

type ExperienceItemProps = {
  item: ExperienceEntry;
};

export default function ExperienceItem({ item }: ExperienceItemProps) {
  return (
    <article className="rounded-3xl border border-black/10 bg-white p-7 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-2xl font-semibold tracking-tight">{item.company}</h3>
          <p className="mt-1 text-sm text-black/60">
            {item.role} · {item.team}
          </p>
        </div>
        <p className="text-sm text-black/50">{item.period}</p>
      </div>

      <p className="mt-6 text-sm leading-relaxed text-black/70">{item.summary}</p>

      <ul className="mt-6 space-y-3 text-sm leading-relaxed text-black/70">
        {item.highlights.map((highlight) => (
          <li key={highlight} className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-black/40" />
            <span>{highlight}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap gap-2">
        {item.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-black/15 px-3 py-1 text-xs text-black/55"
          >
            {tech}
          </span>
        ))}
      </div>
    </article>
  );
}
