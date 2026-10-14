const body = document.body;
const modeToggle = document.getElementById('modeToggle');
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const backToTop = document.getElementById('backToTop');
const languageToggle = document.getElementById('languageToggle');
const cvLink = document.getElementById('cvLink');

let currentLanguage = localStorage.getItem('portfolio-language') === 'en' ? 'en' : 'tr';

const englishTranslations = {
  'nav.home': '</Home>',
  'nav.about': '</About>',
  'nav.projects': '</Projects>',
  'nav.skills': '</Skills>',
  'nav.contact': '</Contact>',
  'hero.greeting': 'Hello(); I am',
  'hero.text': 'I focus on Spring Boot, ASP.NET Core, RESTful APIs, PostgreSQL, and microservice-based systems. I build secure, maintainable, and scalable backend solutions.',
  'hero.projectsButton': 'View My Projects',
  'hero.cvButton': 'Open CV',
  'about.heading': '</About Me>',
  'about.paragraph1': 'I am a Computer Engineer focused on backend development, with hands-on experience in Spring Boot, ASP.NET Core, RESTful APIs, PostgreSQL, and microservice-based applications. I have developed secure and scalable software solutions using Keycloak, JWT, RabbitMQ, and Docker.',
  'about.paragraph2': 'I completed my Bachelor’s degree in Computer Engineering at Recep Tayyip Erdoğan University in 2026. Software development internships, university projects, my AI-powered network security thesis, and parallel computing studies have strengthened my backend engineering focus.',
  'about.locationLabel': 'Location',
  'about.location': 'Türkiye',
  'about.languageLabel': 'English',
  'about.focusLabel': 'Focus',
  'about.educationLabel': 'Education',
  'experience.heading': 'Work Experience',
  'experience.agito1': 'Developed a stock management microservice using Spring Boot, layered architecture, RESTful APIs, DTOs, validation, object mapping, and global exception handling.',
  'experience.agito2': 'Implemented FIFO-based stock deduction, stock-batch traceability, and average cost calculation flows.',
  'experience.agito3': 'Integrated Keycloak/JWT authentication, RabbitMQ low-stock email notifications, and Swagger/OpenAPI documentation.',
  'experience.agito4': 'Contributed to testing, debugging, code reviews, and team-based workflows using Git and Docker.',
  'experience.rteuCompany': 'RTEU — Department of Information Technologies',
  'experience.rteu1': 'Developed and deployed the full-stack ÇAYGEN tea seedling monitoring platform using ASP.NET Core, PostgreSQL, React, and Tailwind CSS.',
  'experience.rteu2': 'Implemented JWT authentication, role-based authorization, advanced filtering, detailed seedling profiles, gallery management, and audit logging.',
  'experience.rteu3': 'Processed seedling data extracted from PDF catalogues using Python and prepared it for system import.',
  'experience.workshopTitle': 'National Technology Workshop Assistant',
  'experience.workshop1': 'Supported model verification, print-setting optimization, and post-production quality checks in 3D printing and prototyping workflows.',
  'experience.workshop2': 'Assisted with technical equipment, troubleshooting print issues, and preparing student projects for production.',
  'experience.designTitle': 'Design and Prototyping Assistant',
  'experience.designCompany': 'RTEU — Design and Prototyping Workshop',
  'experience.design1': 'Contributed to basic 3D modelling and design refinement tasks.',
  'experience.design2': 'Prepared FDM and resin print files with Bambu Studio, Ultimaker Cura, and Chitubox, and performed 3D scanning with Revo Scan.',
  'education.label': 'Education',
  'education.degree': 'Bachelor’s Degree in Computer Engineering',
  'education.details': '09/2021 — 07/2026 · Rize, Türkiye',
  'projects.heading': '</My Projects>',
  'projects.intro': 'A selection of the projects featured in my CV, highlighting architecture, backend workflows, security, data processing, and performance.',
  'projects.idsLabel': 'Undergraduate Thesis · Featured',
  'projects.idsTitle': 'AI-Powered Real-Time IPv4/IPv6 IDS/IPS',
  'projects.idsText': 'An end-to-end intrusion detection and prevention prototype running on Orange Pi 5, with real-time traffic analysis, threat scoring, and automatic IP blocking.',
  'projects.ids1': 'Collected and labelled a custom IPv4/IPv6 dataset using normal traffic and 28 controlled attack scenarios.',
  'projects.ids2': 'Evaluated five machine learning algorithms on six public IDS datasets.',
  'projects.ids3': 'Implemented a two-stage binary and multi-class classification architecture.',
  'projects.ids4': 'Achieved a one-second analysis cycle with processing times below 50 ms during flood traffic tests.',
  'projects.stockTitle': 'Stock Management Microservice',
  'projects.stockText': 'A Spring Boot-based microservice that manages real stock movements, sales operations, and secure user access.',
  'projects.stock1': 'Layered architecture, DTOs, validation, mapping, and global exception handling.',
  'projects.stock2': 'FIFO-based stock deduction, stock-batch traceability, and average cost calculation.',
  'projects.stock3': 'Authentication and role-based authorization with Keycloak and JWT.',
  'projects.stock4': 'RabbitMQ low-stock notifications and Swagger/OpenAPI documentation.',
  'projects.caygenTitle': 'ÇAYGEN — Tea Seedling Monitoring System',
  'projects.caygenText': 'A full-stack platform for cataloguing, filtering, managing, and tracking the visual data of tea seedlings.',
  'projects.caygen1': 'SQL-based relational data model and ASP.NET Core REST backend.',
  'projects.caygen2': 'JWT authentication, role-based authorization, and audit logging.',
  'projects.caygen3': 'Advanced filtering, detailed seedling profiles, and gallery management.',
  'projects.caygen4': 'Python-based data extraction and transformation from PDF catalogues.',
  'projects.bookTitle': 'Book Exchange Platform',
  'projects.bookText': 'Developed a C++17 book exchange platform and parallelized search, genre analysis, and similarity matrix operations using OpenMP and MPI. Compared sequential and parallel implementations across multi-core and distributed environments.',
  'projects.uavTitle': 'Distributed Swarm UAV System',
  'projects.uavText': 'Developed and tested a multi-UAV simulation environment using PX4 and Gazebo, including autonomous mission scenarios, swarm coordination, and communication between system components.',
  'projects.petTitle': 'Pet Care Reminder System',
  'projects.petText': 'Developed a Java-based care and reminder system using linked lists, sparse matrices, stacks, queues, Heap Sort, Huffman coding, BFS/DFS, Hash Tables, B+ trees, KMP, and hashing techniques.',
  'projects.cipherText': 'An interactive learning tool that visualizes the encryption and decryption processes of eight classical cryptographic algorithms in real time.',
  'skills.heading': '</My Skills>',
  'skills.intro': 'My current technology stack, organized by category while preserving the visual structure of my previous portfolio.',
  'skills.languages': 'Programming Languages',
  'skills.backend': 'Backend, APIs & Databases',
  'skills.tools': 'Frontend, DevOps & Tools',
  'footer.backToTop': '← BACK TO TOP',
  'footer.kicker': '</Contact>',
  'footer.heading': 'Let’s build something together.',
  'footer.text': 'Feel free to contact me about backend development, software engineering, and project opportunities.',
  'footer.email': 'Email',
};

const localizedTextElements = [...document.querySelectorAll('[data-i18n]')];
const turkishTranslations = new Map(
  localizedTextElements.map((element) => [element.dataset.i18n, element.textContent]),
);

const localizedAttributes = [
  { selector: '.navbar', attribute: 'aria-label', tr: 'Ana menü', en: 'Main navigation' },
  { selector: '.brand', attribute: 'aria-label', tr: 'Ana sayfa', en: 'Home' },
  { selector: '.hero-tech', attribute: 'aria-label', tr: 'Öne çıkan teknolojiler', en: 'Featured technologies' },
  { selector: '.hero-card', attribute: 'aria-label', tr: 'Kısa profil', en: 'Profile summary' },
  { selector: '.cyber-shot img', attribute: 'alt', tr: 'IDS Shield AI firewall dashboard ekran görüntüsü', en: 'IDS Shield AI firewall dashboard screenshot' },
  { selector: '.caygen-shot img', attribute: 'alt', tr: 'ÇAYGEN çay fidanı izleme sistemi ekran görüntüsü', en: 'ÇAYGEN tea seedling monitoring system screenshot' },
  { selector: '#backToTop', attribute: 'aria-label', tr: 'Başa dön', en: 'Back to top' },
];

const setThemeButton = () => {
  if (!modeToggle) return;
  modeToggle.textContent = body.classList.contains('light') ? '☀' : '☾';
  const label = currentLanguage === 'en' ? 'Change theme' : 'Tema değiştir';
  modeToggle.setAttribute('aria-label', label);
  modeToggle.title = label;
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
  const label = currentLanguage === 'en'
    ? (isOpen ? 'Close menu' : 'Open menu')
    : (isOpen ? 'Menüyü kapat' : 'Menüyü aç');
  menuToggle.setAttribute('aria-label', label);
};

const applyLanguage = (language) => {
  currentLanguage = language === 'en' ? 'en' : 'tr';
  document.documentElement.lang = currentLanguage;

  localizedTextElements.forEach((element) => {
    const key = element.dataset.i18n;
    element.textContent = currentLanguage === 'en'
      ? englishTranslations[key]
      : turkishTranslations.get(key);
  });

  localizedAttributes.forEach(({ selector, attribute, tr, en }) => {
    document.querySelector(selector)?.setAttribute(attribute, currentLanguage === 'en' ? en : tr);
  });

  const description = currentLanguage === 'en'
    ? 'Mustafa Yanmaz — Backend Software Engineer portfolio focused on Spring Boot, ASP.NET Core, REST APIs, PostgreSQL, and microservices.'
    : 'Mustafa Yanmaz — Backend Software Engineer. Spring Boot, ASP.NET Core, REST APIs, PostgreSQL ve mikroservis odaklı kişisel portfolyo.';
  const socialDescription = currentLanguage === 'en'
    ? 'Backend development, microservices, REST APIs, and real-world software projects.'
    : "Backend geliştirme, mikroservisler, REST API'ler ve gerçek dünya projeleri.";

  document.querySelector('meta[name="description"]')?.setAttribute('content', description);
  document.querySelector('meta[property="og:description"]')?.setAttribute('content', socialDescription);

  if (cvLink) {
    cvLink.href = currentLanguage === 'en'
      ? 'src/pdf/MustafaYanmazCv.pdf'
      : 'src/pdf/MustafaYanmazCVTr.pdf';
  }

  if (languageToggle) {
    const switchLabel = currentLanguage === 'en' ? 'Türkçeye geç' : 'Switch to English';
    languageToggle.textContent = currentLanguage === 'en' ? 'TR' : 'EN';
    languageToggle.setAttribute('aria-label', switchLabel);
    languageToggle.title = switchLabel;
  }

  setThemeButton();
  setMobileMenu(mobileMenu?.classList.contains('open') ?? false);
};

languageToggle?.addEventListener('click', () => {
  const nextLanguage = currentLanguage === 'tr' ? 'en' : 'tr';
  localStorage.setItem('portfolio-language', nextLanguage);
  applyLanguage(nextLanguage);
});

applyLanguage(currentLanguage);

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
  const followsMouse = window.matchMedia('(pointer: fine)').matches;
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
    active: false,
  };

  const updateEyeTargets = (timestamp) => {
    eyes.forEach((tracker) => {
      const eyeRect = tracker.eye.getBoundingClientRect();
      const centerX = eyeRect.left + eyeRect.width / 2;
      const centerY = eyeRect.top + eyeRect.height / 2;
      const maxX = eyeRect.width * 0.12;
      const maxUp = eyeRect.height * 0.14;
      const maxDown = eyeRect.height * 0.045;

      if (followsMouse) {
        if (!pointer.active) {
          tracker.targetX = 0;
          tracker.targetY = 0;
          return;
        }

        const deltaX = pointer.x - centerX;
        const deltaY = pointer.y - centerY;
        const distance = Math.hypot(deltaX, deltaY);
        const angle = Math.atan2(deltaY, deltaX);
        const pull = Math.min(distance / 140, 1);
        const verticalLimit = Math.sin(angle) < 0 ? maxUp : maxDown;

        tracker.targetX = Math.cos(angle) * maxX * pull;
        tracker.targetY = Math.sin(angle) * verticalLimit * pull;
        return;
      }

      const mobileVerticalDirection = Math.sin(timestamp / 1750 + 1.2);
      const mobileVerticalLimit = mobileVerticalDirection < 0 ? maxUp : maxDown;
      tracker.targetX = Math.sin(timestamp / 1250) * maxX * 0.8;
      tracker.targetY = mobileVerticalDirection * mobileVerticalLimit * 0.85;
    });
  };

  const animateEyes = (timestamp) => {
    updateEyeTargets(timestamp);

    eyes.forEach((tracker) => {
      tracker.x += (tracker.targetX - tracker.x) * 0.22;
      tracker.y += (tracker.targetY - tracker.y) * 0.22;
      tracker.pupil.style.transform = `translate3d(${tracker.x}px, ${tracker.y}px, 0)`;
    });

    requestAnimationFrame(animateEyes);
  };

  if (followsMouse) {
    window.addEventListener('mousemove', (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
    }, { passive: true });

    document.documentElement.addEventListener('mouseleave', () => {
      pointer.active = false;
    });
  }

  requestAnimationFrame(animateEyes);
}
