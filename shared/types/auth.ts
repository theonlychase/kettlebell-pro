export interface UserProfile {
  id?: string
  email: string
  name?: string
  exists: boolean
  confirmed: boolean
  created_at?: string
  updated_at?: string
}
