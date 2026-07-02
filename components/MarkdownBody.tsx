// Renders pre-rendered Markdown HTML with consistent themed typography.
// The HTML comes from lib/content.ts (remark → remark-html); styles live in
// the .markdown block in app/globals.css.
export default function MarkdownBody({
  html,
  className = "",
}: {
  html: string;
  className?: string;
}) {
  return (
    <div
      className={`markdown ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
