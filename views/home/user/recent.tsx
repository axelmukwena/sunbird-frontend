"use client";

import { Calendar, Clock, UserCheck } from "lucide-react";
import { FC, JSX } from "react";

import {
  AttendanceStatus,
  Attendee,
} from "@/api/services/weaver/attendees/types";
import { Badge } from "@/components/ui/badge";
import { getFormattedDateAndTime } from "@/utilities/helpers/date";

interface RecentAttendanceItemProps {
  attendance: Attendee;
}

const RecentAttendanceItem: FC<RecentAttendanceItemProps> = ({
  attendance,
}) => {
  const getStatusBadge = (status: AttendanceStatus): JSX.Element => {
    switch (status) {
      case AttendanceStatus.CHECKED_IN:
        return (
          <Badge variant="default" className="text-xs">
            Attended
          </Badge>
        );
      case AttendanceStatus.CHECKED_IN_LATE:
        return (
          <Badge variant="secondary" className="text-xs">
            Late
          </Badge>
        );
      case AttendanceStatus.REGISTERED:
        return (
          <Badge variant="outline" className="text-xs">
            Registered
          </Badge>
        );
      case AttendanceStatus.CANCELLED:
        return (
          <Badge variant="destructive" className="text-xs">
            Cancelled
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="text-xs">
            {status}
          </Badge>
        );
    }
  };

  const formatDateTime = (dateString: string): string => {
    return getFormattedDateAndTime({ utc: dateString });
  };

  return (
    <div className="flex items-center space-x-4 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
      <div className="w-3 h-3 rounded-full bg-green-500 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm truncate">
          {attendance.meeting?.title || "Unknown Meeting"}
        </h4>
        <p className="text-sm text-gray-500 truncate">
          {attendance.organisation?.name || "Unknown Organization"}
        </p>
        <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <Calendar className="w-3 h-3" />
            <span>
              {attendance.meeting?.start_datetime
                ? formatDateTime(attendance.meeting.start_datetime)
                : "N/A"}
            </span>
          </div>
          {attendance.checkin?.checkin_datetime && (
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>
                Checked in at{" "}
                {formatDateTime(attendance.checkin.checkin_datetime)}
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="flex-shrink-0">
        {getStatusBadge(attendance.attendance_status)}
      </div>
    </div>
  );
};

interface RecentAttendancesProps {
  attendances: Attendee[];
  isLoading: boolean;
}

export const RecentAttendances: FC<RecentAttendancesProps> = ({
  attendances,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="flex items-center space-x-4 p-3">
              <div className="w-3 h-3 rounded-full bg-gray-200" />
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-1" />
                <div className="h-3 bg-gray-200 rounded w-2/3" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (attendances.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <UserCheck className="w-12 h-12 mx-auto mb-4 text-gray-300" />
        <p className="text-sm">No attendance records found</p>
        <p className="text-xs text-gray-400">
          Start attending meetings to see your history here
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {attendances.map((attendance) => (
        <RecentAttendanceItem key={attendance.id} attendance={attendance} />
      ))}
    </div>
  );
};
