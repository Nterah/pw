// Ensure the selected theme is applied and remembered
(function initTheme() {
  const t = localStorage.getItem('theme') || 'light';
  setTheme(t);
})();

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);

  // brand logo (same transparent PNG for both themes)
  const brand = document.getElementById('brandLogo');
  if (brand) brand.src = 'icons/nterah-logo-64.png';
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  setTheme(current === 'dark' ? 'light' : 'dark');
}
