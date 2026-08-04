/* Dulcería y Sorbetería Colón — interactions */

/* ---------- Real Google reviews (from customers) ---------- */
const REVIEWS = [
  { name: "RY Yan", meta: "Local Guide · 128 reseñas", color: "#D9694B",
    text: "The best sorbeteria in Merida 🍧 Elote (sweet corn) flavour is super tasty, never had anything similar before! Piña flavour is very refreshing. Strongly recommended!" },
  { name: "Joe Romano", meta: "Local Guide · 118 reseñas", color: "#8BAE7A",
    text: "1st time here, and what a welcome treat to cool you off. Beautiful flavors and amazing vibe. I had the corn sorbet, and others had the watermelon sorbet. Can't wait to go back." },
  { name: "Germ S", meta: "Local Guide · 139 reseñas", color: "#7B2E3A",
    text: "Service was great! I indulged in guanábana sorbet and my wife got zapote sorbet. Wanted to try flavors we never had before. Service was awesome!" },
  { name: "Kaeli Mueller", meta: "Local Guide · 232 reseñas", color: "#D9A441",
    text: "Delicious shaved ice! The texture is superb. The ice they use is all purified and sanitary. Good vibes eating desserts right on the beautiful Main Street of downtown Mérida." },
  { name: "Megan Close", meta: "Local Guide · 214 reseñas", color: "#E7A6A0",
    text: "My daughter ate the Mango without coming up for air. Hubs and I had mantecado and elote, and the boy had chocolate. They were all amazingly refreshing and delicious. We will be back!" },
  { name: "Julius Lussenburg", meta: "Local Guide · 191 reseñas", color: "#5f7f51",
    text: "Ultra smooth sorbets. I tried the mamey and guanábana flavors, but will certainly come back for more. Tasty and ice-crystal free sorbets — you can't go wrong." },
  { name: "Lennie Y", meta: "Local Guide · 39 reseñas", color: "#B14B32",
    text: "If you like fruit sorbets which are the perfect level of sweetness, this place is for you. We went back twice and had to try all of the flavours." },
  { name: "Sun Chaser", meta: "137 reseñas", color: "#D9694B",
    text: "Really nice fruit sorbet, not too sweet (we tried strawberry) and quick service. Clearly displayed prices and a list of flavours makes it very easy to order." },
  { name: "Lou Pach", meta: "Local Guide · 14 reseñas", color: "#8BAE7A",
    text: "They have been there for ages. Flavours are delicious, my favs are coconut and guanábana. I can't go to Merida and not visit them." },
  { name: "Monica Rivera", meta: "Local Guide · 1,516 reseñas", color: "#7B2E3A",
    text: "The ice creams were so delicious! I really recommend mamey and coconut, both were great. Service was friendly and super fast. A nice place to relax and sit." },
  { name: "David Wild", meta: "Local Guide · 361 reseñas", color: "#D9A441",
    text: "Got takeaway Elote ice cream while walking Paseo Montejo. Great sorbet. It's always busy, particularly late at night. Does takeaway as well as sit down." },
  { name: "Pablo Paz", meta: "Local Guide · 465 reseñas", color: "#5f7f51",
    text: "Bustling traditional Yucatec ice cream place with some very interesting flavors. Very refreshing — a great spot for people watching." },
];

/* Render review cards */
const grid = document.getElementById("reviewGrid");
if (grid) {
  grid.innerHTML = REVIEWS.map(r => `
    <article class="review">
      <div class="review__top">
        <div class="review__avatar" style="background:${r.color}">${r.name.charAt(0)}</div>
        <div class="review__who">
          <strong>${r.name}</strong>
          <span>${r.meta}</span>
        </div>
      </div>
      <div class="review__stars">★★★★★</div>
      <p class="review__text">${r.text}</p>
      <p class="review__gsource">Reseña de Google</p>
    </article>
  `).join("");
}

/* ---------- Mobile nav ---------- */
const toggle = document.getElementById("navToggle");
const links = document.getElementById("navLinks");
toggle?.addEventListener("click", () => {
  links.classList.toggle("open");
  toggle.classList.toggle("open");
});
links?.querySelectorAll("a").forEach(a =>
  a.addEventListener("click", () => {
    links.classList.remove("open");
    toggle.classList.remove("open");
  })
);

/* ---------- Nav shadow on scroll ---------- */
const nav = document.getElementById("nav");
const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 20);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

/* ---------- Share button ---------- */
const shareBtn = document.getElementById("shareBtn");
const toast = document.getElementById("toast");
function showToast(msg) {
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2600);
}
shareBtn?.addEventListener("click", async () => {
  const shareData = {
    title: "Dulcería y Sorbetería Colón · Mérida",
    text: "Sorbetes artesanales desde 1907 en Mérida, Yucatán 🍧 ¡Míralo!",
    url: window.location.href,
  };
  if (navigator.share) {
    try { await navigator.share(shareData); } catch (_) {}
  } else {
    try {
      await navigator.clipboard.writeText(shareData.url);
      showToast("¡Enlace copiado! Ya puedes compartirlo.");
    } catch (_) {
      showToast(window.location.href);
    }
  }
});

/* ---------- Scroll reveal ---------- */
const revealSelectors = [
  ".historia__text", ".historia__media", ".flavor", ".champola",
  ".celeb__inner", ".review", ".contacto__text", ".contacto__map", ".menu__head",
];
const revealEls = document.querySelectorAll(revealSelectors.join(","));
revealEls.forEach(el => el.classList.add("reveal"));
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => io.observe(el));

/* ---------- Year ---------- */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
