"use client";

import { ArrowRight, Group, Settings, UserCog, Users } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ClientPathname } from "@/types/paths";

interface QuickActionItem {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  variant?: "default" | "outline" | "secondary";
}

export const QuickActions: FC = () => {
  const quickActions: QuickActionItem[] = [
    {
      title: "Manage Meetings",
      description: "Create, view, and manage your meetings",
      href: ClientPathname.MEETINGS,
      icon: <Group className="h-4 w-4" />,
      variant: "outline",
    },
    {
      title: "View Attendees",
      description: "See who has attended your meetings",
      href: ClientPathname.ATTENDEES,
      icon: <Users className="h-4 w-4" />,
      variant: "outline",
    },
    {
      title: "Organisation Settings",
      description: "Manage your organisation's settings",
      href: ClientPathname.ORGANISATION_SETTINGS,
      icon: <Settings className="h-4 w-4" />,
      variant: "outline",
    },
    {
      title: "Account Settings",
      description: "Update your profile and preferences",
      href: ClientPathname.ACCOUNT_SETTINGS,
      icon: <UserCog className="h-4 w-4" />,
      variant: "outline",
    },
  ];

  return (
    <Card className="bg-gray-100">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>
          Access frequently used features and settings quickly.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((action) => (
            <Button
              key={action.title}
              asChild
              variant={action.variant}
              className="h-auto p-4 justify-start"
            >
              <Link href={action.href}>
                <div className="flex items-start gap-3 w-full">
                  <div className="mt-0.5">{action.icon}</div>
                  <div className="flex-1 text-left">
                    <div className="font-medium text-sm">{action.title}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {action.description}
                    </div>
                  </div>
                  <ArrowRight className="h-3 w-3 mt-1 opacity-50" />
                </div>
              </Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
