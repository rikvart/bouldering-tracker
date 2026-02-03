'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addLog(formData: FormData) {
  const supabase = await createClient()

  // Get current user
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return { error: 'Not authenticated' }
  }

  // Get form data
  const data = {
    climb_id: formData.get('climb_id') as string,
    user_id: user.id,
    status: formData.get('status') as string,
    attempts: parseInt(formData.get('attempts') as string) || 1,
    notes: formData.get('notes') as string,
    logged_at: new Date().toISOString(),
  }

  // Insert into logs table
  const { error } = await supabase
    .from('logs')
    .insert([data])

  if (error) {
    console.error('Error inserting log:', error)
    return { error: error.message }
  }

  // Revalidate the page to show new data
  revalidatePath('/')
  return { success: true }
}

export async function getClimbs(gymId?: string) {
  const supabase = await createClient()
  
  let query = supabase
    .from('climbs')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (gymId) {
    query = query.eq('gym_id', gymId)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching climbs:', error)
    return []
  }

  return data || []
}

export async function getGyms() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('gyms')
    .select('*')
    .order('name', { ascending: true })

  if (error) {
    console.error('Error fetching gyms:', error)
    return []
  }

  return data || []
}

export async function getLogs() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return []
  }

  const { data, error } = await supabase
    .from('logs')
    .select(`
      *,
      climbs (
        id,
        grade,
        color,
        style,
        gyms (
          name,
          location
        )
      )
    `)
    .eq('user_id', user.id)
    .order('logged_at', { ascending: false })

  if (error) {
    console.error('Error fetching logs:', error)
    return []
  }

  return data || []
}