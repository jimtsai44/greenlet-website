(function () {
  "use strict";

  var CART_KEY = "greenlet_cart";
  var cart = loadCart();

  var cartToggle = document.getElementById("cartToggle");
  var cartPanel = document.getElementById("cartPanel");
  var cartOverlay = document.getElementById("cartOverlay");
  var cartClose = document.getElementById("cartClose");
  var cartItemsEl = document.getElementById("cartItems");
  var cartEmptyEl = document.getElementById("cartEmpty");
  var cartCountEl = document.getElementById("cartCount");
  var cartSubtotalEl = document.getElementById("cartSubtotal");
  var checkoutBtn = document.getElementById("checkoutBtn");
  var checkoutNote = document.getElementById("checkoutNote");
  var toastEl = document.getElementById("toast");
  var headerFlag = document.getElementById("headerFlag");
  var heroArt = document.querySelector(".hero-art");

  function loadCart() {
    try {
      var raw = window.localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function saveCart() {
    try {
      window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (e) {
      /* storage unavailable, ignore */
    }
  }

  function formatNZD(amount) {
    return "$" + amount.toLocaleString("en-NZ") + " NZD";
  }

  function showToast(message) {
    toastEl.textContent = message;
    toastEl.classList.add("is-visible");
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(function () {
      toastEl.classList.remove("is-visible");
    }, 2200);
  }

  function openCart() {
    cartPanel.classList.add("is-open");
    cartOverlay.classList.add("is-open");
    cartPanel.setAttribute("aria-hidden", "false");
    cartToggle.setAttribute("aria-expanded", "true");
  }

  function closeCart() {
    cartPanel.classList.remove("is-open");
    cartOverlay.classList.remove("is-open");
    cartPanel.setAttribute("aria-hidden", "true");
    cartToggle.setAttribute("aria-expanded", "false");
  }

  function updateLampState(totalQty) {
    var lit = totalQty > 0;
    headerFlag.classList.toggle("is-lit", lit);
    if (heroArt) heroArt.classList.toggle("is-lit", lit);
  }

  function addToCart(id, name, price) {
    var line = cart.find(function (item) { return item.id === id; });
    if (line) {
      line.qty += 1;
    } else {
      cart.push({ id: id, name: name, price: price, qty: 1 });
    }
    saveCart();
    renderCart();
    showToast(name + " added. The lamp's lit.");
  }

  function changeQty(id, delta) {
    var line = cart.find(function (item) { return item.id === id; });
    if (!line) return;
    line.qty += delta;
    if (line.qty <= 0) {
      cart = cart.filter(function (item) { return item.id !== id; });
    }
    saveCart();
    renderCart();
  }

  function renderCart() {
    var totalQty = cart.reduce(function (sum, item) { return sum + item.qty; }, 0);
    cartCountEl.textContent = String(totalQty);
    updateLampState(totalQty);

    cartItemsEl.innerHTML = "";

    if (cart.length === 0) {
      cartItemsEl.appendChild(cartEmptyEl);
      cartSubtotalEl.textContent = formatNZD(0);
      return;
    }

    var subtotal = 0;
    cart.forEach(function (item) {
      subtotal += item.price * item.qty;

      var line = document.createElement("div");
      line.className = "cart-line";

      var info = document.createElement("div");
      var nameEl = document.createElement("div");
      nameEl.className = "cart-line-name";
      nameEl.textContent = item.name;
      var qtyRow = document.createElement("div");
      qtyRow.className = "cart-line-qty";

      var minusBtn = document.createElement("button");
      minusBtn.className = "qty-btn";
      minusBtn.type = "button";
      minusBtn.textContent = "−";
      minusBtn.setAttribute("aria-label", "Decrease " + item.name + " quantity");
      minusBtn.addEventListener("click", function () { changeQty(item.id, -1); });

      var qtyText = document.createElement("span");
      qtyText.textContent = item.qty;

      var plusBtn = document.createElement("button");
      plusBtn.className = "qty-btn";
      plusBtn.type = "button";
      plusBtn.textContent = "+";
      plusBtn.setAttribute("aria-label", "Increase " + item.name + " quantity");
      plusBtn.addEventListener("click", function () { changeQty(item.id, 1); });

      qtyRow.appendChild(minusBtn);
      qtyRow.appendChild(qtyText);
      qtyRow.appendChild(plusBtn);

      info.appendChild(nameEl);
      info.appendChild(qtyRow);

      var priceEl = document.createElement("div");
      priceEl.className = "cart-line-price";
      priceEl.textContent = formatNZD(item.price * item.qty);

      line.appendChild(info);
      line.appendChild(priceEl);
      cartItemsEl.appendChild(line);
    });

    cartSubtotalEl.textContent = formatNZD(subtotal);
  }

  document.querySelectorAll(".add-to-cart").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var card = btn.closest(".product-card");
      addToCart(card.dataset.id, card.dataset.name, Number(card.dataset.price));
      openCart();
    });
  });

  cartToggle.addEventListener("click", function () {
    if (cartPanel.classList.contains("is-open")) {
      closeCart();
    } else {
      openCart();
    }
  });
  cartClose.addEventListener("click", closeCart);
  cartOverlay.addEventListener("click", closeCart);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeCart();
  });

  checkoutBtn.addEventListener("click", function () {
    if (cart.length === 0) {
      checkoutNote.textContent = "The lamp's still unlit. Add something first.";
      return;
    }
    checkoutNote.textContent = "Online checkout is coming soon. We'll email you the moment it's live.";
  });

  var newsletterForm = document.getElementById("newsletterForm");
  if (newsletterForm) {
    var newsletterNote = document.getElementById("newsletterNote");
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = document.getElementById("newsletterEmail").value.trim();
      if (!email) return;
      newsletterNote.textContent = "Thanks. We've got " + email + " on the list and will be in touch.";
      newsletterForm.reset();
    });
  }

  var navToggle = document.getElementById("navToggle");
  var mainNav = document.getElementById("mainNav");
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var willOpen = !mainNav.classList.contains("is-open");
      mainNav.classList.toggle("is-open", willOpen);
      navToggle.setAttribute("aria-expanded", String(willOpen));
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && mainNav.classList.contains("is-open")) {
        mainNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  var grassScenes = document.querySelectorAll(".grass-scene");
  var heroCaption = document.getElementById("heroCaption");
  if (grassScenes.length && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var sceneIndex = 0;
    grassScenes.forEach(function (scene, i) {
      if (scene.classList.contains("is-active")) sceneIndex = i;
    });
    window.setInterval(function () {
      grassScenes[sceneIndex].classList.remove("is-active");
      sceneIndex = (sceneIndex + 1) % grassScenes.length;
      grassScenes[sceneIndex].classList.add("is-active");
      if (heroCaption) heroCaption.textContent = grassScenes[sceneIndex].dataset.caption;
    }, 5000);
  }

  renderCart();
})();
