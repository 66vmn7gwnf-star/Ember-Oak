
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");

if (navToggle && navMenu) {

    navToggle.addEventListener("click", () => {

        const isOpen = navMenu.classList.toggle("active");

        navToggle.classList.toggle("active", isOpen);
        navToggle.setAttribute("aria-expanded", isOpen);

    });

    navMenu.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");
            navToggle.classList.remove("active");
            navToggle.setAttribute("aria-expanded", "false");

        });

    });

}
