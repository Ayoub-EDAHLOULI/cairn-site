import type { ComponentPropsWithoutRef, ReactNode } from "react";
import styles from "./Button.module.css";

type Variant = "primary" | "secondary" | "outline";
type Size = "sm" | "md";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type LinkProps = CommonProps & { href: string } & Omit<ComponentPropsWithoutRef<"a">, "className">;
type ButtonProps = CommonProps & { href?: undefined } & Omit<ComponentPropsWithoutRef<"button">, "className">;

/** A button-styled control: renders `<a>` when given `href`, otherwise `<button type="button">`. */
export function Button(props: LinkProps | ButtonProps) {
  const { variant = "primary", size = "md", className, children, ...rest } = props;
  const classes = [styles.button, styles[variant], styles[size], className].filter(Boolean).join(" ");

  if (rest.href !== undefined) {
    return (
      <a className={classes} {...(rest as ComponentPropsWithoutRef<"a">)}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...(rest as ComponentPropsWithoutRef<"button">)}>
      {children}
    </button>
  );
}
