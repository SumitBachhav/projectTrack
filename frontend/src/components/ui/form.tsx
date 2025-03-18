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
  return (
    <div ref={ref} className={cn("space-y-2", className)} {...props} />
  );
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

const FormField = ({ name, control, render }) => {
  return render({
    field: {
      name,
      value: control?._formValues?.[name] || "",
      onChange: (e) => {
        const value = e?.target?.value !== undefined ? e.target.value : e;
        if (control?._updateFormState) {
          control._updateFormState({
            ...control._formState,
            dirtyFields: {
              ...control._formState.dirtyFields,
              [name]: true,
            },
          });
          control._updateFieldArray({
            ...control._fields,
            [name]: value,
          });
          control._formValues[name] = value;
        }
      },
      onBlur: () => {
        if (control?._updateFormState) {
          control._updateFormState({
            ...control._formState,
            touchedFields: {
              ...control._formState.touchedFields,
              [name]: true,
            },
          });
        }
      },
    },
  });
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