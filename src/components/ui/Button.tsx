import Link from "next/link";
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

/**
 * A button-styled control. With `href`: internal paths ("/…") go through next/link (so a future
 * basePath applies), anything else is a plain `<a>`. Without `href`: `<button type="button">`.
 */
export function Button(props: LinkProps | ButtonProps) {
  const { variant = "primary", size = "md", className, children, ...rest } = props;
  const classes = [styles.button, styles[variant], styles[size], className].filter(Boolean).join(" ");

  if (rest.href !== undefined) {
    if (rest.href.startsWith("/")) {
      return (
        <Link className={classes} {...(rest as ComponentPropsWithoutRef<"a"> & { href: string })}>
          {children}
        </Link>
      );
    }
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
