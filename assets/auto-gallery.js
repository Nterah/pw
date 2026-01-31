/* Auto Gallery v2 — numeric ordering (1..120 + a..f), multi-ext, optional dashboard.* first */
(function () {
  const MAX_N = 120;
  const EXTS = ["png", "jpg", "jpeg", "webp"];
  const SUFFIX = ["", "a", "b", "c", "d", "e", "f"];

  const enc = (p) => encodeURI(p);

  function makeCandidates() {
    const list = [];
    EXTS.forEach((ext) => list.push(`dashboard.${ext}`)); // prefer dashboard if present
    for (let i = 1; i <= MAX_N; i++) {
      for (const s of SUFFIX) {
        for (const e of EXTS) list.push(`${i}${s}.${e}`);
      }
    }
    return list;
  }

  function probe(base, rel) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(rel);
      img.onerror = () => resolve(null);
      img.src = enc(base + rel);
    });
  }

  function ensureId(el, prefix = "carousel-") {
    if (!el.id) el.id = prefix + Math.random().toString(36).slice(2, 8);
    return el.id;
  }

  async function build(inner) {
    const base = inner.dataset.folder || "";
    if (!base) {
      inner.innerHTML = "<div class='p-3 text-muted'>Missing data-folder</div>";
      return;
    }

    const items = (
      await Promise.all(makeCandidates().map((r) => probe(base, r)))
    ).filter(Boolean);

    if (!items.length) {
      inner.innerHTML =
        "<div class='p-3 text-muted'>No images found. Name files 1.png, 2.jpg…</div>";
      return;
    }

    inner.innerHTML = items
      .map(
        (r, i) => `
      <div class="carousel-item ${i === 0 ? "active" : ""}">
        <img class="d-block w-100" src="${enc(base + r)}" alt="">
      </div>`
      )
      .join("");

    // Add controls if not present
    const shell = inner.closest(".carousel");
    if (shell && !shell.dataset.controls) {
      shell.dataset.controls = "1";
      const id = ensureId(shell);
      shell.insertAdjacentHTML(
        "beforeend",
        `
        <button class="carousel-control-prev" type="button" data-bs-target="#${id}" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#${id}" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>`
      );
    }
  }

  window.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".carousel-inner[data-folder]").forEach(build);
  });
})();
