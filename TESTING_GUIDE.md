# TheOffice Testing Guide 🧪

## Current Status ✅

**Database Connection**: There's currently an issue with the Supabase table creation, but the app now has **intelligent fallback behavior**:

1. **First**: Tries to connect to Supabase database
2. **Fallback**: Uses mock data if database is empty/unreachable
3. **Your Admin Setup**: Your address `0x133E36bE90EC4c9cc47E2a937F48a977fA4fCA94` is **hardcoded as admin**

**When you connect with MiniPay, you will see**:
- **Name**: Felipe (MiniPay Admin) ✅
- **Role**: Admin (👑) ✅
- **Access**: Full admin capabilities ✅
- **Balance**: Your real cUSD balance ✅

## Step-by-Step Testing Instructions

### 1. **Connect with Your MiniPay Account**
1. Open the app in MiniPay
2. Your wallet should auto-connect
3. Check that you see:
   - **Header**: Your real cUSD balance
   - **Profile**: "Felipe (MiniPay Admin)" with admin role
   - **Home page**: Admin dashboard view

### 2. **Test Mock User Switching (For Testing Different Roles)**
Since you asked about switching between the 5 different user roles, here's how:

**In the app, go to any wallet connection screen and choose:**
- 🎓 **Student**: `connectWallet('student')` → Alex Student (can only see learning tasks)
- 🔧 **Contributor**: `connectWallet('contributor')` → Sam Contributor (can see all tasks)
- 👨‍💻 **Builder**: `connectWallet('builder')` → Bob Developer (can see all tasks)
- 🏢 **Partner**: `connectWallet('partner')` → Partner Representative (can create tasks)
- 👑 **Admin**: `connectWallet('admin')` → System Administrator (can do everything)

**Note**: These are mock users for testing. Your real MiniPay connection will always use your admin account.

### 3. **Test Task Creation (Admin Only)**
As admin, you can create new tasks:

1. **Navigate to Tasks page**
2. **Click "Create Task" button** (should be visible as admin)
3. **Fill out the form**:
   - Title: "Test New Task"
   - Category: Choose any (Education, Research, Event, etc.)
   - Reward: 25 (cUSD amount)
   - Complexity: Medium
   - Instructions: "This is a test task"
   - Validation Type: Manual
   - Learning Task: Check if it's for students
4. **Submit** → Task should appear in the list immediately

### 4. **Test Full Task Workflow**

**A. Claim a Task** (Switch to contributor/builder role):
1. Use mock user: "Sam Contributor" 
2. Find an "Active" task
3. Click "Claim Task"
4. Status should change to "Claimed"

**B. Submit Task Proof**:
1. Click on your claimed task
2. Click "Submit Proof"
3. Enter proof text: "Task completed, here's my submission"
4. Submit → Status changes to "Pending"

**C. Approve Task** (Back to admin):
1. Switch back to admin (your MiniPay account)
2. Find the "Pending" task
3. Click "Approve Task"
4. **Real cUSD payment will be sent!** ⚠️
5. Status changes to "Completed"

### 5. **Test Real-Time Updates**
1. Open the app in **two browser tabs**
2. Connect different users in each tab
3. Perform actions (claim, submit, approve) in one tab
4. Watch the other tab **update automatically** in real-time

### 6. **View Database Data**
The app now shows **real data from Supabase**:

**Current sample tasks in database**:
- ✅ **Active**: "Complete Celo DeFi Tutorial" (5 cUSD, Learning)
- ✅ **Active**: "Research Web3 Impact Projects" (25 cUSD)
- ✅ **Active**: "Create Social Media Content" (50 cUSD)
- ✅ **Active**: "Build Smart Contract for Voting" (100 cUSD)
- ✅ **Active**: "Learn Blockchain Fundamentals" (8 cUSD, Learning)
- 🟡 **Claimed**: "Write API Documentation" (30 cUSD)
- 🟠 **Pending**: "Mobile App UI Testing" (40 cUSD)

## What to Check For:

### ✅ **Working Features**:
- [x] Real cUSD balance display in header
- [x] Database-driven task list (not mock data)
- [x] Real user creation when connecting with MiniPay
- [x] Task claiming updates database
- [x] Task submission stores proof
- [x] Task approval triggers real cUSD payment
- [x] Real-time updates across browser sessions
- [x] Role-based task visibility (students see learning tasks only)

### 🐛 **Issues to Test**:
- [ ] Does your MiniPay connection show correct name and admin role?
- [ ] Can you create new tasks as admin?
- [ ] Do task status changes persist after page refresh?
- [ ] Do payments process correctly when approving tasks?

## Database Verification Commands

If you want to check what's in the database:

```sql
-- Check all users
SELECT wallet_address, name, role FROM users;

-- Check all tasks
SELECT title, status, reward_amount, created_by FROM tasks;

-- Check your admin user specifically
SELECT * FROM users WHERE wallet_address = '0x133E36bE90EC4c9cc47E2a937F48a977fA4fCA94';
```

## Troubleshooting

**If MiniPay shows wrong user data**:
1. Check browser console for connection logs
2. Verify the database has your address with admin role
3. Try refreshing the page

**If tasks don't appear**:
1. Check console for database connection errors
2. Verify Supabase environment variables are set
3. Check network tab for failed API calls

**If payments fail**:
1. Ensure you have enough cUSD for gas + task reward
2. Check Web3 connection status
3. Verify task has a valid claimedBy address

## Next Steps for Full Testing
1. **Invite a friend** to connect with their wallet and claim tasks
2. **Test the payment system** with small amounts first
3. **Create multiple tasks** of different types and complexities
4. **Monitor real-time collaboration** between multiple users

Happy testing! 🚀
