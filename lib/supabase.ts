import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    // Disable automatic session refresh since we're using Web3 auth
    autoRefreshToken: false,
    persistSession: false,
  },
})

// Database types (will be generated later, for now we define manually)
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          wallet_address: string
          name: string
          role: 'admin' | 'partner' | 'contributor' | 'builder' | 'student' | 'anon'
          avatar?: string
          organization_name?: string
          total_earned: number
          tasks_completed: number
          tasks_created: number
          rewards_distributed: number
          users_managed: number
          total_platform_value: number
          contributor_badge_earned: boolean
          celo_star_rankings: {
            responsive: number
            shipper: number
            trustful: number
          }
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          wallet_address: string
          name: string
          role: 'admin' | 'partner' | 'contributor' | 'builder' | 'student' | 'anon'
          avatar?: string
          organization_name?: string
          total_earned?: number
          tasks_completed?: number
          tasks_created?: number
          rewards_distributed?: number
          users_managed?: number
          total_platform_value?: number
          contributor_badge_earned?: boolean
          celo_star_rankings?: {
            responsive: number
            shipper: number
            trustful: number
          }
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          wallet_address?: string
          name?: string
          role?: 'admin' | 'partner' | 'contributor' | 'builder' | 'student' | 'anon'
          avatar?: string
          organization_name?: string
          total_earned?: number
          tasks_completed?: number
          tasks_created?: number
          rewards_distributed?: number
          users_managed?: number
          total_platform_value?: number
          contributor_badge_earned?: boolean
          celo_star_rankings?: {
            responsive: number
            shipper: number
            trustful: number
          }
          created_at?: string
          updated_at?: string
        }
      }
      tasks: {
        Row: {
          id: string
          title: string
          description: string
          category: 'Education' | 'Research' | 'Event' | 'Partner Task' | 'Other'
          reward_amount: number
          complexity: 'Low' | 'Medium' | 'High'
          validation_type: 'Manual' | 'File Upload' | 'Auto' | 'URL Submission'
          slots: number
          deadline?: string
          status: 'Active' | 'Pending' | 'Completed' | 'Claimed'
          created_by: string
          claimed_by?: string
          submitted_proof?: string
          tags: string[]
          is_learning_task: boolean
          organization_id?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          category: 'Education' | 'Research' | 'Event' | 'Partner Task' | 'Other'
          reward_amount: number
          complexity: 'Low' | 'Medium' | 'High'
          validation_type: 'Manual' | 'File Upload' | 'Auto' | 'URL Submission'
          slots?: number
          deadline?: string
          status?: 'Active' | 'Pending' | 'Completed' | 'Claimed'
          created_by: string
          claimed_by?: string
          submitted_proof?: string
          tags?: string[]
          is_learning_task?: boolean
          organization_id?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          category?: 'Education' | 'Research' | 'Event' | 'Partner Task' | 'Other'
          reward_amount?: number
          complexity?: 'Low' | 'Medium' | 'High'
          validation_type?: 'Manual' | 'File Upload' | 'Auto' | 'URL Submission'
          slots?: number
          deadline?: string
          status?: 'Active' | 'Pending' | 'Completed' | 'Claimed'
          created_by?: string
          claimed_by?: string
          submitted_proof?: string
          tags?: string[]
          is_learning_task?: boolean
          organization_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      organizations: {
        Row: {
          id: string
          name: string
          description?: string
          website?: string
          location?: string
          avatar?: string
          category?: 'Technology' | 'Education' | 'Sustainability' | 'Healthcare' | 'Finance' | 'Other'
          team_size: number
          founded?: string
          mission?: string
          tags: string[]
          social_links: Record<string, string>
          contact_email?: string
          is_public: boolean
          created_by?: string
          total_tasks: number
          completed_tasks: number
          total_rewards_distributed: number
          celo_star_rankings: {
            responsive: number
            shipper: number
            trustful: number
          }
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string
          website?: string
          location?: string
          avatar?: string
          category?: 'Technology' | 'Education' | 'Sustainability' | 'Healthcare' | 'Finance' | 'Other'
          team_size?: number
          founded?: string
          mission?: string
          tags?: string[]
          social_links?: Record<string, string>
          contact_email?: string
          is_public?: boolean
          created_by?: string
          total_tasks?: number
          completed_tasks?: number
          total_rewards_distributed?: number
          celo_star_rankings?: {
            responsive: number
            shipper: number
            trustful: number
          }
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          website?: string
          location?: string
          avatar?: string
          category?: 'Technology' | 'Education' | 'Sustainability' | 'Healthcare' | 'Finance' | 'Other'
          team_size?: number
          founded?: string
          mission?: string
          tags?: string[]
          social_links?: Record<string, string>
          contact_email?: string
          is_public?: boolean
          created_by?: string
          total_tasks?: number
          completed_tasks?: number
          total_rewards_distributed?: number
          celo_star_rankings?: {
            responsive: number
            shipper: number
            trustful: number
          }
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
