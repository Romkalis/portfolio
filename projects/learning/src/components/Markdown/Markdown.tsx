import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "./Markdown.module.scss";

/** Превращает ./slug.md и ../track/slug.md в маршруты /learn/... */
function resolveLessonHref(href: string, trackId: string): string {
  if (href.startsWith("/learn/")) return href;
  if (href.startsWith("../")) {
    const parts = href.replace(/^\.\.\//, "").replace(/\.md$/, "").split("/");
    if (parts.length === 2) return `/learn/${parts[0]}/${parts[1]}`;
  }
  if (href.startsWith("./")) {
    return `/learn/${trackId}/${href.replace(/^\.\//, "").replace(/\.md$/, "")}`;
  }
  return href;
}

export function Markdown({ content, trackId }: { content: string; trackId: string }) {
  return (
    <article className={styles.article}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children }) => {
            if (!href) return <>{children}</>;
            const resolved = resolveLessonHref(href, trackId);
            if (resolved.startsWith("/")) {
              return <Link href={resolved}>{children}</Link>;
            }
            if (resolved.startsWith("http")) {
              return (
                <a href={resolved} target="_blank" rel="noopener noreferrer">
                  {children}
                </a>
              );
            }
            return <a href={resolved}>{children}</a>;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
