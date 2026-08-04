/* Dulcería y Sorbetería Colón — interactions */

const WA = "5219999999999"; // TODO: reemplazar por el número real de WhatsApp
const waLink = (msg) => `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;

/* =========================================================
   LA CARTA — clickable item cards → lightbox popup
   Para agregar/editar productos: edita este arreglo.
   Pon la foto del producto en /images y usa su nombre en "img".
   ========================================================= */
const MENU = [
  { name:"Sorbete de Guanábana", img:"images/champola.jpg", price:"$85 MXN",
    tag:"El favorito", kicker:"Sorbete de fruta natural",
    desc:"Cremoso y ligeramente ácido, el clásico que enamora a todos. Terso, sin cristales de hielo, con el punto justo de dulzor." },
  { name:"Sorbete de Mamey", img:"images/sorbete.jpg", price:"$85 MXN",
    kicker:"Sorbete de fruta natural",
    desc:"Dulce, sedoso y del color del atardecer yucateco. Puro sabor a fruta de temporada." },
  { name:"Sorbete de Coco", img:"images/champola.jpg", price:"$85 MXN",
    kicker:"Sorbete de fruta natural",
    desc:"Fresco y tropical, hecho con auténtico coco natural. Un imprescindible del trópico." },
  { name:"Sorbete de Elote", img:"images/bg-personalidades.jpg", price:"$85 MXN",
    tag:"Único", kicker:"Sorbete de fruta natural",
    desc:"El sabor que sorprende a todos: tostadito, distinto e inolvidable. Nadie lo hace como Colón." },
  { name:"Sorbete de Mango", img:"images/bg-personalidades.jpg", price:"$85 MXN",
    kicker:"Sorbete de fruta natural",
    desc:"Jugoso y vibrante. Imposible comer solo una bola en el calor de Mérida." },
  { name:"Sorbete de Fresa", img:"images/sorbete.jpg", price:"$85 MXN",
    kicker:"Sorbete de fruta natural",
    desc:"Natural y no demasiado dulce, como debe ser. Refrescante de principio a fin." },
  { name:"La Champola", img:"images/champola.jpg", price:"desde $95 MXN",
    tag:"Especialidad de la casa", kicker:"Bebida tradicional",
    desc:"Leche fría batida con una bola de tu sorbete favorito —casi siempre guanábana—. Cremosa, refrescante y absolutamente meridana. Si es tu primera vez, empieza aquí." },
  { name:"Dulces y Pastelitos", img:"images/dulces.jpg", price:"precio por pieza",
    kicker:"Dulcería fina",
    desc:"Pastelitos individuales y dulces tradicionales para acompañar tu sorbete o para llevar." },
];

const cartaGrid = document.getElementById("cartaGrid");
if (cartaGrid) {
  cartaGrid.innerHTML = MENU.map((m, i) => `
    <article class="card" data-i="${i}" tabindex="0" role="button" aria-label="Ver ${m.name}">
      ${m.tag ? `<span class="card__tag">${m.tag}</span>` : ""}
      <span class="card__zoom">⤢</span>
      <div class="card__img"><img src="${m.img}" alt="${m.name}" loading="lazy" /></div>
      <div class="card__body"><h3>${m.name}</h3><p>${m.kicker}</p></div>
    </article>
  `).join("");
}

/* ---- Lightbox modal ---- */
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalPrice = document.getElementById("modalPrice");
const modalKicker = document.getElementById("modalKicker");
const modalOrder = document.getElementById("modalOrder");

function openModal(i) {
  const m = MENU[i];
  if (!m) return;
  modalImg.src = m.img; modalImg.alt = m.name;
  modalTitle.textContent = m.name;
  modalDesc.textContent = m.desc;
  modalKicker.textContent = m.kicker || "";
  modalPrice.textContent = m.price || "";
  modalOrder.href = waLink(`¡Hola Sorbetería Colón! Quisiera pedir: ${m.name} 🍧`);
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}
cartaGrid?.addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  if (card) openModal(+card.dataset.i);
});
cartaGrid?.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    const card = e.target.closest(".card");
    if (card) { e.preventDefault(); openModal(+card.dataset.i); }
  }
});
modal?.addEventListener("click", (e) => { if (e.target.dataset.close !== undefined) closeModal(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

/* =========================================================
   CELEBRIDADES — carrusel
   Para agregar celebridades: pon la foto en /images y añade
   un objeto { img, name, note } a este arreglo.
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
        <div><span>＋</span>Agrega aquí la foto<br>de una celebridad</div>
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
   RESEÑAS — carrusel (reseñas reales de Google)
   ========================================================= */
const REVIEWS = [
  { name:"RY Yan", meta:"Local Guide · 128 reseñas", color:"#e4a83f",
    text:"The best sorbetería in Mérida 🍧 Elote (sweet corn) flavour is super tasty, never had anything similar before! Piña is very refreshing. Strongly recommended!" },
  { name:"Joe Romano", meta:"Local Guide · 118 reseñas", color:"#c78a26",
    text:"What a welcome treat to cool you off. Beautiful flavors and amazing vibe. I had the corn sorbet, others had watermelon. Can't wait to go back." },
  { name:"Germ S", meta:"Local Guide · 139 reseñas", color:"#4b4741",
    text:"Service was great! I indulged in guanábana sorbet and my wife got zapote. Wanted to try flavors we never had before. Awesome!" },
  { name:"Kaeli Mueller", meta:"Local Guide · 232 reseñas", color:"#e4a83f",
    text:"Delicious shaved ice! The texture is superb. Good vibes eating desserts right on the beautiful Main Street of downtown Mérida." },
  { name:"Megan Close", meta:"Local Guide · 214 reseñas", color:"#c78a26",
    text:"My daughter ate the Mango without coming up for air. We had mantecado and elote, the boy had chocolate. Amazingly refreshing. We'll be back!" },
  { name:"Julius Lussenburg", meta:"Local Guide · 191 reseñas", color:"#4b4741",
    text:"Ultra smooth sorbets. I tried mamey and guanábana. Tasty and ice-crystal free — you can't go wrong." },
  { name:"Lou Pach", meta:"Local Guide · 14 reseñas", color:"#e4a83f",
    text:"They have been there for ages. Flavours are delicious, my favs are coconut and guanábana. I can't go to Mérida and not visit them." },
  { name:"Monica Rivera", meta:"Local Guide · 1,516 reseñas", color:"#c78a26",
    text:"The ice creams were so delicious! I recommend mamey and coconut. Service was friendly and super fast. A nice place to relax." },
];

const revTrack = document.getElementById("revTrack");
if (revTrack) {
  revTrack.innerHTML = REVIEWS.map(r => `
    <div class="rev-slide">
      <div class="rev-card">
        <div class="rev-card__stars">★★★★★</div>
        <p class="rev-card__text">"${r.text}"</p>
        <div class="rev-card__who">
          <div class="rev-card__avatar" style="background:${r.color}">${r.name.charAt(0)}</div>
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
    if (dotsWrap) {
      dotsWrap.querySelectorAll("button").forEach((b, i) => b.classList.toggle("active", i === index));
    }
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

  // swipe
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

const celebCar = makeCarousel("celebCarousel", "celebDots", 3);
const revCar = makeCarousel("revCarousel", "revDots", 1);

/* Auto-advance reviews carousel */
if (revCar) {
  let i = 0;
  setInterval(() => { i = (i + 1) % (revCar.maxIndex() + 1); revCar.goTo(i); }, 6000);
}

/* =========================================================
   Nav, share, reveal, year
   ========================================================= */
const toggle = document.getElementById("navToggle");
const links = document.getElementById("navLinks");
toggle?.addEventListener("click", () => { links.classList.toggle("open"); toggle.classList.toggle("open"); });
links?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => { links.classList.remove("open"); toggle.classList.remove("open"); }));

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

const revealEls = document.querySelectorAll(".historia__text, .hg, .carta__head, .card, .celeb__inner, .visita__loc, .visita__reviews");
revealEls.forEach(el => el.classList.add("reveal"));
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
}, { threshold: 0.12 });
revealEls.forEach(el => io.observe(el));

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
