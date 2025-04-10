import { supabase } from './supabase-client'
import type { Feature, FeatureStatus } from '@/types/database'

export async function getFeatures() {
  const { data, error } = await supabase
    .from('features')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Feature[]
}

export async function createFeature(feature: Omit<Feature, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('features')
    .insert([feature])
    .select()
    .single()

  if (error) throw error
  return data as Feature
}

export async function updateFeatureStatus(id: string, status: FeatureStatus) {
  const { data, error } = await supabase
    .from('features')
    .update({ status })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as Feature
}

export async function updateFeatureVotes(id: string, votes: number) {
  const { data, error } = await supabase
    .from('features')
    .update({ votes })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as Feature
}

export async function deleteFeature(id: string) {
  const { error } = await supabase
    .from('features')
    .delete()
    .eq('id', id)

  if (error) throw error
} 