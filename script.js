const title = document.querySelector(".title-space h1");
const titleSpace = document.querySelector(".title-space");

let stickyStart = 1;
let ticking = false;

const stickyTop = 18;

function measureTitle() {
  const rect = titleSpace.getBoundingClientRect();
  const originalTop = rect.top + window.scrollY;

  stickyStart = Math.max(originalTop - stickyTop, 1);
}

function animateTitle() {
  const scroll = window.scrollY;

  const progress = Math.min(
    Math.max(scroll / stickyStart, 0),
    1
  );

  const scale = 1 - (0.45 * progress);
  const translateY = -15 * (1 - progress);

  title.style.transform =
    `translate3d(0, ${translateY}px, 0) scale(${scale})`;
}

function requestAnimation() {
  if (ticking) return;

  ticking = true;

  requestAnimationFrame(() => {
    animateTitle();
    ticking = false;
  });
}

measureTitle();
animateTitle();

window.addEventListener("scroll", requestAnimation, {
  passive: true
});

window.addEventListener("resize", () => {
  measureTitle();
  requestAnimation();
});

// DESENFOQUE SUPERIOR

function updateGlass() {
  const hero = document.querySelector(".hero");
  const rect = hero.getBoundingClientRect();

  document.body.classList.toggle(
    "show-top-glass",
    rect.top <= 120
  );
}

window.addEventListener("scroll", updateGlass, {
  passive: true
});

window.addEventListener("resize", updateGlass);

updateGlass();