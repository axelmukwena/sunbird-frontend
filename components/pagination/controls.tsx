import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { FC, useMemo } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";

import { PaginationButton } from "./button";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  marginPagesDisplayed?: number;
  pageRangeDisplayed?: number;
}

export const PaginationControls: FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  marginPagesDisplayed = 2,
  pageRangeDisplayed = 3,
}) => {
  const pages = useMemo(() => {
    const delta = Math.floor(pageRangeDisplayed / 2);
    const range = [];
    const rangeWithDots = [];

    // Calculate the range of pages to show
    let start = Math.max(1, currentPage - delta);
    let end = Math.min(totalPages, currentPage + delta);

    // Adjust range if we're near the beginning or end
    if (currentPage - delta <= marginPagesDisplayed) {
      end = Math.min(totalPages, marginPagesDisplayed + pageRangeDisplayed);
    }
    if (currentPage + delta >= totalPages - marginPagesDisplayed) {
      start = Math.max(
        1,
        totalPages - marginPagesDisplayed - pageRangeDisplayed + 1,
      );
    }

    // Create the range
    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    // Add pages and ellipsis
    if (start > 1) {
      // Add first pages
      for (let i = 1; i <= Math.min(marginPagesDisplayed, start - 1); i++) {
        rangeWithDots.push(i);
      }
      // Add ellipsis if needed
      if (start > marginPagesDisplayed + 1) {
        rangeWithDots.push("ellipsis-start");
      }
    }

    // Add main range
    range.forEach((page) => rangeWithDots.push(page));

    if (end < totalPages) {
      // Add ellipsis if needed
      if (end < totalPages - marginPagesDisplayed) {
        rangeWithDots.push("ellipsis-end");
      }
      // Add last pages
      for (
        let i = Math.max(end + 1, totalPages - marginPagesDisplayed + 1);
        i <= totalPages;
        i++
      ) {
        rangeWithDots.push(i);
      }
    }

    return rangeWithDots;
  }, [currentPage, totalPages, marginPagesDisplayed, pageRangeDisplayed]);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem>
          <PaginationButton
            size="default"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="gap-1 px-2.5 sm:pl-2.5"
          >
            <ChevronLeftIcon className="h-4 w-4" />
            <span className="hidden sm:block">Previous</span>
          </PaginationButton>
        </PaginationItem>

        {/* Page Numbers */}
        {pages.map((page, index) => (
          <PaginationItem key={index}>
            {typeof page === "number" ? (
              <PaginationButton
                onClick={() => onPageChange(page)}
                isActive={page === currentPage}
              >
                {page}
              </PaginationButton>
            ) : (
              <PaginationEllipsis />
            )}
          </PaginationItem>
        ))}

        {/* Next Button */}
        <PaginationItem>
          <PaginationButton
            size="default"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="gap-1 px-2.5 sm:pr-2.5"
          >
            <span className="hidden sm:block">Next</span>
            <ChevronRightIcon className="h-4 w-4" />
          </PaginationButton>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
