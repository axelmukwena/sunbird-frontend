import { Database } from '../types';
import { supabaseClient } from '../client';
import { generateID } from '@/utilities/helpers';
import { generateAndStoreQRCode } from '@/lib/qrcode/client';


export type Meeting = Database['public']['Tables']['meetings']['Row'];
export type NewMeeting = Database['public']['Tables']['meetings']['Insert'];
export type UpdateMeeting = Database['public']['Tables']['meetings']['Update'];

// Get all meetings
export async function getMeetings() {
  const { data, error } = await supabaseClient
    .from('meetings')
    .select('*')
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching meetings:', error);
    throw error;
  }

  return data || [];
}

// Get a single meeting by ID
export async function getMeetingById(id: string): Promise<Meeting | null> {
  const { data, error } = await supabaseClient
    .from('meetings')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching meeting with ID ${id}:`, error);
    throw error;
  }
  return data;
}


// Regenerate QR code for an existing meeting
export async function regenerateQRCode(id: string) {
  try {
    const { qrCodeUrl, checkInUrl } = await generateAndStoreQRCode(id);

    if (qrCodeUrl) {
      const { data, error } = await supabaseClient
        .from('meetings')
        .update({
          qr_code_url: qrCodeUrl,
          check_in_url: checkInUrl,
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error(`Error updating meeting ${id} with new QR code:`, error);
        throw error;
      }

      return data;
    }
    
    return null;
  } catch (error) {
    console.error('Error in regenerateQRCode:', error);
    throw error;
  }
}


// Create a new meeting with QR code
export async function createMeeting(meeting: Omit<NewMeeting, 'id' | 'created_at' | 'qr_code_url' | 'check_in_url'>): Promise<Meeting | null> {
  try {
    // First create the meeting to get an ID
    const newMeeting: NewMeeting = {
      ...meeting,
      id: generateID(),
    };

    const { data, error } = await supabaseClient
      .from('meetings')
      .insert(newMeeting)
      .select()
      .single();

    if (error) {
      console.error('Error creating meeting:', error);
      throw error;
    }

    // Now generate and store QR code
    if (data) {
      const { qrCodeUrl, checkInUrl } = await generateAndStoreQRCode(data.id);

      // Update the meeting with QR code information
      if (qrCodeUrl) {
        const { data: updatedData, error: updateError } = await supabaseClient
          .from('meetings')
          .update({
            qr_code_url: qrCodeUrl,
            check_in_url: checkInUrl,
          })
          .eq('id', data.id)
          .select()
          .single();

        if (updateError) {
          console.error('Error updating meeting with QR code:', updateError);
        }

        return updatedData || data;
      }
    }

    return data;
  } catch (error) {
    console.error('Error in createMeeting:', error);
    throw error;
  }
}

// Update an existing meeting
export async function updateMeeting(id: string, updates: UpdateMeeting) {
  const { data, error } = await supabaseClient
    .from('meetings')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating meeting with ID ${id}:`, error);
    throw error;
  }

  return data;
}

// Delete a meeting
export async function deleteMeeting(id: string) {
  // First delete all associated attendees
  const { error: attendeeError } = await supabaseClient
    .from('attendees')
    .delete()
    .eq('meeting_id', id);

  if (attendeeError) {
    console.error(`Error deleting attendees for meeting ${id}:`, attendeeError);
    throw attendeeError;
  }

  // Then delete the meeting
  const { error } = await supabaseClient
    .from('meetings')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(`Error deleting meeting with ID ${id}:`, error);
    throw error;
  }

  return true;
}

// Update meeting status
export async function updateMeetingStatus(id: string, status: Meeting['status']) {
  return updateMeeting(id, { status });
}

// Automatically update meeting statuses based on date and time
export async function updateMeetingStatuses() {
  const now = new Date();
  const today = now.toISOString().split('T')[0];
  const currentTime = now.toTimeString().split(' ')[0].substring(0, 5);

  // Update meetings that should be in progress
  const { error: inProgressError } = await supabaseClient
    .from('meetings')
    .update({ status: 'in-progress' })
    .eq('date', today)
    .lt('start_time', currentTime)
    .gt('end_time', currentTime)
    .eq('status', 'scheduled');

  if (inProgressError) {
    console.error('Error updating in-progress meetings:', inProgressError);
  }

  // Update meetings that are completed
  const { error: completedError } = await supabaseClient
    .from('meetings')
    .update({ status: 'completed' })
    .lte('date', today)
    .lte('end_time', currentTime)
    .neq('status', 'completed');

  if (completedError) {
    console.error('Error updating completed meetings:', completedError);
  }
}