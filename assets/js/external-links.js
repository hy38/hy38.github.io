(function () {
  var externalLinkSelector = "a[href]";
  var relTokens = ["noopener", "noreferrer"];

  function isExternalHttpUrl(url) {
    return (url.protocol === "http:" || url.protocol === "https:") && url.origin !== window.location.origin;
  }

  function addRelTokens(link) {
    var existingRel = link.getAttribute("rel") || "";
    var tokens = existingRel.split(/\s+/).filter(Boolean);

    relTokens.forEach(function (token) {
      if (tokens.indexOf(token) === -1) {
        tokens.push(token);
      }
    });

    link.setAttribute("rel", tokens.join(" "));
  }

  function updateExternalLinks() {
    document.querySelectorAll(externalLinkSelector).forEach(function (link) {
      var href = link.getAttribute("href");
      var url;

      if (!href || href.charAt(0) === "#" || link.hasAttribute("download")) {
        return;
      }

      try {
        url = new URL(href, window.location.href);
      } catch (error) {
        return;
      }

      if (!isExternalHttpUrl(url)) {
        return;
      }

      link.setAttribute("target", "_blank");
      addRelTokens(link);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", updateExternalLinks);
  } else {
    updateExternalLinks();
  }
}());
