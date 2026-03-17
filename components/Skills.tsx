'use client'

import { Code2, Server, Cloud, Brain, BrainCircuit, Globe } from 'lucide-react'

const skillCategories = [
  {
    category: '前端开发',
    icon: 'code',
    items: [
      'React - 现代化组件开发',
      'Next.js - 服务端渲染',
      'Streamlit/Gradio - 快速原型演示',
    ]
  },
  {
    category: '后端开发',
    icon: 'server',
    items: [
      'FastAPI (Python) / Gin (Go) / Axum (Rust) - 多语言后端框架',
      'MySQL/PostgreSQL/MongoDB - 关系型与文档数据库',
      'Redis - 外置缓存方案',
      'RabbitMQ/Kafka/RocketMQ - 消息队列（通信或延迟计算）',
      'FAISS/Milvus - 向量数据库',
    ]
  },
  {
    category: 'DevOps',
    icon: 'cloud',
    items: [
      'GitHub Actions - CI/CD自动化',
      'Docker - 容器化部署',
      'AWS/Vercel/VPS - 多平台部署',
    ]
  },
  {
    category: 'LLM & AI Agent',
    icon: 'brain',
    items: [
      '算法 - Transformer架构、手写GPT模型',
      '微调 - HuggingFace、PEFT/QLoRA/GRPO',
      '应用 - Claude SDK/OpenAI SDK + LangChain/LangGraph',
    ]
  },
  {
    category: '机器学习',
    icon: 'brainCircuit',
    items: [
      'KNN / K-Means - 聚类与分类算法',
      '贝叶斯 / 线性回归 / 逻辑回归 - 统计学习方法',
      '决策树 / 随机森林 - 树模型集成',
      '模型评估与特征工程 - 完整ML工作流',
    ]
  },
  {
    category: 'Web3 / EVM生态',
    icon: 'globe',
    items: [
      'Solidity - 智能合约开发与夹子机器人',
      'Geth - 自定义RPC节点部署',
      'Web3.js / Ethers.js - 合约调用与事件监控',
    ]
  },
]

const iconMap: Record<string, any> = {
  code: Code2,
  server: Server,
  cloud: Cloud,
  brain: Brain,
  brainCircuit: BrainCircuit,
  globe: Globe,
}

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">技术栈</span>
          </h2>
          <p className="text-gray-400 text-lg">深耕多个技术领域，打造全栈解决方案</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((skill, index) => {
            const Icon = iconMap[skill.icon]
            return (
              <div
                key={index}
                className="card-glass rounded-2xl p-6 hover:glow transition-all duration-300 group"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-secondary">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-gradient transition-all">
                    {skill.category}
                  </h3>
                </div>

                <ul className="space-y-3">
                  {skill.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-300">
                      <span className="mt-2 w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary flex-shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
