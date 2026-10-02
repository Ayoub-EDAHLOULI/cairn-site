import type { ReactNode } from "react";
import s from "./guide.module.css";

type CalloutKind = "tip" | "note" | "important";

const icons: Record<CalloutKind, ReactNode> = {
  tip: <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1V17h6v-.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2z" />,
  note: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 8h.01" />
    </>
  ),
  important: (
    <>
      <path d="M12 3l9.5 16.5h-19z" />
      <path d="M12 10v4M12 17h.01" />
    </>
  ),
};

/** A boxed aside: a tip (accent), a note (neutral) or something important (orange). */
export function Callout({ kind, children }: { kind: CalloutKind; children: ReactNode }) {
  return (
    <div className={`${s.callout} ${s[kind]}`}>
      <svg className={s.calloutIcon} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        {icons[kind]}
      </svg>
      <div>{children}</div>
    </div>
  );
}

/** The bold lead-in of a callout paragraph. */
export function CalloutLabel({ children }: { children: ReactNode }) {
  return <span className={s.calloutLabel}>{children}</span>;
}
