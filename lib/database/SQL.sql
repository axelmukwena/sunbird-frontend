-- This is the SQL you'd run in the Supabase SQL Editor to create your tables

-- Create meetings table
CREATE TABLE IF NOT EXISTS meetings (
  id TEXT PRIMARY KEY NOT NULL,
  title TEXT NOT NULL,
  date TEXT NOT NULL, -- Using TEXT for compatibility with date picker format
  start_time TEXT NOT NULL, -- Using TEXT for compatibility with time picker format
  end_time TEXT NOT NULL, -- Using TEXT for compatibility with time picker format
  location TEXT NOT NULL,
  description TEXT,
  is_recurring BOOLEAN NOT NULL DEFAULT FALSE,
  recurring_pattern TEXT,
  qr_code_url TEXT,
  check_in_url TEXT,
  status TEXT NOT NULL
  created_by TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_by TEXT,
);

-- Create attendees table
CREATE TABLE IF NOT EXISTS attendees (
  id TEXT PRIMARY KEY NOT NULL,
  meeting_id TEXT NOT NULL REFERENCES meetings(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  department TEXT,
  checked_in BOOLEAN NOT NULL DEFAULT FALSE,
  check_in_time TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_by TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_by TEXT,
  
  -- Add an index for faster queries by meeting_id
  CONSTRAINT fk_meeting 
    FOREIGN KEY(meeting_id) 
    REFERENCES meetings(id)
    ON DELETE CASCADE
);

-- Create index for meeting_id in attendees table
CREATE INDEX IF NOT EXISTS idx_attendees_meeting_id ON attendees(meeting_id);

-- Create RLS (Row Level Security) policies
-- For a simple demo, we'll allow all operations, but in a real app you'd restrict this
ALTER TABLE meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendees ENABLE ROW LEVEL SECURITY;

-- For demo purposes - allow anonymous access (you'd normally restrict this by user)
CREATE POLICY "Allow anonymous access to meetings"
  ON meetings
  FOR ALL
  USING (true);

CREATE POLICY "Allow anonymous access to attendees"
  ON attendees
  FOR ALL
  USING (true);

-- Create a storage bucket for meeting assets (QR codes, etc.)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('meetcheck', 'Meetcheck Assets', true);

-- Create a public policy for the storage bucket so anyone can read the QR codes
CREATE POLICY "Public Access"
ON storage.objects
FOR SELECT
USING (bucket_id = 'meetcheck' AND auth.role() = 'anon');

-- Allow anonymous users to upload files to the meetcheck bucket
CREATE POLICY "Allow anonymous uploads"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'meetcheck' AND auth.role() = 'anon');

-- Allow anonymous users to update files in the meetcheck bucket
CREATE POLICY "Allow anonymous updates"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'meetcheck' AND auth.role() = 'anon');

-- Allow anonymous users to delete files from the meetcheck bucket
CREATE POLICY "Allow anonymous deletes"
ON storage.objects
FOR DELETE
USING (bucket_id = 'meetcheck' AND auth.role() = 'anon');