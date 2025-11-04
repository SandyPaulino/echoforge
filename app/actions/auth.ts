'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import type { LoginCredentials, SignupCredentials } from '@/types/auth'

export async function login(credentials: LoginCredentials) {
  try {
    console.log('Login attempt for:', credentials.email)
    const supabase = await createClient()
    console.log('Supabase client created successfully')

    const { error, data } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    })

    if (error) {
      console.error('Login error:', error.message, error)
      return { error: error.message }
    }

    console.log('Login successful for:', data.user?.email)
    revalidatePath('/', 'layout')
    redirect('/dashboard-routes/dashboard')
  } catch (error: any) {
    console.error('Login action error:', error?.message || error)
    return { error: `Login failed: ${error?.message || 'Unknown error'}` }
  }
}

export async function signup(credentials: SignupCredentials) {
  try {
    console.log('Signup attempt for:', credentials.email)
    const supabase = await createClient()
    console.log('Supabase client created successfully')

    const { error, data } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
    })

    if (error) {
      console.error('Signup error:', error.message, error)
      return { error: error.message }
    }

    console.log('Signup successful for:', data.user?.email)
    revalidatePath('/', 'layout')
    redirect('/dashboard-routes/dashboard')
  } catch (error: any) {
    console.error('Signup action error:', error?.message || error)
    return { error: `Signup failed: ${error?.message || 'Unknown error'}` }
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

