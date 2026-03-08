export type EducationEntry = {
  school: string;
  major: string;
  degree: string;
  period: string;
};

export type SkillGroup = {
  title: string;
  items: string[];
};

export type ExperienceEntry = {
  company: string;
  role: string;
  period: string;
  highlights: string[];
};

export type ProjectEntry = {
  name: string;
  description: string;
  techStack: string[];
  highlights: string[];
};

export const education: EducationEntry[] = [
  {
    school: "\u957f\u5b89\u5927\u5b66",
    major: "\u8ba1\u7b97\u673a\u79d1\u5b66\u4e0e\u6280\u672f",
    degree: "\u7855\u58eb",
    period: "2023 - 2026",
  },
  {
    school: "\u957f\u5b89\u5927\u5b66",
    major: "\u8ba1\u7b97\u673a\u79d1\u5b66\u4e0e\u6280\u672f",
    degree: "\u672c\u79d1",
    period: "2019 - 2023",
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: "Backend",
    items: ["Java", "Spring Boot", "MyBatis"],
  },
  {
    title: "Distributed Systems",
    items: ["Redis", "MySQL", "Elasticsearch"],
  },
  {
    title: "AI Applications",
    items: ["RAG", "Prompt Engineering"],
  },
  {
    title: "Frontend",
    items: ["HTML", "CSS", "JavaScript"],
  },
];

export const experience: ExperienceEntry[] = [
  {
    company: "\u7f8e\u56e2",
    role: "Backend Engineer Intern",
    period: "2025.05 - 2025.08",
    highlights: [
      "DNS + MGW \u6570\u636e\u7edf\u4e00\u63a5\u53e3",
      "CMDB \u5143\u4fe1\u606f\u5de1\u68c0\u63a5\u53e3",
      "Domain/Ibase \u4e00\u81f4\u6027\u5de1\u68c0",
      "CMDB \u6570\u636e\u56de\u6d41\u673a\u5236",
      "\u57fa\u4e8e Cobra \u7684\u5de1\u68c0\u4efb\u52a1\u8c03\u5ea6\u5de5\u5177",
    ],
  },
];

export const projects: ProjectEntry[] = [
  {
    name: "LabMind",
    description: "\u57fa\u4e8e RAG \u7684\u79d1\u7814\u77e5\u8bc6\u52a9\u7406\u7cfb\u7edf",
    techStack: ["Spring Boot", "MinIO", "Elasticsearch", "Embedding API"],
    highlights: [
      "Hybrid Retrieval",
      "\u6743\u9650\u8fc7\u6ee4",
      "\u6d41\u5f0f\u56de\u7b54",
    ],
  },
];

export const summaryItems = [
  "\u6301\u7eed\u5b66\u4e60\u80fd\u529b\u5f3a",
  "\u56e2\u961f\u5408\u4f5c\u610f\u8bc6\u5f3a",
  "\u4e3b\u52a8\u6027\u548c\u8d23\u4efb\u611f\u5f3a",
];
