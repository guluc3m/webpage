/** Render the small inline-markdown subset used by gul-Accordion. */
export function renderInlineMarkdown(value: string): string {
  const escapeHtml = (text: string) =>
    text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

  const token =
    /\*\*([^*]+)\*\*|_([^_]+)_|([A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+ AT [A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+)|\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
  const isObfuscatedEmail = (text: string) =>
    /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+ AT [A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+$/.test(text);
  let result = '';
  let lastIndex = 0;

  for (const match of value.matchAll(token)) {
    result += escapeHtml(value.slice(lastIndex, match.index));
    if (match[1]) {
      const text = escapeHtml(match[1]);
      result += isObfuscatedEmail(match[1])
        ? `<a href="#" data-gul-email class="text-gul-ink underline decoration-gul-line underline-offset-4 hover:decoration-gul-ink"><b data-gul-email-text>${text}</b></a>`
        : `<b class="text-gul-ink">${text}</b>`;
    } else if (match[2]) {
      result += `<em>${escapeHtml(match[2])}</em>`;
    } else if (match[3]) {
      const text = escapeHtml(match[3]);
      result += `<a href="#" data-gul-email class="text-gul-ink underline decoration-gul-line underline-offset-4 hover:decoration-gul-ink"><span data-gul-email-text>${text}</span></a>`;
    } else {
      result += `<a href="${escapeHtml(match[5])}"
        target="_blank"
        rel="noopener"
        class="text-gul-ink underline decoration-gul-line underline-offset-4 hover:decoration-gul-ink"
      >${escapeHtml(match[4])}</a>`;
    }
    lastIndex = match.index + match[0].length;
  }

  return result + escapeHtml(value.slice(lastIndex));
}
