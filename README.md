# MyProfile - 个人主页

一个现代化的个人主页，展示技能栈、项目作品，并集成 AI 数字孪生助手。

[在线演示](http://my-profile-ap-2024.s3-website-ap-northeast-1.amazonaws.com/)

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC?logo=tailwind-css)

## ✨ 功能特性

### 🎨 现代化设计
- 渐变色主题（紫色系）
- 玻璃态卡片效果
- 流畅的动画和过渡
- 完全响应式布局

### 🧭 全局导航
- 固定顶部导航栏
- **右侧快捷导航**（桌面端）
- 平滑滚动到各个区域
- 自动高亮当前区域

### 💼 技能展示（6大模块）
1. **前端开发** - React, Next.js, Streamlit/Gradio
2. **后端开发** - FastAPI, Gin, Axum, 数据库, 消息队列
3. **DevOps** - GitHub Actions, Docker, 多平台部署
4. **LLM & AI Agent** - Transformer, 微调, LangChain
5. **机器学习** - 算法实现, 模型评估
6. **Web3 / EVM** - Solidity, Geth, Web3.js

### 🚀 项目展示
- GPT架构LLM实现
- 渐进式Agent构建
- ComfyUI自定义节点
- 量化交易系统
- MLOps全自动化管线

### 🤖 AI 数字孪生助手
- **流式输出** - 实时显示回复
- **Markdown 渲染** - 支持格式化内容
- 智能问答技能和项目
- 基于 Claude API

## 🛠️ 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **图标**: Lucide React
- **AI**: Anthropic API (Claude)
- **Markdown**: react-markdown

## 📦 安装

### 1. 克隆仓库

```bash
git clone https://github.com/erthorpabar/MyProfile.git
cd MyProfile
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

创建 `.env.local` 文件：

```env
ANTHROPIC_BASE_URL=https://open.bigmodel.cn/api/anthropic
ANTHROPIC_API_KEY=your_api_key_here
ANTHROPIC_MODEL=glm-5
```

### 4. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)

## 🏗️ 构建生产版本

```bash
npm run build
npm start
```

### 静态导出（可选）

```bash
npm run build
```

生成的静态文件在 `out/` 目录。

## 📂 项目结构

```
MyProfile/
├── app/
│   ├── api/chat/          # AI 聊天 API 路由
│   │   └── route.ts       # 流式响应处理
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 主页组件
│
├── components/
│   ├── Navbar.tsx         # 顶部导航栏
│   ├── SideNav.tsx        # 右侧快捷导航 ⭐
│   ├── Hero.tsx           # 首屏欢迎区
│   ├── Skills.tsx         # 技能展示（6模块）⭐
│   ├── Projects.tsx       # 项目展示（5项目）⭐
│   ├── Chat.tsx           # AI 聊天（流式）⭐
│   └── Footer.tsx         # 页脚
│
├── types/
│   └── index.ts           # TypeScript 类型定义
│
├── public/                # 静态资源
├── .env.local            # 环境变量（不提交）
├── tailwind.config.js    # Tailwind 配置
└── package.json          # 项目依赖
```

## 🎯 核心组件说明

### SideNav（右侧导航）
- 固定在右侧，垂直居中
- 4个导航按钮：关于我、技能、项目、AI助手
- 滚动监听，自动高亮当前区域
- 悬停显示标签提示

### Skills（技能展示）
- 6个技能模块，单页展示
- 响应式网格布局（桌面3列，平板2列）
- 玻璃态卡片效果
- 悬停发光效果

### Chat（AI助手）
- 流式输出，实时显示
- Markdown 渲染支持
- 自动滚动到最新消息
- 优雅的加载动画

## 🚀 部署

### Vercel（推荐）

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/erthorpabar/MyProfile)

### AWS S3

```bash
# 构建
npm run build

# 上传到 S3
aws s3 sync out/ s3://your-bucket-name --delete
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🔧 自定义配置

### 修改主题色

编辑 `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#6366f1',   // 主色
      secondary: '#8b5cf6', // 次色
      accent: '#ec4899',    // 强调色
    }
  }
}
```

### 修改技能内容

编辑 `components/Skills.tsx` 中的 `skillCategories` 数组。

### 修改项目内容

编辑 `components/Projects.tsx` 中的 `projects` 数组。

## 📄 License

MIT License

## 👤 作者

**erthorpabar**
- GitHub: [@erthorpabar](https://github.com/erthorpabar)

## 🙏 致谢

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [Anthropic](https://www.anthropic.com/)

---

⭐ 如果这个项目对你有帮助，请给一个 Star！
