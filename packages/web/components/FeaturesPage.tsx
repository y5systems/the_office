"use client"

import { useState } from "react"

interface FeaturesPageProps {
  onBack?: () => void
}

export default function FeaturesPage({ onBack }: FeaturesPageProps) {
  const [activeTab, setActiveTab] = useState<"users" | "organizations" | "analysts" | "ai">("users")

  const userFeatures = [
    {
      category: "🎯 Task Management",
      features: [
        {
          name: "Smart Task Discovery",
          description: "AI-powered task recommendations based on your skills, interests, and earning goals",
          icon: "🔍",
          status: "live",
        },
        {
          name: "Multi-Type Submissions",
          description: "Submit work via URL, file upload, manual review, or auto-verification",
          icon: "📤",
          status: "live",
        },
        {
          name: "Late Task Alerts",
          description: "Visual indicators and notifications for overdue tasks with deadline tracking",
          icon: "⚠️",
          status: "live",
        },
        {
          name: "Task Collections",
          description: "Complete multi-step learning paths with progressive difficulty",
          icon: "📚",
          status: "coming-soon",
        },
      ],
    },
    {
      category: "💰 Earning & Rewards",
      features: [
        {
          name: "cUSD Payments",
          description: "Instant payments in Celo's stable currency upon task completion",
          icon: "💚",
          status: "live",
        },
        {
          name: "Skill-Based Pricing",
          description: "Higher rewards for specialized skills and complex tasks",
          icon: "📈",
          status: "live",
        },
        {
          name: "Bonus Multipliers",
          description: "Earn extra rewards for consistent performance and quality work",
          icon: "⭐",
          status: "coming-soon",
        },
        {
          name: "Referral Program",
          description: "Earn commissions by bringing new users to the platform",
          icon: "🤝",
          status: "coming-soon",
        },
      ],
    },
    {
      category: "🏆 Gamification & Social",
      features: [
        {
          name: "Celo Star Rankings",
          description: "Orkut-style community ratings across 6 categories (AFK, Shipper, Trust, etc.)",
          icon: "💚",
          status: "live",
        },
        {
          name: "Achievement Badges",
          description: "Unlock badges for milestones like 'Task Master', 'High Earner', 'Consistent'",
          icon: "🏅",
          status: "live",
        },
        {
          name: "Leaderboards",
          description: "Compete with peers in weekly/monthly earning and completion challenges",
          icon: "🏆",
          status: "coming-soon",
        },
        {
          name: "Social Profiles",
          description: "Showcase your skills, achievements, and work portfolio",
          icon: "👤",
          status: "live",
        },
      ],
    },
    {
      category: "📱 Mobile Experience",
      features: [
        {
          name: "Mobile-First Design",
          description: "Optimized for smartphones with pixel art aesthetic and touch-friendly interface",
          icon: "📱",
          status: "live",
        },
        {
          name: "Offline Mode",
          description: "Work on tasks and sync when connection is restored",
          icon: "📶",
          status: "coming-soon",
        },
        {
          name: "Push Notifications",
          description: "Get notified about new tasks, deadlines, and payments",
          icon: "🔔",
          status: "coming-soon",
        },
        {
          name: "Voice Commands",
          description: "Navigate and interact with the app using voice commands",
          icon: "🎤",
          status: "coming-soon",
        },
      ],
    },
    {
      category: "🎓 Learning & Development",
      features: [
        {
          name: "Skill Assessment",
          description: "AI-powered evaluation of your abilities to match you with appropriate tasks",
          icon: "📊",
          status: "coming-soon",
        },
        {
          name: "Learning Paths",
          description: "Structured courses that combine education with earning opportunities",
          icon: "🛤️",
          status: "coming-soon",
        },
        {
          name: "Mentorship Program",
          description: "Connect with experienced users for guidance and career development",
          icon: "👨‍🏫",
          status: "coming-soon",
        },
        {
          name: "Certification System",
          description: "Earn verifiable credentials for completed learning modules",
          icon: "🎓",
          status: "coming-soon",
        },
      ],
    },
  ]

  const organizationFeatures = [
    {
      category: "📋 Task Creation & Management",
      features: [
        {
          name: "AI Task Generator",
          description: "Create tasks automatically based on your goals, budget, and requirements",
          icon: "🤖",
          status: "coming-soon",
        },
        {
          name: "Bulk Task Creation",
          description: "Upload CSV files or use templates to create multiple tasks at once",
          icon: "📊",
          status: "coming-soon",
        },
        {
          name: "Smart Pricing",
          description: "AI-suggested pricing based on task complexity, market rates, and urgency",
          icon: "💡",
          status: "coming-soon",
        },
        {
          name: "Task Templates",
          description: "Pre-built templates for common task types with customizable parameters",
          icon: "📝",
          status: "live",
        },
      ],
    },
    {
      category: "👥 Talent Management",
      features: [
        {
          name: "Contributor Matching",
          description: "AI-powered matching of tasks to the most suitable contributors",
          icon: "🎯",
          status: "coming-soon",
        },
        {
          name: "Performance Analytics",
          description: "Track contributor performance, quality scores, and completion rates",
          icon: "📈",
          status: "live",
        },
        {
          name: "Talent Pool",
          description: "Build and manage your preferred network of trusted contributors",
          icon: "👥",
          status: "coming-soon",
        },
        {
          name: "Quality Assurance",
          description: "Multi-stage review process with automated quality checks",
          icon: "✅",
          status: "live",
        },
      ],
    },
    {
      category: "💼 Business Intelligence",
      features: [
        {
          name: "ROI Dashboard",
          description: "Track return on investment for tasks and campaigns",
          icon: "💹",
          status: "coming-soon",
        },
        {
          name: "Impact Measurement",
          description: "Measure social and environmental impact of your initiatives",
          icon: "🌍",
          status: "coming-soon",
        },
        {
          name: "Budget Management",
          description: "Set budgets, track spending, and get alerts for cost overruns",
          icon: "💰",
          status: "live",
        },
        {
          name: "Custom Reports",
          description: "Generate detailed reports for stakeholders and compliance",
          icon: "📊",
          status: "coming-soon",
        },
      ],
    },
    {
      category: "🔗 Integration & Automation",
      features: [
        {
          name: "API Access",
          description: "Full REST API for integrating with your existing systems",
          icon: "🔌",
          status: "coming-soon",
        },
        {
          name: "Webhook Support",
          description: "Real-time notifications for task updates and completions",
          icon: "⚡",
          status: "coming-soon",
        },
        {
          name: "Smart Contracts",
          description: "Automated payments and escrow through blockchain smart contracts",
          icon: "📜",
          status: "coming-soon",
        },
        {
          name: "Third-Party Tools",
          description: "Integrate with Slack, Discord, Google Workspace, and more",
          icon: "🔧",
          status: "coming-soon",
        },
      ],
    },
  ]

  const analystFeatures = [
    {
      category: "📊 Data Analytics",
      features: [
        {
          name: "Real-Time Dashboards",
          description: "Live data visualization with customizable charts and metrics",
          icon: "📈",
          status: "coming-soon",
        },
        {
          name: "Predictive Analytics",
          description: "AI-powered forecasting for task completion rates and market trends",
          icon: "🔮",
          status: "coming-soon",
        },
        {
          name: "Cohort Analysis",
          description: "Track user behavior and retention patterns over time",
          icon: "👥",
          status: "coming-soon",
        },
        {
          name: "A/B Testing Framework",
          description: "Run experiments to optimize task design and user experience",
          icon: "🧪",
          status: "coming-soon",
        },
      ],
    },
    {
      category: "🌍 Market Intelligence",
      features: [
        {
          name: "Global Trends Analysis",
          description: "Identify emerging skills, market demands, and geographic patterns",
          icon: "🌐",
          status: "coming-soon",
        },
        {
          name: "Competitive Benchmarking",
          description: "Compare platform performance against industry standards",
          icon: "⚖️",
          status: "coming-soon",
        },
        {
          name: "Economic Impact Studies",
          description: "Measure platform's contribution to local and global economies",
          icon: "💼",
          status: "coming-soon",
        },
        {
          name: "Skills Gap Analysis",
          description: "Identify training needs and market opportunities",
          icon: "🎯",
          status: "coming-soon",
        },
      ],
    },
    {
      category: "🔍 Research Tools",
      features: [
        {
          name: "Data Export Suite",
          description: "Export data in multiple formats (CSV, JSON, API) for external analysis",
          icon: "📤",
          status: "coming-soon",
        },
        {
          name: "Statistical Modeling",
          description: "Built-in tools for regression analysis, clustering, and machine learning",
          icon: "🧮",
          status: "coming-soon",
        },
        {
          name: "Survey Integration",
          description: "Create and distribute surveys to gather additional insights",
          icon: "📋",
          status: "coming-soon",
        },
        {
          name: "Academic Collaboration",
          description: "Tools for researchers to collaborate and publish findings",
          icon: "🎓",
          status: "coming-soon",
        },
      ],
    },
  ]

  const aiFeatures = [
    {
      category: "🤖 AI Task Creation",
      features: [
        {
          name: "Profile-Based Generation",
          description: "Analyze user profiles to create personalized tasks that match skills and interests",
          icon: "👤",
          status: "coming-soon",
        },
        {
          name: "Skill Gap Detection",
          description: "Identify missing skills in user profiles and generate learning tasks",
          icon: "🎯",
          status: "coming-soon",
        },
        {
          name: "Market Demand Analysis",
          description: "Create tasks based on current market needs and trending skills",
          icon: "📈",
          status: "coming-soon",
        },
        {
          name: "Difficulty Progression",
          description: "Generate task sequences that gradually increase in complexity",
          icon: "📊",
          status: "coming-soon",
        },
      ],
    },
    {
      category: "🧠 Intelligent Matching",
      features: [
        {
          name: "Smart Recommendations",
          description: "ML algorithms that learn from user behavior to improve task suggestions",
          icon: "💡",
          status: "coming-soon",
        },
        {
          name: "Optimal Pricing",
          description: "AI-driven pricing optimization based on complexity, urgency, and market rates",
          icon: "💰",
          status: "coming-soon",
        },
        {
          name: "Quality Prediction",
          description: "Predict task completion quality based on contributor history",
          icon: "⭐",
          status: "coming-soon",
        },
        {
          name: "Time Estimation",
          description: "Accurate completion time predictions using historical data",
          icon: "⏱️",
          status: "coming-soon",
        },
      ],
    },
    {
      category: "🎓 Adaptive Learning",
      features: [
        {
          name: "Personalized Curricula",
          description: "Create custom learning paths based on individual goals and progress",
          icon: "📚",
          status: "coming-soon",
        },
        {
          name: "Knowledge Assessment",
          description: "Continuous evaluation of user knowledge and skill development",
          icon: "📝",
          status: "coming-soon",
        },
        {
          name: "Learning Style Adaptation",
          description: "Adjust task presentation based on individual learning preferences",
          icon: "🎨",
          status: "coming-soon",
        },
        {
          name: "Progress Optimization",
          description: "AI coaching to help users maximize their learning and earning potential",
          icon: "🚀",
          status: "coming-soon",
        },
      ],
    },
    {
      category: "🔮 Predictive Intelligence",
      features: [
        {
          name: "Career Path Prediction",
          description: "Forecast optimal career trajectories based on current skills and market trends",
          icon: "🛤️",
          status: "coming-soon",
        },
        {
          name: "Earning Potential Analysis",
          description: "Predict future earning capacity based on skill development choices",
          icon: "💎",
          status: "coming-soon",
        },
        {
          name: "Market Trend Forecasting",
          description: "Anticipate future skill demands and prepare users accordingly",
          icon: "🔍",
          status: "coming-soon",
        },
        {
          name: "Risk Assessment",
          description: "Identify potential challenges and suggest mitigation strategies",
          icon: "⚠️",
          status: "coming-soon",
        },
      ],
    },
  ]

  const getFeaturesByTab = () => {
    switch (activeTab) {
      case "users":
        return userFeatures
      case "organizations":
        return organizationFeatures
      case "analysts":
        return analystFeatures
      case "ai":
        return aiFeatures
      default:
        return userFeatures
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "live":
        return <span className="pixel-border bg-green-soft text-white px-2 py-1 text-xs pixel-font">✅ LIVE</span>
      case "coming-soon":
        return <span className="pixel-border bg-yellow-soft text-black px-2 py-1 text-xs pixel-font">🚧 SOON</span>
      case "beta":
        return <span className="pixel-border bg-blue-200 text-black px-2 py-1 text-xs pixel-font">🧪 BETA</span>
      default:
        return null
    }
  }

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case "users":
        return "👤"
      case "organizations":
        return "🏢"
      case "analysts":
        return "📊"
      case "ai":
        return "🤖"
      default:
        return "📋"
    }
  }

  const features = getFeaturesByTab()

  return (
    <div className="space-y-6 mobile-container pb-6">
      {/* Header */}
      {onBack && (
        <div className="flex items-center gap-3 mb-4">
          <button onClick={onBack} className="pixel-button bg-gray-200 px-3 py-2">
            ← Back
          </button>
          <h1 className="pixel-font text-responsive-lg">Features</h1>
        </div>
      )}

      {/* Page Header */}
      <div className="pixel-card bg-gradient-to-r from-green-soft to-navy-dark text-white">
        <div className="text-center py-6 md:py-8">
          <h2 className="pixel-font text-responsive-lg mb-2">🚀 TheOffice Features</h2>
          <p className="text-responsive-sm mb-4">
            Comprehensive Web3 Learn2Earn platform with AI-powered task creation and management
          </p>
          <div className="flex justify-center gap-2 flex-wrap">
            <span className="pixel-border bg-white text-black px-3 py-1 text-responsive-xs pixel-font">
              Mobile-First
            </span>
            <span className="pixel-border bg-yellow-soft text-black px-3 py-1 text-responsive-xs pixel-font">
              AI-Powered
            </span>
            <span className="pixel-border bg-green-soft text-white px-3 py-1 text-responsive-xs pixel-font">
              Celo Blockchain
            </span>
          </div>
        </div>
      </div>

      {/* Feature Tabs */}
      <div className="pixel-card">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {(["users", "organizations", "analysts", "ai"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pixel-button py-3 text-center ${activeTab === tab ? "bg-pink-soft text-black" : "bg-white"}`}
            >
              <div className="text-lg mb-1">{getTabIcon(tab)}</div>
              <div className="pixel-font text-responsive-xs">
                {tab === "users" ? "USERS" : tab === "organizations" ? "ORGS" : tab === "analysts" ? "DATA" : "AI"}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Feature Categories */}
      <div className="space-y-6">
        {features.map((category, categoryIndex) => (
          <div key={categoryIndex} className="pixel-card">
            <h3 className="pixel-font text-responsive-base font-bold mb-4">{category.category}</h3>
            <div className="space-y-4">
              {category.features.map((feature, featureIndex) => (
                <div key={featureIndex} className="pixel-border bg-gray-50 p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-3 flex-1">
                      <span className="text-2xl">{feature.icon}</span>
                      <div className="flex-1">
                        <h4 className="pixel-font text-responsive-sm font-bold mb-1">{feature.name}</h4>
                        <p className="text-responsive-xs text-gray-600 leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                    <div className="ml-3">{getStatusBadge(feature.status)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Feature Summary */}
      <div className="pixel-card">
        <h3 className="pixel-font text-responsive-sm mb-3 text-center">📊 Feature Summary</h3>
        <div className="responsive-grid-3 text-center">
          <div>
            <div className="pixel-font text-responsive-lg mb-1">
              {features.reduce((acc, cat) => acc + cat.features.filter((f) => f.status === "live").length, 0)}
            </div>
            <div className="pixel-font text-responsive-xs">Live Features</div>
          </div>
          <div>
            <div className="pixel-font text-responsive-lg mb-1">
              {features.reduce((acc, cat) => acc + cat.features.filter((f) => f.status === "coming-soon").length, 0)}
            </div>
            <div className="pixel-font text-responsive-xs">Coming Soon</div>
          </div>
          <div>
            <div className="pixel-font text-responsive-lg mb-1">
              {features.reduce((acc, cat) => acc + cat.features.length, 0)}
            </div>
            <div className="pixel-font text-responsive-xs">Total Features</div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="pixel-card bg-gradient-to-r from-pink-soft to-yellow-soft">
        <div className="text-center py-6">
          <div className="text-4xl mb-3">🚀</div>
          <h2 className="pixel-font text-responsive-lg mb-2">Ready to Get Started?</h2>
          <p className="text-responsive-sm mb-4">Join thousands of users already earning and learning on TheOffice</p>
          <div className="flex flex-col md:flex-row gap-2 max-w-md mx-auto">
            <button className="pixel-button bg-navy-dark text-white flex-1">👤 Join as User</button>
            <button className="pixel-button bg-green-soft text-white flex-1">🏢 Partner with Us</button>
          </div>
        </div>
      </div>
    </div>
  )
}
