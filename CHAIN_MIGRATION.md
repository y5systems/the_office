# 🔄 Chain Migration: Alfajores → Celo Sepolia

## Overview
This document outlines the migration from Celo Alfajores testnet to **Celo Sepolia testnet** (the new official Celo testnet).

## ✅ Migration Complete

### Chain Details
- **Network Name**: Celo Sepolia  
- **Chain ID**: `11142220`
- **RPC URL**: `https://forno.celo-sepolia.celo-testnet.org`
- **Block Explorer**: https://sepolia.celoscan.io

### Token Addresses (Celo Sepolia)
- **cUSD**: `0xEF4d55D6dE8e8d73232827Cd1e9b2F2dBb45bC80`
- **USDC**: `0x01C5C0122039549AD1493B8220cABEdD739BC44E`

## 🔧 Files Updated

### 1. **Chain Import Update**
- **Change**: Now importing `celoSepolia` directly from `viem/chains`
- **Benefit**: Uses the official chain definition from viem
- **Removed**: Custom `lib/chains.ts` file (not needed)

### 2. **Web3 Services**  
- **File**: `lib/web3-services.ts`
- **Changes**: 
  - Import `celoSepolia` instead of `celoAlfajores`
  - Updated testnet cUSD address to Sepolia version
  - Updated chain configuration

### 3. **Web3 Hook**
- **File**: `hooks/use-web3.ts`  
- **Changes**:
  - Import `celoSepolia` instead of `celoAlfajores`
  - Updated testnet cUSD address to Sepolia version
  - Updated chain configuration

### 4. **Documentation Updates**
- **File**: `WARP.md` - Updated testnet references
- **File**: `MINIPAY_INTEGRATION.md` - Updated chain references and faucet link

## 🎯 Impact on Balaio App

### Development Environment
- **Previous**: Celo Alfajores (Chain ID: 44787)
- **Current**: Celo Sepolia (Chain ID: 11142220)
- **cUSD Address**: Updated to Sepolia version

### Production Environment  
- **No Changes**: Still uses Celo Mainnet for production
- **Environment detection**: Controlled by `NODE_ENV` variable

## 🧪 Testing Requirements

After migration, test the following:

1. **Wallet Connections**
   - MiniPay auto-connection
   - MetaMask/Valora manual connection
   - Correct network switching

2. **Token Operations**
   - cUSD balance reading
   - Task reward payments
   - Gas estimation

3. **Chain-specific Features**
   - Block explorer links
   - Transaction confirmations
   - Network validation

## 🔗 Resources

- **Faucet**: https://faucet.celo.org (for test tokens)
- **Explorer**: https://sepolia.celoscan.io
- **RPC**: https://forno.celo-sepolia.celo-testnet.org
- **Celo Docs**: https://docs.celo.org

## ⚠️ Breaking Changes

Users testing on the old Alfajores testnet will need to:
1. Switch their wallet to Celo Sepolia network
2. Get new test tokens from the Sepolia faucet
3. Update any hardcoded references to Alfajores

## 🚀 Next Steps

1. **Test the migration** by running the development server
2. **Verify wallet connections** work on Sepolia
3. **Update any CI/CD** configurations if needed
4. **Communicate changes** to developers and testers

### 📚 **Files Modified:**
- ✏️ `lib/web3-services.ts` - Updated to import `celoSepolia` from viem/chains and use Sepolia cUSD address
- ✏️ `hooks/use-web3.ts` - Updated to import `celoSepolia` from viem/chains and use Sepolia cUSD address  
- ✏️ `WARP.md` - Updated testnet references from Alfajores to Sepolia
- ✏️ `MINIPAY_INTEGRATION.md` - Updated chain references and faucet links
- 🆕 `CHAIN_MIGRATION.md` - This migration documentation
- ❌ `lib/chains.ts` - Removed (not needed, using built-in viem chain)

---

*Migration completed on 2025-09-16. All Web3 functionality now uses Celo Sepolia testnet by default in development.*
