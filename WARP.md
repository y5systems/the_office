# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Balaio is a Web3 Learn2Earn task management platform built on the Celo blockchain with a distinctive pixel art aesthetic and mobile-first approach. The platform connects learners with earning opportunities through a comprehensive task-based system.

**Current Status**: Phase 1 complete (Core UI/UX with mock data), ready for Phase 2 (Celo blockchain integration)

## Architecture & Technical Stack

### Frontend Architecture
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript with strict mode enabled
- **Styling**: Tailwind CSS with custom pixel art design system
- **State Management**: React Context API via `AppProvider`
- **UI Components**: Radix UI primitives with custom pixel styling
- **Icons**: Lucide React

### Key Architectural Patterns

#### Central State Management
All application state is managed through `components/providers/app-provider.tsx` which provides:
- User authentication and roles (5 user types: admin, partner, contributor, builder, student, anon)
- Task lifecycle management (Create → Claim → Submit → Review → Complete)
- Organization management
- Mock data for development
- Role-based access control

#### Pixel Art Design System
The entire UI follows a consistent pixel art aesthetic defined in `app/globals.css`:
- Custom CSS classes: `.pixel-button`, `.pixel-card`, `.pixel-border`, `.pixel-input`
- Responsive pixel borders (2px mobile → 4px desktop)
- Color palette: `--yellow-soft`, `--pink-soft`, `--green-soft`, `--navy-dark`, `--cream`
- Typography: Courier New monospace family
- Mobile-first with 44px minimum touch targets

## Common Development Commands

### Basic Development
```bash
pnpm run dev         # Start development server (localhost:3000)
pnpm run build       # Build production version
pnpm run start       # Run production build
pnpm run lint        # Run Next.js ESLint
pnpm install         # Install dependencies
```

### MiniPay Testing
```bash
# For MiniPay testing with ngrok
npm install -g ngrok # Install ngrok globally
pnpm run dev         # Start development server
ngrok http 3000      # Expose local server (in separate terminal)
# Use the ngrok URL in MiniPay app
```

### Important Development Notes
- **Package Manager**: Uses pnpm (lock file present) - npm will fail due to workspace dependencies
- **Web3 Integration**: Auto-connects in MiniPay environment, shows connect button otherwise
- **Environment**: Testnet (Celo Sepolia) for development, mainnet for production
- ESLint and TypeScript errors are ignored during builds (configured for rapid prototyping)
- Images are unoptimized for deployment flexibility

## User Role System & Task Management

### User Types & Capabilities
1. **Students**: Learn Web3 (5-25 cUSD/task) → Need 5 learning tasks to unlock contributor status
2. **Contributors**: General tasks (10-200+ cUSD/task)
3. **Builders**: Technical tasks (50-500+ cUSD/task)  
4. **Organizations (Partners)**: Create and manage tasks
5. **Administrators**: Platform management

### Task Lifecycle Implementation
Tasks follow a strict workflow implemented in the AppProvider:
```
Active → Claimed → Pending → Completed
```

Task validation types: Manual Review, File Upload, URL Submission, Auto Verification

## Component Structure & Navigation

### Main Application Components
- `HomePage.tsx`: Role-based dashboard and landing
- `TasksPage.tsx` / `TasksView.tsx`: Task browsing and management
- `ProfilePage.tsx`: User profiles with Celo Star rankings
- `AdminDashboard.tsx`: Platform administration
- `OrganizationProfilePage.tsx`: Organization profiles

### Navigation System
- Desktop: Tab-based navigation (`TabNavigation.tsx`)
- Mobile: Bottom navigation bar (`BottomNavigation.tsx`)
- Responsive breakpoint: 768px (handled by `useIsMobile` hook)

## Mobile-First Design Principles

### Responsive Breakpoints
```css
Mobile: < 768px (primary target)
Tablet: 768px - 1024px  
Desktop: 1024px+
Large: 1280px+
```

### Touch Target Requirements
- Minimum 44px touch targets on mobile
- Progressive enhancement for larger screens
- Pixel borders scale: 2px → 3px → 4px based on screen size

## Web3 Integration Status

### MiniPay Integration Complete ✅
- **Real Web3 Integration**: Full MiniPay compatibility with auto-connection
- **Auto-Detection**: Detects MiniPay environment via `window.ethereum.isMiniPay`
- **Real cUSD Payments**: Task rewards paid in actual cUSD tokens
- **Multi-Wallet Support**: MetaMask, Valora, MiniPay with fallback options
- **Environment Adaptive**: Testnet (Celo Sepolia) for development, mainnet for production

### Key Web3 Components
- `hooks/use-web3.ts`: Core Web3 functionality and MiniPay detection
- `lib/web3-services.ts`: Payment processing and blockchain interactions
- `ComposerWallet.tsx`: Auto-hides in MiniPay, shows balance when connected
- Real cUSD contract integration with gas estimation and fee abstraction

## Gamification System

### Celo Star Rankings (Orkut-style)
Users are rated across categories in the `celoStarRankings` object:
- `responsive`: Communication & availability (1-5)
- `shipper`: On-time delivery performance (1-5)  
- `trustful`: Reliability and trustworthiness (1-5)

### Achievement System
- Early Adopter, Task Master, High Earner, Consistent, Contributor Badge
- Implemented as flags in user profile data

## Development Guidelines

### Code Style & Patterns
- Follow existing pixel aesthetic in new components
- Maintain mobile-first responsive design
- Use TypeScript interfaces for all data structures
- Leverage existing custom hooks: `useIsMobile`, `useToast`
- Follow role-based component visibility patterns

### State Management Pattern
New features should integrate with the central AppProvider pattern:
```typescript
// Add to AppContextType interface
// Implement in AppProvider
// Access via useApp() hook
```

### Custom CSS Classes
When creating new UI elements, use existing pixel classes:
- `.pixel-button` for interactive elements
- `.pixel-card` for content containers  
- `.pixel-border` for standalone borders
- `.pixel-input` for form inputs

### Important Files to Understand
- `components/providers/app-provider.tsx` (506 lines) - Core application logic
- `app/globals.css` (300+ lines) - Complete design system implementation
- `components/HomePage.tsx` - Role-based UI patterns
- `hooks/use-mobile.tsx` - Responsive behavior patterns

## Future Integration Points

### Blockchain Features (Phase 2 Roadmap)
- Smart contract deployment for task management
- Automated cUSD payment distribution  
- On-chain task verification and completion
- Real wallet authentication replacing mock system

### Scalability Considerations
- Component architecture supports expansion
- Design system scales across breakpoints
- State management ready for real-time updates
- Role-based permissions system extensible

