import { mergeTailwind } from "@/utilities/helpers/tailwind";

const Skeleton = ({
  className,
  ...props
}: React.ComponentProps<"div">): React.JSX.Element => (
  <div
    data-slot="skeleton"
    className={mergeTailwind("bg-accent animate-pulse rounded-md", className)}
    {...props}
  />
);

export { Skeleton };
