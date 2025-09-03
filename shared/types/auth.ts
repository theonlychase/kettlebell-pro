import type { User, Session } from '@supabase/supabase-js'

export interface UserProfile {
  id?: string
  email: string
  name?: string
  exists: boolean
  confirmed: boolean
  created_at?: string
  updated_at?: string
}

export interface AuthResponse<T = User | Session> {
  data: T | null
  error: AuthError | null
  userProfile?: UserProfile
  message?: string
}

export interface AuthError {
  message: string
  code: string
}

export interface EmailConfirmationResponse {
  success: boolean
  message: string
  user?: User
}
