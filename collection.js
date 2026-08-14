/* ============================================
   CludyCart — Collection Page Script
   ============================================ */

// ── Book Data (fallback if API unavailable) ──
const fallbackBooks = [
  {
    id: 'lean-startup', name: 'The Lean Startup', author: 'Eric Ries', category: 'business',
    categoryLabel: 'Business', desc: 'How constant innovation creates radically successful businesses.', price: 12.99,
    rating: 4.9, reviews: 12480, gradient: 'linear-gradient(135deg, #1e293b, #475569)',
    accent: '#f59e0b', pages: 336, tag: 'Best Seller', date: '2024-01-15',
  },
  {
    id: 'atomic-habits', name: 'Atomic Habits', author: 'James Clear', category: 'psychology',
    categoryLabel: 'Psychology', desc: 'An easy and proven way to build good habits and break bad ones.', price: 14.99,
    rating: 4.9, reviews: 18920, gradient: 'linear-gradient(135deg, #7c3aed, #a855f7)',
    accent: '#c4b5fd', pages: 320, tag: 'Top Rated', date: '2024-02-10',
  },
  {
    id: 'clean-code', name: 'Clean Code', author: 'Robert C. Martin', category: 'tech',
    categoryLabel: 'Technology', desc: 'A handbook of agile software craftsmanship.', price: 16.99,
    rating: 4.8, reviews: 8740, gradient: 'linear-gradient(135deg, #0891b2, #06b6d4)',
    accent: '#67e8f9', pages: 464, tag: null, date: '2023-09-20',
  },
  {
    id: 'thinking-fast-slow', name: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', category: 'psychology',
    categoryLabel: 'Psychology', desc: 'Nobel laureate reveals how two systems drive the way we think.', price: 13.99,
    rating: 4.8, reviews: 11200, gradient: 'linear-gradient(135deg, #1e3a5f, #2563eb)',
    accent: '#93c5fd', pages: 499, tag: null, date: '2023-09-05',
  },
  {
    id: 'dont-make-me-think', name: "Don't Make Me Think", author: 'Steve Krug', category: 'design',
    categoryLabel: 'Design', desc: 'A common sense approach to web usability.', price: 11.99,
    rating: 4.7, reviews: 6340, gradient: 'linear-gradient(135deg, #b45309, #d97706)',
    accent: '#fde68a', pages: 216, tag: null, date: '2024-03-01',
  },
  {
    id: 'zero-to-one', name: 'Zero to One', author: 'Peter Thiel', category: 'business',
    categoryLabel: 'Business', desc: 'Notes on startups, or how to build the future.', price: 15.99,
    rating: 4.7, reviews: 9580, gradient: 'linear-gradient(135deg, #0f172a, #334155)',
    accent: '#e2e8f0', pages: 224, tag: null, date: '2023-12-10',
  },
  {
    id: 'design-of-everyday', name: 'The Design of Everyday Things', author: 'Don Norman', category: 'design',
    categoryLabel: 'Design', desc: 'The ultimate guide to human-centered design.', price: 13.49,
    rating: 4.8, reviews: 7210, gradient: 'linear-gradient(135deg, #dc2626, #ef4444)',
    accent: '#fecaca', pages: 368, tag: 'Classic', date: '2023-08-15',
  },
  {
    id: 'psychology-money', name: 'The Psychology of Money', author: 'Morgan Housel', category: 'finance',
    categoryLabel: 'Finance', desc: 'Timeless lessons on wealth, greed, and happiness.', price: 12.49,
    rating: 4.9, reviews: 15670, gradient: 'linear-gradient(135deg, #065f46, #059669)',
    accent: '#a7f3d0', pages: 256, tag: 'Best Seller', date: '2024-01-25',
  },
  {
    id: 'pragmatic-programmer', name: 'The Pragmatic Programmer', author: 'David Thomas & Andrew Hunt', category: 'tech',
    categoryLabel: 'Technology', desc: 'Your journey to mastery. The classic guide to software craft.', price: 17.99,
    rating: 4.8, reviews: 5890, gradient: 'linear-gradient(135deg, #4338ca, #6366f1)',
    accent: '#c7d2fe', pages: 352, tag: null, date: '2023-10-18',
  },
  {
    id: 'athletic-optimization', name: "The Athlete's Guide to Supplements", author: 'Dr. Sarah Mitchell', category: 'supplements',
    categoryLabel: 'Supplements', desc: 'Evidence-based guide to sports nutrition.', price: 11.99,
    rating: 4.7, reviews: 3420, gradient: 'linear-gradient(135deg, #16a34a, #22c55e)',
    accent: '#bbf7d0', pages: 198, tag: 'New', date: '2024-04-01',
  },
  {
    id: 'nootropics-handbook', name: 'Nootropics Handbook', author: 'Dr. James Park', category: 'supplements',
    categoryLabel: 'Supplements', desc: 'Brain-boosting supplements explained.', price: 13.49,
    rating: 4.8, reviews: 2870, gradient: 'linear-gradient(135deg, #7c3aed, #c084fc)',
    accent: '#e9d5ff', pages: 264, tag: 'Top Rated', date: '2024-03-15',
  },
  {
    id: 'seo-in-2025', name: 'SEO in 2025', author: 'Anika Patel', category: 'marketing',
    categoryLabel: 'Marketing', desc: 'Search engine optimization that still works.', price: 8.49,
    rating: 4.6, reviews: 4120, gradient: 'linear-gradient(135deg, #dc2626, #f87171)',
    accent: '#fecaca', pages: 168, tag: null, date: '2024-02-15',
  },
];

// ── State ──
let allBooks = [...fallbackBooks];
let cart = [];
let currentFilter = 'all';
let currentSort = 'featured';
let currentView = 'grid';

// ── Fetch from API ──
async function loadProducts() {
  try {
    const API_BASE = '/api';
    const response = await fetch(`${API_BASE}/products`);
    if (response.ok) {
      const products = await response.json();
      if (products.length > 0) {
        allBooks = products.map(p => ({
          id: p.id,
          name: p.name,
          author: p.author,
          category: p.category,
          categoryLabel: p.category.charAt(0).toUpperCase() + p.category.slice(1),
          desc: p.desc,
          price: parseFloat(p.price),
          rating: parseFloat(p.rating),
          reviews: p.reviews_count,
          gradient: p.gradient || 'linear-gradient(135deg, #1e40af, #3b82f6)',
          accent: p.accent || '#bfdbfe',
          pages: p.pages,
          tag: p.tag,
          date: p.created_at,
        }));
        renderBooks();
      }
    }
  } catch (e) {
    console.log('API not available, using fallback data');
  }
}

// ── Render Books ──
function renderBooks() {
  const grid = document.getElementById('productGrid');
  const empty = document.getElementById('collectionEmpty');
  let filtered = currentFilter === 'all' ? [...allBooks] : allBooks.filter(b => b.category === currentFilter);

  switch (currentSort) {
    case 'newest': filtered.sort((a, b) => new Date(b.date) - new Date(a.date)); break;
    case 'price-low': filtered.sort((a, b) => a.price - b.price); break;
    case 'price-high': filtered.sort((a, b) => b.price - a.price); break;
    case 'rating': filtered.sort((a, b) => b.rating - a.rating); break;
    case 'popular': filtered.sort((a, b) => b.reviews - a.reviews); break;
  }

  document.getElementById('resultCount').textContent = `Showing ${filtered.length} book${filtered.length !== 1 ? 's' : ''}`;
  document.getElementById('totalBooks').textContent = allBooks.length;

  if (filtered.length === 0) {
    grid.style.display = 'none';
    if (empty) empty.style.display = 'flex';
    return;
  }

  grid.style.display = '';
  if (empty) empty.style.display = 'none';
  grid.className = `product-grid ${currentView === 'list' ? 'product-grid-list' : ''}`;

  grid.innerHTML = filtered.map((b, i) => `
    <div class="product-card" data-reveal style="--delay: ${i * 0.04}s" data-category="${b.category}">
      ${currentView === 'grid' ? `
        <div class="book-cover-wrapper">
          <div class="book-cover" style="background: ${b.gradient}">
            <div class="book-spine"></div>
            <div class="book-front">
              <span class="book-genre">${b.categoryLabel}</span>
              <span class="book-title-display">${b.name}</span>
              <span class="book-author-display">${b.author}</span>
              <div class="book-decoration">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="${b.accent}" stroke-width="1" opacity="0.4"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
              </div>
            </div>
          </div>
          ${b.tag ? `<span class="product-tag">${b.tag}</span>` : ''}
        </div>
        <div class="product-info">
          <span class="product-category">${b.categoryLabel} &middot; ${b.pages} pages</span>
          <h3 class="product-name">${b.name}</h3>
          <p class="product-author">by ${b.author}</p>
          <p class="product-desc">${b.desc}</p>
          <div class="product-footer">
            <span class="product-price">$${b.price}</span>
            <span class="product-rating">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--accent)"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              ${b.rating} (${b.reviews.toLocaleString()})
            </span>
          </div>
          <button class="product-add-btn" onclick="addToCart({id:'${b.id}',name:'${b.name.replace(/'/g, "\\'")}',price:${b.price},gradient:'${b.gradient}',category:'${b.categoryLabel}'}, this)">
            Add to Cart
          </button>
        </div>
      ` : `
        <div class="list-item">
          <div class="list-item-cover">
            <div class="book-cover" style="background: ${b.gradient}; width: 80px; height: 112px;">
              <div class="book-spine"></div>
              <div class="book-front">
                <span class="book-genre" style="font-size:6px;">${b.categoryLabel}</span>
                <span class="book-title-display" style="font-size:10px;">${b.name}</span>
                <span class="book-author-display" style="font-size:7px;">${b.author}</span>
              </div>
            </div>
          </div>
          <div class="list-item-info">
            <div class="list-item-top">
              <div>
                <span class="product-category">${b.categoryLabel} &middot; ${b.pages} pages</span>
                <h3 class="product-name">${b.name}</h3>
                <p class="product-author">by ${b.author}</p>
              </div>
              <span class="product-price">$${b.price}</span>
            </div>
            <p class="product-desc">${b.desc}</p>
            <div class="list-item-bottom">
              <span class="product-rating">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--accent)"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                ${b.rating} (${b.reviews.toLocaleString()})
              </span>
              <button class="product-add-btn" onclick="addToCart({id:'${b.id}',name:'${b.name.replace(/'/g, "\\'")}',price:${b.price},gradient:'${b.gradient}',category:'${b.categoryLabel}'}, this)">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      `}
    </div>
  `).join('');

  initReveals();
}

// ── Filter & Sort ──
function handleFilter(filter) {
  currentFilter = filter;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  document.querySelector(`.filter-btn[data-filter="${filter}"]`).classList.add('active');
  renderBooks();
}

function handleSort(sort) {
  currentSort = sort;
  renderBooks();
}

function setView(view) {
  currentView = view;
  document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
  document.querySelector(`.view-btn[data-view="${view}"]`).classList.add('active');
  renderBooks();
}

// ── Cart Functions ──
function addToCart(item, btnEl) {
  const existing = cart.find(c => c.id === item.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...item, qty: 1 });
  }
  updateCartUI();
  showToast(`${item.name} added to cart`);
  if (btnEl) {
    btnEl.textContent = 'Added!';
    btnEl.classList.add('added');
    setTimeout(() => { btnEl.textContent = 'Add to Cart'; btnEl.classList.remove('added'); }, 1500);
  }
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  updateCartUI();
  renderCartItems();
}

function updateCartUI() {
  const count = cart.reduce((sum, c) => sum + c.qty, 0);
  const countEl = document.getElementById('cartCount');
  countEl.textContent = count;
  countEl.classList.toggle('visible', count > 0);
}

function renderCartItems() {
  const body = document.getElementById('cartBody');
  const footer = document.getElementById('cartFooter');
  if (cart.length === 0) {
    body.innerHTML = `<div class="cart-empty"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" stroke-width="1.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg><p>Your library is empty</p></div>`;
    footer.style.display = 'none';
    return;
  }
  body.innerHTML = cart.map(c => `
    <div class="cart-item">
      <div class="cart-item-img" style="background: ${c.gradient || 'var(--bg-secondary)'}">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.5"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
      </div>
      <div class="cart-item-info">
        <span class="cart-item-name">${c.name}</span>
        <span class="cart-item-cat">${c.category || 'Digital Product'}</span>
        <div class="cart-item-bottom">
          <span class="cart-item-price">$${c.price * c.qty}</span>
          <button class="cart-item-remove" onclick="removeFromCart('${c.id}')">Remove</button>
        </div>
      </div>
    </div>
  `).join('');
  const total = cart.reduce((sum, c) => sum + c.price * c.qty, 0);
  document.getElementById('cartTotal').textContent = `$${total}`;
  footer.style.display = 'block';
}

function openCart() {
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('cartOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  renderCartItems();
}

function closeCart() {
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

function openCheckout() { closeCart(); document.getElementById('checkoutModal').classList.add('open'); document.body.style.overflow = 'hidden'; }
function closeCheckout() { document.getElementById('checkoutModal').classList.remove('open'); document.body.style.overflow = ''; }

function handleCheckout(e) {
  e.preventDefault();
  showToast('Payment successful! Check your email for download links.');
  cart = [];
  updateCartUI();
  closeCheckout();
  e.target.reset();
}

function handleSubscribe(e) {
  e.preventDefault();
  showToast("You're subscribed! Check your inbox for a welcome gift.");
  e.target.reset();
}

function closeMobile() {
  document.getElementById('hamburger').classList.remove('active');
  document.getElementById('mobileMenu').classList.remove('open');
  document.body.style.overflow = '';
}

// ── Toast ──
let toastTimeout;
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove('show'), 3000);
}

// ── GSAP Animations ──
function initReveals() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    document.querySelectorAll('[data-reveal]').forEach(el => { el.style.opacity = '1'; el.style.transform = 'none'; });
    return;
  }
  gsap.fromTo('.collection-hero-content', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.2 });
  gsap.fromTo('.toolbar-row', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', delay: 0.4 });
  const cards = document.querySelectorAll('.product-card');
  cards.forEach((card, i) => {
    gsap.fromTo(card, { opacity: 0, y: 24 }, {
      opacity: 1, y: 0, duration: 0.5, delay: i * 0.04, ease: 'power2.out',
      scrollTrigger: { trigger: card, start: 'top 92%', once: true },
    });
  });
  document.querySelectorAll('[data-reveal]').forEach(el => {
    if (el.closest('.collection-hero') || el.closest('.collection-toolbar')) return;
    gsap.fromTo(el, { opacity: 0, y: 24 }, {
      opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });
}

// ── Initialize ──
document.addEventListener('DOMContentLoaded', () => {
  loadProducts();
  renderBooks();

  // Sidebar filter clicks
  document.querySelectorAll('.sidebar-link').forEach(link => {
    link.addEventListener('click', () => {
      document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      handleFilter(link.dataset.filter);
    });
  });

  if (typeof gsap !== 'undefined') {
    initReveals();
  } else {
    window.addEventListener('load', initReveals);
  }
});
