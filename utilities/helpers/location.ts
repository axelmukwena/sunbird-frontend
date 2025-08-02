// lib/location/client.ts

import {
  AttendeeCheckinDevice,
  AttendeeCheckinLocation,
} from "@/api/services/weaver/attendees/types";

export interface CheckInMetadata {
  locationInfo: AttendeeCheckinLocation;
  deviceInfo: AttendeeCheckinDevice;
}

/**
 * Get IP address from a free API service
 */
async function getIpAddress(): Promise<string | null> {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error("Error fetching IP address:", error);
    return null;
  }
}

/**
 * Get address from coordinates using a free geocoding service
 */
async function getAddressFromCoordinates(
  latitude: number,
  longitude: number,
): Promise<string | null> {
  try {
    // Using OpenStreetMap's Nominatim service (free, no API key required)
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
      {
        headers: {
          "User-Agent": "MeetingAttendanceTracker/1.0",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Geocoding API error: ${response.status}`);
    }

    const data = await response.json();
    return data.display_name || null;
  } catch (error) {
    console.error("Error getting address from coordinates:", error);
    return null;
  }
}

/**
 * Get screen resolution information
 */
function getScreenResolution(): string | null {
  if (typeof window !== "undefined" && window.screen) {
    return `${window.screen.width}x${window.screen.height}`;
  }
  return null;
}

/**
 * Get user's timezone
 */
function getTimezone(): string | null {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch (error) {
    console.error("Error getting timezone:", error);
    return null;
  }
}

/**
 * Get information about the user's browser and device
 */
function getDeviceInfo(userAgent: string): AttendeeCheckinDevice {
  let browser: string | null = null;
  let os: string | null = null;
  let device: string | null = null;

  // Browser detection
  if (userAgent.includes("Firefox/")) {
    browser = "Firefox";
  } else if (userAgent.includes("Chrome/")) {
    browser = "Chrome";
  } else if (userAgent.includes("Safari/") && !userAgent.includes("Chrome/")) {
    browser = "Safari";
  } else if (userAgent.includes("Edg/")) {
    browser = "Edge";
  } else if (userAgent.includes("MSIE") || userAgent.includes("Trident/")) {
    browser = "Internet Explorer";
  }

  // OS detection
  if (userAgent.includes("Windows")) {
    os = "Windows";
  } else if (userAgent.includes("Mac OS X")) {
    os = "macOS";
  } else if (userAgent.includes("Linux")) {
    os = "Linux";
  } else if (userAgent.includes("Android")) {
    os = "Android";
  } else if (userAgent.includes("iPhone") || userAgent.includes("iPad")) {
    os = "iOS";
  }

  // Device type detection
  if (userAgent.includes("Mobile")) {
    device = "Mobile";
  } else if (userAgent.includes("Tablet") || userAgent.includes("iPad")) {
    device = "Tablet";
  } else {
    device = "Desktop";
  }

  return {
    browser,
    os,
    device,
    user_agent: userAgent,
    screen_resolution: getScreenResolution(),
    timezone: getTimezone(),
  };
}

/**
 * Main function to collect all location and device information
 */
export async function collectCheckInMetadata(): Promise<CheckInMetadata> {
  // Get user agent
  const userAgent =
    typeof navigator !== "undefined" ? navigator.userAgent : "Unknown";

  // Initialize location info with required fields
  const locationInfo: AttendeeCheckinLocation = {
    latitude: 0, // Will be updated with actual coordinates
    longitude: 0, // Will be updated with actual coordinates
    address: "",
    ip_address: "",
    accuracy: 0,
    timestamp: new Date().toISOString(),
  };

  // Get device info
  const deviceInfo = getDeviceInfo(userAgent);

  // Get IP address
  const ipAddress = await getIpAddress();
  locationInfo.ip_address = ipAddress || "";

  // Get geolocation if available
  if (typeof navigator !== "undefined" && navigator.geolocation) {
    try {
      // Wrap geolocation API in a promise
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          });
        },
      );

      locationInfo.latitude = position.coords.latitude;
      locationInfo.longitude = position.coords.longitude;
      locationInfo.accuracy = position.coords.accuracy || 0;

      // Get address from coordinates
      const address = await getAddressFromCoordinates(
        locationInfo.latitude,
        locationInfo.longitude,
      );
      locationInfo.address = address || "";
    } catch (error) {
      console.error("Error getting geolocation:", error);
      // Reset to empty values if geolocation fails
      locationInfo.latitude = 0;
      locationInfo.longitude = 0;
      locationInfo.accuracy = 0;
      locationInfo.address = "";
    }
  }

  return {
    locationInfo,
    deviceInfo,
  };
}
