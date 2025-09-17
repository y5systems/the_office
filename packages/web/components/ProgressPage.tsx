"use client"

import { useApp } from "@/components/providers/app-provider"

export default function ProgressPage() {
  const { user, tasks } = useApp()

  if (!user) {
    return (
      <div className="space-y-4 px-2 pb-6">
        <div className="pixel-card text-center py-8">
          <h2 className="pixel-font text-lg mb-4">📊 Progress Tracking</h2>
          <p className="pixel-font text-sm text-gray-600 mb-4">Connect your wallet to track your progress</p>
          <button className="pixel-button bg-pink-soft">Connect Wallet</button>
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

  return (
    <div className="space-y-4 px-3 pb-6">
      {/* Progress Stats */}
      <div className="pixel-card">
        <h2 className="pixel-font text-lg mb-4">📊 Your Progress</h2>
        <div className="grid grid-cols-3 gap-3 text-center">
          {progressStats.map((stat, index) => (
            <div key={index} className="pixel-border bg-yellow-soft p-3">
              <div className="text-lg mb-1">{stat.icon}</div>
              <div className="pixel-font text-xl mb-1">{stat.value}</div>
              <div className="pixel-font text-xs">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Tasks */}
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

      {/* Pending Tasks */}
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

      {/* Recent Achievements */}
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
        </div>
      </div>

      {/* Self Development Tips */}
      <div className="pixel-card">
        <h3 className="pixel-font text-sm mb-3">💡 Level Up Your Skills</h3>
        <p className="text-xs text-gray-600 mb-3">
          Learn how to thrive in the bounty economy and maximize your earning potential.
        </p>
        <button className="pixel-button bg-blue-200 w-full">📚 Tips for Self Development</button>
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
    </div>
  )
}
