"use client"

import { useApp } from "@/components/providers/app-provider"

interface BlogPageProps {
  onViewPost?: (postId: string) => void
}

export default function BlogPage({ onViewPost }: BlogPageProps) {
  const { blogPosts } = useApp()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  const getCategoryIcon = (tags: string[]) => {
    if (tags.includes("Learn2Earn")) return "🎓"
    if (tags.includes("Web3")) return "🔗"
    if (tags.includes("Celo")) return "💚"
    if (tags.includes("Community")) return "👥"
    if (tags.includes("Education")) return "📚"
    if (tags.includes("Sustainability")) return "🌱"
    return "📝"
  }

  return (
    <div className="space-y-6 mobile-container pb-6">
      {/* Blog Header */}
      <div className="pixel-card bg-gradient-to-r from-pink-soft to-yellow-soft">
        <div className="text-center py-6 md:py-8">
          <h1 className="pixel-font text-responsive-lg mb-2">📝 TheOffice Blog</h1>
          <p className="text-responsive-sm mb-4">Insights, tutorials, and stories from the Web3 Learn2Earn community</p>
          <div className="flex justify-center gap-2 flex-wrap">
            <span className="pixel-border bg-white px-3 py-1 text-responsive-xs pixel-font">Web3</span>
            <span className="pixel-border bg-white px-3 py-1 text-responsive-xs pixel-font">Education</span>
            <span className="pixel-border bg-white px-3 py-1 text-responsive-xs pixel-font">Community</span>
          </div>
        </div>
      </div>

      {/* Featured Post */}
      {blogPosts.length > 0 && (
        <section>
          <div className="pixel-card bg-navy-dark text-white">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">⭐</span>
              <h2 className="pixel-font text-responsive-base">Featured Post</h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{getCategoryIcon(blogPosts[0].tags)}</span>
                <h3 className="pixel-font text-responsive-lg font-bold">{blogPosts[0].title}</h3>
              </div>
              <p className="text-responsive-sm leading-relaxed">{blogPosts[0].excerpt}</p>
              <div className="flex items-center gap-4 text-responsive-xs text-gray-300 flex-wrap">
                <span>✍️ {blogPosts[0].author}</span>
                <span>📅 {formatDate(blogPosts[0].publishedAt)}</span>
                <span>⏱️ {blogPosts[0].readTime}</span>
              </div>
              <div className="flex flex-wrap gap-1 mb-3">
                {blogPosts[0].tags.map((tag, index) => (
                  <span key={index} className="bg-green-soft px-2 py-1 text-responsive-xs pixel-font rounded">
                    {tag}
                  </span>
                ))}
              </div>
              <button
                onClick={() => onViewPost?.(blogPosts[0].id)}
                className="pixel-button bg-yellow-soft text-black w-full md:w-auto"
              >
                📖 Read Full Post
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Categories */}
      <section>
        <h2 className="pixel-font text-responsive-lg mb-4">📂 Categories</h2>
        <div className="responsive-grid-2 md:grid-cols-3 gap-3">
          <div className="pixel-card text-center">
            <div className="text-3xl mb-2">🎓</div>
            <h3 className="pixel-font text-responsive-sm mb-1">Learn2Earn</h3>
            <p className="text-responsive-xs text-gray-600">Education meets earning</p>
          </div>
          <div className="pixel-card text-center">
            <div className="text-3xl mb-2">🔗</div>
            <h3 className="pixel-font text-responsive-sm mb-1">Web3 Tech</h3>
            <p className="text-responsive-xs text-gray-600">Blockchain insights</p>
          </div>
          <div className="pixel-card text-center">
            <div className="text-3xl mb-2">👥</div>
            <h3 className="pixel-font text-responsive-sm mb-1">Community</h3>
            <p className="text-responsive-xs text-gray-600">Stories & updates</p>
          </div>
          <div className="pixel-card text-center">
            <div className="text-3xl mb-2">🌱</div>
            <h3 className="pixel-font text-responsive-sm mb-1">Sustainability</h3>
            <p className="text-responsive-xs text-gray-600">Green initiatives</p>
          </div>
          <div className="pixel-card text-center">
            <div className="text-3xl mb-2">💚</div>
            <h3 className="pixel-font text-responsive-sm mb-1">Celo</h3>
            <p className="text-responsive-xs text-gray-600">Platform updates</p>
          </div>
          <div className="pixel-card text-center">
            <div className="text-3xl mb-2">📚</div>
            <h3 className="pixel-font text-responsive-sm mb-1">Tutorials</h3>
            <p className="text-responsive-xs text-gray-600">Step-by-step guides</p>
          </div>
        </div>
      </section>

      {/* All Posts */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="pixel-font text-responsive-lg">📰 All Posts</h2>
          <span className="pixel-border bg-pink-soft text-black px-3 py-1 text-responsive-xs pixel-font">
            {blogPosts.length} Posts
          </span>
        </div>

        <div className="space-y-4">
          {blogPosts.map((post) => (
            <div key={post.id} className="pixel-card hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{getCategoryIcon(post.tags)}</span>
                    <h3 className="pixel-font text-responsive-sm font-bold">{post.title}</h3>
                  </div>
                  <p className="text-responsive-xs text-gray-600 mb-3 leading-relaxed line-clamp-2 md:line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-responsive-xs text-gray-500 mb-2 flex-wrap">
                    <span>✍️ {post.author}</span>
                    <span>📅 {formatDate(post.publishedAt)}</span>
                    <span>⏱️ {post.readTime}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="bg-gray-100 px-2 py-1 text-responsive-xs pixel-font rounded">
                        {tag}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="bg-gray-100 px-2 py-1 text-responsive-xs pixel-font rounded">
                        +{post.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => onViewPost?.(post.id)}
                  className="pixel-button bg-green-soft text-white text-responsive-xs px-3 py-1 ml-2 md:ml-3"
                >
                  Read
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section>
        <div className="pixel-card bg-gradient-to-r from-green-soft to-navy-dark text-white">
          <div className="text-center py-6">
            <div className="text-4xl mb-3">📬</div>
            <h2 className="pixel-font text-responsive-lg mb-2">Stay Updated</h2>
            <p className="text-responsive-sm mb-4">Get the latest posts and Web3 insights delivered to your inbox</p>
            <div className="flex flex-col md:flex-row gap-2 max-w-md mx-auto">
              <input type="email" placeholder="Enter your email" className="pixel-input flex-1 text-black" />
              <button className="pixel-button bg-yellow-soft text-black">📧 Subscribe</button>
            </div>
            <p className="text-responsive-xs text-gray-300 mt-2">No spam, unsubscribe anytime</p>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section>
        <div className="pixel-card">
          <h3 className="pixel-font text-responsive-sm mb-3 text-center">📊 Blog Stats</h3>
          <div className="responsive-grid-3 text-center">
            <div>
              <div className="pixel-font text-responsive-lg mb-1">{blogPosts.length}</div>
              <div className="pixel-font text-responsive-xs">Posts</div>
            </div>
            <div>
              <div className="pixel-font text-responsive-lg mb-1">2.5K</div>
              <div className="pixel-font text-responsive-xs">Readers</div>
            </div>
            <div>
              <div className="pixel-font text-responsive-lg mb-1">156</div>
              <div className="pixel-font text-responsive-xs">Comments</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
