import { PhoneIcon } from "lucide-react";
import { FC } from "react";

import { WeaverLink } from "../common/weaver-link";
import { DataDisplayRow } from "./row";

interface PhonenumberDisplayRowProps {
  label: string;
  value?: string | null;
  caption?: string | null;
  isEven?: boolean;
  className?: string;
}

export const PhonenumberDisplayRow: FC<PhonenumberDisplayRowProps> = ({
  label,
  value,
  caption,
  className = "",
}) => {
  return (
    <DataDisplayRow label={label} caption={caption} className={className}>
      {value && (
        <WeaverLink
          href={`tel:${value}`}
          className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
        >
          <PhoneIcon className="w-4 h-4 flex-shrink-0" />
          <span>{value}</span>
        </WeaverLink>
      )}
    </DataDisplayRow>
  );
};
