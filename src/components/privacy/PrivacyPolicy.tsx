import { privacy, type Paragraph } from "@/content/privacy";
import s from "./privacy.module.css";

function Text({ paragraph }: { paragraph: Paragraph }) {
  return (
    <p>
      {paragraph.map((segment, i) =>
        typeof segment === "string" ? segment : <code key={i}>{segment.code}</code>,
      )}
    </p>
  );
}

/** The privacy policy (/privacy/). A plain server component: no client JS. */
export function PrivacyPolicy() {
  return (
    <article className={`container ${s.page}`}>
      <header className={s.header}>
        <h1>{privacy.heading}</h1>
        <p className={s.updated}>{privacy.updated}</p>
      </header>

      <p className={s.intro}>{privacy.intro}</p>

      {privacy.sections.map((section) => (
        <section key={section.title} className={s.section}>
          <h2>{section.title}</h2>
          {section.paragraphs.map((paragraph, i) => (
            <Text key={i} paragraph={paragraph} />
          ))}
        </section>
      ))}

      <footer className={s.contact}>
        <p>{privacy.contactLead}</p>
        <a href={privacy.contactHref}>{privacy.contactLink}</a>
      </footer>
    </article>
  );
}
