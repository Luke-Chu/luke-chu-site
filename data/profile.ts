export type Contact = {
  label: string;
  value: string;
  href?: string;
  external?: boolean;
};

export const profile = {
  name: "Luke Chu",
  role: "后端工程师",
  tagline: "构建可靠的后端系统与 AI 应用，让复杂能力稳定落地。",
  intro:
    "我专注于 Java 后端、分布式架构与 AI 工程化实践，关注系统可维护性、稳定性和可观测性。",
  focus: [
    "后端架构设计",
    "分布式系统治理",
    "RAG 应用工程化",
    "业务系统性能优化",
  ],
  resumeHref: "/resume.pdf",
  contacts: [
    {
      label: "邮箱",
      value: "luke.chu@outlook.com",
      href: "mailto:luke.chu@outlook.com",
    },
    {
      label: "GitHub",
      value: "github.com/Luke-Chu",
      href: "https://github.com/Luke-Chu",
      external: true,
    },
    {
      label: "所在地",
      value: "中国 · 西安",
    },
  ] satisfies Contact[],
};
