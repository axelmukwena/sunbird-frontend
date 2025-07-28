import { FC, ReactNode } from "react";

import { mergeTailwind } from "@/utilities/helpers/tailwind";

interface DataDisplayRowProps {
  label: string;
  caption?: string | null;
  children: ReactNode;
  className?: string;
}

export const DataDisplayRow: FC<DataDisplayRowProps> = ({
  label,
  caption,
  children,
  className = "",
}) => {
  return (
    <div
      className={mergeTailwind(
        className,
        "px-4 py-6 sm:px-6 hover:bg-gray-50 transition-colors space-y-2",
      )}
    >
      <div className="space-y-1">
        <dt className="text-sm font-medium text-gray-900">{label}</dt>
        {caption && <p className="text-xs text-gray-500">{caption}</p>}
      </div>
      <dd className="text-sm text-gray-700">{children}</dd>
    </div>
  );
};
