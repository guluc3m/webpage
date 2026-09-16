import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderInlineMarkdown } from './markdown.ts';

test('renders the supported inline markdown', () => {
  assert.equal(
    renderInlineMarkdown('**Bold**, _italics_, and [a link](https://my.link).'),
    '<b class="text-gul-ink">Bold</b>, <em>italics</em>, and <a href="https://my.link"\n        target="_blank"\n        rel="noopener"\n        class="text-gul-ink underline decoration-gul-line underline-offset-4 hover:decoration-gul-ink"\n      >a link</a>.',
  );
});

test('escapes HTML while preserving plain text', () => {
  assert.equal(
    renderInlineMarkdown('<script>alert(1)</script>'),
    '&lt;script&gt;alert(1)&lt;/script&gt;',
  );
});

test('only renders HTTP(S) links', () => {
  assert.equal(
    renderInlineMarkdown('[unsafe](javascript:alert(1))'),
    '[unsafe](javascript:alert(1))',
  );
});

test('renders obfuscated email text as a client-resolved mail link', () => {
  assert.match(
    renderInlineMarkdown('Escribe a **info AT gul.uc3m.es**.'),
    /<a href="#" data-gul-email[^>]*><b data-gul-email-text>info AT gul\.uc3m\.es<\/b><\/a>/,
  );

  assert.match(
    renderInlineMarkdown('Escribe a info AT gul.uc3m.es.'),
    /<a href="#" data-gul-email[^>]*><span data-gul-email-text>info AT gul\.uc3m\.es<\/span><\/a>\./,
  );
});
