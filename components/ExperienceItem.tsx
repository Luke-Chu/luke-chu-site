import type { ExperienceEntry } from "@/data/resume";

type ExperienceItemProps = {
  item: ExperienceEntry;
};

export default function ExperienceItem({ item }: ExperienceItemProps) {
  return (
    <article className="rounded-3xl border border-black/10 bg-white p-7 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <h3 className="text-2xl font-semibold tracking-tight">
          {item.company} · {item.role}
        </h3>
        <p className="text-sm text-black/50">{item.period}</p>
      </div>

      <p className="mt-5 text-sm leading-relaxed text-black/70">{item.projectIntro}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {item.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-black/15 px-3 py-1 text-xs text-black/55"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-6 space-y-5">
        <h4 className="text-sm font-semibold">主要工作</h4>
        {item.blocks.map((block) => (
          <div key={block.title} className="rounded-2xl border border-black/10 p-5">
            <p className="text-sm font-medium">{block.title}</p>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-black/70">
              {block.details.map((detail) => (
                <li key={detail} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-black/40" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </article>
  );
}
