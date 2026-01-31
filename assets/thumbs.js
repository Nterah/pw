<script>
document.addEventListener('DOMContentLoaded', async () => {
  const els = document.querySelectorAll('img[data-gallery-thumb]');
  const exists = url => new Promise(r => {
    const i = new Image(); i.onload = () => r(true); i.onerror = () => r(false);
    i.src = url + (url.includes('?')?'&':'?') + 'v=' + Date.now();
  });

  for (const img of els) {
    const base = img.getAttribute('data-gallery-thumb'); // e.g. images/projects/4. CVTailorView
    try {
      const res = await fetch(base + '/gallery.json', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        const name = (data.thumb || (data.images && data.images[0]));
        if (name) { img.src = base + '/' + name.split('/').map(encodeURIComponent).join('/'); continue; }
      }
    } catch (_) {}

    // Numeric fallback (only if no manifest found)
    const exts = ['png','jpg','jpeg','webp'];
    for (let i=1;i<=10;i++){
      let ok = false;
      for (const ext of exts){
        const tryUrl = `${base}/${i}.${ext}`;
        /* eslint-disable no-await-in-loop */
        if (await exists(tryUrl)) { img.src = tryUrl; ok = true; break; }
      }
      if (ok) break;
    }
  }
});
</script>
