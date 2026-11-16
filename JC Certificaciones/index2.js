document.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  /* -------------------------------------------------------------
     1. Menú Móvil
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
     2. Carrusel Hero
  ------------------------------------------------------------- */
  const heroSlides = document.querySelectorAll('.hero-slide');
  let currentHeroIndex = 0;

  if (heroSlides.length > 0) {
    setInterval(() => {
      currentHeroIndex = (currentHeroIndex + 1) % heroSlides.length;
      heroSlides.forEach((slide, i) => {
        if (i === currentHeroIndex) {
          slide.classList.remove('opacity-0', 'scale-100');
          slide.classList.add('opacity-100', 'scale-105');
        } else {
          slide.classList.remove('opacity-100', 'scale-105');
          slide.classList.add('opacity-0', 'scale-100');
        }
      });
    }, 5500);
  }

  /* -------------------------------------------------------------
     3. Verificador Rápido en 3 Clics
  ------------------------------------------------------------- */
  const rubroSelect = document.getElementById('quick-rubro');
  const alimentacionSelect = document.getElementById('quick-alimentacion');
  const estadoSelect = document.getElementById('quick-estado');
  const resultTitle = document.getElementById('quick-result-title');
  const resultDesc = document.getElementById('quick-result-desc');
  const quickWaBtn = document.getElementById('quick-whatsapp-btn');

  function actualizarDiagnostico() {
    if (!rubroSelect) return;
    const rubro = rubroSelect.value;
    const alim = alimentacionSelect.value;
    const tramite = estadoSelect.value;

    if (tramite === 'vigilancia') {
      resultTitle.textContent = 'Mantenimiento de Vigilancias de Mercado (Seguridad Eléctrica / Eficiencia)';
      resultDesc.textContent = 'Gestionamos las auditorías y el envío y seguimiento de muestras en laboratorios acreditados para mantener vigentes tus licencias.';
      return;
    }

    if (tramite === 'cesion') {
      resultTitle.textContent = 'Cesiones y Extensiones de Licencias Vigentes';
      resultDesc.textContent = 'Tramitamos la cesión de certificados existentes o la extensión de familia de modelos sin reiniciar todo el proceso desde cero.';
      return;
    }

    if (tramite === 'aduana_manual') {
      resultTitle.textContent = 'Gestión Aduanera (Buenos Aires / Rosario) + Traducción de Manuales';
      resultDesc.textContent = 'Coordinamos la liberación aduanera en Buenos Aires o Rosario y realizamos la traducción técnica normativa de manuales al español.';
      return;
    }

    if (alim === 'gas') {
      resultTitle.textContent = 'Certificación de Productos a Gas + Ensayos en Laboratorio Acreditado';
      resultDesc.textContent = 'Homologación integral para cocinas y artefactos a gas, seguimiento de ensayos en laboratorio, gestión aduanera y manuales en español.';
      return;
    }

    if (rubro === 'comercial') {
      resultTitle.textContent = 'Línea Comercial: Exhibidoras Verticales y Tapa Vidrio';
      resultDesc.textContent = 'Certificación de Seguridad Eléctrica y Eficiencia Energética, seguimiento en laboratorio acreditado y mantenimiento de vigilancias.';
      return;
    }

    if (rubro === 'refrigeracion') {
      resultTitle.textContent = 'Refrigeración Comercial: Forzadores, Ventiladores y Aires Separados';
      resultDesc.textContent = 'Ensayos técnicos para forzadores axiales, tangenciales y electrónicos, ventiladores axiales y equipos de aire acondicionado de unidades separadas.';
      return;
    }

    resultTitle.textContent = 'Línea Hogar: Seguridad Eléctrica + Eficiencia Energética / Gas';
    resultDesc.textContent = 'Coordinamos ensayos en laboratorios acreditados para heladeras, freezers, lavarropas, lavasecarropas, secadoras y cocinas, junto con el seguimiento de vigilancias.';
  }

  if (rubroSelect && alimentacionSelect && estadoSelect) {
    rubroSelect.addEventListener('change', actualizarDiagnostico);
    alimentacionSelect.addEventListener('change', actualizarDiagnostico);
    estadoSelect.addEventListener('change', actualizarDiagnostico);

    if (quickWaBtn) {
      quickWaBtn.addEventListener('click', () => {
        const rubroTexto = rubroSelect.options[rubroSelect.selectedIndex].text;
        const alimTexto = alimentacionSelect.options[alimentacionSelect.selectedIndex].text;
        const tramiteTexto = estadoSelect.options[estadoSelect.selectedIndex].text;

        const msj = `*Consulta Rápida - JC Certificación de Importaciones y Exportaciones*\n\n` +
          `• *Línea/Producto:* ${rubroTexto}\n` +
          `• *Aduana/Energía:* ${alimTexto}\n` +
          `• *Trámite:* ${tramiteTexto}\n\n` +
          `Hola Juan, utilicé el verificador web y quisiera asesoramiento técnico y presupuesto.`;

        window.open(`https://wa.me/5493416914539?text=${encodeURIComponent(msj)}`, '_blank');
      });
    }
  }

  /* -------------------------------------------------------------
     4. Pestañas de Líneas de Productos
  ------------------------------------------------------------- */
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');

      tabButtons.forEach((b) => {
        b.classList.remove('active', 'bg-brand-blue', 'text-white', 'border-brand-blue');
        b.classList.add('bg-brand-navy', 'text-slate-200', 'border-slate-700');
      });

      btn.classList.add('active', 'bg-brand-blue', 'text-white', 'border-brand-blue');
      btn.classList.remove('bg-brand-navy', 'text-slate-200', 'border-slate-700');

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
     5. Formulario: Validación, Registro y WhatsApp
  ------------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  const consentCheckbox = document.getElementById('form-consent');
  const formPrivacyBtn = document.getElementById('form-open-privacy');
  const modalPrivacy = document.getElementById('modal-privacy');

  if (formPrivacyBtn && modalPrivacy) {
    formPrivacyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      modalPrivacy.classList.remove('hidden');
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (consentCheckbox && !consentCheckbox.checked) {
        alert('Por favor, seleccioná la casilla aceptando las políticas de privacidad.');
        consentCheckbox.focus();
        return;
      }

      const leadData = {
        fecha: new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' }),
        nombre: document.getElementById('form-nombre').value.trim(),
        empresa: document.getElementById('form-empresa').value.trim() || 'No especificada',
        servicio: document.getElementById('form-servicio').value,
        rubro: document.getElementById('form-rubro').value,
        mensaje: document.getElementById('form-mensaje').value.trim(),
        consentimiento: 'Aceptado por el usuario'
      };

      try {
        await fetch('https://script.google.com/macros/s/AKfycbxIvdDWrh88g1VjjvIkX8xdBOw2g4lo1XyCHkDj1jvdZKUMhIXkIfBO5iiL7hdwyVIoVw/exec', {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(leadData)
        });
      } catch (err) {
        console.warn('Registro ejecutado:', err);
      }

      const textoWhatsApp = 
        `*Consulta Web - JC Certificación de Importaciones y Exportaciones*\n\n` +
        `• *Nombre:* ${leadData.nombre}\n` +
        `• *Empresa:* ${leadData.empresa}\n` +
        `• *Gestión:* ${leadData.servicio}\n` +
        `• *Línea/Producto:* ${leadData.rubro}\n\n` +
        `• *Detalle:* ${leadData.mensaje}`;

      const url = `https://wa.me/5493416914539?text=${encodeURIComponent(textoWhatsApp)}`;
      window.open(url, '_blank');
    });
  }

  /* -------------------------------------------------------------
     6. Control de Modales Legales
  ------------------------------------------------------------- */
  const openPrivacyBtn = document.getElementById('open-privacy-btn');
  const openTermsBtn = document.getElementById('open-terms-btn');
  const modalTerms = document.getElementById('modal-terms');
  const closeButtons = document.querySelectorAll('.close-modal');

  if (openPrivacyBtn && modalPrivacy) {
    openPrivacyBtn.addEventListener('click', () => modalPrivacy.classList.remove('hidden'));
  }
  if (openTermsBtn && modalTerms) {
    openTermsBtn.addEventListener('click', () => modalTerms.classList.remove('hidden'));
  }

  closeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-modal');
      const targetModal = document.getElementById(modalId);
      if (targetModal) targetModal.classList.add('hidden');
    });
  });

  [modalPrivacy, modalTerms].forEach((modal) => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.add('hidden');
      });
    }
  });

  /* -------------------------------------------------------------
     7. Carruseles Individuales de Productos (Automático + Manual)
  ------------------------------------------------------------- */
  const productCarousels = document.querySelectorAll('.product-carousel');

  productCarousels.forEach((carousel) => {
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.carousel-dots button');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    const captionEl = carousel.querySelector('.carousel-caption');
    const intervalMs = parseInt(carousel.getAttribute('data-interval') || '4000', 10);

    let currentIndex = 0;
    let timer = null;

    function goToSlide(index) {
      currentIndex = (index + slides.length) % slides.length;

      slides.forEach((slide, i) => {
        if (i === currentIndex) {
          slide.classList.remove('opacity-0', 'z-0');
          slide.classList.add('opacity-100', 'z-10');
          if (captionEl) {
            captionEl.textContent = slide.getAttribute('data-caption') || '';
          }
        } else {
          slide.classList.remove('opacity-100', 'z-10');
          slide.classList.add('opacity-0', 'z-0');
        }
      });

      dots.forEach((dot, i) => {
        if (i === currentIndex) {
          dot.className = 'w-2.5 h-2.5 rounded-full bg-brand-accent transition cursor-pointer';
        } else {
          dot.className = 'w-2 h-2 rounded-full bg-white/40 hover:bg-white/70 transition cursor-pointer';
        }
      });
    }

    function startAutoplay() {
      stopAutoplay();
      timer = setInterval(() => {
        goToSlide(currentIndex + 1);
      }, intervalMs);
    }

    function stopAutoplay() {
      if (timer) clearInterval(timer);
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
        startAutoplay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
        startAutoplay();
      });
    }

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        goToSlide(i);
        startAutoplay();
      });
    });

    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);

    startAutoplay();
  });
});
