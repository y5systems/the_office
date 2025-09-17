"use client"

import { useEffect, useState } from 'react'
import { useApp } from '@/components/providers/app-provider'

export function ComposerWallet() {
  const [showFallbackMenu, setShowFallbackMenu] = useState(false)
  const { user, connectWallet, web3 } = useApp()
  
  // Hide menu when connected or in MiniPay
  useEffect(() => {
    if ((web3.isMiniPay && web3.isConnected && web3.address) || user) {
      setShowFallbackMenu(false)
    }
  }, [web3.isMiniPay, web3.isConnected, web3.address, user])

  const handleFallbackWalletConnect = (walletType: string) => {
    connectWallet(walletType)
    setShowFallbackMenu(false)
  }

  const handleFallbackMenuToggle = () => {
    setShowFallbackMenu(!showFallbackMenu)
  }

  // Don't show connect wallet button in MiniPay (since it auto-connects)
  if (web3.isMiniPay && web3.isConnected) {
    return null
  }
  
  // Show user info if connected
  if (user && web3.isConnected) {
    return (
      <div className="pixel-border bg-green-soft text-white px-3 py-1 md:px-4 md:py-2 min-h-[40px] md:min-h-[44px] pixel-font text-responsive-sm flex items-center gap-2">
        {user.avatar} {user.name} ({web3.balance} cUSD)
      </div>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={handleFallbackMenuToggle}
        className="pixel-border bg-pink-soft text-black px-3 py-1 md:px-4 md:py-2 hover:bg-yellow-soft transition-colors min-h-[40px] md:min-h-[44px] pixel-font text-responsive-sm"
      >
        Connect Wallet
      </button>
      
      {/* Wallet Connection Menu - Working Original Functionality */}
      {showFallbackMenu && (
        <div className="absolute right-0 top-full mt-2 pixel-card bg-white min-w-[200px] md:min-w-[240px] z-50">
          <div className="space-y-2">
            <button
              onClick={() => handleFallbackWalletConnect('metamask')}
              className="pixel-button bg-orange w-full text-left"
            >
              🦊 MetaMask
            </button>
            <button
              onClick={() => handleFallbackWalletConnect('minipay')}
              className="pixel-button bg-navy-dark text-white w-full text-left"
            >
              💳 MiniPay
            </button>
            <button
              onClick={() => handleFallbackWalletConnect('valora')}
              className="pixel-button bg-green-soft text-white w-full text-left"
            >
              📱 Valora
            </button>
            <button
              onClick={() => handleFallbackWalletConnect('student')}
              className="pixel-button bg-pink-soft w-full text-left"
            >
              🎓 Demo Student
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
