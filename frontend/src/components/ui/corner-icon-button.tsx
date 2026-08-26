import type { ComponentProps } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type CornerIconButtonPlacement = "inset" | "cascaded";

const placementClasses: Record<CornerIconButtonPlacement, string> = {
  inset: "top-2 right-2",
  cascaded: "-top-3 -right-3",
};

type CornerIconButtonProps = ComponentProps<typeof Button> & {
  placement?: CornerIconButtonPlacement;
};

export function CornerIconButton({
  className,
  placement = "cascaded",
  variant = "outline",
  ...props
}: CornerIconButtonProps) {
  return (
    <Button
      variant={variant}
      size="icon-lg"
      className={cn(
        "absolute z-10 rounded-full shadow-md",
        placementClasses[placement],
        className,
      )}
      {...props}
    />
  );
}
