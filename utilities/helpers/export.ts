import * as XLSX from "xlsx";

import { Attendee } from "@/lib/database/collections/attendees";
import { Meeting } from "@/lib/database/collections/meetings";

/**
 * Formats a date string to a more readable format
 */
const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

/**
 * Formats a date to yyyy-MM-dd format for filenames
 */
const formatDateForFilename = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};

/**
 * Exports meeting data including attendees to an Excel file
 */
export const exportMeetingData = (
  meeting: Meeting,
  attendees: Attendee[],
): void => {
  // Create a new workbook
  const wb = XLSX.utils.book_new();

  // Meeting details at the top
  const meetingInfo = [
    ["Meeting Details"],
    [""],
    ["Meeting ID:", meeting.id],
    ["Title:", meeting.title],
    ["Date:", formatDate(meeting.date)],
    ["Time:", `${meeting.start_time} - ${meeting.end_time}`],
    ["Location:", meeting.location],
    ["Status:", meeting.status],
    ["Description:", meeting.description || ""],
    ["Recurring:", meeting.is_recurring ? "Yes" : "No"],
    ["Recurring Pattern:", meeting.recurring_pattern || "N/A"],
    ["Created By:", meeting.created_by],
    ["Created Date:", new Date(meeting.created_at).toLocaleDateString()],
    [""],
    ["Attendance Summary"],
    [""],
    ["Total Attendees:", attendees.length],
    ["Checked In:", attendees.filter((a) => a.check_in_time).length],
    [
      "Attendance Rate:",
      attendees.length > 0
        ? `${Math.round((attendees.filter((a) => a.check_in_time).length / attendees.length) * 100)}%`
        : "0%",
    ],
    [""],
    ["Attendees List"],
    [""],
  ];

  // location_info: {
  //   latitude: number | null;
  //   longitude: number | null;
  //   address: string | null;
  //   ip_address: string | null;
  //   timestamp: string;
  // } | null;
  // device_info: {
  //   browser: string;
  //   os: string;
  //   device: string;
  //   user_agent: string;
  // } | null;

  // Headers for attendees table
  const attendeesHeader = [
    "Name",
    "Email",
    "Department",
    "Check-in Status",
    "Check-in Time",
    "Fingerprint ID",
    "Notes",
    "Location Latitude",
    "Location Longitude",
    "Location Address",
    "IP Address",
    "Device Browser",
    "Device OS",
    "Device Type",
    "User Agent",
  ];

  // Attendee data
  const attendeesData = attendees.map((attendee) => [
    attendee.name,
    attendee.email,
    attendee.department || "",
    attendee.check_in_time ? "Checked In" : "Not Checked In",
    attendee.check_in_time
      ? new Date(attendee.check_in_time).toLocaleString()
      : "",
    attendee.fingerprint_id || "",
    attendee.notes || "",
    attendee.location_info?.latitude || "",
    attendee.location_info?.longitude || "",
    attendee.location_info?.address || "",
    attendee.location_info?.ip_address || "",
    attendee.device_info?.browser || "",
    attendee.device_info?.os || "",
    attendee.device_info?.device || "",
    attendee.device_info?.user_agent || "",
  ]);

  // Combine all data
  const wsData = [...meetingInfo, attendeesHeader, ...attendeesData];

  // Create worksheet and add to workbook
  const ws = XLSX.utils.aoa_to_sheet(wsData);

  // Set column widths
  const colWidths = [
    { wch: 15 }, // A
    { wch: 30 }, // B
    { wch: 20 }, // C
    { wch: 15 }, // D
    { wch: 20 }, // E
    { wch: 30 }, // F
  ];
  ws["!cols"] = colWidths;

  // Add some style to the header rows
  for (let i = 0; i < meetingInfo.length; i++) {
    const cell = XLSX.utils.encode_cell({ r: i, c: 0 });
    if (!ws[cell]) continue;

    if (i === 0 || i === 13 || i === 19) {
      // Section headers (Meeting Details, Attendance Summary, Attendees List)
      ws[cell].s = { font: { bold: true, sz: 14 } };
    } else if (i === meetingInfo.length - 1) {
      // Attendees table header
      for (let j = 0; j < attendeesHeader.length; j++) {
        const headerCell = XLSX.utils.encode_cell({ r: i, c: j });
        if (ws[headerCell]) {
          ws[headerCell].s = {
            font: { bold: true },
            fill: { fgColor: { rgb: "EFEFEF" } },
          };
        }
      }
    }
  }

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(wb, ws, "Meeting Data");

  // Generate filename
  const filename = `tendiflow_${meeting.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}_${formatDateForFilename(meeting.date)}_${meeting.id}.xlsx`;

  // Write the workbook and trigger download
  XLSX.writeFile(wb, filename);
};
