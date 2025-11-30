/* plant.js
   Ajoute : modal, dark mode, mini-cart, slider, animations.
   Conçu pour ton HTML/CSS existants.
*/

/* -------------------------
   Helpers
------------------------- */
const qs = (s, el = document) => el.querySelector(s);
const qsa = (s, el = document) => Array.from(el.querySelectorAll(s));

/* -------------------------
   1) DARK MODE (toggle + persistance)
------------------------- */
(function setupDarkMode() {
    const header = qs('.tout');
    if (!header) return;

    const btn = document.createElement('button');
    btn.id = 'darkModeToggle';
    btn.setAttribute('aria-label', 'Toggle dark mode');
    btn.textContent = '🌙';
    btn.style.marginLeft = '12px';
    btn.style.padding = '8px';
    btn.style.borderRadius = '8px';
    btn.style.border = 'none';
    btn.style.cursor = 'pointer';
    header.appendChild(btn);

    const apply = (isDark) => {
        document.body.classList.toggle('dark-mode', isDark);
        btn.textContent = isDark ? '☀️' : '🌙';
    };

    const saved = localStorage.getItem('hortia_dark_mode');
    apply(saved === '1');

    btn.addEventListener('click', () => {
        const isDark = !document.body.classList.contains('dark-mode');
        apply(isDark);
        localStorage.setItem('hortia_dark_mode', isDark ? '1' : '0');
    });
})();

/* -------------------------
   2) Modal moderne (pour "Learn how to take care a plant")
------------------------- */
(function setupModal() {
    const modalHtml = `
    <div id="hortiaModal" class="hortia-modal hidden" role="dialog" aria-hidden="true">
      <div class="hortia-modal-backdrop"></div>
      <div class="hortia-modal-panel" role="document">
        <button class="hortia-close" aria-label="Fermer">✕</button>
        <h2>Comment prendre soin d'une plante</h2>
        <ul>
          <li>Arrose 1–2 fois par semaine (selon le pot).</li>
          <li>Évite le soleil direct prolongé.</li>
          <li>Vérifie la terre : humide mais pas détrempée.</li>
          <li>Fais tourner la plante pour une pousse uniforme.</li>
        </ul>
        <div class="hortia-modal-actions">
          <button class="hortia-ok">Compris</button>
        </div>
      </div>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    const modal = qs('#hortiaModal');
    const openTriggers = qsa('.learn-info'); // ton texte "Learn how..."
    const closeBtns = qsa('.hortia-close, .hortia-ok', modal);

    function openModal() {
        modal.classList.remove('hidden');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }
    function closeModal() {
        modal.classList.add('hidden');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    openTriggers.forEach(t => t.addEventListener('click', openModal));
    closeBtns.forEach(b => b.addEventListener('click', closeModal));
    qs('.hortia-modal-backdrop', modal).addEventListener('click', closeModal);
})();

/* -------------------------
   3) MINI-CART (panier simple, stockage local)
------------------------- */
(function setupCart() {
    const cartHtml = `
    <aside id="hortiaCart" class="hortia-cart hidden" aria-hidden="true">
      <header>
        <h3>Panier</h3>
        <button id="hortiaCartClose" aria-label="Fermer">✕</button>
      </header>
      <ul class="hortia-cart-items"></ul>
      <div class="hortia-cart-footer">
        <div class="hortia-cart-total">Total: 0 €</div>
        <button class="hortia-checkout">Commander</button>
      </div>
    </aside>`;
    document.body.insertAdjacentHTML('beforeend', cartHtml);

    const cart = qs('#hortiaCart');
    const cartItemsList = qs('.hortia-cart-items', cart);
    const cartTotal = qs('.hortia-cart-total', cart);
    const checkoutBtn = qs('.hortia-checkout', cart);
    const cartClose = qs('#hortiaCartClose', cart);

    const iconEls = qsa('.icone');
    const cartIcon = iconEls.length >= 2 ? iconEls[1] : null;

    function currentProduct() {
        const title = qs('.phrase_principale')?.innerText?.split('\n')[0] || 'Plante';
        return { id: 'plant-1', title: title, price: 29.99 };
    }

    let state = JSON.parse(localStorage.getItem('hortia_cart') || '[]');

    function save() { localStorage.setItem('hortia_cart', JSON.stringify(state)); }
    function calcTotal() { return state.reduce((s, it) => s + it.price * it.qty, 0); }
    function renderCart() {
        cartItemsList.innerHTML = '';
        if (state.length === 0) {
            cartItemsList.innerHTML = '<li class="empty">Ton panier est vide</li>';
        } else {
            state.forEach(item => {
                const li = document.createElement('li');
                li.className = 'hortia-cart-item';
                li.innerHTML = `
                  <div class="left">
                    <div class="name">${item.title}</div>
                    <div class="meta">${item.qty} × ${item.price.toFixed(2)} €</div>
                  </div>
                  <div class="right">
                    <button class="hortia-inc" data-id="${item.id}">+</button>
                    <button class="hortia-dec" data-id="${item.id}">−</button>
                    <button class="hortia-rem" data-id="${item.id}">Suppr</button>
                  </div>
                `;
                cartItemsList.appendChild(li);
            });
        }
        cartTotal.textContent = `Total: ${calcTotal().toFixed(2)} €`;
    }

    function addToCart(product) {
        const found = state.find(i => i.id === product.id);
        if (found) found.qty += 1;
        else state.push({ ...product, qty: 1 });
        save();
        renderCart();
        showCart();
        showToast('Produit ajouté au panier');
    }

    function showCart() {
        cart.classList.remove('hidden');
        cart.setAttribute('aria-hidden', 'false');
    }
    function hideCart() {
        cart.classList.add('hidden');
        cart.setAttribute('aria-hidden', 'true');
    }

    cartClose.addEventListener('click', hideCart);
    if (cartIcon) cartIcon.addEventListener('click', () => {
        cart.classList.toggle('hidden');
        cart.setAttribute('aria-hidden', cart.classList.contains('hidden') ? 'true' : 'false');
    });

    cartItemsList.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        if (!id) return;
        const idx = state.findIndex(i => i.id === id);
        if (e.target.classList.contains('hortia-inc')) {
            state[idx].qty++;
        } else if (e.target.classList.contains('hortia-dec')) {
            state[idx].qty = Math.max(1, state[idx].qty - 1);
        } else if (e.target.classList.contains('hortia-rem')) {
            state.splice(idx, 1);
        }
        save();
        renderCart();
    });

    checkoutBtn.addEventListener('click', () => {
        if (state.length === 0) { showToast("Panier vide"); return; }
        state = [];
        save();
        renderCart();
        showToast("c'est dohi, c'est dohi même!!!!");
        hideCart();
    });

    const buyBtn = qs('.button');
    if (buyBtn) {
        buyBtn.addEventListener('click', () => {
            addToCart(currentProduct());
        });
    }

    renderCart();
})();

/* -------------------------
   4) SLIDER / CARROUSEL (zone image)
------------------------- */
(function setupSlider() {
    const oldImg = qs('.imageill');
    if (!oldImg) return;

    const src = oldImg.src;
    const slides = [src, src, src];

    const slider = document.createElement('div');
    slider.className = 'hortia-slider';
    slider.innerHTML = `
      <div class="hortia-slider-track">
        ${slides.map(s => `<div class="hortia-slide"><img src="${s}" alt="plante"></div>`).join('')}
      </div>
      <div class="hortia-slider-controls">
        <button class="hortia-prev" aria-label="Précédent">‹</button>
        <button class="hortia-next" aria-label="Suivant">›</button>
      </div>
    `;
    oldImg.replaceWith(slider);

    const track = qs('.hortia-slider-track', slider);
    const slideEls = qsa('.hortia-slide', slider);
    let index = 0;
    let animTimer = null;

    function showIndex(i) {
        index = (i + slideEls.length) % slideEls.length;
        track.style.transform = `translateX(-${index * 100}%)`;
    }

    qs('.hortia-next', slider).addEventListener('click', () => { showIndex(index + 1); resetAuto(); });
    qs('.hortia-prev', slider).addEventListener('click', () => { showIndex(index - 1); resetAuto(); });

    function auto() {
        animTimer = setInterval(() => showIndex(index + 1), 4000);
    }
    function resetAuto() {
        if (animTimer) clearInterval(animTimer);
        auto();
    }
    showIndex(0);
    auto();
})();

/* -------------------------
   5) Animations & interactions légères
------------------------- */
(function setupInteractions() {
    qsa('.elmenu').forEach(it => {
        it.addEventListener('mouseover', () => it.classList.add('hortia-menu-hover'));
        it.addEventListener('mouseout', () => it.classList.remove('hortia-menu-hover'));
    });

    const title = qs('.phrase_principale');
    if (title) {
        title.style.opacity = 0;
        title.style.transform = 'translateY(20px)';
        title.style.transition = 'all 600ms ease';
        window.addEventListener('load', () => {
            setTimeout(() => { title.style.opacity = 1; title.style.transform = 'translateY(0)'; }, 80);
        });
    }

    window.showToast = function (msg) {
        let t = qs('.hortia-toast');
        if (!t) {
            t = document.createElement('div');
            t.className = 'hortia-toast';
            document.body.appendChild(t);
        }
        t.textContent = msg;
        t.classList.add('show');
        setTimeout(() => t.classList.remove('show'), 2200);
    };

    window.showToast = window.showToast;
})();

/* -------------------------
   6) Accessibility: close with Escape
------------------------- */
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = qs('#hortiaModal');
        if (modal && !modal.classList.contains('hidden')) modal.classList.add('hidden');
        const cart = qs('#hortiaCart');
        if (cart && !cart.classList.contains('hidden')) cart.classList.add('hidden');
    }
});
