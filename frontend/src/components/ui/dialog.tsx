import * as React from "react";
import { cn } from "../../lib/utils";

interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

const Dialog: React.FC<DialogProps> = ({ 
  open = false, 
  onOpenChange,
  children 
}) => {
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-black/50" 
        onClick={() => onOpenChange?.(false)}
      />
      <div className="z-50 bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
        {children}
      </div>
    </div>
  );
};

const DialogContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ 
  className,
  children,
  ...props
}) => {
  return (
    <div className={cn("p-6", className)} {...props}>
      {children}
    </div>
  );
};

const DialogHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ 
  className,
  children,
  ...props
}) => {
  return (
    <div className={cn("mb-4", className)} {...props}>
      {children}
    </div>
  );
};

const DialogTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ 
  className,
  children,
  ...props
}) => {
  return (
    <h2 className={cn("text-xl font-semibold", className)} {...props}>
      {children}
    </h2>
  );
};

const DialogDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ 
  className,
  children,
  ...props
}) => {
  return (
    <p className={cn("text-sm text-gray-500 mt-1", className)} {...props}>
      {children}
    </p>
  );
};

const DialogFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ 
  className,
  children,
  ...props
}) => {
  return (
    <div className={cn("mt-6 flex justify-end gap-2", className)} {...props}>
      {children}
    </div>
  );
};

export { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter 
}; 