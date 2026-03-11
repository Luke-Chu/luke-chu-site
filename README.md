# luke-chu-site

基于 Next.js App Router 的个人网站前端项目。

## 本地启动

1. 安装依赖

```bash
npm install
```

2. 配置环境变量（推荐使用 `.env`）

```bash
cp .env.example .env
```

至少需要：

```bash
API_BASE_URL=http://127.0.0.1:8080/api/v1
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8080/api/v1
```

优先级说明：

- `API_BASE_URL`：服务端请求优先使用（推荐生产环境配置）
- `NEXT_PUBLIC_API_BASE_URL`：仅在未配置 `API_BASE_URL` 时兜底

3. 启动开发服务

```bash
npm run dev
```

访问：`http://localhost:3000`

## 摄影模块（第二阶段进行中）

摄影列表页路径：`/photography`

当前已从静态数据迁移为 API 驱动主流程，不再依赖 `data/photos.ts` 作为摄影页数据源。

### 已接入后端接口

- `GET /photos`：摄影列表（搜索、排序、分页、基础筛选）
- `GET /filters`：筛选项（年份、分类、朝向、标签信息）
- `GET /photos/:uuid`：摄影详情
- `POST /photos/:uuid/view`：浏览计数上报
- `POST /photos/:uuid/like`：点赞
- `POST /photos/:uuid/download`：下载计数与下载链接

> 上述接口会基于 `API_BASE_URL`（未配置时回退到 `NEXT_PUBLIC_API_BASE_URL`）拼接，例如：
> `http://127.0.0.1:8080/api/v1/photos`

### 当前已实现

- 列表页 API 接入（Server Component 拉取数据）
- URL Query 作为页面状态来源
- 搜索（`q`）
- 排序字段与排序方向（`sort` / `order`）
- 基础筛选（`orientation` / `year` / `category`）
- 分页（`page` / `pageSize`）
- 图片密集网格展示与 hover 信息层
- 点击图片跳转详情路径：`/photography/[uuid]`
- 详情页完整信息展示（含基础信息、设备信息、拍摄参数、标签）
- 进入详情页自动触发浏览上报，并更新浏览计数
- 详情页点赞按钮可用，按接口返回更新点赞状态与计数
- 详情页下载按钮可用，下载成功后更新下载计数并触发浏览器下载
- 加载态与错误态页面

## 下一步待实现

- 复杂标签筛选交互（多选、组合逻辑增强）
- 进一步优化布局（如更复杂瀑布流）

## 远程图片配置

项目已在 `next.config.ts` 中支持远程图片加载。

- 可通过 `NEXT_PUBLIC_IMAGE_HOSTS` 配置正式 OSS 域名（逗号分隔）
- 第一阶段为了联调便利，未配置域名时默认放开 `https` 通配（上线前建议收敛为明确域名）
