/* =========================================================
   script.js: điều hướng mobile + hiệu ứng cuộn fade-in
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  /* ----- Menu hamburger (mobile) ----- */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    // Đóng menu khi bấm vào một link
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ----- Hiệu ứng fade-in / slide-up khi cuộn tới ----- */
  var revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && revealEls.length) {
    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    // Trình duyệt cũ: hiện luôn
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ----- Ảnh chân dung: nếu thiếu file thì hiện chữ lồng "BBN" ----- */
  document.querySelectorAll("img.portrait-img").forEach(function (img) {
    img.addEventListener("error", function () {
      var frame = img.parentElement;
      img.remove();
      if (frame && !frame.querySelector(".portrait-fallback")) {
        var fb = document.createElement("div");
        fb.className = "portrait-fallback";
        fb.textContent = "BBN";
        frame.appendChild(fb);
      }
    });
  });
});
