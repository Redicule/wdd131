// review.js — show querystring summary and increment localStorage counter
import { products } from './products.js';

const params = new URLSearchParams(window.location.search);

// Build a human-friendly summary
const product = params.get('product') || '(none)';
const rating = params.get('rating') || '(none)';
const installDate = params.get('installDate') || '(none)';
const features = params.getAll('features'); // multiple
const reviewText = params.get('reviewText') || '';
const username = params.get('username') || 'Anonymous';

// Map product id to name using the same array for display only
const prodName = (products.find(p => p.id === product) || {}).name || product;

const summary = document.getElementById('summary');
if (summary) {
  summary.innerHTML = `
    <strong>${username}</strong>, thanks for reviewing <em>${prodName}</em>.<br>
    <strong>Rating:</strong> ${rating} / 5<br>
    <strong>Installed:</strong> ${installDate}<br>
    <strong>Features selected:</strong> ${features.length ? features.join(', ') : 'none'}<br>
    ${reviewText ? `<strong>Your notes:</strong> ${reviewText}` : ''}
  `;
}

// Increment localStorage counter
const KEY = 'w05-review-count';
const current = Number(localStorage.getItem(KEY) || 0) + 1;
localStorage.setItem(KEY, String(current));

const output = document.getElementById('reviewCount');
if (output) output.textContent = String(current);
