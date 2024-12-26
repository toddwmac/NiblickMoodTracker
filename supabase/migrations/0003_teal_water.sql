/*
  # Update mood entries table

  1. Schema
    - Remove user_id requirement
    - Keep basic fields for mood tracking
    
  2. Security
    - Enable RLS
    - Allow public read/write access
*/

-- Drop existing table and policies
DROP TABLE IF EXISTS mood_entries CASCADE;

-- Create new table without user_id requirement
CREATE TABLE mood_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  mood text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE mood_entries ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access"
  ON mood_entries
  FOR SELECT
  USING (true);

-- Allow public insert access
CREATE POLICY "Allow public insert access"
  ON mood_entries
  FOR INSERT
  WITH CHECK (true);