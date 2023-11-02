import * as React from "react";

import { cn } from "@/lib/utils";
import { Icons } from "..";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
  suffix?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, hasError, suffix, ...props }, ref) => {
    if (type === "password") {
      return (
        <InputPasword
          className={className}
          type={type}
          hasError={hasError}
          ref={ref}
          {...props}
        />
      );
    }
    return (
      <div className="relative">
        <input
          type={type}
          className={cn(
            `flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background 
        file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground 
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
        disabled:cursor-not-allowed disabled:opacity-50 
        transition-colors duration-300 ease-in-out
        ${
          hasError
            ? " border-destructive text-destructive placeholder:text-destructive focus-visible:ring-destructive"
            : ""
        }`,
            className
          )}
          ref={ref}
          {...props}
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          <div className="px-1">{suffix}</div>
        </div>
      </div>
    );
  }
);

const InputPasword = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, hasError, ...props }, ref) => {
    const [showVisibility, setShowVisibility] = React.useState(false);

    const togglePasswordVisibility = () => {
      setShowVisibility(!showVisibility);
    };
    return (
      <div className="relative">
        <input
          type={showVisibility ? "text" : "password"}
          className={cn(
            `flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background
      file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
      disabled:cursor-not-allowed disabled:opacity-50
      transition-colors duration-300 ease-in-out
      ${
        hasError
          ? " border-destructive text-destructive placeholder:text-destructive focus-visible:ring-destructive"
          : ""
      }`,
            className
          )}
          ref={ref}
          {...props}
        />
        <div
          className={`absolute inset-y-0 right-0 pr-3 flex items-center ${
            type === "password" ? "visible" : "invisible"
          }`}
        >
          <div
            className="cursor-pointer px-1"
            onClick={togglePasswordVisibility}
          >
            {showVisibility ? (
              <Icons.eyeOff color="text-foreground" />
            ) : (
              <Icons.eye />
            )}
          </div>
        </div>
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
