import s from "./guide.module.css";

/** A key combination, e.g. <Keys k={["Ctrl", "Enter"]} />: keycaps that never wrap apart. */
export function Keys({ k }: { k: string[] }) {
  return (
    <span className={s.keys}>
      {k.map((key) => (
        <kbd key={key}>{key}</kbd>
      ))}
    </span>
  );
}
