import { FC } from "react";

import { Separator } from "@/components/ui/separator";
import { SelectOptionType } from "@/types/general";
import { PAGE_LIMIT_OPTIONS } from "@/utilities/constants/options";
import { pluralize } from "@/utilities/helpers/text";

import { SelectSearchPicker } from "../inputs/select/select-search-picker";
import { PaginationControls } from "./controls";

interface TablePaginationProps {
  entity: string;
  count: number;
  total: number;
  limit: number;
  page: number; // 0-based page index
  handleLimitChange: (limit: string) => void;
  handlePageChange: (event: { selected: number }) => void;
  limitOptions?: SelectOptionType[];
  showEntityCount?: boolean;
  showLimitSelector?: boolean;
  className?: string;
}

export const TablePagination: FC<TablePaginationProps> = ({
  entity,
  count,
  total,
  limit,
  page,
  handleLimitChange,
  handlePageChange,
  limitOptions = PAGE_LIMIT_OPTIONS,
  showEntityCount = true,
  showLimitSelector = true,
  className,
}) => {
  if (!count && !total) {
    return null;
  }

  const totalPages = Math.ceil(total / limit);
  const currentPage = page + 1;

  const handleInternalPageChange = (newPage: number): void => {
    handlePageChange({ selected: newPage - 1 });
  };

  const handleLimitSelect = (values: string[]): void => {
    if (values.length > 0) {
      handleLimitChange(values[0]);
    }
  };

  return (
    <div className={`flex items-center justify-between mt-4 ${className}`}>
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        {showEntityCount && (
          <>
            <span>
              {count} of {total} {pluralize(entity, total)}
            </span>
            {showLimitSelector && (
              <Separator orientation="vertical" className="h-6" />
            )}
          </>
        )}

        {showLimitSelector && (
          <>
            <span>Show</span>
            <SelectSearchPicker
              options={limitOptions}
              selectedValues={[limit.toString()]}
              onChange={handleLimitSelect}
              triggerPlaceholder={limit.toString()}
              className="w-20"
              disabled={
                total <=
                Math.min(...limitOptions.map((opt) => parseInt(opt.value)))
              }
            />
            <span>{pluralize(entity, 2)} per page</span>
          </>
        )}
      </div>
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handleInternalPageChange}
      />
    </div>
  );
};
