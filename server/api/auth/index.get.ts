import { serverSupabaseUser } from '#supabase/server'

// if you want to call this route on SSR, you must send your browser cookies including your supabase token.
export default defineEventHandler(async (event) => {
  return await serverSupabaseUser(event)
})
