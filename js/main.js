(() => {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  const links = document.querySelectorAll(".site-nav a[href^='#']");
  const sections = [...document.querySelectorAll("main section[id]")];
  const year = document.getElementById("year");

  if (year) year.textContent = String(new Date().getFullYear());

  const closeNav = () => {
    toggle?.setAttribute("aria-expanded", "false");
    nav?.classList.remove("is-open");
    document.body.classList.remove("nav-open");
  };

  toggle?.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    nav?.classList.toggle("is-open", !open);
    document.body.classList.toggle("nav-open", !open);
  });

  links.forEach((link) => {
    link.addEventListener("click", () => closeNav());
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNav();
  });

  const onScroll = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 12);

    const marker = window.scrollY + 120;
    let current = sections[0]?.id;

    for (const section of sections) {
      if (section.offsetTop <= marker) current = section.id;
    }

    links.forEach((link) => {
      const active = link.getAttribute("href") === `#${current}`;
      link.classList.toggle("is-active", active);
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
