(function () {
  const loading = document.getElementById('loadingScreen');
  const navToggle = document.getElementById('navToggle');
  const navOverlay = document.getElementById('navOverlay');
  const sideDots = document.getElementById('sideDots');
  const burgerTop = document.getElementById('burgerTop');
  const burgerMid = document.getElementById('burgerMid');
  const burgerBot = document.getElementById('burgerBot');
  const toast = document.getElementById('toast');
  const contactForm = document.getElementById('contactForm');

  // Loading screen
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (loading) {
        loading.style.transition = 'opacity 0.8s ease';
        loading.style.opacity = '0';
        setTimeout(() => loading.remove(), 900);
      }
    }, 2200);
  });

  // Smooth anchor behavior (for regular anchors)
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href')?.slice(1);
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth' });
  });

  // Nav toggle
  let navOpen = false;
  function setBurger(open) {
    if (!burgerTop || !burgerMid || !burgerBot) return;
    if (open) {
      burgerTop.style.transform = 'rotate(45deg) translateY(6px)';
      burgerMid.style.opacity = '0';
      burgerBot.style.transform = 'rotate(-45deg) translateY(-6px)';
    } else {
      burgerTop.style.transform = 'rotate(0deg) translateY(0px)';
      burgerMid.style.opacity = '1';
      burgerBot.style.transform = 'rotate(0deg) translateY(0px)';
    }
  }

  function openNav() {
    navOpen = true;
    if (navOverlay) {
      navOverlay.classList.remove('hidden');
      navOverlay.classList.add('flex');
    }
    if (sideDots) sideDots.style.opacity = '0';
    setBurger(true);
  }

  function closeNav() {
    navOpen = false;
    if (navOverlay) {
      navOverlay.classList.add('hidden');
      navOverlay.classList.remove('flex');
    }
    if (sideDots) sideDots.style.opacity = '';
    setBurger(false);
  }

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navOpen ? closeNav() : openNav();
    });
  }

  // Overlay nav item clicks
  document.querySelectorAll('.nav-item').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-target');
      const el = id ? document.getElementById(id) : null;
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      closeNav();
    });
  });

  // Side dot clicks
  document.querySelectorAll('.dot-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-target');
      const el = id ? document.getElementById(id) : null;
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Close overlay on ESC
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navOpen) closeNav();
  });

  // Scroll spy for active section
  const sections = ['intro', 'about', 'skills', 'projects', 'workflow', 'contact'];
  function updateActive() {
    const pos = window.scrollY + window.innerHeight / 3;
    let active = sections[0];
    for (const id of sections) {
      const el = document.getElementById(id);
      if (!el) continue;
      const top = el.offsetTop;
      const h = el.offsetHeight;
      if (pos >= top && pos < top + h) {
        active = id;
        break;
      }
    }

    // Side dots
    document.querySelectorAll('.dot-btn').forEach((btn) => {
      const id = btn.getAttribute('data-target');
      const dot = btn.querySelector('.dot');
      const label = btn.querySelector('.dot-label');
      if (!dot || !label) return;
      const isActive = id === active;
      dot.classList.toggle('dot-active', isActive);
      label.classList.toggle('dot-label-active', isActive);
    });

    // Overlay active color
    document.querySelectorAll('.nav-item').forEach((btn) => {
      const id = btn.getAttribute('data-target');
      btn.classList.toggle('text-primary', id === active);
      btn.classList.toggle('text-foreground', id !== active);
    });
  }
  window.addEventListener('scroll', updateActive, { passive: true });
  window.addEventListener('resize', updateActive);
  updateActive();

  // Skills bars animate when section enters view
  const skillBars = document.querySelectorAll('.skill');
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const skill = entry.target;
        const level = skill.getAttribute('data-level');
        const bar = skill.querySelector('.skill-bar');
        if (bar && level) {
          bar.style.transition = 'width 1s ease';
          bar.style.width = level + '%';
        }
        io.unobserve(skill);
      });
    },
    { threshold: 0.35 }
  );
  skillBars.forEach((s) => io.observe(s));

  // Contact form (toast)
  function showToast() {
    if (!toast) return;
    toast.classList.remove('hidden');
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(8px)';
    requestAnimationFrame(() => {
      toast.style.transition = 'opacity 250ms ease, transform 250ms ease';
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0px)';
    });
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(8px)';
      setTimeout(() => toast.classList.add('hidden'), 260);
    }, 2400);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast();
      contactForm.reset();
    });
  }
})();

const navToggle = document.getElementById("navToggle");
const navOverlay = document.getElementById("navOverlay");
const menuIcon = document.getElementById("menuIcon");

navToggle.addEventListener("click", () => {
  navOverlay.classList.toggle("hidden");
  menuIcon.classList.toggle("rotate-90");
});



