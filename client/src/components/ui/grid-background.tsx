import { cn } from "@/lib/utils";
import React from "react";

type GridBackgroundDemoProps = {
  children: React.ReactNode;
};

export function GridBackgroundDemo({ children }: GridBackgroundDemoProps) {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div
        className={cn(
          "absolute inset-0 bg-center",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
        )}
      />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-accent-1 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      <div className="relative z-5 w-full">{children}</div>
    </div>
  );
}
