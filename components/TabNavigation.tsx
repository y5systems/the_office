"use client"

interface TabNavigationProps {
  activeTab: "tasks" | "progress"
  onTabChange: (tab: "tasks" | "progress") => void
}

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="flex mb-4 mx-2 border-l-2 border-r-2 border-black">
      <button
        onClick={() => onTabChange("tasks")}
        className={`pixel-tab flex-1 text-center ${activeTab === "tasks" ? "active" : "inactive"}`}
      >
        TASKS
      </button>
      <button
        onClick={() => onTabChange("progress")}
        className={`pixel-tab flex-1 text-center ${activeTab === "progress" ? "active" : "inactive"}`}
      >
        PROGRESS
      </button>
    </div>
  )
}
