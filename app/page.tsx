import ExperienceItem from "@/components/ExperienceItem";
import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import SectionNav from "@/components/SectionNav";
import { profile } from "@/data/profile";
import {
  education,
  experience,
  projects,
  skillGroups,
  summaryItems,
} from "@/data/resume";

const sectionItems = [
  { id: "overview", label: "Overview" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "summary", label: "Summary" },
];

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-6 pb-24 pt-10">
      <div className="lg:grid lg:grid-cols-[180px_minmax(0,1fr)] lg:gap-16">
        <SectionNav items={sectionItems} />

        <div className="space-y-20">
          <section id="overview" className="scroll-mt-28">
            <Hero
              name={profile.name}
              role={profile.role}
              tagline={profile.tagline}
              contacts={profile.contacts}
              resumeHref={profile.resumeHref}
            />
          </section>

          <section id="education" className="scroll-mt-28 border-t border-[#27272a] pt-10">
            <h2 className="text-xs uppercase tracking-[0.2em] text-[#a1a1aa]">
              Education
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {education.map((item) => (
                <article key={item.period} className="border border-[#27272a] p-5">
                  <p className="text-sm text-[#a1a1aa]">{item.period}</p>
                  <h3 className="mt-2 text-lg font-medium">{item.school}</h3>
                  <p className="mt-1 text-sm text-[#a1a1aa]">{item.major}</p>
                  <p className="mt-3 text-sm">{item.degree}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="skills" className="scroll-mt-28 border-t border-[#27272a] pt-10">
            <h2 className="text-xs uppercase tracking-[0.2em] text-[#a1a1aa]">Skills</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {skillGroups.map((group) => (
                <article key={group.title} className="border border-[#27272a] p-5">
                  <h3 className="text-sm font-medium">{group.title}</h3>
                  <ul className="mt-3 space-y-2 text-sm text-[#a1a1aa]">
                    {group.items.map((skill) => (
                      <li key={skill}>{skill}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section id="experience" className="scroll-mt-28 border-t border-[#27272a] pt-10">
            <h2 className="text-xs uppercase tracking-[0.2em] text-[#a1a1aa]">
              Experience
            </h2>
            <div className="mt-6 space-y-5">
              {experience.map((item) => (
                <ExperienceItem key={`${item.company}-${item.period}`} item={item} />
              ))}
            </div>
          </section>

          <section id="projects" className="scroll-mt-28 border-t border-[#27272a] pt-10">
            <h2 className="text-xs uppercase tracking-[0.2em] text-[#a1a1aa]">Projects</h2>
            <div className="mt-6 space-y-5">
              {projects.map((project) => (
                <ProjectCard key={project.name} project={project} />
              ))}
            </div>
          </section>

          <section id="summary" className="scroll-mt-28 border-t border-[#27272a] pt-10">
            <h2 className="text-xs uppercase tracking-[0.2em] text-[#a1a1aa]">Summary</h2>
            <ul className="mt-6 space-y-3 text-sm text-[#a1a1aa]">
              {summaryItems.map((item) => (
                <li key={item} className="border-l border-[#27272a] pl-4">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
