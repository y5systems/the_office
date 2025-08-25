"use client"

import { useState } from "react"
import { useApp } from "@/components/providers/app-provider"
import CreateOrganizationModal from "@/components/CreateOrganizationModal"

interface ProfilePageProps {
  onNavigateToBlog?: () => void
  onNavigateToAbout?: () => void
  onNavigateToFeatures?: () => void
}

export default function ProfilePage({ onNavigateToBlog, onNavigateToAbout, onNavigateToFeatures }: ProfilePageProps) {
  const { user, logout, tasks, connectWallet } = useApp()
  const [showWalletMenu, setShowWalletMenu] = useState(false)
  const [showCreateOrgModal, setShowCreateOrgModal] = useState(false)

  const handleWalletConnect = (walletType: string) => {
    connectWallet(walletType)
    setShowWalletMenu(false)
  }

  if (!user) {
    return (
      <div className="space-y-4 px-3 pb-6">
        <div className="pixel-card text-center py-8">
          <h2 className="pixel-font text-lg mb-4">👤 Profile & Progress</h2>
          <p className="pixel-font text-sm text-gray-600 mb-4">Connect your wallet to view your profile and progress</p>

          <div className="relative inline-block">
            <button
              onClick={() => setShowWalletMenu(!showWalletMenu)}
              className="pixel-button bg-pink-soft text-black px-6 py-3"
            >
              Connect Wallet
            </button>

            {/* Wallet Connection Menu */}
            {showWalletMenu && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 pixel-card bg-white min-w-[200px] md:min-w-[240px] z-50">
                <div className="space-y-2">
                  <button
                    onClick={() => handleWalletConnect("metamask")}
                    className="pixel-button bg-orange w-full text-left"
                  >
                    🦊 MetaMask
                  </button>
                  <button
                    onClick={() => handleWalletConnect("farcaster")}
                    className="pixel-button bg-pink-soft w-full text-left"
                  >
                    🟣 Farcaster
                  </button>
                  <button
                    onClick={() => handleWalletConnect("minipay")}
                    className="pixel-button bg-navy-dark text-white w-full text-left"
                  >
                    💳 MiniPay
                  </button>
                  <button
                    onClick={() => handleWalletConnect("valora")}
                    className="pixel-button bg-green-soft text-white w-full text-left"
                  >
                    📱 Valora
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  const userTasks = tasks.filter((task) => task.claimedBy === user.address || task.createdBy === user.address)
  const completedTasks = userTasks.filter((task) => task.status === "Completed")
  const pendingTasks = userTasks.filter((task) => task.status === "Pending")
  const activeTasks = userTasks.filter((task) => task.status === "Claimed")

  const getProgressStats = () => {
    if (user.role === "admin") {
      return [
        { label: "USERS", value: user.usersManaged?.toString() || "0", icon: "👥" },
        { label: "PLATFORM", value: `${user.totalPlatformValue} cUSD`, icon: "💰" },
        { label: "TASKS", value: user.tasksCreated?.toString() || "0", icon: "📋" },
      ]
    } else if (user.role === "partner") {
      return [
        { label: "CREATED", value: user.tasksCreated?.toString() || "0", icon: "📋" },
        { label: "DISTRIBUTED", value: `${user.rewardsDistributed || 0} cUSD`, icon: "💰" },
        {
          label: "ACTIVE",
          value: tasks.filter((t) => t.createdBy === user.address && t.status === "Active").length.toString(),
          icon: "🟢",
        },
      ]
    } else {
      return [
        { label: "COMPLETED", value: user.tasksCompleted?.toString() || completedTasks.length.toString(), icon: "✅" },
        { label: "EARNED", value: `${user.totalEarned || 0} cUSD`, icon: "💰" },
        { label: "LEVEL", value: Math.floor((user.tasksCompleted || 0) / 5 + 1).toString(), icon: "⭐" },
      ]
    }
  }

  const progressStats = getProgressStats()

  // Orkut-style Celo Star Rankings
  const celoStarRankings = [
    {
      name: "Responsive",
      icon: "💬",
      description: "Quick to respond and communicate",
      stars: Math.min(5, Math.floor((user.tasksCompleted || 0) / 3) + 2),
      maxStars: 5,
    },
    {
      name: "Shipper",
      icon: "🚀",
      description: "Always delivers on time",
      stars: Math.min(5, Math.floor(completedTasks.length / 2) + 1),
      maxStars: 5,
    },
    {
      name: "Trustful",
      icon: "🤝",
      description: "Reliable and trustworthy",
      stars: Math.min(5, Math.floor((user.totalEarned || 0) / 25) + 3),
      maxStars: 5,
    },
  ]

  const renderCeloStars = (stars: number, maxStars: number) => {
    const starElements = []
    for (let i = 1; i <= maxStars; i++) {
      if (i <= stars) {
        starElements.push(
          <span key={i} className="text-yellow-400 text-lg">
            💚
          </span>, // Celo green heart instead of star
        )
      } else {
        starElements.push(
          <span key={i} className="text-gray-300 text-lg">
            🤍
          </span>, // Empty heart
        )
      }
    }
    return starElements
  }

  const badges = [
    {
      name: "Early Adopter",
      icon: "🌟",
      earned: true,
      description: "One of the first users on the platform",
    },
    {
      name: "Task Master",
      icon: "🏆",
      earned: (user.tasksCompleted || 0) > 10,
      description: "Completed more than 10 tasks",
    },
    {
      name: "High Earner",
      icon: "💎",
      earned: (user.totalEarned || 0) > 50,
      description: "Earned more than 50 cUSD",
    },
    {
      name: "Consistent",
      icon: "🔥",
      earned: completedTasks.length > 5,
      description: "Consistently completing tasks",
    },
  ]

  return (
    <div className="space-y-4 px-3 pb-6">
      {/* 1. Profile Header */}
      <div className="pixel-card">
        <h2 className="pixel-font text-sm mb-3">👤 Profile</h2>
        <div className="flex items-center gap-4 mb-4">
          <div className="text-4xl">{user.avatar}</div>
          <div className="flex-1">
            <h3 className="pixel-font text-lg font-bold">{user.name}</h3>
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`pixel-border px-2 py-1 text-xs pixel-font ${
                  user.role === "admin"
                    ? "bg-purple-200"
                    : user.role === "builder"
                      ? "bg-blue-200"
                      : user.role === "partner"
                        ? "bg-green-200"
                        : "bg-yellow-200"
                }`}
              >
                {user.role.toUpperCase()}
              </span>
              {user.organizationName && (
                <span className="pixel-border bg-gray-100 px-2 py-1 text-xs pixel-font">{user.organizationName}</span>
              )}
            </div>
            <p className="text-xs text-gray-600">
              {user.address.slice(0, 8)}...{user.address.slice(-4)}
            </p>
          </div>
        </div>

        {/* Progress Stats */}
        <div className="grid grid-cols-3 gap-2">
          {progressStats.map((stat, index) => (
            <div key={index} className="text-center pixel-border bg-yellow-soft p-3">
              <div className="text-lg mb-1">{stat.icon}</div>
              <div className="pixel-font text-xl mb-1">{stat.value}</div>
              <div className="pixel-font text-xs">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Organization Creation CTA - Only show for non-partners and non-admins */}
      {user.role !== "partner" && user.role !== "admin" && (
        <div className="pixel-card bg-gradient-to-r from-green-soft to-navy-dark text-white">
          <div className="text-center py-6">
            <div className="text-4xl mb-3">🏢</div>
            <h3 className="pixel-font text-sm mb-2">Create Your Organization</h3>
            <p className="text-xs mb-4">
              Start your own organization to create tasks, build your team, and make an impact in the Web3 space
            </p>
            <button
              onClick={() => setShowCreateOrgModal(true)}
              className="pixel-button bg-yellow-soft text-black px-6 py-3"
            >
              🚀 Create Organization
            </button>
          </div>
        </div>
      )}

      {/* 2. In Progress */}
      {activeTasks.length > 0 && (
        <div className="pixel-card">
          <h3 className="pixel-font text-sm mb-3">🔄 In Progress ({activeTasks.length})</h3>
          <div className="space-y-2">
            {activeTasks.map((task) => (
              <div key={task.id} className="pixel-border bg-yellow-100 p-2">
                <h4 className="pixel-font text-xs font-bold">{task.title}</h4>
                <p className="text-xs text-gray-600">💰 {task.reward} cUSD</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Pending Review */}
      {pendingTasks.length > 0 && (
        <div className="pixel-card">
          <h3 className="pixel-font text-sm mb-3">⏳ Pending Review ({pendingTasks.length})</h3>
          <div className="space-y-2">
            {pendingTasks.map((task) => (
              <div key={task.id} className="pixel-border bg-orange p-2">
                <h4 className="pixel-font text-xs font-bold">{task.title}</h4>
                <p className="text-xs text-gray-600">💰 {task.reward} cUSD • Under Review</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Recent Achievements */}
      <div className="pixel-card">
        <h3 className="pixel-font text-sm mb-3">🏆 Recent Achievements</h3>
        <div className="space-y-2">
          {completedTasks.slice(0, 3).map((task) => (
            <div key={task.id} className="flex justify-between items-center p-2 bg-green-100 pixel-border">
              <div>
                <h4 className="pixel-font text-xs font-bold">{task.title}</h4>
                <p className="text-xs text-gray-600">Completed</p>
              </div>
              <div className="text-right">
                <div className="pixel-font text-xs font-bold text-green-700">+{task.reward} cUSD</div>
              </div>
            </div>
          ))}
          {completedTasks.length === 0 && (
            <p className="text-xs text-gray-500 text-center py-4">No completed tasks yet</p>
          )}
        </div>
      </div>

      {/* 5. Recent Activity */}
      <div className="pixel-card">
        <h3 className="pixel-font text-sm mb-3">📊 Recent Activity</h3>
        <div className="space-y-2">
          {userTasks.slice(0, 5).map((task) => (
            <div key={task.id} className="flex justify-between items-center p-2 bg-gray-50 pixel-border">
              <div>
                <h4 className="pixel-font text-xs font-bold">{task.title}</h4>
                <p className="text-xs text-gray-600">
                  {task.category} • {task.reward} cUSD
                </p>
              </div>
              <div className="text-xs">
                {task.status === "Active" && "🟢"}
                {task.status === "Pending" && "🟡"}
                {task.status === "Completed" && "✅"}
                {task.status === "Claimed" && "🔄"}
              </div>
            </div>
          ))}
          {userTasks.length === 0 && <p className="text-xs text-gray-500 text-center py-4">No activity yet</p>}
        </div>
      </div>

      {/* 6. Achievement Badges */}
      <div className="pixel-card">
        <h3 className="pixel-font text-sm mb-3">🏆 Achievement Badges</h3>
        <div className="grid grid-cols-2 gap-2">
          {badges.map((badge, index) => (
            <div
              key={index}
              className={`pixel-border p-3 text-center ${badge.earned ? "bg-yellow-soft" : "bg-gray-200 opacity-50"}`}
            >
              <div className="text-2xl mb-1">{badge.icon}</div>
              <div className="pixel-font text-xs font-bold mb-1">{badge.name}</div>
              <div className="text-xs text-gray-600">{badge.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. Celo Star Rankings - Orkut Style */}
      <div className="pixel-card">
        <h3 className="pixel-font text-sm mb-3">💚 Celo Star Rankings</h3>
        <p className="text-xs text-gray-600 mb-4">Community ratings based on your activity and contributions</p>
        <div className="space-y-3">
          {celoStarRankings.map((ranking, index) => (
            <div key={index} className="pixel-border bg-gray-50 p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{ranking.icon}</span>
                  <div>
                    <h4 className="pixel-font text-xs font-bold">{ranking.name}</h4>
                    <p className="text-xs text-gray-600">{ranking.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="pixel-border bg-navy-dark text-white px-2 py-1 text-xs pixel-font mb-1">
                    {ranking.shortName}
                  </div>
                  <div className="flex items-center gap-1">{renderCeloStars(ranking.stars, ranking.maxStars)}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {ranking.stars}/{ranking.maxStars}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 text-center">
          <p className="text-xs text-gray-500 mb-2">💚 = Celo Star • 🤍 = Not yet earned</p>
          <button className="pixel-button bg-green-soft text-white text-xs">📊 View Full Rankings</button>
        </div>
      </div>

      {/* 8. Level Up Your Skills */}
      <div className="pixel-card">
        <h3 className="pixel-font text-sm mb-3">💡 Level Up Your Skills</h3>
        <div className="pixel-border bg-blue-50 p-3 mb-3">
          <div className="flex items-start gap-3">
            <img
              src="/placeholder.svg?height=60&width=80"
              alt="Blog post thumbnail"
              className="w-20 h-15 pixel-border bg-gray-200"
            />
            <div className="flex-1">
              <h4 className="pixel-font text-xs font-bold mb-1">The Future of Learn2Earn in Web3</h4>
              <p className="text-xs text-gray-600 mb-2">
                Exploring how blockchain technology is revolutionizing education...
              </p>
              <button onClick={onNavigateToBlog} className="pixel-button bg-green-soft text-white text-xs px-3 py-1">
                📖 Read More
              </button>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <button onClick={onNavigateToFeatures} className="pixel-button bg-purple-200 w-full text-left">
            🚀 Explore Platform Features
          </button>
          <button onClick={onNavigateToAbout} className="pixel-button bg-yellow-200 w-full text-left">
            ℹ️ Learn About TheOffice
          </button>
        </div>
      </div>

      {/* No Tasks Message */}
      {userTasks.length === 0 && user.role !== "admin" && (
        <div className="pixel-card text-center py-8">
          <h3 className="pixel-font text-sm mb-4">🎯 Ready to Start?</h3>
          <p className="text-xs text-gray-600 mb-4">
            You haven't claimed any tasks yet. Browse available tasks to start earning!
          </p>
          <button className="pixel-button bg-green-soft">Browse Tasks</button>
        </div>
      )}

      {/* 9. Settings */}
      <div className="pixel-card">
        <h3 className="pixel-font text-sm mb-3">⚙️ Settings</h3>
        <div className="space-y-2">
          <button className="pixel-button bg-blue-200 w-full text-left">🔔 Notification Settings</button>
          <button className="pixel-button bg-green-200 w-full text-left">🔐 Security Settings</button>
          <button onClick={logout} className="pixel-button bg-red-300 w-full text-center py-3">
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Create Organization Modal */}
      {showCreateOrgModal && <CreateOrganizationModal onClose={() => setShowCreateOrgModal(false)} />}
    </div>
  )
}
