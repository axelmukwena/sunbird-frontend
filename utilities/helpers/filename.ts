/**
 * Format a date string for use in filenames
 * @param dateString - ISO date string or date string
 * @returns Formatted date string (YYYY-MM-DD)
 */
export function formatDateForFilename(dateString: string): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date");
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  } catch (error) {
    console.error("Error formatting date for filename:", error);
    // Fallback to current date
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
}

/**
 * Sanitize a string for use in filenames
 * @param text - Text to sanitize
 * @returns Sanitized text safe for filenames
 */
export function sanitizeForFilename(text: string): string {
  return text
    .replace(/[^a-z0-9\s-_]/gi, "") // Remove special characters
    .replace(/\s+/g, "_") // Replace spaces with underscores
    .toLowerCase()
    .substring(0, 50); // Limit length
}

/**
 * Generate a filename for meeting export
 * @param meetingTitle - Title of the meeting
 * @param meetingDate - Date of the meeting
 * @param meetingId - ID of the meeting
 * @returns Generated filename
 */
export function generateMeetingExportFilename(
  meetingTitle: string,
  meetingDate: string,
  meetingId: string,
): string {
  const sanitizedTitle = sanitizeForFilename(meetingTitle);
  const formattedDate = formatDateForFilename(meetingDate);

  return `tendiflow_${sanitizedTitle}_${formattedDate}_${meetingId}.xlsx`;
}
