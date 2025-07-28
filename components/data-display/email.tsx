import { MailIcon } from "lucide-react";
import { FC } from "react";

import { WeaverLink } from "../common/weaver-link";
import { DataDisplayRow } from "./row";

interface EmailDisplayRowProps {
  label: string;
  value?: string | null;
  caption?: string | null;
  className?: string;
}

export const EmailDisplayRow: FC<EmailDisplayRowProps> = ({
  label,
  value,
  caption,
  className = "",
}) => {
  return (
    <DataDisplayRow label={label} caption={caption} className={className}>
      {value && (
        <WeaverLink
          href={`mailto:${value}`}
          className="inline-flex items-center space-x-2"
        >
          <MailIcon className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">{value}</span>
        </WeaverLink>
      )}
    </DataDisplayRow>
  );
};
