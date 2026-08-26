/**
 * ROOF D&D ÜBERDACHUNGSSYSTEME GMBH – MODERN UI PRO V3.2
 * Core Interactive Application Engine
 */

'use strict';

// GSAP Plugins registrieren
gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ─── 1. LENIS SMOOTH SCROLL ENGINE (§ 2) ──────────────────────────
const lenis = new Lenis({
  duration: 0.9,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 1.0,
  touchMultiplier: 1.5,
  syncTouch: false, // PFLICHT: Natives Touch auf Mobilgeräten nicht überschreiben
  autoResize: true,
});

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// Lenis Anker-Links Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    if (targetId && targetId !== '#' && targetId !== '#impressum' && targetId !== '#datenschutz') {
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        lenis.scrollTo(targetEl, { offset: -80, duration: 1.0 });
      }
    }
  });
});

// ─── 2. DARK / LIGHT THEME TOGGLE (§ 20) ─────────────────────────
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('roof_theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);

themeToggle?.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('roof_theme', next);
});

// ─── 3. HEADER PALOMAR SCROLL ENGINE (§ 19) ──────────────────────
const mainNav = document.getElementById('mainNav');
ScrollTrigger.create({
  start: 'top -30',
  onUpdate: (self) => {
    if (mainNav) {
      if (self.progress > 0) {
        mainNav.classList.add('scrolled');
      } else {
        mainNav.classList.remove('scrolled');
      }
    }
  }
});

// ─── 4. HAMBURGER MENÜ MIT MORPHING X (§ 0E) ──────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

function openMobileMenu() {
  hamburger?.classList.add('open');
  hamburger?.setAttribute('aria-expanded', 'true');
  mobileMenu?.classList.add('open');
  mobileMenu?.removeAttribute('aria-hidden');
  document.body.style.overflow = 'hidden';
  if (lenis) lenis.stop();
}

function closeMobileMenu() {
  hamburger?.classList.remove('open');
  hamburger?.setAttribute('aria-expanded', 'false');
  mobileMenu?.classList.remove('open');
  mobileMenu?.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (lenis) lenis.start();
}

hamburger?.addEventListener('click', () => {
  mobileMenu?.classList.contains('open') ? closeMobileMenu() : openMobileMenu();
});

mobileMenu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileMenu?.classList.contains('open')) {
    closeMobileMenu();
  }
});

// ─── 5. KINETIC TYPOGRAPHY (§ 6) ──────────────────────────────────
function initKineticText() {
  const heroTitle = new SplitType('.hero-title', { types: 'lines,words' });
  if (heroTitle.words) {
    gsap.from(heroTitle.words, {
      opacity: 0,
      y: 40,
      rotateX: -15,
      stagger: 0.04,
      duration: 0.85,
      ease: 'power3.out',
      delay: 0.2
    });
  }

  document.querySelectorAll('.section-title').forEach(el => {
    const split = new SplitType(el, { types: 'lines' });
    if (split.lines) {
      gsap.from(split.lines, {
        opacity: 0,
        y: 50,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      });
    }
  });
}

// ─── 6. SCROLL REVEAL ANIMATIONEN (§ 7) ───────────────────────────
function initScrollAnimations() {
  gsap.utils.toArray('[data-animate="fade-up"]').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 50, filter: 'blur(8px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      }
    );
  });
}

// ─── 7. ANIMIERTE COUNTER-ZAHLEN ──────────────────────────────────
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    const target = parseFloat(counter.getAttribute('data-target') || '0');
    const decimals = parseInt(counter.getAttribute('data-decimals') || '0', 10);

    ScrollTrigger.create({
      trigger: counter,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate: () => {
            counter.textContent = obj.val.toFixed(decimals);
          }
        });
      }
    });
  });
}

// ─── 8. STICKY CARD-STACKING EFFEKT (§ 15) ────────────────────────
function initCardStack() {
  if (window.innerWidth <= 900) return; // Mobile Fallback: Sauber untereinander

  const containers = document.querySelectorAll('.card-sticky-container');
  const totalCards = containers.length;

  containers.forEach((container, i) => {
    const card = container.querySelector('.stacking-card');
    if (!card) return;
    const targetScale = 1 - (totalCards - 1 - i) * 0.03;

    gsap.to(card, {
      scale: targetScale,
      scrollTrigger: {
        trigger: container,
        start: 'top top+=90',
        end: () => `+=${container.offsetHeight}`,
        scrub: true,
      }
    });
  });
}

// ─── 9. SCROLL-DRIVEN DUAL MARQUEE (§ 16) ─────────────────────────
function initMarquee() {
  const marqueeSection = document.querySelector('.marquee-section');
  if (!marqueeSection) return;
  const rows = marqueeSection.querySelectorAll('.marquee-row');

  function updateMarquee() {
    const rect = marqueeSection.getBoundingClientRect();
    const offset = (-rect.top + window.innerHeight) * 0.25;

    rows.forEach(row => {
      const dir = row.dataset.direction === 'left' ? -1 : 1;
      const track = row.querySelector('.marquee-track');
      if (track) {
        track.style.transform = `translateX(${dir * offset - 150}px)`;
      }
    });
  }

  window.addEventListener('scroll', updateMarquee, { passive: true });
  updateMarquee();
}

// ─── 10. MAGNETISCHE BUTTONS (§ 8) ────────────────────────────────
function initMagneticButtons() {
  document.querySelectorAll('[data-magnetic]').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
      gsap.to(btn, { x, y, duration: 0.35, ease: 'power2.out' });
    }, { passive: true });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
    });
  });
}

// ─── 11. CUSTOM CURSOR (§ 9) ──────────────────────────────────────
function initCustomCursor() {
  const blob = document.querySelector('.cursor-blob');
  const follower = document.querySelector('.cursor-follower');
  if (!blob || !follower) return;

  window.addEventListener('mousemove', (e) => {
    gsap.to(blob, { x: e.clientX, y: e.clientY, duration: 0.08, ease: 'none' });
    gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.35, ease: 'power2.out' });
  }, { passive: true });

  document.querySelectorAll('a, button, [data-magnetic], input, textarea').forEach(el => {
    el.addEventListener('mouseenter', () => {
      gsap.to(follower, { scale: 2.2, opacity: 0.6, borderColor: 'rgba(6,182,212,0.8)', duration: 0.25 });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(follower, { scale: 1, opacity: 1, borderColor: 'rgba(6,182,212,0.4)', duration: 0.25 });
    });
  });
}

// ─── 12. FAQ AKKORDEON MIT KEYBOARD ARROW NAVIGATION (§ 3) ────────
function initFAQ() {
  const triggers = document.querySelectorAll('.faq-trigger');

  triggers.forEach((btn, i, all) => {
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); all[Math.min(i + 1, all.length - 1)].focus(); }
      if (e.key === 'ArrowUp')   { e.preventDefault(); all[Math.max(i - 1, 0)].focus(); }
      if (e.key === 'Home')      { e.preventDefault(); all[0].focus(); }
      if (e.key === 'End')       { e.preventDefault(); all[all.length - 1].focus(); }
    });

    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item?.classList.contains('open');

      document.querySelectorAll('.faq-item.open').forEach(openItem => {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-trigger')?.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item?.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

// ─── 13. INTERAKTIVER BRANCHENRECHNER (§ 6) ───────────────────────
function updateCalculator() {
  const slider = document.getElementById('calcAreaSlider');
  const display = document.getElementById('calcAreaDisplay');
  const selectedSystem = document.querySelector('[name="calcSystem"]:checked')?.value || 'terrassendach';

  const area = parseInt(slider?.value || '20', 10);
  if (display) display.textContent = area;

  // Quadratmeter-Basispreise
  const rates = {
    terrassendach: { min: 240, max: 340 },
    lamellendach:  { min: 420, max: 590 },
    wintergarten:  { min: 650, max: 980 }
  };

  const currentRate = rates[selectedSystem] || rates.terrassendach;
  let minPrice = area * currentRate.min;
  let maxPrice = area * currentRate.max;

  // Zusatzausstattung
  if (document.getElementById('calcOptLed')?.checked) {
    minPrice += 650; maxPrice += 950;
  }
  if (document.getElementById('calcOptMarkise')?.checked) {
    minPrice += 1400; maxPrice += 2200;
  }
  if (document.getElementById('calcOptSchiebetuer')?.checked) {
    minPrice += 2200; maxPrice += 3800;
  }
  if (document.getElementById('calcOptMontage')?.checked) {
    minPrice += 800; maxPrice += 1200;
  }

  const minEl = document.getElementById('calcMin');
  const maxEl = document.getElementById('calcMax');
  if (minEl) minEl.textContent = Math.round(minPrice).toLocaleString('de-DE');
  if (maxEl) maxEl.textContent = Math.round(maxPrice).toLocaleString('de-DE');
}

function prefillContactForm() {
  const selectedSystem = document.querySelector('[name="calcSystem"]:checked')?.value;
  const area = document.getElementById('calcAreaSlider')?.value;
  
  if (selectedSystem) {
    const radioMap = {
      terrassendach: 'Glas-Terrassendach',
      lamellendach: 'Bioklima-Lamellendach',
      wintergarten: 'Panorama-Wintergarten'
    };
    const radioVal = radioMap[selectedSystem];
    const targetRadio = document.querySelector(`[name="system_typ"][value="${radioVal}"]`);
    if (targetRadio) targetRadio.checked = true;
  }

  const detailsField = document.getElementById('form_details');
  if (detailsField && area) {
    detailsField.value = `Aus dem Rechner übernommen: Ca. ${area} m² Fläche.`;
  }
}

// ─── 14. MULTI-STEP FUNNEL KONTAKTFORMULAR (§ 5) ───────────────────
let currentStep = 1;
const totalSteps = 3;

function updateFunnelProgress() {
  const pct = (currentStep / totalSteps) * 100;
  const bar = document.getElementById('funnelProgressBar');
  const label = document.getElementById('funnelStepLabel');
  if (bar) bar.style.width = `${pct}%`;
  if (label) label.textContent = `Schritt ${currentStep} von ${totalSteps}`;
  document.querySelector('.funnel-progress')?.setAttribute('aria-valuenow', String(currentStep));
}

function funnelNext(step) {
  const currentFieldset = document.getElementById(`step${step}`);
  if (!currentFieldset) return;

  const requiredFields = currentFieldset.querySelectorAll('[required]');
  let isValid = true;

  requiredFields.forEach(field => {
    if (field.type === 'radio') {
      const group = currentFieldset.querySelectorAll(`[name="${field.name}"]`);
      if (![...group].some(r => r.checked)) {
        isValid = false;
        field.closest('.funnel-options')?.classList.add('error');
      }
    } else if (field.type === 'checkbox') {
      if (!field.checked) {
        isValid = false;
        field.classList.add('error');
      }
    } else if (!field.value.trim()) {
      isValid = false;
      field.classList.add('error');
      field.focus();
    } else {
      field.classList.remove('error');
    }
  });

  if (!isValid) return;

  currentFieldset.classList.remove('active');
  currentStep = step + 1;
  const nextFieldset = document.getElementById(`step${currentStep}`);
  nextFieldset?.classList.add('active');
  updateFunnelProgress();
}

function funnelBack(step) {
  document.getElementById(`step${step}`)?.classList.remove('active');
  currentStep = step - 1;
  document.getElementById(`step${currentStep}`)?.classList.add('active');
  updateFunnelProgress();
}

document.getElementById('multistepForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const status = document.getElementById('formStatus');

  const requiredFields = form.querySelectorAll('#step3 [required]');
  let isValid = true;
  requiredFields.forEach(field => {
    if (!field.value.trim() && field.type !== 'checkbox') {
      isValid = false;
      field.classList.add('error');
    } else if (field.type === 'checkbox' && !field.checked) {
      isValid = false;
      field.classList.add('error');
    } else {
      field.classList.remove('error');
    }
  });

  if (!isValid) return;

  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    if (res.ok || form.action.includes('YOUR_FORM_ID')) {
      document.querySelector('.funnel-step.active')?.classList.remove('active');
      document.getElementById('funnelSuccess')?.classList.remove('hidden');
      if (status) status.textContent = 'Ihre Anfrage wurde erfolgreich übertragen.';
    } else {
      if (status) status.textContent = 'Fehler beim Absenden. Bitte rufen Sie uns direkt unter 0821 4544735 an.';
    }
  } catch {
    document.querySelector('.funnel-step.active')?.classList.remove('active');
    document.getElementById('funnelSuccess')?.classList.remove('hidden');
  }
});

// ─── 15. LEGAL MODALS: IMPRESSUM & DATENSCHUTZ (§ 9) ───────────────
function openLegalModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  if (lenis) lenis.stop();
  modal.querySelector('.legal-modal-close')?.focus();
}

function closeLegalModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  const isMobileOpen = mobileMenu?.classList.contains('open');
  if (!isMobileOpen) {
    document.body.style.overflow = '';
    if (lenis) lenis.start();
  }
}

function initLegalModals() {
  document.querySelectorAll('a[href="#impressum"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      openLegalModal('impressumModal');
    });
  });

  document.querySelectorAll('a[href="#datenschutz"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      openLegalModal('datenschutzModal');
    });
  });

  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-close-modal');
      if (modalId) closeLegalModal(modalId);
    });
  });

  document.querySelectorAll('.legal-modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeLegalModal(backdrop.id);
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.legal-modal-backdrop.open').forEach(m => closeLegalModal(m.id));
    }
  });

  if (window.location.hash === '#impressum') openLegalModal('impressumModal');
  if (window.location.hash === '#datenschutz') openLegalModal('datenschutzModal');
}

// ─── 16. DSGVO CONSENT MANAGER (§ 2) ───────────────────────────────
const CONSENT_KEY = 'roof_dd_consent_v1';
const consentBanner = document.getElementById('consentBanner');
const storedConsent = localStorage.getItem(CONSENT_KEY);

function applyConsent(accepted) {
  if (accepted) {
    document.querySelectorAll('iframe[data-src]').forEach(iframe => {
      iframe.src = iframe.dataset.src;
      delete iframe.dataset.src;
    });
    const placeholder = document.getElementById('mapsPlaceholder');
    if (placeholder) placeholder.style.display = 'none';
  }
  consentBanner?.classList.add('hidden');
}

if (storedConsent === 'accepted') {
  applyConsent(true);
} else if (storedConsent === 'rejected') {
  applyConsent(false);
} else {
  consentBanner?.classList.remove('hidden');
}

document.getElementById('consentAccept')?.addEventListener('click', () => {
  localStorage.setItem(CONSENT_KEY, 'accepted');
  applyConsent(true);
});

document.getElementById('consentReject')?.addEventListener('click', () => {
  localStorage.setItem(CONSENT_KEY, 'rejected');
  applyConsent(false);
});

document.getElementById('consentSettings')?.addEventListener('click', () => {
  localStorage.setItem(CONSENT_KEY, 'accepted');
  applyConsent(true);
});

document.getElementById('cookieSettingsLink')?.addEventListener('click', (e) => {
  e.preventDefault();
  localStorage.removeItem(CONSENT_KEY);
  consentBanner?.classList.remove('hidden');
});

// ─── 17. INITIALISIERUNG ──────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  updateCalculator();
  initFAQ();
  initLegalModals();

  if (!prefersReducedMotion) {
    initKineticText();
    initScrollAnimations();
    initCounters();
    initCardStack();
    initMarquee();
    initMagneticButtons();
    initCustomCursor();
  }
});

// Global exposen für HTML onclick Events
window.updateCalculator = updateCalculator;
window.prefillContactForm = prefillContactForm;
window.funnelNext = funnelNext;
window.funnelBack = funnelBack;
