"use client";

import { Calendar, CheckCircle, Users } from "lucide-react";
import { FC } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { OrganisationSetupModal } from "./modal";

interface OrganisationSetupProps {}

export const OrganisationSetup: FC<OrganisationSetupProps> = () => {
  const benefits = [
    {
      icon: Calendar,
      title: "Create Meetings",
      description: "Schedule and manage meetings with your team members",
    },
    {
      icon: Users,
      title: "Invite Team Members",
      description: "Add colleagues and collaborate effectively",
    },
    {
      icon: CheckCircle,
      title: "Check-in System",
      description: "Track attendance and manage meeting participation",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <div className="max-w-4xl mx-auto py-12">
        {/* Benefits Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-1">
            Let's Set Up Your Organisation
          </h2>
          <p className="text-center text-sm text-muted-foreground mb-6">
            Your organisation is the workspace where you'll manage meetings,
            invite team members, and control settings. It's required before you
            can create a meeting.
          </p>

          <div className="text-center sm:hidden pb-6">
            <OrganisationSetupModal />
            <p className="text-sm text-gray-500 mt-3">
              This will only take a few minutes to complete
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-md transition-shadow"
              >
                <CardContent>
                  <benefit.icon className="h-6 w-6 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Setup Process */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-center">
              Quick Setup Process
            </CardTitle>
            <CardDescription className="text-center">
              It only takes 2-3 minutes to get everything ready
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    Basic Information
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Organisation name, industry, and contact details
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    Location & Settings
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Address, timezone, and meeting preferences
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    Start Creating Meetings!
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    You'll be ready to schedule and manage meetings
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center">
          <OrganisationSetupModal />
          <p className="text-sm text-gray-500 mt-3">
            This will only take a few minutes to complete
          </p>
        </div>

        {/* FAQ Section */}
        <div className="mt-8 p-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Common Questions
          </h3>
          <div className="space-y-4 text-sm">
            <div>
              <h4 className="font-medium text-gray-900">
                Can I change these details later?
              </h4>
              <p className="text-muted-foreground">
                Yes, you can update your organisation information at any time
                from your settings.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">
                Do I need to add team members now?
              </h4>
              <p className="text-muted-foreground">
                No, you can invite team members later. Focus on setting up the
                organisation first.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">
                What if I'm part of multiple organisations?
              </h4>
              <p className="text-muted-foreground">
                You can create or join multiple organisations later from your
                dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
