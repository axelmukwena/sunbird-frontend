
import { Database } from '../types';
import { supabaseClient } from '../client';
import { generateID } from '@/utilities/helpers';
import { CheckInMetadata, collectCheckInMetadata } from '@/lib/location/client';

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

  // Collect location and device information if not provided
  if (!attendee.location_info || !attendee.device_info) {
    const metadata = await collectCheckInMetadata();
    
    // Only set these if they weren't provided in the input
    if (!attendee.location_info) {
      attendee.location_info = metadata.locationInfo;
    }
    if (!attendee.device_info) {
      attendee.device_info = metadata.deviceInfo;
    }
  }

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

// Check in an attendee
export async function checkInAttendee(
  id: string, 
  checkIn: boolean = true,
  fingerprintId: string | null = null,
  clientMetadata: CheckInMetadata | null = null
): Promise<Attendee> {
  try {
    const updates: UpdateAttendee = {};
    
    if (checkIn) {
      // Set check-in time to now
      updates.check_in_time = new Date().toISOString();
      
      // Set fingerprint ID if provided
      if (fingerprintId) {
        updates.fingerprint_id = fingerprintId;
      }
      
      // Collect location and device information
      if (!clientMetadata?.locationInfo || !clientMetadata?.deviceInfo) {
        const metadata = await collectCheckInMetadata();
        updates.location_info = metadata.locationInfo;
        updates.device_info = metadata.deviceInfo;
      } else if (clientMetadata) {
        updates.location_info = clientMetadata.locationInfo;
        updates.device_info = clientMetadata.deviceInfo;
      }
    } else {
      // Clear check-in data when undoing a check-in
      updates.check_in_time = null;
      updates.fingerprint_id = null;
      updates.location_info = null;
      updates.device_info = null;
    }
    
    // Update the attendee record
    const { data, error } = await supabaseClient
      .from('attendees')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
        updated_by: 'system'
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error(`Error checking in attendee with ID ${id}:`, error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in checkInAttendee:', error);
    throw error;
  }
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