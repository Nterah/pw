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
      stack: 'React • Flask • PostgreSQL',
      blurb: 'Tender-ready CV database with smart matching and branded Word/PDF exports.',
      details: 'projects/cvtailorview.html',
      ctaUrl: 'https://www.cvtailorview.app',
      ctaLabel: 'Open App',
      preview: 'images/projects/4. CVTailorView/CVTailorView 1 Dashboard 10.png'
    },
    {
      title: 'ProVisio',
      stack: 'React • Flask • PostgreSQL',
      blurb: 'Projects, timesheets, expenses, invoicing and profit/cashflow dashboards (replacing spreadsheets).',
      details: 'projects/provisio.html',
      ctaUrl: 'https://www.provisio.app',
      ctaLabel: 'Open App',
      preview: 'images/projects/6. ProVisio - App/ProVisio 1 Dashboard 11.png'
    },
    {
      title: 'TAMS360',
      stack: 'React • Flask • PostgreSQL • GIS',
      blurb: 'Transport asset inventory + inspections with GIS mapping and explainable condition analytics.',
      details: 'projects/tams360.html',
      ctaUrl: 'https://app.tams360.co.za/',
      ctaLabel: 'Open App',
      preview: 'images/projects/8. TAMS360/Tams360 - 2 Dashboard 1.png'
    },
    {
      title: 'Assetry',
      stack: 'React • Flask • PostgreSQL',
      blurb: 'GRAP-aligned asset register with verification, renewals and replacement planning.',
      details: 'projects/assetry.html',
      ctaUrl: 'https://assetry.provisio.app',
      ctaLabel: 'Open App',
      preview: 'images/projects/9. Assetry/Assetry 2 Dashboard 1.png'
    },
    {
      title: 'TalentGrid',
      stack: 'People Analytics',
      blurb: 'South African HRMS with people analytics, role-based UX and compliance-aware workflows.',
      details: 'projects/talentgrid.html',
      ctaUrl: 'https://small-work-96524359.figma.site',
      ctaLabel: 'Design',
      preview: 'images/projects/1. TalentGrid/TalentGrid 1 Dashboard 1.png'
    },
    {
      title: 'Affinity',
      stack: 'CRM',
      blurb: 'White-label multi-tenant church community app with theme/branding isolation and privacy-first access.',
      details: 'projects/affinity.html',
      ctaUrl: 'https://ready-pepper-25801161.figma.site',
      ctaLabel: 'Design',
      preview: 'images/projects/7. Affinity/Affinity 1 Home 1.png'
    },
    {
      title: 'Leave Management',
      stack: 'Google Sheets + Apps Script',
      blurb: 'Leave requests, approvals, balances and calendar planning in one lightweight workflow.',
      details: 'projects/leave-management.html',
      ctaUrl: 'https://docs.google.com/spreadsheets/d/1jjnTcOUER1DguwdZEPhrbr__xAp_9nqFi7limxkoQ7Q/edit?usp=sharing',
      ctaLabel: 'Template',
      preview: 'images/projects/3. Leave Management/Leave Management Tool 2 Dashboard.png'
    },
    {
      title: 'ZiMaSy',
      stack: 'Finance Automation',
      blurb: 'Mobile-first field attendance & verification with audit-ready evidence and payment-readiness reporting.',
      details: 'projects/zimasy.html',
      ctaUrl: 'https://rare-stoop-55686335.figma.site',
      ctaLabel: 'Design',
      preview: 'images/projects/2. ZiMaSy/ZiMaSy 1 Dashboard 2.png'
    },
    {
      title: 'QualiPro',
      stack: 'Quality • ISO',
      blurb: 'Inspections, NCRs and corrective actions with evidence capture and audit-ready reporting.',
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
