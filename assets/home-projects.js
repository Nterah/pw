(function () {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  // Helper to render a preview or a grey placeholder
  const imgTag = (src, alt) => `
    <div class="ratio ratio-16x9 bg-body-secondary rounded-top position-relative overflow-hidden">
      <img class="w-100 h-100 object-fit-cover" alt="${alt}"
           src="${src}"
           onerror="this.parentElement.innerHTML='<div class=&quot;d-flex w-100 h-100 align-items-center justify-content-center text-muted&quot;>Preview coming soon</div>';">
    </div>`;

  const P = [
    {
      title: 'CVTailorView',
      stack: 'React &bull; Flask &bull; PostgreSQL',
      blurb: 'Profiles, projects, advanced search & branded Word/PDF exports.',
      details: 'projects/cvtailorview.html',
      ctaUrl: 'https://www.cvtailorview.app',
      ctaLabel: 'Open App',
      preview: 'images/projects/4. CVTailorView/CVTailorView 1 Dashboard 10.png'
    },
    {
      title: 'ProVisio',
      stack: 'React &bull; Flask &bull; PostgreSQL',
      blurb: 'Projects, timesheets, invoicing, creditors & budgets with dashboards.',
      details: 'projects/provisio.html',
      ctaUrl: 'https://www.provisio.app',
      ctaLabel: 'Open App',
      preview: 'images/projects/6. ProVisio - App/ProVisio 1 Dashboard 11.png'
    },
    {
      title: 'TAMS360',
      stack: 'React &bull; Flask &bull; PostgreSQL &bull; GIS',
      blurb: 'Mobile asset capture & inspections with GIS and photo evidence.',
      details: 'projects/tams360.html',
      ctaUrl: 'https://app.tams360.co.za/',
      ctaLabel: 'Open App',
      preview: 'images/projects/8. TAMS360/Tams360 - 2 Dashboard 1.png'
    },
    {
      title: 'Assetry',
      stack: 'React &bull; Flask &bull; PostgreSQL',
      blurb: 'Asset register with geofencing, QR/NFC scans, renewals & GRAP reports.',
      details: 'projects/assetry.html',
      ctaUrl: 'https://assetry.provisio.app',
      ctaLabel: 'Open App',
      preview: 'images/projects/9. Assetry/Assetry 2 Dashboard 1.png'
    },
    {
      title: 'TalentGrid',
      stack: 'People Analytics',
      blurb: 'Analytics across performance, compensation, learning & leave.',
      details: 'projects/talentgrid.html',
      ctaUrl: 'https://small-work-96524359.figma.site',
      ctaLabel: 'Design',
      preview: 'images/projects/1. TalentGrid/TalentGrid 1 Dashboard 1.png'
    },
    {
      title: 'Affinity',
      stack: 'CRM',
      blurb: 'CRM pipelines, interactions, proposals and reminders.',
      details: 'projects/affinity.html',
      ctaUrl: 'https://ready-pepper-25801161.figma.site',
      ctaLabel: 'Design',
      preview: 'images/projects/7. Affinity/Affinity 1 Home 1.png'
    },
    {
      title: 'Leave Management',
      stack: 'Google Sheets + Apps Script',
      blurb: 'Requests, approvals, calendars and utilisation reports.',
      details: 'projects/leave-management.html',
      ctaUrl: 'https://docs.google.com/spreadsheets/d/1jjnTcOUER1DguwdZEPhrbr__xAp_9nqFi7limxkoQ7Q/edit?usp=sharing',
      ctaLabel: 'Template',
      preview: 'images/projects/3. Leave Management/Leave Management Tool 2 Dashboard.png'
    },
    {
      title: 'ZiMaSy',
      stack: 'Finance Automation',
      blurb: 'Automated statements, exceptions and collections workflow.',
      details: 'projects/zimasy.html',
      ctaUrl: 'https://rare-stoop-55686335.figma.site',
      ctaLabel: 'Design',
      preview: 'images/projects/2. ZiMaSy/ZiMaSy 1 Dashboard 2.png'
    },
    {
      title: 'QualiPro',
      stack: 'Quality &bull; ISO',
      blurb: 'ISO-aligned quality planning, risks, milestones & printable audit packs.',
      details: 'projects/qualipro.html',
      ctaUrl: 'https://learn-public-72567702.figma.site',
      ctaLabel: 'Design',
      preview: 'images/projects/5. QualiPro/QualiPro 9. Main.png'
    }
  ];

  P.forEach(p => {
    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-4';
    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        ${imgTag(p.preview, `${p.title} preview`)}
        <div class="card-body">
          <h5 class="card-title mb-1">${p.title}</h5>
          <div class="small text-muted mb-2">${p.stack}</div>
          <p class="card-text">${p.blurb}</p>
          <div class="d-flex gap-2">
            <a class="btn btn-outline-secondary btn-sm" href="${p.details}">Details</a>
            <a class="btn btn-primary btn-sm" target="_blank" rel="noopener" href="${p.ctaUrl}">${p.ctaLabel}</a>
          </div>
        </div>
      </div>`;
    grid.appendChild(col);
  });
})();
