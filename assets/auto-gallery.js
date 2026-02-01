/* Auto Gallery Loader
 * - Reads data-folder from #auto-gallery
 * - Fetches <folder>/_list.json (works with spaces)
 * - Renders a simple carousel with Prev/Next
 *
 * Notes for GitHub Pages:
 * - Ensure a .nojekyll file exists at the site root so folders/files starting with "_" are served.
 */
(function () {
  "use strict";

  function stripBOM(text) {
    // Remove UTF-8 BOM if present
    if (!text) return text;
    return text.replace(/^\uFEFF/, "");
  }

  function joinUrl(base, path) {
    // URL() handles spaces and relative paths correctly
    return new URL(path, base).toString();
  }

  function encodePathSegment(segment) {
    // Keep slashes but encode each segment (handles spaces reliably)
    return segment.split("/").map(encodeURIComponent).join("/");
  }

  function createEl(tag, attrs, children) {
    var el = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === "class") el.className = attrs[k];
        else if (k === "html") el.innerHTML = attrs[k];
        else el.setAttribute(k, attrs[k]);
      });
    }
    (children || []).forEach(function (c) { el.appendChild(c); });
    return el;
  }

  function renderGallery(container, folder, files) {
    if (!Array.isArray(files) || files.length === 0) {
      container.innerHTML = '<div class="text-muted small">No gallery images found.</div>';
      return;
    }

    var idx = 0;

    var img = createEl("img", {
      class: "img-fluid rounded shadow-sm",
      alt: "Gallery image"
    });

    var caption = createEl("div", { class: "text-muted small mt-2" });
    var prevBtn = createEl("button", { class: "btn btn-outline btn-sm", type: "button" }, [document.createTextNode("Previous")]);
    var nextBtn = createEl("button", { class: "btn btn-outline btn-sm", type: "button" }, [document.createTextNode("Next")]);

    var controls = createEl("div", { class: "d-flex gap-2 mt-3" }, [prevBtn, nextBtn]);

    function show(i) {
      idx = (i + files.length) % files.length;
      var file = files[idx];

      // Build src: folder may be relative like "../images/..."
      var folderClean = folder.replace(/\/+$/g, "");
      var fileUrl = joinUrl(document.baseURI, folderClean + "/" + encodePathSegment(file));
      img.src = fileUrl;
      caption.textContent = (idx + 1) + " / " + files.length + " — " + file;
    }

    prevBtn.addEventListener("click", function () { show(idx - 1); });
    nextBtn.addEventListener("click", function () { show(idx + 1); });

    container.innerHTML = "";
    container.appendChild(img);
    container.appendChild(caption);
    container.appendChild(controls);

    show(0);
  }

  async function initOne(container) {
    try {
      var folder = container.getAttribute("data-folder");
      if (!folder) return;

      var folderClean = folder.replace(/\/+$/g, "");
      var listUrl = joinUrl(document.baseURI, folderClean + "/_list.json");

      var res = await fetch(listUrl, { cache: "no-store" });
      if (!res.ok) throw new Error("Could not fetch _list.json (" + res.status + ")");

      var text = stripBOM(await res.text());
      var files = JSON.parse(text);

      renderGallery(container, folderClean, files);
    } catch (err) {
      // Show friendly message but don't break the page
      container.innerHTML =
        '<div class="text-muted small">' +
        'Gallery could not load automatically.<br>' +
        'If you are opening the site from a local folder, run a local server (e.g. <code>python -m http.server</code>) or view via GitHub Pages.' +
        "</div>";
      // For debugging:
      // console.warn("Gallery init failed:", err);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    var containers = document.querySelectorAll("#auto-gallery, .auto-gallery");
    containers.forEach(function (c) { initOne(c); });
  });
})();
