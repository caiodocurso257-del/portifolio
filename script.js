/* ==========================================================================
   INTERATIVIDADE E RECURSOS DINÂMICOS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    /* ----------------------------------------------------------------------
       1. ALTERNÂNCIA DE TEMA (DARK / LIGHT MODE) COM LOCALSTORAGE
       ---------------------------------------------------------------------- */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;
    const body = document.body;

    // Recupera tema salvo ou usa escuro como padrão
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark-mode';
    body.className = savedTheme;

    function updateThemeIcon(theme) {
        if (!themeIcon) return;
        if (theme === 'light-mode') {
            themeIcon.className = 'fa-solid fa-sun';
            themeIcon.style.color = '#f59e0b';
        } else {
            themeIcon.className = 'fa-solid fa-moon';
            themeIcon.style.color = 'var(--text-color)';
        }
    }

    updateThemeIcon(savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            if (body.classList.contains('dark-mode')) {
                body.classList.replace('dark-mode', 'light-mode');
                localStorage.setItem('portfolio-theme', 'light-mode');
                updateThemeIcon('light-mode');
            } else {
                body.classList.replace('light-mode', 'dark-mode');
                localStorage.setItem('portfolio-theme', 'dark-mode');
                updateThemeIcon('dark-mode');
            }
        });
    }

    /* ----------------------------------------------------------------------
       2. MENU MOBILE HAMBÚRGUER
       ---------------------------------------------------------------------- */
    const hamburgerBtn = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const isOpen = navMenu.classList.contains('active');
            hamburgerBtn.querySelector('i').className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
        });

        // Fecha o menu ao clicar em qualquer link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburgerBtn.querySelector('i').className = 'fa-solid fa-bars';
            });
        });
    }

    /* ----------------------------------------------------------------------
       3. DESTAQUE DO LINK ATIVO AO ROLAR A PÁGINA (SCROLLSPY)
       ---------------------------------------------------------------------- */
    const sections = document.querySelectorAll('section[id]');

    function highlightActiveSection() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');
            const link = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);

            if (link) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    link.classList.add('active-link');
                } else {
                    link.classList.remove('active-link');
                }
            }
        });
    }
acccc
    window.addEventListener('scroll', highlightActiveSection);

    /* ----------------------------------------------------------------------
       4. ANIMAÇÃO DE REVELAÇÃO SUAVE AO ROLAR (SCROLL REVEAL)
       ---------------------------------------------------------------------- */
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.cyber-card, .skill-card, .project-card, .repo-card, .contact-card, .education-card-premium');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        revealObserver.observe(el);
    });

});