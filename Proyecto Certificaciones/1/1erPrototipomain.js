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
    2. Pestañas de Rubros y Productos
  ------------------------------------------------------------- */
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');

        // Alternar estilo en botones
        tabButtons.forEach((b) => {
            b.classList.remove('active', 'bg-brand-navy', 'text-white', 'border-brand-navy');
            b.classList.add('bg-white', 'text-slate-700', 'border-slate-300');
        });

        btn.classList.add('active', 'bg-brand-navy', 'text-white', 'border-brand-navy');
        btn.classList.remove('bg-white', 'text-slate-700', 'border-slate-300');

        // Alternar visibilidad de paneles
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
    3. Acordeones de Preguntas Frecuentes (FAQs)
  ------------------------------------------------------------- */
    const faqToggles = document.querySelectorAll('.faq-toggle');

    faqToggles.forEach((toggle) => {
        toggle.addEventListener('click', () => {
        const content = toggle.nextElementSibling;
        const icon = toggle.querySelector('i');
        const isExpanded = !content.classList.contains('hidden');

        // Cerrar otros acordeones abiertos
        document.querySelectorAll('.faq-content').forEach((item) => {
            item.classList.add('hidden');
        });
        document.querySelectorAll('.faq-toggle i').forEach((item) => {
            item.style.transform = 'rotate(0deg)';
        });

        // Alternar el panel seleccionado
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
        4. Conexión del Formulario con WhatsApp
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
            `*Consulta Web - JC Gestión de Certificaciones*\n\n` +
            `• *Nombre:* ${nombre}\n` +
            `• *Empresa:* ${empresa ? empresa : 'No especificada'}\n` +
            `• *Tipo de producto:* ${rubro}\n` +
            `• *Estado del caso:* ${estado}\n\n` +
            `• *Mensaje/Detalles:* ${mensaje}`;

        const url = `https://wa.me/5493416914539?text=${encodeURIComponent(textoWhatsApp)}`;
        window.open(url, '_blank');
        });
    }
/* -------------------------------------------------------------
    5. Carrusel de Fondo en Hero Section
------------------------------------------------------------- */
    const heroSlides = document.querySelectorAll('.hero-slide');
    const heroIndicators = document.querySelectorAll('#hero-indicators span');
    let currentHeroIndex = 0;
    const slideIntervalTime = 5500; // Cambio cada 5.5 segundos

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

        // Actualizar barras indicadoras
        heroIndicators.forEach((bar, i) => {
        if (i === index) {
            bar.className = 'w-8 h-1 rounded-full bg-brand-accent transition-all duration-300';
        } else {
            bar.className = 'w-2 h-1 rounded-full bg-white/40 transition-all duration-300';
        }
        });
    }

    if (heroSlides.length > 0) {
        setInterval(() => {
        currentHeroIndex = (currentHeroIndex + 1) % heroSlides.length;
        showSlide(currentHeroIndex);
        }, slideIntervalTime);
    }
});