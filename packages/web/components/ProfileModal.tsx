"use client"

import { useApp } from "@/components/providers/app-provider"

interface ProfileModalProps {
  onClose: () => void
}

export default function ProfileModal({ onClose }: ProfileModalProps) {
  const { user, web3 } = useApp()

  if (!user) return null

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-start justify-center p-4 z-50 overflow-y-auto">
      <div className="pixel-card bg-white w-full max-w-sm mt-4 mb-4 border-4 border-black">
        <div className="flex justify-between items-center mb-4">
          <h2 className="pixel-font text-lg">{user.role === "admin" ? "👑 ADMIN PROFILE" : "PROFILE"}</h2>
          <button
            onClick={onClose}
            className="pixel-border bg-red-300 px-3 py-2 hover:bg-red-400 transition-colors min-h-[44px] min-w-[44px]"
          >
            <span className="pixel-font">✕</span>
          </button>
        </div>

        {/* Admin Badge */}
        {user.role === "admin" && (
          <div className="pixel-border bg-purple-200 p-3 mb-4 text-center">
            <span className="pixel-font text-sm">🔐 SYSTEM ADMINISTRATOR</span>
          </div>
        )}

        {/* Stats */}
        <div className="pixel-border bg-yellow-soft p-3 mb-4">
          <div className="grid grid-cols-3 gap-3 text-center">
            {user.role === "admin" ? (
              <>
                <div>
                  <div className="pixel-font text-xl mb-1">{user.usersManaged}</div>
                  <div className="pixel-font text-xs">USERS</div>
                </div>
                <div>
                  <div className="pixel-font text-xl mb-1">{user.totalPlatformValue}</div>
                  <div className="pixel-font text-xs">PLATFORM cUSD</div>
                </div>
                <div>
                  <div className="pixel-font text-xl mb-1">{user.tasksCreated}</div>
                  <div className="pixel-font text-xs">TASKS</div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <div className="pixel-font text-xl mb-1">12</div>
                  <div className="pixel-font text-xs">TASKS DONE</div>
                </div>
                <div>
                  <div className="pixel-font text-xl mb-1">125</div>
                  <div className="pixel-font text-xs">cUSD EARNED</div>
                </div>
                <div>
                  <div className="pixel-font text-xl mb-1">3</div>
                  <div className="pixel-font text-xs">LEVEL</div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* User Info */}
        <div className="mb-4">
          <h3 className="pixel-font text-sm mb-2">USER INFO</h3>
          <div className="pixel-border bg-gray-100 p-3 space-y-1">
            <div className="pixel-font text-xs">
              <span className="font-bold">Username:</span> {user.name}
            </div>
            <div className="pixel-font text-xs">
              <span className="font-bold">Role:</span> {user.role.toUpperCase()}
            </div>
            <div className="pixel-font text-xs">
              <span className="font-bold">Address:</span> {user.address.slice(0, 8)}...
            </div>
          </div>
        </div>

        {/* Admin Tools */}
        {user.role === "admin" && (
          <div className="mb-4">
            <h3 className="pixel-font text-sm mb-2">ADMIN TOOLS</h3>
            <div className="space-y-2">
              <div className="pixel-border bg-blue-100 p-3">
                <span className="pixel-font text-xs">🔧 SYSTEM MANAGEMENT</span>
              </div>
              <div className="pixel-border bg-red-100 p-3">
                <span className="pixel-font text-xs">🚫 USER MODERATION</span>
              </div>
              <div className="pixel-border bg-green-100 p-3">
                <span className="pixel-font text-xs">📊 PLATFORM ANALYTICS</span>
              </div>
            </div>
          </div>
        )}

        {/* Wallet */}
        <div className="mb-4">
          <h3 className="pixel-font text-sm mb-2">WALLET</h3>
          <div className="pixel-border bg-gray-100 p-3 space-y-2">
            <div className="pixel-font text-xs truncate">{user.address}</div>
            {web3.isConnected && web3.balance && (
              <div className="pixel-font text-xs text-gray-600">
                Balance: {web3.balance} cUSD
              </div>
            )}
            {web3.isMiniPay && (
              <div className="pixel-font text-xs text-gray-500">
                💳 Connected via MiniPay
              </div>
            )}
            {!web3.isMiniPay && (
              <div className="flex justify-end">
                <button className="pixel-button bg-pink-soft text-xs">DISCONNECT</button>
              </div>
            )}
          </div>
        </div>

        {/* Settings */}
        <div className="mb-4">
          <h3 className="pixel-font text-sm mb-2">SETTINGS</h3>
          <div className="space-y-2">
            <div className="pixel-border bg-gray-100 p-3">
              <span className="pixel-font text-xs">⚠️ NOTIFICATIONS: ON</span>
            </div>
            <div className="pixel-border bg-gray-100 p-3">
              <span className="pixel-font text-xs">📊 EXPORT DATA</span>
            </div>
            {user.role === "admin" && (
              <div className="pixel-border bg-purple-100 p-3">
                <span className="pixel-font text-xs">👑 ADMIN SETTINGS</span>
              </div>
            )}
          </div>
        </div>

        {/* Logout */}
        {!web3.isMiniPay && (
          <button className="pixel-button bg-red-300 w-full text-center py-3">LOGOUT</button>
        )}
      </div>
    </div>
  )
}
