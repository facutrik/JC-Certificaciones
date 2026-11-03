document.addEventListener('DOMContentLoaded', () => {
  // Inicialización de iconos Lucide
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  /* -------------------------------------------------------------
     1. Menú Hamburguesa para Móviles
  ------------------------------------------------------------- */
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileNavLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  /* -------------------------------------------------------------
     2. Carrusel de Fondo en Hero Section
  ------------------------------------------------------------- */
  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroIndicators = document.querySelectorAll('#hero-indicators span');
  let currentHeroIndex = 0;
  const slideIntervalTime = 5500;

  function showSlide(index) {
    heroSlides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.remove('opacity-0', 'scale-100');
        slide.classList.add('opacity-100', 'scale-105');
      } else {
        slide.classList.remove('opacity-100', 'scale-105');
        slide.classList.add('opacity-0', 'scale-100');
      }
    });

    heroIndicators.forEach((bar, i) => {
      if (i === index) {
        bar.className = 'w-6 h-0.5 bg-white transition-all duration-300';
      } else {
        bar.className = 'w-2 h-0.5 bg-white/20 transition-all duration-300';
      }
    });
  }

  if (heroSlides.length > 0) {
    setInterval(() => {
      currentHeroIndex = (currentHeroIndex + 1) % heroSlides.length;
      showSlide(currentHeroIndex);
    }, slideIntervalTime);
  }

  /* -------------------------------------------------------------
     3. Pestañas de Rubros y Productos
  ------------------------------------------------------------- */
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');

      tabButtons.forEach((b) => {
        b.classList.remove('active', 'bg-slate-900', 'text-white', 'border-slate-900');
        b.classList.add('bg-white', 'text-slate-600', 'border-slate-200');
      });

      btn.classList.add('active', 'bg-slate-900', 'text-white', 'border-slate-900');
      btn.classList.remove('bg-white', 'text-slate-600', 'border-slate-200');

      tabContents.forEach((content) => {
        if (content.id === targetId) {
          content.classList.remove('hidden');
          content.classList.add('block');
        } else {
          content.classList.remove('block');
          content.classList.add('hidden');
        }
      });
    });
  });

  /* -------------------------------------------------------------
     4. Acordeones de FAQs
  ------------------------------------------------------------- */
  const faqToggles = document.querySelectorAll('.faq-toggle');

  faqToggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
      const content = toggle.nextElementSibling;
      const icon = toggle.querySelector('i');
      const isExpanded = !content.classList.contains('hidden');

      document.querySelectorAll('.faq-content').forEach((item) => {
        item.classList.add('hidden');
      });
      document.querySelectorAll('.faq-toggle i').forEach((item) => {
        item.style.transform = 'rotate(0deg)';
      });

      if (!isExpanded) {
        content.classList.remove('hidden');
        if (icon) icon.style.transform = 'rotate(180deg)';
        toggle.setAttribute('aria-expanded', 'true');
      } else {
        content.classList.add('hidden');
        if (icon) icon.style.transform = 'rotate(0deg)';
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  /* -------------------------------------------------------------
     5. Conexión de Formulario con WhatsApp
  ------------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nombre = document.getElementById('form-nombre').value.trim();
      const empresa = document.getElementById('form-empresa').value.trim();
      const rubro = document.getElementById('form-rubro').value;
      const estado = document.getElementById('form-estado').value;
      const mensaje = document.getElementById('form-mensaje').value.trim();

      const textoWhatsApp = 
        `*Consulta Técnica - JC Gestión*\n\n` +
        `• *Nombre:* ${nombre}\n` +
        `• *Empresa:* ${empresa ? empresa : 'No especificada'}\n` +
        `• *Rubro:* ${rubro}\n` +
        `• *Estado:* ${estado}\n\n` +
        `• *Detalle:* ${mensaje}`;

      const url = `https://wa.me/5493416914539?text=${encodeURIComponent(textoWhatsApp)}`;
      window.open(url, '_blank');
    });
  }
});