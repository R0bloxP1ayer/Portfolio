document.addEventListener('DOMContentLoaded', function () {

  const navbar = document.getElementById('navbar');
  function updateNavbar() {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }
  updateNavbar();
  window.addEventListener('scroll', updateNavbar, { passive: true });

  const navToggle = document.getElementById('navToggle');
  if (navToggle) {
    navToggle.addEventListener('click', function () {
      const isOpen = navbar.classList.toggle('mobile-open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    document.querySelectorAll('.nav-tabs-mobile a').forEach(function (link) {
      link.addEventListener('click', function () {
        navbar.classList.remove('mobile-open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const sections = ['home', 'about', 'work', 'contact']
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);
  const tabs = document.querySelectorAll('.nav-tabs .tab');

  function setActiveTab(id) {
    tabs.forEach(function (tab) {
      tab.classList.toggle('active', tab.dataset.tab === id);
    });
  }

  if ('IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActiveTab(entry.target.id);
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(function (section) { navObserver.observe(section); });
  }

  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const filter = btn.dataset.filter;

      filterBtns.forEach(function (b) {
        b.classList.toggle('active', b === btn);
        b.setAttribute('aria-selected', b === btn ? 'true' : 'false');
      });

      projectCards.forEach(function (card, i) {
        const match = filter === 'all' || card.dataset.category === filter;
        if (match) {
          card.classList.remove('hidden');
          card.style.animationDelay = (i * 0.05) + 's';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -80px 0px', threshold: 0.05 });

    document.querySelectorAll('.reveal').forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {

    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('visible');
    });
  }

  if ('IntersectionObserver' in window) {
    const skillObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          skillObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -60px 0px', threshold: 0.1 });

    document.querySelectorAll('.skill-item').forEach(function (el) {
      skillObserver.observe(el);
    });
  } else {
    document.querySelectorAll('.skill-item').forEach(function (el) {
      el.classList.add('visible');
    });
  }

});