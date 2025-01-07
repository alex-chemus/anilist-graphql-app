import { LinkProps, Link as RouterLink } from "react-router-dom";
import { cn } from "../utils/cn";

export const Link = (props: LinkProps) => (
  <RouterLink
    {...props}
    className={cn("text-inherit hover:text-indigo-500", props.className)}
  />
);
