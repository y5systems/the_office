"use client"

import { useState } from "react"
import { useApp } from "@/components/providers/app-provider"
import CreateTaskModal from "@/components/CreateTaskModal"

export default function AdminDashboard() {
  const { user, tasks, approveTask, deleteTask, banUser } = useApp()
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false)

  if (!user || user.role !== "admin") return null

  const pendingTasks = tasks.filter((task) => task.status === "Pending")
  const activeTasks = tasks.filter((task) => task.status === "Active")
  const completedTasks = tasks.filter((task) => task.status === "Completed")

  const adminStats = [
    { label: "USERS", value: user.usersManaged?.toString() || "0", color: "bg-blue-300", icon: "👥" },
    { label: "PLATFORM", value: `${user.totalPlatformValue} cUSD`, color: "bg-green-bright", icon: "💰" },
    { label: "PENDING", value: pendingTasks.length.toString(), color: "bg-orange", icon: "⏳" },
    { label: "ACTIVE", value: activeTasks.length.toString(), color: "bg-green-soft", icon: "🟢" },
  ]

  return (
    <div className="space-y-4 px-3">
      {/* Admin Header */}
      <div className="pixel-card bg-purple-100">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl">👑</span>
          <div>
            <h2 className="pixel-font text-lg">ADMIN DASHBOARD</h2>
            <p className="pixel-font text-xs text-gray-600">System Administrator Panel</p>
          </div>
        </div>
      </div>

      {/* Admin Stats */}
      <div className="pixel-card">
        <h3 className="pixel-font text-sm mb-3">PLATFORM OVERVIEW</h3>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {adminStats.map((stat, index) => (
            <div key={index} className={`pixel-border ${stat.color} p-3 text-center`}>
              <div className="text-lg mb-1">{stat.icon}</div>
              <div className="pixel-font text-lg mb-1">{stat.value}</div>
              <div className="pixel-font text-xs">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Admin Actions */}
      <div className="pixel-card">
        <h3 className="pixel-font text-sm mb-3">ADMIN ACTIONS</h3>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setShowCreateTaskModal(true)}
            className="pixel-button bg-green-soft text-white text-xs"
          >
            ➕ CREATE TASK
          </button>
          <button className="pixel-button bg-blue-200 text-xs">👥 MANAGE USERS</button>
          <button className="pixel-button bg-yellow-200 text-xs">📊 ANALYTICS</button>
          <button className="pixel-button bg-red-200 text-xs">🚫 MODERATION</button>
        </div>
      </div>

      {/* Pending Approvals - Admin Priority */}
      {pendingTasks.length > 0 && (
        <div className="pixel-card">
          <h3 className="pixel-font text-sm mb-3">⚡ ADMIN APPROVALS ({pendingTasks.length})</h3>
          <div className="space-y-3">
            {pendingTasks.map((task) => (
              <div key={task.id} className="pixel-border bg-yellow-100 p-3">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h4 className="pixel-font text-xs font-bold">{task.title}</h4>
                    <p className="pixel-font text-xs text-gray-600">
                      {task.category} • {task.reward} cUSD • By: {task.createdBy.slice(0, 8)}...
                    </p>
                    {task.submittedProof && (
                      <p className="pixel-font text-xs text-blue-600 mt-1">Proof: {task.submittedProof}</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-1 mt-2">
                  <button onClick={() => approveTask(task.id)} className="pixel-button bg-green-300 text-xs flex-1">
                    ✅ APPROVE
                  </button>
                  <button onClick={() => deleteTask(task.id)} className="pixel-button bg-red-300 text-xs flex-1">
                    ❌ REJECT
                  </button>
                  <button onClick={() => banUser(task.claimedBy || "")} className="pixel-button bg-orange text-xs">
                    🚫
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Tasks Management */}
      <div className="pixel-card">
        <h3 className="pixel-font text-sm mb-3">📋 TASK MANAGEMENT</h3>
        <div className="space-y-2">
          {tasks.slice(0, 3).map((task) => (
            <div key={task.id} className="flex justify-between items-center p-2 bg-gray-50 pixel-border">
              <div className="flex-1">
                <h4 className="pixel-font text-xs font-bold">{task.title}</h4>
                <p className="pixel-font text-xs text-gray-600">
                  {task.status} • {task.reward} cUSD
                </p>
              </div>
              <div className="flex gap-1">
                <button onClick={() => deleteTask(task.id)} className="pixel-button bg-red-200 text-xs px-2 py-1">
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* System Status */}
      <div className="pixel-card">
        <h3 className="pixel-font text-sm mb-3">🔧 SYSTEM STATUS</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="pixel-font text-xs">Blockchain Status:</span>
            <span className="pixel-font text-xs text-green-600">🟢 ONLINE</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="pixel-font text-xs">Smart Contracts:</span>
            <span className="pixel-font text-xs text-green-600">✅ ACTIVE</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="pixel-font text-xs">API Status:</span>
            <span className="pixel-font text-xs text-green-600">⚡ HEALTHY</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="pixel-font text-xs">Database:</span>
            <span className="pixel-font text-xs text-green-600">💾 SYNCED</span>
          </div>
        </div>
      </div>

      {/* Create Task Modal */}
      {showCreateTaskModal && <CreateTaskModal onClose={() => setShowCreateTaskModal(false)} />}
    </div>
  )
}
