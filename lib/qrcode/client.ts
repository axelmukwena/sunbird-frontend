// lib/api/qrCodes.ts
import QRCode from 'qrcode';
import { supabaseClient } from '../database/client';
import { generateID } from '@/utilities/helpers';

// Function to generate a QR code as a Data URL
export async function generateQRCodeDataURL(url: string): Promise<string> {
  try {
    // Generate QR code as data URL
    const dataURL = await QRCode.toDataURL(url, {
      width: 300,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#ffffff',
      },
    });
    return dataURL;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw error;
  }
}

// Function to generate a check-in URL for a meeting
export function getCheckInUrl(meetingId: string): string {
  // In production, use your actual domain
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || '';
  return `${baseUrl}/meetings/${meetingId}/checkin`;
}


// Function to store QR code in Supabase Storage
export async function storeQRCodeImage(meetingId: string, dataURL: string): Promise<string | null> {
  try {
    // Convert data URL to blob
    const base64Data = dataURL.split(',')[1];
    const blob = Buffer.from(base64Data, 'base64');
    
    // Upload to Supabase Storage
    const qrcodeID= generateID();
    const fileName = `meetings/${meetingId}/qrcodes/${qrcodeID}.png`;
    const { error } = await supabaseClient.storage
      .from('meetcheck')
      .upload(fileName, blob, {
        contentType: 'image/png',
      });
    
    if (error) {
      console.error('Error storing QR code image:', error);
      return null;
    }
    
    // Get public URL
    const { data: { publicUrl } } = supabaseClient.storage
      .from('meetcheck')
      .getPublicUrl(fileName);
    
    return publicUrl;
  } catch (error) {
    console.error('Error storing QR code image:', error);
    return null;
  }
}

// Function to generate and store QR code for a meeting
export async function generateAndStoreQRCode(meetingId: string): Promise<{ qrCodeUrl: string | null, checkInUrl: string }> {
  // Generate check-in URL
  const checkInUrl = getCheckInUrl(meetingId);
  
  // Generate QR code as data URL
  const qrCodeDataURL = await generateQRCodeDataURL(checkInUrl);
  
  // Store QR code in Supabase Storage
  const qrCodeUrl = await storeQRCodeImage(meetingId, qrCodeDataURL);
  
  // Update meeting record with QR code URL
  if (qrCodeUrl) {
    await supabaseClient
      .from('meetings')
      .update({
        qr_code_url: qrCodeUrl,
        check_in_url: checkInUrl,
      })
      .eq('id', meetingId);
  }
  
  return { qrCodeUrl, checkInUrl };
}