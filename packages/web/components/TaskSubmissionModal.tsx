"use client"

import type React from "react"

import { useState } from "react"

interface TaskSubmissionModalProps {
  task: any
  onClose: () => void
  onSubmit: (taskId: string, proof: string, submissionData: any) => void
}

export default function TaskSubmissionModal({ task, onClose, onSubmit }: TaskSubmissionModalProps) {
  const [submissionData, setSubmissionData] = useState({
    url: "",
    fileLink: "",
    description: "",
    notes: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    let proof = ""
    const fullSubmissionData = { ...submissionData }

    switch (task.validationType) {
      case "URL Submission":
        proof = `URL submitted: ${submissionData.url}`
        break
      case "File Upload":
        proof = `Files uploaded: ${submissionData.fileLink}`
        break
      case "Manual":
        proof = `Manual submission: ${submissionData.description}`
        break
      default:
        proof = "Submission completed"
    }

    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    onSubmit(task.id, proof, fullSubmissionData)
    setIsSubmitting(false)
    onClose()
  }

  const renderSubmissionFields = () => {
    switch (task.validationType) {
      case "URL Submission":
        return (
          <div className="space-y-4">
            <div>
              <label className="pixel-font text-sm mb-2 block">📎 Submission URL *</label>
              <input
                type="url"
                value={submissionData.url}
                onChange={(e) => setSubmissionData({ ...submissionData, url: e.target.value })}
                placeholder="https://example.com/your-submission"
                className="pixel-input w-full"
                required
              />
              <p className="text-xs text-gray-600 mt-1">
                Provide the URL where your completed work can be viewed or accessed.
              </p>
            </div>
            <div>
              <label className="pixel-font text-sm mb-2 block">📝 Additional Notes</label>
              <textarea
                value={submissionData.notes}
                onChange={(e) => setSubmissionData({ ...submissionData, notes: e.target.value })}
                placeholder="Any additional information about your submission..."
                className="pixel-input w-full h-20 resize-none"
              />
            </div>
          </div>
        )

      case "File Upload":
        return (
          <div className="space-y-4">
            <div>
              <label className="pixel-font text-sm mb-2 block">📁 File Upload Link *</label>
              <input
                type="url"
                value={submissionData.fileLink}
                onChange={(e) => setSubmissionData({ ...submissionData, fileLink: e.target.value })}
                placeholder="https://drive.google.com/... or https://dropbox.com/..."
                className="pixel-input w-full"
                required
              />
              <p className="text-xs text-gray-600 mt-1">
                Upload your files to Google Drive, Dropbox, or similar service and paste the shareable link here.
              </p>
            </div>
            <div className="pixel-border bg-blue-50 p-3">
              <h4 className="pixel-font text-xs font-bold mb-2">📋 File Upload Instructions:</h4>
              <ul className="text-xs text-gray-700 space-y-1">
                <li>• Upload files to Google Drive, Dropbox, or OneDrive</li>
                <li>• Make sure the link is publicly accessible or shared with the organization</li>
                <li>• Include all required files as specified in the task description</li>
                <li>• Name your files clearly (e.g., "TaskName_YourName_v1.pdf")</li>
              </ul>
            </div>
            <div>
              <label className="pixel-font text-sm mb-2 block">📝 File Description</label>
              <textarea
                value={submissionData.description}
                onChange={(e) => setSubmissionData({ ...submissionData, description: e.target.value })}
                placeholder="Describe the files you've uploaded and any important details..."
                className="pixel-input w-full h-20 resize-none"
              />
            </div>
          </div>
        )

      case "Manual":
        return (
          <div className="space-y-4">
            <div>
              <label className="pixel-font text-sm mb-2 block">📝 Submission Description *</label>
              <textarea
                value={submissionData.description}
                onChange={(e) => setSubmissionData({ ...submissionData, description: e.target.value })}
                placeholder="Describe your completed work in detail..."
                className="pixel-input w-full h-32 resize-none"
                required
              />
              <p className="text-xs text-gray-600 mt-1">
                Provide a detailed description of the work you've completed for manual review.
              </p>
            </div>
            <div>
              <label className="pixel-font text-sm mb-2 block">🔗 Supporting Links (Optional)</label>
              <input
                type="url"
                value={submissionData.url}
                onChange={(e) => setSubmissionData({ ...submissionData, url: e.target.value })}
                placeholder="https://example.com/supporting-evidence"
                className="pixel-input w-full"
              />
              <p className="text-xs text-gray-600 mt-1">Any supporting links, screenshots, or evidence of your work.</p>
            </div>
          </div>
        )

      case "Auto":
        return (
          <div className="space-y-4">
            <div className="pixel-border bg-green-50 p-4 text-center">
              <div className="text-3xl mb-2">🤖</div>
              <h4 className="pixel-font text-sm font-bold mb-2">Automatic Verification</h4>
              <p className="text-xs text-gray-600 mb-3">
                This task will be automatically verified by the system. No manual submission required.
              </p>
              <div className="pixel-border bg-white p-2">
                <span className="pixel-font text-xs">✅ System will verify completion automatically</span>
              </div>
            </div>
            <div>
              <label className="pixel-font text-sm mb-2 block">📝 Optional Notes</label>
              <textarea
                value={submissionData.notes}
                onChange={(e) => setSubmissionData({ ...submissionData, notes: e.target.value })}
                placeholder="Any additional notes or comments..."
                className="pixel-input w-full h-20 resize-none"
              />
            </div>
          </div>
        )

      default:
        return (
          <div className="text-center py-8">
            <p className="pixel-font text-sm text-gray-600">Unknown validation type</p>
          </div>
        )
    }
  }

  const getSubmissionIcon = () => {
    switch (task.validationType) {
      case "URL Submission":
        return "🔗"
      case "File Upload":
        return "📁"
      case "Manual":
        return "📝"
      case "Auto":
        return "🤖"
      default:
        return "📋"
    }
  }

  const isFormValid = () => {
    switch (task.validationType) {
      case "URL Submission":
        return submissionData.url.trim() !== ""
      case "File Upload":
        return submissionData.fileLink.trim() !== ""
      case "Manual":
        return submissionData.description.trim() !== ""
      case "Auto":
        return true
      default:
        return false
    }
  }

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-start justify-center p-4 z-50 overflow-y-auto">
      <div className="pixel-card bg-white w-full max-w-lg mt-4 mb-4 border-4 border-black">
        <div className="flex justify-between items-center mb-4">
          <h2 className="pixel-font text-lg">{getSubmissionIcon()} Submit Task</h2>
          <button
            onClick={onClose}
            className="pixel-border bg-red-300 px-3 py-2 hover:bg-red-400 transition-colors min-h-[44px] min-w-[44px]"
          >
            <span className="pixel-font">✕</span>
          </button>
        </div>

        {/* Task Info */}
        <div className="pixel-border bg-gray-50 p-3 mb-4">
          <h3 className="pixel-font text-sm font-bold mb-1">{task.title}</h3>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="pixel-border bg-green-soft text-white px-2 py-1 text-xs pixel-font">
              💰 {task.reward} cUSD
            </span>
            <span className="pixel-border bg-blue-200 px-2 py-1 text-xs pixel-font">{task.validationType}</span>
            <span className="pixel-border bg-yellow-soft px-2 py-1 text-xs pixel-font">{task.complexity}</span>
          </div>
          <p className="text-xs text-gray-600">{task.instructions}</p>
        </div>

        {/* Submission Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {renderSubmissionFields()}

          {/* Submission Guidelines */}
          <div className="pixel-border bg-yellow-50 p-3">
            <h4 className="pixel-font text-xs font-bold mb-2">⚠️ Submission Guidelines:</h4>
            <ul className="text-xs text-gray-700 space-y-1">
              <li>• Ensure your submission meets all task requirements</li>
              <li>• Double-check all links and files are accessible</li>
              <li>• Submissions cannot be edited after submission</li>
              <li>• Review will typically take 24-48 hours</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="pixel-button bg-gray-200 flex-1" disabled={isSubmitting}>
              Cancel
            </button>
            <button
              type="submit"
              className="pixel-button bg-green-soft text-white flex-1"
              disabled={!isFormValid() || isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "🚀 Submit Task"}
            </button>
          </div>
        </form>

        {/* Help Section */}
        <div className="mt-4 pt-4 border-t-2 border-gray-200">
          <h4 className="pixel-font text-xs font-bold mb-2">❓ Need Help?</h4>
          <div className="flex gap-2">
            <button className="pixel-button bg-blue-200 text-xs flex-1">📞 Contact Support</button>
            <button className="pixel-button bg-purple-200 text-xs flex-1">📚 View Guidelines</button>
          </div>
        </div>
      </div>
    </div>
  )
}
