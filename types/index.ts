export interface Skill {
  category: string
  items: string[]
  icon: string
}

export interface Project {
  title: string
  description: string
  link: string
  tags: string[]
}

export interface Message {
  role: 'user' | 'assistant'
  content: string
}
