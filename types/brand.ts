export type ToneType = 
  | 'professional' 
  | 'casual' 
  | 'friendly' 
  | 'authoritative' 
  | 'humorous' 
  | 'inspirational'
  | 'technical'
  | 'conversational'

export interface BrandVoiceProfile {
  id: string
  user_id: string
  name: string
  tone: ToneType
  style_guide?: string
  target_audience?: string
  example_texts: string[]
  is_default: boolean
  created_at: string
  updated_at: string
}

export interface CreateBrandVoiceInput {
  name: string
  tone: ToneType
  style_guide?: string
  target_audience?: string
  example_texts?: string[]
  is_default?: boolean
}

export interface UpdateBrandVoiceInput {
  id: string
  name?: string
  tone?: ToneType
  style_guide?: string
  target_audience?: string
  example_texts?: string[]
  is_default?: boolean
}

export const TONE_OPTIONS: { value: ToneType; label: string; description: string }[] = [
  {
    value: 'professional',
    label: 'Professional',
    description: 'Formal, polished, and business-appropriate'
  },
  {
    value: 'casual',
    label: 'Casual',
    description: 'Relaxed, informal, and approachable'
  },
  {
    value: 'friendly',
    label: 'Friendly',
    description: 'Warm, personable, and engaging'
  },
  {
    value: 'authoritative',
    label: 'Authoritative',
    description: 'Expert, confident, and commanding'
  },
  {
    value: 'humorous',
    label: 'Humorous',
    description: 'Witty, entertaining, and lighthearted'
  },
  {
    value: 'inspirational',
    label: 'Inspirational',
    description: 'Motivating, uplifting, and empowering'
  },
  {
    value: 'technical',
    label: 'Technical',
    description: 'Precise, detailed, and information-focused'
  },
  {
    value: 'conversational',
    label: 'Conversational',
    description: 'Natural, dialogue-like, and relatable'
  }
]



