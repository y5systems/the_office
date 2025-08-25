"use client"

interface AboutPageProps {
  onNavigateToFeatures?: () => void
}

export default function AboutPage({ onNavigateToFeatures }: AboutPageProps) {
  return (
    <div className="space-y-6 px-3 pb-6">
      {/* Hero Section */}
      <section className="pixel-card bg-gradient-to-r from-pink-soft to-yellow-soft">
        <div className="text-center py-6">
          <h1 className="pixel-font text-2xl mb-2">🏢 TheOffice</h1>
          <p className="pixel-font text-sm mb-4">Web3 Learn2Earn Platform</p>
          <p className="text-xs text-gray-700 leading-relaxed">
            Connecting learners with opportunities in the Web3 ecosystem through task-based learning and earning.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="pixel-card">
        <h2 className="pixel-font text-lg mb-3">🎯 Our Mission</h2>
        <p className="text-sm text-gray-700 leading-relaxed mb-4">
          TheOffice bridges the gap between Web3 education and real-world opportunities, creating a sustainable
          ecosystem where learning directly translates to earning.
        </p>
        <div className="grid grid-cols-2 gap-3">
          <div className="pixel-border bg-blue-100 p-3 text-center">
            <div className="text-2xl mb-1">🎓</div>
            <div className="pixel-font text-xs">Learn</div>
          </div>
          <div className="pixel-border bg-green-100 p-3 text-center">
            <div className="text-2xl mb-1">💰</div>
            <div className="pixel-font text-xs">Earn</div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="pixel-card">
        <h2 className="pixel-font text-lg mb-3">⚙️ How It Works</h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="pixel-border bg-pink-soft px-2 py-1 text-xs pixel-font">1</div>
            <div>
              <h3 className="pixel-font text-sm mb-1">Connect Your Wallet</h3>
              <p className="text-xs text-gray-600">Link your Valora, MiniPay, or MetaMask wallet to get started.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="pixel-border bg-pink-soft px-2 py-1 text-xs pixel-font">2</div>
            <div>
              <h3 className="pixel-font text-sm mb-1">Browse Tasks</h3>
              <p className="text-xs text-gray-600">Find educational tasks and opportunities that match your skills.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="pixel-border bg-pink-soft px-2 py-1 text-xs pixel-font">3</div>
            <div>
              <h3 className="pixel-font text-sm mb-1">Complete & Earn</h3>
              <p className="text-xs text-gray-600">Submit your work and earn cUSD tokens upon approval.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="pixel-card">
        <h2 className="pixel-font text-lg mb-3">✨ Features</h2>
        <div className="grid grid-cols-2 gap-2">
          <div className="pixel-border bg-yellow-100 p-2 text-center">
            <div className="text-lg mb-1">📱</div>
            <div className="pixel-font text-xs">Mobile First</div>
          </div>
          <div className="pixel-border bg-green-100 p-2 text-center">
            <div className="text-lg mb-1">🔗</div>
            <div className="pixel-font text-xs">Celo Blockchain</div>
          </div>
          <div className="pixel-border bg-blue-100 p-2 text-center">
            <div className="text-lg mb-1">💳</div>
            <div className="pixel-font text-xs">cUSD Payments</div>
          </div>
          <div className="pixel-border bg-purple-100 p-2 text-center">
            <div className="text-lg mb-1">🌍</div>
            <div className="pixel-font text-xs">Global Access</div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="pixel-card">
        <h2 className="pixel-font text-lg mb-3">👥 Team</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="text-2xl">👨‍💻</div>
            <div>
              <h3 className="pixel-font text-sm">Development Team</h3>
              <p className="text-xs text-gray-600">Building the future of Web3 education</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-2xl">🎨</div>
            <div>
              <h3 className="pixel-font text-sm">Design Team</h3>
              <p className="text-xs text-gray-600">Creating intuitive user experiences</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-2xl">🌱</div>
            <div>
              <h3 className="pixel-font text-sm">Community Team</h3>
              <p className="text-xs text-gray-600">Growing our global community</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="pixel-card">
        <h2 className="pixel-font text-lg mb-3">📞 Contact Us</h2>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span>📧</span>
            <span className="text-sm">hello@theoffice.app</span>
          </div>
          <div className="flex items-center gap-2">
            <span>🐦</span>
            <span className="text-sm">@TheOfficeApp</span>
          </div>
          <div className="flex items-center gap-2">
            <span>💬</span>
            <span className="text-sm">Discord Community</span>
          </div>
        </div>
      </section>

      {/* Features Link */}
      <section className="pixel-card text-center">
        <h3 className="pixel-font text-sm mb-3">🚀 Explore All Features</h3>
        <p className="text-xs text-gray-600 mb-4">
          Discover comprehensive features for users, organizations, data analysts, and AI-powered tools.
        </p>
        <div className="flex justify-center">
          <button onClick={onNavigateToFeatures} className="pixel-button bg-green-soft text-white px-6 py-3">
            📋 View Complete Feature List
          </button>
        </div>
      </section>
    </div>
  )
}
