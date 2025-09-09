"use client"

import { useState, useEffect } from 'react'
import { createWalletClient, createPublicClient, custom, http, getContract, parseEther, formatEther } from 'viem'
import { celo, celoAlfajores } from 'viem/chains'
import { stableTokenABI } from '@celo/abis'

declare global {
  interface Window {
    ethereum?: any
  }
}

// Contract addresses
const STABLE_TOKEN_ADDRESS_MAINNET = "0x765DE816845861e75A25fCA122bb6898B8B1282a"
const STABLE_TOKEN_ADDRESS_TESTNET = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1"

// Use testnet for development, mainnet for production
const isProduction = process.env.NODE_ENV === 'production'
const currentChain = isProduction ? celo : celoAlfajores
const STABLE_TOKEN_ADDRESS = isProduction ? STABLE_TOKEN_ADDRESS_MAINNET : STABLE_TOKEN_ADDRESS_TESTNET

export interface Web3State {
  isConnected: boolean
  address: string | null
  balance: string | null
  isMiniPay: boolean
  isLoading: boolean
}

export const useWeb3 = () => {
  const [web3State, setWeb3State] = useState<Web3State>({
    isConnected: false,
    address: null,
    balance: null,
    isMiniPay: false,
    isLoading: false
  })

  // Create public client for reading blockchain data
  const publicClient = createPublicClient({
    chain: currentChain,
    transport: http(),
  })

  // Check if MiniPay is available and auto-connect
  const checkMiniPayConnection = async () => {
    if (typeof window === 'undefined' || !window.ethereum) return

    const isMiniPay = window.ethereum.isMiniPay === true
    setWeb3State(prev => ({ ...prev, isMiniPay }))

    if (isMiniPay) {
      // Auto-connect to MiniPay
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
          params: [],
        })
        
        if (accounts && accounts[0]) {
          await connectWallet(accounts[0])
        }
      } catch (error) {
        console.error('Failed to auto-connect MiniPay:', error)
      }
    }
  }

  // Connect wallet manually (for non-MiniPay wallets)
  const connectWallet = async (preConnectedAddress?: string) => {
    if (typeof window === 'undefined' || !window.ethereum) {
      throw new Error('No wallet detected')
    }

    setWeb3State(prev => ({ ...prev, isLoading: true }))

    try {
      let address: string

      if (preConnectedAddress) {
        address = preConnectedAddress
      } else {
        const walletClient = createWalletClient({
          transport: custom(window.ethereum),
          chain: currentChain,
        })
        const [connectedAddress] = await walletClient.getAddresses()
        address = connectedAddress
      }

      // Get cUSD balance
      const balance = await getCUSDBalance(address)

      setWeb3State(prev => ({
        ...prev,
        isConnected: true,
        address,
        balance,
        isLoading: false
      }))

      return address
    } catch (error) {
      setWeb3State(prev => ({ ...prev, isLoading: false }))
      throw error
    }
  }

  // Get cUSD balance
  const getCUSDBalance = async (address: string): Promise<string> => {
    try {
      const stableTokenContract = getContract({
        abi: stableTokenABI,
        address: STABLE_TOKEN_ADDRESS,
        client: publicClient,
      })

      const balanceInBigNumber = await stableTokenContract.read.balanceOf([address as `0x${string}`])
      const balanceInWei = balanceInBigNumber.toString()
      const balanceInEthers = formatEther(balanceInWei)

      return parseFloat(balanceInEthers).toFixed(2)
    } catch (error) {
      console.error('Failed to get cUSD balance:', error)
      return '0.00'
    }
  }

  // Send cUSD (for task rewards)
  const sendCUSD = async (toAddress: string, amount: string): Promise<string> => {
    if (!web3State.address || typeof window === 'undefined' || !window.ethereum) {
      throw new Error('Wallet not connected')
    }

    const walletClient = createWalletClient({
      transport: custom(window.ethereum),
      chain: currentChain,
    })

    const amountInWei = parseEther(amount)

    try {
      const hash = await walletClient.writeContract({
        address: STABLE_TOKEN_ADDRESS,
        abi: stableTokenABI,
        functionName: 'transfer',
        account: web3State.address as `0x${string}`,
        args: [toAddress as `0x${string}`, amountInWei],
      })

      const receipt = await publicClient.waitForTransactionReceipt({
        hash,
      })

      // Update balance after successful transaction
      if (receipt.status === 'success') {
        const newBalance = await getCUSDBalance(web3State.address)
        setWeb3State(prev => ({ ...prev, balance: newBalance }))
      }

      return hash
    } catch (error) {
      console.error('Failed to send cUSD:', error)
      throw error
    }
  }

  // Estimate gas for transaction
  const estimateGas = async (toAddress: string, amount: string) => {
    try {
      const amountInWei = parseEther(amount)
      
      const gasLimit = await publicClient.estimateGas({
        account: web3State.address as `0x${string}`,
        to: STABLE_TOKEN_ADDRESS,
        data: `0x${stableTokenABI.find(f => f.name === 'transfer')?.selector}`,
        feeCurrency: STABLE_TOKEN_ADDRESS,
      })

      const gasPrice = await publicClient.request({
        method: 'eth_gasPrice',
        params: [STABLE_TOKEN_ADDRESS],
      })

      const transactionFee = formatEther(gasLimit * BigInt(gasPrice))
      return parseFloat(transactionFee).toFixed(6)
    } catch (error) {
      console.error('Failed to estimate gas:', error)
      return '0.001' // fallback estimate
    }
  }

  // Refresh balance
  const refreshBalance = async () => {
    if (web3State.address) {
      const newBalance = await getCUSDBalance(web3State.address)
      setWeb3State(prev => ({ ...prev, balance: newBalance }))
    }
  }

  // Disconnect wallet
  const disconnect = () => {
    setWeb3State({
      isConnected: false,
      address: null,
      balance: null,
      isMiniPay: false,
      isLoading: false
    })
  }

  // Check connection on mount
  useEffect(() => {
    checkMiniPayConnection()
  }, [])

  return {
    ...web3State,
    connectWallet,
    sendCUSD,
    getCUSDBalance,
    estimateGas,
    refreshBalance,
    disconnect,
    currentChain,
    stableTokenAddress: STABLE_TOKEN_ADDRESS
  }
}
