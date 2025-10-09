// products.js — populate the product <select> using the provided array
export const products = [
  { id: "fc-1888", name: "flux capacitor", averagerating: 4.5 },
  { id: "fc-2050", name: "power laces", averagerating: 4.7 },
  { id: "fs-1987", name: "time circuits", averagerating: 3.5 },
  { id: "ac-2000", name: "low voltage reactor", averagerating: 3.9 },
  { id: "jj-1969", name: "warp equalizer", averagerating: 5.0 }
];

const selectEl = document.querySelector('#product');
if (selectEl) {
  products.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p.id;           // value = id
    opt.textContent = p.name;   // visible text = name
    selectEl.appendChild(opt);
  });
}
