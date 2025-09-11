"use client"

import type React from "react"

import { useApp } from "@/components/providers/app-provider"

interface HomePageProps {
  onNavigateToTasks?: () => void
  onNavigateToOpportunities?: () => void
  onViewTask?: (taskId: string) => void
  onNavigateToFeatures?: () => void
}

export default function HomePage({
  onNavigateToTasks,
  onNavigateToOpportunities,
  onViewTask,
  onNavigateToFeatures,
}: HomePageProps) {
  const { user, tasks, opportunities, claimTask, connectWallet, web3 } = useApp()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 24) {
      return `${diffInHours}h ago`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays}d ago`
    }
  }

  const handleClaimTask = (taskId: string, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent triggering the view task action
    claimTask(taskId)
  }

  // Show user switching options if no Web3 wallet is connected (desktop testing)
  const showUserSwitching = !web3.isConnected

  return (
    <div className="space-y-6 mobile-container pb-6">
      {/* User Switching Section (Desktop Testing Only) */}
      {showUserSwitching && (
        <section>
          <div className="pixel-card bg-gradient-to-r from-yellow-soft to-pink-soft">
            <h2 className="pixel-font text-responsive-lg mb-4">🎭 Test Different Users</h2>
            <p className="text-responsive-xs text-gray-700 mb-4">
              Switch between different user roles to test the app (Desktop only)
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-3">
              <button
                onClick={() => connectWallet('admin')}
                className={`pixel-button text-responsive-xs p-3 text-center ${
                  user?.role === 'admin' ? 'bg-purple-300' : 'bg-white'
                }`}
              >
                <div className="text-lg mb-1">👑</div>
                <div className="pixel-font">Admin</div>
              </button>
              <button
                onClick={() => connectWallet('partner')}
                className={`pixel-button text-responsive-xs p-3 text-center ${
                  user?.role === 'partner' ? 'bg-purple-300' : 'bg-white'
                }`}
              >
                <div className="text-lg mb-1">🏢</div>
                <div className="pixel-font">Partner</div>
              </button>
              <button
                onClick={() => connectWallet('contributor')}
                className={`pixel-button text-responsive-xs p-3 text-center ${
                  user?.role === 'contributor' ? 'bg-purple-300' : 'bg-white'
                }`}
              >
                <div className="text-lg mb-1">🔧</div>
                <div className="pixel-font">Contributor</div>
              </button>
              <button
                onClick={() => connectWallet('builder')}
                className={`pixel-button text-responsive-xs p-3 text-center ${
                  user?.role === 'builder' ? 'bg-purple-300' : 'bg-white'
                }`}
              >
                <div className="text-lg mb-1">👨‍💻</div>
                <div className="pixel-font">Builder</div>
              </button>
              <button
                onClick={() => connectWallet('student')}
                className={`pixel-button text-responsive-xs p-3 text-center ${
                  user?.role === 'student' ? 'bg-purple-300' : 'bg-white'
                }`}
              >
                <div className="text-lg mb-1">🎓</div>
                <div className="pixel-font">Student</div>
              </button>
            </div>
            {user && (
              <div className="mt-4 pixel-border bg-gray-100 p-3">
                <div className="text-responsive-xs">
                  <strong>Current User:</strong> {user.name} ({user.role})
                </div>
              </div>
            )}
          </div>
        </section>
      )}
      {/* Latest Tasks Section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="pixel-font text-responsive-lg">📋 Latest Tasks</h2>
          <button
            onClick={onNavigateToTasks}
            className="pixel-button bg-pink-soft text-black text-responsive-xs px-3 py-1"
          >
            + More
          </button>
        </div>

        <div className="grid gap-3 md:gap-4 lg:grid-cols-2">
          {tasks.slice(0, 4).map((task) => (
            <div key={task.id} className="pixel-card">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h3 className="pixel-font text-responsive-sm font-bold mb-1">{task.title}</h3>
                  <p className="text-responsive-xs text-gray-600 mb-2 line-clamp-2">{task.instructions}</p>
                  <div className="flex items-center gap-3 text-responsive-xs text-gray-500 mb-2 flex-wrap">
                    <span>💰 {task.reward} cUSD</span>
                    <span>👥 {task.slots} slots</span>
                    <span>⏰ {getTimeAgo(task.createdAt)}</span>
                    <span
                      className={`px-2 py-1 rounded ${
                        task.status === "Active"
                          ? "bg-green-soft text-white"
                          : task.status === "Pending"
                            ? "bg-yellow-soft text-black"
                            : task.status === "Completed"
                              ? "bg-navy-dark text-white"
                              : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {task.status}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-1 ml-2">
                  <button
                    onClick={() => onViewTask?.(task.id)}
                    className="pixel-button bg-green-soft text-white text-responsive-xs px-3 py-1"
                  >
                    View
                  </button>
                  {task.status === "Active" && (
                    <button
                      onClick={(e) => handleClaimTask(task.id, e)}
                      className="pixel-button bg-orange text-white text-responsive-xs px-3 py-1"
                    >
                      Claim
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Opportunities Section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="pixel-font text-responsive-lg">🚀 Opportunities</h2>
          <button
            onClick={onNavigateToOpportunities}
            className="pixel-button bg-pink-soft text-black text-responsive-xs px-3 py-1"
          >
            + More
          </button>
        </div>

        <div className="grid gap-3 md:gap-4 lg:grid-cols-2">
          {opportunities.slice(0, 4).map((opportunity) => (
            <div key={opportunity.id} className="pixel-card">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="pixel-font text-responsive-sm font-bold">{opportunity.title}</h3>
                    <span
                      className={`pixel-border px-2 py-1 text-responsive-xs pixel-font ${
                        opportunity.type === "Grant"
                          ? "bg-green-soft text-white"
                          : opportunity.type === "Hackathon"
                            ? "bg-pink-soft text-black"
                            : opportunity.type === "Job"
                              ? "bg-navy-dark text-white"
                              : opportunity.type === "Internship"
                                ? "bg-yellow-soft text-black"
                                : "bg-orange text-white"
                      }`}
                    >
                      {opportunity.type}
                    </span>
                  </div>
                  <p className="text-responsive-xs text-gray-600 mb-2 line-clamp-2">{opportunity.description}</p>
                  <div className="flex items-center gap-3 text-responsive-xs text-gray-500 mb-2 flex-wrap">
                    <span>🏢 {opportunity.organization}</span>
                    {opportunity.reward && <span>💰 {opportunity.reward}</span>}
                    {opportunity.deadline && <span>📅 {formatDate(opportunity.deadline)}</span>}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {opportunity.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="bg-gray-100 px-2 py-1 text-responsive-xs pixel-font rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <a href={opportunity.link} target="_blank" rel="noopener noreferrer">
                  <button className="pixel-button bg-orange text-white text-responsive-xs px-3 py-1 ml-2">Apply</button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Preview Section - Moved to bottom and made smaller */}
      <section>
        <div className="pixel-card bg-gradient-to-r from-navy-dark to-green-soft text-white">
          <div className="text-center py-4">
            <div className="text-2xl mb-2">🚀</div>
            <h2 className="pixel-font text-responsive-sm mb-2">Discover All Features</h2>
            <p className="text-responsive-xs mb-3">
              AI-powered task creation, mobile-first design, and comprehensive tools for every user type
            </p>
            <div className="flex justify-center">
              <button
                onClick={onNavigateToFeatures}
                className="pixel-button bg-yellow-soft text-black px-4 py-2 text-responsive-xs"
              >
                📋 Explore Features
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
