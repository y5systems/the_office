"use client"

import { useApp } from "@/components/providers/app-provider"

interface OpportunitiesPageProps {
  onBack: () => void
  onNavigateToBlog: () => void
}

export default function OpportunitiesPage({ onBack, onNavigateToBlog }: OpportunitiesPageProps) {
  const { opportunities } = useApp()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const getOpportunityIcon = (type: string) => {
    switch (type) {
      case "Grant":
        return "💰"
      case "Hackathon":
        return "🏆"
      case "Job":
        return "💼"
      case "Internship":
        return "🎓"
      case "Partnership":
        return "🤝"
      default:
        return "🚀"
    }
  }

  // Mock upcoming opportunities
  const upcomingOpportunities = [
    {
      id: "upcoming_1",
      title: "Web3 Education Grant Program",
      description: "Funding for educational initiatives in blockchain and cryptocurrency",
      type: "Grant",
      reward: "Up to $100,000",
      deadline: "2024-05-15",
      organization: "Ethereum Foundation",
      status: "Coming Soon",
      announcementDate: "2024-02-15",
      tags: ["Education", "Grant", "Ethereum"],
    },
    {
      id: "upcoming_2",
      title: "Global DeFi Summit 2024",
      description: "Annual conference bringing together DeFi innovators and builders",
      type: "Event",
      organization: "DeFi Alliance",
      status: "Coming Soon",
      announcementDate: "2024-03-01",
      tags: ["Conference", "DeFi", "Networking"],
    },
  ]

  const availableOpportunities = opportunities.slice(0, 3)

  return (
    <div className="space-y-6 mobile-container pb-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <button onClick={onBack} className="pixel-button bg-gray-200 px-3 py-2">
          ← Back
        </button>
        <h1 className="pixel-font text-responsive-lg">🚀 Opportunities</h1>
      </div>

      {/* Page Header */}
      <div className="pixel-card bg-gradient-to-r from-green-soft to-navy-dark text-white">
        <div className="text-center py-6 md:py-8">
          <h2 className="pixel-font text-responsive-lg mb-2">🌟 Web3 Opportunities</h2>
          <p className="text-responsive-sm mb-4">
            Discover grants, hackathons, jobs, and partnerships in the Web3 space
          </p>
          <div className="flex justify-center gap-2 flex-wrap">
            <span className="pixel-border bg-white text-black px-3 py-1 text-responsive-xs pixel-font">
              {availableOpportunities.length} Available
            </span>
            <span className="pixel-border bg-yellow-soft text-black px-3 py-1 text-responsive-xs pixel-font">
              {upcomingOpportunities.length} Coming Soon
            </span>
          </div>
        </div>
      </div>

      {/* Available Opportunities */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="pixel-font text-responsive-lg">✅ Available Now ({availableOpportunities.length})</h2>
          <span className="pixel-border bg-green-soft text-white px-3 py-1 text-responsive-xs pixel-font">OPEN</span>
        </div>

        <div className="space-y-4">
          {availableOpportunities.map((opportunity) => (
            <div key={opportunity.id} className="pixel-card hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-2xl">{getOpportunityIcon(opportunity.type)}</span>
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
                  <p className="text-responsive-sm text-gray-600 mb-3 leading-relaxed">{opportunity.description}</p>
                  <div className="flex items-center gap-4 text-responsive-xs text-gray-500 mb-3 flex-wrap">
                    <span>🏢 {opportunity.organization}</span>
                    {opportunity.reward && <span>💰 {opportunity.reward}</span>}
                    {opportunity.deadline && <span>📅 Deadline: {formatDate(opportunity.deadline)}</span>}
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {opportunity.tags.map((tag, index) => (
                      <span key={index} className="bg-gray-100 px-2 py-1 text-responsive-xs pixel-font rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2 ml-3">
                  <a href={opportunity.link} target="_blank" rel="noopener noreferrer">
                    <button className="pixel-button bg-orange text-white text-responsive-xs px-4 py-2">
                      🚀 Apply Now
                    </button>
                  </a>
                  <button className="pixel-button bg-gray-200 text-responsive-xs px-4 py-1">📋 Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Coming Soon */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="pixel-font text-responsive-lg">⏳ Coming Soon ({upcomingOpportunities.length})</h2>
          <span className="pixel-border bg-yellow-soft text-black px-3 py-1 text-responsive-xs pixel-font">
            UPCOMING
          </span>
        </div>

        <div className="space-y-4">
          {upcomingOpportunities.map((opportunity) => (
            <div key={opportunity.id} className="pixel-card bg-gray-50 border-dashed">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-2xl opacity-60">{getOpportunityIcon(opportunity.type)}</span>
                    <h3 className="pixel-font text-responsive-sm font-bold text-gray-700">{opportunity.title}</h3>
                    <span className="pixel-border bg-yellow-soft text-black px-2 py-1 text-responsive-xs pixel-font">
                      {opportunity.type}
                    </span>
                  </div>
                  <p className="text-responsive-sm text-gray-600 mb-3 leading-relaxed">{opportunity.description}</p>
                  <div className="flex items-center gap-4 text-responsive-xs text-gray-500 mb-3 flex-wrap">
                    <span>🏢 {opportunity.organization}</span>
                    {opportunity.reward && <span>💰 {opportunity.reward}</span>}
                    <span>📅 Announcement: {formatDate(opportunity.announcementDate)}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {opportunity.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-200 px-2 py-1 text-responsive-xs pixel-font rounded opacity-60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2 ml-3">
                  <button
                    onClick={onNavigateToBlog}
                    className="pixel-button bg-navy-dark text-white text-responsive-xs px-4 py-2"
                  >
                    📝 Read More
                  </button>
                  <button className="pixel-button bg-gray-300 text-responsive-xs px-4 py-1" disabled>
                    ⏳ Coming Soon
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section>
        <div className="pixel-card bg-gradient-to-r from-pink-soft to-yellow-soft">
          <div className="text-center py-6">
            <div className="text-4xl mb-3">🔔</div>
            <h2 className="pixel-font text-responsive-lg mb-2">Stay Updated</h2>
            <p className="text-responsive-sm mb-4">Get notified when new opportunities become available</p>
            <div className="flex flex-col md:flex-row gap-2 max-w-md mx-auto">
              <input type="email" placeholder="Enter your email" className="pixel-input flex-1" />
              <button className="pixel-button bg-navy-dark text-white">🚀 Notify Me</button>
            </div>
            <p className="text-responsive-xs text-gray-600 mt-2">We'll email you when new opportunities are posted</p>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section>
        <div className="pixel-card">
          <h3 className="pixel-font text-responsive-sm mb-3 text-center">📊 Opportunity Stats</h3>
          <div className="responsive-grid-3 text-center">
            <div>
              <div className="pixel-font text-responsive-lg mb-1">{availableOpportunities.length}</div>
              <div className="pixel-font text-responsive-xs">Available</div>
            </div>
            <div>
              <div className="pixel-font text-responsive-lg mb-1">{upcomingOpportunities.length}</div>
              <div className="pixel-font text-responsive-xs">Coming Soon</div>
            </div>
            <div>
              <div className="pixel-font text-responsive-lg mb-1">$275K</div>
              <div className="pixel-font text-responsive-xs">Total Value</div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Link */}
      <section>
        <div className="pixel-card text-center">
          <h3 className="pixel-font text-responsive-sm mb-3">📝 Want More Insights?</h3>
          <p className="text-responsive-xs text-gray-600 mb-4">
            Read our blog for detailed analysis of opportunities, application tips, and Web3 industry insights.
          </p>
          <button onClick={onNavigateToBlog} className="pixel-button bg-green-soft text-white">
            📚 Visit Our Blog
          </button>
        </div>
      </section>
    </div>
  )
}
