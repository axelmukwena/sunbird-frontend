import { LucideIcon } from "lucide-react";
import { FC } from "react";

import { Card, CardContent } from "@/components/ui/card";

interface StatisticsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description: string;
}

export const StatisticsCard: FC<StatisticsCardProps> = ({
  title,
  value,
  icon: Icon,
  description,
}) => (
  <Card>
    <CardContent>
      <div className="flex items-center">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <div className="flex items-end space-x-2">
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-xs text-gray-500 mb-[5px]">{description}</p>
          </div>
        </div>
        <Icon className="w-8 h-8 text-gray-400" />
      </div>
    </CardContent>
  </Card>
);
