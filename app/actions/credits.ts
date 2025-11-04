'use server'

import { createClient } from '@/utils/supabase/server'
import type { CreateCreditUsageInput, OperationType } from '@/types/credits'
import { CREDIT_COSTS } from '@/types/credits'

export async function getUserCredits() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'Not authenticated' }
  }

  const { data, error } = await supabase
    .from('user_credits')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (error) {
    return { error: error.message }
  }

  return { data }
}

export async function deductCredits(operation: OperationType, description?: string) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'Not authenticated' }
  }

  const creditsToDeduct = CREDIT_COSTS[operation]

  // Get current credits
  const { data: currentCredits } = await supabase
    .from('user_credits')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (!currentCredits || currentCredits.remaining_credits < creditsToDeduct) {
    return { error: 'Insufficient credits' }
  }

  // Update credits
  const { data, error } = await supabase
    .from('user_credits')
    .update({
      used_credits: currentCredits.used_credits + creditsToDeduct
    })
    .eq('user_id', user.id)
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  // Log usage
  await supabase
    .from('credit_usage_history')
    .insert({
      user_id: user.id,
      operation_type: operation,
      credits_used: creditsToDeduct,
      description,
      metadata: {}
    })

  return { data }
}

export async function getCreditUsageHistory(limit = 50) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'Not authenticated' }
  }

  const { data, error } = await supabase
    .from('credit_usage_history')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    return { error: error.message }
  }

  return { data }
}



