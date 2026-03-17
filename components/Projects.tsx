'use client'

import { Github, ExternalLink } from 'lucide-react'
import { Project } from '@/types'

const projects: Project[] = [
  {
    title: 'GPT架构LLM实现',
    description: '基于PyTorch手写Transformer实现GPT语言模型，深入理解Decoder-Only架构原理',
    link: 'https://github.com/erthorpabar/pytorch-DecoderOnly-model',
    tags: ['Python', 'PyTorch', 'Transformer', 'LLM']
  },
  {
    title: '渐进式Agent构建（类Claw执行力机器人）',
    description: '兼容Claude和OpenAI两种格式的智能代理系统，用于构建与部署个性化任务',
    link: 'https://github.com/erthorpabar/step-by-step-build-claw',
    tags: ['LLM', 'Agent', 'Claude SDK', 'OpenAI SDK']
  },
  {
    title: 'ComfyUI自定义节点开发指南',
    description: 'ComfyUI节点编写教学，涵盖节点定义、参数配置、工作流集成等完整开发流程',
    link: 'https://github.com/erthorpabar/guide-to-write-comfyui-custom-node',
    tags: ['Python', 'ComfyUI', 'AIGC', 'Stable Diffusion']
  },
  {
    title: '量化交易系统（波动率趋势追踪）',
    description: '基于波动率自相关性的趋势追踪策略全流程，包含回测、风控、实盘模块',
    link: 'https://github.com/erthorpabar/quant-trade',
    tags: ['Python', '量化交易', '策略回测', '时序分析']
  },
  {
    title: 'MLOps全自动化管线',
    description: '数据ETL → 模型训练 → 指标计算 → 商业价值评估的完整CI/CD机器学习管线',
    link: 'https://github.com/erthorpabar/mlops-pipeline',
    tags: ['Python', 'MLOps', 'CI/CD', '自动化']
  },
]

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">github项目作品</span>
          </h2>
          <p className="text-gray-400 text-lg">将创意转化为现实，用代码构建未来</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <a
              key={index}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="card-glass rounded-2xl p-6 hover:glow transition-all duration-300 group cursor-pointer block"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-secondary">
                  <Github className="w-6 h-6 text-white" />
                </div>
                <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
              </div>

              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gradient transition-all">
                {project.title}
              </h3>

              <p className="text-gray-400 mb-4 line-clamp-3 text-sm">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-xs bg-white/5 rounded-full text-gray-300 hover:bg-white/10 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://github.com/erthorpabar"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 card-glass rounded-full font-semibold hover:bg-white/10 transition-all duration-300"
          >
            <Github className="w-5 h-5" />
            查看更多项目
          </a>
        </div>
      </div>
    </section>
  )
}
