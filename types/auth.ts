import { User, Session } from '@supabase/supabase-js'

export type { User, Session }

export interface AuthError {
  message: string
  status?: number
}

export interface AuthResponse {
  user?: User
  session?: Session
  error?: AuthError
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface SignupCredentials {
  email: string
  password: string
  confirmPassword?: string
}



