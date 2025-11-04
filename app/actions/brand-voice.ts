'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'
import type { CreateBrandVoiceInput, UpdateBrandVoiceInput } from '@/types/brand'

export async function createBrandVoice(input: CreateBrandVoiceInput) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'Not authenticated' }
  }

  // If this is marked as default, unset other defaults
  if (input.is_default) {
    await supabase
      .from('brand_voice_profiles')
      .update({ is_default: false })
      .eq('user_id', user.id)
  }

  const { data, error } = await supabase
    .from('brand_voice_profiles')
    .insert({
      user_id: user.id,
      ...input
    })
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard/brand-voice')
  
  return { data }
}

export async function getBrandVoices() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'Not authenticated' }
  }

  const { data, error } = await supabase
    .from('brand_voice_profiles')
    .select('*')
    .eq('user_id', user.id)
    .order('is_default', { ascending: false })
    .order('created_at', { ascending: false })

  if (error) {
    return { error: error.message }
  }

  return { data }
}

export async function getBrandVoice(id: string) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'Not authenticated' }
  }

  const { data, error } = await supabase
    .from('brand_voice_profiles')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (error) {
    return { error: error.message }
  }

  return { data }
}

export async function getDefaultBrandVoice() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'Not authenticated' }
  }

  const { data, error } = await supabase
    .from('brand_voice_profiles')
    .select('*')
    .eq('user_id', user.id)
    .eq('is_default', true)
    .single()

  if (error) {
    // If no default found, return the first one
    const { data: firstVoice } = await supabase
      .from('brand_voice_profiles')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()
    
    return { data: firstVoice }
  }

  return { data }
}

export async function updateBrandVoice(input: UpdateBrandVoiceInput) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'Not authenticated' }
  }

  const { id, ...updates } = input

  // If setting as default, unset other defaults
  if (updates.is_default) {
    await supabase
      .from('brand_voice_profiles')
      .update({ is_default: false })
      .eq('user_id', user.id)
  }

  const { data, error } = await supabase
    .from('brand_voice_profiles')
    .update(updates)
    .eq('id', id)
    .eq('user_id', user.id)
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard/brand-voice')
  
  return { data }
}

export async function deleteBrandVoice(id: string) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'Not authenticated' }
  }

  const { error } = await supabase
    .from('brand_voice_profiles')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard/brand-voice')
  
  return { success: true }
}

