"use client";

import { Building, UserCheck } from "lucide-react";
import { FC } from "react";

import {
  AttendanceStatus,
  AttendeeSortBy,
} from "@/api/services/weaver/attendees/types";
import { OrderBy } from "@/api/services/weaver/types/general";
import { LinearLoader } from "@/components/loaders/linear";
import { LogoVertical } from "@/components/logos/vertical";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StatisticsCard } from "@/components/view/statistics-card";
import { useAttendeeUserSearch } from "@/hooks/profile/attendee/search";
import { useAttendeeUserStatistics } from "@/hooks/profile/attendee/statistics";
import { useCurrentUserContext } from "@/providers/current-user";
import {
  getFormattedDateAndTime,
  getTimeBasedGreeting,
} from "@/utilities/helpers/date";

import { RecentAttendances } from "./recent";

interface UserHomeProps {}

export const UserHome: FC<UserHomeProps> = () => {
  const { currentUser } = useCurrentUserContext();
  const { isLoading: statsLoading, statistics } = useAttendeeUserStatistics({});

  const { attendees: recentAttendances, isLoading: attendancesLoading } =
    useAttendeeUserSearch({
      query: {
        sort_by: AttendeeSortBy.CREATED_AT,
        order_by: OrderBy.DESC,
        attendance_statuses: [
          AttendanceStatus.CHECKED_IN,
          AttendanceStatus.CHECKED_IN_LATE,
          AttendanceStatus.REGISTERED,
        ],
      },
      limit: 10,
      enableInfiniteLoading: false,
    });

  if (statsLoading || !currentUser || !statistics) {
    return <LinearLoader />;
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col space-y-4">
        <LogoVertical showWord={false} markWidth={100} />
        <h2 className="text-xl font-semibold mb-2">
          {getTimeBasedGreeting()}, {currentUser.first_name}! 👋
        </h2>
        <p className="text-muted-foreground text-sm">
          Track your meeting attendance and view your participation history.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatisticsCard
          title="Meetings Attended"
          value={statistics.meetings_attended_count}
          icon={UserCheck}
          description="All time"
        />
        <StatisticsCard
          title="Organisations"
          value={statistics.unique_organisations_count}
          icon={Building}
          description="You've attended"
        />
        <StatisticsCard
          title="Last Attendance"
          value={
            statistics.last_attendance_date
              ? getFormattedDateAndTime({
                  utc: statistics.last_attendance_date,
                })
              : "None"
          }
          icon={UserCheck}
          description="Your most recent meeting"
        />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Attendance</CardTitle>
            <CardDescription>
              Your latest meeting check-ins and registrations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentAttendances
              attendances={recentAttendances}
              isLoading={attendancesLoading}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
