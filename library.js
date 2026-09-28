const CATALOG_URL = "lessons/lessons.json";
const PROGRESS_KEY = "redpath-library-progress-v1";

const catalogElement = document.querySelector("#libraryCatalog");
const statusElement = document.querySelector("#libraryStatus");
const searchElement = document.querySelector("#librarySearch");
const collectionElement = document.querySelector("#collectionFilter");
const chapterCountElement = document.querySelector("#chapterCount");
const completedCountElement = document.querySelector("#completedCount");
const progressPercentElement = document.querySelector("#progressPercent");

let materials = [];
let completed = loadProgress();

function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(PROGRESS_KEY) || "[]");
    return Array.isArray(saved)
      ? saved.filter((value) => typeof value === "string")
      : [];
  } catch {
    return [];
  }
}

function saveProgress() {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(completed));
}

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

function updateStats() {
  const validCompleted = completed.filter((id) =>
    materials.some((material) => material.id === id),
  );

  const percent = materials.length
    ? Math.round((validCompleted.length / materials.length) * 100)
    : 0;

  chapterCountElement.textContent = String(materials.length).padStart(2, "0");
  completedCountElement.textContent = String(validCompleted.length).padStart(2, "0");
  progressPercentElement.textContent = `${percent}%`;
}

function renderFilters() {
  const collections = [...new Set(materials.map((item) => item.collection))];

  collectionElement.insertAdjacentHTML(
    "beforeend",
    collections
      .map(
        (collection) =>
          `<option value="${escapeHtml(collection)}">${escapeHtml(collection)}</option>`,
      )
      .join(""),
  );
}

function matchesFilters(material) {
  const query = searchElement.value.trim().toLocaleLowerCase("ru");
  const selectedCollection = collectionElement.value;

  if (
    selectedCollection !== "all" &&
    material.collection !== selectedCollection
  ) {
    return false;
  }

  if (!query) {
    return true;
  }

  const searchable = [
    material.title,
    material.description,
    material.collection,
    material.phase,
    ...(material.tags || []),
  ]
    .join(" ")
    .toLocaleLowerCase("ru");

  return searchable.includes(query);
}

function renderCard(material) {
  const isComplete = completed.includes(material.id);
  const numberLabel = material.kind === "chapter"
    ? `Глава ${String(material.order).padStart(2, "0")}`
    : `Неделя ${String(material.week).padStart(2, "0")}`;

  return `
    <article class="chapter-card ${isComplete ? "is-complete" : ""}">
      <div class="chapter-meta">
        <span class="chapter-number">${escapeHtml(numberLabel)}</span>
        <span>${escapeHtml(material.duration)}</span>
      </div>
      <h4>${escapeHtml(material.title)}</h4>
      <p>${escapeHtml(material.description)}</p>
      <div class="chapter-tags">
        ${(material.tags || [])
          .map((tag) => `<span>${escapeHtml(tag)}</span>`)
          .join("")}
      </div>
      <div class="chapter-actions">
        <a class="chapter-read" href="lesson.html?file=${encodeURIComponent(material.file)}">Читать →</a>
        <label class="chapter-complete">
          <input type="checkbox" data-material-id="${escapeHtml(material.id)}" ${isComplete ? "checked" : ""}>
          <span>Прочитано</span>
        </label>
      </div>
    </article>
  `;
}

function renderCatalog() {
  const visible = materials.filter(matchesFilters);

  if (visible.length === 0) {
    catalogElement.innerHTML = `
      <div class="library-empty">
        Ничего не найдено. Попробуй изменить запрос или выбрать другой раздел.
      </div>
    `;
    return;
  }

  const grouped = visible.reduce((collections, material) => {
    if (!collections.has(material.collection)) {
      collections.set(material.collection, []);
    }

    collections.get(material.collection).push(material);
    return collections;
  }, new Map());

  catalogElement.innerHTML = [...grouped.entries()]
    .map(([collection, entries]) => {
      const sorted = [...entries].sort((a, b) => a.order - b.order);
      const description = collection === "Сети с нуля"
        ? "Последовательный учебник: сначала картина целиком, затем локальная сеть, адресация, транспорт и прикладные протоколы."
        : "Практические материалы, привязанные к этапам основного роадмапа.";

      return `
        <section class="collection-block">
          <div class="collection-header">
            <div>
              <span>${entries.length} материалов</span>
              <h3>${escapeHtml(collection)}</h3>
            </div>
            <p>${escapeHtml(description)}</p>
          </div>
          <div class="chapter-grid">
            ${sorted.map(renderCard).join("")}
          </div>
        </section>
      `;
    })
    .join("");
}

function toggleComplete(id, checked) {
  completed = checked
    ? [...new Set([...completed, id])]
    : completed.filter((completedId) => completedId !== id);

  saveProgress();
  updateStats();
  renderCatalog();
}

async function loadCatalog() {
  const response = await fetch(CATALOG_URL);

  if (!response.ok) {
    throw new Error(`Не удалось загрузить каталог: HTTP ${response.status}`);
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("Каталог библиотеки имеет неправильный формат.");
  }

  materials = data;
  renderFilters();
  updateStats();
  renderCatalog();
  statusElement.remove();
}

searchElement.addEventListener("input", renderCatalog);
collectionElement.addEventListener("change", renderCatalog);

catalogElement.addEventListener("change", (event) => {
  const input = event.target.closest("[data-material-id]");

  if (input) {
    toggleComplete(input.dataset.materialId, input.checked);
  }
});

loadCatalog().catch((error) => {
  statusElement.textContent = error.message;
  statusElement.classList.add("error");
});
