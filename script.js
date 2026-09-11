document.addEventListener("DOMContentLoaded", function () {

    const themeButton = document.getElementById("theme-toggle");

    if (!themeButton) {
        console.log("Tema butonu bulunamadı.");
        return;
    }

    const icon = themeButton.querySelector("i");

    // Kayıtlı temayı aç
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");

        if (icon) {
            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");
        }
    }

    themeButton.addEventListener("click", function () {

        document.body.classList.toggle("dark-mode");

        const darkMode = document.body.classList.contains("dark-mode");

        localStorage.setItem("theme", darkMode ? "dark" : "light");

        if (icon) {

            if (darkMode) {
                icon.classList.remove("fa-moon");
                icon.classList.add("fa-sun");
            } else {
                icon.classList.remove("fa-sun");
                icon.classList.add("fa-moon");
            }

        }

    });

});


// ========================================
// SMOOTH SCROLL
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(function (link) {

        link.addEventListener("click", function (e) {

            // KVKK linkini burada işleme
            if (this.id === "kvkk-link") {
                return;
            }

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const targetSection = document.querySelector(targetId);

            if (targetSection) {

                e.preventDefault();

                const navbar = document.querySelector(".navbar");
                const navHeight = navbar ? navbar.offsetHeight : 0;

                const targetPosition =
                    targetSection.getBoundingClientRect().top +
                    window.pageYOffset -
                    navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });

            }

        });

    });

});


// ========================================
// LOADER
// ========================================

window.addEventListener("load", function () {

    const loaderWrapper = document.querySelector(".loader-wrapper");

    if (loaderWrapper) {

        setTimeout(function () {
            loaderWrapper.classList.add("fade-out");
        }, 300);

    }

});




// ========================================
// KVKK MODAL
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    const kvkkLink = document.getElementById("kvkk-link");
    const kvkkOverlay = document.getElementById("kvkk-overlay");
    const kvkkClose = document.getElementById("kvkk-close");
    const kvkkOk = document.getElementById("kvkk-ok");

    // Gerekli HTML yoksa dur
    if (!kvkkLink || !kvkkOverlay) {
        console.log("KVKK modal elemanları bulunamadı.");
        return;
    }

    // -------------------------
    // AÇ
    // -------------------------

    kvkkLink.addEventListener("click", function (e) {

        e.preventDefault();

        kvkkOverlay.classList.add("active");

        document.body.classList.add("modal-open");

    });


    // -------------------------
    // KAPAT
    // -------------------------

    function closeKvkk() {

        kvkkOverlay.classList.remove("active");

        document.body.classList.remove("modal-open");

    }


    // X
    if (kvkkClose) {

        kvkkClose.addEventListener("click", function () {
            closeKvkk();
        });

    }


    // Anladım
    if (kvkkOk) {

        kvkkOk.addEventListener("click", function () {
            closeKvkk();
        });

    }


    // Karanlık alana tıklayınca
    kvkkOverlay.addEventListener("click", function (e) {

        if (e.target === kvkkOverlay) {
            closeKvkk();
        }

    });


    // ESC
    document.addEventListener("keydown", function (e) {

        if (e.key === "Escape") {
            closeKvkk();
        }

    });

});
// ==========================================
// ÖN GÖRÜŞME FORMU - GOOGLE SHEETS
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("on-gorusme-form");

    if (!form) return;

    // FORM DAHA ÖNCE BAĞLANDIYSA TEKRAR BAĞLAMA
    if (form.dataset.googleHandlerAttached === "true") {
        return;
    }

    form.dataset.googleHandlerAttached = "true";

    let isSubmitting = false;

    form.addEventListener("submit", async function (e) {

        e.preventDefault();
        e.stopImmediatePropagation();

        // İKİNCİ GÖNDERİYİ ENGELLE
        if (isSubmitting) return;

        isSubmitting = true;

        const button = form.querySelector('button[type="submit"]');

        if (button) {
            button.disabled = true;
            button.textContent = "Gönderiliyor...";
        }

        try {

            await fetch(form.action, {
                method: "POST",
                body: new FormData(form),
                mode: "no-cors"
            });

            form.reset();

            if (button) {
                button.textContent = "Gönderildi ✓";
            }

            // BAŞARI MESAJI
            const toast = document.createElement("div");

            toast.className = "success-toast";

            toast.innerHTML = `
                <i class="fa-solid fa-circle-check"></i>
                Mesajınız başarıyla gönderildi!
            `;

            document.body.appendChild(toast);

            setTimeout(function () {
                toast.classList.add("show");
            }, 50);

            setTimeout(function () {

                toast.classList.remove("show");

                setTimeout(function () {
                    toast.remove();
                }, 300);

            }, 3000);

            // BUTONU ESKİ HALİNE GETİR
            setTimeout(function () {

                if (button) {
                    button.disabled = false;
                    button.textContent = "Gönder!";
                }

                isSubmitting = false;

            }, 2000);

        } catch (error) {

            console.error("Form gönderme hatası:", error);

            if (button) {
                button.disabled = false;
                button.textContent = "Gönder!";
            }

            isSubmitting = false;
        }

    });

});