export type EducationEntry = {
  school: string;
  majorAndDegree: string;
  period: string;
  achievements: string[];
};

export type SkillCard = {
  title: string;
  summary: string;
  tags: string[];
};

export type ExperienceBlock = {
  title: string;
  details: string[];
};

export type ExperienceEntry = {
  company: string;
  role: string;
  period: string;
  projectIntro: string;
  blocks: ExperienceBlock[];
  stack: string[];
};

export type ProjectEntry = {
  name: string;
  period: string;
  intro: string;
  techStack: string[];
  blocks: ExperienceBlock[];
};

export const education: EducationEntry[] = [
  {
    school: "长安大学（211 双一流）",
    majorAndDegree: "计算机科学与技术 · 硕士",
    period: "2023.09 - 2026.06",
    achievements: [
      "GPA 90.06 / 100（Top2），学术基础扎实，核心课程成绩稳定突出。",
      "发表 CCF-C 类论文 2 篇，持续推进科研问题抽象与工程实现结合。",
      "获 2024“华为杯”第二十一届中国研究生数学建模大赛三等奖。",
      "获 2025 第十六届蓝桥杯全国总决赛三等奖。",
      "获学业一等奖学金等多项荣誉。",
      "担任研究生兼职辅导员，承担学生管理、沟通与组织协调工作。",
    ],
  },
  {
    school: "长安大学（211 双一流）",
    majorAndDegree: "计算机科学与技术 · 本科",
    period: "2019.09 - 2023.06",
    achievements: [
      "GPA 87.5 / 100（Top5），具备完整的计算机基础学科体系。",
      "获国家励志奖学金，学习成绩与综合表现均保持前列。",
      "获全国大学生数学建模大赛陕西省二等奖。",
      "获优秀毕业生、学业优秀奖、课程优秀奖、优秀共青团员、校园贡献奖等荣誉。",
      "担任北校区招生就业处学生助理及班级团支书，积累组织管理与跨角色协作经验。",
    ],
  },
];

export const skillCards: SkillCard[] = [
  {
    title: "Java 基础与并发能力",
    summary:
      "Java 基础扎实，系统掌握 JVM 底层原理、类加载机制与 JUC 并发模型，可支撑高质量后端开发。",
    tags: ["Java", "JVM", "ClassLoader", "JUC", "并发编程"],
  },
  {
    title: "Spring 生态与源码理解",
    summary:
      "熟练使用 Spring Boot、MyBatis-Plus 完成业务开发，并通过阅读自动配置源码理解框架设计思路。",
    tags: ["Spring Boot", "MyBatis-Plus", "Auto Configuration", "源码阅读"],
  },
  {
    title: "数据库与缓存治理",
    summary:
      "熟悉 MySQL、Redis 的核心原理与工程实践，能够针对缓存穿透、击穿、雪崩等问题设计可落地方案。",
    tags: ["MySQL", "Redis", "缓存穿透", "缓存击穿", "缓存雪崩"],
  },
  {
    title: "Golang 企业后端实践",
    summary:
      "具备 Golang 后端开发经验，实践过 Gin、sqlx 等常用工具，能够完成服务接口与数据访问层实现。",
    tags: ["Golang", "Gin", "sqlx", "REST API"],
  },
  {
    title: "AI Coding 与 RAG 应用",
    summary:
      "熟练使用 AI Coding 工具辅助开发，了解提示词工程与 RAG 工作流，可将 AI 技术应用到实际项目。",
    tags: ["AI Coding", "Prompt Engineering", "RAG", "Embedding"],
  },
  {
    title: "前端协作与页面实现",
    summary:
      "了解 HTML5、CSS、JavaScript 技术栈，能够完成网页布局与基础交互实现，支持前后端协同交付。",
    tags: ["HTML5", "CSS", "JavaScript", "页面交互"],
  },
];

export const experience: ExperienceEntry[] = [
  {
    company: "美团",
    role: "后端开发实习生",
    period: "2025.05 - 2025.08",
    projectIntro:
      "Zebra Proxy 是美团自研高可用分布式数据库访问中间件，与运维平台 Halley、DNS 域名系统、Domain 管理平台、MGW 四层负载均衡及 Ibase 管理平台共同构成数据库访问全链路 DNS + MGW + Proxy 新架构。美团各业务正由原 DNS + MGW + MySQL 架构迁移至新架构，Halley 需补全能力以服务集群负责人并支撑迁移落地。",
    blocks: [
      {
        title: "DNS + MGW 统一数据展示",
        details: [
          "实现 DNS + MGW 数据统一接口化展示，补齐原有平台数据可视化空白。",
          "提升多源数据查询便捷性，缩短问题定位路径，提高系统可用性。",
        ],
      },
      {
        title: "CMDB 元信息规范性巡检接口",
        details: [
          "针对新旧架构迁移中的适配问题与逻辑分散，提出“五大类、16 项检查点”抽象框架。",
          "设计并实现标准化、可扩展的巡检体系，系统性发现并排查 CMDB 异常数据。",
          "编写系统化设计文档，便于团队理解、复用与后续迭代扩展。",
        ],
      },
      {
        title: "CMDB 与 Domain/Ibase 一致性巡检",
        details: [
          "针对 Proxy 数据分散、链路复杂的问题，梳理三套系统数据流向并建立 DNS 数据基线。",
          "将初始 5 项巡检点收敛为 3 项核心指标，实现多系统一致性高效校验。",
          "开发过程中严格遵循代码规范与一致性要求，保证模块长期可维护性。",
        ],
      },
      {
        title: "Domain/Ibase 到 CMDB 数据回流机制",
        details: [
          "面对多源数据同步顺序不确定的问题，梳理依赖关系并制定有序回流策略。",
          "实现不一致信息自动同步，降低人工排查与修复成本。",
          "基于 Cobra 构建统一巡检任务调度工具，覆盖所有集群规范性与一致性巡检。",
        ],
      },
    ],
    stack: [
      "基础研发",
      "数据库中间件",
      "Golang",
      "Gin",
      "sqlx",
      "Zebra Proxy",
      "DNS",
      "MGW",
    ],
  },
];

export const projects: ProjectEntry[] = [
  {
    name: "LabMind：基于 RAG 的科研知识助理系统",
    period: "2025.12 - 至今",
    intro:
      "面向课题组科研资料管理场景，设计并实现基于 RAG 的知识助理系统，实现论文、技术文档等资料的智能解析、向量化存储与语义检索，支持用户通过自然语言快速查询科研成果与技术内容。",
    techStack: [
      "Spring Boot",
      "Apache Tika",
      "MinIO",
      "Elasticsearch",
      "Vector Search",
      "BM25",
      "Embedding API",
      "RAG",
    ],
    blocks: [
      {
        title: "科研文档知识化处理链路",
        details: [
          "基于 Apache Tika 解析 PDF / Word 等科研文档并完成文本抽取。",
          "通过文本分块与元数据结构化提升文档可检索性和知识组织效率。",
          "原始文件存储于 MinIO；文本接入阿里云 Embedding API 向量化。",
          "向量与文档元数据统一写入 Elasticsearch，构建可扩展向量索引。",
        ],
      },
      {
        title: "检索增强与问答能力建设",
        details: [
          "基于 Elasticsearch Vector Search 构建语义检索能力。",
          "设计“向量相似度 + BM25 关键词匹配”的 Hybrid Retrieval 策略，提升检索准确率。",
          "结合文档归属标签实现权限过滤，保证结果可见性与安全性。",
          "将检索结果作为上下文注入大模型，形成面向科研场景的 RAG 问答链路。",
        ],
      },
    ],
  },
  {
    name: "趣桌玩汇：桌游社交与消费平台",
    period: "2025.01 - 2025.03",
    intro:
      "趣桌玩汇是一个基于 Spring Boot 开发、支持微信扫码登录的桌游交流与消费平台。平台支持商家入驻，集签到、互相关注、动态发布、优惠券抢购及附近桌游店查询等功能于一体，并支持 UV 统计，通过整合交流与消费场景提升用户互动体验。",
    techStack: [
      "Spring Boot",
      "Redis",
      "Lua",
      "RabbitMQ",
      "DLX",
      "MySQL",
      "WeChat Login",
    ],
    blocks: [
      {
        title: "高并发抢购与异步下单优化",
        details: [
          "基于 Redis Lua 原子脚本实现库存预扣与“一人一单”资格校验。",
          "将竞争逻辑前置到 Redis，构建无锁、高吞吐资格判断能力。",
          "结合 RabbitMQ 异步削峰，将订单创建由同步改为异步处理。",
          "接口响应时间降低约 85%，系统吞吐量提升约 94%。",
        ],
      },
      {
        title: "一致性保障与异常兜底机制",
        details: [
          "在异步链路中实现幂等校验、数据库乐观锁（stock > 0 条件更新）与 Redis 补偿。",
          "确保不超卖、不重单、不丢单，保障交易链路数据一致性。",
          "引入死信队列（DLX）处理消费失败兜底，提升系统稳定性。",
          "结合延时消息实现订单超时关闭与库存回补，形成完整业务闭环。",
        ],
      },
    ],
  },
];

export const summaryItems = [
  "学习能力强并能快速理解业务：对新技术和业务流程保持高热情，能在短时间内掌握 Spring、Golang、Gin 等技术栈并投入实际开发。",
  "适应能力强并能在高压下高效工作：从学生角色快速切换到企业协作节奏，在高强度任务与紧迫周期中依然保持稳定交付。",
  "团队沟通协作能力强并具备管理意识：擅长跨角色沟通与资源协调，在实习、竞赛、学生工作中推动团队目标达成。",
  "主动性与责任感突出：能够从问题识别到方案落地全程推进，遇到复杂问题时主动拆解并持续跟进闭环。",
  "工程质量意识较强：重视代码规范、文档沉淀与可维护性，能够兼顾短期交付和长期演进成本。",
];
