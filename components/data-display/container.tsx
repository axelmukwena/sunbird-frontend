import { FC, ReactNode } from "react";

interface DataDisplayContainerProps {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export const DataDisplayContainer: FC<DataDisplayContainerProps> = ({
  title,
  description,
  children,
  className = "",
}) => {
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
      <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-md border shadow-sm">
        <dl className="divide-y divide-gray-100 flex flex-col">{children}</dl>
      </div>
    </div>
  );
};
