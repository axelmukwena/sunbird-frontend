"use client";

import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  ChevronLeft,
  Calendar,
  Clock,
  MapPin,
  User,
  UserPlus,
  ChartBar,
  CheckCircle,
  Pencil,
  Trash,
  RefreshCw,
  FileDown,
  X,
  Video,
} from 'lucide-react';
import { deleteMeeting, getMeetingById, Meeting } from '@/lib/database/collections/meetings';
import { addAttendee, Attendee, checkInAttendee, getMeetingAttendees, NewAttendee } from '@/lib/database/collections/attendees';
import MeetingQRCode from '@/components/MeetingQRCode';
import { useRouter } from 'next/navigation';


const DEFAULT_ATTENDEE: NewAttendee = {
  meeting_id: '',
  name: '',
  email: '',
  department: '',
  notes: '',
  created_by: 'user_id', // Replace with actual user ID
};


interface MeetingViewProps {
    meetingId: string;
}

export const MeetingView:FC<MeetingViewProps> = ({meetingId}) => {
    const router = useRouter();
    const [meeting, setMeeting] = useState<Meeting | null>(null);
    const [attendees, setAttendees] = useState<Attendee[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const [showAddAttendee, setShowAddAttendee] = useState(false);
    const [newAttendee, setNewAttendee] = useState<NewAttendee>(DEFAULT_ATTENDEE);
    const [isDeleting, setIsDeleting] = useState(false);
    
    // Fetch meeting and attendees data
    useEffect(() => {
      async function fetchData() {
        if (!meetingId) return;
        
        try {
          setLoading(true);
          const meetingData = await getMeetingById(meetingId);
          const attendeesData = await getMeetingAttendees(meetingId);
          
          setMeeting(meetingData);
          setAttendees(attendeesData);
        } catch (err) {
          console.error('Error fetching meeting data:', err);
          setError('Failed to load meeting data. Please try again later.');
        } finally {
          setLoading(false);
        }
      }
      
      fetchData();
    }, [meetingId]);
    
    // Function to toggle attendee check-in status
    const toggleCheckIn = async (attendeeId: string) => {
      try {
        const attendee = attendees.find(a => a.id === attendeeId);
        if (!attendee) return;
        
        const updatedAttendee = await checkInAttendee(attendeeId, !attendee.check_in_time);
        
        // Update the attendees list
        setAttendees(attendees.map(a => 
          a.id === attendeeId ? updatedAttendee : a
        ));
      } catch (err) {
        console.error('Error toggling check-in status:', err);
        alert('Failed to update check-in status. Please try again.');
      }
    };
    
    // Function to add a new attendee
    const handleAddAttendee = async () => {
      if (!meetingId) {
        alert('Meeting ID is required to add an attendee.');
        return;
      }

      if (!newAttendee.name || !newAttendee.email) {
        alert('Name and email are required fields.');
        return;
      }
      
      try {
        const addedAttendee = await addAttendee({
          meeting_id: meetingId,
          name: newAttendee.name,
          email: newAttendee.email,
          department: newAttendee.department || null,
          notes: newAttendee.notes || null,
          created_by: 'user_id', // Replace with actual user ID
        });
        
        // Update the attendees list
        setAttendees([...attendees, addedAttendee]);
        
        // Reset the form
        setNewAttendee(DEFAULT_ATTENDEE);
        
        setShowAddAttendee(false);
      } catch (err) {
        console.error('Error adding attendee:', err);
        alert('Failed to add attendee. Please try again.');
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

    const handleDownloadQRCode = async () => {
      if (!meeting) return;
      try {
        const response = await fetch(meeting.qr_code_url || '');
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `meeting-${meeting.id}-qrcode.png`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error downloading QR code:', error);
        alert('Failed to download QR code. Please try again.');
      }
    }
    
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
    
    // Calculate attendance stats
    const attendanceStats = {
      total: attendees.length,
      checkedIn: attendees.filter(a => a.check_in_time).length,
      percentage: attendees.length > 0 
        ? Math.round((attendees.filter(a => a.check_in_time).length / attendees.length) * 100) 
        : 0
    };
    
    // Check if the meeting is active (can check in)
    const isMeetingActive = meeting?.status === 'scheduled' || meeting?.status === 'in-progress';
    
    if (loading) {
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
            <X className="mx-auto size-12 text-red-500" />
            <h3 className="mt-2 text-base/7 font-medium text-gray-900">Meeting Not Found</h3>
            <p className="mt-1 text-sm/6 text-gray-500">
              {error || "Sorry, we couldn't find the meeting you're looking for."}
            </p>
            <Link
              href="/meetings"
              className="mt-4 inline-flex items-center text-sm/6 text-blue-600 hover:text-blue-500"
            >
              <ChevronLeft className="size-4 mr-1" />
              Back to Meetings
            </Link>
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
            <Link href="/meetings" className="inline-flex items-center text-sm/6 text-gray-600 hover:text-gray-900">
              <ChevronLeft className="size-4 mr-1" />
              Back to Meetings
            </Link>
          </div>
  
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Meeting Header */}
            <div className="border-b border-gray-900/10 px-6 py-5">
              <div className="flex justify-between items-start md:flex-row flex-col space-y-4 md:space-y-0">
                <div>
                  <h2 className="text-xl/7 font-semibold text-gray-900">{meeting.title}</h2>
                  <div className="mt-1 flex flex-wrap gap-x-6 gap-y-2 text-sm/6 text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="size-4 mr-1 text-gray-400" />
                      {formatDate(meeting.date)}
                    </div>
                    <div className="flex items-center">
                      <Clock className="size-4 mr-1 text-gray-400" />
                      {meeting.start_time} - {meeting.end_time}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="size-4 mr-1 text-gray-400" />
                      {meeting.location}
                    </div>
                    {meeting.is_recurring && (
                      <div className="flex items-center">
                        <RefreshCw className="size-4 mr-1 text-gray-400" />
                        {meeting.recurring_pattern} recurring meeting
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  {meeting.status === 'scheduled' && (
                    <Link 
                      href={`/meetings/${meeting.id}/edit`}
                      className="inline-flex items-center rounded-md px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
                    >
                      <Pencil className="size-4 mr-1" />
                      Edit
                    </Link>
                  )}
                  <button
                    className="inline-flex items-center rounded-md px-2.5 py-1.5 text-sm font-semibold text-red-700 shadow-xs ring-1 ring-red-300 ring-inset hover:bg-red-50"
                    onClick={handleDelete}
                    disabled={isDeleting}
                  >
                    <Trash className="size-4 mr-1" />
                    {isDeleting ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
              
              {meeting.description && (
                <div className="mt-4 text-sm/6 text-gray-600">
                  <p>{meeting.description}</p>
                </div>
              )}
            </div>
            
            {/* Meeting Actions */}
            <div className="border-b border-gray-900/10 px-6 py-4 flex flex-wrap gap-3 bg-gray-50">
              {isMeetingActive && (
                <button
                  className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  <UserPlus className="size-4 mr-1" />
                  Record Attendance
                </button>
              )}
              <button
                className="inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-gray-900 bg-white shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
              >
                <ChartBar className="size-4 mr-1" />
                View Analytics
              </button>
              <button
                className="inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-gray-900 bg-white shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
              >
                <FileDown className="size-4 mr-1" />
                Export Data
              </button>
            </div>
            
            {/* Attendance Stats */}
            <div className="border-b border-gray-900/10 px-6 py-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="text-sm/6 font-medium text-gray-900">Expected Attendees</h3>
                <p className="mt-1 text-2xl/7 font-semibold text-blue-700">{attendanceStats.total}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="text-sm/6 font-medium text-gray-900">Checked In</h3>
                <p className="mt-1 text-2xl/7 font-semibold text-green-700">{attendanceStats.checkedIn}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm/6 font-medium text-gray-900">Attendance Rate</h3>
                <p className="mt-1 text-2xl/7 font-semibold text-gray-700">{attendanceStats.percentage}%</p>
              </div>
            </div>
            
            {/* QR Code Section */}
            <div className="border-b border-gray-900/10 px-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-base/7 font-semibold text-gray-900 mb-4">Attendance Check-In</h3>
                  
                  {/* Instructions */}
                  <div className="bg-blue-50 rounded-lg p-4 mb-4">
                    <h4 className="text-sm/6 font-medium text-blue-800">Check-in Instructions</h4>
                    <p className="mt-1 text-sm/6 text-blue-700">
                      Share this QR code with attendees so they can quickly check in to the meeting.
                      Attendees can scan the code using their smartphone camera.
                    </p>
                  </div>
                  
                  {/* Display options */}
                  <div className="space-y-4">
                    <button
                      className="inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-gray-900 bg-white shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
                      onClick={handleDownloadQRCode}
                    >
                      <FileDown className="size-4 mr-1" />
                      Download QR Code
                    </button>
                    
                    <div>
                      <p className="text-sm/6 text-gray-500 mb-2">
                        <strong>Pro Tip:</strong> Display this QR code at the entrance of your meeting room or include it in meeting invites.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  {/* QR Code Component */}
                  <MeetingQRCode
                    meetingId={meeting.id}
                    qrCodeUrl={meeting.qr_code_url || null}
                    checkInUrl={meeting.check_in_url || null}
                  />
                </div>
              </div>
            </div>
            
            {/* Attendees List */}
            <div className="px-6 py-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base/7 font-semibold text-gray-900">Attendees</h3>
                <button
                  onClick={() => setShowAddAttendee(true)}
                  className="inline-flex items-center rounded-md px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
                >
                  <UserPlus className="size-4 mr-1" />
                  Add Attendee
                </button>
              </div>
              
              {/* Add Attendee Form */}
              {showAddAttendee && (
                <div className="mb-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-sm/6 font-medium text-gray-900">Add New Attendee</h4>
                    <button 
                      onClick={() => setShowAddAttendee(false)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <X className="size-5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900 mb-1">
                        Name*
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600"
                        value={newAttendee.name}
                        onChange={(e) => setNewAttendee({...newAttendee, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900 mb-1">
                        Email*
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600"
                        value={newAttendee.email}
                        onChange={(e) => setNewAttendee({...newAttendee, email: e.target.value})}
                      />
                    </div>
                    <div>
                      <label htmlFor="department" className="block text-sm/6 font-medium text-gray-900 mb-1">
                        Department
                      </label>
                      <input
                        type="text"
                        id="department"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600"
                        value={newAttendee.department || ''}
                        onChange={(e) => setNewAttendee({...newAttendee, department: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="notes" className="block text-sm/6 font-medium text-gray-900 mb-1">
                      Notes
                    </label>
                    <textarea
                      id="notes"
                      rows={2}
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600"
                      value={newAttendee.notes || ''}
                      onChange={(e) => setNewAttendee({...newAttendee, notes: e.target.value})}
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={() => setShowAddAttendee(false)}
                      className="mr-3 text-sm/6 font-semibold text-gray-900"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddAttendee}
                      disabled={!newAttendee.name || !newAttendee.email}
                      className={`rounded-md px-3 py-2 text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                        !newAttendee.name || !newAttendee.email
                          ? 'bg-blue-300 cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-500'
                      }`}
                    >
                      Add Attendee
                    </button>
                  </div>
                </div>
              )}
              
              {/* Attendees Table */}
              <div className="mt-4 flow-root">
                <div className="overflow-x-auto">
                  <div className="inline-block min-w-full py-2 align-middle">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead>
                        <tr>
                          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm/6 font-semibold text-gray-900 sm:pl-0">
                            Name
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm/6 font-semibold text-gray-900">
                            Email
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm/6 font-semibold text-gray-900">
                            Department
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm/6 font-semibold text-gray-900">
                            Status
                          </th>
                          <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {attendees.map((attendee) => (
                          <tr key={attendee.id} className={attendee.check_in_time ? 'bg-green-50' : ''}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm/6 font-medium text-gray-900 sm:pl-0">
                              <div className="flex items-center">
                                <User className="size-4 mr-2 text-gray-400" />
                                {attendee.name}
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm/6 text-gray-500">
                              {attendee.email}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm/6 text-gray-500">
                              {attendee.department || '-'}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm/6">
                              {attendee.check_in_time ? (
                                <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                  <CheckCircle className="size-3 mr-1" />
                                  Checked In
                                  {attendee.check_in_time && (
                                    <span className="ml-1 text-xs text-gray-500">
                                      {new Date(attendee.check_in_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                  )}
                                </span>
                              ) : (
                                <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-600/20">
                                  Not Checked In
                                </span>
                              )}
                            </td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm/6 font-medium sm:pr-0">
                              {isMeetingActive && (
                                <button
                                  onClick={() => toggleCheckIn(attendee.id)}
                                  className={`${
                                    attendee.check_in_time
                                      ? 'text-red-600 hover:text-red-900'
                                      : 'text-blue-600 hover:text-blue-900'
                                  }`}
                                >
                                  {attendee.check_in_time ? 'Undo Check In' : 'Check In'}
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              
              {attendees.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-sm/6 text-gray-500">No attendees have been added to this meeting yet.</p>
                  <button
                    onClick={() => setShowAddAttendee(true)}
                    className="mt-3 inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    <UserPlus className="size-4 mr-1" />
                    Add First Attendee
                  </button>
                </div>
              )}
            </div>
            
            {/* Meeting Meta Information */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-900/10 text-sm/6 text-gray-500">
              <p>Created by {meeting.created_by} on {new Date(meeting.created_at).toLocaleDateString()}</p>
            </div>
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
                    Built with ❤️ by <Link className='underline' target='_blank' href="https://www.linkedin.com/in/axelmukwena">Axel Mukwena</Link> at <Link className='underline' target='_blank' href="https://meyabase.com">meyabase.com</Link>
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