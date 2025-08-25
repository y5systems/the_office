"use client"

import { useState } from "react"
import { useApp } from "@/components/providers/app-provider"
import Header from "@/components/Header"
import HomePage from "@/components/HomePage"
import TasksPage from "@/components/TasksPage"
import TaskDetailPage from "@/components/TaskDetailPage"
import OrganizationProfilePage from "@/components/OrganizationProfilePage"
import AdminDashboard from "@/components/AdminDashboard"
import AboutPage from "@/components/AboutPage"
import ProfilePage from "@/components/ProfilePage"
import BlogPage from "@/components/BlogPage"
import BlogPostPage from "@/components/BlogPostPage"
import OpportunitiesPage from "@/components/OpportunitiesPage"
import ProfileModal from "@/components/ProfileModal"
import BottomNavigation from "@/components/BottomNavigation"
import FeaturesPage from "@/components/FeaturesPage"

export default function Home() {
  const { user } = useApp()
  const [activeTab, setActiveTab] = useState<string>("home")
  const [showProfile, setShowProfile] = useState(false)
  const [currentView, setCurrentView] = useState<{
    type:
      | "main"
      | "task-detail"
      | "organization-profile"
      | "blog-post"
      | "opportunities"
      | "blog"
      | "about"
      | "features"
    data?: any
  }>({ type: "main" })

  const handleViewTask = (taskId: string) => {
    setCurrentView({ type: "task-detail", data: { taskId } })
  }

  const handleViewOrganization = (orgId: string) => {
    setCurrentView({ type: "organization-profile", data: { orgId } })
  }

  const handleViewBlogPost = (postId: string) => {
    setCurrentView({ type: "blog-post", data: { postId } })
  }

  const handleViewOpportunities = () => {
    setCurrentView({ type: "opportunities" })
  }

  const handleNavigateToBlog = () => {
    setCurrentView({ type: "blog" })
  }

  const handleNavigateToFeatures = () => {
    setCurrentView({ type: "features" })
  }

  const handleNavigateToAbout = () => {
    setCurrentView({ type: "about" })
  }

  const handleBackToMain = () => {
    setCurrentView({ type: "main" })
  }

  const handleNavigateToTasks = () => {
    setActiveTab("tasks")
    setCurrentView({ type: "main" })
  }

  const renderContent = () => {
    // Handle special views first
    if (currentView.type === "task-detail") {
      return (
        <TaskDetailPage
          taskId={currentView.data.taskId}
          onBack={handleBackToMain}
          onViewOrganization={handleViewOrganization}
        />
      )
    }

    if (currentView.type === "organization-profile") {
      return <OrganizationProfilePage organizationId={currentView.data.orgId} onBack={handleBackToMain} />
    }

    if (currentView.type === "blog-post") {
      return <BlogPostPage postId={currentView.data.postId} onBack={handleBackToMain} />
    }

    if (currentView.type === "opportunities") {
      return <OpportunitiesPage onBack={handleBackToMain} onNavigateToBlog={handleNavigateToBlog} />
    }

    if (currentView.type === "blog") {
      return <BlogPage onViewPost={handleViewBlogPost} />
    }

    if (currentView.type === "about") {
      return <AboutPage onNavigateToFeatures={handleNavigateToFeatures} />
    }

    if (currentView.type === "features") {
      return <FeaturesPage onBack={handleBackToMain} />
    }

    // Handle main navigation
    switch (activeTab) {
      case "home":
        return (
          <HomePage
            onNavigateToTasks={handleNavigateToTasks}
            onNavigateToOpportunities={handleViewOpportunities}
            onViewTask={handleViewTask}
            onNavigateToFeatures={handleNavigateToFeatures}
          />
        )
      case "tasks":
        return <TasksPage onViewTask={handleViewTask} />
      case "profile":
        return (
          <ProfilePage
            onNavigateToBlog={handleNavigateToBlog}
            onNavigateToAbout={handleNavigateToAbout}
            onNavigateToFeatures={handleNavigateToFeatures}
          />
        )
      default:
        if (user?.role === "admin" && activeTab === "admin") {
          return <AdminDashboard />
        }
        return (
          <HomePage
            onNavigateToTasks={handleNavigateToTasks}
            onNavigateToOpportunities={handleViewOpportunities}
            onViewTask={handleViewTask}
            onNavigateToFeatures={handleNavigateToFeatures}
          />
        )
    }
  }

  return (
    <div className="app-container">
      <div className="main-content">
        <Header onProfileClick={() => setShowProfile(true)} />

        {/* Scrollable content area with proper spacing for fixed header and footer */}
        <div className="pt-[80px] pb-[80px] md:pt-[90px] md:pb-[90px] lg:pt-[100px] lg:pb-[100px] overflow-y-auto">
          <div className="py-2 md:py-4">{renderContent()}</div>
        </div>

        <BottomNavigation
          activeTab={activeTab}
          onTabChange={(tab) => {
            if (tab === "profile") {
              setActiveTab("profile")
            } else {
              setActiveTab(tab)
              setCurrentView({ type: "main" })
            }
          }}
        />

        {showProfile && <ProfileModal onClose={() => setShowProfile(false)} />}
      </div>
    </div>
  )
}
