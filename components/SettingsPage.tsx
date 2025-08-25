"use client"

import { useState } from "react"
import { useApp } from "@/components/providers/app-provider"

interface SettingsPageProps {
  onBack?: () => void
}

export default function SettingsPage({ onBack }: SettingsPageProps) {
  const { user } = useApp()
  const [activeSubpage, setActiveSubpage] = useState<"main" | "notifications" | "security">("main")
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    taskUpdates: true,
    rewardNotifications: true,
    weeklyDigest: false,
  })
  const [securitySettings, setSecuritySettings] = useState({
    currentEmail: user?.name + "@example.com" || "",
    newEmail: "",
    currentWallet: user?.address || "",
  })

  if (!user) {
    return (
      <div className="space-y-4 px-3 pb-6">
        <div className="pixel-card text-center py-8">
          <h2 className="pixel-font text-lg mb-4">⚙️ Settings</h2>
          <p className="pixel-font text-sm text-gray-600 mb-4">Connect your wallet to access settings</p>
        </div>
      </div>
    )
  }

  const renderMainSettings = () => (
    <div className="space-y-4 px-3 pb-6">
      {/* Header */}
      {onBack && (
        <div className="flex items-center gap-3 mb-4">
          <button onClick={onBack} className="pixel-button bg-gray-200 px-3 py-2">
            ← Back
          </button>
          <h1 className="pixel-font text-lg">⚙️ Settings</h1>
        </div>
      )}

      {/* Settings Menu */}
      <div className="pixel-card">
        <h2 className="pixel-font text-sm mb-3">Settings Menu</h2>
        <div className="space-y-2">
          <button
            onClick={() => setActiveSubpage("notifications")}
            className="pixel-button bg-blue-200 w-full text-left"
          >
            🔔 Notifications
          </button>
          <button onClick={() => setActiveSubpage("security")} className="pixel-button bg-green-200 w-full text-left">
            🔐 Security
          </button>
        </div>
      </div>

      {/* User Info */}
      <div className="pixel-card">
        <h3 className="pixel-font text-sm mb-3">👤 Account Information</h3>
        <div className="space-y-2">
          <div className="pixel-border bg-gray-100 p-3 flex justify-between items-center">
            <span className="pixel-font text-xs">Username</span>
            <span className="text-xs">{user.name}</span>
          </div>
          <div className="pixel-border bg-gray-100 p-3 flex justify-between items-center">
            <span className="pixel-font text-xs">Role</span>
            <span className="text-xs">{user.role.toUpperCase()}</span>
          </div>
          <div className="pixel-border bg-gray-100 p-3 flex justify-between items-center">
            <span className="pixel-font text-xs">Wallet Address</span>
            <span className="text-xs">
              {user.address.slice(0, 8)}...{user.address.slice(-4)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )

  const renderNotificationSettings = () => (
    <div className="space-y-4 px-3 pb-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => setActiveSubpage("main")} className="pixel-button bg-gray-200 px-3 py-2">
          ← Back
        </button>
        <h1 className="pixel-font text-lg">🔔 Notifications</h1>
      </div>

      {/* Email Notifications */}
      <div className="pixel-card">
        <h3 className="pixel-font text-sm mb-3">📧 Email Notifications</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-2 bg-gray-50 pixel-border">
            <div>
              <h4 className="pixel-font text-xs font-bold">Email Notifications</h4>
              <p className="text-xs text-gray-600">Receive notifications via email</p>
            </div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={notificationSettings.emailNotifications}
                onChange={(e) =>
                  setNotificationSettings({ ...notificationSettings, emailNotifications: e.target.checked })
                }
                className="w-4 h-4 mr-2"
              />
              <span className="pixel-font text-xs">{notificationSettings.emailNotifications ? "ON" : "OFF"}</span>
            </label>
          </div>

          <div className="flex items-center justify-between p-2 bg-gray-50 pixel-border">
            <div>
              <h4 className="pixel-font text-xs font-bold">Task Updates</h4>
              <p className="text-xs text-gray-600">Get notified about task status changes</p>
            </div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={notificationSettings.taskUpdates}
                onChange={(e) => setNotificationSettings({ ...notificationSettings, taskUpdates: e.target.checked })}
                className="w-4 h-4 mr-2"
                disabled={!notificationSettings.emailNotifications}
              />
              <span className="pixel-font text-xs">{notificationSettings.taskUpdates ? "ON" : "OFF"}</span>
            </label>
          </div>

          <div className="flex items-center justify-between p-2 bg-gray-50 pixel-border">
            <div>
              <h4 className="pixel-font text-xs font-bold">Reward Notifications</h4>
              <p className="text-xs text-gray-600">Get notified when you receive rewards</p>
            </div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={notificationSettings.rewardNotifications}
                onChange={(e) =>
                  setNotificationSettings({ ...notificationSettings, rewardNotifications: e.target.checked })
                }
                className="w-4 h-4 mr-2"
                disabled={!notificationSettings.emailNotifications}
              />
              <span className="pixel-font text-xs">{notificationSettings.rewardNotifications ? "ON" : "OFF"}</span>
            </label>
          </div>

          <div className="flex items-center justify-between p-2 bg-gray-50 pixel-border">
            <div>
              <h4 className="pixel-font text-xs font-bold">Weekly Digest</h4>
              <p className="text-xs text-gray-600">Weekly summary of your activity</p>
            </div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={notificationSettings.weeklyDigest}
                onChange={(e) => setNotificationSettings({ ...notificationSettings, weeklyDigest: e.target.checked })}
                className="w-4 h-4 mr-2"
                disabled={!notificationSettings.emailNotifications}
              />
              <span className="pixel-font text-xs">{notificationSettings.weeklyDigest ? "ON" : "OFF"}</span>
            </label>
          </div>
        </div>

        <div className="mt-4">
          <button className="pixel-button bg-green-soft text-white w-full">💾 Save Notification Settings</button>
        </div>
      </div>
    </div>
  )

  const renderSecuritySettings = () => (
    <div className="space-y-4 px-3 pb-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => setActiveSubpage("main")} className="pixel-button bg-gray-200 px-3 py-2">
          ← Back
        </button>
        <h1 className="pixel-font text-lg">🔐 Security</h1>
      </div>

      {/* Change Email */}
      <div className="pixel-card">
        <h3 className="pixel-font text-sm mb-3">📧 Change Email</h3>
        <div className="space-y-3">
          <div>
            <label className="pixel-font text-xs mb-2 block">Current Email</label>
            <input
              type="email"
              value={securitySettings.currentEmail}
              disabled
              className="pixel-input w-full bg-gray-100"
            />
          </div>
          <div>
            <label className="pixel-font text-xs mb-2 block">New Email</label>
            <input
              type="email"
              value={securitySettings.newEmail}
              onChange={(e) => setSecuritySettings({ ...securitySettings, newEmail: e.target.value })}
              placeholder="Enter new email address"
              className="pixel-input w-full"
            />
          </div>
          <button className="pixel-button bg-blue-200 w-full">📧 Update Email</button>
        </div>
      </div>

      {/* Change Wallet */}
      <div className="pixel-card">
        <h3 className="pixel-font text-sm mb-3">👛 Change Wallet</h3>
        <div className="space-y-3">
          <div>
            <label className="pixel-font text-xs mb-2 block">Current Wallet</label>
            <input
              type="text"
              value={`${securitySettings.currentWallet.slice(0, 8)}...${securitySettings.currentWallet.slice(-4)}`}
              disabled
              className="pixel-input w-full bg-gray-100"
            />
          </div>
          <div className="pixel-border bg-yellow-50 p-3">
            <p className="text-xs text-gray-700 mb-2">
              <strong>⚠️ Important:</strong> Changing your wallet will disconnect your current wallet and require you to
              connect a new one.
            </p>
            <p className="text-xs text-gray-600">Make sure you have access to your new wallet before proceeding.</p>
          </div>
          <button className="pixel-button bg-orange w-full">🔄 Change Wallet</button>
        </div>
      </div>

      {/* Security Tips */}
      <div className="pixel-card">
        <h3 className="pixel-font text-sm mb-3">🛡️ Security Tips</h3>
        <div className="space-y-2 text-xs text-gray-700">
          <div className="flex items-start gap-2">
            <span className="text-green-600">•</span>
            <span>Never share your private keys or seed phrases</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-600">•</span>
            <span>Always verify wallet addresses before transactions</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-600">•</span>
            <span>Use hardware wallets for large amounts</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-600">•</span>
            <span>Keep your wallet software updated</span>
          </div>
        </div>
      </div>
    </div>
  )

  switch (activeSubpage) {
    case "notifications":
      return renderNotificationSettings()
    case "security":
      return renderSecuritySettings()
    default:
      return renderMainSettings()
  }
}
