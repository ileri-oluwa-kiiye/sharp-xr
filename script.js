// SharpXR project page scripts

(function () {
  "use strict";

  // 1. Copy BibTeX to clipboard
  var copyBtn = document.getElementById("copy-bibtex");
  var bibtex = document.getElementById("bibtex-text");

  if (copyBtn && bibtex) {
    copyBtn.addEventListener("click", function () {
      var text = bibtex.textContent;
      var done = function () {
        copyBtn.textContent = "Copied!";
        setTimeout(function () { copyBtn.textContent = "Copy"; }, 1600);
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, fallback);
      } else {
        fallback();
      }

      function fallback() {
        var ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand("copy"); done(); } catch (e) { /* ignore */ }
        document.body.removeChild(ta);
      }
    });
  }

  // 2. Show a dashed placeholder when a figure image has not been added yet
  document.querySelectorAll("figure[data-img] img").forEach(function (img) {
    var fig = img.closest("figure");
    var markMissing = function () { fig.classList.add("is-missing"); };
    img.addEventListener("error", markMissing);
    if (img.complete && img.naturalWidth === 0) { markMissing(); }
  });
})();
