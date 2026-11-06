(function () {
  var root = document.documentElement;
  root.classList.add("js");

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!reduce && "IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          revealObserver.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );

    document.querySelectorAll(".reveal").forEach(function (node) {
      revealObserver.observe(node);
    });

    var steps = Array.prototype.slice.call(document.querySelectorAll(".step"));
    var stepObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          steps.forEach(function (step) {
            step.classList.toggle("is-current", step === entry.target);
          });
        });
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: 0.01 }
    );

    steps.forEach(function (step) {
      stepObserver.observe(step);
    });
  } else {
    document.querySelectorAll(".reveal").forEach(function (node) {
      node.classList.add("is-in");
    });
  }

  document.querySelectorAll(".faq-item button").forEach(function (button) {
    button.addEventListener("click", function () {
      var open = button.getAttribute("aria-expanded") === "true";
      var panel = document.getElementById(button.getAttribute("aria-controls"));
      button.setAttribute("aria-expanded", open ? "false" : "true");
      if (panel) panel.hidden = open;
    });
  });
})();
