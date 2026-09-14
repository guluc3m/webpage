/** Render the small inline-markdown subset used by gul-Accordion. */
export function renderInlineMarkdown(value: string): string {
  const escapeHtml = (text: string) =>
    text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

  const token = /\*\*([^*]+)\*\*|_([^_]+)_|\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
  let result = '';
  let lastIndex = 0;

  for (const match of value.matchAll(token)) {
    result += escapeHtml(value.slice(lastIndex, match.index));
    if (match[1]) {
      result += `<b class="text-gul-ink">${escapeHtml(match[1])}</b>`;
    } else if (match[2]) {
      result += `<em>${escapeHtml(match[2])}</em>`;
    } else {
      result += `<a href="${escapeHtml(match[4])}"
        target="_blank"
        rel="noopener"
        class="text-gul-ink underline decoration-gul-line underline-offset-4 hover:decoration-gul-ink"
      >${escapeHtml(match[3])}</a>`;
    }
    lastIndex = match.index + match[0].length;
  }

  return result + escapeHtml(value.slice(lastIndex));
}
