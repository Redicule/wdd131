// js/recipes.js - with real image filenames
(function(){
  const q  = (sel, ctx=document) => ctx.querySelector(sel);
  const qa = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

  function getFavorites(){ try { return JSON.parse(localStorage.getItem('favorites')) || []; } catch(e){ return []; } }
  function setFavorites(list){ localStorage.setItem('favorites', JSON.stringify(list || [])); }
  function isFavorite(id){ return getFavorites().some(r => String(r.id) === String(id)); }
  function toggleFavorite(item){
    const favs = getFavorites();
    const idx = favs.findIndex(r => String(r.id) === String(item.id));
    if (idx >= 0){ favs.splice(idx, 1); setFavorites(favs); return false; }
    favs.push(item); setFavorites(favs); return true;
  }

  const sampleRecipes = [
    { id: 1,  title: 'Veggie Stir-Fry',       category: 'Dinner',    minutes: 15, photo: './assets/Veggie Stir-Fry.jpg',
      ingredients: ['broccoli','carrot','bell pepper','soy sauce','noodles'],
      steps: 'Stir-fry vegetables in a little oil over high heat. Add soy sauce and cooked noodles; toss until coated.' },
    { id: 2,  title: 'Chicken Wrap',          category: 'Dinner',    minutes: 15, photo: './assets/Chicken wrap.jpg',
      ingredients: ['tortilla','cooked chicken','lettuce','tomato','yogurt sauce'],
      steps: 'Warm tortilla. Layer chicken, lettuce, tomato, and yogurt sauce. Roll tightly and slice.' },
    { id: 3,  title: 'Tuna Salad',            category: 'Lunch',     minutes: 10, photo: './assets/tunasalad.jpg',
      ingredients: ['tuna','lettuce','cucumber','olive oil','lemon'],
      steps: 'Mix tuna with a little olive oil and lemon. Toss with chopped lettuce and cucumber; season to taste.' },
    { id: 4,  title: 'Avocado Toast',         category: 'Breakfast', minutes: 10, photo: './assets/avocadotoast.jpg',
      ingredients: ['bread','avocado','lemon','chili flakes'],
      steps: 'Toast bread. Smash avocado with lemon, spread on toast, and finish with chili flakes.' },
    { id: 5,  title: 'Green Smoothie',        category: 'Drinks',    minutes: 5,  photo: './assets/Green Smoothie.jpg',
      ingredients: ['spinach','banana','yogurt','milk'],
      steps: 'Blend spinach, banana, yogurt, and milk until smooth.' },
    { id: 6,  title: 'Tomato Basil Soup',     category: 'Lunch',     minutes: 20, photo: './assets/Tomato Basil Soup.jpg',
      ingredients: ['tomato','basil','garlic','onion'],
      steps: 'Sauté onion and garlic. Add tomatoes and simmer 15 min. Blend and finish with basil.' },
    { id: 7,  title: 'Egg & Veg Scramble',    category: 'Breakfast', minutes: 10, photo: './assets/Egg & Veg Scramble.jpg',
      ingredients: ['eggs','spinach','onion','cheese'],
      steps: 'Sauté onion and spinach. Add beaten eggs; scramble. Top with grated cheese.' },
    { id: 8,  title: 'Quick Quesadillas',     category: 'Lunch',     minutes: 12, photo: './assets/Quick Quesadillas.jpg',
      ingredients: ['tortillas','cheese','beans','salsa'],
      steps: 'Fill tortilla with cheese and beans. Fold and crisp both sides in a pan; serve with salsa.' },
    { id: 9,  title: 'Garlic Shrimp Pasta',   category: 'Dinner',    minutes: 18, photo: './assets/Garlic Shrimp Pasta.jpg',
      ingredients: ['pasta','shrimp','garlic','olive oil','parsley'],
      steps: 'Cook pasta. Sauté garlic in oil, add shrimp until pink. Toss with pasta and parsley.' },
    { id: 10, title: 'Yogurt Parfait',        category: 'Breakfast', minutes: 5,  photo: './assets/Yogurt Parfait.jpg',
      ingredients: ['yogurt','granola','berries','honey'],
      steps: 'Layer yogurt, berries, and granola. Drizzle with honey.' }
  ];

  function loadAllRecipes(){
    let userSubs = [];
    try { userSubs = JSON.parse(localStorage.getItem('submissions')) || [] } catch(e){}
    return sampleRecipes.concat(userSubs).filter(Boolean).sort((a,b)=>a.title.localeCompare(b.title));
  }

  function cardTemplate(r){
    const img = r.photo || './assets/market.svg';
    const saved = isFavorite(r.id);
    const label = saved ? '★ Saved' : '☆ Save';
    const pressed = saved ? 'true' : 'false';
    return `
      <article class="card" data-id="${r.id}">
        <img src="${img}" alt="${r.title}" loading="lazy" width="480" height="320">
        <h3>${r.title}</h3>
        <p class="muted">${r.category} • ${r.minutes} min</p>
        <div style="display:flex;gap:.5rem;align-items:center">
          <button class="view" data-id="${r.id}">View</button>
          <button class="fav" data-id="${r.id}" aria-pressed="${pressed}">${label}</button>
        </div>
      </article>
    `;
  }

  function renderList(list){
    const mount = q('#recipes');
    if(!mount) return;

    if(list.length === 0){
      mount.innerHTML = '<p class="muted">No recipes found.</p>';
      return;
    }
    mount.innerHTML = list.map(cardTemplate).join('');

    if (!mount.dataset.listenerAdded){
      mount.addEventListener('click', (e) => {
        if (e.target.matches('.view')){
          const id = e.target.dataset.id;
          const item = list.find(r => String(r.id) === String(id));
          if(item) openRecipeModal(item);
          return;
        }
        if (e.target.matches('.fav')){
          const id = e.target.dataset.id;
          const item = list.find(r => String(r.id) === String(id));
          if(!item) return;
          const nowSaved = toggleFavorite(item);
          e.target.textContent = nowSaved ? '★ Saved' : '☆ Save';
          e.target.setAttribute('aria-pressed', nowSaved ? 'true' : 'false');
          return;
        }
      });
      mount.dataset.listenerAdded = 'true';
    }
  }

  function openRecipeModal(recipe){
    const modal = document.getElementById('recipe-modal');
    const body  = document.getElementById('modal-body');
    if(!modal || !body) return;

    const ing = recipe.ingredients.map(i => `<li>${i}</li>`).join('');
    body.innerHTML = `
      <img src="${recipe.photo || './assets/market.svg'}" alt="${recipe.title}" loading="lazy" width="720" height="480">
      <h3 style="margin:.5rem 0 0">${recipe.title}</h3>
      <p class="muted">${recipe.category} • ${recipe.minutes} min</p>
      <h4>Ingredients</h4>
      <ul>${ing}</ul>
      <h4>Steps</h4>
      <p>${recipe.steps}</p>
    `;
    if (typeof modal.showModal === 'function'){ modal.showModal(); } else { modal.setAttribute('open',''); }
    const closeOnBackdrop = (e) => {
      const rect = modal.getBoundingClientRect();
      const inside = e.clientX >= rect.left && e.clientX <= rect.right &&
                     e.clientY >= rect.top  && e.clientY <= rect.bottom;
      if (!inside) modal.close ? modal.close('backdrop') : modal.removeAttribute('open');
      modal.removeEventListener('click', closeOnBackdrop);
    };
    modal.addEventListener('click', closeOnBackdrop);
  }

  function applyFilters(){
    const qval = q('#search').value.trim().toLowerCase();
    const cat  = q('#category').value;
    let list   = loadAllRecipes();
    if (cat && cat !== 'all') list = list.filter(r => r.category === cat);
    if (qval) list = list.filter(r => r.title.toLowerCase().includes(qval) ||
                                      r.ingredients.join(',').toLowerCase().includes(qval));
    renderList(list);
    q('#results-note').textContent = `${list.length} recipe${list.length!==1?'s':''} found.`;
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (window.renderNav) window.renderNav();
    if (window.renderFooter) window.renderFooter();

    const list = loadAllRecipes();
    renderList(list);
    q('#results-note').textContent = `${list.length} recipes found.`;

    q('#filter-form').addEventListener('input', applyFilters);
    q('#clear').addEventListener('click', () => {
      q('#search').value = '';
      q('#category').value = 'all';
      applyFilters();
    });
  });
})();
