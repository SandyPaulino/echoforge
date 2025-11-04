export type ContentType = 'text' | 'image' | 'video' | 'audio' | 'url'

export type ContentStatus = 'draft' | 'edited' | 'exported'

export interface ContentSource {
  id: string
  user_id: string
  title: string
  content_type: ContentType
  source_content: string
  source_url?: string
  file_url?: string
  metadata: Record<string, any>
  created_at: string
  updated_at: string
}

export interface CreateContentSourceInput {
  title: string
  content_type: ContentType
  source_content: string
  source_url?: string
  file_url?: string
  metadata?: Record<string, any>
}

export interface UpdateContentSourceInput {
  id: string
  title?: string
  source_content?: string
  source_url?: string
  file_url?: string
  metadata?: Record<string, any>
}

export type Platform = 'twitter' | 'linkedin' | 'instagram' | 'email' | 'blog' | 'facebook'

export interface GeneratedContent {
  id: string
  user_id: string
  source_id: string
  brand_voice_id?: string
  platform: Platform
  format: string
  generated_text: string
  status: ContentStatus
  metadata: Record<string, any>
  created_at: string
  updated_at: string
}

export interface CreateGeneratedContentInput {
  source_id: string
  brand_voice_id?: string
  platform: Platform
  format: string
  generated_text: string
  metadata?: Record<string, any>
}

export interface GenerationHistory {
  id: string
  user_id: string
  source_id: string
  platforms_generated: Platform[]
  total_outputs: number
  created_at: string
}

export interface PlatformConfig {
  name: string
  icon: string
  formats: string[]
  characterLimit?: number
  color: string
}

export const PLATFORM_CONFIGS: Record<Platform, PlatformConfig> = {
  twitter: {
    name: 'Twitter/X',
    icon: 'Twitter',
    formats: ['thread', 'post', 'reply'],
    characterLimit: 280,
    color: '#1DA1F2'
  },
  linkedin: {
    name: 'LinkedIn',
    icon: 'Linkedin',
    formats: ['post', 'article', 'comment'],
    characterLimit: 3000,
    color: '#0A66C2'
  },
  instagram: {
    name: 'Instagram',
    icon: 'Instagram',
    formats: ['caption', 'story', 'reel'],
    characterLimit: 2200,
    color: '#E4405F'
  },
  email: {
    name: 'Email',
    icon: 'Mail',
    formats: ['newsletter', 'announcement', 'follow-up'],
    color: '#EA4335'
  },
  blog: {
    name: 'Blog Post',
    icon: 'FileText',
    formats: ['article', 'listicle', 'tutorial'],
    color: '#6366F1'
  },
  facebook: {
    name: 'Facebook',
    icon: 'Facebook',
    formats: ['post', 'story'],
    characterLimit: 63206,
    color: '#1877F2'
  }
}



