"use client";

import { useState, useEffect, ChangeEvent, FormEvent,  FC } from 'react';
import Link from 'next/link';
import { Calendar, ChevronLeft, Clock, MapPin, Trash2, Video } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getMeetingById, updateMeeting, deleteMeeting } from '@/lib/database/collections/meetings';
import type { Meeting } from '@/lib/database/collections/meetings';

// Define the interface for form errors
interface FormErrors {
  [key: string]: string | null;
}

interface EditMeetingViewProps {
    meetingId: string;
}

export const EditMeetingView:FC<EditMeetingViewProps> =({meetingId}) =>{
  const router = useRouter();
  
  // State for meeting data
  const [meeting, setMeeting] = useState<Meeting | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Form errors
  const [errors, setErrors] = useState<FormErrors>({});
  
  // Fetch meeting data
  useEffect(() => {
    async function loadMeeting() {
      try {
        setIsLoading(true);
        const meetingData = await getMeetingById(meetingId);
        if (meetingData) {
          setMeeting(meetingData);
        } else {
          setError('Meeting not found');
        }
      } catch (err) {
        console.error('Error loading meeting:', err);
        setError('Failed to load meeting data');
      } finally {
        setIsLoading(false);
      }
    }
    
    if (meetingId) {
      loadMeeting();
    }
  }, [meetingId]);
  
  // Handle form field changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void => {
    if (!meeting) return;
    
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setMeeting({
      ...meeting,
      [name]: type === 'checkbox' ? checked : value,
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };
  
  const validateForm = (): boolean => {
    if (!meeting) return false;
    
    let valid = true;
    const newErrors: FormErrors = {};
    
    if (!meeting.title.trim()) {
      newErrors.title = 'Meeting title is required';
      valid = false;
    }
    
    if (!meeting.date) {
      newErrors.date = 'Date is required';
      valid = false;
    }
    
    if (!meeting.start_time) {
      newErrors.start_time = 'Start time is required';
      valid = false;
    }
    
    if (!meeting.end_time) {
      newErrors.end_time = 'End time is required';
      valid = false;
    } else if (meeting.start_time && meeting.end_time && meeting.start_time >= meeting.end_time) {
      newErrors.end_time = 'End time must be after start time';
      valid = false;
    }
    
    setErrors(newErrors);
    return valid;
  };
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    if (!meeting) return;
    
    if (validateForm()) {
      try {
        setIsSaving(true);
        
        // Update meeting data
        const updated = await updateMeeting(meetingId, meeting);
        
        if (updated) {
          alert('Meeting updated successfully!');
          router.push(`/meetings/${meetingId}`);
          return;
        } else {
          alert('Failed to update meeting. Please try again.');
        }
      } catch (error) {
        console.error('Error updating meeting:', error);
        alert('An error occurred while updating the meeting. Please try again.');
      } finally {
        setIsSaving(false);
      }
    }
  };
  
  const handleDelete = async (): Promise<void> => {
    if (!meeting) return;
    
    // Ask for confirmation
    const confirmed = window.confirm('Are you sure you want to delete this meeting? This action cannot be undone.');
    if (!confirmed) return;
    
    try {
      setIsDeleting(true);
      
      // Delete the meeting
      const success = await deleteMeeting(meetingId);
      
      if (success) {
        alert('Meeting deleted successfully!');
        router.push('/meetings');
        return;
      } else {
        alert('Failed to delete meeting. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting meeting:', error);
      alert('An error occurred while deleting the meeting. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };
  
  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading meeting data...</p>
        </div>
      </div>
    );
  }
  
  // Error state
  if (error || !meeting) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">{error || 'Meeting not found'}</h3>
          <p className="mt-2 text-gray-600">We couldn&apos;t find the meeting you&apos;re looking for. It may have been deleted or you don&apos;t have permission to access it.</p>
          <div className="mt-6">
            <Link href="/meetings" className="text-blue-600 hover:text-blue-800">
              Back to Meetings
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
          <Link href="/" className="text-gray-900 flex items-center space-x-2">
                <Video className="size-8 text-blue-600" />
                <h1 className="text-xl/7 font-bold text-gray-900">Meetcheck</h1>
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-sm/6 text-gray-600">John Doe</span>
              <button className="p-2 text-sm text-gray-600 hover:bg-gray-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link href={`/meetings/${meetingId}`} className="inline-flex items-center text-sm/6 text-gray-600 hover:text-gray-900">
            <ChevronLeft className="size-4 mr-1" />
            Back to Meeting
          </Link>
        </div>
        
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-900/10 flex justify-between items-center">
            <h2 className="text-base/7 font-semibold text-gray-900">Edit Meeting</h2>
            
            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              className="inline-flex items-center text-sm text-red-600 hover:text-red-800 focus:outline-none"
            >
              <Trash2 className="size-4 mr-1" />
              {isDeleting ? 'Deleting...' : 'Delete Meeting'}
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <p className="mt-1 text-sm/6 text-gray-600">
                  Update the details of your meeting.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  {/* Meeting Title */}
                  <div className="sm:col-span-4">
                    <label htmlFor="title" className="block text-sm/6 font-medium text-gray-900">
                      Meeting Title*
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="title"
                        id="title"
                        className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 ${errors.title ? 'outline-red-500' : 'outline-gray-300'} placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6`}
                        placeholder="Weekly Team Standup"
                        value={meeting.title}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.title && <p className="mt-1 text-sm/6 text-red-600">{errors.title}</p>}
                  </div>
                  
                  {/* Date and Time */}
                  <div className="sm:col-span-2">
                    <label htmlFor="date" className="block text-sm/6 font-medium text-gray-900">
                      Date*
                    </label>
                    <div className="mt-2 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="size-4 text-gray-400" />
                      </div>
                      <input
                        type="date"
                        name="date"
                        id="date"
                        className={`block w-full rounded-md bg-white px-3 py-1.5 pl-10 text-base text-gray-900 outline-1 -outline-offset-1 ${errors.date ? 'outline-red-500' : 'outline-gray-300'} placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6`}
                        value={meeting.date}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.date && <p className="mt-1 text-sm/6 text-red-600">{errors.date}</p>}
                  </div>
                  
                  <div className="sm:col-span-2">
                    <label htmlFor="start_time" className="block text-sm/6 font-medium text-gray-900">
                      Start Time*
                    </label>
                    <div className="mt-2 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Clock className="size-4 text-gray-400" />
                      </div>
                      <input
                        type="time"
                        name="start_time"
                        id="start_time"
                        className={`block w-full rounded-md bg-white px-3 py-1.5 pl-10 text-base text-gray-900 outline-1 -outline-offset-1 ${errors.start_time ? 'outline-red-500' : 'outline-gray-300'} placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6`}
                        value={meeting.start_time}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.start_time && <p className="mt-1 text-sm/6 text-red-600">{errors.start_time}</p>}
                  </div>
                  
                  <div className="sm:col-span-2">
                    <label htmlFor="end_time" className="block text-sm/6 font-medium text-gray-900">
                      End Time*
                    </label>
                    <div className="mt-2 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Clock className="size-4 text-gray-400" />
                      </div>
                      <input
                        type="time"
                        name="end_time"
                        id="end_time"
                        className={`block w-full rounded-md bg-white px-3 py-1.5 pl-10 text-base text-gray-900 outline-1 -outline-offset-1 ${errors.end_time ? 'outline-red-500' : 'outline-gray-300'} placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6`}
                        value={meeting.end_time}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.end_time && <p className="mt-1 text-sm/6 text-red-600">{errors.end_time}</p>}
                  </div>
                  
                  {/* Location */}
                  <div className="sm:col-span-4">
                    <label htmlFor="location" className="block text-sm/6 font-medium text-gray-900">
                      Location
                    </label>
                    <div className="mt-2 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="size-4 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="location"
                        id="location"
                        className="block w-full rounded-md bg-white px-3 py-1.5 pl-10 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                        placeholder="Conference Room A or Zoom Link"
                        value={meeting.location}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  
                  {/* Description */}
                  <div className="col-span-full">
                    <label htmlFor="description" className="block text-sm/6 font-medium text-gray-900">
                      Description
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="description"
                        name="description"
                        rows={3}
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                        placeholder="Brief description of the meeting agenda and goals"
                        value={meeting.description || ''}
                        onChange={handleChange}
                      />
                    </div>
                    <p className="mt-3 text-sm/6 text-gray-600">Provide details about the meeting purpose and agenda.</p>
                  </div>
                  
                  {/* Status */}
                  <div className="sm:col-span-3">
                    <label htmlFor="status" className="block text-sm/6 font-medium text-gray-900">
                      Meeting Status
                    </label>
                    <div className="mt-2">
                      <select
                        id="status"
                        name="status"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                        value={meeting.status}
                        onChange={handleChange}
                      >
                        <option value="scheduled">Scheduled</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Recurring Meeting Options */}
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base/7 font-semibold text-gray-900">Meeting Schedule</h2>
                <p className="mt-1 text-sm/6 text-gray-600">Configure if this is a one-time or recurring meeting.</p>
                
                <div className="mt-10 space-y-10">
                  <fieldset>
                    <div className="mt-6 space-y-6">
                      <div className="flex gap-3">
                        <div className="flex h-6 shrink-0 items-center">
                          <div className="group grid size-4 grid-cols-1">
                            <input
                              id="is_recurring"
                              name="is_recurring"
                              type="checkbox"
                              className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-blue-600 checked:bg-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                              checked={meeting.is_recurring}
                              onChange={handleChange}
                            />
                            <svg
                              fill="none"
                              viewBox="0 0 14 14"
                              className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                            >
                              <path
                                d="M3 8L6 11L11 3.5"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="opacity-0 group-has-checked:opacity-100"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="text-sm/6">
                          <label htmlFor="is_recurring" className="font-medium text-gray-900">
                            This is a recurring meeting
                          </label>
                          <p className="text-gray-500">
                            Check this box if the meeting will repeat on a regular schedule.
                          </p>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                  
                  {meeting.is_recurring && (
                    <div className="ml-7">
                      <label htmlFor="recurring_pattern" className="block text-sm/6 font-medium text-gray-900">
                        Repeats
                      </label>
                      <div className="mt-2 grid grid-cols-1">
                        <select
                          id="recurring_pattern"
                          name="recurring_pattern"
                          className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                          value={meeting.recurring_pattern || ''}
                          onChange={handleChange}
                        >
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                          <option value="biweekly">Bi-weekly</option>
                          <option value="monthly">Monthly</option>
                        </select>
                        <svg
                          className="pointer-events-none col-start-1 row-start-1 mr-2 size-4 self-center justify-self-end text-gray-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Form Actions */}
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <Link
                href={`/meetings/${meetingId}`}
                className="text-sm/6 font-semibold text-gray-900"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSaving}
                className={`rounded-md ${isSaving ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-500'} px-3 py-2 text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600`}
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              © 2025 Meetcheck. All rights reserved.
            </p>
            <p className="text-sm text-gray-500">
                Built with ❤️ by <Link className='underline' target='_blank' href="https://meyabase.com">meyabase.com</Link>
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Help</a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Privacy</a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}