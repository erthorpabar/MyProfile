'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react'
import { Message } from '@/types'
import ReactMarkdown from 'react-markdown'

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: '你好！我是erthor，你的AI数字孪生助手。我可以回答关于技能、项目经验和技术栈的任何问题。请问有什么想了解的吗？'
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [streamingContent, setStreamingContent] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, streamingContent])

  const sendMessage = async () => {
    if (!input.trim() || loading) return

    const userMessage: Message = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)
    setStreamingContent('')

    try {
      // 直接从环境变量读取配置
      const baseUrl = process.env.NEXT_PUBLIC_ANTHROPIC_BASE_URL || 'https://open.bigmodel.cn/api/anthropic'
      const apiKey = process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY || ''
      const model = process.env.NEXT_PUBLIC_ANTHROPIC_MODEL || 'glm-5'

      console.log('API Config:', { baseUrl, hasApiKey: !!apiKey, model })

      const systemPrompt = `你是erthor，一个专业的AI数字孪生助手。你代表着一位全栈开发者的技术形象。

## 技能栈

### 前端开发
- React - 现代化组件开发
- Next.js - 服务端渲染
- Streamlit/Gradio - 快速原型演示

### 后端开发
- FastAPI (Python) / Gin (Go) / Axum (Rust) - 多语言后端框架
- MySQL/PostgreSQL/MongoDB - 关系型与文档数据库
- Redis - 外置缓存方案
- RabbitMQ/Kafka/RocketMQ - 消息队列（通信或延迟计算）
- FAISS/Milvus - 向量数据库

### DevOps
- GitHub Actions - CI/CD自动化
- Docker - 容器化部署
- AWS/Vercel/VPS - 多平台部署

### LLM & AI Agent
- 算法 - Transformer架构、手写GPT模型
- 微调 - HuggingFace、PEFT/QLoRA/GRPO
- 应用 - Claude SDK/OpenAI SDK + LangChain/LangGraph

### 机器学习
- KNN / K-Means - 聚类与分类算法
- 贝叶斯 / 线性回归 / 逻辑回归 - 统计学习方法
- 决策树 / 随机森林 - 树模型集成
- 模型评估与特征工程 - 完整ML工作流

### Web3 / EVM生态
- Solidity - 智能合约开发与夹子机器人
- Geth - 自定义RPC节点部署
- Web3.js / Ethers.js - 合约调用与事件监控

## 项目

### GPT架构LLM实现
基于PyTorch手写Transformer实现GPT语言模型，深入理解Decoder-Only架构原理
https://github.com/erthorpabar/pytorch-DecoderOnly-model

### 渐进式Agent构建（类Claw执行力机器人）
兼容Claude和OpenAI两种格式的智能代理系统，用于构建与部署个性化任务
https://github.com/erthorpabar/step-by-step-build-claw

### ComfyUI自定义节点开发指南
ComfyUI节点编写教学，涵盖节点定义、参数配置、工作流集成等完整开发流程
https://github.com/erthorpabar/guide-to-write-comfyui-custom-node

### 量化交易系统（波动率趋势追踪）
基于波动率自相关性的趋势追踪策略全流程，包含回测、风控、实盘模块
https://github.com/erthorpabar/quant-trade

### MLOps全自动化管线
数据ETL → 模型训练 → 指标计算 → 商业价值评估的完整CI/CD机器学习管线
https://github.com/erthorpabar/mlops-pipeline

---
请以专业、友好的语气回答用户关于技能、项目和技术栈的问题。保持简洁但有信息量。使用 Markdown 格式来组织内容。`

      const requestBody = {
        model: model,
        max_tokens: 2048,
        stream: true,
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages,
          userMessage
        ].map(msg => ({
          role: msg.role,
          content: msg.content,
        })),
      }

      console.log('Sending request to:', `${baseUrl}/chat/completions`)
      console.log('Request body:', { ...requestBody, messages: requestBody.messages.map(m => ({ role: m.role, content: m.content.substring(0, 50) + '...' })) })

      const response = await fetch(`${baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify(requestBody),
      })

      console.log('Response status:', response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error('API Error Response:', errorText)
        throw new Error(`API请求失败: ${response.status} - ${errorText}`)
      }

      // 处理流式响应
      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let fullContent = ''

      if (!reader) {
        throw new Error('无法获取响应流')
      }

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split('\n').filter(line => line.trim() !== '')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6).trim()
            
            if (data === '[DONE]') {
              continue
            }

            try {
              const parsed = JSON.parse(data)
              const content = parsed.choices?.[0]?.delta?.content || ''
              
              if (content) {
                fullContent += content
                setStreamingContent(fullContent)
              }
            } catch (e) {
              console.warn('Failed to parse chunk:', data)
            }
          }
        }
      }

      // 流式传输完成，将完整消息添加到消息列表
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: fullContent || '抱歉，我没有收到有效回复。'
      }])
      setStreamingContent('')
      
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage = error instanceof Error ? error.message : '未知错误'
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `抱歉，出现了一些技术问题。错误信息：${errorMessage}`
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <section id="chat" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full card-glass mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-gray-300">AI数字孪生</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">与erthor对话</span>
          </h2>
          <p className="text-gray-400 text-lg">了解我的技术能力和项目经验</p>
        </div>

        <div className="card-glass rounded-2xl overflow-hidden glow">
          {/* Messages Container */}
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-3 message-animation ${
                  msg.role === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-br from-primary to-secondary'
                    : 'bg-gradient-to-br from-accent to-primary'
                }`}>
                  {msg.role === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>

                <div className={`flex-1 max-w-[80%] ${
                  msg.role === 'user' ? 'text-right' : ''
                }`}>
                  <div className={`inline-block px-4 py-3 rounded-2xl text-left ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-primary to-secondary text-white'
                      : 'bg-white/10 text-gray-200'
                  }`}>
                    {msg.role === 'user' ? (
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    ) : (
                      <div className="prose prose-invert prose-sm max-w-none prose-headings:text-gray-100 prose-p:my-1 prose-ul:my-1 prose-ol:my-1 prose-li:my-0.5 prose-strong:text-primary">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Streaming message */}
            {loading && streamingContent && (
              <div className="flex gap-3 message-animation">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 max-w-[80%]">
                  <div className="inline-block px-4 py-3 rounded-2xl text-left bg-white/10 text-gray-200">
                    <div className="prose prose-invert prose-sm max-w-none prose-headings:text-gray-100 prose-p:my-1 prose-ul:my-1 prose-ol:my-1 prose-li:my-0.5 prose-strong:text-primary">
                      <ReactMarkdown>{streamingContent}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Loading indicator */}
            {loading && !streamingContent && (
              <div className="flex gap-3 message-animation">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white/10 px-4 py-3 rounded-2xl">
                  <Loader2 className="w-5 h-5 animate-spin text-primary" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-white/10 p-4">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="问我任何关于技术栈或项目的问题..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                disabled={loading}
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
