<!-- /assets/auto-gallery.js -->
<script>
(function(){
  function buildCarousel(el, files){
    const id = 'carousel-' + Math.random().toString(36).slice(2);
    const inner = files.map((f,i) => `
      <div class="carousel-item ${i===0?'active':''}">
        <img class="d-block w-100" 
             src="${el.dataset.folder}/${encodeURIComponent(f)}" 
             alt="Slide ${i+1}" 
             style="object-fit:contain; background:transparent; max-height:520px;">
      </div>`).join('');

    el.innerHTML = `
      <div id="${id}" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">${inner}</div>
        <button class="carousel-control-prev" type="button" data-bs-target="#${id}" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#${id}" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>`;
  }

  function initOne(el){
    const folder = el.dataset.folder;
    if(!folder){ el.textContent = 'Missing data-folder'; return; }
    // Try _list.json first (the PowerShell you ran already generated these)
    fetch(folder + '/_list.json', {cache:'no-store'})
      .then(r => r.ok ? r.json() : [])
      .then(list => Array.isArray(list) ? list : [])
      .then(list => {
        if(list.length){
          buildCarousel(el, list);
          return;
        }
        // Fallback: probe 1..80 for png/jpg/jpeg/webp. Only show ones that actually load.
        const exts = ['png','jpg','jpeg','webp'];
        const candidates = [];
        for(let i=1;i<=80;i++){ exts.forEach(e=>candidates.push(`${i}.${e}`)); }
        const found = [];
        let checked = 0;
        const done = () => {
          if(found.length){ buildCarousel(el, found); }
          else { el.innerHTML = '<div class="text-muted">No images found</div>'; }
        };
        candidates.forEach(name=>{
          const img = new Image();
          img.onload = () => { found.push(name); if(++checked===candidates.length) done(); };
          img.onerror = () => { if(++checked===candidates.length) done(); };
          img.src = `${folder}/${name}`;
        });
      })
      .catch(()=>{ el.innerHTML = '<div class="text-muted">No images found</div>'; });
  }

  window.initGallery = function(selector){ // optional manual call
    const el = document.querySelector(selector);
    if(el) initOne(el);
  };

  // Auto-init any #auto-gallery or .auto-gallery on load
  document.addEventListener('DOMContentLoaded', ()=>{
    document.querySelectorAll('#auto-gallery, .auto-gallery').forEach(initOne);
  });
})();
</script>
