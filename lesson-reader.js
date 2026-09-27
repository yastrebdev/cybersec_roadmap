const statusElement = document.querySelector("#lessonStatus");
const contentElement = document.querySelector("#lessonContent");
const tocElement = document.querySelector("#lessonToc");

const params = new URLSearchParams(window.location.search);
const lessonFile = params.get("file");

function escapeHtml(value) {
  return String(value).replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character],
  );
}

function isSafeUrl(url) {
  return (
    url.startsWith("https://") ||
    url.startsWith("http://") ||
    url.startsWith("mailto:") ||
    url.startsWith("#") ||
    url.startsWith("./") ||
    url.startsWith("../") ||
    url.startsWith("/")
  );
}

function renderInline(source) {
  const storedFragments = [];

  function store(html) {
    const index = storedFragments.push(html) - 1;
    return `%%REDPATH_TOKEN_${index}%%`;
  }

  let value = source;

  value = value.replace(/`([^`]+)`/g, (_, code) =>
    store(`<code>${escapeHtml(code)}</code>`),
  );

  value = value.replace(
    /\[([^\]]+)\]\(([^)\s]+)\)/g,
    (_, label, url) => {
      const safeUrl = isSafeUrl(url) ? url : "#";
      const external = /^https?:\/\//i.test(safeUrl);

      return store(
        `<a href="${escapeHtml(safeUrl)}"` +
          (external
            ? ' target="_blank" rel="noopener noreferrer"'
            : "") +
          `>${escapeHtml(label)}</a>`,
      );
    },
  );

  value = escapeHtml(value);

  value = value.replace(
    /\*\*([^*]+)\*\*/g,
    "<strong>$1</strong>",
  );

  value = value.replace(
    /\*([^*]+)\*/g,
    "<em>$1</em>",
  );

  value = value.replace(
    /%%REDPATH_TOKEN_(\d+)%%/g,
    (_, index) => storedFragments[Number(index)],
  );

  return value;
}

function createHeadingId(text, usedIds) {
  let base = text
    .toLocaleLowerCase("ru")
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");

  if (!base) {
    base = "section";
  }

  const previousCount = usedIds.get(base) || 0;
  usedIds.set(base, previousCount + 1);

  return previousCount === 0
    ? base
    : `${base}-${previousCount + 1}`;
}

function splitTableRow(row) {
  return row
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function isTableSeparator(row) {
  const cells = splitTableRow(row);

  return (
    cells.length > 0 &&
    cells.every((cell) => /^:?-{3,}:?$/.test(cell))
  );
}

function renderMarkdown(markdown) {
  const normalizedMarkdown = markdown.replace(/\r\n?/g, "\n");

  const withoutFrontmatter = normalizedMarkdown.replace(
    /^---\n[\s\S]*?\n---\n?/,
    "",
  );

  const lines = withoutFrontmatter.split("\n");

  const html = [];
  const toc = [];
  const usedIds = new Map();

  let paragraph = [];
  let listType = null;
  let insideCode = false;
  let codeLanguage = "";
  let codeLines = [];

  function flushParagraph() {
    if (paragraph.length === 0) {
      return;
    }

    html.push(
      `<p>${renderInline(paragraph.join(" "))}</p>`,
    );

    paragraph = [];
  }

  function closeList() {
    if (listType === null) {
      return;
    }

    html.push(`</${listType}>`);
    listType = null;
  }

  function openList(type) {
    if (listType === type) {
      return;
    }

    closeList();
    html.push(`<${type}>`);
    listType = type;
  }

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];

    const fence = line.match(/^```([\w-]*)\s*$/);

    if (fence) {
      flushParagraph();
      closeList();

      if (!insideCode) {
        insideCode = true;
        codeLanguage = fence[1] || "";
        codeLines = [];
      } else {
        html.push(
          `<pre><code` +
            (codeLanguage
              ? ` class="language-${escapeHtml(codeLanguage)}"`
              : "") +
            `>${escapeHtml(codeLines.join("\n"))}</code></pre>`,
        );

        insideCode = false;
        codeLanguage = "";
        codeLines = [];
      }

      continue;
    }

    if (insideCode) {
      codeLines.push(line);
      continue;
    }

    const nextLine = lines[index + 1];

    if (
      line.includes("|") &&
      nextLine &&
      isTableSeparator(nextLine)
    ) {
      flushParagraph();
      closeList();

      const headers = splitTableRow(line);
      const rows = [];

      index += 2;

      while (
        index < lines.length &&
        lines[index].trim() &&
        lines[index].includes("|")
      ) {
        rows.push(splitTableRow(lines[index]));
        index += 1;
      }

      index -= 1;

      html.push("<table>");
      html.push(
        `<thead><tr>${headers
          .map(
            (header) =>
              `<th>${renderInline(header)}</th>`,
          )
          .join("")}</tr></thead>`,
      );

      html.push("<tbody>");

      for (const row of rows) {
        html.push(
          `<tr>${row
            .map(
              (cell) =>
                `<td>${renderInline(cell)}</td>`,
            )
            .join("")}</tr>`,
        );
      }

      html.push("</tbody></table>");
      continue;
    }

    if (!line.trim()) {
      flushParagraph();
      closeList();
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.+)$/);

    if (heading) {
      flushParagraph();
      closeList();

      const level = heading[1].length;
      const headingText = heading[2].trim();
      const headingId = createHeadingId(
        headingText,
        usedIds,
      );

      html.push(
        `<h${level} id="${headingId}">` +
          `${renderInline(headingText)}` +
          `</h${level}>`,
      );

      if (level === 2 || level === 3) {
        toc.push({
          level,
          text: headingText.replace(/[*`]/g, ""),
          id: headingId,
        });
      }

      continue;
    }

    if (/^(-{3,}|\*{3,})$/.test(line.trim())) {
      flushParagraph();
      closeList();
      html.push("<hr>");
      continue;
    }

    const unorderedItem = line.match(/^\s*[-*+]\s+(.+)$/);

    if (unorderedItem) {
      flushParagraph();
      openList("ul");
      html.push(
        `<li>${renderInline(unorderedItem[1])}</li>`,
      );
      continue;
    }

    const orderedItem = line.match(/^\s*\d+\.\s+(.+)$/);

    if (orderedItem) {
      flushParagraph();
      openList("ol");
      html.push(
        `<li>${renderInline(orderedItem[1])}</li>`,
      );
      continue;
    }

    const quote = line.match(/^>\s?(.*)$/);

    if (quote) {
      flushParagraph();
      closeList();

      html.push(
        `<blockquote>${renderInline(quote[1])}</blockquote>`,
      );

      continue;
    }

    paragraph.push(line.trim());
  }

  if (insideCode) {
    html.push(
      `<pre><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`,
    );
  }

  flushParagraph();
  closeList();

  return {
    html: html.join("\n"),
    toc,
  };
}

function renderTableOfContents(items) {
  if (items.length === 0) {
    tocElement.innerHTML =
      "<p>В уроке пока нет разделов.</p>";
    return;
  }

  tocElement.innerHTML = items
    .map(
      (item) =>
        `<a class="toc-level-${item.level}" ` +
        `href="#${item.id}">` +
        `${escapeHtml(item.text)}</a>`,
    )
    .join("");
}

async function loadLesson() {
  if (
    !lessonFile ||
    !/^[a-zA-Z0-9_-]+\.md$/.test(lessonFile)
  ) {
    throw new Error("Урок не указан или имеет неправильное имя.");
  }

  const response = await fetch(
    `lessons/${encodeURIComponent(lessonFile)}`,
  );

  if (!response.ok) {
    throw new Error(
      `Не удалось загрузить урок: HTTP ${response.status}`,
    );
  }

  const markdown = await response.text();
  const rendered = renderMarkdown(markdown);

  contentElement.innerHTML = rendered.html;
  renderTableOfContents(rendered.toc);

  const firstHeading = contentElement.querySelector("h1");

  if (firstHeading) {
    document.title = `${firstHeading.textContent} — REDPATH`;
  }

  statusElement.remove();
}

loadLesson().catch((error) => {
  statusElement.textContent = error.message;
  statusElement.classList.add("error");
});