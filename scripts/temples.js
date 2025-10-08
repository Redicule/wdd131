const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },

  // Additional items
  {
    templeName: "Salt Lake",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 382207,
    imageUrl:
      "https://media.cnn.com/api/v1/images/stellar/prod/190419150647-salt-lake-city-temple.jpg?q=x_145,y_70,h_1536,w_2731,c_crop/h_653,w_1160/f_avif"
  },
  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 41010,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/rome-italy-temple/rome-italy-temple-2642-main.jpg"
  },
  {
    templeName: "Fukuoka Japan",
    location: "Fukuoka, Japan",
    dedicated: "2000, June, 11",
    area: 10700,
    imageUrl:
      "https://www.churchofjesuschrist.org/imgs/6e3b7b6a40037766aec369a9a3380aed9a963cec/full/800%2C/0/default"
  }
];

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function renderTemples(list){
  const grid = $("#temple-grid");
  grid.innerHTML = "";
  list.forEach(t => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <img src="${t.imageUrl}" alt="${t.templeName}" loading="lazy" width="400" height="250">
      <div class="content">
        <h2>${t.templeName}</h2>
        <div class="meta">
          <div><strong>Location:</strong> ${t.location}</div>
          <div><strong>Dedicated:</strong> ${t.dedicated}</div>
          <div><strong>Area:</strong> ${t.area.toLocaleString()} sq ft</div>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function parseDedicatedYear(dedicatedStr){
  const year = parseInt(String(dedicatedStr).split(",")[0], 10);
  return Number.isFinite(year) ? year : null;
}

function applyFilter(filter){
  let list = temples.slice();

  switch(filter){
    case "old":
      list = list.filter(t => {
        const y = parseDedicatedYear(t.dedicated);
        return y !== null && y < 1900;
      });
      break;
    case "new":
      list = list.filter(t => {
        const y = parseDedicatedYear(t.dedicated);
        return y !== null && y > 2000;
      });
      break;
    case "large":
      list = list.filter(t => t.area > 90000);
      break;
    case "small":
      list = list.filter(t => t.area < 10000);
      break;
    default: // "home"
      // no-op
      break;
  }

  $$("#mainnav a").forEach(a => a.classList.toggle("active", a.dataset.filter === filter));

  renderTemples(list);
}

function updateFooter(){
  const yearSpan = $("#year");
  const modifiedSpan = $("#lastModified");
  if (yearSpan) yearSpan.textContent = String(new Date().getFullYear());
  if (modifiedSpan) modifiedSpan.textContent = document.lastModified;
}

document.addEventListener("DOMContentLoaded", () => {
  renderTemples(temples);

  $$("#mainnav a").forEach(a => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      applyFilter(a.dataset.filter);
    });
  });

  applyFilter("home");

  updateFooter();
});
