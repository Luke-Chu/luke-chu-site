import type { ExperienceEntry } from "@/data/resume";

type ExperienceItemProps = {
  item: ExperienceEntry;
};

export default function ExperienceItem({ item }: ExperienceItemProps) {
  return (
    <article className="border border-[#27272a] p-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <h3 className="text-xl font-medium">{item.company}</h3>
        <p className="text-sm text-[#a1a1aa]">{item.period}</p>
      </div>
      <p className="mt-2 text-sm text-[#a1a1aa]">{item.role}</p>

      <ul className="mt-5 space-y-2 text-sm text-[#a1a1aa]">
        {item.highlights.map((highlight) => (
          <li key={highlight} className="border-l border-[#27272a] pl-3">
            {highlight}
          </li>
        ))}
      </ul>
    </article>
  );
}
