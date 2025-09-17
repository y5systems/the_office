"use client"

import { useApp } from "@/components/providers/app-provider"

interface TaskDetailPageProps {
  taskId: string
  onBack: () => void
  onViewOrganization: (orgId: string) => void
}

export default function TaskDetailPage({ taskId, onBack, onViewOrganization }: TaskDetailPageProps) {
  const { tasks, user, claimTask } = useApp()

  const task = tasks.find((t) => t.id === taskId)

  if (!task) {
    return (
      <div className="space-y-4 px-3 pb-6">
        <div className="pixel-card text-center py-8">
          <h2 className="pixel-font text-lg mb-4">Task Not Found</h2>
          <button onClick={onBack} className="pixel-button bg-pink-soft">
            Go Back
          </button>
        </div>
      </div>
    )
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

  // Mock organization data
  const organization = {
    id: "org_1",
    name: "Chapada Sustentável",
    description: "Promoting sustainable farming practices in the Chapada region through education and technology.",
    avatar: "🌱",
    website: "https://chapada-sustentavel.org",
    location: "Chapada, Brazil",
    founded: "2020",
    teamSize: 12,
    totalTasks: 25,
    completedTasks: 18,
    team: [
      { name: "Maria Santos", role: "Project Manager", avatar: "👩‍💼" },
      { name: "João Silva", role: "Community Lead", avatar: "👨‍🌾" },
      { name: "Ana Costa", role: "Tech Coordinator", avatar: "👩‍💻" },
    ],
  }

  // Mock collection info
  const isPartOfCollection = task.category === "Partner Task"
  const collectionStep = isPartOfCollection ? { current: 1, total: 3 } : null

  // Mock claimed count
  const claimedCount = Math.floor(Math.random() * task.slots)

  const restrictions = {
    required: [
      "Basic knowledge of social media platforms",
      "Design experience (Canva, Photoshop, or similar)",
      "Understanding of sustainable farming concepts",
    ],
    preferred: [
      "Previous experience with agricultural content",
      "Portuguese language skills",
      "Local knowledge of Chapada region",
    ],
    notSuitable: [
      "Complete beginners in design",
      "Those without access to design tools",
      "Users unable to commit 4+ hours",
    ],
  }

  return (
    <div className="space-y-4 px-3 pb-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <button onClick={onBack} className="pixel-button bg-gray-200 px-3 py-2">
          ← Back
        </button>
        <h1 className="pixel-font text-lg">Task Details</h1>
      </div>

      {/* Task Header */}
      <div className="pixel-card">
        <div className="flex items-center gap-2 mb-3">
          <h2 className="pixel-font text-lg font-bold flex-1">{task.title}</h2>
          <span
            className={`pixel-border px-2 py-1 text-xs pixel-font ${
              task.status === "Active"
                ? "bg-green-200"
                : task.status === "Pending"
                  ? "bg-yellow-200"
                  : task.status === "Completed"
                    ? "bg-blue-200"
                    : "bg-gray-200"
            }`}
          >
            {task.status}
          </span>
        </div>

        {/* Collection Badge */}
        {collectionStep && (
          <div className="pixel-border bg-purple-100 p-2 mb-3 text-center">
            <span className="pixel-font text-xs">
              📚 Part of Collection: Step {collectionStep.current} of {collectionStep.total}
            </span>
          </div>
        )}

        {/* Task Meta */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="pixel-border bg-green-soft p-2 text-center">
            <div className="pixel-font text-lg">{task.reward}</div>
            <div className="pixel-font text-xs">cUSD Reward</div>
          </div>
          <div className="pixel-border bg-yellow-soft p-2 text-center">
            <div className="pixel-font text-lg">
              {claimedCount}/{task.slots}
            </div>
            <div className="pixel-font text-xs">Claimed</div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex items-center gap-2 mb-3">
          <span
            className={`pixel-border px-2 py-1 text-xs pixel-font ${
              task.category === "Education"
                ? "bg-blue-100"
                : task.category === "Research"
                  ? "bg-purple-100"
                  : task.category === "Event"
                    ? "bg-yellow-100"
                    : task.category === "Partner Task"
                      ? "bg-green-100"
                      : "bg-gray-100"
            }`}
          >
            {task.category}
          </span>
          <span
            className={`pixel-border px-2 py-1 text-xs pixel-font ${
              task.complexity === "Low" ? "bg-green-200" : task.complexity === "Medium" ? "bg-yellow-200" : "bg-red-200"
            }`}
          >
            {task.complexity}
          </span>
          <span className="pixel-border bg-gray-100 px-2 py-1 text-xs pixel-font">{task.validationType}</span>
        </div>

        {/* Time Info */}
        <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
          <span>⏰ Posted {getTimeAgo(task.createdAt)}</span>
          {task.deadline && <span>📅 Due: {new Date(task.deadline).toLocaleDateString()}</span>}
        </div>

        {/* Action Button */}
        {task.status === "Active" && claimedCount < task.slots && (
          <button onClick={() => claimTask(task.id)} className="pixel-button bg-orange w-full py-3">
            🎯 Claim This Task
          </button>
        )}
      </div>

      {/* Task Description */}
      <div className="pixel-card">
        <h3 className="pixel-font text-sm mb-3">📋 Task Description</h3>
        <p className="text-sm text-gray-700 leading-relaxed mb-3">{task.instructions}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {task.tags.map((tag, index) => (
            <span key={index} className="bg-gray-100 px-2 py-1 text-xs pixel-font rounded">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Organization */}
      <div className="pixel-card">
        <h3 className="pixel-font text-sm mb-3">🏢 Organization</h3>
        <div className="flex items-start gap-3 mb-3">
          <div className="text-3xl">{organization.avatar}</div>
          <div className="flex-1">
            <button
              onClick={() => onViewOrganization(organization.id)}
              className="pixel-font text-sm font-bold text-blue-600 hover:text-blue-800 mb-1"
            >
              {organization.name} →
            </button>
            <p className="text-xs text-gray-600 mb-2">{organization.description}</p>
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span>📍 {organization.location}</span>
              <span>👥 {organization.teamSize} members</span>
              <span>
                📋 {organization.completedTasks}/{organization.totalTasks} tasks
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Task Restrictions */}
      <div className="pixel-card">
        <h3 className="pixel-font text-sm mb-3">⚠️ Task Requirements</h3>

        <div className="space-y-3">
          <div>
            <h4 className="pixel-font text-xs mb-2 text-green-700">✅ Required Skills:</h4>
            <ul className="space-y-1">
              {restrictions.required.map((req, index) => (
                <li key={index} className="text-xs text-gray-700 flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="pixel-font text-xs mb-2 text-blue-700">💡 Preferred:</h4>
            <ul className="space-y-1">
              {restrictions.preferred.map((pref, index) => (
                <li key={index} className="text-xs text-gray-700 flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span>{pref}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="pixel-font text-xs mb-2 text-red-700">❌ Not Suitable For:</h4>
            <ul className="space-y-1">
              {restrictions.notSuitable.map((not, index) => (
                <li key={index} className="text-xs text-gray-700 flex items-start gap-2">
                  <span className="text-red-600">•</span>
                  <span>{not}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="pixel-card">
        <h3 className="pixel-font text-sm mb-3">ℹ️ Additional Information</h3>
        <div className="space-y-2 text-xs text-gray-600">
          <div className="flex justify-between">
            <span>Estimated Time:</span>
            <span className="pixel-font">4 hours</span>
          </div>
          <div className="flex justify-between">
            <span>Validation Method:</span>
            <span className="pixel-font">{task.validationType}</span>
          </div>
          <div className="flex justify-between">
            <span>Available Slots:</span>
            <span className="pixel-font">{task.slots - claimedCount} remaining</span>
          </div>
          <div className="flex justify-between">
            <span>Task ID:</span>
            <span className="pixel-font">#{task.id}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
