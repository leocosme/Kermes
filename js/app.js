(function () {
  "use strict";

  const fmt = (n) => "$" + n.toLocaleString("es-CO");

  // En kermes.html (versión standalone) las imágenes van embebidas como data URI en IMG_DATA;
  // en la versión con archivos separados, IMG_DATA no existe y se usa la ruta relativa tal cual.
  function resolveImg(path) {
    return (typeof IMG_DATA !== "undefined" && IMG_DATA[path]) || path;
  }

  // Lleva la sección elegida justo debajo del nav pegajoso, sin dejar restos de la sección anterior visibles.
  function scrollToSection(id) {
    const target = document.getElementById(id);
    const nav = document.getElementById("catnav");
    if (!target || !nav) return;
    const navHeight = nav.getBoundingClientRect().height;
    const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 14;
    window.scrollTo({ top, behavior: "smooth" });
  }

  function allSectionLinks() {
    return MENU_DATA.categories
      .map((c) => ({ id: c.id, name: c.name, icon: c.icon }))
      .concat([{ id: "porciones", name: "Porciones sueltas", icon: "leaf" }]);
  }

  // Bloquea el scroll del fondo mientras algún panel (nav rápido o modal de plato) está abierto.
  let scrollLockCount = 0;
  function lockScroll() {
    scrollLockCount++;
    document.body.classList.add("scroll-locked");
  }
  function unlockScroll() {
    scrollLockCount = Math.max(0, scrollLockCount - 1);
    if (scrollLockCount === 0) document.body.classList.remove("scroll-locked");
  }

  function marimbaDivider(extraClass) {
    const tpl = document.getElementById("marimba-divider-template");
    const node = tpl.content.cloneNode(true);
    if (extraClass) node.querySelector(".marimba-divider").classList.add(extraClass);
    return node;
  }

  function buildDishCard(item) {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "dish-card";
    card.addEventListener("click", () => openDishModal(item));

    const imgWrap = document.createElement("div");
    imgWrap.className = "dish-card__img-wrap";

    const img = document.createElement("img");
    img.src = resolveImg(item.images[0]);
    img.alt = item.name;
    img.loading = "lazy";
    imgWrap.appendChild(img);

    const priceTag = document.createElement("span");
    priceTag.className = "dish-card__price";
    priceTag.textContent = item.priceLabel || fmt(item.price);
    imgWrap.appendChild(priceTag);

    const body = document.createElement("div");
    body.className = "dish-card__body";

    const name = document.createElement("h3");
    name.className = "dish-card__name";
    name.textContent = item.name;
    body.appendChild(name);

    if (item.desc) {
      const desc = document.createElement("p");
      desc.className = "dish-card__desc";
      desc.textContent = item.desc;
      body.appendChild(desc);
    }

    card.appendChild(imgWrap);
    card.appendChild(body);
    return card;
  }

  function buildCategorySection(cat) {
    const section = document.createElement("section");
    section.className = "menu-section";
    section.id = cat.id;
    section.setAttribute("aria-labelledby", cat.id + "-title");

    const head = document.createElement("div");
    head.className = "section-head";
    head.innerHTML =
      '<span class="section-head__eyebrow">Del menú</span>' +
      '<h2 class="section-head__title" id="' + cat.id + '-title">' +
        '<svg width="26" height="26"><use href="#icon-' + cat.icon + '"/></svg>' +
        cat.name +
      "</h2>";
    head.appendChild(marimbaDivider());
    section.appendChild(head);

    const grid = document.createElement("div");
    grid.className = "dish-grid";
    cat.items.forEach((item) => grid.appendChild(buildDishCard(item)));
    section.appendChild(grid);

    return section;
  }

  function renderMenu() {
    const root = document.getElementById("menu-sections");
    const frag = document.createDocumentFragment();
    MENU_DATA.categories.forEach((cat) => frag.appendChild(buildCategorySection(cat)));
    root.appendChild(frag);
  }

  function renderPorciones() {
    const board = document.getElementById("porciones-board");
    const frag = document.createDocumentFragment();
    MENU_DATA.porciones.forEach((p) => {
      const row = document.createElement("div");
      row.className = "board__row";
      row.innerHTML =
        '<span class="board__name">' + p.name + "</span>" +
        '<span class="board__price">' + (p.priceLabel || fmt(p.price)) + "</span>";
      frag.appendChild(row);
    });
    board.appendChild(frag);
  }

  function renderCatNav() {
    const track = document.getElementById("catnav-track");
    const frag = document.createDocumentFragment();
    allSectionLinks().forEach((link) => {
      const a = document.createElement("a");
      a.className = "catnav__pill";
      a.href = "#" + link.id;
      a.dataset.target = link.id;
      a.innerHTML = '<svg><use href="#icon-' + link.icon + '"/></svg><span>' + link.name + "</span>";
      frag.appendChild(a);
    });
    track.appendChild(frag);
  }

  function renderQuickNav() {
    const list = document.getElementById("quick-nav-list");
    const frag = document.createDocumentFragment();
    allSectionLinks().forEach((link) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "quick-nav__item";
      btn.dataset.target = link.id;
      btn.innerHTML = '<svg><use href="#icon-' + link.icon + '"/></svg><span>' + link.name + "</span>";
      frag.appendChild(btn);
    });
    list.appendChild(frag);
  }

  function setupQuickNav() {
    const panel = document.getElementById("quick-nav");
    const openBtn = document.getElementById("hero-menu-btn");
    const items = Array.from(panel.querySelectorAll(".quick-nav__item"));
    const closers = Array.from(panel.querySelectorAll("[data-quicknav-close]"));

    const open = () => {
      // Carga la hoja tropical de fondo solo la primera vez que se abre el panel,
      // para no sumarla al peso de la carga inicial de la página.
      const list = document.getElementById("quick-nav-list");
      if (!list.style.backgroundImage) {
        list.style.backgroundImage = "url('" + resolveImg("images/leaf-tropical.png") + "')";
      }
      panel.classList.add("is-open");
      panel.setAttribute("aria-hidden", "false");
      openBtn.classList.add("is-open");
      openBtn.setAttribute("aria-expanded", "true");
      lockScroll();
    };

    const close = () => {
      panel.classList.remove("is-open");
      panel.setAttribute("aria-hidden", "true");
      openBtn.classList.remove("is-open");
      openBtn.setAttribute("aria-expanded", "false");
      unlockScroll();
    };

    openBtn.addEventListener("click", () => {
      panel.classList.contains("is-open") ? close() : open();
    });

    closers.forEach((el) => el.addEventListener("click", close));

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && panel.classList.contains("is-open")) close();
    });

    items.forEach((item) => {
      item.addEventListener("click", () => {
        const id = item.dataset.target;
        close();
        history.pushState(null, "", "#" + id);
        window.setTimeout(() => scrollToSection(id), 200);
      });
    });
  }

  function openDishModal(item) {
    const modal = document.getElementById("dish-modal");
    const track = document.getElementById("dish-modal-track");
    const dotsWrap = document.getElementById("dish-modal-dots");

    track.scrollLeft = 0;
    track.innerHTML = "";
    dotsWrap.innerHTML = "";

    const images = item.images && item.images.length ? item.images : [item.image];
    images.forEach((src, i) => {
      const img = document.createElement("img");
      img.src = resolveImg(src);
      img.alt = item.name + (i > 0 ? " — otra presentación" : "");
      track.appendChild(img);

      if (images.length > 1) {
        const dot = document.createElement("span");
        dot.className = "dish-modal__dot" + (i === 0 ? " is-active" : "");
        dotsWrap.appendChild(dot);
      }
    });

    const dots = Array.from(dotsWrap.children);
    if (dots.length) {
      const onScroll = () => {
        const idx = Math.round(track.scrollLeft / track.clientWidth);
        dots.forEach((d, i) => d.classList.toggle("is-active", i === idx));
      };
      track.onscroll = onScroll;
      dots.forEach((dot, i) => {
        dot.onclick = () => track.scrollTo({ left: i * track.clientWidth, behavior: "smooth" });
      });
    }

    document.getElementById("dish-modal-price").textContent = item.priceLabel || fmt(item.price);
    document.getElementById("dish-modal-name").textContent = item.name;
    const desc = document.getElementById("dish-modal-desc");
    const modalDesc = item.modalDesc || item.desc || "";
    desc.textContent = modalDesc;
    desc.hidden = !modalDesc;

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    lockScroll();
  }

  function closeDishModal() {
    const modal = document.getElementById("dish-modal");
    if (!modal.classList.contains("is-open")) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    unlockScroll();
  }

  function setupDishModal() {
    const modal = document.getElementById("dish-modal");
    Array.from(modal.querySelectorAll("[data-dishmodal-close]")).forEach((el) =>
      el.addEventListener("click", closeDishModal)
    );
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("is-open")) closeDishModal();
    });
  }

  function renderHeroDivider() {
    document.getElementById("footer-divider-slot").appendChild(marimbaDivider("marimba-divider--light"));
  }

  function fillEventInfo() {
    document.getElementById("hero-schedule").textContent = MENU_DATA.event.schedule;

    const phone = MENU_DATA.event.phone;
    const whatsappMsg = encodeURIComponent("Hola, quiero pedir un domicilio de la Kermes 🍽️");
    document.getElementById("delivery-fab-call").href = "tel:" + phone;
    document.getElementById("delivery-fab-whatsapp").href = "https://wa.me/57" + phone + "?text=" + whatsappMsg;

    document.title = MENU_DATA.event.title + " · " + MENU_DATA.event.org;
  }

  function setupDeliveryFab() {
    const fab = document.getElementById("delivery-fab");
    const btn = document.getElementById("delivery-fab-btn");

    const close = () => {
      fab.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
    };
    const toggle = () => {
      const isOpen = fab.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(isOpen));
    };

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggle();
    });

    document.addEventListener("click", (e) => {
      if (fab.classList.contains("is-open") && !fab.contains(e.target)) close();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && fab.classList.contains("is-open")) close();
    });

    // Se contrae automáticamente si el usuario vuelve a la sección hero.
    const hero = document.getElementById("top");
    if (hero) {
      const heroObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && fab.classList.contains("is-open")) close();
          });
        },
        { threshold: 0.6 }
      );
      heroObserver.observe(hero);
    }
  }

  function setupScrollSpy() {
    const track = document.getElementById("catnav-track");
    const pills = Array.from(document.querySelectorAll(".catnav__pill"));
    const sections = pills
      .map((p) => document.getElementById(p.dataset.target))
      .filter(Boolean);

    // Centra el pill activo horizontalmente dentro del track, sin tocar el scroll vertical de la página.
    const centerPill = (pill) => {
      const trackRect = track.getBoundingClientRect();
      const pillRect = pill.getBoundingClientRect();
      const delta = (pillRect.left + pillRect.width / 2) - (trackRect.left + trackRect.width / 2);
      track.scrollTo({ left: track.scrollLeft + delta, behavior: "smooth" });
    };

    const setActive = (id) => {
      pills.forEach((p) => p.classList.toggle("is-active", p.dataset.target === id));
      const activePill = pills.find((p) => p.dataset.target === id);
      if (activePill) centerPill(activePill);
    };

    pills.forEach((pill) => {
      pill.addEventListener("click", (e) => {
        e.preventDefault();
        const id = pill.dataset.target;
        history.pushState(null, "", "#" + id);
        scrollToSection(id);
        setActive(id);
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
  }

  function init() {
    fillEventInfo();
    renderHeroDivider();
    renderCatNav();
    renderQuickNav();
    renderMenu();
    renderPorciones();
    setupScrollSpy();
    setupQuickNav();
    setupDishModal();
    setupDeliveryFab();
  }

  // El arranque real lo dispara firebase-menu.js, una vez que intenta cargar
  // el menú en vivo desde Firestore (o decide usar el respaldo estático).
  window.__initMenuApp = init;
})();
