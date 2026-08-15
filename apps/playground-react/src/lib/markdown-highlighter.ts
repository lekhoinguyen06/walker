// markdown-highlighter.ts
import { createHighlighter } from "@tanstack/highlight/core";
import { html } from "@tanstack/highlight/languages/html";
import { js } from "@tanstack/highlight/languages/js";
import { plaintext } from "@tanstack/highlight/languages/plaintext";
import { ts } from "@tanstack/highlight/languages/ts";
import { tsx } from "@tanstack/highlight/languages/tsx";
import { createTanStackMarkdownHighlighter } from "@tanstack/highlight/markdown";
import { createThemeCss } from "@tanstack/highlight/theme";
import githubDarkTheme from "@tanstack/highlight/themes/github-dark";
import githubLightTheme from "@tanstack/highlight/themes/github-light";
import type { CodeHighlighter } from "@tanstack/markdown";

const highlighter = createHighlighter({
  languages: [plaintext, html, js, ts, tsx],
});

export const highlightMarkdownCode: CodeHighlighter =
  createTanStackMarkdownHighlighter(highlighter);

export const themeCss = createThemeCss({
  light: githubLightTheme,
  dark: githubDarkTheme,
  lightSelector: ".markdown-renderer",
  darkSelector: ".dark .markdown-renderer",
  codeBlockSelector: ".markdown-renderer pre.tm-code",
  lineNumbersSelector: ".markdown-renderer .tm-code--line-numbers",
});
