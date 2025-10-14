// js/app.js
(function(){
  // Helpers (safe-singleton)
  if(!window.$){  window.$  = (sel, ctx=document) => ctx.querySelector(sel); }
  if(!window.$$){ window.$$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel)); }

  // ---------- Header / Footer ----------
  window.renderNav = function(){
    const header = $('#site-header');
    if (!header) return;
    header.innerHTML = `
      <nav class="nav" aria-label="Primary">
        <a class="brand" href="index.html">Fresh Bites</a>
        <ul id="navlist" class="nav-list">
          <li><a href="index.html">Home</a></li>
          <li><a href="recipes.html">Recipes</a></li>
          <li><a href="contact.html">Submit</a></li>
          <li><a href="credits.html">Credits</a></li>
        </ul>
      </nav>
    `;
    $$('#navlist a').forEach(a => {
      if (location.pathname.endsWith(a.getAttribute('href'))) a.setAttribute('aria-current','page');
    });
  };

  window.renderFooter = function(){
    const footer = $('#site-footer');
    if (!footer) return;
    const y = new Date().getFullYear();
    footer.innerHTML = `
      <p><small>&copy; ${y} Fresh Bites</small></p>
      <p><a href="credits.html">Content credits</a></p>`;
  };

  // ---------- Favorites (Home page) ----------
  function getFavorites(){
    try { return JSON.parse(localStorage.getItem('favorites')) || []; }
    catch(e){ return []; }
  }
  function setFavorites(list){
    localStorage.setItem('favorites', JSON.stringify(list || []));
  }
  function removeFavoriteById(id){
    const favs = getFavorites().filter(r => String(r.id) !== String(id));
    setFavorites(favs);
    return favs;
  }

  function favoriteCardTemplate(r){
    const img = r.photo || './assets/market.svg';
    return `
      <article class="card" data-id="${r.id}">
        <img src="${img}" alt="${r.title}" loading="lazy" width="480" height="320">
        <h3>${r.title}</h3>
        <p class="muted">${r.category} • ${r.minutes} min</p>
        <div style="display:flex;gap:.5rem;align-items:center">
          <a class="btn" href="recipes.html">View in Recipes</a>
          <button class="unsave" data-id="${r.id}" aria-pressed="true">Remove</button>
        </div>
      </article>`;
  }

  function renderFavorites(){
    const mount = document.querySelector('[data-populate="favorites"]');
    if (!mount) return; // only exists on Home
    const favs = getFavorites();
    mount.innerHTML = favs.length
      ? favs.map(favoriteCardTemplate).join('')
      : '<p class="muted">No favorites saved yet.</p>';

    // Delegate remove clicks
    if (!mount.dataset.listenerAdded){
      mount.addEventListener('click', (e) => {
        if(!e.target.matches('.unsave')) return;
        const id = e.target.dataset.id;
        const after = removeFavoriteById(id);
        // Remove card from DOM
        e.target.closest('.card')?.remove();
        if (after.length === 0) {
          mount.innerHTML = '<p class="muted">No favorites saved yet.</p>';
        }
      });
      mount.dataset.listenerAdded = 'true';
    }
  }

  // ---------- Contact form behavior ----------
  function wireForm(){
    const form = $('#recipe-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());

      if(!data.name || !data.email || !data.title || !data.category || !data.minutes || !data.ingredients || !data.steps){
        $('#form-msg').textContent = 'Please complete all required fields.';
        return;
      }
      if(Number(data.minutes) < 5){
        $('#form-msg').textContent = 'Minutes must be at least 5.';
        return;
      }

      const newRecipe = {
        id: Date.now(),
        title: data.title.trim(),
        category: data.category,
        minutes: Number(data.minutes),
        ingredients: data.ingredients.split(',').map(s => s.trim()).filter(Boolean),
        steps: data.steps.trim(),
        photo: data.photo?.trim() || null,
        author: data.name.trim()
      };

      const submissions = JSON.parse(localStorage.getItem('submissions') || '[]');
      submissions.push(newRecipe);
      localStorage.setItem('submissions', JSON.stringify(submissions));
      form.reset();
      $('#form-msg').textContent = `Thanks, ${newRecipe.author}! Your "${newRecipe.title}" was submitted.`;
    });
  }

  // ---------- Boot ----------
  document.addEventListener('DOMContentLoaded', () => {
    renderNav();
    renderFooter();
    renderFavorites(); // Home favorites
    wireForm();        // Submit page
  });
})();
