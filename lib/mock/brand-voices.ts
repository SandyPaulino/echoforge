import { BrandVoiceProfile, ToneType } from '@/types/brand'

export const sampleBrandVoices: Omit<BrandVoiceProfile, 'id' | 'user_id' | 'created_at' | 'updated_at'>[] = [
  {
    name: 'Professional Tech',
    tone: 'professional',
    style_guide: 'Clear, concise, and authoritative. Use industry terminology but remain accessible. Avoid jargon when simpler words work better.',
    target_audience: 'B2B tech executives and decision-makers',
    example_texts: [
      'Our enterprise solution delivers 99.9% uptime with zero-downtime deployments.',
      'Streamline your workflow with AI-powered automation that integrates seamlessly with existing tools.',
      'Security isn't an afterthought—it's built into every layer of our infrastructure.'
    ],
    is_default: true
  },
  {
    name: 'Casual Creator',
    tone: 'casual',
    style_guide: 'Friendly, approachable, and authentic. Use contractions, conversational language, and emojis sparingly. Be relatable.',
    target_audience: 'Content creators and solopreneurs',
    example_texts: [
      "Just wrapped up editing today's video and I'm honestly so excited to share this with you all! 🎥",
      "Real talk: Growing on social media is hard. But here's what actually worked for me...",
      "Coffee in hand, let's dive into this week's content strategy tips ☕"
    ],
    is_default: false
  },
  {
    name: 'Thought Leader',
    tone: 'authoritative',
    style_guide: 'Confident, insightful, and forward-thinking. Share unique perspectives backed by experience. Challenge conventional wisdom.',
    target_audience: 'Industry professionals and aspiring leaders',
    example_texts: [
      'The future of work isn't remote vs. office—it's about outcomes over presence.',
      'Most companies are solving the wrong problem. Here's what they're missing...',
      'Data shows a clear pattern: Companies that embrace AI now will dominate in 5 years.'
    ],
    is_default: false
  },
  {
    name: 'Startup Growth',
    tone: 'inspirational',
    style_guide: 'Motivating, action-oriented, and optimistic. Focus on possibility and momentum. Use power words and active voice.',
    target_audience: 'Startup founders and growth teams',
    example_texts: [
      'Every day is an opportunity to move the needle. What's your one focus today?',
      'We just hit $100K MRR. Here's the complete playbook we used to get there 🚀',
      'Growth isn't about doing more—it's about doing what matters, consistently.'
    ],
    is_default: false
  },
  {
    name: 'Technical Expert',
    tone: 'technical',
    style_guide: 'Precise, detailed, and analytical. Use technical terms appropriately. Explain complex concepts with clarity.',
    target_audience: 'Developers and technical professionals',
    example_texts: [
      'Implemented a Redis caching layer that reduced API response time from 800ms to 45ms.',
      'Our algorithm uses transformer-based architecture with attention mechanisms for context-aware generation.',
      'Here's the TypeScript implementation of a custom React hook for debounced search:'
    ],
    is_default: false
  }
]

export const defaultBrandVoice = sampleBrandVoices[0]



