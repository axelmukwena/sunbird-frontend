"use client"

import { JSX, useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Plus, 
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  Search,
  Users,
  MoreHorizontal,  
  Video
} from 'lucide-react';
import { getMeetings, Meeting } from '@/lib/database/collections/meetings';
import { getMeetingAttendanceStats } from '@/lib/database/collections/attendees';

// Extended meeting interface with attendance information
interface MeetingWithAttendance extends Meeting {
  attendees: number;
  totalExpected: number;
}

export default function MeetingsView(): JSX.Element {
  const [meetings, setMeetings] = useState<MeetingWithAttendance[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch meetings from the database
  useEffect(() => {
    async function fetchMeetings() {
      try {
        setIsLoading(true);
        
        // Get all meetings from Supabase
        const meetingsData = await getMeetings();
        
        // Enhance each meeting with attendance information
        const enhancedMeetings = await Promise.all(
          meetingsData.map(async (meeting) => {
            try {
              // Get attendance stats for this meeting
              const stats = await getMeetingAttendanceStats(meeting.id);
              
              // Format the data to match our component's expectations
              return {
                ...meeting,
                attendees: stats.checkedIn,
                totalExpected: stats.total,
              };
            } catch (err) {
              console.error(`Error fetching attendance for meeting ${meeting.id}:`, err);
              return {
                ...meeting,
                attendees: 0,
                totalExpected: 0,
              };
            }
          })
        );
        
        setMeetings(enhancedMeetings);
        setError(null);
      } catch (err) {
        console.error('Error fetching meetings:', err);
        setError('Failed to load meetings. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchMeetings();
  }, []);
  
  // Filter meetings based on search query
  const filteredMeetings = meetings.filter(meeting => 
    meeting.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    meeting.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Format date for display
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Function to get status badge styling
  const getStatusBadgeClass = (status: Meeting['status']): string => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-50 text-blue-700 ring-blue-600/20';
      case 'in-progress':
        return 'bg-green-50 text-green-700 ring-green-600/20';
      case 'completed':
        return 'bg-gray-50 text-gray-700 ring-gray-600/20';
      case 'cancelled':
        return 'bg-red-50 text-red-700 ring-red-600/20';
      default:
        return 'bg-gray-50 text-gray-700 ring-gray-600/20';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-sm/6 text-gray-600 hover:text-gray-900">
            <ChevronLeft className="size-4 mr-1" />
            Back to Home
          </Link>
        </div>

        <div className="sm:flex sm:items-center sm:justify-between mb-6">
          <h2 className="text-base/7 font-semibold text-gray-900">Meetings</h2>
          <div className="mt-4 sm:mt-0 sm:flex-none">
            <Link
              href="/meetings/create"
              className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              <Plus className="size-4 mr-1" />
              New Meeting
            </Link>
          </div>
        </div>

        {/* Search */}
        <div className="max-w-md mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="size-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full rounded-md bg-white px-3 py-1.5 pl-10 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
              placeholder="Search meetings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-10">
            <div className="animate-pulse flex flex-col items-center">
              <div className="rounded-full bg-gray-200 h-12 w-12 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-24 mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded w-32"></div>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 my-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error Loading Meetings</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => window.location.reload()}
                    className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-800 hover:bg-red-100"
                  >
                    Retry
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Meetings Table */}
        {!isLoading && !error && (
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm/6 font-semibold text-gray-900 sm:pl-6">
                          Meeting
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm/6 font-semibold text-gray-900">
                          Date
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm/6 font-semibold text-gray-900">
                          Time
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm/6 font-semibold text-gray-900">
                          Location
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm/6 font-semibold text-gray-900">
                          Attendance
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm/6 font-semibold text-gray-900">
                          Status
                        </th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {filteredMeetings.length > 0 ? (
                        filteredMeetings.map((meeting) => (
                          <tr key={meeting.id}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm/6 font-medium text-gray-900 sm:pl-6">
                            <Link href={`/meetings/${meeting.id}`} className="flex items-center hover:text-blue-700 hover:underline">
                              {meeting.title}
                              </Link>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm/6 text-gray-500">
                              <div className="flex items-center">
                                <Calendar className="size-4 mr-1 text-gray-400" />
                                {formatDate(meeting.date)}
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm/6 text-gray-500">
                            <div className="flex items-center mt-1">
                                <Clock className="size-4 mr-1 text-gray-400" />
                                {meeting.start_time} - {meeting.end_time}
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm/6 text-gray-500">
                              {meeting.location}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm/6 text-gray-500">
                              <div className="flex items-center">
                                <Users className="size-4 mr-1 text-gray-400" />
                                <span>{meeting.attendees}/{meeting.totalExpected}</span>
                              </div>
                              {meeting.status === 'completed' && meeting.totalExpected > 0 && (
                                <div className="mt-1 text-xs text-gray-500">
                                  {Math.round((meeting.attendees / meeting.totalExpected) * 100)}% attendance
                                </div>
                              )}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm/6">
                              <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${getStatusBadgeClass(meeting.status)}`}>
                                {meeting.status === 'scheduled' && 'Scheduled'}
                                {meeting.status === 'in-progress' && 'In Progress'}
                                {meeting.status === 'completed' && 'Completed'}
                                {meeting.status === 'cancelled' && 'Cancelled'}
                              </span>
                            </td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm/6 font-medium sm:pr-6">
                              <div className="flex justify-end">
                                {meeting.status === 'scheduled' && (
                                  <Link href={`/meetings/${meeting.id}/edit`} className="text-blue-600 hover:text-blue-900 mr-4">
                                    Edit
                                  </Link>
                                )}
                                <Link href={`/meetings/${meeting.id}`} className="text-blue-600 hover:text-blue-900">
                                  View
                                </Link>
                                <button className="text-gray-400 hover:text-gray-500 ml-2">
                                  <MoreHorizontal className="size-5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="py-8 text-center text-sm/6 text-gray-500">
                            {searchQuery ? (
                              <>
                                No meetings found matching <strong>&quot;{searchQuery}&quot;</strong>
                                <p className="mt-2">
                                  <button 
                                    onClick={() => setSearchQuery('')}
                                    className="text-blue-600 hover:text-blue-500"
                                  >
                                    Clear search
                                  </button>
                                </p>
                              </>
                            ) : (
                              <>
                                No meetings have been created yet.
                                <p className="mt-2">
                                  <Link 
                                    href="/meetings/create" 
                                    className="text-blue-600 hover:text-blue-500"
                                  >
                                    Create your first meeting
                                  </Link>
                                </p>
                              </>
                            )}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pagination - only show if we have meetings and they're loaded */}
        {!isLoading && !error && filteredMeetings.length > 0 && (
          <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-4 rounded-lg">
            <div className="flex flex-1 justify-between sm:hidden">
              <button className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                Previous
              </button>
              <button className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                Next
              </button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm/6 text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredMeetings.length}</span> of{' '}
                  <span className="font-medium">{filteredMeetings.length}</span> results
                </p>
              </div>
              <div>
                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                  <button className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                    <span className="sr-only">Previous</span>
                    <ChevronLeft className="size-5" aria-hidden="true" />
                  </button>
                  <button aria-current="page" className="relative z-10 inline-flex items-center bg-blue-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                    1
                  </button>
                  <button className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                    <span className="sr-only">Next</span>
                    <ChevronRight className="size-5" aria-hidden="true" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}