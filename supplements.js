/* ============================================
   CludyCart — Supplements Page Script
   ============================================ */

// ── Supplement Books (fallback) ──
const fallbackBooks = [
  {
    id: 'athletic-optimization',
    name: 'The Athlete\'s Guide to Supplements',
    author: 'Dr. Sarah Mitchell',
    category: 'supplements',
    categoryLabel: 'Supplements',
    desc: 'Evidence-based guide to sports nutrition. Creatine, protein, and beyond. No BS, just science.',
    price: 11.99,
    rating: 4.7,
    reviews: 3420,
    gradient: 'linear-gradient(135deg, #16a34a, #22c55e)',
    accent: '#bbf7d0',
    pages: 198,
    tag: 'New',
    date: '2024-04-01',
  },
  {
    id: 'nootropics-handbook',
    name: 'Nootropics Handbook',
    author: 'Dr. James Park',
    category: 'supplements',
    categoryLabel: 'Supplements',
    desc: 'Brain-boosting supplements explained. L-theanine, alpha-GPC, lion\'s mane, and 40+ compounds.',
    price: 13.49,
    rating: 4.8,
    reviews: 2870,
    gradient: 'linear-gradient(135deg, #7c3aed, #c084fc)',
    accent: '#e9d5ff',
    pages: 264,
    tag: 'Top Rated',
    date: '2024-03-15',
  },
  {
    id: 'vitamin-d-guide',
    name: 'Vitamin D: The Sunshine Vitamin',
    author: 'Dr. Lisa Chen',
    category: 'supplements',
    categoryLabel: 'Supplements',
    desc: 'Everything you need to know about vitamin D. Dosage, testing, deficiency, and optimal health.',
    price: 9.99,
    rating: 4.6,
    reviews: 4150,
    gradient: 'linear-gradient(135deg, #ea580c, #f97316)',
    accent: '#fed7aa',
    pages: 176,
    tag: null,
    date: '2024-02-20',
  },
  {
    id: 'omega3-deep-dive',
    name: 'Omega-3 Deep Dive',
    author: 'Dr. Michael Torres',
    category: 'supplements',
    categoryLabel: 'Supplements',
    desc: 'The science of fish oil, EPA/DHA, and inflammation. Which brands work, which don\'t.',
    price: 10.99,
    rating: 4.7,
    reviews: 2340,
    gradient: 'linear-gradient(135deg, #0284c7, #38bdf8)',
    accent: '#bae6fd',
    pages: 212,
    tag: null,
    date: '2024-01-10',
  },
];

// ── State ──
let supplementBooks = [...fallbackBooks];
let cart = [];

// ── Fetch from API ──
async function loadProducts() {
  try {
    const API_BASE = '/api';
    const response = await fetch(`${API_BASE}/products?category=supplements`);
    if (response.ok) {
      const products = await response.json();
      if (products.length > 0) {
        supplementBooks = products.map(p => ({
          id: p.id,
          name: p.name,
          author: p.author,
          category: p.category,
          categoryLabel: 'Supplements',
          desc: p.desc,
          price: parseFloat(p.price),
          rating: parseFloat(p.rating),
          reviews: p.reviews_count,
          gradient: p.gradient || 'linear-gradient(135deg, #16a34a, #22c55e)',
          accent: p.accent || '#bbf7d0',
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

  grid.innerHTML = supplementBooks.map((b, i) => `
    <div class="product-card" data-reveal style="--delay: ${i * 0.06}s">
      <div class="book-cover-wrapper">
        <div class="book-cover" style="background: ${b.gradient}">
          <div class="book-spine"></div>
          <div class="book-front">
            <span class="book-genre">${b.categoryLabel}</span>
            <span class="book-title-display">${b.name}</span>
            <span class="book-author-display">${b.author}</span>
            <div class="book-decoration">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="${b.accent}" stroke-width="1" opacity="0.4"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 6v6l4 2"/></svg>
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
    </div>
  `).join('');

  initReveals();
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
    setTimeout(() => {
      btnEl.textContent = 'Add to Cart';
      btnEl.classList.remove('added');
    }, 1500);
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
    body.innerHTML = `
      <div class="cart-empty">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" stroke-width="1.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
        <p>Your library is empty</p>
      </div>`;
    footer.style.display = 'none';
    return;
  }

  body.innerHTML = cart.map(c => `
    <div class="cart-item">
      <div class="cart-item-img" style="background: ${c.gradient || 'var(--bg-secondary)'}">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.5"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 6v6l4 2"/></svg>
      </div>
      <div class="cart-item-info">
        <span class="cart-item-name">${c.name}</span>
        <span class="cart-item-cat">${c.category || 'Supplement Guide'}</span>
        <div class="cart-item-bottom">
          <span class="cart-item-price">$${c.price * c.qty}</span>
          <button class="cart-item-remove" onclick="removeFromCart('${c.id}')">Remove</button>
        </div>
      </div>
    </div>
  `).join('');

  const total = cart.reduce((sum, c) => sum + c.price * c.qty, 0);
  document.getElementById('cartTotal').textContent = `$${total}`;
  document.getElementById('checkoutSubtotal').textContent = `$${total}`;
  document.getElementById('checkoutTotal').textContent = `$${total}`;
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

// ── Checkout Modal ──
function openCheckout() {
  closeCart();
  const total = cart.reduce((sum, c) => sum + c.price * c.qty, 0);
  document.getElementById('checkoutSubtotal').textContent = `$${total}`;
  document.getElementById('checkoutTotal').textContent = `$${total}`;
  document.getElementById('checkoutModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCheckout() {
  document.getElementById('checkoutModal').classList.remove('open');
  document.body.style.overflow = '';
}

function handleCheckout(e) {
  e.preventDefault();
  const btn = document.getElementById('checkoutBtn');
  btn.textContent = 'Processing...';
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = 'Payment Successful!';
    btn.style.background = 'var(--success)';
    cart = [];
    updateCartUI();
    showToast('Payment successful! Check your email for download links.');
    setTimeout(() => {
      closeCheckout();
      btn.textContent = 'Pay Now';
      btn.style.background = '';
      btn.disabled = false;
      document.querySelector('.checkout-form').reset();
    }, 2000);
  }, 1500);
}

// ── Mobile Menu ──
function closeMobile() {
  document.getElementById('hamburger').classList.remove('active');
  document.getElementById('mobileMenu').classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('hamburger').addEventListener('click', () => {
  const isOpen = document.getElementById('mobileMenu').classList.contains('open');
  if (isOpen) {
    closeMobile();
  } else {
    document.getElementById('hamburger').classList.add('active');
    document.getElementById('mobileMenu').classList.add('open');
    document.body.style.overflow = 'hidden';
  }
});

// ── Cart Button ──
document.getElementById('cartBtn').addEventListener('click', openCart);

// ── Nav Scroll ──
window.addEventListener('scroll', () => {
  document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 10);
});

// ── Newsletter ──
function handleSubscribe(e) {
  e.preventDefault();
  showToast('You\'re subscribed! Check your inbox for a welcome gift.');
  e.target.reset();
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
    document.querySelectorAll('[data-reveal]').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  // Hero content
  gsap.fromTo('.collection-hero-content', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.2 });

  // Product cards stagger
  const cards = document.querySelectorAll('.product-card');
  cards.forEach((card, i) => {
    gsap.fromTo(card, {
      opacity: 0,
      y: 24,
    }, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      delay: i * 0.08,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 90%',
        once: true,
      },
    });
  });

  // Newsletter
  const nlCard = document.querySelector('.newsletter-card');
  if (nlCard) {
    gsap.fromTo(nlCard, { opacity: 0, y: 24 }, {
      opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
      scrollTrigger: { trigger: nlCard, start: 'top 90%', once: true },
    });
  }
}

// ── Initialize ──
document.addEventListener('DOMContentLoaded', () => {
  loadProducts();
  renderBooks();
  if (typeof gsap !== 'undefined') {
    initReveals();
  } else {
    window.addEventListener('load', initReveals);
  }
});
