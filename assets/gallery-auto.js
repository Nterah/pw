<!-- /assets/gallery-auto.js -->
<script>
// Auto gallery: reads _list.json in the target folder and renders thumbnails
(() => {
  const host = document.querySelector('[data-gallery-dir]');
  if (!host) return;

  const dir   = host.getAttribute('data-gallery-dir'); // e.g. ../images/projects/4. CVTailorView/
  const grid  = host.querySelector('.gallery-grid');
  const label = host.querySelector('.gallery-status');

  const render = (files) => {
    if (!files || files.length === 0) {
      label.textContent = 'No images found.';
      return;
    }
    grid.innerHTML = files.map(name => `
      <div class="col-6 col-md-4 col-lg-3">
        <a href="${dir}${name}" class="d-block border rounded overflow-hidden">
          <img src="${dir}${name}" alt="" loading="lazy" class="img-fluid">
        </a>
      </div>
    `).join('');
    label.remove();
  };

  // Prefer manifest (fast); fall back to probing 1..60 if manifest missing.
  fetch(dir + '_list.json', { cache: 'no-store' })
    .then(r => r.ok ? r.json() : [])
    .catch(() => [])
    .then(list => {
      if (Array.isArray(list) && list.length) {
        render(list);
        return;
      }
      const MAX=60, exts=['png','jpg','jpeg','webp'];
      const names=[]; for (let i=1;i<=MAX;i++) exts.forEach(e=>names.push(`${i}.${e}`));
      let i=0, found=[];
      const next=()=> {
        if (i>=names.length) { render(found); return; }
        const n=names[i++], img=new Image();
        img.onload = () => { found.push(n); next(); };
        img.onerror = next;
        img.src = dir + n;
      };
      next();
    });
})();
</script>
