import ExperienceItem from "@/components/ExperienceItem";
import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import ScrollSection from "@/components/ScrollSection";
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
  { id: "overview", label: "总览" },
  { id: "education", label: "教育" },
  { id: "skills", label: "技能" },
  { id: "experience", label: "经历" },
  { id: "projects", label: "项目" },
  { id: "summary", label: "总结" },
];

export default function Home() {
  return (
    <main>
      <SectionNav items={sectionItems} />

      <ScrollSection id="overview" className="bg-white">
        <Hero
          name={profile.name}
          role={profile.role}
          tagline={profile.tagline}
          intro={profile.intro}
          focus={profile.focus}
          contacts={profile.contacts}
          resumeHref={profile.resumeHref}
        />
      </ScrollSection>

      <ScrollSection id="education" className="border-y border-black/10 bg-[#fafafa]">
        <div className="mx-auto w-full max-w-5xl px-6">
          <div className="mb-10 text-center">
            <p className="text-xs tracking-[0.2em] text-black/40">教育</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">教育背景</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {education.map((item) => (
              <article
                key={`${item.school}-${item.period}`}
                className="rounded-3xl border border-black/10 bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
              >
                <p className="text-sm text-black/45">{item.period}</p>
                <h3 className="mt-2 text-xl font-semibold">{item.school}</h3>
                <p className="mt-1 text-sm text-black/65">
                  {item.major} · {item.degree}
                </p>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-black/60">
                  {item.notes.map((note) => (
                    <li key={note}>• {note}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </ScrollSection>

      <ScrollSection id="skills" className="border-b border-black/10 bg-[#f5f5f5]">
        <div className="mx-auto w-full max-w-5xl px-6">
          <div className="mb-10 text-center">
            <p className="text-xs tracking-[0.2em] text-black/40">技能</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">技术能力</h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {skillGroups.map((group) => (
              <article
                key={group.title}
                className="rounded-3xl border border-black/10 bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
              >
                <h3 className="text-lg font-semibold">{group.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-black/60">{group.summary}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-black/15 px-3 py-1 text-xs text-black/60"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </ScrollSection>

      <ScrollSection id="experience" className="border-b border-black/10 bg-[#fafafa]">
        <div className="mx-auto w-full max-w-5xl px-6">
          <div className="mb-10 text-center">
            <p className="text-xs tracking-[0.2em] text-black/40">经历</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">实践经历</h2>
          </div>
          <div className="space-y-5">
            {experience.map((item) => (
              <ExperienceItem key={`${item.company}-${item.period}`} item={item} />
            ))}
          </div>
        </div>
      </ScrollSection>

      <ScrollSection id="projects" className="border-b border-black/10 bg-[#f7f7f7]">
        <div className="mx-auto w-full max-w-5xl px-6">
          <div className="mb-10 text-center">
            <p className="text-xs tracking-[0.2em] text-black/40">项目</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">项目展示</h2>
          </div>
          <div className="space-y-5">
            {projects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </div>
        </div>
      </ScrollSection>

      <ScrollSection id="summary" className="bg-[#f3f4f6]">
        <div className="mx-auto w-full max-w-4xl px-6">
          <div className="mb-10 text-center">
            <p className="text-xs tracking-[0.2em] text-black/40">总结</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">个人总结</h2>
          </div>
          <ul className="space-y-4">
            {summaryItems.map((item) => (
              <li
                key={item}
                className="rounded-2xl border border-black/10 bg-white px-5 py-4 text-sm leading-relaxed text-black/70 shadow-[0_8px_24px_rgba(0,0,0,0.04)] md:text-base"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </ScrollSection>
    </main>
  );
}
