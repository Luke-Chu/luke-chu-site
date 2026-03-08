export type Contact = {
  label: string;
  value: string;
  href?: string;
  external?: boolean;
};

export const profile = {
  name: "Luke Chu",
  role: "后端开发工程师",
  tagline: "热爱技术，追求代码的优雅与效率。",
  intro:
    "我是应届毕业生，具备扎实的后端开发基础与持续学习能力，能够快速理解复杂业务并推动需求落地。重视团队沟通与协作，在项目中保持主动性和执行力，注重代码质量、交付效率与长期可维护性。",
  focus: [
    "扎实技术基础",
    "快速学习能力",
    "高效沟通协作",
    "主动负责推进",
  ],
  resumeHref: "/resume.pdf",
  contacts: [
    {
      label: "邮箱",
      value: "chu@chd.edu.cn",
      href: "mailto:chu@chd.edu.cn",
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
