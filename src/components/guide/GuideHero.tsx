import { VERSION } from "@/content/links";
import { DemoLauncher } from "@/components/landing/DemoLauncher";
import { SavePdfButton } from "./SavePdfButton";
import s from "./guide.module.css";

export function GuideHero() {
  return (
    <section className={`container ${s.hero}`} aria-labelledby="guide-title">
      <div>
        <h1 id="guide-title">The Cairn Field Guide</h1>
        <p className={s.lede}>
          Your commands, scripts and snippets, with the reason you saved them. Found in seconds. Fully offline.
        </p>
        <p className={s.version}>
          <span>Version {VERSION} for Windows 10 and 11</span>
          <SavePdfButton />
        </p>
        <blockquote className={s.quote}>
          Hikers stack small piles of stones, called <b>cairns</b>, to mark the trail for the next person who
          passes. Cairn does the same for you: every command you save is a stone on a path you&apos;ve already
          walked, so the next time you need it, you just follow the markers.
        </blockquote>
      </div>
      <div className={s.demo}>
        {/* The same live demo as the landing page, without the autoplay. */}
        <DemoLauncher autoplay={false} />
        <p className={s.try}>
          Try it: type the way you&apos;d remember something, like <code>git history</code> or <code>port in use</code>,
          and use <kbd>↑</kbd> <kbd>↓</kbd>.
        </p>
      </div>
    </section>
  );
}
