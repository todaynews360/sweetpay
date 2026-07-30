<<<<<<< HEAD
import * as React from 'react';
import { cn } from '@/lib/utils';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
=======
import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
>>>>>>> 42c9ccb975d03a2bbafdf0caac8a430677509698
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
<<<<<<< HEAD
          'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className,
=======
          "flex h-12 w-full rounded-2xl border-2 border-input bg-background/50 px-4 py-2 text-base font-semibold ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground placeholder:font-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
          className
>>>>>>> 42c9ccb975d03a2bbafdf0caac8a430677509698
        )}
        ref={ref}
        {...props}
      />
<<<<<<< HEAD
    );
  },
);
Input.displayName = 'Input';

export { Input };
=======
    )
  }
)
Input.displayName = "Input"

export { Input }
>>>>>>> 42c9ccb975d03a2bbafdf0caac8a430677509698
