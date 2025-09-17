"use client"

interface BottomNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export default function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const tabs = [
    { id: "home", label: "HOME", icon: "🏠" },
    { id: "tasks", label: "TASKS", icon: "📋" },
    { id: "profile", label: "PROFILE", icon: "👤" },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-navy-dark text-white z-30 border-t-4 border-black">
      <div className="grid grid-cols-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`p-2 md:p-3 text-center pixel-font text-responsive-xs transition-colors min-h-[60px] md:min-h-[70px] lg:min-h-[80px] flex flex-col items-center justify-center ${
              activeTab === tab.id ? "bg-pink-soft text-black border-2 border-yellow-soft" : "hover:bg-green-soft"
            }`}
          >
            <div className="text-sm md:text-base lg:text-lg mb-1">{tab.icon}</div>
            <div className="text-responsive-xs hidden sm:block">{tab.label}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
