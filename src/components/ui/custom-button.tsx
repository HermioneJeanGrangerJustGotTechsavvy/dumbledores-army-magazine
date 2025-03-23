
import * as React from "react";
import { cn } from "@/lib/utils";

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link" | "gryffindor" | "slytherin" | "ravenclaw" | "hufflepuff";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? React.Fragment : "button";
    
    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group",
          
          // Variants
          {
            "bg-primary text-primary-foreground shadow hover:brightness-110":
              variant === "default",
            "border border-input bg-background hover:bg-accent hover:text-accent-foreground":
              variant === "outline",
            "hover:bg-accent hover:text-accent-foreground":
              variant === "ghost",
            "text-primary underline-offset-4 hover:underline":
              variant === "link",
            "bg-gryffindor-primary text-white hover:bg-gryffindor-light shadow-md hover:shadow-lg":
              variant === "gryffindor",
            "bg-slytherin-primary text-white hover:bg-slytherin-light shadow-md hover:shadow-lg":
              variant === "slytherin",
            "bg-ravenclaw-primary text-white hover:bg-ravenclaw-light shadow-md hover:shadow-lg":
              variant === "ravenclaw",
            "bg-hufflepuff-primary text-black hover:bg-hufflepuff-light shadow-md hover:shadow-lg":
              variant === "hufflepuff",
          },
          
          // Sizes
          {
            "h-10 px-4 py-2": size === "default",
            "h-9 rounded-md px-3": size === "sm",
            "h-11 rounded-md px-8": size === "lg",
            "h-10 w-10": size === "icon",
          },
          className
        )}
        ref={ref}
        {...props}
      >
        <span className="relative z-10">{props.children}</span>
        <span className="absolute inset-0 overflow-hidden rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="absolute top-0 left-1/2 h-full w-8 -translate-x-1/2 transform bg-white opacity-10 blur-sm transition-all duration-1000 ease-out group-hover:left-full"></span>
          <span className="absolute top-0 left-1/2 h-full w-8 -translate-x-1/2 transform bg-white opacity-10 transition-all duration-1000 ease-out group-hover:left-full"></span>
        </span>
      </Comp>
    );
  }
);

CustomButton.displayName = "CustomButton";

export { CustomButton };
