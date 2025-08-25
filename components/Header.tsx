"use client"

import { useState } from "react"
import { useApp } from "@/components/providers/app-provider"

interface HeaderProps {
  onProfileClick: () => void
}

export default function Header({ onProfileClick }: HeaderProps) {
  const { user, connectWallet, logout } = useApp()
  const [showWalletMenu, setShowWalletMenu] = useState(false)
  const [showUserDropdown, setShowUserDropdown] = useState(false)

  const getUserDisplayName = () => {
    if (!user) return "Anon"

    switch (user.role) {
      case "admin":
        return "Admin"
      case "builder":
        return "Builder"
      case "partner":
        return user.organizationName || user.name
      case "contributor":
        return user.name
      case "student":
        return user.name
      default:
        return "Anon"
    }
  }

  const getUserIcon = () => {
    if (!user) return "👤"
    return user.avatar
  }

  const handleWalletConnect = (walletType: string) => {
    connectWallet(walletType)
    setShowWalletMenu(false)
  }

  const handleUserDropdownToggle = () => {
    if (user) {
      setShowUserDropdown(!showUserDropdown)
    } else {
      setShowWalletMenu(!showWalletMenu)
    }
  }

  const handleDisconnectWallet = () => {
    // Just close dropdown for now - wallet disconnect logic can be added later
    setShowUserDropdown(false)
  }

  const handleLogout = () => {
    logout()
    setShowUserDropdown(false)
  }

  return (
    <div className="bg-navy-dark text-white p-3 md:p-4 lg:p-5 flex justify-between items-center fixed top-0 left-0 right-0 z-40 border-b-4 border-black">
      <div className="flex items-center gap-2 md:gap-3">
        <div
          className={`pixel-border ${user?.role === "admin" ? "bg-pink-soft" : "bg-orange"} text-black px-2 py-1 md:px-3 md:py-2`}
        >
          <span className="pixel-font text-responsive-sm">{user?.role === "admin" ? "👑" : "TO"}</span>
        </div>
        <h1 className="pixel-font text-responsive-lg">TheOffice</h1>
        {user?.role === "admin" && (
          <span className="pixel-border bg-orange text-black px-2 py-1 md:px-3 md:py-2 text-responsive-xs pixel-font">
            ADMIN
          </span>
        )}
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        {user && (
          <div className="pixel-border bg-green-soft text-white px-2 py-1 md:px-3 md:py-2">
            <span className="pixel-font text-responsive-xs">
              {user.role === "admin" ? `${user.totalPlatformValue} USDC` : `${user.totalEarned || 0} USDC`}
            </span>
          </div>
        )}

        <div className="relative">
          <button
            onClick={handleUserDropdownToggle}
            className="pixel-border bg-pink-soft text-black px-3 py-1 md:px-4 md:py-2 hover:bg-yellow-soft transition-colors min-h-[40px] md:min-h-[44px]"
          >
            <span className="pixel-font text-responsive-sm">{user ? getUserDisplayName() : "Login"}</span>
          </button>

          {/* User Dropdown Menu */}
          {showUserDropdown && user && (
            <div className="absolute right-0 top-full mt-2 pixel-card bg-white min-w-[200px] md:min-w-[240px] z-50">
              <div className="space-y-2">
                <div className="p-2 border-b-2 border-gray-200">
                  <div className="pixel-font text-xs text-gray-600 mb-1">User: {user.name}</div>
                  <div className="pixel-font text-xs text-gray-600">
                    Wallet: {user.address.slice(0, 8)}...{user.address.slice(-4)}
                  </div>
                </div>
                <button onClick={handleDisconnectWallet} className="pixel-button bg-orange w-full text-left">
                  🔌 Disconnect Wallet
                </button>
                <button onClick={handleLogout} className="pixel-button bg-red-300 w-full text-left">
                  🚪 Logout
                </button>
              </div>
            </div>
          )}

          {/* Wallet Connection Menu */}
          {showWalletMenu && !user && (
            <div className="absolute right-0 top-full mt-2 pixel-card bg-white min-w-[200px] md:min-w-[240px] z-50">
              <div className="space-y-2">
                <button
                  onClick={() => handleWalletConnect("metamask")}
                  className="pixel-button bg-orange w-full text-left"
                >
                  🦊 MetaMask
                </button>
                <button
                  onClick={() => handleWalletConnect("farcaster")}
                  className="pixel-button bg-pink-soft w-full text-left"
                >
                  🟣 Farcaster
                </button>
                <button
                  onClick={() => handleWalletConnect("minipay")}
                  className="pixel-button bg-navy-dark text-white w-full text-left"
                >
                  💳 MiniPay
                </button>
                <button
                  onClick={() => handleWalletConnect("valora")}
                  className="pixel-button bg-green-soft text-white w-full text-left"
                >
                  📱 Valora
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
