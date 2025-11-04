-- EchoForge Database Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Content Sources Table
CREATE TABLE IF NOT EXISTS content_sources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content_type TEXT NOT NULL CHECK (content_type IN ('text', 'image', 'video', 'audio', 'url')),
  source_content TEXT NOT NULL,
  source_url TEXT,
  file_url TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Brand Voice Profiles Table
CREATE TABLE IF NOT EXISTS brand_voice_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  tone TEXT NOT NULL,
  style_guide TEXT,
  target_audience TEXT,
  example_texts TEXT[] DEFAULT '{}',
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Generated Content Table
CREATE TABLE IF NOT EXISTS generated_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  source_id UUID REFERENCES content_sources(id) ON DELETE CASCADE,
  brand_voice_id UUID REFERENCES brand_voice_profiles(id) ON DELETE SET NULL,
  platform TEXT NOT NULL CHECK (platform IN ('twitter', 'linkedin', 'instagram', 'email', 'blog', 'facebook')),
  format TEXT NOT NULL,
  generated_text TEXT NOT NULL,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'edited', 'exported')),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Credits Table
CREATE TABLE IF NOT EXISTS user_credits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  total_credits INTEGER DEFAULT 100,
  used_credits INTEGER DEFAULT 0,
  remaining_credits INTEGER GENERATED ALWAYS AS (total_credits - used_credits) STORED,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Credit Usage History Table
CREATE TABLE IF NOT EXISTS credit_usage_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  operation_type TEXT NOT NULL CHECK (operation_type IN ('upload', 'generate', 'regenerate')),
  credits_used INTEGER NOT NULL,
  description TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Generation History Table
CREATE TABLE IF NOT EXISTS generation_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  source_id UUID REFERENCES content_sources(id) ON DELETE CASCADE,
  platforms_generated TEXT[] DEFAULT '{}',
  total_outputs INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_content_sources_user_id ON content_sources(user_id);
CREATE INDEX IF NOT EXISTS idx_content_sources_created_at ON content_sources(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_brand_voice_profiles_user_id ON brand_voice_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_generated_content_user_id ON generated_content(user_id);
CREATE INDEX IF NOT EXISTS idx_generated_content_source_id ON generated_content(source_id);
CREATE INDEX IF NOT EXISTS idx_credit_usage_history_user_id ON credit_usage_history(user_id);
CREATE INDEX IF NOT EXISTS idx_generation_history_user_id ON generation_history(user_id);

-- Row Level Security (RLS) Policies

-- Enable RLS
ALTER TABLE content_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE brand_voice_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE generated_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE credit_usage_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE generation_history ENABLE ROW LEVEL SECURITY;

-- Content Sources Policies
CREATE POLICY "Users can view their own content sources"
  ON content_sources FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own content sources"
  ON content_sources FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own content sources"
  ON content_sources FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own content sources"
  ON content_sources FOR DELETE
  USING (auth.uid() = user_id);

-- Brand Voice Profiles Policies
CREATE POLICY "Users can view their own brand voice profiles"
  ON brand_voice_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own brand voice profiles"
  ON brand_voice_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own brand voice profiles"
  ON brand_voice_profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own brand voice profiles"
  ON brand_voice_profiles FOR DELETE
  USING (auth.uid() = user_id);

-- Generated Content Policies
CREATE POLICY "Users can view their own generated content"
  ON generated_content FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own generated content"
  ON generated_content FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own generated content"
  ON generated_content FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own generated content"
  ON generated_content FOR DELETE
  USING (auth.uid() = user_id);

-- User Credits Policies
CREATE POLICY "Users can view their own credits"
  ON user_credits FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own credits"
  ON user_credits FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own credits"
  ON user_credits FOR UPDATE
  USING (auth.uid() = user_id);

-- Credit Usage History Policies
CREATE POLICY "Users can view their own credit usage history"
  ON credit_usage_history FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own credit usage history"
  ON credit_usage_history FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Generation History Policies
CREATE POLICY "Users can view their own generation history"
  ON generation_history FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own generation history"
  ON generation_history FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Function to automatically create user credits on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_credits (user_id, total_credits, used_credits)
  VALUES (NEW.id, 100, 0);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create credits for new users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_content_sources_updated_at BEFORE UPDATE ON content_sources
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_brand_voice_profiles_updated_at BEFORE UPDATE ON brand_voice_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_generated_content_updated_at BEFORE UPDATE ON generated_content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_credits_updated_at BEFORE UPDATE ON user_credits
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();



