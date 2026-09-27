import {
  cp,
  mkdir,
  readFile,
  readdir,
  writeFile,
} from "node:fs/promises";

const regularFiles = [
  "index.html",
  "styles.css",
  "upgrade.css",
  "syllabus.js",
  "script.js",
  "lesson.html",
  "lesson.css",
  "lesson-reader.js",
];

const files = {};

for (const filename of regularFiles) {
  files[filename] = await readFile(filename, "utf8");
}

const lessonEntries = await readdir("lessons", {
  withFileTypes: true,
});

for (const entry of lessonEntries) {
  if (!entry.isFile() || !entry.name.endsWith(".md")) {
    continue;
  }

  const sourcePath = `lessons/${entry.name}`;

  files[sourcePath] = await readFile(
    sourcePath,
    "utf8",
  );
}

await mkdir("dist/server", {
  recursive: true,
});

function createWorkerSource(fileMap) {
  return `
const files = ${JSON.stringify(fileMap)};

function contentType(filename) {
  if (filename.endsWith(".html")) {
    return "text/html; charset=utf-8";
  }

  if (filename.endsWith(".css")) {
    return "text/css; charset=utf-8";
  }

  if (filename.endsWith(".js")) {
    return "text/javascript; charset=utf-8";
  }

  if (filename.endsWith(".md")) {
    return "text/markdown; charset=utf-8";
  }

  if (filename.endsWith(".json")) {
    return "application/json; charset=utf-8";
  }

  return "text/plain; charset=utf-8";
}

export default {
  async fetch(request) {
    const url = new URL(request.url);

    let filename =
      url.pathname === "/"
        ? "index.html"
        : decodeURIComponent(url.pathname.slice(1));

    if (!Object.hasOwn(files, filename)) {
      return new Response("Not found", {
        status: 404,
      });
    }

    return new Response(files[filename], {
      headers: {
        "content-type": contentType(filename),
        "cache-control":
          filename.endsWith(".html") ||
          filename.endsWith(".md")
            ? "no-cache"
            : "public, max-age=3600",
        "x-content-type-options": "nosniff",
        "referrer-policy": "strict-origin-when-cross-origin",
        "content-security-policy":
          "default-src 'self'; " +
          "style-src 'self'; " +
          "script-src 'self'; " +
          "connect-src 'self'; " +
          "img-src 'self' data:; " +
          "frame-ancestors 'none'; " +
          "base-uri 'none'; " +
          "form-action 'self'",
      },
    });
  },
};
`;
}

await writeFile(
  "dist/server/index.js",
  createWorkerSource(files),
  "utf8",
);

await mkdir("dist/.openai", {
  recursive: true,
});

await cp(
  ".openai/hosting.json",
  "dist/.openai/hosting.json",
);

console.log(
  \`Site bundled: \${Object.keys(files).length} files, \` +
  \`\${lessonEntries.filter(
    (entry) =>
      entry.isFile() && entry.name.endsWith(".md"),
  ).length} lessons\`,
);