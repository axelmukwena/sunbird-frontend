import { FC } from "react";

import { Badge } from "@/components/ui/badge";
import { Variant } from "@/types/general";

import { DataDisplayRow } from "./row";

interface BadgeDisplayRowProps {
  label: string;
  value?: string | null;
  caption?: string | null;
  variant?: Variant;
  className?: string;
}

export const BadgeDisplayRow: FC<BadgeDisplayRowProps> = ({
  label,
  value,
  caption,
  variant = "outline",
  className = "",
}) => {
  return (
    <DataDisplayRow label={label} caption={caption} className={className}>
      {!value && (
        <Badge variant={variant} className="w-fit">
          {value}
        </Badge>
      )}
    </DataDisplayRow>
  );
};
