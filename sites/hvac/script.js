const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.service-card, .review-card').forEach((element, index) => {
  element.style.setProperty('--delay', `${(index % 3) * 90}ms`);
});

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('section-visible');
      sectionObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.06 });

document.querySelectorAll('main > section').forEach((section) => {
  section.classList.add('section-motion');
  sectionObserver.observe(section);
});

const menuButton = document.querySelector('.menu-button');
const header = document.querySelector('.site-header');
menuButton.addEventListener('click', () => {
  const open = header.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.desktop-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    header.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});
