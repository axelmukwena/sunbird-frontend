import { FC, useMemo } from "react";

import { DataDisplayRow } from "./row";

interface ListDisplayRowProps {
  label: string;
  items?: string[] | null;
  caption?: string | null;
  separator?: string;
  maxItems?: number;
  className?: string;
}

export const ListDisplayRow: FC<ListDisplayRowProps> = ({
  label,
  items,
  caption,
  separator = ", ",
  maxItems,
  className = "",
}) => {
  const displayItems = useMemo(() => {
    if (!items) return [];
    return maxItems ? items.slice(0, maxItems) : items;
  }, [items, maxItems]);
  const moreCount = useMemo(() => {
    if (!items || !maxItems) return 0;
    return items.length - maxItems;
  }, [items, maxItems]);

  return (
    <DataDisplayRow label={label} caption={caption} className={className}>
      {!!displayItems?.length && (
        <div className="space-y-1">
          <span>
            {displayItems.join(separator)}
            {!!moreCount && (
              <span className="text-gray-500 ml-1">and {moreCount} more</span>
            )}
          </span>
        </div>
      )}
    </DataDisplayRow>
  );
};
