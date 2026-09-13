import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderInlineMarkdown } from './markdown.ts';

test('renders the supported inline markdown', () => {
  assert.equal(
    renderInlineMarkdown('**Bold**, _italics_, and [a link](https://my.link).'),
    '<strong>Bold</strong>, <em>italics</em>, and <a href="https://my.link">a link</a>.',
  );
});

test('escapes HTML while preserving plain text', () => {
  assert.equal(renderInlineMarkdown('<script>alert(1)</script>'), '&lt;script&gt;alert(1)&lt;/script&gt;');
});

test('only renders HTTP(S) links', () => {
  assert.equal(renderInlineMarkdown('[unsafe](javascript:alert(1))'), '[unsafe](javascript:alert(1))');
});
