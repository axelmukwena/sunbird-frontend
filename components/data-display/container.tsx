import { FC, ReactNode } from "react";

interface DataDisplayContainerProps {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  columns?: 1 | 2 | 3;
}

export const DataDisplayContainer: FC<DataDisplayContainerProps> = ({
  title,
  description,
  children,
  className = "",
  columns = 1,
}) => {
  const getGridClass = (): string => {
    switch (columns) {
      case 2:
        return "grid grid-cols-1 md:grid-cols-2 gap-x-6";
      case 3:
        return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6";
      default:
        return "";
    }
  };

  return (
    <div className={className}>
      {(title || description) && (
        <div className="px-4 sm:px-0 mb-6">
          {title && (
            <h3 className="text-base font-semibold text-gray-900">{title}</h3>
          )}
          {description && (
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {description}
            </p>
          )}
        </div>
      )}
      <div className="border-t border-gray-100">
        <dl className={`divide-y divide-gray-100 ${getGridClass()}`}>
          {children}
        </dl>
      </div>
    </div>
  );
};
