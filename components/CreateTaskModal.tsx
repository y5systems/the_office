"use client"

import type React from "react"

import { useState } from "react"
import { useApp } from "@/components/providers/app-provider"

interface CreateTaskModalProps {
  onClose: () => void
}

export default function CreateTaskModal({ onClose }: CreateTaskModalProps) {
  const { createTask, user } = useApp()
  const [taskData, setTaskData] = useState({
    title: "",
    category: "Education" as "Education" | "Research" | "Event" | "Partner Task" | "Other",
    reward: 10,
    complexity: "Low" as "Low" | "Medium" | "High",
    validationType: "Manual" as "Manual" | "File Upload" | "Auto" | "URL Submission",
    instructions: "",
    slots: 1,
    deadline: "",
    tags: [] as string[],
    newTag: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate creation delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    createTask({
      title: taskData.title,
      category: taskData.category,
      reward: taskData.reward,
      complexity: taskData.complexity,
      validationType: taskData.validationType,
      instructions: taskData.instructions,
      slots: taskData.slots,
      deadline: taskData.deadline || undefined,
      tags: taskData.tags,
    })

    setIsSubmitting(false)
    onClose()
  }

  const addTag = () => {
    if (taskData.newTag.trim() && !taskData.tags.includes(taskData.newTag.trim())) {
      setTaskData({
        ...taskData,
        tags: [...taskData.tags, taskData.newTag.trim()],
        newTag: "",
      })
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTaskData({
      ...taskData,
      tags: taskData.tags.filter((tag) => tag !== tagToRemove),
    })
  }

  const isFormValid = () => {
    return (
      taskData.title.trim() !== "" && taskData.instructions.trim() !== "" && taskData.reward > 0 && taskData.slots > 0
    )
  }

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-start justify-center p-4 z-50 overflow-y-auto">
      <div className="pixel-card bg-white w-full max-w-2xl mt-4 mb-4 border-4 border-black">
        <div className="flex justify-between items-center mb-4">
          <h2 className="pixel-font text-lg">👑 Create New Task</h2>
          <button
            onClick={onClose}
            className="pixel-border bg-red-300 px-3 py-2 hover:bg-red-400 transition-colors min-h-[44px] min-w-[44px]"
          >
            <span className="pixel-font">✕</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Task Title */}
          <div>
            <label className="pixel-font text-sm mb-2 block">📝 Task Title *</label>
            <input
              type="text"
              value={taskData.title}
              onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
              placeholder="Enter a clear, descriptive task title"
              className="pixel-input w-full"
              required
            />
          </div>

          {/* Category and Complexity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="pixel-font text-sm mb-2 block">📂 Category *</label>
              <select
                value={taskData.category}
                onChange={(e) =>
                  setTaskData({
                    ...taskData,
                    category: e.target.value as "Education" | "Research" | "Event" | "Partner Task" | "Other",
                  })
                }
                className="pixel-input w-full"
              >
                <option value="Education">📚 Education</option>
                <option value="Research">🔍 Research</option>
                <option value="Event">🎉 Event</option>
                <option value="Partner Task">🤝 Partner Task</option>
                <option value="Other">📋 Other</option>
              </select>
            </div>

            <div>
              <label className="pixel-font text-sm mb-2 block">⚡ Complexity *</label>
              <select
                value={taskData.complexity}
                onChange={(e) => setTaskData({ ...taskData, complexity: e.target.value as "Low" | "Medium" | "High" })}
                className="pixel-input w-full"
              >
                <option value="Low">🟢 Low</option>
                <option value="Medium">🟡 Medium</option>
                <option value="High">🔴 High</option>
              </select>
            </div>
          </div>

          {/* Reward and Slots */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="pixel-font text-sm mb-2 block">💰 Reward (cUSD) *</label>
              <input
                type="number"
                value={taskData.reward}
                onChange={(e) => setTaskData({ ...taskData, reward: Number.parseInt(e.target.value) || 0 })}
                min="1"
                className="pixel-input w-full"
                required
              />
            </div>

            <div>
              <label className="pixel-font text-sm mb-2 block">👥 Available Slots *</label>
              <input
                type="number"
                value={taskData.slots}
                onChange={(e) => setTaskData({ ...taskData, slots: Number.parseInt(e.target.value) || 1 })}
                min="1"
                max="100"
                className="pixel-input w-full"
                required
              />
            </div>
          </div>

          {/* Validation Type and Deadline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="pixel-font text-sm mb-2 block">✅ Validation Method *</label>
              <select
                value={taskData.validationType}
                onChange={(e) =>
                  setTaskData({
                    ...taskData,
                    validationType: e.target.value as "Manual" | "File Upload" | "Auto" | "URL Submission",
                  })
                }
                className="pixel-input w-full"
              >
                <option value="Manual">📝 Manual Review</option>
                <option value="File Upload">📁 File Upload</option>
                <option value="URL Submission">🔗 URL Submission</option>
                <option value="Auto">🤖 Auto Verification</option>
              </select>
            </div>

            <div>
              <label className="pixel-font text-sm mb-2 block">📅 Deadline (Optional)</label>
              <input
                type="datetime-local"
                value={taskData.deadline}
                onChange={(e) => setTaskData({ ...taskData, deadline: e.target.value })}
                className="pixel-input w-full"
              />
            </div>
          </div>

          {/* Instructions */}
          <div>
            <label className="pixel-font text-sm mb-2 block">📋 Task Instructions *</label>
            <textarea
              value={taskData.instructions}
              onChange={(e) => setTaskData({ ...taskData, instructions: e.target.value })}
              placeholder="Provide clear, detailed instructions for completing this task..."
              className="pixel-input w-full h-32 resize-none"
              required
            />
            <p className="text-xs text-gray-600 mt-1">
              Be specific about requirements, deliverables, and success criteria.
            </p>
          </div>

          {/* Tags */}
          <div>
            <label className="pixel-font text-sm mb-2 block">🏷️ Tags</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={taskData.newTag}
                onChange={(e) => setTaskData({ ...taskData, newTag: e.target.value })}
                placeholder="Add a tag"
                className="pixel-input flex-1"
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
              />
              <button type="button" onClick={addTag} className="pixel-button bg-green-soft text-white">
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-1">
              {taskData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="pixel-border bg-gray-100 px-2 py-1 text-xs pixel-font flex items-center gap-1"
                >
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)} className="text-red-500 hover:text-red-700">
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Task Preview */}
          <div className="pixel-border bg-blue-50 p-4">
            <h4 className="pixel-font text-sm font-bold mb-2">📋 Task Preview:</h4>
            <div className="space-y-2 text-xs">
              <div>
                <strong>Title:</strong> {taskData.title || "Task title will appear here"}
              </div>
              <div>
                <strong>Category:</strong> {taskData.category} | <strong>Complexity:</strong> {taskData.complexity}
              </div>
              <div>
                <strong>Reward:</strong> {taskData.reward} cUSD | <strong>Slots:</strong> {taskData.slots}
              </div>
              <div>
                <strong>Validation:</strong> {taskData.validationType}
              </div>
              {taskData.deadline && (
                <div>
                  <strong>Deadline:</strong> {new Date(taskData.deadline).toLocaleDateString()}
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="pixel-button bg-gray-200 flex-1" disabled={isSubmitting}>
              Cancel
            </button>
            <button
              type="submit"
              className="pixel-button bg-green-soft text-white flex-1"
              disabled={!isFormValid() || isSubmitting}
            >
              {isSubmitting ? "Creating..." : "🚀 Create Task"}
            </button>
          </div>
        </form>

        {/* Help Section */}
        <div className="mt-4 pt-4 border-t-2 border-gray-200">
          <h4 className="pixel-font text-xs font-bold mb-2">💡 Task Creation Tips:</h4>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• Write clear, specific instructions to avoid confusion</li>
            <li>• Set appropriate rewards based on task complexity and time required</li>
            <li>• Use tags to help users find relevant tasks</li>
            <li>• Consider the validation method that best fits your task type</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
