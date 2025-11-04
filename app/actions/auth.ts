'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import type { LoginCredentials, SignupCredentials } from '@/types/auth'

export async function login(credentials: LoginCredentials) {
  try {
    const supabase = await createClient()

    const { error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    })

    if (error) {
      console.error('Login error:', error)
      return { error: error.message }
    }

    revalidatePath('/', 'layout')
    redirect('/dashboard-routes/dashboard')
  } catch (error) {
    console.error('Login action error:', error)
    return { error: 'An unexpected error occurred during login' }
  }
}

export async function signup(credentials: SignupCredentials) {
  try {
    const supabase = await createClient()

    const { error } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
    })

    if (error) {
      console.error('Signup error:', error)
      return { error: error.message }
    }

    revalidatePath('/', 'layout')
    redirect('/dashboard-routes/dashboard')
  } catch (error) {
    console.error('Signup action error:', error)
    return { error: 'An unexpected error occurred during signup' }
  }
}

export async function logout() {
  const supabase = await createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/auth-routes/login')
}

export async function getUser() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

