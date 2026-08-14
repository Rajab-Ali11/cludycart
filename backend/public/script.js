/* ============================================
   CludyCart — Main Script
   ============================================ */

// ── Book Data ──
const products = [
  {
    id: 'lean-startup',
    name: 'The Lean Startup',
    author: 'Eric Ries',
    category: 'tech',
    categoryLabel: 'Technology',
    desc: 'How constant innovation creates radically successful businesses. The definitive guide for entrepreneurs.',
    price: 12.99,
    rating: 4.9,
    reviews: 12480,
    gradient: 'linear-gradient(135deg, #1e293b, #475569)',
    accent: '#f59e0b',
    pages: 336,
    tag: 'Best Seller',
  },
  {
    id: 'atomic-habits',
    name: 'Atomic Habits',
    author: 'James Clear',
    category: 'psychology',
    categoryLabel: 'Psychology',
    desc: 'An easy and proven way to build good habits and break bad ones. Tiny changes, remarkable results.',
    price: 14.99,
    rating: 4.9,
    reviews: 18920,
    gradient: 'linear-gradient(135deg, #7c3aed, #a855f7)',
    accent: '#c4b5fd',
    pages: 320,
    tag: 'Top Rated',
  },
  {
    id: 'clean-code',
    name: 'Clean Code',
    author: 'Robert C. Martin',
    category: 'tech',
    categoryLabel: 'Technology',
    desc: 'A handbook of agile software craftsmanship. Write code that humans can understand.',
    price: 16.99,
    rating: 4.8,
    reviews: 8740,
    gradient: 'linear-gradient(135deg, #0891b2, #06b6d4)',
    accent: '#67e8f9',
    pages: 464,
    tag: null,
  },
  {
    id: 'thinking-fast-slow',
    name: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    category: 'psychology',
    categoryLabel: 'Psychology',
    desc: 'Nobel laureate reveals how two systems drive the way we think. A masterclass in decision-making.',
    price: 13.99,
    rating: 4.8,
    reviews: 11200,
    gradient: 'linear-gradient(135deg, #1e3a5f, #2563eb)',
    accent: '#93c5fd',
    pages: 499,
    tag: null,
  },
  {
    id: 'dont-make-me-think',
    name: 'Don\'t Make Me Think',
    author: 'Steve Krug',
    category: 'design',
    categoryLabel: 'Design',
    desc: 'A common sense approach to web usability. The essential guide for UX designers.',
    price: 11.99,
    rating: 4.7,
    reviews: 6340,
    gradient: 'linear-gradient(135deg, #b45309, #d97706)',
    accent: '#fde68a',
    pages: 216,
    tag: null,
  },
  {
    id: 'zero-to-one',
    name: 'Zero to One',
    author: 'Peter Thiel',
    category: 'business',
    categoryLabel: 'Business',
    desc: 'Notes on startups, or how to build the future. Contrarian thinking for the next generation.',
    price: 15.99,
    rating: 4.7,
    reviews: 9580,
    gradient: 'linear-gradient(135deg, #0f172a, #334155)',
    accent: '#e2e8f0',
    pages: 224,
    tag: null,
  },
  {
    id: 'design-of-everyday',
    name: 'The Design of Everyday Things',
    author: 'Don Norman',
    category: 'design',
    categoryLabel: 'Design',
    desc: 'Revised and expanded edition. The ultimate guide to human-centered design.',
    price: 13.49,
    rating: 4.8,
    reviews: 7210,
    gradient: 'linear-gradient(135deg, #dc2626, #ef4444)',
    accent: '#fecaca',
    pages: 368,
    tag: 'Classic',
  },
  {
    id: 'psychology-money',
    name: 'The Psychology of Money',
    author: 'Morgan Housel',
    category: 'finance',
    categoryLabel: 'Finance',
    desc: 'Timeless lessons on wealth, greed, and happiness. 19 short stories about money.',
    price: 12.49,
    rating: 4.9,
    reviews: 15670,
    gradient: 'linear-gradient(135deg, #065f46, #059669)',
    accent: '#a7f3d0',
    pages: 256,
    tag: 'Best Seller',
  },
  {
    id: 'pragmatic-programmer',
    name: 'The Pragmatic Programmer',
    author: 'David Thomas & Andrew Hunt',
    category: 'tech',
    categoryLabel: 'Technology',
    desc: 'Your journey to mastery. 20th anniversary edition of the classic guide to software craft.',
    price: 17.99,
    rating: 4.8,
    reviews: 5890,
    gradient: 'linear-gradient(135deg, #4338ca, #6366f1)',
    accent: '#c7d2fe',
    pages: 352,
    tag: null,
  },
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
    tag: null,
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
  },
];

// ── Cart State ──
let cart = [];

// ── Render Books ──
function renderProducts(filter = 'all') {
  const grid = document.getElementById('productGrid');
  const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);

  grid.innerHTML = filtered.map((p, i) => `
    <div class="product-card" data-reveal style="--delay: ${i * 0.05}s" data-category="${p.category}">
      <div class="book-cover-wrapper">
        <div class="book-cover" style="background: ${p.gradient}">
          <div class="book-spine"></div>
          <div class="book-front">
            <span class="book-genre">${p.categoryLabel}</span>
            <span class="book-title-display">${p.name}</span>
            <span class="book-author-display">${p.author}</span>
            <div class="book-decoration">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="${p.accent}" stroke-width="1" opacity="0.4"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
            </div>
          </div>
        </div>
        ${p.tag ? `<span class="product-tag">${p.tag}</span>` : ''}
      </div>
      <div class="product-info">
        <span class="product-category">${p.categoryLabel} &middot; ${p.pages} pages</span>
        <h3 class="product-name">${p.name}</h3>
        <p class="product-author">by ${p.author}</p>
        <p class="product-desc">${p.desc}</p>
        <div class="product-footer">
          <span class="product-price">$${p.price}</span>
          <span class="product-rating">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--accent)"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            ${p.rating} (${p.reviews.toLocaleString()})
          </span>
        </div>
        <button class="product-add-btn" onclick="addToCart({id:'${p.id}',name:'${p.name.replace(/'/g, "\\'")}',price:${p.price},gradient:'${p.gradient}',category:'${p.categoryLabel}'}, this)">
          Add to Cart
        </button>
      </div>
    </div>
  `).join('');

  // Re-init reveals for new elements
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

// ── Filters ──
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProducts(btn.dataset.filter);
  });
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

// ── Scroll to Books ──
function scrollToBooks() {
  document.getElementById('books').scrollIntoView({ behavior: 'smooth' });
}

// ── Scroll to Genres ──
function scrollToGenres() {
  document.getElementById('genres').scrollIntoView({ behavior: 'smooth' });
}

// ── GSAP Animations ──
function initReveals() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  // Check reduced motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    document.querySelectorAll('[data-reveal]').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  // Hero content timeline
  const heroTimeline = gsap.timeline({ delay: 0.2 });
  heroTimeline
    .fromTo('.hero .badge', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
    .fromTo('.hero h1', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.35')
    .fromTo('.hero-sub', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.35')
    .fromTo('.hero-cta', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.3')
    .fromTo('.hero-social-proof', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.25')
    .fromTo('.hero-visual', { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6');

  // Hero 3D scene entrance
  gsap.fromTo('.hero-book-main', {
    opacity: 0,
    rotateY: -40,
    x: 60,
  }, {
    opacity: 1,
    rotateY: -15,
    x: 0,
    duration: 1,
    ease: 'power3.out',
    delay: 0.5,
  });

  gsap.fromTo('.hero-book-back', {
    opacity: 0,
    rotateY: -50,
    x: 80,
  }, {
    opacity: 0.85,
    rotateY: -20,
    x: 0,
    duration: 1,
    ease: 'power3.out',
    delay: 0.65,
  });

  gsap.fromTo('.hero-bottle', {
    opacity: 0,
    y: 40,
    scale: 0.9,
  }, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.8,
    ease: 'back.out(1.5)',
    delay: 0.8,
  });

  // Floating elements
  gsap.fromTo('.hero-float', {
    opacity: 0,
    scale: 0,
  }, {
    opacity: 1,
    scale: 1,
    duration: 0.5,
    ease: 'back.out(2)',
    stagger: 0.1,
    delay: 1,
  });

  // Hero shape pulse
  gsap.to('.hero-shape-1', {
    scale: 1.1,
    opacity: 0.5,
    duration: 4,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
  });

  gsap.to('.hero-shape-2', {
    scale: 1.15,
    opacity: 0.3,
    duration: 5,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
    delay: 1,
  });

  // Scroll-triggered reveals
  const reveals = document.querySelectorAll('[data-reveal]');
  reveals.forEach((el) => {
    // Skip hero elements (handled above)
    if (el.closest('.hero')) return;

    gsap.fromTo(el, {
      opacity: 0,
      y: 32,
    }, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        once: true,
      },
    });
  });

  // Product cards stagger
  const productCards = document.querySelectorAll('.product-card');
  productCards.forEach((card, i) => {
    gsap.fromTo(card, {
      opacity: 0,
      y: 24,
    }, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      delay: i * 0.06,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 90%',
        once: true,
      },
    });
  });

  // Feature cards
  const featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach((card, i) => {
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

  // Testimonial cards
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  testimonialCards.forEach((card, i) => {
    gsap.fromTo(card, {
      opacity: 0,
      y: 24,
    }, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      delay: i * 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 90%',
        once: true,
      },
    });
  });

  // Trusted logos
  gsap.fromTo('.logo-item', {
    opacity: 0,
    y: 16,
  }, {
    opacity: 0.5,
    y: 0,
    duration: 0.5,
    stagger: 0.08,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.trusted',
      start: 'top 90%',
      once: true,
    },
  });

  // CTA float cards
  gsap.fromTo('.cta-float-card', {
    opacity: 0,
    y: 20,
    scale: 0.95,
  }, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.6,
    stagger: 0.12,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.cta-visual',
      start: 'top 80%',
      once: true,
    },
  });

  // Float card perpetual motion
  gsap.to('.cta-float-1', {
    y: -8,
    duration: 2.5,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
  });

  gsap.to('.cta-float-2', {
    y: -6,
    duration: 3,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
    delay: 0.5,
  });

  gsap.to('.cta-float-3', {
    y: -10,
    duration: 2.8,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
    delay: 1,
  });

  // Hero book hover magnetic effect
  document.querySelectorAll('.hero-book').forEach(book => {
    book.addEventListener('mousemove', (e) => {
      const rect = book.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(book, {
        rotateY: -15 + x * 0.05,
        rotateX: 5 + y * -0.05,
        duration: 0.4,
        ease: 'power2.out',
      });
    });

    book.addEventListener('mouseleave', () => {
      gsap.to(book, {
        rotateY: book.classList.contains('hero-book-main') ? -15 : -20,
        rotateX: 5,
        duration: 0.6,
        ease: 'elastic.out(1, 0.5)',
      });
    });
  });
}

// ── Initialize ──
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();

  // Wait for GSAP to load
  if (typeof gsap !== 'undefined') {
    initReveals();
  } else {
    window.addEventListener('load', initReveals);
  }
});
