import { createWalletClient, createPublicClient, custom, http, getContract, parseEther, formatEther } from 'viem'
import { celo, celoSepolia } from 'viem/chains'
import { stableTokenABI } from '@celo/abis'

// Contract addresses
const STABLE_TOKEN_ADDRESS_MAINNET = "0x765DE816845861e75A25fCA122bb6898B8B1282a"
const STABLE_TOKEN_ADDRESS_TESTNET = "0xEF4d55D6dE8e8d73232827Cd1e9b2F2dBb45bC80" // Celo Sepolia cUSD

// Use testnet for development, mainnet for production
const isProduction = process.env.NODE_ENV === 'production'
const currentChain = isProduction ? celo : celoSepolia
const STABLE_TOKEN_ADDRESS = isProduction ? STABLE_TOKEN_ADDRESS_MAINNET : STABLE_TOKEN_ADDRESS_TESTNET

// Public client for reading blockchain data
const publicClient = createPublicClient({
  chain: currentChain,
  transport: http(),
})

export interface TaskRewardPayment {
  taskId: string
  recipientAddress: string
  amount: string
  description: string
}

/**
 * Process task reward payment in cUSD
 */
export async function processTaskReward({
  taskId,
  recipientAddress,
  amount,
  description
}: TaskRewardPayment): Promise<{ success: boolean; transactionHash?: string; error?: string }> {
  try {
    if (typeof window === 'undefined' || !window.ethereum) {
      throw new Error('No wallet detected')
    }

    const walletClient = createWalletClient({
      transport: custom(window.ethereum),
      chain: currentChain,
    })

    const [fromAddress] = await walletClient.getAddresses()
    const amountInWei = parseEther(amount)

    // Send cUSD to task completer
    const hash = await walletClient.writeContract({
      address: STABLE_TOKEN_ADDRESS,
      abi: stableTokenABI,
      functionName: 'transfer',
      account: fromAddress,
      args: [recipientAddress as `0x${string}`, amountInWei],
    })

    // Wait for transaction confirmation
    const receipt = await publicClient.waitForTransactionReceipt({
      hash,
    })

    if (receipt.status === 'success') {
      console.log(`Task reward processed: ${amount} cUSD sent to ${recipientAddress} for task ${taskId}`)
      return {
        success: true,
        transactionHash: hash
      }
    } else {
      return {
        success: false,
        error: 'Transaction failed'
      }
    }
  } catch (error) {
    console.error('Failed to process task reward:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

/**
 * Check if an address has sufficient cUSD balance for payment
 */
export async function checkSufficientBalance(
  address: string,
  requiredAmount: string
): Promise<boolean> {
  try {
    const stableTokenContract = getContract({
      abi: stableTokenABI,
      address: STABLE_TOKEN_ADDRESS,
      client: publicClient,
    })

    const balanceInBigNumber = await stableTokenContract.read.balanceOf([address as `0x${string}`])
    const balanceInWei = balanceInBigNumber.toString()
    const balanceInEthers = formatEther(balanceInWei)
    const requiredInWei = parseEther(requiredAmount)

    return BigInt(balanceInWei) >= requiredInWei
  } catch (error) {
    console.error('Failed to check balance:', error)
    return false
  }
}

/**
 * Estimate gas cost for a task reward payment
 */
export async function estimateRewardPaymentGas(
  fromAddress: string,
  toAddress: string,
  amount: string
): Promise<string> {
  try {
    const amountInWei = parseEther(amount)
    
    const gasLimit = await publicClient.estimateGas({
      account: fromAddress as `0x${string}`,
      to: STABLE_TOKEN_ADDRESS,
      data: '0x', // Transfer function data would go here in a real implementation
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

/**
 * Batch process multiple task rewards (for admin/partner bulk payments)
 */
export async function batchProcessTaskRewards(
  payments: TaskRewardPayment[]
): Promise<{ 
  successful: string[], 
  failed: { taskId: string, error: string }[] 
}> {
  const successful: string[] = []
  const failed: { taskId: string, error: string }[] = []

  for (const payment of payments) {
    const result = await processTaskReward(payment)
    
    if (result.success) {
      successful.push(payment.taskId)
    } else {
      failed.push({
        taskId: payment.taskId,
        error: result.error || 'Unknown error'
      })
    }
    
    // Add small delay between transactions to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  return { successful, failed }
}

/**
 * Get current cUSD/USD exchange rate (mock for now, would use real oracle in production)
 */
export async function getCUSDExchangeRate(): Promise<number> {
  // In a real app, this would fetch from a price oracle
  // For now, assume 1 cUSD ≈ 1 USD
  return 1.0
}

/**
 * Convert USD amount to cUSD for task rewards
 */
export async function convertUSDToCUSD(usdAmount: number): Promise<string> {
  const rate = await getCUSDExchangeRate()
  const cUSDAmount = usdAmount / rate
  return cUSDAmount.toFixed(2)
}

/**
 * Validate Celo address format
 */
export function isValidCeloAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address)
}

export {
  currentChain,
  STABLE_TOKEN_ADDRESS,
  isProduction
}
