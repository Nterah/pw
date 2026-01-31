<!-- /assets/auto-gallery.js -->
<script>
/* Builds a Bootstrap carousel from /images/projects/<folder>/gallery.json
   Usage in a project page:
     <div id="auto-gallery" data-folder="../images/projects/4. CVTailorView"></div>
*/
document.addEventListener('DOMContentLoaded', async () => {
  const host = document.getElementById('auto-gallery');
  if (!host) return;

  const base = host.getAttribute('data-folder');
  if (!base) { host.textContent = 'Missing data-folder path.'; return; }

  let images = [];
  try {
    const res = await fetch(`${base}/gallery.json?ts=${Date.now()}`, { cache:'no-store' });
    if (res.ok) {
      const data = await res.json();
      images = data.images || [];
    }
  } catch(_) {}

  // Fallback probe 1..10 with common extensions if no manifest is present
  if (!images.length) {
    const exts = ['png','jpg','jpeg','webp'];
    for (let i = 1; i <= 10; i++) {
      for (const ext of exts) {
        const url = `${base}/${i}.${ext}`;
        try {
          const r = await fetch(url, { method:'HEAD', cache:'no-store' });
          if (r.ok) { images.push(`${i}.${ext}`); break; }
        } catch(_) {}
      }
    }
  }

  if (!images.length) {
    host.innerHTML = `<div class="text-muted">No images found. Ensure files exist or create gallery.json.</div>`;
    return;
  }

  const cid = 'carousel-auto';
  const slides = images.map((name, idx) => `
    <div class="carousel-item ${idx===0?'active':''}">
      <img class="d-block w-100" src="${base}/${encodeURIComponent(name)}" alt="">
    </div>`).join('');

  host.innerHTML = `
    <div id="${cid}" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">${slides}</div>
      <button class="carousel-control-prev" type="button" data-bs-target="#${cid}" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#${cid}" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>`;
});
</script>
