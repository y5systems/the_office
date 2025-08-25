"use client"

interface OrganizationProfilePageProps {
  organizationId: string
  onBack: () => void
}

export default function OrganizationProfilePage({ organizationId, onBack }: OrganizationProfilePageProps) {
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
    totalRewardsDistributed: 1250,
    activeProjects: 5,
    team: [
      {
        name: "Maria Santos",
        role: "Project Manager",
        avatar: "👩‍💼",
        bio: "Leading sustainable agriculture initiatives for 8+ years",
      },
      { name: "João Silva", role: "Community Lead", avatar: "👨‍🌾", bio: "Local farmer and community organizer" },
      { name: "Ana Costa", role: "Tech Coordinator", avatar: "👩‍💻", bio: "Bridging technology and agriculture" },
      {
        name: "Carlos Mendes",
        role: "Education Director",
        avatar: "👨‍🏫",
        bio: "Developing educational programs for rural communities",
      },
    ],
    recentTasks: [
      { title: "Create Social Media Content", reward: 50, status: "Active" },
      { title: "Document Farming Techniques", reward: 75, status: "Completed" },
      { title: "Community Workshop Planning", reward: 100, status: "Active" },
    ],
  }

  return (
    <div className="space-y-4 px-3 pb-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <button onClick={onBack} className="pixel-button bg-gray-200 px-3 py-2">
          ← Back
        </button>
        <h1 className="pixel-font text-lg">Organization Profile</h1>
      </div>

      {/* Organization Header */}
      <div className="pixel-card">
        <div className="flex items-center gap-4 mb-4">
          <div className="text-4xl">{organization.avatar}</div>
          <div className="flex-1">
            <h2 className="pixel-font text-lg font-bold">{organization.name}</h2>
            <p className="text-sm text-gray-600 mb-2">{organization.description}</p>
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span>📍 {organization.location}</span>
              <span>📅 Founded {organization.founded}</span>
              <span>
                🌐{" "}
                <a href={organization.website} className="text-blue-600">
                  Website
                </a>
              </span>
            </div>
          </div>
        </div>

        {/* Organization Stats */}
        <div className="grid grid-cols-2 gap-2">
          <div className="text-center pixel-border bg-green-100 p-2">
            <div className="pixel-font text-lg">{organization.completedTasks}</div>
            <div className="pixel-font text-xs">Tasks Completed</div>
          </div>
          <div className="text-center pixel-border bg-yellow-100 p-2">
            <div className="pixel-font text-lg">{organization.totalRewardsDistributed}</div>
            <div className="pixel-font text-xs">cUSD Distributed</div>
          </div>
          <div className="text-center pixel-border bg-blue-100 p-2">
            <div className="pixel-font text-lg">{organization.teamSize}</div>
            <div className="pixel-font text-xs">Team Members</div>
          </div>
          <div className="text-center pixel-border bg-purple-100 p-2">
            <div className="pixel-font text-lg">{organization.activeProjects}</div>
            <div className="pixel-font text-xs">Active Projects</div>
          </div>
        </div>
      </div>

      {/* Team Members */}
      <div className="pixel-card">
        <h3 className="pixel-font text-sm mb-3">👥 Team Members</h3>
        <div className="space-y-3">
          {organization.team.map((member, index) => (
            <div key={index} className="flex items-start gap-3 p-2 bg-gray-50 pixel-border">
              <div className="text-2xl">{member.avatar}</div>
              <div className="flex-1">
                <h4 className="pixel-font text-sm font-bold">{member.name}</h4>
                <p className="pixel-font text-xs text-blue-600 mb-1">{member.role}</p>
                <p className="text-xs text-gray-600">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Tasks */}
      <div className="pixel-card">
        <h3 className="pixel-font text-sm mb-3">📋 Recent Tasks</h3>
        <div className="space-y-2">
          {organization.recentTasks.map((task, index) => (
            <div key={index} className="flex justify-between items-center p-2 bg-gray-50 pixel-border">
              <div>
                <h4 className="pixel-font text-xs font-bold">{task.title}</h4>
                <p className="text-xs text-gray-600">{task.reward} cUSD</p>
              </div>
              <div className="text-xs">
                {task.status === "Active" && "🟢"}
                {task.status === "Completed" && "✅"}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className="pixel-card">
        <h3 className="pixel-font text-sm mb-3">📞 Contact Information</h3>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <span>🌐</span>
            <a href={organization.website} className="text-blue-600">
              {organization.website}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <span>📧</span>
            <span>contact@chapada-sustentavel.org</span>
          </div>
          <div className="flex items-center gap-2">
            <span>📱</span>
            <span>+55 (61) 9999-9999</span>
          </div>
        </div>
      </div>
    </div>
  )
}
