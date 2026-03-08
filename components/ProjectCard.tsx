import type { ProjectEntry } from "@/data/resume";

type ProjectCardProps = {
  project: ProjectEntry;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="border border-[#27272a] p-6">
      <h3 className="text-xl font-medium">{project.name}</h3>
      <p className="mt-2 text-sm text-[#a1a1aa]">{project.description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <span key={tech} className="border border-[#27272a] px-2 py-1 text-xs text-[#a1a1aa]">
            {tech}
          </span>
        ))}
      </div>

      <ul className="mt-5 space-y-2 text-sm text-[#a1a1aa]">
        {project.highlights.map((highlight) => (
          <li key={highlight} className="border-l border-[#27272a] pl-3">
            {highlight}
          </li>
        ))}
      </ul>
    </article>
  );
}
