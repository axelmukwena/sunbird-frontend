"use client";

import { Building, UserCheck } from "lucide-react";
import { FC } from "react";

import { LinearLoader } from "@/components/loaders/linear";
import { StatisticsCard } from "@/components/view/statistics-card";
import { useAttendeeUserStatistics } from "@/hooks/profile/attendee/statistics";
import { getFormattedDateAndTime } from "@/utilities/helpers/date";

interface UserAttendeeStatisticsHomeProps {}

export const UserAttendeeStatisticsHome: FC<
  UserAttendeeStatisticsHomeProps
> = () => {
  const { isLoading: statsLoading, statistics } = useAttendeeUserStatistics({});

  if (statsLoading) {
    return <LinearLoader />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatisticsCard
        title="Meetings Attended"
        value={statistics?.meetings_attended_count || 0}
        icon={UserCheck}
        description="All time"
      />
      <StatisticsCard
        title="Organisations"
        value={statistics?.unique_organisations_count || 0}
        icon={Building}
        description="You've attended"
      />
      <StatisticsCard
        title="Last Attendance"
        value={
          statistics?.last_attendance_date
            ? getFormattedDateAndTime({
                utc: statistics.last_attendance_date,
              })
            : "None"
        }
        icon={UserCheck}
        description="Your most recent meeting"
      />
    </div>
  );
};
