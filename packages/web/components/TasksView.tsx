"use client"

interface TasksViewProps {
  selectedCategory: string
  selectedFilter: string
  onCategoryChange: (category: string) => void
  onFilterChange: (filter: string) => void
}

export default function TasksView({
  selectedCategory,
  selectedFilter,
  onCategoryChange,
  onFilterChange,
}: TasksViewProps) {
  const stats = [
    { label: "TOTAL", value: "5", color: "bg-green-soft" },
    { label: "OPEN", value: "5", color: "bg-orange" },
    { label: "cUSD", value: "330", color: "bg-green-bright" },
  ]

  const categories = [
    { icon: "📚", count: "0", color: "bg-blue-200" },
    { icon: "🐕", count: "1", color: "bg-pink-soft" },
    { icon: "💻", count: "1", color: "bg-green-200" },
    { icon: "🔍", count: "2", color: "bg-yellow-200" },
    { icon: "✏️", count: "1", color: "bg-pink-200" },
  ]

  const filterButtons = ["ALL", "OPEN", "MINE"]
  const categoryIcons = ["📚", "🐕", "💻", "🔍", "✏️"]

  return (
    <div className="space-y-4 px-2">
      {/* Task Dashboard */}
      <div className="pixel-card">
        <h2 className="pixel-font text-sm mb-3">TASK DASHBOARD</h2>

        {/* Main Stats */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {stats.map((stat, index) => (
            <div key={index} className={`pixel-border ${stat.color} p-3 text-center`}>
              <div className="pixel-font text-xl mb-1">{stat.value}</div>
              <div className="pixel-font text-xs">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Category Stats */}
        <div className="grid grid-cols-5 gap-1">
          {categories.map((category, index) => (
            <div key={index} className={`pixel-border ${category.color} p-2 text-center`}>
              <div className="text-sm mb-1">{category.icon}</div>
              <div className="pixel-font text-sm">{category.count}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-1 overflow-x-auto pb-2">
        {filterButtons.map((filter) => (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`pixel-button flex-shrink-0 ${selectedFilter === filter ? "bg-pink-soft" : "bg-white"}`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Category Filters */}
      <div className="flex gap-1 overflow-x-auto pb-2">
        <button
          onClick={() => onCategoryChange("ALL")}
          className={`pixel-button flex-shrink-0 ${selectedCategory === "ALL" ? "bg-pink-soft" : "bg-white"}`}
        >
          ALL
        </button>
        {categoryIcons.map((icon, index) => (
          <button
            key={index}
            onClick={() => onCategoryChange(icon)}
            className={`pixel-button flex-shrink-0 ${selectedCategory === icon ? "bg-pink-soft" : "bg-white"}`}
          >
            {icon}
          </button>
        ))}
      </div>

      {/* Task Card */}
      <div className="pixel-card">
        <div className="mb-3">
          <div className="flex flex-wrap gap-1 mb-3">
            <span className="pixel-border bg-pink-soft px-2 py-1 pixel-font text-xs">🐕 MARKETING</span>
            <span className="pixel-border bg-orange px-2 py-1 pixel-font text-xs">MEDIUM</span>
            <span className="pixel-border bg-pink-soft px-2 py-1 pixel-font text-xs">PARTNER</span>
          </div>

          <div className="flex justify-between items-start gap-3">
            <div className="flex-1">
              <h3 className="text-lg font-bold mb-2 leading-tight">Create Social Media Content</h3>
              <p className="text-gray-600 mb-3 text-sm leading-relaxed">
                Design 3 Instagram posts about sustainable farming in Chapada region
              </p>
            </div>

            <div className="flex-shrink-0 text-right">
              <div className="pixel-border bg-green-soft px-3 py-2 mb-2">
                <span className="pixel-font text-sm">50 cUSD</span>
              </div>
              <button className="pixel-button bg-pink-soft w-full">CLAIM</button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-3">
          <span>⏰ 4 hours</span>
          <span>👥 0/2 claimed</span>
          <span>✅ manual</span>
        </div>

        <div className="pixel-border bg-blue-100 px-2 py-1 inline-block">
          <span className="pixel-font text-xs">🏢 Chapada Sustentável</span>
        </div>
      </div>
    </div>
  )
}
