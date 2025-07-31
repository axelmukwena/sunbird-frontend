import { Calendar, CheckCircle, MapPin, Star } from "lucide-react";
import { ReactNode } from "react";
import { Column } from "react-data-grid";

import {
  AttendanceStatus,
  Attendee,
} from "@/api/services/weaver/attendees/types";
import { WeaverLink } from "@/components/common/weaver-link";
import { Badge } from "@/components/ui/badge";
import {
  getFormattedDate,
  getFormattedDateAndTime,
  getFormattedTime,
} from "@/utilities/helpers/date";

import { AttendeeActionsMenu } from "../../one/actions-menu";

interface AttendeeColumnsProps {
  handleMutateAttendees: () => void;
}

const getAttendanceStatusVariant = (
  status: AttendanceStatus,
): "default" | "secondary" | "destructive" | "outline" => {
  switch (status) {
    case AttendanceStatus.CHECKED_IN:
      return "default";
    case AttendanceStatus.CHECKED_IN_LATE:
      return "secondary";
    case AttendanceStatus.REGISTERED:
      return "outline";
    case AttendanceStatus.CANCELLED:
      return "destructive";
    default:
      return "outline";
  }
};

const getDatabaseStatusVariant = (
  status: string,
): "default" | "secondary" | "destructive" | "outline" => {
  switch (status.toLowerCase()) {
    case "active":
      return "default";
    case "archived":
      return "secondary";
    case "deleted":
      return "destructive";
    default:
      return "outline";
  }
};

const formatAttendanceStatus = (status: AttendanceStatus): string => {
  return status.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
};

export const AttendeeColumns = (
  props: AttendeeColumnsProps,
): readonly Column<Attendee>[] => [
  {
    key: "actions",
    name: "",
    cellClass: "actions-cell",
    renderCell: ({ row }) => (
      <AttendeeActionsMenu
        attendee={row}
        handleMutateAttendees={props.handleMutateAttendees}
      />
    ),
    width: 50,
    resizable: false,
    frozen: true,
  },
  {
    key: "name",
    name: "Attendee",
    width: 250,
    resizable: true,
    sortable: true,
    renderCell: ({ row }): ReactNode => (
      <WeaverLink
        href={`/meetings/${row.meeting_id}/attendees/${row.id}`}
        className="font-medium text-sm text-gray-900 hover:text-blue-600 transition-colors"
      >
        {row.first_name} {row.last_name}
      </WeaverLink>
    ),
  },
  {
    key: "email",
    name: "Email",
    width: 200,
    resizable: true,
    renderCell: ({ row }): ReactNode => (
      <span className="truncate">{row.email}</span>
    ),
  },
  {
    key: "attendance_status",
    name: "Status",
    width: 120,
    resizable: true,
    sortable: true,
    renderCell: ({ row }): ReactNode => (
      <Badge variant={getAttendanceStatusVariant(row.attendance_status)}>
        {formatAttendanceStatus(row.attendance_status)}
      </Badge>
    ),
  },
  {
    key: "organisation_name",
    name: "Organisation",
    width: 180,
    resizable: true,
    sortable: true,
    renderCell: ({ row }): ReactNode => {
      if (!row.organisation_name) {
        return <span className="text-sm text-gray-400">-</span>;
      }
      return <span className="truncate">{row.organisation_name}</span>;
    },
  },
  {
    key: "occupation",
    name: "Occupation",
    width: 150,
    resizable: true,
    renderCell: ({ row }): ReactNode => (
      <span className="truncate">{row.occupation || "-"}</span>
    ),
  },
  {
    key: "phone_number",
    name: "Phone",
    width: 130,
    resizable: true,
    renderCell: ({ row }): ReactNode => {
      if (!row.phone_number) {
        return <span className="truncate">-</span>;
      }
      return <span className="truncate">{row.phone_number}</span>;
    },
  },
  {
    key: "meeting",
    name: "Meeting",
    width: 200,
    resizable: true,
    renderCell: ({ row }): ReactNode => {
      if (!row.meeting) {
        return <span className="text-sm text-gray-400">-</span>;
      }
      return (
        <div className="space-y-1">
          <WeaverLink
            href={`/meetings/${row.meeting_id}`}
            className="text-sm text-blue-600 hover:text-blue-800 truncate block"
          >
            {row.meeting.title}
          </WeaverLink>
          {row.meeting.start_datetime && (
            <div className="flex items-center text-xs text-gray-500">
              <Calendar className="w-3 h-3 mr-1 text-gray-400" />
              {getFormattedDate({ utc: row.meeting.start_datetime })}
            </div>
          )}
        </div>
      );
    },
  },
  {
    key: "checkin_status",
    name: "Check-in",
    width: 120,
    resizable: true,
    renderCell: ({ row }): ReactNode => {
      if (!row.checkin) {
        return <span className="text-sm text-gray-400">-</span>;
      }
      return (
        <div className="space-y-1">
          <div className="flex items-center text-sm text-green-600">
            <CheckCircle className="w-4 h-4 mr-1" />
            Checked in
          </div>
          <div className="text-xs text-gray-500">
            {getFormattedTime(row.checkin.checkin_datetime)}
          </div>
        </div>
      );
    },
  },
  {
    key: "checkin_location",
    name: "Check-in Location",
    width: 150,
    resizable: true,
    renderCell: ({ row }): ReactNode => {
      if (!row.checkin?.checkin_location) {
        return <span className="text-sm text-gray-400">-</span>;
      }
      const location = row.checkin.checkin_location;
      return (
        <div className="space-y-1">
          <div className="flex items-center text-sm text-gray-900">
            <MapPin className="w-3 h-3 mr-1 text-gray-400" />
            <span className="text-xs">
              {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
            </span>
          </div>
          {location.address && (
            <div className="text-xs text-gray-500 truncate max-w-xs">
              {location.address}
            </div>
          )}
        </div>
      );
    },
  },
  {
    key: "feedback_rating",
    name: "Rating",
    width: 100,
    resizable: true,
    renderCell: ({ row }): ReactNode => {
      if (!row.feedback?.rating) {
        return <span className="text-sm text-gray-400">-</span>;
      }
      return (
        <div className="flex items-center text-sm text-yellow-600">
          <Star className="w-4 h-4 mr-1 fill-current" />
          <span>{row.feedback.rating}/5</span>
        </div>
      );
    },
  },
  {
    key: "feedback_comment",
    name: "Feedback",
    width: 200,
    resizable: true,
    renderCell: ({ row }): ReactNode => {
      if (!row.feedback?.comment) {
        return <span className="text-sm text-gray-400">-</span>;
      }
      return (
        <div
          className="text-sm text-gray-700 truncate"
          title={row.feedback.comment}
        >
          {row.feedback.comment}
        </div>
      );
    },
  },
  {
    key: "custom_fields",
    name: "Custom Fields",
    width: 120,
    resizable: true,
    renderCell: ({ row }): ReactNode => {
      if (
        !row.custom_field_responses ||
        row.custom_field_responses.length === 0
      ) {
        return <span className="text-sm text-gray-400">-</span>;
      }
      return (
        <Badge variant="outline" className="text-xs">
          {row.custom_field_responses.length} field
          {row.custom_field_responses.length !== 1 ? "s" : ""}
        </Badge>
      );
    },
  },
  {
    key: "database_status",
    name: "Database Status",
    width: 100,
    resizable: true,
    sortable: true,
    renderCell: ({ row }): ReactNode => (
      <Badge variant={getDatabaseStatusVariant(row.database_status)}>
        {row.database_status.charAt(0).toUpperCase() +
          row.database_status.slice(1)}
      </Badge>
    ),
  },
  {
    key: "created_at",
    name: "Registered",
    sortable: true,
    width: 160,
    resizable: true,
    renderCell: ({ row }): ReactNode => (
      <div className="text-sm text-gray-700">
        {getFormattedDateAndTime({ utc: row.created_at })}
      </div>
    ),
  },
  {
    key: "updated_at",
    name: "Updated",
    sortable: true,
    width: 160,
    resizable: true,
    renderCell: ({ row }): ReactNode => (
      <div className="text-sm text-gray-700">
        {row.updated_at
          ? getFormattedDateAndTime({ utc: row.updated_at })
          : "-"}
      </div>
    ),
  },
];
