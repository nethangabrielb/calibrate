"use client";

import * as React from "react";

import { CurrencySelect } from "@/components/currency-select";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { cn } from "@/lib/utils";

type TextFieldProps = Omit<React.ComponentProps<typeof Input>, "id"> & {
  id?: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  error?: React.ReactNode;
  type?: React.ComponentProps<"input">["type"] | "textarea";
  wrapperClassName?: string;
  labelClassName?: string;
  descriptionClassName?: string;
  errorClassName?: string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  orientation?: "vertical" | "horizontal" | "responsive";
  requiredIndicator?: React.ReactNode;
};

const TextField = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  TextFieldProps
>(
  (
    {
      id,
      label,
      type = "text",
      description,
      error,
      className,
      wrapperClassName,
      labelClassName,
      descriptionClassName,
      errorClassName,
      startAdornment,
      endAdornment,
      orientation = "vertical",
      required,
      requiredIndicator = <span className="text-destructive">*</span>,
      "aria-describedby": ariaDescribedBy,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const inputId = id ?? `field-${generatedId}`;
    const descriptionId = `${inputId}-description`;
    const errorId = `${inputId}-error`;
    const hasError = Boolean(error);

    const describedBy = [
      ariaDescribedBy,
      description ? descriptionId : undefined,
      hasError ? errorId : undefined,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <Field
        orientation={orientation}
        data-invalid={hasError}
        data-disabled={props.disabled}
        className={wrapperClassName}
      >
        <FieldLabel htmlFor={inputId} className={labelClassName}>
          {label}
          {required ? requiredIndicator : null}
        </FieldLabel>

        <FieldContent>
          <div className="relative">
            {startAdornment ? (
              <div className="pointer-events-none absolute inset-y-0 left-3 z-10 flex items-center text-muted-foreground">
                {startAdornment}
              </div>
            ) : null}

            {type === "textarea" ? (
              <Textarea
                ref={ref as React.Ref<HTMLTextAreaElement>}
                id={inputId}
                required={required}
                aria-invalid={hasError}
                aria-describedby={describedBy || undefined}
                className={cn(
                  "rounded-lg bg-background/90 shadow-sm",
                  "focus-visible:ring-2 focus-visible:ring-primary/40",
                  startAdornment && "pl-10",
                  endAdornment && "pr-10",
                  className,
                )}
                {...(props as React.ComponentProps<typeof Textarea>)}
              />
            ) : label === "Salary" ? (
              <div
                className={cn(
                  "h-10 rounded-lg bg-background/90 shadow-sm border flex group transition-all",
                  startAdornment && "pl-10",
                  endAdornment && "pr-10",
                  className,
                )}
              >
                <CurrencySelect />
                <Input
                  ref={ref as React.Ref<HTMLInputElement>}
                  id={inputId}
                  type={type}
                  required={required}
                  aria-invalid={hasError}
                  aria-describedby={describedBy || undefined}
                  className="h-full rounded-l-none"
                  onKeyDown={(e) => {
                    if (e.key === "e" || e.key === "E") e.preventDefault();
                  }}
                  {...props}
                />
              </div>
            ) : (
              <Input
                ref={ref as React.Ref<HTMLInputElement>}
                id={inputId}
                type={type}
                required={required}
                aria-invalid={hasError}
                aria-describedby={describedBy || undefined}
                className={cn(
                  "h-10 rounded-lg bg-background/90 shadow-sm",
                  "focus-visible:ring-2 focus-visible:ring-primary/40",
                  startAdornment && "pl-10",
                  endAdornment && "pr-10",
                  className,
                )}
                {...props}
              />
            )}

            {endAdornment ? (
              <div className="pointer-events-none absolute inset-y-0 right-3 z-10 flex items-center text-muted-foreground">
                {endAdornment}
              </div>
            ) : null}
          </div>

          {description ? (
            <FieldDescription
              id={descriptionId}
              className={descriptionClassName}
            >
              {description}
            </FieldDescription>
          ) : null}

          {hasError ? (
            <FieldError id={errorId} className={errorClassName}>
              {error}
            </FieldError>
          ) : null}
        </FieldContent>
      </Field>
    );
  },
);

TextField.displayName = "TextField";

export { TextField };
