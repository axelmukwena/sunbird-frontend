import { FC } from "react";

import { Badge } from "@/components/ui/badge";
import { SelectOptionType } from "@/types/general";

interface OptionRendererProps {
  option: string;
  options: SelectOptionType[];
}

export const OptionRenderer: FC<OptionRendererProps> = ({
  option,
  options,
}) => {
  const status = options.find((o) => o.value === option);
  if (!status) {
    return <Badge variant="outline">Unknown</Badge>;
  }
  return (
    <div className="flex flex-row items-center justify-center w-full h-full">
      <Badge variant={status.badgeVariant}>{status.name}</Badge>
    </div>
  );
};
