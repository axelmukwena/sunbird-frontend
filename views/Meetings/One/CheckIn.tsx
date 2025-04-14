"use client";

import { useState, useEffect, FormEvent, FC } from 'react';
import { getMeetingById, Meeting } from '@/lib/database/collections/meetings';
import { addAttendee, Attendee, checkInAttendee, getMeetingAttendees } from '@/lib/database/collections/attendees';
import { CheckCircle, User, XCircle } from 'lucide-react';

interface CheckInViewProps {
    meetingId: string;
}

export const CheckInView:FC<CheckInViewProps> = ({ meetingId }) => {  
  const [meeting, setMeeting] = useState<Meeting | null>(null);
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [checkedIn, setCheckedIn] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
  });
  
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
  });
  
  // Load meeting data
  useEffect(() => {
    async function loadMeeting() {
      if (!meetingId) return;
      
      try {
        setLoading(true);
        const meetingData = await getMeetingById(meetingId);
        const attendeesData = await getMeetingAttendees(meetingId);
        
        setMeeting(meetingData);
        setAttendees(attendeesData);
      } catch (error) {
        console.error('Error loading meeting:', error);
        setError('Unable to load meeting information. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    
    loadMeeting();
  }, [meetingId]);
  
  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    let valid = true;
    const errors = {
      name: '',
      email: '',
    };
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
      valid = false;
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
      valid = false;
    }
    
    setFormErrors(errors);
    
    if (!valid || !meetingId) return;
    
    try {
      setLoading(true);
      
      // Check if the attendee already exists
      const existingAttendee = attendees.find(
        a => a.email.toLowerCase() === formData.email.toLowerCase()
      );
      
      if (existingAttendee) {
        // If already checked in, show message
        if (existingAttendee.check_in_time) {
          setCheckedIn(true);
          return;
        }
        
        // Otherwise, check them in
        await checkInAttendee(existingAttendee.id);
      } else {
        // Add new attendee and check them in
        await addAttendee({
          meeting_id: meetingId,
          name: formData.name,
          email: formData.email,
          department: formData.department || null,
          check_in_time: new Date().toISOString(),
          created_by: 'user_id',
        });
      }
      
      // Show success state
      setCheckedIn(true);
    } catch (error) {
      console.error('Error checking in:', error);
      setError('Unable to check in. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  // Format date for display
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  if (loading && !meeting) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="mx-auto size-12 rounded-full bg-blue-100"></div>
          <h3 className="mt-4 text-base/7 font-medium text-gray-900">Loading meeting...</h3>
        </div>
      </div>
    );
  }
  
  if (error || !meeting) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <XCircle className="mx-auto size-12 text-red-500" />
          <h3 className="mt-2 text-base/7 font-medium text-gray-900">Meeting Not Found</h3>
          <p className="mt-1 text-sm/6 text-gray-500">
            {error || "Sorry, we couldn't find the meeting you're looking for."}
          </p>
        </div>
      </div>
    );
  }
  
  // If user has successfully checked in
  if (checkedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-sm max-w-md w-full overflow-hidden">
          <div className="bg-green-50 px-4 py-5 sm:p-6 text-center">
            <CheckCircle className="mx-auto size-12 text-green-500" />
            <h3 className="mt-2 text-base/7 font-medium text-gray-900">Check-in Successful!</h3>
            <p className="mt-1 text-sm/6 text-gray-500">
              You have been checked in to the meeting.
            </p>
          </div>
          
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-xl/7 font-semibold text-gray-900">{meeting.title}</h2>
            <div className="mt-2 text-sm/6 text-gray-500">
              <p>{formatDate(meeting.date)}</p>
              <p className="mt-1">{meeting.start_time} - {meeting.end_time}</p>
              <p className="mt-1">{meeting.location}</p>
            </div>
            
            <div className="mt-6 border-t border-gray-200 pt-4">
              <p className="text-sm/6 text-gray-500">Thank you for confirming your attendance. Have a great meeting!</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Normal check-in form
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-2xl/7 font-bold text-gray-900">Meeting Check-in</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm sm:rounded-lg sm:px-10">
          <div className="pb-5 mb-5 border-b border-gray-200">
            <h3 className="text-lg/7 font-medium text-gray-900">{meeting.title}</h3>
            <div className="mt-2 text-sm/6 text-gray-500">
              <p>{formatDate(meeting.date)}</p>
              <p className="mt-1">{meeting.start_time} - {meeting.end_time}</p>
              <p className="mt-1">{meeting.location}</p>
            </div>
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm/6 font-medium text-gray-700">
                Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 ${formErrors.name ? 'outline-red-500' : 'outline-gray-300'} placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6`}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                {formErrors.name && (
                  <p className="mt-1 text-sm/6 text-red-600">{formErrors.name}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 ${formErrors.email ? 'outline-red-500' : 'outline-gray-300'} placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6`}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                {formErrors.email && (
                  <p className="mt-1 text-sm/6 text-red-600">{formErrors.email}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="department" className="block text-sm/6 font-medium text-gray-700">
                Department (Optional)
              </label>
              <div className="mt-1">
                <input
                  id="department"
                  name="department"
                  type="text"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`flex w-full justify-center items-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                  loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-500'
                }`}
              >
                <User className="mr-1.5 size-4" />
                {loading ? 'Checking in...' : 'Check in to Meeting'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}