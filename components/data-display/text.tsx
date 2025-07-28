import { FC } from "react";

import { DataDisplayRow } from "./row";

interface TextDisplayRowProps {
  label: string;
  value?: string | null;
  caption?: string | null;
  isEven?: boolean;
  multiline?: boolean;
  className?: string;
}

export const TextDisplayRow: FC<TextDisplayRowProps> = ({
  label,
  value,
  caption,
  multiline = false,
  className = "",
}) => {
  return (
    <DataDisplayRow label={label} caption={caption} className={className}>
      <span className={multiline ? "whitespace-pre-wrap" : "truncate block"}>
        {value}
      </span>
    </DataDisplayRow>
  );
};
