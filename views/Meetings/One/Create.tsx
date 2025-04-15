"use client";

import { useState, ChangeEvent, FormEvent, JSX } from 'react';
import Link from 'next/link';
import { Calendar, ChevronLeft, Clock, MapPin, Video } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createMeeting, NewMeeting } from '@/lib/database/collections/meetings';

const DEFAULT_MEETING: NewMeeting = {
  title: '',
  date: '',
  start_time: '',
  end_time: '',
  location: '',
  description: null,
  is_recurring: false,
  recurring_pattern: null,
  status: 'scheduled',
  qr_code_url: null,
  check_in_url: null,
  created_by: 'user_id', // Replace with actual user ID
};

// Define the interface for form errors
interface FormErrors {
  [key: string]: string | null;
}

export default function CreateMeetingView(): JSX.Element {
  const router = useRouter();
  
  // Initialize form state with TypeScript interface
  const [formData, setFormData] = useState<NewMeeting>(DEFAULT_MEETING);
  
  const [errors, setErrors] = useState<FormErrors>({});
  
  // Type the change event based on the input type
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData({
      ...formData,
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
    let valid = true;
    const newErrors: FormErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Meeting title is required';
      valid = false;
    }
    
    if (!formData.date) {
      newErrors.date = 'Date is required';
      valid = false;
    }
    
    if (!formData.start_time) {
      newErrors.start_time = 'Start time is required';
      valid = false;
    }
    
    if (!formData.end_time) {
      newErrors.end_time = 'End time is required';
      valid = false;
    } else if (formData.start_time && formData.end_time && formData.start_time >= formData.end_time) {
      newErrors.end_time = 'End time must be after start time';
      valid = false;
    }
    
    setErrors(newErrors);
    return valid;
  };
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        const created = await createMeeting(formData);      
        if (created) {
            alert('Meeting created successfully!');
            router.push(`/meetings/${created.id}`);
            return;
        } else {
            alert('Failed to create meeting. Please try again.');
        }
      } catch (error) {
        console.error('Error creating meeting:', error);
        alert('An error occurred while creating the meeting. Please try again.');
      }            
    }
  };
  
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
              <span className="text-sm/6 text-gray-600">Jordan Simon</span>
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
          <Link href="/" className="inline-flex items-center text-sm/6 text-gray-600 hover:text-gray-900">
            <ChevronLeft className="size-4 mr-1" />
            Back to Home
          </Link>
        </div>
        
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-900/10">
            <h2 className="text-base/7 font-semibold text-gray-900">Create a New Meeting</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <p className="mt-1 text-sm/6 text-gray-600">
                  Fill in the details to create a new meeting and track attendance.
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
                        value={formData.title}
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
                        value={formData.date}
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
                        value={formData.start_time}
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
                        value={formData.end_time}
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
                        value={formData.location}
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
                        value={formData.description || ''}
                        onChange={handleChange}
                      />
                    </div>
                    <p className="mt-3 text-sm/6 text-gray-600">Provide details about the meeting purpose and agenda.</p>
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
                              checked={formData.is_recurring}
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
                  
                  {formData.is_recurring && (
                    <div className="ml-7">
                      <label htmlFor="recurring_pattern" className="block text-sm/6 font-medium text-gray-900">
                        Repeats
                      </label>
                      <div className="mt-2 grid grid-cols-1">
                        <select
                          id="recurring_pattern"
                          name="recurring_pattern"
                          className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                          value={formData.recurring_pattern || ''}
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
                href="/"
                className="text-sm/6 font-semibold text-gray-900"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Save
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