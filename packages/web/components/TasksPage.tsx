"use client"

import type React from "react"

import { useState } from "react"
import { useApp } from "@/components/providers/app-provider"
import TaskSubmissionModal from "@/components/TaskSubmissionModal"
import CreateTaskModal from "@/components/CreateTaskModal"

interface TasksPageProps {
  onViewTask?: (taskId: string) => void
}

export default function TasksPage({ onViewTask }: TasksPageProps) {
  const { tasks, user, claimTask, submitTask } = useApp()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")
  const [activeCategoryFilter, setActiveCategoryFilter] = useState("all")
  const [myTasksSubFilter, setMyTasksSubFilter] = useState("late") // Changed from "all" to "late"
  const [showSubmissionModal, setShowSubmissionModal] = useState(false)
  const [selectedTaskForSubmission, setSelectedTaskForSubmission] = useState<any>(null)
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false)

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

  const isTaskLate = (task: any) => {
    if (!task.deadline) return false
    const deadline = new Date(task.deadline)
    const now = new Date()
    return now > deadline && (task.status === "Claimed" || task.status === "Pending")
  }

  const filterTasks = () => {
    let filteredTasks = tasks

    // Search filter
    if (searchQuery.trim()) {
      filteredTasks = filteredTasks.filter(
        (task) =>
          task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.instructions.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    // Status filter
    switch (activeFilter) {
      case "open":
        filteredTasks = filteredTasks.filter((task) => task.status === "Active")
        break
      case "mine":
        filteredTasks = filteredTasks.filter(
          (task) => task.claimedBy === user?.address || task.createdBy === user?.address,
        )

        // Apply My Tasks sub-filter
        if (myTasksSubFilter === "late") {
          filteredTasks = filteredTasks.filter((task) => isTaskLate(task))
        } else if (myTasksSubFilter === "active") {
          filteredTasks = filteredTasks.filter((task) => task.status === "Claimed" && !isTaskLate(task))
        } else if (myTasksSubFilter === "pending") {
          filteredTasks = filteredTasks.filter((task) => task.status === "Pending")
        } else if (myTasksSubFilter === "completed") {
          filteredTasks = filteredTasks.filter((task) => task.status === "Completed")
        }
        break
      // "all" shows everything
    }

    // Category filter
    if (activeCategoryFilter !== "all") {
      filteredTasks = filteredTasks.filter((task) => task.category === activeCategoryFilter)
    }

    return filteredTasks
  }

  const handleClaimTask = (taskId: string, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent triggering the view task action
    claimTask(taskId)
  }

  const handleSubmitTask = (task: any, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedTaskForSubmission(task)
    setShowSubmissionModal(true)
  }

  const handleTaskSubmission = (taskId: string, proof: string, submissionData: any) => {
    submitTask(taskId, proof)
    setShowSubmissionModal(false)
    setSelectedTaskForSubmission(null)
  }

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter)
    // Set default My Tasks sub-filter to "late" when switching to mine
    if (filter === "mine") {
      setMyTasksSubFilter("late")
    }
  }

  const filteredTasks = filterTasks()
  const categories = ["Education", "Research", "Event", "Partner Task", "Other"]

  // Get counts for My Tasks sub-filters
  const myTasks = tasks.filter((task) => task.claimedBy === user?.address || task.createdBy === user?.address)
  const lateTasks = myTasks.filter((task) => isTaskLate(task))
  const activeTasks = myTasks.filter((task) => task.status === "Claimed" && !isTaskLate(task))
  const pendingTasks = myTasks.filter((task) => task.status === "Pending")
  const completedTasks = myTasks.filter((task) => task.status === "Completed")

  return (
    <div className="space-y-4 mobile-container pb-6">
      {/* Search Field */}
      <div className="pixel-card">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pixel-input w-full"
        />
      </div>

      {/* Admin Task Creation - Only show for admins */}
      {user?.role === "admin" && (
        <div className="pixel-card bg-purple-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">👑</span>
              <div>
                <h3 className="pixel-font text-sm font-bold">Admin Task Creation</h3>
                <p className="text-xs text-gray-600">Create tasks for the platform</p>
              </div>
            </div>
            <button
              onClick={() => setShowCreateTaskModal(true)}
              className="pixel-button bg-green-soft text-white px-4 py-2"
            >
              ➕ CREATE TASK
            </button>
          </div>
        </div>
      )}

      {/* Main Status Filters - Bigger buttons */}
      <div className="responsive-grid-2">
        <button
          onClick={() => handleFilterChange("open")}
          className={`pixel-button py-3 md:py-4 ${activeFilter === "open" ? "bg-green-soft text-white" : "bg-white"}`}
        >
          <span className="text-responsive-sm">🟢 OPEN TASKS</span>
        </button>
        <button
          onClick={() => handleFilterChange("mine")}
          className={`pixel-button py-3 md:py-4 ${activeFilter === "mine" ? "bg-navy-dark text-white" : "bg-white"}`}
        >
          <span className="text-responsive-sm">👤 MY TASKS</span>
        </button>
      </div>

      {/* My Tasks Sub-Filters - Only show when "mine" is selected */}
      {activeFilter === "mine" && (
        <div className="pixel-card">
          <h3 className="pixel-font text-sm mb-3">📋 My Tasks Filters</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <button
              onClick={() => setMyTasksSubFilter("late")}
              className={`pixel-button text-responsive-xs py-2 ${myTasksSubFilter === "late" ? "bg-red-300 text-black" : "bg-white"}`}
            >
              ⚠️ Late ({lateTasks.length})
            </button>
            <button
              onClick={() => setMyTasksSubFilter("active")}
              className={`pixel-button text-responsive-xs py-2 ${myTasksSubFilter === "active" ? "bg-yellow-soft text-black" : "bg-white"}`}
            >
              🔄 Active ({activeTasks.length})
            </button>
            <button
              onClick={() => setMyTasksSubFilter("pending")}
              className={`pixel-button text-responsive-xs py-2 ${myTasksSubFilter === "pending" ? "bg-orange text-white" : "bg-white"}`}
            >
              ⏳ Pending ({pendingTasks.length})
            </button>
            <button
              onClick={() => setMyTasksSubFilter("completed")}
              className={`pixel-button text-responsive-xs py-2 ${myTasksSubFilter === "completed" ? "bg-green-soft text-white" : "bg-white"}`}
            >
              ✅ Done ({completedTasks.length})
            </button>
          </div>
        </div>
      )}

      {/* Category Filters */}
      <div className="flex gap-1 md:gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveCategoryFilter("all")}
          className={`pixel-button flex-shrink-0 ${activeCategoryFilter === "all" ? "bg-pink-soft text-black" : "bg-white"}`}
        >
          <span className="text-responsive-xs">ALL</span>
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategoryFilter(category)}
            className={`pixel-button flex-shrink-0 ${activeCategoryFilter === category ? "bg-pink-soft text-black" : "bg-white"}`}
          >
            <span className="text-responsive-xs">{category.toUpperCase()}</span>
          </button>
        ))}
      </div>

      {/* Tasks List */}
      <div className="space-y-3 md:space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="pixel-font text-responsive-lg">
            📋 Tasks ({filteredTasks.length})
            {activeFilter === "mine" && (
              <span className="text-responsive-sm text-gray-600">
                {" "}
                -{" "}
                {myTasksSubFilter === "late"
                  ? "Late Tasks"
                  : myTasksSubFilter === "active"
                    ? "Active Tasks"
                    : myTasksSubFilter === "pending"
                      ? "Pending Tasks"
                      : "Completed Tasks"}
              </span>
            )}
          </h2>
          {filteredTasks.length > 5 && (
            <button className="pixel-button bg-pink-soft text-black text-responsive-xs px-3 py-1">+ More</button>
          )}
        </div>

        {filteredTasks.length === 0 ? (
          <div className="pixel-card text-center py-8 md:py-12">
            <p className="pixel-font text-responsive-sm text-gray-600 mb-2">
              {activeFilter === "mine" && myTasksSubFilter === "late" ? "No late tasks found" : "No tasks found"}
            </p>
            <p className="text-responsive-xs text-gray-500">
              {activeFilter === "mine" && myTasksSubFilter === "late"
                ? "Great! All your tasks are on time"
                : "Try adjusting your search or filters"}
            </p>
          </div>
        ) : (
          <div className="grid gap-3 md:gap-4 lg:grid-cols-2">
            {filteredTasks.slice(0, 10).map((task) => {
              const isLate = isTaskLate(task)
              return (
                <div key={task.id} className={`pixel-card ${isLate ? "border-red-500 bg-red-50" : ""}`}>
                  <div className="flex justify-between items-start mb-2 md:mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 md:mb-2 flex-wrap">
                        <h3 className="pixel-font text-responsive-sm font-bold">{task.title}</h3>
                        {isLate && (
                          <span className="pixel-border bg-red-300 text-black px-2 py-1 text-responsive-xs pixel-font">
                            ⚠️ LATE
                          </span>
                        )}
                        <span
                          className={`pixel-border px-2 py-1 text-responsive-xs pixel-font ${
                            task.category === "Education"
                              ? "bg-navy-dark text-white"
                              : task.category === "Research"
                                ? "bg-pink-soft text-black"
                                : task.category === "Event"
                                  ? "bg-yellow-soft text-black"
                                  : task.category === "Partner Task"
                                    ? "bg-green-soft text-white"
                                    : "bg-gray-100"
                          }`}
                        >
                          {task.category}
                        </span>
                        <span
                          className={`pixel-border px-2 py-1 text-responsive-xs pixel-font ${
                            task.complexity === "Low"
                              ? "bg-green-soft text-white"
                              : task.complexity === "Medium"
                                ? "bg-yellow-soft text-black"
                                : task.complexity === "High"
                                  ? "bg-orange text-white"
                                  : ""
                          }`}
                        >
                          {task.complexity}
                        </span>
                      </div>
                      <p className="text-responsive-xs text-gray-600 mb-2 line-clamp-2 md:line-clamp-3">
                        {task.instructions}
                      </p>
                      <div className="flex items-center gap-3 text-responsive-xs text-gray-500 mb-2 flex-wrap">
                        <span>💰 {task.reward} cUSD</span>
                        <span>👥 {task.slots} slots</span>
                        <span>⏰ {getTimeAgo(task.createdAt)}</span>
                        {task.deadline && (
                          <span className={isLate ? "text-red-600 font-bold" : ""}>
                            📅 Due: {new Date(task.deadline).toLocaleDateString()}
                          </span>
                        )}
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
                      <div className="flex flex-wrap gap-1">
                        {task.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="bg-gray-100 px-2 py-1 text-responsive-xs pixel-font rounded">
                            {tag}
                          </span>
                        ))}
                        {task.tags.length > 3 && (
                          <span className="bg-gray-100 px-2 py-1 text-responsive-xs pixel-font rounded">
                            +{task.tags.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 ml-2 md:ml-3">
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
                      {task.status === "Claimed" && task.claimedBy === user?.address && (
                        <button
                          onClick={(e) => handleSubmitTask(task, e)}
                          className="pixel-button bg-navy-dark text-white text-responsive-xs px-3 py-1"
                        >
                          Submit
                        </button>
                      )}
                      {task.status === "Pending" && (
                        <span className="pixel-border bg-yellow-soft text-black px-3 py-1 text-responsive-xs pixel-font text-center">
                          Under Review
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
      {showSubmissionModal && selectedTaskForSubmission && (
        <TaskSubmissionModal
          task={selectedTaskForSubmission}
          onClose={() => {
            setShowSubmissionModal(false)
            setSelectedTaskForSubmission(null)
          }}
          onSubmit={handleTaskSubmission}
        />
      )}
      {/* Create Task Modal */}
      {showCreateTaskModal && <CreateTaskModal onClose={() => setShowCreateTaskModal(false)} />}
    </div>
  )
}
