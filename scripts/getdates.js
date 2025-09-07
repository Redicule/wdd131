/* Dynamically output current year and last modified date
   (per the assignment instructions) */

document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.querySelector("#currentyear");
  const modEl  = document.querySelector("#lastModified");

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  if (modEl) {
    modEl.textContent = `Last Modified: ${document.lastModified}`;
  }
});
