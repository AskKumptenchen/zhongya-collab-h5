(function () {
  var codes = { zh: "zh-CN", en: "en", ru: "ru", kk: "kk" };

  function detectLang() {
    var q = new URLSearchParams(location.search).get("lang");
    if (q && window.I18N[q]) return q;

    var file = (location.pathname.split("/").pop() || "").toLowerCase();
    if (file === "en.html") return "en";
    if (file === "ru.html") return "ru";
    if (file === "kk.html") return "kk";

    var path = location.pathname.replace(/\/+$/, "").toLowerCase();
    if (path.endsWith("/en")) return "en";
    if (path.endsWith("/ru")) return "ru";
    if (path.endsWith("/kk")) return "kk";

    var marked = document.documentElement.getAttribute("data-lang");
    if (marked && window.I18N[marked]) return marked;
    return "zh";
  }

  function t(lang, key) {
    var pack = (window.I18N && window.I18N[lang]) || {};
    if (pack[key] != null) return pack[key];
    if (window.I18N && window.I18N.zh && window.I18N.zh[key] != null) return window.I18N.zh[key];
    return "";
  }

  function apply(lang) {
    document.documentElement.lang = codes[lang] || "zh-CN";
    document.documentElement.setAttribute("data-lang", lang);
    document.title = t(lang, "doc.title");

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(lang, el.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      el.innerHTML = t(lang, el.getAttribute("data-i18n-html"));
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      el.setAttribute("aria-label", t(lang, el.getAttribute("data-i18n-aria")));
    });
    document.querySelectorAll("[data-i18n-alt]").forEach(function (el) {
      el.setAttribute("alt", t(lang, el.getAttribute("data-i18n-alt")));
    });

    document.querySelectorAll(".langs a").forEach(function (a) {
      a.classList.toggle("on", a.getAttribute("data-go") === lang);
    });

    document.documentElement.classList.add("i18n-ready");
  }

  var lang = detectLang();
  apply(lang);

  var noteEl = document.getElementById("term-note");
  var terms = document.querySelectorAll(".term");

  terms.forEach(function (btn) {
    btn.addEventListener("click", function () {
      terms.forEach(function (b) {
        b.classList.remove("on");
      });
      btn.classList.add("on");
      if (noteEl) {
        noteEl.textContent = t(lang, "note." + btn.getAttribute("data-term"));
        noteEl.classList.add("show");
      }
    });
  });

  var links = Array.prototype.slice.call(document.querySelectorAll(".nav a"));
  var ids = links.map(function (a) {
    return a.getAttribute("href").slice(1);
  });

  function setActive() {
    var y = window.scrollY + 120;
    var current = ids[0];
    ids.forEach(function (id) {
      var el = document.getElementById(id);
      if (el && el.offsetTop <= y) current = id;
    });
    links.forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("href") === "#" + current);
    });
  }

  window.addEventListener("scroll", setActive, { passive: true });
  setActive();

  document.querySelectorAll(".folder").forEach(function (d) {
    d.addEventListener("toggle", function () {
      if (!d.open) return;
      document.querySelectorAll(".folder").forEach(function (other) {
        if (other !== d) other.removeAttribute("open");
      });
    });
  });
})();
