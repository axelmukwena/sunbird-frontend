export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      meetings: {
        Row: {
          id: string
          title: string
          date: string
          start_time: string
          end_time: string
          location: string
          description: string | null
          is_recurring: boolean
          recurring_pattern: string | null
          status: string
          qr_code_url: string | null;
          check_in_url: string | null;
          created_by: string
          created_at: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          id?: string
          title: string
          date: string
          start_time: string
          end_time: string
          location: string
          description?: string | null
          is_recurring: boolean
          recurring_pattern?: string | null
          status: string
          qr_code_url?: string | null;
          check_in_url?: string | null;
          created_by: string
        }
        Update: {
          id?: string
          title?: string
          date?: string
          start_time?: string
          end_time?: string
          location?: string
          description?: string | null
          is_recurring?: boolean
          recurring_pattern?: string | null
          status?: string
          qr_code_url?: string | null;
          check_in_url?: string | null;
          updated_by?: string | null
        }
      }
      attendees: {
        Row: {
          id: string
          meeting_id: string
          name: string
          email: string
          department: string | null
          check_in_time: string | null
          notes: string | null
          fingerprint_id: string | null;
          created_at: string
          created_by: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          id?: string
          meeting_id: string
          name: string
          email: string
          department?: string | null
          check_in_time?: string | null
          notes?: string | null
          fingerprint_id?: string | null;
          created_by: string
        }
        Update: {
          id?: string
          meeting_id?: string
          name?: string
          email?: string
          department?: string | null
          check_in_time?: string | null
          fingerprint_id?: string | null;
          notes?: string | null
          updated_by?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}