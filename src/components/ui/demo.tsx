import { Button } from "./button";
import { ChevronDown } from "lucide-react";
import * as React from "react";

const Component = React.forwardRef<HTMLButtonElement>(
  ({ ...props }, ref) => (
    <Button variant="ghost" className="h-auto p-0 hover:bg-transparent" ref={ref} {...props}>
      <img
        className="rounded-full"
        src="/CYBERPEDIA Logo-02.jpg"
        alt="Profile image"
        width={40}
        height={40}
        aria-hidden="true"
      />
      <ChevronDown size={16} strokeWidth={2} className="ms-2 opacity-60" aria-hidden="true" />
    </Button>
  )
);

Component.displayName = "UserProfileButton";

export { Component }; 