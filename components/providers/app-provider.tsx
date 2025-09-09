"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useWeb3 } from "@/hooks/use-web3"

interface User {
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
  connectWallet: (walletType: string, walletAddress?: string) => void
  logout: () => void
  // Web3 integration
  web3: {
    isConnected: boolean
    address: string | null
    balance: string | null
    isMiniPay: boolean
    isLoading: boolean
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
  {
    id: "2",
    title: "Web3 Developer Internship",
    description: "3-month internship program for blockchain developers",
    type: "Internship",
    reward: "$2,000/month",
    deadline: "2024-02-28",
    organization: "TheOffice Labs",
    link: "#",
    tags: ["Internship", "Developer", "Blockchain"],
  },
  {
    id: "3",
    title: "DeFi Innovation Hackathon",
    description: "Build the next generation of DeFi applications",
    type: "Hackathon",
    reward: "$25,000 prize pool",
    deadline: "2024-04-01",
    organization: "DeFi Alliance",
    link: "#",
    tags: ["Hackathon", "DeFi", "Innovation"],
  },
  {
    id: "4",
    title: "Partnership with Rural Schools",
    description: "Collaborate to bring Web3 education to rural communities",
    type: "Partnership",
    organization: "Education DAO",
    link: "#",
    tags: ["Partnership", "Education", "Rural"],
  },
]

const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Future of Learn2Earn in Web3",
    excerpt:
      "Exploring how blockchain technology is revolutionizing education and creating new opportunities for learners worldwide.",
    author: "Maria Santos",
    publishedAt: "2024-01-10T12:00:00Z",
    readTime: "5 min read",
    tags: ["Learn2Earn", "Web3", "Education"],
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
]

const mockOrganizations: Organization[] = [
  {
    id: "1",
    name: "TheOffice",
    description: "A co-working space and incubator for Web3 startups in Rio de Janeiro.",
    location: "Rio de Janeiro, Brazil",
    avatar: "/placeholder.svg?height=100&width=100",
    category: "Technology",
    teamSize: 25,
    founded: "2022",
    mission: "To foster innovation and collaboration in the Web3 space.",
    tags: ["Web3", "Co-working", "Incubator"],
    socialLinks: {
      twitter: "https://twitter.com/theoffice",
      discord: "https://discord.gg/theoffice",
    },
    contactEmail: "contact@theoffice.xyz",
    isPublic: true,
    createdBy: "0xADMIN1234567890",
    createdAt: "2023-01-01T00:00:00Z",
    celoStarRankings: { responsive: 5, shipper: 4, trustful: 5 },
  },
]

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [tasks, setTasks] = useState<Task[]>(mockTasks)
  const [opportunities, setOpportunities] = useState<Opportunity[]>(mockOpportunities)
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(mockBlogPosts)
  const [organizations, setOrganizations] = useState<Organization[]>(mockOrganizations)
  
  // Web3 integration
  const web3 = useWeb3()
  
  // Auto-connect when Web3 wallet is detected (especially MiniPay)
  useEffect(() => {
    if (web3.isConnected && web3.address && !user) {
      const walletType = web3.isMiniPay ? 'minipay' : 'web3'
      connectWallet(walletType, web3.address)
    }
  }, [web3.isConnected, web3.address, web3.isMiniPay, user])

  const connectWallet = async (walletType: string, walletAddress?: string) => {
    let mockUser: User

    // Handle real Web3 wallet connections
    const actualAddress = walletAddress || web3.address
    
    if ((walletType === 'web3' || walletType === 'minipay' || walletType === 'metamask' || walletType === 'valora') && actualAddress && web3.isConnected) {
      // For real wallet connections, create a default user profile
      // In a real app, you'd fetch or create user profile from your backend
      const userName = web3.isMiniPay ? "MiniPay" : 
                      walletType === 'metamask' ? "MetaMask User" :
                      walletType === 'valora' ? "Valora User" : "Web3 User"
      const userAvatar = web3.isMiniPay ? "💳" : 
                        walletType === 'metamask' ? "🦊" :
                        walletType === 'valora' ? "📱" : "🌐"
      
      mockUser = {
        address: actualAddress,
        role: "contributor", // Default role for Web3 users (they can earn tasks immediately)
        name: userName,
        avatar: userAvatar,
        tasksCompleted: 0,
        totalEarned: 0,
        contributorBadgeEarned: true, // Web3 users start with contributor privileges
        celoStarRankings: { responsive: 3, shipper: 3, trustful: 3 },
      }
    } else {
      // Handle mock wallet connections for testing
      switch (walletType) {
        case "admin":
          mockUser = {
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
    }

    setUser(mockUser)
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

  const createTask = (taskData: Omit<Task, "id" | "createdBy" | "status" | "createdAt">) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdBy: user?.address || "",
      status: "Active",
      createdAt: new Date().toISOString(),
    }
    setTasks((prev) => [newTask, ...prev])
  }

  const createOrganization = (
    orgData: Omit<
      Organization,
      "id" | "createdBy" | "createdAt" | "totalTasks" | "completedTasks" | "totalRewardsDistributed"
    >,
  ) => {
    const newOrganization: Organization = {
      ...orgData,
      id: Date.now().toString(),
      createdBy: user?.address || "",
      createdAt: new Date().toISOString(),
      totalTasks: 0,
      completedTasks: 0,
      totalRewardsDistributed: 0,
    }
    setOrganizations((prev) => [newOrganization, ...prev])

    // Update user to become a partner with organization
    if (user) {
      setUser({
        ...user,
        role: "partner",
        organizationName: orgData.name,
      })
    }
  }

  const claimTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: "Claimed" as const, claimedBy: user?.address } : task,
      ),
    )
  }

  const submitTask = (taskId: string, proof: string, submissionData?: any) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, status: "Pending" as const, submittedProof: proof } : task)),
    )
  }

  const approveTask = async (taskId: string) => {
    const task = tasks.find(t => t.id === taskId)
    if (!task || !task.claimedBy || !web3.isConnected) {
      // Fallback to mock behavior if Web3 not available
      setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, status: "Completed" as const } : t)))
      return
    }

    try {
      // Process real cUSD payment for task completion
      const paymentResult = await web3.sendCUSD(task.claimedBy, task.reward.toString())
      
      if (paymentResult) {
        // Update task status to completed
        setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, status: "Completed" as const } : t)))
        
        // Refresh Web3 balance
        await web3.refreshBalance()
        
        console.log(`Task ${taskId} approved and ${task.reward} cUSD sent to ${task.claimedBy}`)
      }
    } catch (error) {
      console.error('Failed to process task reward payment:', error)
      // Optionally show error to user via toast
      // For now, still mark as completed (in a real app, you might want to handle this differently)
      setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, status: "Completed" as const } : t)))
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
