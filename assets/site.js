// Apply saved theme before paint
(function(){
  const t = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', t);
})();

function setTheme(t){ document.documentElement.setAttribute('data-theme', t); localStorage.setItem('theme', t); }
window.toggleTheme = function(){
  const next = document.documentElement.getAttribute('data-theme')==='dark' ? 'light' : 'dark';
  setTheme(next);
};

// Init helpers after DOM loads
window.addEventListener('DOMContentLoaded', () => {
  if (window.bootstrap){
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => new bootstrap.Tooltip(el));
  }

  // Smooth scroll + active nav
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

  // Prefill contact form from ?ref= & ?title=
  const params = new URLSearchParams(window.location.search);
  const ref = params.get('ref');
  const title = params.get('title');
  if (ref && document.querySelector('#contact')) {
    const textarea = document.querySelector('#contact textarea[name="message"]');
    if (textarea) {
      const label = title ? `Project interest: ${title}` : `Project interest: ${ref.replace(/-/g,' ')}`;
      const existing = textarea.value.trim();
      textarea.value = `[${label}]` + (existing ? `\n\n${existing}` : '\n\n');
      textarea.focus();
    }
  }
});


/* Navbar logo swap for themes */
.brand-logo{ width:28px; height:28px; display:inline-block; }
.logo-dark{ display:none; }
[data-theme="dark"] .logo-light{ display:none; }
[data-theme="dark"] .logo-dark{ display:inline-block; }


/* Contact form colors that respect theme */
.contact .form-wrapper{ background: var(--surface); color: var(--text); }
.contact .form-label{ color: var(--text); }
.contact .form-control, .contact .form-select{
  background: var(--surface);
  color: var(--text);
  border: 1px solid rgba(36,48,65,.15);
}
.contact .form-control::placeholder{ color: var(--muted); }

/* If any element forces white, neutralize in dark mode */
[data-theme="dark"] .bg-white{ background: var(--surface)!important; }
[data-theme="dark"] .text-dark{ color: var(--text)!important; }

