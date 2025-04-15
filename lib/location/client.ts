
/**
 * Service for collecting and formatting location and device information for attendee check-ins
 */

import { Database } from "../database/types";


export type LocationInfo = Database['public']['Tables']['attendees']['Row']['location_info'];
export type DeviceInfo = Database['public']['Tables']['attendees']['Row']['device_info'];

export interface CheckInMetadata {
    locationInfo: LocationInfo;
    deviceInfo: DeviceInfo;
  }
  
  /**
   * Get IP address from a free API service
   */
  async function getIpAddress(): Promise<string | null> {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error('Error fetching IP address:', error);
      return null;
    }
  }
  
  /**
   * Get address from coordinates using a free geocoding service
   */
  async function getAddressFromCoordinates(latitude: number, longitude: number): Promise<string | null> {
    try {
      // Using OpenStreetMap's Nominatim service (free, no API key required)
      // Note: For production, you should respect usage policy: https://operations.osmfoundation.org/policies/nominatim/
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
        {
          headers: {
            'User-Agent': 'MeetingAttendanceTracker/1.0' // Identify your application as required by Nominatim
          }
        }
      );
      
      if (!response.ok) {
        throw new Error(`Geocoding API error: ${response.status}`);
      }
      
      const data = await response.json();
      return data.display_name || null;
    } catch (error) {
      console.error('Error getting address from coordinates:', error);
      return null;
    }
  }
  
  /**
   * Get information about the user's browser and device
   */
  function getDeviceInfo(userAgent: string): DeviceInfo {
    // Basic parsing of user agent string
    // In a production app, you might want to use a more robust library
    let browser = 'Unknown';
    let os = 'Unknown';
    let device = 'Unknown';
    
    // Very simple user agent detection
    if (userAgent.includes('Firefox/')) {
      browser = 'Firefox';
    } else if (userAgent.includes('Chrome/')) {
      browser = 'Chrome';
    } else if (userAgent.includes('Safari/') && !userAgent.includes('Chrome/')) {
      browser = 'Safari';
    } else if (userAgent.includes('Edg/')) {
      browser = 'Edge';
    } else if (userAgent.includes('MSIE') || userAgent.includes('Trident/')) {
      browser = 'Internet Explorer';
    }
    
    if (userAgent.includes('Windows')) {
      os = 'Windows';
    } else if (userAgent.includes('Mac OS X')) {
      os = 'macOS';
    } else if (userAgent.includes('Linux')) {
      os = 'Linux';
    } else if (userAgent.includes('Android')) {
      os = 'Android';
    } else if (userAgent.includes('iPhone') || userAgent.includes('iPad')) {
      os = 'iOS';
    }
    
    if (userAgent.includes('Mobile')) {
      device = 'Mobile';
    } else {
      device = 'Desktop';
    }
    
    return {
      browser,
      os,
      device,
      user_agent: userAgent,
    };
  }
  
  /**
   * Main function to collect all location and device information
   */
  export async function collectCheckInMetadata(): Promise<CheckInMetadata> {
    // Get user agent
    const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown';
    
    // Initialize location info
    const locationInfo: LocationInfo = {
      latitude: null,
      longitude: null,
      address: null,
      ip_address: null,
      timestamp: new Date().toISOString()
    };
    
    // Get device info
    const deviceInfo = getDeviceInfo(userAgent);
    
    // Get IP address
    locationInfo.ip_address = await getIpAddress();
    
    // Get geolocation if available
    if (typeof navigator !== 'undefined' && navigator.geolocation) {
      try {
        // Wrap geolocation API in a promise
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          });
        });
        
        locationInfo.latitude = position.coords.latitude;
        locationInfo.longitude = position.coords.longitude;
        
        // Get address from coordinates
        if (locationInfo.latitude && locationInfo.longitude) {
          locationInfo.address = await getAddressFromCoordinates(
            locationInfo.latitude, 
            locationInfo.longitude
          );
        }
      } catch (error) {
        console.error('Error getting geolocation:', error);
        // Location will remain null, which is fine
      }
    }
    
    return {
      locationInfo,
      deviceInfo
    };
  }