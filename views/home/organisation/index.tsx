"use client";

import { Building, Calendar, TrendingUp, UserCheck, Users } from "lucide-react";
import { FC } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StatisticsCard } from "@/components/view/statistics-card";

interface OrganisationMemberHomeProps {}

export const OrganisationMemberHome: FC<OrganisationMemberHomeProps> = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatisticsCard
          title="Organisations"
          value="3"
          icon={Building}
          description="You manage"
        />
        <StatisticsCard
          title="Active Meetings"
          value="12"
          icon={Calendar}
          description="This month"
        />
        <StatisticsCard
          title="Total Attendees"
          value="234"
          icon={Users}
          description="Across all meetings"
        />
        <StatisticsCard
          title="Your Attendance"
          value="8"
          icon={UserCheck}
          description="Meetings attended"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Management */}
        <div className="lg:col-span-2 space-y-6">
          {/* Organisations You Manage */}
          <Card>
            <CardHeader>
              <CardTitle>Organisations You Manage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* {organisations.map((org) => (
                  <div
                    key={org.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div>
                      <h4 className="font-medium">{org.name}</h4>
                      <p className="text-sm text-gray-500">
                        {org.activeMeetings} active meetings
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium">
                        {org.totalAttendees}
                      </span>
                      <p className="text-xs text-gray-500">total attendees</p>
                    </div>
                  </div>
                ))} */}
              </div>
            </CardContent>
          </Card>

          {/* Recent Meetings You Created */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Meetings Created</CardTitle>
              <CardDescription>Meetings you've organized</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* {createdMeetings.map((meeting) => (
                  <div
                    key={meeting.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <div>
                        <h4 className="font-medium">{meeting.title}</h4>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Calendar className="w-3 h-3" />
                          <span>{meeting.date}</span>
                          <MapPin className="w-3 h-3" />
                          <span>{meeting.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium">
                        {meeting.attendeeCount}
                      </span>
                      <p className="text-xs text-gray-500">attendees</p>
                    </div>
                  </div>
                ))} */}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Personal */}
        <div className="space-y-6">
          {/* Your Personal Attendance */}
          <Card>
            <CardHeader>
              <CardTitle>Your Attendance</CardTitle>
              <CardDescription>Meetings you've attended</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* {personalAttendance.map((attendance) => (
                  <div key={attendance.id} className="p-3 border rounded-lg">
                    <h4 className="font-medium text-sm">
                      {attendance.meetingTitle}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {attendance.organisation}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{attendance.checkedInAt}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        Attended
                      </Badge>
                    </div>
                  </div>
                ))} */}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                Create New Meeting
              </Button>
              <Button variant="outline" className="w-full" size="sm">
                <Users className="w-4 h-4 mr-2" />
                Manage Attendees
              </Button>
              <Button variant="outline" className="w-full" size="sm">
                <TrendingUp className="w-4 h-4 mr-2" />
                View Analytics
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
