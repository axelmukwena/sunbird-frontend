// components/MeetingQRCode.tsx
import { regenerateQRCode } from '@/lib/database/collections/meetings';
import { Files, QrCode, RefreshCw } from 'lucide-react';
import Image from 'next/image';
import { JSX, useState } from 'react';

interface MeetingQRCodeProps {
  meetingId: string;
  qrCodeUrl: string | null;
  checkInUrl: string | null;
}

export default function MeetingQRCode({ meetingId, qrCodeUrl, checkInUrl }: MeetingQRCodeProps): JSX.Element {
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [currentQrUrl, setCurrentQrUrl] = useState(qrCodeUrl);
  const [currentCheckInUrl, setCurrentCheckInUrl] = useState(checkInUrl);
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);

  // Function to handle QR code regeneration
  const handleRegenerateQRCode = async () => {
    try {
      setIsRegenerating(true);
      const updatedMeeting = await regenerateQRCode(meetingId);
      
      if (updatedMeeting) {
        setCurrentQrUrl(updatedMeeting.qr_code_url);
        setCurrentCheckInUrl(updatedMeeting.check_in_url);
      }
    } catch (error) {
      console.error('Error regenerating QR code:', error);
    } finally {
      setIsRegenerating(false);
    }
  };

  // Function to copy check-in URL to clipboard
  const copyCheckInUrlToClipboard = () => {
    if (currentCheckInUrl) {
      navigator.clipboard.writeText(currentCheckInUrl);
      setShowCopiedMessage(true);
      setTimeout(() => setShowCopiedMessage(false), 2000);
    }
  };

  if (!currentQrUrl) {
    return (
      <div className="bg-gray-50 rounded-lg p-6 text-center">
        <QrCode className="mx-auto size-12 text-gray-400" />
        <h3 className="mt-2 text-sm/6 font-medium text-gray-900">No QR Code Available</h3>
        <p className="mt-1 text-sm/6 text-gray-500">QR code could not be generated for this meeting.</p>
        <div className="mt-6">
          <button
            type="button"
            onClick={handleRegenerateQRCode}
            disabled={isRegenerating}
            className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <RefreshCw className="mr-1.5 size-4" />
            Generate QR Code
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-base/7 font-medium text-gray-900">Meeting Check-in QR Code</h3>
        <p className="mt-1 text-sm/6 text-gray-500">Attendees can scan this code to check in to the meeting.</p>
      </div>
      
      <div className="p-6 flex flex-col items-center">
        {/* QR Code Image */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <Image 
            src={currentQrUrl} 
            alt="Meeting check-in QR code" 
            className="size-48 object-contain"
            width={192}
            height={192}
          />
        </div>
        
        {/* Check-in URL with copy button */}
        {currentCheckInUrl && (
          <div className="mt-4 w-full">
            <div className="relative mt-2 rounded-md shadow-sm">
              <input
                type="text"
                value={currentCheckInUrl}
                readOnly
                className="block w-full rounded-md py-1.5 pl-3 pr-10 text-sm/6 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <button
                  type="button"
                  onClick={copyCheckInUrlToClipboard}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <Files className="size-4" />
                </button>
              </div>
            </div>
            {showCopiedMessage && (
              <p className="mt-1 text-xs text-green-600">URL copied to clipboard!</p>
            )}
          </div>
        )}
        
        {/* Regenerate button */}
        <div className="mt-4">
          <button
            type="button"
            onClick={handleRegenerateQRCode}
            disabled={isRegenerating}
            className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
          >
            <RefreshCw className={`mr-1.5 size-4 ${isRegenerating ? 'animate-spin' : ''}`} />
            {isRegenerating ? 'Regenerating...' : 'Regenerate QR Code'}
          </button>
        </div>
      </div>
    </div>
  );
}