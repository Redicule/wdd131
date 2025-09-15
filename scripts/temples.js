/* Footer dynamic year and last modified */
const yearSpan = document.getElementById("year");
const lastModP = document.getElementById("last-modified");
if (yearSpan) yearSpan.textContent = new Date().getFullYear();
if (lastModP) lastModP.textContent = `Last Modified: ${document.lastModified}`;

/* Hamburger menu (mobile only) */
const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("primary-nav");
if (hamburger && nav) {
  hamburger.addEventListener("click", () => {
    const open = nav.style.display === "flex";
    nav.style.display = open ? "none" : "flex";
    hamburger.textContent = open ? "☰" : "✕";
    hamburger.setAttribute("aria-expanded", (!open).toString());
  });
}

/* Filtering logic for nav links */
const links = document.querySelectorAll("#primary-nav a");
const cards = document.querySelectorAll(".gallery .card");

function applyFilter(kind) {
  links.forEach(a => a.classList.toggle("active", a.dataset.filter === kind || (kind === "all" && a.dataset.filter === "all")));
  cards.forEach(card => {
    const year = parseInt(card.dataset.year, 10);
    const size = card.dataset.size;
    let show = true;

    switch (kind) {
      case "old":
        show = year < 1900;
        break;
      case "new":
        show = year >= 2000;
        break;
      case "large":
        show = size === "large";
        break;
      case "small":
        show = size === "small";
        break;
      default:
        show = true; // "all"
    }
    card.style.display = show ? "" : "none";
  });
}

links.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const kind = link.dataset.filter || "all";
    applyFilter(kind);
  });
});

// default filter
applyFilter("all");