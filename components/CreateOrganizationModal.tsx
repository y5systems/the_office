"use client"

import type React from "react"

import { useState } from "react"
import { useApp } from "@/components/providers/app-provider"

interface CreateOrganizationModalProps {
  onClose: () => void
}

export default function CreateOrganizationModal({ onClose }: CreateOrganizationModalProps) {
  const { createOrganization, user } = useApp()
  const [orgData, setOrgData] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    avatar: "🏢",
    category: "Technology" as "Technology" | "Education" | "Sustainability" | "Healthcare" | "Finance" | "Other",
    teamSize: 1,
    founded: new Date().getFullYear().toString(),
    mission: "",
    tags: [] as string[],
    newTag: "",
    socialLinks: {
      twitter: "",
      discord: "",
      telegram: "",
      linkedin: "",
    },
    contactEmail: "",
    isPublic: true,
  })
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const avatarOptions = ["🏢", "🏛️", "🏭", "🏗️", "🌱", "💡", "🔬", "🎓", "💊", "🏦", "🎨", "🚀", "⚡", "🌍", "🔧"]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate creation delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    createOrganization({
      name: orgData.name,
      description: orgData.description,
      website: orgData.website,
      location: orgData.location,
      avatar: orgData.avatar,
      category: orgData.category,
      teamSize: orgData.teamSize,
      founded: orgData.founded,
      mission: orgData.mission,
      tags: orgData.tags,
      socialLinks: orgData.socialLinks,
      contactEmail: orgData.contactEmail,
      isPublic: orgData.isPublic,
    })

    setIsSubmitting(false)
    onClose()
  }

  const addTag = () => {
    if (orgData.newTag.trim() && !orgData.tags.includes(orgData.newTag.trim())) {
      setOrgData({
        ...orgData,
        tags: [...orgData.tags, orgData.newTag.trim()],
        newTag: "",
      })
    }
  }

  const removeTag = (tagToRemove: string) => {
    setOrgData({
      ...orgData,
      tags: orgData.tags.filter((tag) => tag !== tagToRemove),
    })
  }

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return orgData.name.trim() !== "" && orgData.description.trim() !== "" && orgData.location.trim() !== ""
      case 2:
        return orgData.mission.trim() !== "" && orgData.contactEmail.trim() !== ""
      case 3:
        return true // Optional step
      default:
        return false
    }
  }

  const nextStep = () => {
    if (currentStep < 3 && isStepValid(currentStep)) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStep1 = () => (
    <div className="space-y-4">
      <h3 className="pixel-font text-sm font-bold mb-3">📋 Basic Information</h3>

      {/* Organization Name */}
      <div>
        <label className="pixel-font text-sm mb-2 block">🏢 Organization Name *</label>
        <input
          type="text"
          value={orgData.name}
          onChange={(e) => setOrgData({ ...orgData, name: e.target.value })}
          placeholder="Enter your organization name"
          className="pixel-input w-full"
          required
        />
      </div>

      {/* Avatar Selection */}
      <div>
        <label className="pixel-font text-sm mb-2 block">🎨 Choose Avatar</label>
        <div className="grid grid-cols-5 gap-2">
          {avatarOptions.map((avatar) => (
            <button
              key={avatar}
              type="button"
              onClick={() => setOrgData({ ...orgData, avatar })}
              className={`pixel-border p-3 text-2xl text-center hover:bg-gray-100 ${
                orgData.avatar === avatar ? "bg-pink-soft" : "bg-white"
              }`}
            >
              {avatar}
            </button>
          ))}
        </div>
      </div>

      {/* Category and Location */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="pixel-font text-sm mb-2 block">📂 Category *</label>
          <select
            value={orgData.category}
            onChange={(e) =>
              setOrgData({
                ...orgData,
                category: e.target.value as
                  | "Technology"
                  | "Education"
                  | "Sustainability"
                  | "Healthcare"
                  | "Finance"
                  | "Other",
              })
            }
            className="pixel-input w-full"
          >
            <option value="Technology">💻 Technology</option>
            <option value="Education">🎓 Education</option>
            <option value="Sustainability">🌱 Sustainability</option>
            <option value="Healthcare">💊 Healthcare</option>
            <option value="Finance">💰 Finance</option>
            <option value="Other">📋 Other</option>
          </select>
        </div>

        <div>
          <label className="pixel-font text-sm mb-2 block">📍 Location *</label>
          <input
            type="text"
            value={orgData.location}
            onChange={(e) => setOrgData({ ...orgData, location: e.target.value })}
            placeholder="City, Country"
            className="pixel-input w-full"
            required
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="pixel-font text-sm mb-2 block">📝 Description *</label>
        <textarea
          value={orgData.description}
          onChange={(e) => setOrgData({ ...orgData, description: e.target.value })}
          placeholder="Describe what your organization does..."
          className="pixel-input w-full h-24 resize-none"
          required
        />
      </div>

      {/* Team Size and Founded */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="pixel-font text-sm mb-2 block">👥 Team Size</label>
          <input
            type="number"
            value={orgData.teamSize}
            onChange={(e) => setOrgData({ ...orgData, teamSize: Number.parseInt(e.target.value) || 1 })}
            min="1"
            max="10000"
            className="pixel-input w-full"
          />
        </div>

        <div>
          <label className="pixel-font text-sm mb-2 block">📅 Founded Year</label>
          <input
            type="number"
            value={orgData.founded}
            onChange={(e) => setOrgData({ ...orgData, founded: e.target.value })}
            min="1900"
            max={new Date().getFullYear()}
            className="pixel-input w-full"
          />
        </div>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-4">
      <h3 className="pixel-font text-sm font-bold mb-3">🎯 Mission & Contact</h3>

      {/* Mission Statement */}
      <div>
        <label className="pixel-font text-sm mb-2 block">🚀 Mission Statement *</label>
        <textarea
          value={orgData.mission}
          onChange={(e) => setOrgData({ ...orgData, mission: e.target.value })}
          placeholder="What is your organization's mission and goals?"
          className="pixel-input w-full h-24 resize-none"
          required
        />
      </div>

      {/* Contact Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="pixel-font text-sm mb-2 block">📧 Contact Email *</label>
          <input
            type="email"
            value={orgData.contactEmail}
            onChange={(e) => setOrgData({ ...orgData, contactEmail: e.target.value })}
            placeholder="contact@yourorg.com"
            className="pixel-input w-full"
            required
          />
        </div>

        <div>
          <label className="pixel-font text-sm mb-2 block">🌐 Website</label>
          <input
            type="url"
            value={orgData.website}
            onChange={(e) => setOrgData({ ...orgData, website: e.target.value })}
            placeholder="https://yourorganization.com"
            className="pixel-input w-full"
          />
        </div>
      </div>

      {/* Tags */}
      <div>
        <label className="pixel-font text-sm mb-2 block">🏷️ Tags</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={orgData.newTag}
            onChange={(e) => setOrgData({ ...orgData, newTag: e.target.value })}
            placeholder="Add a tag"
            className="pixel-input flex-1"
            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
          />
          <button type="button" onClick={addTag} className="pixel-button bg-green-soft text-white">
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-1">
          {orgData.tags.map((tag, index) => (
            <span key={index} className="pixel-border bg-gray-100 px-2 py-1 text-xs pixel-font flex items-center gap-1">
              {tag}
              <button type="button" onClick={() => removeTag(tag)} className="text-red-500 hover:text-red-700">
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Privacy Setting */}
      <div className="pixel-border bg-blue-50 p-3">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={orgData.isPublic}
            onChange={(e) => setOrgData({ ...orgData, isPublic: e.target.checked })}
            className="w-4 h-4"
          />
          <span className="pixel-font text-sm">🌍 Make organization public</span>
        </label>
        <p className="text-xs text-gray-600 mt-1">
          Public organizations can be discovered by users and can create public tasks
        </p>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-4">
      <h3 className="pixel-font text-sm font-bold mb-3">🔗 Social Links (Optional)</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="pixel-font text-sm mb-2 block">🐦 Twitter</label>
          <input
            type="url"
            value={orgData.socialLinks.twitter}
            onChange={(e) =>
              setOrgData({
                ...orgData,
                socialLinks: { ...orgData.socialLinks, twitter: e.target.value },
              })
            }
            placeholder="https://twitter.com/yourorg"
            className="pixel-input w-full"
          />
        </div>

        <div>
          <label className="pixel-font text-sm mb-2 block">💼 LinkedIn</label>
          <input
            type="url"
            value={orgData.socialLinks.linkedin}
            onChange={(e) =>
              setOrgData({
                ...orgData,
                socialLinks: { ...orgData.socialLinks, linkedin: e.target.value },
              })
            }
            placeholder="https://linkedin.com/company/yourorg"
            className="pixel-input w-full"
          />
        </div>

        <div>
          <label className="pixel-font text-sm mb-2 block">💬 Discord</label>
          <input
            type="url"
            value={orgData.socialLinks.discord}
            onChange={(e) =>
              setOrgData({
                ...orgData,
                socialLinks: { ...orgData.socialLinks, discord: e.target.value },
              })
            }
            placeholder="https://discord.gg/yourserver"
            className="pixel-input w-full"
          />
        </div>

        <div>
          <label className="pixel-font text-sm mb-2 block">📱 Telegram</label>
          <input
            type="url"
            value={orgData.socialLinks.telegram}
            onChange={(e) =>
              setOrgData({
                ...orgData,
                socialLinks: { ...orgData.socialLinks, telegram: e.target.value },
              })
            }
            placeholder="https://t.me/yourchannel"
            className="pixel-input w-full"
          />
        </div>
      </div>

      {/* Organization Preview */}
      <div className="pixel-border bg-yellow-50 p-4">
        <h4 className="pixel-font text-sm font-bold mb-3">👀 Organization Preview:</h4>
        <div className="flex items-start gap-3 mb-3">
          <div className="text-3xl">{orgData.avatar}</div>
          <div className="flex-1">
            <h5 className="pixel-font text-sm font-bold">{orgData.name || "Organization Name"}</h5>
            <p className="text-xs text-gray-600 mb-1">{orgData.description || "Organization description"}</p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>📍 {orgData.location || "Location"}</span>
              <span>👥 {orgData.teamSize} members</span>
              <span>📅 Founded {orgData.founded}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-1">
          {orgData.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="bg-gray-100 px-2 py-1 text-xs pixel-font rounded">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-start justify-center p-4 z-50 overflow-y-auto">
      <div className="pixel-card bg-white w-full max-w-3xl mt-4 mb-4 border-4 border-black">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="pixel-font text-lg">🏢 Create Organization</h2>
            <p className="text-xs text-gray-600">Step {currentStep} of 3</p>
          </div>
          <button
            onClick={onClose}
            className="pixel-border bg-red-300 px-3 py-2 hover:bg-red-400 transition-colors min-h-[44px] min-w-[44px]"
          >
            <span className="pixel-font">✕</span>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="pixel-border bg-gray-200 h-2 mb-6">
          <div
            className="bg-green-soft h-full transition-all duration-300"
            style={{ width: `${(currentStep / 3) * 100}%` }}
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step Content */}
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}

          {/* Navigation Buttons */}
          <div className="flex gap-3 pt-4">
            {currentStep > 1 && (
              <button type="button" onClick={prevStep} className="pixel-button bg-gray-200 flex-1">
                ← Previous
              </button>
            )}

            {currentStep < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="pixel-button bg-blue-200 flex-1"
                disabled={!isStepValid(currentStep)}
              >
                Next →
              </button>
            ) : (
              <button type="submit" className="pixel-button bg-green-soft text-white flex-1" disabled={isSubmitting}>
                {isSubmitting ? "Creating Organization..." : "🚀 Create Organization"}
              </button>
            )}

            <button type="button" onClick={onClose} className="pixel-button bg-gray-200" disabled={isSubmitting}>
              Cancel
            </button>
          </div>
        </form>

        {/* Help Section */}
        <div className="mt-6 pt-4 border-t-2 border-gray-200">
          <h4 className="pixel-font text-xs font-bold mb-2">💡 Organization Benefits:</h4>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• Create and manage tasks for your organization</li>
            <li>• Build your organization's reputation and visibility</li>
            <li>• Connect with talented contributors worldwide</li>
            <li>• Track your organization's impact and growth</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
