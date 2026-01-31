<!-- /assets/home-projects.js -->
<script>
document.addEventListener('DOMContentLoaded', async () => {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  // --- Project registry (edit here only when you add/remove a project) ---
  const projects = [
    {
      key: 'cvtailorview',
      title: 'CVTailorView',
      stack: 'React • Flask • PostgreSQL',
      blurb: 'Profiles, projects, advanced search and branded Word/PDF exports.',
      folder: 'images/projects/4. CVTailorView',
      caseStudy: 'projects/cvtailorview.html',
      live: { label: 'Live site', url: 'https://www.cvtailorview.app' },
    },
    {
      key: 'provisio',
      title: 'ProVisio',
      stack: 'React • Flask • PostgreSQL',
      blurb: 'Projects, timesheets, invoicing, creditors, budgets, dashboards.',
      folder: 'images/projects/6. ProVisio - App',
      caseStudy: 'projects/provisio.html',
      live: { label: 'Live site', url: 'https://www.provisio.app' },
    },
    {
      key: 'tams360',
      title: 'TAMS360',
      stack: 'React • Flask • PostGIS',
      blurb: 'Mobile asset capture & inspections with GIS and photo evidence.',
      folder: 'images/projects/8. TAMS360',
      caseStudy: 'projects/tams360.html',
      live: { label: 'Live app', url: 'https://app.tams360.co.za/' },
    },
    {
      key: 'assetry',
      title: 'Assetry',
      stack: 'React • Flask • PostgreSQL',
      blurb: 'Asset register with geofencing, QR/NFC scans, renewals & GRAP reports.',
      folder: 'images/projects/9. Assetry',
      caseStudy: 'projects/assetry.html',
      live: { label: 'Live app', url: 'https://assetry.provisio.app' },
    },
    {
      key: 'talentgrid',
      title: 'TalentGrid',
      stack: 'People Analytics',
      blurb: 'People analytics across performance, compensation, learning & leave.',
      folder: 'images/projects/1. TalentGrid',
      caseStudy: 'projects/talentgrid.html',
      live: { label: 'Design', url: 'https://small-work-96524359.figma.site' },
    },
    {
      key: 'affinity',
      title: 'Affinity',
      stack: 'CRM',
      blurb: 'CRM pipelines, interactions, proposals and reminders.',
      folder: 'images/projects/7. Affinity',
      caseStudy: 'projects/affinity.html',
      live: { label: 'Design', url: 'https://ready-pepper-25801161.figma.site' },
    },
    {
      key: 'leave',
      title: 'Leave Management',
      stack: 'Google Sheets • Apps Script',
      blurb: 'Requests, approvals, calendars and utilisation reports.',
      folder: 'images/projects/3. Leave Management',
      caseStudy: 'projects/leave-management.html',
      live: { label: 'Template', url: 'https://docs.google.com/spreadsheets/d/1jjnTcOUER1DguwdZEPhrbr__xAp_9nqFi7limxkoQ7Q/edit?usp=sharing' },
    },
    {
      key: 'zimasy',
      title: 'ZiMaSy',
      stack: 'Finance Automation',
      blurb: 'Automated statements, exceptions and collections workflow.',
      folder: 'images/projects/2. ZiMaSy',
      caseStudy: 'projects/zimasy.html',
      live: { label: 'Design', url: 'https://rare-stoop-55686335.figma.site' },
    },
    {
      key: 'qualipro',
      title: 'QualiPro',
      stack: 'Quality • ISO',
      blurb: 'ISO-aligned quality planning, risks, milestones and audit packs.',
      folder: 'images/projects/5. QualiPro - App',
      caseStudy: 'projects/qualipro.html',
      live: { label: 'Design', url: 'https://learn-public-72567702.figma.site' },
    },
  ];

  // helper: pick thumbnail from gallery.json or fallback to 1.png/jpg/…
  async function resolveThumb(baseFolder) {
    try {
      const res = await fetch(`${baseFolder}/gallery.json?ts=${Date.now()}`, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        const pick = data.thumb || (data.images && data.images[0]);
        if (pick) return `${baseFolder}/${encodeURIComponent(pick)}`;
      }
    } catch(_) {}
    const exts = ['png','jpg','jpeg','webp'];
    for (const ext of exts) {
      const probe = `${baseFolder}/1.${ext}`;
      try {
        const r = await fetch(probe, { method:'HEAD', cache:'no-store' });
        if (r.ok) return probe;
      } catch(_) {}
    }
    return ''; // no image
  }

  // render cards
  for (const p of projects) {
    const card = document.createElement('div');
    card.className = 'col-md-6 col-xl-4';
    const imgSrc = await resolveThumb(p.folder);

    card.innerHTML = `
      <div class="card h-100 shadow-sm proj-card">
        ${imgSrc ? `<img class="proj-thumb" alt="${p.title} preview" src="${imgSrc}">` : ''}
        <div class="card-body">
          <h5 class="fw-bold mb-1">${p.title}</h5>
          <div class="text-muted small mb-2">${p.stack}</div>
          <p class="mb-3">${p.blurb}</p>
          <div class="d-flex gap-2">
            <a class="btn btn-outline" href="${p.caseStudy}">Case study</a>
            <a class="btn btn-primary" href="${p.live.url}" target="_blank" rel="noopener">${p.live.label}</a>
          </div>
        </div>
      </div>
    `;
    grid.appendChild(card);
  }
});
</script>
