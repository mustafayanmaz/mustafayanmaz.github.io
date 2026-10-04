const body = document.body;
const modeToggle = document.getElementById('modeToggle');
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const backToTop = document.getElementById('backToTop');

const setThemeButton = () => {
  if (!modeToggle) return;
  modeToggle.textContent = body.classList.contains('light') ? '☀' : '☾';
};

const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'light') {
  body.classList.add('light');
}
setThemeButton();

modeToggle?.addEventListener('click', () => {
  body.classList.toggle('light');
  const isLight = body.classList.contains('light');
  localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
  setThemeButton();
});

const setMobileMenu = (isOpen) => {
  if (!menuToggle || !mobileMenu) return;
  mobileMenu.classList.toggle('open', isOpen);
  menuToggle.classList.toggle('open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
};

menuToggle?.addEventListener('click', () => {
  setMobileMenu(!mobileMenu?.classList.contains('open'));
});

mobileMenu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setMobileMenu(false));
});

backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const trackedSections = [...document.querySelectorAll('main section[id], footer[id]')];
const navLinks = [...document.querySelectorAll('[data-section]')];

const setActiveSection = () => {
  let current = 'home';
  const scrollPosition = window.scrollY + 240;
  const pageBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;

  for (const section of trackedSections) {
    if (scrollPosition >= section.offsetTop) {
      current = section.id;
    }
  }

  if (pageBottom) {
    current = 'footer';
  }

  navLinks.forEach((link) => {
    link.classList.toggle('active', link.dataset.section === current);
  });
};

window.addEventListener('scroll', setActiveSection, { passive: true });
window.addEventListener('resize', setActiveSection, { passive: true });
setActiveSection();

const inner = document.getElementById('cursor-inner');
const outer = document.getElementById('cursor-outer');
const canUseCustomCursor = inner && outer && window.matchMedia('(pointer: fine)').matches;

if (canUseCustomCursor) {
  let outerX = window.innerWidth * 0.78;
  let outerY = window.innerHeight * 0.45;
  let mouseX = outerX;
  let mouseY = outerY;

  window.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    inner.style.left = `${mouseX}px`;
    inner.style.top = `${mouseY}px`;
  }, { passive: true });

  const animateCursor = () => {
    outerX += (mouseX - outerX) * 0.16;
    outerY += (mouseY - outerY) * 0.16;
    outer.style.left = `${outerX}px`;
    outer.style.top = `${outerY}px`;
    requestAnimationFrame(animateCursor);
  };

  animateCursor();

  document.querySelectorAll('a, button, .tech-stack-box, .project-card').forEach((element) => {
    element.addEventListener('mouseenter', () => {
      outer.style.width = '50px';
      outer.style.height = '50px';
    });
    element.addEventListener('mouseleave', () => {
      outer.style.width = '35px';
      outer.style.height = '35px';
    });
  });
}

const pupils = [...document.querySelectorAll('.footer-pupil')];

if (pupils.length) {
  const eyes = pupils.map((pupil) => ({
    pupil,
    eye: pupil.closest('.footer-avatar-eye'),
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
  })).filter(({ eye }) => eye);

  const pointer = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  };

  const updateEyeTargets = () => {
    eyes.forEach((tracker) => {
      const eyeRect = tracker.eye.getBoundingClientRect();
      const centerX = eyeRect.left + eyeRect.width / 2;
      const centerY = eyeRect.top + eyeRect.height / 2;
      const deltaX = pointer.x - centerX;
      const deltaY = pointer.y - centerY;
      const distance = Math.hypot(deltaX, deltaY);

      if (distance < 1) {
        tracker.targetX = 0;
        tracker.targetY = 0;
        return;
      }

      const maxX = Math.max(5, (eyeRect.width - tracker.pupil.offsetWidth) / 2 - 3);
      const maxY = Math.max(4, (eyeRect.height - tracker.pupil.offsetHeight) / 2 - 5);
      const pull = Math.min(distance / 170, 1);
      const angle = Math.atan2(deltaY, deltaX);

      tracker.targetX = Math.cos(angle) * maxX * pull;
      tracker.targetY = Math.sin(angle) * maxY * pull;
    });
  };

  const animateEyes = () => {
    updateEyeTargets();

    eyes.forEach((tracker) => {
      tracker.x += (tracker.targetX - tracker.x) * 0.22;
      tracker.y += (tracker.targetY - tracker.y) * 0.22;
      tracker.pupil.style.transform = `translate3d(${tracker.x}px, ${tracker.y}px, 0)`;
    });

    requestAnimationFrame(animateEyes);
  };

  window.addEventListener('mousemove', (event) => {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
  }, { passive: true });

  animateEyes();
}
