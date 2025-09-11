-- TheOffice Database Setup SQL
-- Copy and paste this entire file into the Supabase SQL Editor

-- Drop existing tables if they exist (clean slate)
DROP TABLE IF EXISTS tasks CASCADE;
DROP TABLE IF EXISTS organizations CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS opportunities CASCADE;
DROP TABLE IF EXISTS blog_posts CASCADE;
DROP TABLE IF EXISTS transactions CASCADE;

-- Create users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    wallet_address TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'contributor' CHECK (role IN ('admin', 'partner', 'contributor', 'builder', 'student', 'anon')),
    avatar TEXT,
    organization_name TEXT,
    total_earned DECIMAL(10,2) DEFAULT 0,
    tasks_completed INTEGER DEFAULT 0,
    tasks_created INTEGER DEFAULT 0,
    rewards_distributed DECIMAL(10,2) DEFAULT 0,
    users_managed INTEGER DEFAULT 0,
    total_platform_value DECIMAL(10,2) DEFAULT 0,
    contributor_badge_earned BOOLEAN DEFAULT FALSE,
    celo_star_rankings JSONB DEFAULT '{"responsive": 3, "shipper": 3, "trustful": 3}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create organizations table
CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    website TEXT,
    location TEXT NOT NULL,
    avatar TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Technology', 'Education', 'Sustainability', 'Healthcare', 'Finance', 'Other')),
    team_size INTEGER DEFAULT 1,
    founded TEXT,
    mission TEXT NOT NULL,
    tags TEXT[] DEFAULT '{}',
    social_links JSONB DEFAULT '{}',
    contact_email TEXT NOT NULL,
    is_public BOOLEAN DEFAULT TRUE,
    created_by TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tasks table
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Education', 'Research', 'Event', 'Partner Task', 'Other')),
    reward_amount DECIMAL(10,2) NOT NULL,
    complexity TEXT NOT NULL CHECK (complexity IN ('Low', 'Medium', 'High')),
    validation_type TEXT NOT NULL CHECK (validation_type IN ('Manual', 'File Upload', 'Auto', 'URL Submission')),
    slots INTEGER DEFAULT 1,
    deadline TIMESTAMP WITH TIME ZONE,
    status TEXT NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Claimed', 'Pending', 'Completed')),
    created_by TEXT NOT NULL,
    claimed_by TEXT,
    submitted_proof TEXT,
    tags TEXT[] DEFAULT '{}',
    is_learning_task BOOLEAN DEFAULT FALSE,
    organization_id UUID REFERENCES organizations(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create opportunities table
CREATE TABLE opportunities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('Grant', 'Hackathon', 'Job', 'Internship', 'Partnership')),
    reward TEXT,
    deadline DATE,
    organization TEXT NOT NULL,
    link TEXT NOT NULL,
    tags TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog_posts table
CREATE TABLE blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    author TEXT NOT NULL,
    published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    read_time TEXT DEFAULT '5 min read',
    image TEXT,
    tags TEXT[] DEFAULT '{}',
    thumbnail TEXT,
    content TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create transactions table (for tracking payments)
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id UUID REFERENCES tasks(id),
    from_address TEXT NOT NULL,
    to_address TEXT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'cUSD',
    transaction_hash TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'failed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_users_wallet_address ON users(wallet_address);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_category ON tasks(category);
CREATE INDEX idx_tasks_created_by ON tasks(created_by);
CREATE INDEX idx_tasks_claimed_by ON tasks(claimed_by);
CREATE INDEX idx_tasks_is_learning ON tasks(is_learning_task);
CREATE INDEX idx_organizations_public ON organizations(is_public);
CREATE INDEX idx_organizations_category ON organizations(category);
CREATE INDEX idx_transactions_task_id ON transactions(task_id);
CREATE INDEX idx_transactions_addresses ON transactions(from_address, to_address);

-- Insert sample data

-- Insert your admin user
INSERT INTO users (wallet_address, name, role, avatar, total_earned, tasks_completed, contributor_badge_earned, celo_star_rankings)
VALUES 
('0x133E36bE90EC4c9cc47E2a937F48a977fA4fCA94', 'Felipe (Admin)', 'admin', '👑', 0, 0, true, '{"responsive": 5, "shipper": 5, "trustful": 5}');

-- Insert sample users for testing
INSERT INTO users (wallet_address, name, role, avatar, total_earned, tasks_completed, contributor_badge_earned, celo_star_rankings)
VALUES 
('0xSYSTEM1234567890', 'System Admin', 'admin', '👑', 0, 0, true, '{"responsive": 5, "shipper": 5, "trustful": 5}'),
('0xPARTNER123456789', 'TheOffice Partner', 'partner', '🏢', 0, 0, true, '{"responsive": 4, "shipper": 3, "trustful": 5}'),
('0xCONTRIBUTOR123456', 'Alice Contributor', 'contributor', '🔧', 150, 8, true, '{"responsive": 4, "shipper": 5, "trustful": 4}'),
('0xBUILDER123456789', 'Bob Developer', 'builder', '👨‍💻', 350, 5, true, '{"responsive": 5, "shipper": 4, "trustful": 4}'),
('0xSTUDENT123456789', 'Carol Student', 'student', '🎓', 15, 3, false, '{"responsive": 3, "shipper": 2, "trustful": 4}');

-- Insert sample organization
INSERT INTO organizations (name, description, location, avatar, category, team_size, founded, mission, tags, social_links, contact_email, is_public, created_by)
VALUES 
('TheOffice Labs', 'Web3 co-working space and incubator in Rio de Janeiro', 'Rio de Janeiro, Brazil', '🏢', 'Technology', 25, '2022', 'Fostering innovation and collaboration in the Web3 space', ARRAY['Web3', 'Coworking', 'Incubator'], '{"twitter": "https://twitter.com/theoffice", "discord": "https://discord.gg/theoffice"}', 'contact@theoffice.xyz', true, (SELECT id FROM users WHERE wallet_address = '0xSYSTEM1234567890'));

-- Insert sample tasks with different statuses
-- First insert Active tasks
INSERT INTO tasks (title, description, category, reward_amount, complexity, validation_type, slots, deadline, status, created_by, tags, is_learning_task)
VALUES 
('Complete Celo DeFi Tutorial', 'Complete the comprehensive Celo DeFi tutorial and submit the completion certificate URL. Learn about yield farming, lending protocols, and decentralized exchanges on Celo.', 'Education', 5.00, 'Low', 'URL Submission', 10, '2024-03-15 23:59:59', 'Active', (SELECT id FROM users WHERE wallet_address = '0xSYSTEM1234567890'), ARRAY['DeFi', 'Tutorial', 'Beginner'], true),
('Research Web3 Impact Projects', 'Research and document 5 Web3 projects making social impact in developing countries. Create a comprehensive 2-page report with analysis and recommendations.', 'Research', 25.00, 'Medium', 'File Upload', 3, '2024-03-20 23:59:59', 'Active', (SELECT id FROM users WHERE wallet_address = '0xPARTNER123456789'), ARRAY['Research', 'Impact', 'Web3'], false),
('Create Social Media Content for Sustainability', 'Design 3 Instagram posts about sustainable farming practices in the Chapada region. Include compelling visuals and educational content.', 'Partner Task', 50.00, 'Medium', 'Manual', 2, '2024-02-28 23:59:59', 'Active', (SELECT id FROM users WHERE wallet_address = '0xPARTNER123456789'), ARRAY['Design', 'Social Media', 'Sustainability'], false),
('Build Smart Contract for Voting', 'Create a secure decentralized voting smart contract with proper access controls and audit mechanisms. Include comprehensive tests.', 'Other', 100.00, 'High', 'File Upload', 1, '2024-03-05 23:59:59', 'Active', (SELECT id FROM users WHERE wallet_address = '0xSYSTEM1234567890'), ARRAY['Smart Contract', 'Voting', 'Security'], false),
('Learn Blockchain Fundamentals', 'Complete the introduction to blockchain technology course and pass the final quiz with at least 80% score.', 'Education', 8.00, 'Low', 'URL Submission', 15, '2024-03-10 23:59:59', 'Active', (SELECT id FROM users WHERE wallet_address = '0xSYSTEM1234567890'), ARRAY['Blockchain', 'Fundamentals', 'Learning'], true);

-- Insert Claimed task (includes claimed_by)
INSERT INTO tasks (title, description, category, reward_amount, complexity, validation_type, slots, deadline, status, created_by, claimed_by, tags, is_learning_task)
VALUES 
('Write API Documentation', 'Create comprehensive documentation for the new REST API endpoints including examples and best practices.', 'Education', 30.00, 'Medium', 'File Upload', 1, '2024-03-01 23:59:59', 'Claimed', (SELECT id FROM users WHERE wallet_address = '0xSYSTEM1234567890'), (SELECT id FROM users WHERE wallet_address = '0xCONTRIBUTOR123456'), ARRAY['Documentation', 'API', 'Technical Writing'], false);

-- Insert Pending task (includes claimed_by and submitted_proof)
INSERT INTO tasks (title, description, category, reward_amount, complexity, validation_type, slots, deadline, status, created_by, claimed_by, submitted_proof, tags, is_learning_task)
VALUES 
('Mobile App UI Testing', 'Test the new mobile app interface on different devices and screen sizes. Submit a detailed bug report with screenshots.', 'Other', 40.00, 'Low', 'File Upload', 2, '2024-02-25 23:59:59', 'Pending', (SELECT id FROM users WHERE wallet_address = '0xPARTNER123456789'), (SELECT id FROM users WHERE wallet_address = '0xBUILDER123456789'), 'Bug report submitted with 15 issues found and documented with screenshots', ARRAY['Testing', 'Mobile', 'UI'], false);

-- Insert Completed task (includes claimed_by and submitted_proof)
INSERT INTO tasks (title, description, category, reward_amount, complexity, validation_type, slots, deadline, status, created_by, claimed_by, submitted_proof, tags, is_learning_task)
VALUES 
('Create Landing Page Design', 'Design a modern, responsive landing page for the new Web3 education platform. Include wireframes and high-fidelity mockups.', 'Other', 75.00, 'Medium', 'File Upload', 1, '2024-02-15 23:59:59', 'Completed', (SELECT id FROM users WHERE wallet_address = '0xSYSTEM1234567890'), (SELECT id FROM users WHERE wallet_address = '0xCONTRIBUTOR123456'), 'Design files submitted including wireframes, mockups, and assets', ARRAY['Design', 'UI/UX', 'Web3'], false);

-- Insert sample opportunities
INSERT INTO opportunities (title, description, type, reward, deadline, organization, link, tags)
VALUES 
('Celo Climate Collective Grant', 'Funding for climate-focused projects on Celo blockchain', 'Grant', 'Up to $50,000', '2024-03-15', 'Celo Foundation', 'https://celo.org/grants', ARRAY['Climate', 'Grant', 'Celo']),
('Web3 Developer Internship', '3-month internship program for blockchain developers', 'Internship', '$2,000/month', '2024-02-28', 'TheOffice Labs', '#', ARRAY['Internship', 'Developer', 'Blockchain']),
('DeFi Innovation Hackathon', 'Build the next generation of DeFi applications', 'Hackathon', '$25,000 prize pool', '2024-04-01', 'DeFi Alliance', '#', ARRAY['Hackathon', 'DeFi', 'Innovation']);

-- Insert sample blog posts
INSERT INTO blog_posts (title, excerpt, author, published_at, read_time, tags, thumbnail)
VALUES 
('The Future of Learn2Earn in Web3', 'Exploring how blockchain technology is revolutionizing education and creating new opportunities for learners worldwide.', 'Maria Santos', '2024-01-10T12:00:00Z', '5 min read', ARRAY['Learn2Earn', 'Web3', 'Education'], '/placeholder.svg?height=200&width=300'),
('Building Sustainable DeFi on Celo', 'A deep dive into creating environmentally conscious decentralized finance applications on the Celo blockchain.', 'Carlos Tech', '2024-01-08T15:30:00Z', '8 min read', ARRAY['DeFi', 'Celo', 'Sustainability'], '/placeholder.svg?height=200&width=300');

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (adjust as needed)
CREATE POLICY "Users are viewable by everyone" ON users FOR SELECT USING (true);
CREATE POLICY "Organizations are viewable by everyone" ON organizations FOR SELECT USING (true);
CREATE POLICY "Tasks are viewable by everyone" ON tasks FOR SELECT USING (true);
CREATE POLICY "Opportunities are viewable by everyone" ON opportunities FOR SELECT USING (true);
CREATE POLICY "Blog posts are viewable by everyone" ON blog_posts FOR SELECT USING (true);
CREATE POLICY "Transactions are viewable by everyone" ON transactions FOR SELECT USING (true);

-- Create policies for authenticated users to insert/update
CREATE POLICY "Users can insert their own data" ON users FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update their own data" ON users FOR UPDATE USING (true);
CREATE POLICY "Organizations can be created by anyone" ON organizations FOR INSERT WITH CHECK (true);
CREATE POLICY "Organizations can be updated by anyone" ON organizations FOR UPDATE USING (true);
CREATE POLICY "Tasks can be created by anyone" ON tasks FOR INSERT WITH CHECK (true);
CREATE POLICY "Tasks can be updated by anyone" ON tasks FOR UPDATE USING (true);
CREATE POLICY "Transactions can be created by anyone" ON transactions FOR INSERT WITH CHECK (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at columns
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON organizations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_opportunities_updated_at BEFORE UPDATE ON opportunities FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_transactions_updated_at BEFORE UPDATE ON transactions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Success message
SELECT 'TheOffice database setup completed successfully! 🎉' as message;
