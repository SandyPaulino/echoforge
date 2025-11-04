'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'
import { transformContent, transformMultiplePlatforms } from '@/lib/ai/transformer'
import type { Platform, CreateGeneratedContentInput } from '@/types/content'
import type { ToneType } from '@/types/brand'

export async function generateContent(
  sourceId: string,
  platforms: Array<{ platform: Platform; format: string }>,
  brandVoiceId?: string
) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'Not authenticated' }
  }

  // Get source content
  const { data: source, error: sourceError } = await supabase
    .from('content_sources')
    .select('*')
    .eq('id', sourceId)
    .eq('user_id', user.id)
    .single()

  if (sourceError || !source) {
    return { error: 'Content source not found' }
  }

  // Get brand voice if specified
  let brandVoice
  if (brandVoiceId) {
    const { data: voice } = await supabase
      .from('brand_voice_profiles')
      .select('*')
      .eq('id', brandVoiceId)
      .eq('user_id', user.id)
      .single()
    
    brandVoice = voice
  }

  // Generate content for all platforms
  const results = await transformMultiplePlatforms(
    source.source_content,
    platforms,
    {
      tone: brandVoice?.tone as ToneType,
      brandVoice: brandVoice ? {
        name: brandVoice.name,
        tone: brandVoice.tone as ToneType,
        style_guide: brandVoice.style_guide,
        target_audience: brandVoice.target_audience
      } : undefined
    }
  )

  // Save generated content to database
  const generatedContent = results.map((result) => ({
    user_id: user.id,
    source_id: sourceId,
    brand_voice_id: brandVoiceId || null,
    platform: result.platform,
    format: result.format,
    generated_text: result.content,
    metadata: result.metadata
  }))

  const { data, error } = await supabase
    .from('generated_content')
    .insert(generatedContent)
    .select()

  if (error) {
    return { error: error.message }
  }

  // Save generation history
  await supabase
    .from('generation_history')
    .insert({
      user_id: user.id,
      source_id: sourceId,
      platforms_generated: platforms.map((p) => p.platform),
      total_outputs: platforms.length
    })

  revalidatePath('/dashboard/generate')
  
  return { data }
}

export async function getGeneratedContent(sourceId?: string) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'Not authenticated' }
  }

  let query = supabase
    .from('generated_content')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (sourceId) {
    query = query.eq('source_id', sourceId)
  }

  const { data, error } = await query

  if (error) {
    return { error: error.message }
  }

  return { data }
}

export async function updateGeneratedContent(
  id: string,
  updates: { generated_text?: string; status?: 'draft' | 'edited' | 'exported' }
) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'Not authenticated' }
  }

  const { data, error } = await supabase
    .from('generated_content')
    .update(updates)
    .eq('id', id)
    .eq('user_id', user.id)
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard/generate')
  
  return { data }
}

export async function deleteGeneratedContent(id: string) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'Not authenticated' }
  }

  const { error } = await supabase
    .from('generated_content')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard/generate')
  
  return { success: true }
}

export async function regenerateContent(
  generatedContentId: string
) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'Not authenticated' }
  }

  // Get existing generated content
  const { data: existing, error: existingError } = await supabase
    .from('generated_content')
    .select('*')
    .eq('id', generatedContentId)
    .eq('user_id', user.id)
    .single()

  if (existingError || !existing) {
    return { error: 'Generated content not found' }
  }

  // Get source content
  const { data: source, error: sourceError } = await supabase
    .from('content_sources')
    .select('*')
    .eq('id', existing.source_id)
    .eq('user_id', user.id)
    .single()

  if (sourceError || !source) {
    return { error: 'Source content not found' }
  }

  // Get brand voice if used
  let brandVoice
  if (existing.brand_voice_id) {
    const { data: voice } = await supabase
      .from('brand_voice_profiles')
      .select('*')
      .eq('id', existing.brand_voice_id)
      .eq('user_id', user.id)
      .single()
    
    brandVoice = voice
  }

  // Regenerate content
  const result = await transformContent({
    sourceContent: source.source_content,
    platform: existing.platform,
    format: existing.format,
    tone: brandVoice?.tone as ToneType,
    brandVoice: brandVoice ? {
      name: brandVoice.name,
      tone: brandVoice.tone as ToneType,
      style_guide: brandVoice.style_guide,
      target_audience: brandVoice.target_audience
    } : undefined
  })

  // Update the generated content
  const { data, error } = await supabase
    .from('generated_content')
    .update({
      generated_text: result.content,
      metadata: result.metadata,
      status: 'draft'
    })
    .eq('id', generatedContentId)
    .eq('user_id', user.id)
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard/generate')
  
  return { data }
}

