// /assets/project-carousel.js
(function(){
  if (typeof IMG_FOLDER === "undefined" || typeof TARGET_ID === "undefined") return;

  const EXTS = ["png","jpg","jpeg","webp"];
  const LETTERS = ["a","b","c","d","e","f"];
  const CANDIDATES = [];

  // Prefer 'dashboard.*'
  EXTS.forEach(ext => CANDIDATES.push(`dashboard.${ext}`));

  // 1..60 plus letter variants: 1a..1f, 2a..2f, …
  for (let n = 1; n <= 60; n++) {
    EXTS.forEach(ext => CANDIDATES.push(`${n}.${ext}`));
    LETTERS.forEach(l => EXTS.forEach(ext => CANDIDATES.push(`${n}${l}.${ext}`)));
  }

  const inner = document.getElementById(TARGET_ID);
  if (!inner) return;

  function probe(relPath){
    return new Promise(resolve => {
      const img = new Image();
      img.onload  = () => resolve(relPath);
      img.onerror = () => resolve(null);
      img.src = encodeURI(IMG_FOLDER + relPath);   // handles spaces & symbols
    });
  }

  (async () => {
    const results = await Promise.all(CANDIDATES.map(probe));
    const files = results.filter(Boolean);

    if (!files.length){
      inner.innerHTML = `<div class="p-4 border rounded text-muted">
        No images found in <code>${IMG_FOLDER}</code>.
        Add any of: dashboard.(png/jpg/webp) or 1.(png/jpg/webp), 2.png, 1a.jpg, etc.
      </div>`;
      return;
    }

    inner.innerHTML = files.map((f, i) => `
      <div class="carousel-item ${i === 0 ? 'active' : ''}">
        <img class="d-block w-100" src="${encodeURI(IMG_FOLDER + f)}" alt="">
      </div>
    `).join("");
  })();
})();
