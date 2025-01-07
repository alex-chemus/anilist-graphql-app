import { cn } from "@/shared/utils/cn";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-zinc-50", className)}
      {...props}
    />
  );
}

function PageSkeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "m-auto h-full w-3/4 animate-pulse rounded-lg border bg-zinc-50 p-10 text-card-foreground shadow-sm",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton, PageSkeleton };
