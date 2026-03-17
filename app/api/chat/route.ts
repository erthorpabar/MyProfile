import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json()

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

    const response = await fetch((process.env.ANTHROPIC_BASE_URL || 'https://open.bigmodel.cn/api/anthropic') + '/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY || '',
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL || 'glm-5',
        max_tokens: 2048,
        stream: true,
        system: systemPrompt,
        messages: messages.map((msg: any) => ({
          role: msg.role,
          content: msg.content,
        })),
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('API Error:', error)
      throw new Error('API请求失败')
    }

    // 创建流式响应
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader()
        if (!reader) {
          controller.close()
          return
        }

        try {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break

            const chunk = new TextDecoder().decode(value)
            const lines = chunk.split('\n').filter(line => line.trim() !== '')

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.slice(6)
                if (data === '[DONE]') {
                  controller.enqueue(encoder.encode('data: [DONE]\n\n'))
                  continue
                }

                try {
                  const parsed = JSON.parse(data)
                  
                  // 处理 Anthropic API 流式格式
                  if (parsed.type === 'content_block_delta' && parsed.delta?.text) {
                    const text = parsed.delta.text
                    controller.enqueue(
                      encoder.encode(`data: ${JSON.stringify({ text })}\n\n`)
                    )
                  }
                } catch (e) {
                  // 忽略解析错误
                }
              }
            }
          }
        } catch (error) {
          console.error('Stream error:', error)
        } finally {
          reader.releaseLock()
          controller.close()
        }
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  } catch (error) {
    console.error('Chat API Error:', error)
    return new Response(
      JSON.stringify({ error: '抱歉，出现了一些技术问题。请稍后再试。' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
