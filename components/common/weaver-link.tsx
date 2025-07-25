import Link from "next/link";
import { FC } from "react";

import { mergeTailwind } from "@/utilities/helpers/tailwind";

interface WeaverLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  className?: string;
}

export const WeaverLink: FC<WeaverLinkProps> = ({
  children,
  href,
  className = "",
  ...props
}) => (
  <Link
    href={href}
    prefetch
    className={mergeTailwind(
      "text-sm text-blue-900 hover:text-blue-800 transition-colors inline-flex items-center hover:underline",
      className,
    )}
    {...props}
  >
    {children}
  </Link>
);
