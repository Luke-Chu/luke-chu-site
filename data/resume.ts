export type EducationEntry = {
  school: string;
  major: string;
  degree: string;
  period: string;
  notes: string[];
};

export type SkillGroup = {
  title: string;
  summary: string;
  items: string[];
};

export type ExperienceEntry = {
  company: string;
  role: string;
  team: string;
  period: string;
  summary: string;
  highlights: string[];
  stack: string[];
};

export type ProjectEntry = {
  name: string;
  description: string;
  role: string;
  techStack: string[];
  highlights: string[];
};

export const education: EducationEntry[] = [
  {
    school: "长安大学",
    major: "计算机科学与技术",
    degree: "硕士",
    period: "2023 - 2026",
    notes: ["研究方向：智能系统与软件工程", "关注后端稳定性与 AI 应用落地"],
  },
  {
    school: "长安大学",
    major: "计算机科学与技术",
    degree: "本科",
    period: "2019 - 2023",
    notes: ["系统学习数据结构、操作系统、数据库与计算机网络"],
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: "后端开发",
    summary: "以 Java 生态为核心，强调工程可维护性与交付效率。",
    items: ["Java", "Spring Boot", "MyBatis"],
  },
  {
    title: "分布式系统",
    summary: "具备缓存、存储与检索系统的落地经验。",
    items: ["Redis", "MySQL", "Elasticsearch"],
  },
  {
    title: "AI 应用工程",
    summary: "围绕检索增强与交互质量优化构建应用。",
    items: ["RAG", "Prompt Engineering", "Embedding Workflow"],
  },
  {
    title: "前端基础",
    summary: "支持后台管理端与展示页面开发协作。",
    items: ["HTML", "CSS", "JavaScript"],
  },
];

export const experience: ExperienceEntry[] = [
  {
    company: "美团",
    role: "后端工程师实习生",
    team: "基础平台相关团队",
    period: "2025.05 - 2025.08",
    summary:
      "参与基础数据治理与巡检系统建设，推动接口统一、规则化巡检和数据回流链路完善。",
    highlights: [
      "设计并实现 DNS + MGW 数据统一接口，降低多来源查询复杂度",
      "开发 CMDB 元信息巡检接口，提升数据完整性与一致性可视化",
      "落地 Domain / Ibase 一致性巡检规则，降低配置偏差风险",
      "参与 CMDB 数据回流机制建设，完善回写链路与失败重试策略",
      "基于 Cobra 实现巡检任务调度工具，支持批量执行与可观测日志输出",
    ],
    stack: ["Go", "Cobra", "CMDB", "Internal Platform"],
  },
];

export const projects: ProjectEntry[] = [
  {
    name: "LabMind",
    description: "面向科研场景的知识助理系统，提供可信检索与可追溯回答能力。",
    role: "后端负责人 / AI 应用开发",
    techStack: ["Spring Boot", "MinIO", "Elasticsearch", "Embedding API"],
    highlights: [
      "构建 Hybrid Retrieval 流程，平衡召回率与结果相关性",
      "实现基于用户与文档元数据的权限过滤链路",
      "支持流式回答输出，降低长回答等待感知",
      "沉淀可扩展的知识库导入、切片与向量化处理流程",
    ],
  },
];

export const summaryItems = [
  "持续学习能力强，能快速掌握新技术并在业务中落地。",
  "团队协作意识强，重视沟通效率与跨角色协同。",
  "主动性和责任感强，能从问题发现走到方案闭环。",
  "对工程质量有长期视角，关注稳定性、可观测与可维护性。",
];
