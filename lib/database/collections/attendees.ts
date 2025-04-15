
import { Database } from '../types';
import { supabaseClient } from '../client';
import { generateID } from '@/utilities/helpers';

export type Attendee = Database['public']['Tables']['attendees']['Row'];
export type NewAttendee = Database['public']['Tables']['attendees']['Insert'];
export type UpdateAttendee = Database['public']['Tables']['attendees']['Update'];

// Get all attendees for a meeting
export async function getMeetingAttendees(meetingId: string) {
  const { data, error } = await supabaseClient
    .from('attendees')
    .select('*')
    .eq('meeting_id', meetingId)
    .order('name');

  if (error) {
    console.error(`Error fetching attendees for meeting ${meetingId}:`, error);
    throw error;
  }

  return data || [];
}

// Get a single attendee by ID
export async function getAttendeeById(id: string) {
  const { data, error } = await supabaseClient
    .from('attendees')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching attendee with ID ${id}:`, error);
    throw error;
  }

  return data;
}

// Add a new attendee to a meeting
export async function addAttendee(attendee: Omit<NewAttendee, 'id'>) {
  const newAttendee: NewAttendee = {
    ...attendee,
    id: generateID()
  };

  const { data, error } = await supabaseClient
    .from('attendees')
    .insert(newAttendee)
    .select()
    .single();

  if (error) {
    console.error('Error adding attendee:', error);
    throw error;
  }

  return data;
}

// Update an existing attendee
export async function updateAttendee(id: string, updates: UpdateAttendee) {
  const { data, error } = await supabaseClient
    .from('attendees')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating attendee with ID ${id}:`, error);
    throw error;
  }

  return data;
}

// Delete an attendee
export async function deleteAttendee(id: string) {
  const { error } = await supabaseClient
    .from('attendees')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(`Error deleting attendee with ID ${id}:`, error);
    throw error;
  }

  return true;
}

// Update checkInAttendee function to accept fingerprint ID
export async function checkInAttendee(
  id: string, 
  checkIn: boolean = true,
  fingerprintId: string | null = null
): Promise<Attendee> {
  const updates: UpdateAttendee = {
  };
  
  if (checkIn) {
    updates.check_in_time = new Date().toISOString();
    
    if (fingerprintId) {
      updates.fingerprint_id = fingerprintId;
    }
  } else {
    updates.check_in_time = null;
    updates.fingerprint_id = null;
  }

  const { data, error } = await supabaseClient
    .from('attendees')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating attendee with ID ${id}:`, error);
    throw error;
  }

  return data;
}

// Add a function to get attendees with the same fingerprint
export async function getAttendeesByFingerprint(
  meeting_id: string,
  fingerprintId: string
): Promise<Attendee[]> {
  if (!fingerprintId) {
    return [];
  }
  
  const { data, error } = await supabaseClient
    .from('attendees')
    .select('*')
    .eq('meeting_id', meeting_id)
    .eq('fingerprint_id', fingerprintId);

  if (error) {
    console.error('Error fetching attendees by fingerprint:', error);
    throw error;
  }

  return data || [];
}

// Bulk add attendees to a meeting
export async function bulkAddAttendees(meetingId: string, attendees: Array<Omit<NewAttendee, 'id' | 'meeting_id'>>) {
  const newAttendees = attendees.map(attendee => ({
    ...attendee,
    id: generateID(),
    meeting_id: meetingId,
  }));

  const { data, error } = await supabaseClient
    .from('attendees')
    .insert(newAttendees)
    .select();

  if (error) {
    console.error('Error adding attendees in bulk:', error);
    throw error;
  }

  return data || [];
}

// Get attendance statistics for a meeting
export async function getMeetingAttendanceStats(meetingId: string) {
  const attendees = await getMeetingAttendees(meetingId);
  
  const total = attendees.length;
  const checkedIn = attendees.filter(a => a.check_in_time).length;
  const percentage = total > 0 ? Math.round((checkedIn / total) * 100) : 0;
  
  return {
    total,
    checkedIn,
    percentage,
    attendees
  };
}