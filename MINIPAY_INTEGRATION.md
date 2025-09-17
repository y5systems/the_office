# Balaio MiniPay Integration Guide

This document explains how Balaio app is integrated with Celo MiniPay for seamless Web3 functionality.

## 🎯 Integration Overview

Balaio now supports full MiniPay integration, enabling users to:
- **Auto-login** when accessed through MiniPay
- **Real cUSD payments** for task rewards
- **Seamless wallet connection** without manual wallet selection
- **Fallback support** for other Celo wallets (MetaMask, Valora)

## 🛠 Technical Implementation

### Core Components

#### 1. Web3 Hook (`hooks/use-web3.ts`)
- Detects MiniPay environment via `window.ethereum.isMiniPay`
- Auto-connects when MiniPay is detected
- Handles cUSD balance checks and payments
- Supports both testnet (Alfajores) and mainnet

#### 2. AppProvider Updates (`components/providers/app-provider.tsx`)
- Integrates Web3 state into app context
- Auto-creates user profiles for Web3 connections
- Processes real cUSD payments for task approvals
- Maintains backward compatibility with mock data

#### 3. ComposerWallet Component (`components/ComposerWallet.tsx`)
- Hides connect button in MiniPay (auto-connected)
- Shows user balance when connected
- Provides fallback wallet selection for other wallets

#### 4. Web3 Services (`lib/web3-services.ts`)
- Task reward payment processing
- Gas estimation for cUSD transactions
- Batch payment capabilities
- Balance validation utilities

## 🚀 User Experience

### In MiniPay Environment
1. User opens Balaio app in MiniPay
2. App automatically detects MiniPay wallet
3. User is logged in without any action required
4. Real cUSD balance is displayed
5. Task rewards are paid in real cUSD

### In Other Environments
1. User sees "Connect Wallet" button
2. Can choose from available wallets (MetaMask, Valora, etc.)
3. Same functionality with real Web3 integration

## 🔧 Configuration

### Environment Variables
The app automatically detects environment:
- **Development**: Uses Celo Alfajores testnet
- **Production**: Uses Celo mainnet

### Contract Addresses
```typescript
// Mainnet cUSD
const STABLE_TOKEN_ADDRESS_MAINNET = "0x765DE816845861e75A25fCA122bb6898B8B1282a"

// Testnet cUSD (Alfajores)
const STABLE_TOKEN_ADDRESS_TESTNET = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1"
```

## 🧪 Testing

### Testing with MiniPay

1. **Setup ngrok for local testing:**
   ```bash
   # Install ngrok if not already installed
   npm install -g ngrok
   
   # Start your development server
   npm run dev
   
   # In another terminal, expose your local server
   ngrok http 3000
   ```

2. **Access via MiniPay:**
   - Copy the ngrok URL (e.g., `https://abc123.ngrok.io`)
   - Open MiniPay app on your mobile device
   - Navigate to the ngrok URL
   - The app should auto-connect without showing login button

### Testing with Other Wallets

1. **Desktop testing:**
   ```bash
   npm run dev
   ```
   - Open `http://localhost:3000` in browser with MetaMask
   - Click "Connect Wallet" and select MetaMask

2. **Mobile testing:**
   - Use ngrok as above
   - Access via Valora's dApp browser

## 💰 Task Reward Flow

### For Task Creators (Partners/Admins)
1. Create task with cUSD reward amount
2. When approving completed tasks, real cUSD is transferred
3. Balance is deducted from creator's wallet
4. Transaction hash is logged for verification

### For Task Workers
1. Complete tasks normally
2. Submit work for review
3. Upon approval, receive real cUSD in wallet
4. Balance updates automatically

### Example Payment Flow
```typescript
// When admin approves a task
const approveTask = async (taskId: string) => {
  const task = tasks.find(t => t.id === taskId)
  
  // Process real cUSD payment
  const paymentResult = await web3.sendCUSD(
    task.claimedBy,     // Worker's wallet address
    task.reward.toString() // Reward amount in cUSD
  )
  
  if (paymentResult) {
    // Mark task as completed
    // Update balances
    // Log transaction
  }
}
```

## 🔍 Debugging

### Common Issues

1. **MiniPay not detected:**
   - Check if `window.ethereum.isMiniPay` is true
   - Ensure accessing via MiniPay app, not external browser

2. **Auto-connection not working:**
   - Verify ngrok URL is accessible
   - Check browser console for Web3 errors
   - Ensure MiniPay has sufficient cUSD for gas

3. **Payment failures:**
   - Check wallet has sufficient cUSD balance
   - Verify network connectivity
   - Check gas estimation errors

### Debug Logs
```typescript
// Enable detailed Web3 logging
console.log('Web3 State:', {
  isConnected: web3.isConnected,
  address: web3.address,
  balance: web3.balance,
  isMiniPay: web3.isMiniPay
})
```

## 🚦 Deployment Considerations

### For Production Deployment

1. **Update environment detection:**
   ```typescript
   const isProduction = process.env.NODE_ENV === 'production'
   const currentChain = isProduction ? celo : celoSepolia
   ```

2. **SSL/HTTPS required:**
   - MiniPay requires HTTPS for Web3 functionality
   - Ensure your domain has valid SSL certificate

3. **Gas optimization:**
   - Consider implementing gas price optimization
   - Use cUSD for transaction fees (fee abstraction)

### Security Considerations

1. **Wallet validation:**
   - Always validate wallet addresses
   - Implement transaction confirmation flows
   - Add spending limits for high-value transactions

2. **Error handling:**
   - Graceful fallbacks when Web3 fails
   - User-friendly error messages
   - Transaction retry mechanisms

## 📚 API Reference

### Web3 Hook Interface
```typescript
interface Web3State {
  isConnected: boolean
  address: string | null
  balance: string | null
  isMiniPay: boolean
  isLoading: boolean
  sendCUSD: (toAddress: string, amount: string) => Promise<string>
  refreshBalance: () => Promise<void>
}
```

### Task Reward Payment Interface
```typescript
interface TaskRewardPayment {
  taskId: string
  recipientAddress: string
  amount: string
  description: string
}
```

## 🎉 Success Metrics

Integration success can be measured by:
- **Auto-connection rate** in MiniPay environment
- **Payment success rate** for task rewards
- **User retention** (Web3 vs non-Web3 users)
- **Transaction volume** in cUSD

## 🔗 Additional Resources

- [MiniPay Developer Docs](https://docs.celo.org/developer/build-on-minipay)
- [Celo Sepolia Faucet](https://faucet.celo.org) - Get test cUSD
- [Celo Explorer](https://explorer.celo.org) - Track transactions
- [Viem Documentation](https://viem.sh) - Web3 library used

---

The integration is now complete and ready for testing! MiniPay users will have a seamless experience with automatic wallet connection and real cUSD rewards for task completion.
