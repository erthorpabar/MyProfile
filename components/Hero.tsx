'use client'

import { ArrowDown, Sparkles } from 'lucide-react'

export default function Hero() {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full card-glass mb-6">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm text-gray-300">全栈开发者</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="text-gradient">欢迎来到我的</span>
          <br />
          <span className="text-white">数字世界</span>
        </h1>

        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
          一位专注于<span className="text-primary font-semibold">前端技术</span>、
          <span className="text-secondary font-semibold">后端架构</span>、
          <span className="text-accent font-semibold">DevOps</span>和
          <span className="text-primary font-semibold">LLM应用</span>的工程师
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#skills"
            className="px-8 py-3 bg-gradient-to-r from-primary to-secondary rounded-full font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
          >
            探索技能
          </a>
          <a
            href="#chat"
            className="px-8 py-3 card-glass rounded-full font-semibold hover:bg-white/10 transition-all duration-300"
          >
            与AI助手对话
          </a>
        </div>

        <div className="mt-16 animate-bounce">
          <ArrowDown className="mx-auto text-gray-400" size={32} />
        </div>
      </div>
    </section>
  )
}
