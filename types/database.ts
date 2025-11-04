import { ContentSource, GeneratedContent, GenerationHistory } from './content'
import { BrandVoiceProfile } from './brand'
import { UserCredits, CreditUsageHistory } from './credits'

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      content_sources: {
        Row: ContentSource
        Insert: Omit<ContentSource, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<ContentSource, 'id' | 'user_id' | 'created_at' | 'updated_at'>>
      }
      brand_voice_profiles: {
        Row: BrandVoiceProfile
        Insert: Omit<BrandVoiceProfile, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<BrandVoiceProfile, 'id' | 'user_id' | 'created_at' | 'updated_at'>>
      }
      generated_content: {
        Row: GeneratedContent
        Insert: Omit<GeneratedContent, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<GeneratedContent, 'id' | 'user_id' | 'created_at' | 'updated_at'>>
      }
      user_credits: {
        Row: UserCredits
        Insert: Omit<UserCredits, 'id' | 'remaining_credits' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<UserCredits, 'id' | 'user_id' | 'remaining_credits' | 'created_at' | 'updated_at'>>
      }
      credit_usage_history: {
        Row: CreditUsageHistory
        Insert: Omit<CreditUsageHistory, 'id' | 'created_at'>
        Update: never
      }
      generation_history: {
        Row: GenerationHistory
        Insert: Omit<GenerationHistory, 'id' | 'created_at'>
        Update: never
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

