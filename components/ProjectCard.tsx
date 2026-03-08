import type { ProjectEntry } from "@/data/resume";

type ProjectCardProps = {
  project: ProjectEntry;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="rounded-3xl border border-black/10 bg-white p-7 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <h3 className="text-2xl font-semibold tracking-tight">{project.name}</h3>
        <p className="text-sm text-black/55">{project.role}</p>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-black/70">{project.description}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-black/15 px-3 py-1 text-xs text-black/55"
          >
            {tech}
          </span>
        ))}
      </div>

      <ul className="mt-6 space-y-3 text-sm leading-relaxed text-black/70">
        {project.highlights.map((highlight) => (
          <li key={highlight} className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-black/40" />
            <span>{highlight}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
