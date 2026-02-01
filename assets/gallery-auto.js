/* Auto gallery loader — works with folders that have spaces.
   Expects a _list.json file with ["img1.png","img2.jpg",...].
   Call: initGallery('#gallery', 'images/projects/4. CVTailorView');
*/
(function () {
  async function fetchList(folder) {
    const url = `${folder}/_list.json`;        // _list.json is ASCII (no encoding needed)
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Missing ${url}`);
    return res.json();
  }
  function encPath(p) {                         // encode each segment for images with spaces
    return p.split('/').map(encodeURIComponent).join('/');
  }
  function buildGrid(container, folder, files) {
    const base = encPath(folder);
    const grid = document.createElement('div');
    grid.className = 'gallery-grid';
    files.forEach(name => {
      const a = document.createElement('a');
      a.className = 'gallery-card';
      a.href = `../${base}/${encodeURIComponent(name)}`;
      a.target = '_blank';
      const img = document.createElement('img');
      img.loading = 'lazy';
      img.alt = name;
      img.src = `../${base}/${encodeURIComponent(name)}`;
      a.appendChild(img);
      grid.appendChild(a);
    });
    container.innerHTML = '';
    container.appendChild(grid);
  }
  window.initGallery = async function (selector, folder) {
    const container = document.querySelector(selector);
    if (!container) return;
    container.textContent = 'Loading previews...';
    try {
      const files = await fetchList(folder);
      buildGrid(container, folder, files);
    } catch (e) {
      console.warn(e);
      container.textContent = 'No images found.';
    }
  };
})();
