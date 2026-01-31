/* Home Projects grid — auto thumbnail via dashboard.* or 1.png, 1a.jpg, … */
(function () {
  const EXTS = ["png", "jpg", "jpeg", "webp"];
  const SUFFIX = ["", "a", "b", "c", "d", "e", "f"];
  const enc = (p) => encodeURI(p);

  // Edit text only; folders/pages match your repo
  const PROJECTS = [
    {
      title: "CVTailorView",
      blurb:
        "Profiles, projects, advanced search and branded Word/PDF exports.",
      folder: "images/projects/4. CVTailorView/",
      page: "projects/cvtailorview.html",
      site: "https://www.cvtailorview.app",
      siteLabel: "Live site",
      tags: "React • Flask • PostgreSQL",
    },
    {
      title: "ProVisio",
      blurb: "Projects, timesheets, invoicing, creditors, budgets, dashboards.",
      folder: "images/projects/6. ProVisio - App/",
      page: "projects/provisio.html",
      site: "https://www.provisio.app",
      siteLabel: "Live site",
      tags: "React • Flask • PostgreSQL",
    },
    {
      title: "TAMS360",
      blurb: "Mobile asset capture & inspections with GIS and photo evidence.",
      folder: "images/projects/8. TAMS360/",
      page: "projects/tams360.html",
      site: "https://app.tams360.co.za/",
      siteLabel: "Live app",
      tags: "React • Flask • PostGIS",
    },
    {
      title: "Assetry",
      blurb:
        "Asset register with geofencing, QR/NFC scans, renewals & GRAP reports.",
      folder: "images/projects/9. Assetry/",
      page: "projects/assetry.html",
      site: "https://assetry.provisio.app",
      siteLabel: "Live app",
      tags: "React • Flask • PostgreSQL",
    },
    {
      title: "TalentGrid",
      blurb:
        "People analytics across performance, compensation, learning & leave.",
      folder: "images/projects/1. TalentGrid/",
      page: "projects/talentgrid.html",
      site: "https://small-work-96524359.figma.site",
      siteLabel: "Design",
      tags: "People Analytics",
    },
    {
      title: "Affinity",
      blurb: "CRM pipelines, interactions, proposals and reminders.",
      folder: "images/projects/7. Affinity/",
      page: "projects/affinity.html",
      site: "https://ready-pepper-25801161.figma.site",
      siteLabel: "Design",
      tags: "CRM",
    },
    {
      title: "Leave Management",
      blurb: "Requests, approvals, calendars and utilisation reports.",
      folder: "images/projects/3. Leave Management/",
      page: "projects/leave-management.html",
      site: "https://docs.google.com/spreadsheets/d/1jjnTcOUER1DguwdZEPhrbr__xAp_9nqFi7limxkoQ7Q/edit?usp=sharing",
      siteLabel: "Template",
      tags: "Google Sheets + Apps Script",
    },
    {
      title: "ZiMaSy",
      blurb: "Automated statements, exceptions and collections workflow.",
      folder: "images/projects/2. ZiMaSy/",
      page: "projects/zimasy.html",
      site: "https://rare-stoop-55686335.figma.site",
      siteLabel: "Design",
      tags: "Finance Automation",
    },
    {
      title: "QualiPro",
      blurb: "ISO-aligned quality planning, risks, milestones and audit packs.",
      folder: "images/projects/5. QualiPro/",
      page: "projects/qualipro.html",
      site: "https://learn-public-72567702.figma.site",
      siteLabel: "Design",
      tags: "Quality • ISO",
    },
  ];

  function candidates() {
    const list = [];
    EXTS.forEach((e) => list.push(`dashboard.${e}`));
    for (const s of SUFFIX) for (const e of EXTS) list.push(`1${s}.${e}`);
    return list;
  }

  function probe(base, rel) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(base + rel);
      img.onerror = () => resolve(null);
      img.src = enc(base + rel);
    });
  }

  async function pickThumb(base) {
    const found = (
      await Promise.all(candidates().map((r) => probe(base, r)))
    ).find(Boolean);
    return found || "assets/placeholder-16x9.png";
  }

  async function render() {
    const grid = document.getElementById("projects-grid");
    if (!grid) return;

    const rows = await Promise.all(
      PROJECTS.map(async (p) => {
        const thumb = await pickThumb(p.folder);
        return `
          <div class="col-md-4">
            <div class="card h-100 project-img-bg">
              <img src="${enc(thumb)}" class="card-img-top project-img" alt="">
              <div class="card-body d-flex flex-column">
                <h5 class="fw-bold mb-1">${p.title}</h5>
                <div class="text-muted small mb-2">${p.tags || ""}</div>
                <p class="card-text flex-grow-1">${p.blurb}</p>
                <div class="d-flex gap-2 mt-2">
                  <a class="btn btn-outline" href="${enc(p.page)}">Case study</a>
                  <a class="btn btn-primary" target="_blank" href="${enc(p.site)}">${p.siteLabel || "Visit"}</a>
                </div>
              </div>
            </div>
          </div>`;
      })
    );

    grid.innerHTML = rows.join("");
  }

  window.addEventListener("DOMContentLoaded", render);
})();
