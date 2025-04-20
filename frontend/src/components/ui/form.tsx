import * as React from "react";
import { cn } from "../../lib/utils";
import { Label } from "./label";

const Form = ({ ...props }) => {
  return <form {...props} />;
};

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("space-y-2", className)} {...props} />;
});
FormItem.displayName = "FormItem";

const FormLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, ref) => {
  return <Label ref={ref} className={cn(className)} {...props} />;
});
FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ ...props }, ref) => {
  return <div ref={ref} {...props} />;
});
FormControl.displayName = "FormControl";

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-sm text-gray-500", className)}
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-sm font-medium text-red-500", className)}
      {...props}
    >
      {children}
    </p>
  );
});
FormMessage.displayName = "FormMessage";

// The problem is here - the FormField implementation is problematic
// Replacing with a proper implementation
const FormField = ({ name, control, render }: any) => {
  if (!control || typeof control.register !== "function") {
    console.warn("FormField requires a valid control from useForm()");
    return null;
  }

  // Get field state from control
  const fieldState = control._formState?.errors?.[name]
    ? { error: control._formState.errors[name] }
    : {};

  // Use the controller's field API
  const field = {
    name,
    value: control._formValues?.[name] ?? "",
    onChange: (event: any) => {
      // Handle both direct values and event objects
      const value = event && event.target ? event.target.value : event;

      // Update field value
      if (control._fields) {
        control._fields[name] = value;
      }

      if (control._formValues) {
        control._formValues[name] = value;
      }

      // Trigger re-render
      if (typeof control._updateFormState === "function") {
        control._updateFormState({
          ...control._formState,
          isDirty: true,
          dirtyFields: {
            ...control._formState.dirtyFields,
            [name]: true,
          },
        });
      }
    },
    onBlur: () => {
      if (typeof control._updateFormState === "function") {
        control._updateFormState({
          ...control._formState,
          touchedFields: {
            ...control._formState.touchedFields,
            [name]: true,
          },
        });
      }
    },
    ref: (element: any) => {
      // Register the field if possible
      if (element && typeof control.register === "function") {
        const { ref } = control.register(name);
        if (typeof ref === "function") {
          ref(element);
        }
      }
    },
  };

  return render({ field, fieldState });
};

export {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
};
