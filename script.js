/* Dulcería y Sorbetería Colón — "El Paseo, 1907" — interactions */

const mapsLink = (q) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q + " Mérida Yucatán")}`;

/* =========================================================
   SABORES destacados → lightbox
   Para editar: cambia nombre/descripción o la foto en /images.
   ========================================================= */
const MENU = [
  { name:"Guanábana", img:"images/champola.jpg", tag:"El favorito",
    kicker:"Sorbete de fruta natural",
    desc:"Cremoso y ligeramente ácido, el clásico que enamora a todos. Terso, sin cristales de hielo y con el punto justo de dulzor. El alma de la champola." },
  { name:"Mamey", img:"images/sorbete.jpg",
    kicker:"Sorbete de fruta natural",
    desc:"Dulce, sedoso y del color del atardecer yucateco. Puro sabor a fruta de temporada del trópico." },
  { name:"Coco", img:"images/coco.jpg",
    kicker:"Sorbete de fruta natural",
    desc:"Fresco y tropical, hecho con auténtico coco natural. Un imprescindible bajo el calor de Mérida." },
  { name:"Elote", img:"images/special.jpg", tag:"Único",
    kicker:"Sorbete de fruta natural",
    desc:"El sabor que sorprende a todos: tostadito, distinto e inolvidable. Nadie lo hace como Colón." },
];

const TEMPORADA = ["Mango","Fresa","Zapote","Piña","Sandía","Chocolate","Mantecado","Nanche"];

const cartaGrid = document.getElementById("cartaGrid");
if (cartaGrid) {
  cartaGrid.innerHTML = MENU.map((m, i) => `
    <article class="flavor reveal" data-i="${i}" tabindex="0" role="button" aria-label="Ver ${m.name}">
      ${m.tag ? `<span class="flavor__tag">${m.tag}</span>` : ""}
      <span class="flavor__zoom" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
      </span>
      <div class="flavor__img"><img src="${m.img}" alt="Sorbete de ${m.name}" loading="lazy" /></div>
      <h3>${m.name}</h3>
      <p>${m.kicker}</p>
    </article>`).join("");
}

const temporadaList = document.getElementById("temporadaList");
if (temporadaList) {
  temporadaList.innerHTML = TEMPORADA.map(t => `<li>${t}</li>`).join("");
}

/* ---- Lightbox modal ---- */
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalKicker = document.getElementById("modalKicker");
const modalMap = document.getElementById("modalMap");
let lastFocused = null;

function openModal(i) {
  const m = MENU[i];
  if (!m) return;
  lastFocused = document.activeElement;
  modalImg.src = m.img; modalImg.alt = `Sorbete de ${m.name}`;
  modalTitle.textContent = `Sorbete de ${m.name}`;
  modalDesc.textContent = m.desc;
  modalKicker.textContent = m.kicker || "";
  modalMap.href = mapsLink("Dulcería y Sorbetería Colón");
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  modal.querySelector(".modal__close")?.focus();
}
function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  lastFocused?.focus();
}
cartaGrid?.addEventListener("click", (e) => {
  const card = e.target.closest(".flavor");
  if (card) openModal(+card.dataset.i);
});
cartaGrid?.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    const card = e.target.closest(".flavor");
    if (card) { e.preventDefault(); openModal(+card.dataset.i); }
  }
});
modal?.addEventListener("click", (e) => { if (e.target.dataset.close !== undefined) closeModal(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && modal.classList.contains("open")) closeModal(); });

/* =========================================================
   SUCURSALES — 5 sucursales reales (teléfonos de elcolon.mx)
   ========================================================= */
const BRANCHES = [
  { name:"Centro Histórico", tel:"9999281497", telShow:"928 14 97", badge:"Original · 1907", q:"Dulcería y Sorbetería Colón Centro" },
  { name:"Paseo de Montejo", tel:"9999276443", telShow:"927 64 43", q:"Dulcería y Sorbetería Colón Paseo de Montejo" },
  { name:"Plaza Dorada", tel:"9999871367", telShow:"987 13 67", q:"Dulcería y Sorbetería Colón Plaza Dorada" },
  { name:"Francisco de Montejo", tel:"9999815771", telShow:"981 57 71", q:"Dulcería y Sorbetería Colón Francisco de Montejo" },
  { name:"Gran Plaza", tel:"9999447865", telShow:"944 78 65", q:"Dulcería y Sorbetería Colón Gran Plaza" },
];

const branchesEl = document.getElementById("branches");
if (branchesEl) {
  branchesEl.innerHTML = BRANCHES.map(b => `
    <div class="branch reveal">
      <span class="branch__pin" aria-hidden="true"></span>
      <div class="plaque">
        <span class="plaque__name">${b.name}</span>
        ${b.badge ? `<span class="plaque__badge">${b.badge}</span>` : ""}
        <a class="plaque__tel" href="tel:+52${b.tel}" aria-label="Llamar a sucursal ${b.name}">(999) ${b.telShow}</a>
        <a class="plaque__map" href="${mapsLink(b.q)}" target="_blank" rel="noopener">Cómo llegar →</a>
      </div>
    </div>`).join("");
}

/* =========================================================
   CELEBRIDADES — carrusel
   ========================================================= */
const CELEBS = [
  { img:"images/memoria-01.jpg", name:"Don Vicente Rodríguez Peláez", note:"Nuestro fundador · 1907" },
  { img:"images/memoria-02.jpg", name:"El mostrador de siempre", note:"Interior histórico" },
  { img:"images/memoria-03.jpg", name:"Los portales de Mérida", note:"Una tarde de sorbetes" },
  { img:"images/coco.jpg", name:"Generaciones felices", note:"Más de un siglo de visitantes" },
  { __add:true },
  { __add:true },
];

const celebTrack = document.getElementById("celebTrack");
if (celebTrack) {
  celebTrack.innerHTML = CELEBS.map(c => c.__add ? `
    <div class="celeb-slide">
      <div class="celeb-card celeb-card--add">
        <div><span>＋</span>Agrega aquí la foto<br>de una visita especial</div>
      </div>
    </div>` : `
    <div class="celeb-slide">
      <figure class="celeb-card">
        <img src="${c.img}" alt="${c.name}" loading="lazy" />
        <figcaption class="celeb-card__cap"><strong>${c.name}</strong><span>${c.note}</span></figcaption>
      </figure>
    </div>`).join("");
}

/* =========================================================
   RESEÑAS — reseñas reales de Google
   ========================================================= */
const REVIEWS = [
  { name:"RY Yan", meta:"Local Guide · 128 reseñas",
    text:"The best sorbetería in Mérida 🍧 Elote (sweet corn) flavour is super tasty, never had anything similar before! Piña is very refreshing. Strongly recommended!" },
  { name:"Joe Romano", meta:"Local Guide · 118 reseñas",
    text:"What a welcome treat to cool you off. Beautiful flavors and amazing vibe. I had the corn sorbet, others had watermelon. Can't wait to go back." },
  { name:"Germ S", meta:"Local Guide · 139 reseñas",
    text:"Service was great! I indulged in guanábana sorbet and my wife got zapote. Wanted to try flavors we never had before. Awesome!" },
  { name:"Kaeli Mueller", meta:"Local Guide · 232 reseñas",
    text:"Delicious shaved ice! The texture is superb. Good vibes eating desserts right on the beautiful Main Street of downtown Mérida." },
  { name:"Megan Close", meta:"Local Guide · 214 reseñas",
    text:"My daughter ate the mango without coming up for air. We had mantecado and elote, the boy had chocolate. Amazingly refreshing. We'll be back!" },
  { name:"Julius Lussenburg", meta:"Local Guide · 191 reseñas",
    text:"Ultra smooth sorbets. I tried mamey and guanábana. Tasty and ice-crystal free — you can't go wrong." },
  { name:"Lou Pach", meta:"Local Guide · 14 reseñas",
    text:"They have been there for ages. Flavours are delicious, my favs are coconut and guanábana. I can't go to Mérida and not visit them." },
  { name:"Monica Rivera", meta:"Local Guide · 1,516 reseñas",
    text:"The ice creams were so delicious! I recommend mamey and coconut. Service was friendly and super fast. A nice place to relax." },
];

const revTrack = document.getElementById("revTrack");
if (revTrack) {
  revTrack.innerHTML = REVIEWS.map(r => `
    <div class="rev-slide">
      <div class="rev-card">
        <div class="rev-card__stars" aria-hidden="true">★★★★★</div>
        <p class="rev-card__text">${r.text}</p>
        <div class="rev-card__who">
          <div class="rev-card__avatar" aria-hidden="true">${r.name.charAt(0)}</div>
          <div class="rev-card__meta"><strong>${r.name}</strong><span>${r.meta} · Google</span></div>
        </div>
      </div>
    </div>`).join("");
}

/* =========================================================
   Reusable carousel engine
   ========================================================= */
function makeCarousel(rootId, dotsId, perView) {
  const root = document.getElementById(rootId);
  const dotsWrap = document.getElementById(dotsId);
  if (!root) return;
  const track = root.querySelector(".carousel__track");
  const slides = track.children.length;
  const prev = root.querySelector(".carousel__arrow--prev");
  const next = root.querySelector(".carousel__arrow--next");
  let index = 0;

  const getPerView = () => (window.innerWidth <= 680 ? 1 : (window.innerWidth <= 940 && perView === 3 ? 2 : perView));
  const maxIndex = () => Math.max(0, slides - getPerView());

  function render() {
    const pv = getPerView();
    index = Math.min(index, maxIndex());
    track.style.transform = `translateX(-${index * (100 / pv)}%)`;
    if (dotsWrap) dotsWrap.querySelectorAll("button").forEach((b, i) => b.classList.toggle("active", i === index));
  }
  function go(dir) { index = Math.max(0, Math.min(index + dir, maxIndex())); render(); }
  function goTo(i) { index = Math.max(0, Math.min(i, maxIndex())); render(); }

  prev?.addEventListener("click", () => go(-1));
  next?.addEventListener("click", () => go(1));

  if (dotsWrap) {
    const pages = maxIndex() + 1;
    dotsWrap.innerHTML = Array.from({ length: pages }, (_, i) => `<button aria-label="Ir a ${i + 1}"></button>`).join("");
    dotsWrap.querySelectorAll("button").forEach((b, i) => b.addEventListener("click", () => goTo(i)));
  }

  let startX = 0, dragging = false;
  const vp = root.querySelector(".carousel__viewport");
  vp.addEventListener("touchstart", (e) => { startX = e.touches[0].clientX; dragging = true; }, { passive: true });
  vp.addEventListener("touchend", (e) => {
    if (!dragging) return; dragging = false;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
  });

  window.addEventListener("resize", render);
  render();
  return { go, goTo, maxIndex };
}

makeCarousel("celebCarousel", "celebDots", 3);
const revCar = makeCarousel("revCarousel", "revDots", 1);
if (revCar) {
  let i = 0;
  setInterval(() => { i = (i + 1) % (revCar.maxIndex() + 1); revCar.goTo(i); }, 6000);
}

/* =========================================================
   Nav, share, reveal, year
   ========================================================= */
const toggle = document.getElementById("navToggle");
const links = document.getElementById("navLinks");
toggle?.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  toggle.classList.toggle("open", open);
  toggle.setAttribute("aria-expanded", String(open));
});
links?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  links.classList.remove("open"); toggle.classList.remove("open"); toggle.setAttribute("aria-expanded", "false");
}));

const nav = document.getElementById("nav");
const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 30);
onScroll(); window.addEventListener("scroll", onScroll, { passive: true });

const toast = document.getElementById("toast");
function showToast(msg) { if (!toast) return; toast.textContent = msg; toast.classList.add("show"); setTimeout(() => toast.classList.remove("show"), 2600); }
document.getElementById("shareBtn")?.addEventListener("click", async () => {
  const data = { title: "Dulcería y Sorbetería Colón · Mérida", text: "Sorbetes artesanales desde 1907 en Mérida, Yucatán 🍧", url: location.href };
  if (navigator.share) { try { await navigator.share(data); } catch (_) {} }
  else { try { await navigator.clipboard.writeText(location.href); showToast("¡Enlace copiado!"); } catch (_) { showToast(location.href); } }
});

/* Scroll reveals */
const revealEls = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
}, { threshold: 0.12 });
revealEls.forEach(el => io.observe(el));

/* Champola callouts — draw in sequence when the figure enters view */
const champFig = document.querySelector(".champola__figure");
if (champFig) {
  const callouts = champFig.querySelectorAll(".callout");
  const co = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        callouts.forEach((c, i) => setTimeout(() => c.classList.add("in"), 400 + i * 380));
        co.unobserve(e.target);
      }
    });
  }, { threshold: 0.4 });
  co.observe(champFig);
}

/* "También de temporada" — line-by-line reveal */
const temporada = document.querySelector(".temporada");
if (temporada) {
  const items = temporada.querySelectorAll(".temporada__list li");
  const to = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        items.forEach((li, i) => setTimeout(() => li.classList.add("in"), i * 120));
        to.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  to.observe(temporada);
}

/* Promenade road draw-in */
const road = document.getElementById("roadLive");
if (road) {
  const ro = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { road.classList.add("draw"); ro.unobserve(e.target); } });
  }, { threshold: 0.3 });
  ro.observe(road);
}

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
