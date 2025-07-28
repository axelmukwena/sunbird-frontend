import { Button } from "@/components/ui/button";
import { mergeTailwind } from "@/utilities/helpers/tailwind";

interface PaginationButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
  disabled?: boolean;
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export const PaginationButton: React.FC<PaginationButtonProps> = ({
  children,
  onClick,
  isActive,
  disabled,
  size = "icon",
  className,
}) => {
  return (
    <Button
      variant={isActive ? "outline" : "ghost"}
      size={size}
      onClick={onClick}
      disabled={disabled}
      aria-current={isActive ? "page" : undefined}
      className={mergeTailwind(isActive ? "border-primary" : "", className)}
    >
      {children}
    </Button>
  );
};
