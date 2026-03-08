import ExperienceItem from "@/components/ExperienceItem";
import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import ScrollSection from "@/components/ScrollSection";
import SectionNav from "@/components/SectionNav";
import { profile } from "@/data/profile";
import { education, experience, projects, skillCards, summaryItems } from "@/data/resume";

const sectionItems = [
  { id: "overview", label: "总览" },
  { id: "education", label: "教育" },
  { id: "skills", label: "技能" },
  { id: "internship", label: "实习" },
  { id: "projects", label: "项目" },
  { id: "summary", label: "评价" },
];

export default function Home() {
  return (
    <main>
      <SectionNav items={sectionItems} />

      <ScrollSection id="overview" className="bg-white" direction="up">
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

      <ScrollSection
        id="education"
        className="border-y border-black/10 bg-[#fafafa]"
        direction="down"
      >
        <div className="mx-auto w-full max-w-5xl px-6">
          <h2 className="mb-10 text-center text-3xl font-semibold tracking-tight md:text-4xl">
            教育背景
          </h2>

          <div className="space-y-5">
            {education.map((item) => (
              <article
                key={`${item.school}-${item.period}`}
                className="rounded-3xl border border-black/10 bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
              >
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <p className="text-base font-semibold">{item.school}</p>
                  <p className="text-sm text-black/70">{item.majorAndDegree}</p>
                  <p className="text-sm text-black/50">{item.period}</p>
                </div>

                <ul className="mt-5 space-y-2 text-sm leading-relaxed text-black/70">
                  {item.achievements.map((achievement) => (
                    <li key={achievement} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-black/40" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </ScrollSection>

      <ScrollSection id="skills" className="border-b border-black/10 bg-[#f5f5f5]" direction="up">
        <div className="mx-auto w-full max-w-5xl px-6">
          <h2 className="mb-10 text-center text-3xl font-semibold tracking-tight md:text-4xl">
            技术能力
          </h2>

          <div className="grid gap-5 sm:grid-cols-2">
            {skillCards.map((card) => (
              <article
                key={card.title}
                className="rounded-3xl border border-black/10 bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
              >
                <h3 className="text-lg font-semibold">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-black/65">{card.summary}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {card.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-black/15 px-3 py-1 text-xs text-black/55"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </ScrollSection>

      <ScrollSection
        id="internship"
        className="border-b border-black/10 bg-[#fafafa]"
        direction="down"
      >
        <div className="mx-auto w-full max-w-5xl px-6">
          <h2 className="mb-10 text-center text-3xl font-semibold tracking-tight md:text-4xl">
            实习经历
          </h2>
          <div className="space-y-5">
            {experience.map((item) => (
              <ExperienceItem key={`${item.company}-${item.period}`} item={item} />
            ))}
          </div>
        </div>
      </ScrollSection>

      <ScrollSection id="projects" className="border-b border-black/10 bg-[#f7f7f7]" direction="up">
        <div className="mx-auto w-full max-w-5xl px-6">
          <h2 className="mb-10 text-center text-3xl font-semibold tracking-tight md:text-4xl">
            项目经历
          </h2>
          <div className="space-y-5">
            {projects.map((project) => (
              <ProjectCard key={`${project.name}-${project.period}`} project={project} />
            ))}
          </div>
        </div>
      </ScrollSection>

      <ScrollSection id="summary" className="bg-[#f3f4f6]" direction="down">
        <div className="mx-auto w-full max-w-5xl px-6">
          <h2 className="mb-10 text-center text-3xl font-semibold tracking-tight md:text-4xl">
            自我评价
          </h2>
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
