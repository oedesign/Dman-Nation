const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    siteNav.classList.toggle('open');
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const whatsappFloat = document.querySelector('.whatsapp-float');
if (whatsappFloat) {
  const toggleWhatsappFloat = () => {
    if (window.scrollY > 400) whatsappFloat.classList.add('visible');
    else whatsappFloat.classList.remove('visible');
  };
  window.addEventListener('scroll', toggleWhatsappFloat);
  toggleWhatsappFloat();
}

const categoryLinks = Array.from(document.querySelectorAll('.services-subnav a'));
const serviceSections = Array.from(document.querySelectorAll('.service-section'));
if (categoryLinks.length && serviceSections.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      categoryLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    });
  }, { threshold: 0.35 });

  serviceSections.forEach((section) => observer.observe(section));
}

const slides = Array.from(document.querySelectorAll('.slide'));
let slideIndex = 0;
const showSlide = (index) => {
  if (!slides.length) return;
  slideIndex = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => slide.classList.toggle('active', i === slideIndex));
};

document.querySelector('.slider-btn.prev')?.addEventListener('click', () => showSlide(slideIndex - 1));
document.querySelector('.slider-btn.next')?.addEventListener('click', () => showSlide(slideIndex + 1));

const contactForm = document.querySelector('#contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.querySelector('#name').value.trim();
    const phone = document.querySelector('#phone').value.trim();
    const service = document.querySelector('#service').value;
    const message = document.querySelector('#message').value.trim();
    const feedback = document.querySelector('#formFeedback');

    if (!name || !phone || !service || !message) {
      feedback.textContent = 'Please complete all required fields.';
      feedback.className = 'feedback error';
      return;
    }

    const composedMessage = `Hello DMAN NATION,%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0AService: ${encodeURIComponent(service)}%0AMessage: ${encodeURIComponent(message)}`;
    feedback.textContent = 'Opening WhatsApp...';
    feedback.className = 'feedback success';
    window.open(`https://wa.me/2348000000000?text=${composedMessage}`, '_blank', 'noopener');
  });
}
