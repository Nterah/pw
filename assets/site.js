// Persisted theme
(function(){
  const t = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', t);
})();

function setTheme(t){ document.documentElement.setAttribute('data-theme', t); localStorage.setItem('theme', t); }
window.toggleTheme = function(){ setTheme(document.documentElement.getAttribute('data-theme')==='dark'?'light':'dark'); };

// Init helpers
window.addEventListener('DOMContentLoaded', () => {
  if (window.bootstrap){
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => new bootstrap.Tooltip(el));
  }

  // Smooth scroll + active link
  const links = document.querySelectorAll('.nav-link[href^="#"]');
  links.forEach(link => link.addEventListener('click', e => {
    const id = link.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth'}); }
  }));

  const sections = [...document.querySelectorAll('section[id]')];
  if (sections.length){
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const link = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (entry.isIntersecting) {
          document.querySelectorAll('.nav-link').forEach(a => a.classList.remove('active'));
          if (link) link.classList.add('active');
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px", threshold: 0 });
    sections.forEach(s => obs.observe(s));
  }
});
