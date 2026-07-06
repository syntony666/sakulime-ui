import type { ButtonHTMLAttributes, ReactNode } from "react";
import "./button.css";

type ButtonVariant = "normal"| "ghost" | "underline";
type ButtonTone = "primary" | "secondary" | "success" | "waring" | "danger";
type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
  tone?: ButtonTone;
  size?: ButtonSize;
  invert?: boolean
};

export function Button({
  children,
  variant = "normal",
  tone = 'primary',
  size = "md",
  className = "",
  type = "button",
  invert = false,
  ...props
}: ButtonProps) {
  const classes = [
    "ui-button",
    `ui-button--${tone}`,
    `ui-button--${variant}`,
    `ui-button--${size}`,
    invert ? "is-invert": "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
