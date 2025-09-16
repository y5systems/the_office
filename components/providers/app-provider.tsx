"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useWeb3 } from "@/hooks/use-web3"
import {
  getTasks,
  getOrganizations,
  createTask as createTaskDB,
  createOrganization as createOrganizationDB,
  claimTask as claimTaskDB,
  submitTask as submitTaskDB,
  approveTask as approveTaskDB,
  getOrCreateUser,
  subscribeToTaskUpdates,
} from "@/lib/database"
import type { Database } from "@/lib/supabase"

// Database types
type DBUser = Database['public']['Tables']['users']['Row']
type DBTask = Database['public']['Tables']['tasks']['Row']
type DBOrganization = Database['public']['Tables']['organizations']['Row']

interface User {
  id: string
  address: string
  role: "admin" | "partner" | "contributor" | "builder" | "student" | "anon"
  name: string
  avatar: string
  organizationName?: string
  totalEarned?: number
  tasksCompleted?: number
  tasksCreated?: number
  rewardsDistributed?: number
  usersManaged?: number
  totalPlatformValue?: number
  contributorBadgeEarned?: boolean
  celoStarRankings?: {
    responsive: number
    shipper: number
    trustful: number
  }
}

interface Task {
  id: string
  title: string
  category: "Education" | "Research" | "Event" | "Partner Task" | "Other"
  reward: number
  complexity: "Low" | "Medium" | "High"
  validationType: "Manual" | "File Upload" | "Auto" | "URL Submission"
  instructions: string
  slots: number
  deadline?: string
  status: "Active" | "Pending" | "Completed" | "Claimed"
  createdBy: string
  claimedBy?: string
  submittedProof?: string
  createdAt: string
  tags: string[]
  isLearningTask?: boolean
  organizationId?: string
  // Additional fields from database
  description?: string
  updatedAt?: string
  created_by_user?: { name: string; avatar: string | null }
  organization?: { name: string; avatar: string | null }
}

interface Opportunity {
  id: string
  title: string
  description: string
  type: "Grant" | "Hackathon" | "Job" | "Internship" | "Partnership"
  reward?: string
  deadline?: string
  organization: string
  link: string
  tags: string[]
}

interface BlogPost {
  id: string
  title: string
  excerpt: string
  author: string
  publishedAt: string
  readTime: string
  image?: string
  tags: string[]
  thumbnail?: string
}

interface Organization {
  id: string
  name: string
  description: string
  website?: string
  location: string
  avatar: string
  category: "Technology" | "Education" | "Sustainability" | "Healthcare" | "Finance" | "Other"
  teamSize: number
  founded: string
  mission: string
  tags: string[]
  socialLinks: {
    twitter?: string
    discord?: string
    telegram?: string
    linkedin?: string
  }
  contactEmail: string
  isPublic: boolean
  createdBy: string
  createdAt: string
  totalTasks?: number
  completedTasks?: number
  totalRewardsDistributed?: number
  celoStarRankings?: {
    responsive: number
    shipper: number
    trustful: number
  }
}

interface AppContextType {
  user: User | null
  tasks: Task[]
  opportunities: Opportunity[]
  blogPosts: BlogPost[]
  organizations: Organization[]
  isLoading: boolean
  connectWallet: (walletType: string, walletAddress?: string) => void
  logout: () => void
  // Web3 integration
  web3: {
    isConnected: boolean
    address: string | null
    balance: string | null
    isMiniPay: boolean
    isLoading: boolean
    isInitializing: boolean
    sendCUSD: (toAddress: string, amount: string) => Promise<string>
    refreshBalance: () => Promise<void>
  }
  createTask: (task: Omit<Task, "id" | "createdBy" | "status" | "createdAt">) => void
  createOrganization: (
    org: Omit<
      Organization,
      "id" | "createdBy" | "createdAt" | "totalTasks" | "completedTasks" | "totalRewardsDistributed"
    >,
  ) => void
  claimTask: (taskId: string) => void
  submitTask: (taskId: string, proof: string, submissionData?: any) => void
  approveTask: (taskId: string) => void
  deleteTask: (taskId: string) => void
  banUser: (userAddress: string) => void
  getVisibleTasks: () => Task[]
}

const AppContext = createContext<AppContextType | undefined>(undefined)

// Mock data for fallback when database is empty
const mockTasks: Task[] = [
  {
    id: "1",
    title: "Complete Celo DeFi Tutorial",
    category: "Education",
    reward: 5,
    complexity: "Low",
    validationType: "URL Submission",
    instructions: "Complete the Celo DeFi tutorial and submit the completion certificate URL",
    slots: 10,
    status: "Active",
    createdBy: "0x1234...partner",
    createdAt: "2024-01-15T10:00:00Z",
    deadline: "2024-02-15T23:59:59Z",
    tags: ["DeFi", "Tutorial", "Beginner"],
    isLearningTask: true,
  },
  {
    id: "2",
    title: "Research Web3 Impact Projects",
    category: "Research",
    reward: 15,
    complexity: "Medium",
    validationType: "File Upload",
    instructions: "Research and document 5 Web3 projects making social impact. Submit a 2-page report.",
    slots: 5,
    status: "Active",
    createdBy: "0x1234...partner",
    createdAt: "2024-01-14T14:30:00Z",
    deadline: "2024-02-20T23:59:59Z",
    tags: ["Research", "Impact", "Web3"],
    isLearningTask: false,
  },
  {
    id: "3",
    title: "Create Social Media Content",
    category: "Partner Task",
    reward: 50,
    complexity: "Medium",
    validationType: "Manual",
    instructions: "Design 3 Instagram posts about sustainable farming in Chapada region",
    slots: 2,
    status: "Claimed",
    createdBy: "0x1234...partner",
    claimedBy: "0x5678...contributor",
    createdAt: "2024-01-13T09:15:00Z",
    deadline: "2024-01-20T23:59:59Z",
    tags: ["Design", "Social Media", "Sustainability"],
    isLearningTask: false,
  },
  {
    id: "4",
    title: "Build Smart Contract for Voting",
    category: "Other",
    reward: 100,
    complexity: "High",
    validationType: "File Upload",
    instructions: "Create a decentralized voting smart contract with proper security measures",
    slots: 3,
    status: "Pending",
    createdBy: "0x5678...builder",
    claimedBy: "0x5678...contributor",
    submittedProof: "Smart contract code submitted for review",
    createdAt: "2024-01-12T16:45:00Z",
    deadline: "2024-01-18T23:59:59Z",
    tags: ["Smart Contract", "Voting", "Security"],
    isLearningTask: false,
  },
  {
    id: "5",
    title: "Write Technical Documentation",
    category: "Education",
    reward: 25,
    complexity: "Medium",
    validationType: "File Upload",
    instructions: "Create comprehensive documentation for the new API endpoints",
    slots: 2,
    status: "Completed",
    createdBy: "0x1234...partner",
    claimedBy: "0x5678...contributor",
    createdAt: "2024-01-10T11:00:00Z",
    deadline: "2024-01-25T23:59:59Z",
    tags: ["Documentation", "API", "Technical Writing"],
    isLearningTask: true,
  },
]

const mockOrganizations: Organization[] = [
  {
    id: "1",
    name: "Balaio",
    description: "A co-working space and incubator for Web3 startups in Rio de Janeiro.",
    location: "Rio de Janeiro, Brazil",
    avatar: "/placeholder.svg?height=100&width=100",
    category: "Technology",
    teamSize: 25,
    founded: "2022",
    mission: "To foster innovation and collaboration in the Web3 space.",
    tags: ["Web3", "Co-working", "Incubator"],
    socialLinks: {
      twitter: "https://twitter.com/balaio",
      discord: "https://discord.gg/balaio",
    },
    contactEmail: "contact@balaio.xyz",
    isPublic: true,
    createdBy: "0xADMIN1234567890",
    createdAt: "2023-01-01T00:00:00Z",
    celoStarRankings: { responsive: 5, shipper: 4, trustful: 5 },
  },
]

const mockOpportunities: Opportunity[] = [
  {
    id: "1",
    title: "Celo Climate Collective Grant",
    description: "Funding for climate-focused projects on Celo blockchain",
    type: "Grant",
    reward: "Up to $50,000",
    deadline: "2024-03-15",
    organization: "Celo Foundation",
    link: "https://celo.org/grants",
    tags: ["Climate", "Grant", "Celo"],
  },
]

const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Future of Learn2Earn in Web3",
    excerpt: "Exploring how blockchain technology is revolutionizing education and creating new opportunities for learners worldwide.",
    author: "Maria Santos",
    publishedAt: "2024-01-10T12:00:00Z",
    readTime: "5 min read",
    tags: ["Learn2Earn", "Web3", "Education"],
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
]

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])
  const [opportunities, setOpportunities] = useState<Opportunity[]>(mockOpportunities) // Keep mock for now
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(mockBlogPosts) // Keep mock for now
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  // Web3 integration
  const web3 = useWeb3()
  
  // Load data from database on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)
        
        // Load tasks and organizations from database
        const [tasksData, organizationsData] = await Promise.all([
          getTasks(),
          getOrganizations()
        ])
        
        console.log('Database results:', { tasksCount: tasksData.length, orgsCount: organizationsData.length })
        
        // Transform database tasks to match our interface
        const transformedTasks: Task[] = tasksData.map(dbTask => ({
          id: dbTask.id,
          title: dbTask.title,
          category: dbTask.category as Task['category'],
          reward: dbTask.reward_amount,
          complexity: dbTask.complexity as Task['complexity'],
          validationType: dbTask.validation_type as Task['validationType'],
          instructions: dbTask.description,
          slots: dbTask.slots || 1,
          deadline: dbTask.deadline || undefined,
          status: dbTask.status as Task['status'],
          createdBy: dbTask.created_by,
          claimedBy: dbTask.claimed_by || undefined,
          submittedProof: dbTask.submitted_proof || undefined,
          createdAt: dbTask.created_at,
          tags: dbTask.tags || [],
          isLearningTask: dbTask.is_learning_task || false,
          organizationId: dbTask.organization_id || undefined,
          description: dbTask.description,
          updatedAt: dbTask.updated_at,
          created_by_user: dbTask.created_by_user as any,
          organization: dbTask.organization as any
        }))
        
        // Transform organizations
        const transformedOrgs: Organization[] = organizationsData.map(dbOrg => ({
          id: dbOrg.id,
          name: dbOrg.name,
          description: dbOrg.description,
          website: dbOrg.website || undefined,
          location: dbOrg.location,
          avatar: dbOrg.avatar,
          category: dbOrg.category as Organization['category'],
          teamSize: dbOrg.team_size || 1,
          founded: dbOrg.founded || new Date().getFullYear().toString(),
          mission: dbOrg.mission,
          tags: dbOrg.tags || [],
          socialLinks: {
            twitter: dbOrg.social_links?.twitter,
            discord: dbOrg.social_links?.discord,
            telegram: dbOrg.social_links?.telegram,
            linkedin: dbOrg.social_links?.linkedin,
          },
          contactEmail: dbOrg.contact_email,
          isPublic: dbOrg.is_public,
          createdBy: dbOrg.created_by,
          createdAt: dbOrg.created_at,
        }))
        
        setTasks(transformedTasks)
        setOrganizations(transformedOrgs)
        
      } catch (error) {
        console.error('Error loading data from database:', error)
        // Fallback to mock data if database fails
        console.log('Falling back to mock data')
        setTasks(mockTasks)
        setOrganizations(mockOrganizations)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadData()
    
    // Subscribe to real-time task updates
    const subscription = subscribeToTaskUpdates((updatedTask) => {
      setTasks(prev => {
        const index = prev.findIndex(t => t.id === updatedTask.id)
        if (index >= 0) {
          const updated = [...prev]
          updated[index] = {
            ...prev[index],
            status: updatedTask.status as Task['status'],
            claimedBy: updatedTask.claimed_by || undefined,
            submittedProof: updatedTask.submitted_proof || undefined,
          }
          return updated
        }
        return prev
      })
    })
    
    return () => {
      subscription.unsubscribe()
    }
  }, [])
  
  // Auto-connect when Web3 wallet is detected (especially MiniPay)
  useEffect(() => {
    if (web3.isConnected && web3.address && !user && !isLoading && !web3.isInitializing) {
      const walletType = web3.isMiniPay ? 'minipay' : 'web3'
      connectWallet(walletType, web3.address)
    }
  }, [web3.isConnected, web3.address, web3.isMiniPay, user, isLoading, web3.isInitializing])

  const connectWallet = async (walletType: string, walletAddress?: string) => {
    try {
      // Handle real Web3 wallet connections
      const actualAddress = walletAddress || web3.address
      
      if ((walletType === 'web3' || walletType === 'minipay' || walletType === 'metamask' || walletType === 'valora') && actualAddress && web3.isConnected) {
        // Get or create user from database
        const userName = web3.isMiniPay ? "MiniPay User" : 
                        walletType === 'metamask' ? "MetaMask User" :
                        walletType === 'valora' ? "Valora User" : "Web3 User"
        const userAvatar = web3.isMiniPay ? "💳" : 
                          walletType === 'metamask' ? "🦊" :
                          walletType === 'valora' ? "📱" : "🌐"
        
        console.log('Attempting to connect wallet:', { walletType, actualAddress })
        
        // Special case for your admin address
        const isAdminAddress = actualAddress.toLowerCase() === '0x133E36bE90EC4c9cc47E2a937F48a977fA4fCA94'.toLowerCase()
        
        const defaultUserData = isAdminAddress ? {
          name: "Felipe (MiniPay Admin)",
          role: "admin" as const,
          avatar: "👑",
          total_earned: 0,
          tasks_completed: 0,
          contributor_badge_earned: true,
          celo_star_rankings: { responsive: 5, shipper: 5, trustful: 5 },
        } : {
          name: userName,
          role: "contributor" as const, // Default role for new Web3 users
          avatar: userAvatar,
          total_earned: 0,
          tasks_completed: 0,
          contributor_badge_earned: true, // Web3 users start with contributor privileges
          celo_star_rankings: { responsive: 3, shipper: 3, trustful: 3 },
        }
        
        const dbUser = await getOrCreateUser(actualAddress, defaultUserData)
        
        console.log('Database user result:', dbUser)
        
        if (dbUser) {
          const appUser: User = {
            id: dbUser.id,
            address: dbUser.wallet_address,
            role: dbUser.role as User['role'],
            name: dbUser.name,
            avatar: dbUser.avatar || userAvatar,
            totalEarned: dbUser.total_earned || 0,
            tasksCompleted: dbUser.tasks_completed || 0,
            contributorBadgeEarned: dbUser.contributor_badge_earned || false,
            celoStarRankings: dbUser.celo_star_rankings as User['celoStarRankings'] || { responsive: 3, shipper: 3, trustful: 3 },
            // Add admin-specific fields if role is admin
            ...(dbUser.role === 'admin' && {
              usersManaged: 156,
              totalPlatformValue: 2450,
              tasksCreated: 25,
              rewardsDistributed: 1200,
            })
          }
          
          console.log('Setting app user:', appUser)
          setUser(appUser)
          return
        } else {
          console.error('Failed to get or create user from database')
        }
      }
      
      // Handle mock wallet connections for testing
      let mockUser: User
      switch (walletType) {
        case "admin":
          mockUser = {
            id: "admin-1",
            address: "0xADMIN1234567890",
            role: "admin",
            name: "System Administrator",
            avatar: "👑",
            usersManaged: 156,
            totalPlatformValue: 2450,
            tasksCreated: 25,
            rewardsDistributed: 1200,
            celoStarRankings: { responsive: 5, shipper: 5, trustful: 5 },
          }
          break
        case "student":
          mockUser = {
            id: "student-1",
            address: "0xSTUDENT123456789",
            role: "student",
            name: "Alex Student",
            avatar: "🎓",
            tasksCompleted: 3,
            totalEarned: 15,
            contributorBadgeEarned: false,
            celoStarRankings: { responsive: 3, shipper: 2, trustful: 4 },
          }
          break
        case "contributor":
          mockUser = {
            id: "contributor-1",
            address: "0xCONTRIBUTOR123456789",
            role: "contributor",
            name: "Sam Contributor",
            avatar: "🔧",
            tasksCompleted: 12,
            totalEarned: 350,
            contributorBadgeEarned: true,
            celoStarRankings: { responsive: 4, shipper: 5, trustful: 4 },
          }
          break
        case "partner":
          mockUser = {
            id: "partner-1",
            address: "0xPARTNER123456789",
            role: "partner",
            name: "Partner Representative",
            avatar: "🏢",
            organizationName: "Chapada Sustentável",
            tasksCreated: 12,
            rewardsDistributed: 600,
            celoStarRankings: { responsive: 4, shipper: 3, trustful: 5 },
          }
          break
        case "builder":
          mockUser = {
            id: "builder-1",
            address: "0xBUILDER123456789",
            role: "builder",
            name: "Alex Developer",
            avatar: "👨‍💻",
            tasksCompleted: 8,
            totalEarned: 350,
            celoStarRankings: { responsive: 5, shipper: 4, trustful: 4 },
          }
          break
        default:
          mockUser = {
            id: "student-1",
            address: "0xSTUDENT123456789",
            role: "student",
            name: "Alex Student",
            avatar: "🎓",
            tasksCompleted: 3,
            totalEarned: 15,
            contributorBadgeEarned: false,
            celoStarRankings: { responsive: 3, shipper: 2, trustful: 4 },
          }
      }
      
      setUser(mockUser)
    } catch (error) {
      console.error('Error connecting wallet:', error)
    }
  }

  const getVisibleTasks = (): Task[] => {
    if (!user) return tasks.filter((task) => task.isLearningTask)

    switch (user.role) {
      case "student":
        // Students can only see learning tasks until they earn the Contributor Badge
        if (!user.contributorBadgeEarned) {
          return tasks.filter((task) => task.isLearningTask)
        }
        // After earning badge, they can see all tasks
        return tasks
      case "contributor":
      case "builder":
        // Contributors and builders can see all public tasks
        return tasks
      case "admin":
        // Admins can see all tasks
        return tasks
      default:
        return tasks.filter((task) => task.isLearningTask)
    }
  }

  const logout = () => {
    setUser(null)
  }

  const createTask = async (taskData: Omit<Task, "id" | "createdBy" | "status" | "createdAt">) => {
    if (!user) return
    
    try {
      const dbTask = await createTaskDB({
        title: taskData.title,
        description: taskData.instructions,
        category: taskData.category,
        reward_amount: taskData.reward,
        complexity: taskData.complexity,
        validation_type: taskData.validationType,
        slots: taskData.slots,
        deadline: taskData.deadline,
        status: "Active",
        created_by: user.id,
        tags: taskData.tags,
        is_learning_task: taskData.isLearningTask,
        organization_id: taskData.organizationId,
      })
      
      if (dbTask) {
        const newTask: Task = {
          id: dbTask.id,
          title: dbTask.title,
          category: dbTask.category as Task['category'],
          reward: dbTask.reward_amount,
          complexity: dbTask.complexity as Task['complexity'],
          validationType: dbTask.validation_type as Task['validationType'],
          instructions: dbTask.description,
          slots: dbTask.slots || 1,
          deadline: dbTask.deadline || undefined,
          status: dbTask.status as Task['status'],
          createdBy: dbTask.created_by,
          createdAt: dbTask.created_at,
          tags: dbTask.tags || [],
          isLearningTask: dbTask.is_learning_task || false,
          organizationId: dbTask.organization_id || undefined,
        }
        setTasks((prev) => [newTask, ...prev])
      }
    } catch (error) {
      console.error('Error creating task:', error)
    }
  }

  const createOrganization = (
    orgData: Omit<
      Organization,
      "id" | "createdBy" | "createdAt" | "totalTasks" | "completedTasks" | "totalRewardsDistributed"
    >,
  ) => {
    if (!user) return
    
    const newOrganization: Organization = {
      ...orgData,
      id: Date.now().toString(),
      createdBy: user.address,
      createdAt: new Date().toISOString(),
      totalTasks: 0,
      completedTasks: 0,
      totalRewardsDistributed: 0,
    }
    setOrganizations((prev) => [newOrganization, ...prev])

    // Update user to become a partner with organization
    setUser({
      ...user,
      role: "partner",
      organizationName: orgData.name,
    })
  }

  const claimTask = async (taskId: string) => {
    if (!user) return
    
    try {
      const updatedTask = await claimTaskDB(taskId, user.address)
      if (updatedTask) {
        setTasks((prev) =>
          prev.map((task) =>
            task.id === taskId ? { ...task, status: "Claimed" as const, claimedBy: user.address } : task,
          ),
        )
      }
    } catch (error) {
      console.error('Error claiming task:', error)
    }
  }

  const submitTask = async (taskId: string, proof: string, submissionData?: any) => {
    if (!user) return
    
    try {
      const updatedTask = await submitTaskDB(taskId, proof)
      if (updatedTask) {
        setTasks((prev) =>
          prev.map((task) => (task.id === taskId ? { ...task, status: "Pending" as const, submittedProof: proof } : task)),
        )
      }
    } catch (error) {
      console.error('Error submitting task:', error)
    }
  }

  const approveTask = async (taskId: string) => {
    const task = tasks.find(t => t.id === taskId)
    if (!task || !user) return
    
    try {
      // First approve the task in the database
      const updatedTask = await approveTaskDB(taskId)
      if (!updatedTask) {
        console.error('Failed to approve task in database')
        return
      }
      
      // Update local state
      setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, status: "Completed" as const } : t)))
      
      // If Web3 is connected and we have the claimedBy address, send payment
      if (web3.isConnected && task.claimedBy) {
        try {
          const paymentResult = await web3.sendCUSD(task.claimedBy, task.reward.toString())
          
          if (paymentResult) {
            // Refresh Web3 balance after payment
            await web3.refreshBalance()
            console.log(`Task ${taskId} approved and ${task.reward} cUSD sent to ${task.claimedBy}`)
          }
        } catch (paymentError) {
          console.error('Failed to process task reward payment:', paymentError)
          // Task is still marked as completed in database, payment failed
        }
      }
      
    } catch (error) {
      console.error('Error approving task:', error)
    }
  }

  const deleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId))
  }

  const banUser = (userAddress: string) => {
    console.log(`User ${userAddress} has been banned by admin`)
  }

  return (
    <AppContext.Provider
      value={{
        user,
        tasks,
        opportunities,
        blogPosts,
        organizations,
        isLoading,
        connectWallet,
        logout,
        createTask,
        createOrganization,
        claimTask,
        submitTask,
        approveTask,
        deleteTask,
        banUser,
        getVisibleTasks,
        // Web3 integration
        web3: {
          isConnected: web3.isConnected,
          address: web3.address,
          balance: web3.balance,
          isMiniPay: web3.isMiniPay,
          isLoading: web3.isLoading,
          sendCUSD: web3.sendCUSD,
          refreshBalance: web3.refreshBalance,
        },
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}
