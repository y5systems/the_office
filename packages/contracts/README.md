# Balaio Smart Contracts

Smart contracts for the Balaio Learn2Earn platform, implementing a secure escrow system for task payments on the Celo blockchain.

## Overview

The BalaioEscrow contract provides:
- Multi-token support (cUSD, USDC, USDT)
- Secure fund escrow for tasks
- Platform fee management
- Admin controls for dispute resolution
- Batch operations for efficiency

See [ESCROW_ARCHITECTURE.md](../../ESCROW_ARCHITECTURE.md) for detailed architecture documentation.

## Setup

### Prerequisites
- Foundry installed ([Installation Guide](https://book.getfoundry.sh/getting-started/installation))
- Node.js 18+
- pnpm

### Installation

From the root of the monorepo:
```bash
pnpm install
```

### Configuration

1. Copy the environment template:
```bash
cp .env.example .env
```

2. Configure your `.env` file:
```
PRIVATE_KEY=your_private_key_without_0x
CELOSCAN_API_KEY=your_celoscan_api_key
PLATFORM_WALLET=platform_fee_recipient_address
ADMIN_ADDRESS=admin_address
```

## Development

### Build Contracts
```bash
pnpm build
# or
forge build
```

### Run Tests
```bash
pnpm test
# or with gas report
pnpm gas
# or watch mode
pnpm test:watch
```

### Format Code
```bash
forge fmt
```

## Testing

### Run All Tests
```bash
forge test
```

### Run Specific Test
```bash
forge test --match-test testDeposit
```

### Test with Verbosity
```bash
forge test -vvvv  # Maximum verbosity
```

### Coverage Report
```bash
forge coverage
```

## Deployment

### Deploy to Celo Testnet (Alfajores)
```bash
forge script script/Deploy.s.sol --rpc-url celo-testnet --broadcast --verify
```

### Deploy to Celo Mainnet
```bash
forge script script/Deploy.s.sol --rpc-url celo --broadcast --verify
```

### Local Testing with Anvil
```bash
# Start local fork of Celo
pnpm anvil

# In another terminal, deploy locally
forge script script/Deploy.s.sol --rpc-url http://localhost:8545 --broadcast
```

## Contract Addresses

### Celo Testnet (Alfajores)
- BalaioEscrow: `TBD`
- cUSD: `0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1`
- USDC: `0x2F25deB3848C207fc8E0c34035B3Ba7fC157602B`
- USDT: `0x02De4766C272abc10Bc88c220D214A26960a7e92`

### Celo Mainnet
- BalaioEscrow: `TBD`
- cUSD: `0x765DE816845861e75A25fCA122bb6898B8B1282a`
- USDC: `0x37f750B7cC259A2f741AF45294f6a16572CF5cAd`
- USDT: `0x48065fbbe25f71C9282ddf5e1cD6D6A887483D5e`

## Gas Optimization

The contracts are optimized for Celo's low gas fees:
- Efficient storage packing
- Batch operations for multiple tasks
- Minimal on-chain data storage

## Security

Security measures implemented:
- ReentrancyGuard for withdrawal functions
- SafeERC20 for token transfers
- Pausable for emergency situations
- Input validation and access controls

## Scripts

### Available NPM Scripts
- `pnpm build` - Compile contracts
- `pnpm test` - Run all tests
- `pnpm test:watch` - Run tests in watch mode
- `pnpm test:coverage` - Generate coverage report
- `pnpm deploy:testnet` - Deploy to Alfajores testnet
- `pnpm deploy:mainnet` - Deploy to Celo mainnet
- `pnpm clean` - Clean build artifacts
- `pnpm fmt` - Format Solidity code
- `pnpm gas` - Generate gas report
- `pnpm snapshot` - Create gas snapshots
- `pnpm anvil` - Start local Celo fork

## License

MIT
