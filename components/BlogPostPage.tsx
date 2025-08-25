"use client"

import { useApp } from "@/components/providers/app-provider"

interface BlogPostPageProps {
  postId: string
  onBack: () => void
}

export default function BlogPostPage({ postId, onBack }: BlogPostPageProps) {
  const { blogPosts } = useApp()

  const post = blogPosts.find((p) => p.id === postId)

  if (!post) {
    return (
      <div className="space-y-4 mobile-container pb-6">
        <div className="pixel-card text-center py-8">
          <h2 className="pixel-font text-responsive-lg mb-4">Post Not Found</h2>
          <button onClick={onBack} className="pixel-button bg-pink-soft text-black">
            ← Back to Blog
          </button>
        </div>
      </div>
    )
  }

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

  // Mock full content based on the post
  const getFullContent = (post: any) => {
    if (post.id === "1") {
      return `
The future of education is being revolutionized by blockchain technology, and Learn2Earn platforms are at the forefront of this transformation. As we move into a more decentralized world, the traditional barriers between learning and earning are dissolving.

## What is Learn2Earn?

Learn2Earn represents a paradigm shift where educational activities directly translate into economic rewards. Instead of spending years in traditional education systems without immediate financial returns, learners can now earn cryptocurrency tokens while acquiring new skills and knowledge.

### Key Benefits:

• **Immediate Rewards**: Get paid for learning new skills
• **Global Access**: Anyone with internet can participate
• **Skill-Based Economy**: Focus on practical, applicable knowledge
• **Community Driven**: Learn from peers and experts worldwide

## The Role of Blockchain

Blockchain technology enables transparent, trustless systems where learning achievements can be verified and rewarded automatically. Smart contracts ensure that learners receive their rewards fairly and promptly.

### Web3 Integration:

The integration with Web3 technologies allows for:
- Decentralized credential verification
- Peer-to-peer knowledge sharing
- Community governance of educational content
- Cross-platform skill recognition

## Real-World Applications

We're already seeing Learn2Earn platforms making real impact:

**Rural Communities**: Providing economic opportunities in underserved areas
**Professional Development**: Helping workers adapt to changing job markets
**Student Support**: Offering financial assistance through learning activities

## The Future Outlook

As blockchain adoption grows, we expect to see:
- More sophisticated learning verification systems
- Integration with traditional educational institutions
- Expansion into specialized professional training
- Greater emphasis on practical, applicable skills

The Learn2Earn model isn't just about earning money while learning—it's about creating a more equitable, accessible, and practical educational ecosystem for everyone.

## Getting Started

Ready to join the Learn2Earn revolution? Start by:
1. Exploring available tasks and opportunities
2. Building your skills through practical projects
3. Connecting with the community
4. Contributing your own knowledge and expertise

The future of education is here, and it's more rewarding than ever.
      `
    } else {
      return `
TheOffice is pioneering the use of Celo's mobile-first blockchain infrastructure to create economic opportunities in underserved regions, particularly focusing on rural communities in Brazil's Chapada region.

## Why Celo?

Celo's mobile-first approach makes it the perfect blockchain for our mission. With features like:

• **Mobile Accessibility**: Works on basic smartphones
• **Stable Currencies**: cUSD provides price stability
• **Low Transaction Fees**: Affordable for small payments
• **Environmental Sustainability**: Carbon-negative blockchain

## Building Sustainable Communities

Our approach focuses on three key pillars:

### 1. Education First
We believe that sustainable economic development starts with education. Our platform provides:
- Practical skills training
- Web3 literacy programs
- Local language support
- Community-driven content

### 2. Economic Empowerment
Through task-based earning opportunities, community members can:
- Generate income while learning
- Build professional networks
- Develop marketable skills
- Access global opportunities

### 3. Environmental Responsibility
All our initiatives consider environmental impact:
- Promoting sustainable farming practices
- Supporting renewable energy projects
- Encouraging eco-friendly business models
- Measuring and reducing carbon footprint

## Community Impact

Since launching in the Chapada region, we've seen:

**156 Active Users**: Community members actively participating
**2,450 cUSD Distributed**: Direct economic impact
**25 Partner Organizations**: Local and international collaborations
**18 Completed Projects**: Successful community initiatives

## Technology for Good

Our platform demonstrates how blockchain technology can be used for social good:

### Smart Contracts for Trust
Automated systems ensure fair distribution of rewards and transparent governance.

### Decentralized Governance
Community members have a voice in platform development and resource allocation.

### Cross-Border Collaboration
Global partners can easily contribute to local initiatives through blockchain infrastructure.

## Challenges and Solutions

Building in rural areas presents unique challenges:

**Limited Internet**: We optimize for low-bandwidth connections
**Device Constraints**: Mobile-first design for basic smartphones
**Digital Literacy**: Comprehensive onboarding and support
**Language Barriers**: Multi-language support and local partnerships

## Future Plans

Our roadmap includes:
- Expansion to other rural regions
- Integration with traditional financial systems
- Development of offline-capable features
- Partnership with educational institutions

## Join the Movement

Whether you're a:
- **Community Member**: Ready to learn and earn
- **Partner Organization**: Looking to make impact
- **Developer**: Wanting to build for good
- **Investor**: Seeking sustainable returns

There's a place for you in our growing ecosystem.

Together, we're proving that blockchain technology can be a force for positive change, creating sustainable economic opportunities while preserving and celebrating local communities.
      `
    }
  }

  const fullContent = getFullContent(post)

  return (
    <div className="space-y-6 mobile-container pb-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <button onClick={onBack} className="pixel-button bg-gray-200 px-3 py-2">
          ← Back
        </button>
        <span className="pixel-font text-responsive-sm">Blog Post</span>
      </div>

      {/* Post Header */}
      <div className="pixel-card">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">{getCategoryIcon(post.tags)}</span>
          <div className="flex-1">
            <h1 className="pixel-font text-responsive-lg font-bold mb-2">{post.title}</h1>
            <div className="flex items-center gap-4 text-responsive-xs text-gray-500 flex-wrap">
              <span>✍️ {post.author}</span>
              <span>📅 {formatDate(post.publishedAt)}</span>
              <span>⏱️ {post.readTime}</span>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {post.tags.map((tag, index) => (
            <span key={index} className="bg-gray-100 px-3 py-1 text-responsive-xs pixel-font rounded">
              {tag}
            </span>
          ))}
        </div>

        {/* Excerpt */}
        <div className="pixel-border bg-yellow-soft p-4 mb-4">
          <p className="text-responsive-sm leading-relaxed font-medium">{post.excerpt}</p>
        </div>
      </div>

      {/* Post Content */}
      <div className="pixel-card">
        <div className="prose prose-sm md:prose-base max-w-none">
          <div className="text-responsive-sm leading-relaxed space-y-4">
            {fullContent.split("\n\n").map((paragraph, index) => {
              if (paragraph.startsWith("## ")) {
                return (
                  <h2 key={index} className="pixel-font text-responsive-base font-bold mt-6 mb-3 text-navy-dark">
                    {paragraph.replace("## ", "")}
                  </h2>
                )
              } else if (paragraph.startsWith("### ")) {
                return (
                  <h3 key={index} className="pixel-font text-responsive-sm font-bold mt-4 mb-2 text-green-soft">
                    {paragraph.replace("### ", "")}
                  </h3>
                )
              } else if (paragraph.startsWith("• ")) {
                const items = paragraph.split("\n").filter((line) => line.startsWith("• "))
                return (
                  <ul key={index} className="space-y-1 ml-4">
                    {items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2">
                        <span className="text-pink-soft">•</span>
                        <span>{item.replace("• ", "")}</span>
                      </li>
                    ))}
                  </ul>
                )
              } else if (paragraph.includes("**") && paragraph.includes("**:")) {
                const parts = paragraph.split("\n").filter((line) => line.includes("**"))
                return (
                  <div key={index} className="space-y-2">
                    {parts.map((part, partIndex) => {
                      const [title, description] = part.split("**: ")
                      return (
                        <div key={partIndex} className="pixel-border bg-gray-50 p-3">
                          <h4 className="pixel-font text-responsive-xs font-bold mb-1">{title.replace("**", "")}</h4>
                          <p className="text-responsive-xs text-gray-600">{description}</p>
                        </div>
                      )
                    })}
                  </div>
                )
              } else if (paragraph.trim()) {
                return (
                  <p key={index} className="leading-relaxed">
                    {paragraph.trim()}
                  </p>
                )
              }
              return null
            })}
          </div>
        </div>
      </div>

      {/* Post Actions */}
      <div className="pixel-card">
        <div className="flex justify-between items-center flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <button className="pixel-button bg-pink-soft text-black text-responsive-xs">👍 Like (42)</button>
            <button className="pixel-button bg-navy-dark text-white text-responsive-xs">💬 Comment (8)</button>
          </div>
          <button className="pixel-button bg-green-soft text-white text-responsive-xs">📤 Share</button>
        </div>
      </div>

      {/* Related Posts */}
      <div className="pixel-card">
        <h3 className="pixel-font text-responsive-sm mb-3">📚 Related Posts</h3>
        <div className="space-y-2">
          {blogPosts
            .filter((p) => p.id !== post.id)
            .slice(0, 2)
            .map((relatedPost) => (
              <div key={relatedPost.id} className="pixel-border bg-gray-50 p-3 hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-2 mb-1">
                  <span>{getCategoryIcon(relatedPost.tags)}</span>
                  <h4 className="pixel-font text-responsive-xs font-bold">{relatedPost.title}</h4>
                </div>
                <p className="text-responsive-xs text-gray-600 line-clamp-2">{relatedPost.excerpt}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
