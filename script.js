const mobileToggle = document.querySelector('.nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const testimonials = Array.from(document.querySelectorAll('.testimonial'));
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');
const yearEl = document.getElementById('year');

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (mobileToggle && mobileMenu) {
  mobileToggle.addEventListener('click', () => {
    const expanded = mobileToggle.getAttribute('aria-expanded') === 'true';
    mobileToggle.setAttribute('aria-expanded', String(!expanded));
    mobileMenu.setAttribute('aria-expanded', String(!expanded));
  });
}

let activeIndex = testimonials.findIndex((item) => item.dataset.active === 'true');
if (activeIndex === -1) {
  activeIndex = 0;
  if (testimonials[0]) {
    testimonials[0].dataset.active = 'true';
  }
}

const setActiveTestimonial = (index) => {
  testimonials.forEach((testimonial, idx) => {
    testimonial.dataset.active = idx === index ? 'true' : 'false';
  });
};

const showNext = () => {
  if (!testimonials.length) return;
  activeIndex = (activeIndex + 1) % testimonials.length;
  setActiveTestimonial(activeIndex);
};

const showPrev = () => {
  if (!testimonials.length) return;
  activeIndex = (activeIndex - 1 + testimonials.length) % testimonials.length;
  setActiveTestimonial(activeIndex);
};

if (nextBtn) {
  nextBtn.addEventListener('click', showNext);
}

if (prevBtn) {
  prevBtn.addEventListener('click', showPrev);
}

let autoplay = setInterval(showNext, 6500);

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    clearInterval(autoplay);
  } else {
    autoplay = setInterval(showNext, 6500);
  }
});

document.addEventListener('pointerdown', () => {
  clearInterval(autoplay);
});
