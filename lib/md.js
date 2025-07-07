// As of https://github.com/11ty/eleventy-plugin-syntaxhighlight/issues/38#issuecomment-1424499396
import MarkdownIt from "markdown-it";
const md = MarkdownIt({ html: true });

md.renderer.rules.code_inline = (tokens, idx, { langPrefix = "" }) => {
  const token = tokens[idx];
  return `<code class="${langPrefix}">${md.utils.escapeHtml(token.content)}</code>`;
};

export default md;
