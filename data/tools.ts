export interface Tool {
  id: string
  icon: string
  name: string
  description: string
  tags: string[]
}

export const tools: Tool[] = [
  {
    id: '1',
    icon: '🤖',
    name: 'ChatGPT',
    description: 'OpenAI开发的大型语言模型，可以回答问题、编写代码、创作内容等',
    tags: ['对话', '写作', '编程']
  },
  {
    id: '2',
    icon: '🎨',
    name: 'Midjourney',
    description: '强大的AI图像生成工具，通过文字描述创造出精美的艺术作品',
    tags: ['图像生成', '创意', '艺术']
  },
  {
    id: '3',
    icon: '📝',
    name: 'Claude',
    description: 'Anthropic开发的AI助手，擅长分析、写作和复杂推理任务',
    tags: ['分析', '写作', '推理']
  },
  {
    id: '4',
    icon: '🎵',
    name: 'ElevenLabs',
    description: 'AI语音合成和克隆工具，生成自然流畅的语音内容',
    tags: ['语音合成', 'TTS', '音频']
  },
  {
    id: '5',
    icon: '🎬',
    name: 'Runway',
    description: 'AI视频编辑和生成工具，让视频创作变得更加简单',
    tags: ['视频', '编辑', '创作']
  },
  {
    id: '6',
    icon: '🔍',
    name: 'Perplexity',
    description: 'AI驱动的搜索引擎，提供准确的信息来源和实时答案',
    tags: ['搜索', '研究', '问答']
  }
]
