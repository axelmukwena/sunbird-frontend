import { X } from "lucide-react";
import { FC } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SelectOptionType } from "@/types/general";
import { mergeTailwind } from "@/utilities/helpers/tailwind";

interface EntityBadgesProps {
  items: SelectOptionType[];
  fieldDisabled?: boolean;
  handleRemove: (id: string) => void;
  className?: string;
}

export const EntityBadges: FC<EntityBadgesProps> = ({
  items,
  fieldDisabled = false,
  handleRemove,
  className,
}) => (
  <div className={mergeTailwind("flex flex-wrap gap-2 mt-3", className)}>
    {items.map(({ value, name, caption }) => (
      <Badge
        key={value}
        variant="secondary"
        className="flex items-center gap-1 pl-3 pr-1 py-1"
      >
        <span>
          {name}
          {caption && ` - ${caption}`}
        </span>
        {!fieldDisabled && (
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="h-4 w-4 p-0 ml-1 bg-transparent hover:bg-gray-200 focus:bg-gray-200 text-gray-300 hover:text-gray-500"
            onClick={() => handleRemove(value)}
            aria-label={`Remove ${name}`}
          >
            <X className="size-[14px]" />
          </Button>
        )}
      </Badge>
    ))}
  </div>
);
