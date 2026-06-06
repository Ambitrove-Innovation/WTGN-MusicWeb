"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export function List({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      className={cn("m-0 p-0 list-none", className)}
      data-slot="list"
      {...props}
    />
  );
}

export function ListItem({ className, ...props }: React.ComponentProps<"li">) {
  return <li className={cn(className)} data-slot="list-item" {...props} />;
}
