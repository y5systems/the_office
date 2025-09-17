import { supabase } from './supabase'
import type { Database } from './supabase'

// Type aliases for cleaner code
type User = Database['public']['Tables']['users']['Row']
type Task = Database['public']['Tables']['tasks']['Row']
type Organization = Database['public']['Tables']['organizations']['Row']
type UserInsert = Database['public']['Tables']['users']['Insert']
type TaskInsert = Database['public']['Tables']['tasks']['Insert']
type OrganizationInsert = Database['public']['Tables']['organizations']['Insert']
type UserUpdate = Database['public']['Tables']['users']['Update']
type TaskUpdate = Database['public']['Tables']['tasks']['Update']

/**
 * User Operations
 */

export async function createUser(userData: UserInsert): Promise<User | null> {
  try {
    const { data, error } = await supabase
      .from('users')
      .insert(userData)
      .select()
      .single()

    if (error) {
      console.error('Error creating user:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Unexpected error creating user:', error)
    return null
  }
}

export async function getUserByWalletAddress(walletAddress: string): Promise<User | null> {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('wallet_address', walletAddress)
      .single()

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('Error fetching user:', error)
      return null
    }

    return data || null
  } catch (error) {
    console.error('Unexpected error fetching user:', error)
    return null
  }
}

export async function updateUser(walletAddress: string, updates: UserUpdate): Promise<User | null> {
  try {
    const { data, error } = await supabase
      .from('users')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('wallet_address', walletAddress)
      .select()
      .single()

    if (error) {
      console.error('Error updating user:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Unexpected error updating user:', error)
    return null
  }
}

/**
 * Task Operations
 */

export async function getTasks(filters?: {
  status?: string
  category?: string
  isLearningTask?: boolean
  limit?: number
}): Promise<Task[]> {
  try {
    let query = supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false })

    if (filters?.status) {
      query = query.eq('status', filters.status)
    }
    if (filters?.category) {
      query = query.eq('category', filters.category)
    }
    if (filters?.isLearningTask !== undefined) {
      query = query.eq('is_learning_task', filters.isLearningTask)
    }
    if (filters?.limit) {
      query = query.limit(filters.limit)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching tasks:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Unexpected error fetching tasks:', error)
    return []
  }
}

export async function createTask(taskData: TaskInsert): Promise<Task | null> {
  try {
    const { data, error } = await supabase
      .from('tasks')
      .insert(taskData)
      .select()
      .single()

    if (error) {
      console.error('Error creating task:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Unexpected error creating task:', error)
    return null
  }
}

export async function updateTask(taskId: string, updates: TaskUpdate): Promise<Task | null> {
  try {
    const { data, error } = await supabase
      .from('tasks')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', taskId)
      .select()
      .single()

    if (error) {
      console.error('Error updating task:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Unexpected error updating task:', error)
    return null
  }
}

export async function claimTask(taskId: string, userWalletAddress: string): Promise<Task | null> {
  try {
    // First get the user ID from wallet address
    const user = await getUserByWalletAddress(userWalletAddress)
    if (!user) {
      console.error('User not found for wallet address:', userWalletAddress)
      return null
    }

    const { data, error } = await supabase
      .from('tasks')
      .update({
        status: 'Claimed',
        claimed_by: userWalletAddress, // Store wallet address directly for now
        updated_at: new Date().toISOString()
      })
      .eq('id', taskId)
      .eq('status', 'Active') // Only allow claiming active tasks
      .select()
      .single()

    if (error) {
      console.error('Error claiming task:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Unexpected error claiming task:', error)
    return null
  }
}

export async function submitTask(taskId: string, proof: string): Promise<Task | null> {
  try {
    const { data, error } = await supabase
      .from('tasks')
      .update({
        status: 'Pending',
        submitted_proof: proof,
        updated_at: new Date().toISOString()
      })
      .eq('id', taskId)
      .eq('status', 'Claimed') // Only allow submitting claimed tasks
      .select()
      .single()

    if (error) {
      console.error('Error submitting task:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Unexpected error submitting task:', error)
    return null
  }
}

export async function approveTask(taskId: string): Promise<Task | null> {
  try {
    const { data, error } = await supabase
      .from('tasks')
      .update({
        status: 'Completed',
        updated_at: new Date().toISOString()
      })
      .eq('id', taskId)
      .eq('status', 'Pending') // Only allow approving pending tasks
      .select()
      .single()

    if (error) {
      console.error('Error approving task:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Unexpected error approving task:', error)
    return null
  }
}

/**
 * Organization Operations
 */

export async function getOrganizations(): Promise<Organization[]> {
  try {
    const { data, error } = await supabase
      .from('organizations')
      .select('*')
      .eq('is_public', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching organizations:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Unexpected error fetching organizations:', error)
    return []
  }
}

export async function createOrganization(orgData: OrganizationInsert): Promise<Organization | null> {
  try {
    const { data, error } = await supabase
      .from('organizations')
      .insert(orgData)
      .select()
      .single()

    if (error) {
      console.error('Error creating organization:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Unexpected error creating organization:', error)
    return null
  }
}

/**
 * Real-time subscriptions
 */

export function subscribeToTaskUpdates(callback: (task: Task) => void) {
  return supabase
    .channel('task-updates')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'tasks' },
      (payload) => {
        if (payload.new) {
          callback(payload.new as Task)
        }
      }
    )
    .subscribe()
}

export function subscribeToUserTaskUpdates(userWalletAddress: string, callback: (task: Task) => void) {
  return supabase
    .channel(`user-task-updates-${userWalletAddress}`)
    .on(
      'postgres_changes',
      { 
        event: '*', 
        schema: 'public', 
        table: 'tasks',
        filter: `claimed_by=eq.${userWalletAddress}` 
      },
      (payload) => {
        if (payload.new) {
          callback(payload.new as Task)
        }
      }
    )
    .subscribe()
}

/**
 * Utility functions
 */

export async function getOrCreateUser(walletAddress: string, defaultData: Partial<UserInsert>): Promise<User | null> {
  // First try to get existing user
  let user = await getUserByWalletAddress(walletAddress)
  
  if (!user) {
    // Create new user if doesn't exist
    const userData: UserInsert = {
      wallet_address: walletAddress,
      name: defaultData.name || 'Anonymous User',
      role: defaultData.role || 'contributor',
      avatar: defaultData.avatar,
      ...defaultData
    }
    
    user = await createUser(userData)
  }
  
  return user
}
