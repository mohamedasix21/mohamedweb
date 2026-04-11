document.addEventListener("DOMContentLoaded", () => {
    // 1. Animaciones de revelado al hacer scroll (Intersection Observer)
    const revealElements = document.querySelectorAll(".reveal");

    const revealOptions = {
        threshold: 0.15, // Porcentaje del elemento que debe ser visible para disparar
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add("active");
                // Opcional: Descomentar la siguiente línea si quieres que la animación se ejecute solo una vez
                observer.unobserve(entry.target); 
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // 2. Menú de navegación móvil (Toggle)
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        
        // Cambiar icono del menú (amburguesa a X)
        const icon = menuToggle.querySelector('i');
        if (navLinks.classList.contains("active")) {
            icon.classList.remove("bx-menu");
            icon.classList.add("bx-x");
        } else {
            icon.classList.remove("bx-x");
            icon.classList.add("bx-menu");
        }
    });

    // 3. Cerrar menú móvil al hacer clic en un enlace
    const enlacesMenu = document.querySelectorAll(".nav-links a");
    enlacesMenu.forEach(enlace => {
        enlace.addEventListener("click", () => {
            if (navLinks.classList.contains("active")) {
                navLinks.classList.remove("active");
                const icon = menuToggle.querySelector('i');
                icon.classList.remove("bx-x");
                icon.classList.add("bx-menu");
            }
        });
    });

    // 4. Resaltar la sección activa en el menú de navegación
    const sections = document.querySelectorAll("section");
    const navItems = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute("id");
            }
        });

        navItems.forEach(item => {
            item.style.color = "var(--text-muted)"; // reset
            if (item.getAttribute("href").includes(current)) {
                if(!item.classList.contains("btn-primary")){
                    item.style.color = "var(--accent-primary)";
                }
            }
        });
    });
});
