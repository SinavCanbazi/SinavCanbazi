// ==========================================
// GENEL HATA YAKALAMA
// ==========================================

window.addEventListener('error', function (e) {
    console.warn(
        'Hata yakalandı, sayfa çalışmaya devam ediyor:',
        e.message
    );
});


// ==========================================
// THROTTLE
// ==========================================

function throttle(func, limit) {
    let inThrottle = false;

    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;

            setTimeout(() => {
                inThrottle = false;
            }, limit);
        }
    };
}


// ==========================================
// SCROLL
// ==========================================

window.addEventListener(
    'scroll',
    throttle(function () {
        // Scroll işlemleri buraya eklenebilir
    }, 100)
);


// ==========================================
// TEMA DEĞİŞTİRME
// ==========================================

document.addEventListener('DOMContentLoaded', function () {

    const themeToggleBtn = document.getElementById('theme-toggle');

    if (!themeToggleBtn) return;

    themeToggleBtn.addEventListener('click', function () {

        document.body.classList.toggle('dark-mode');

        const icon = themeToggleBtn.querySelector('i');

        if (!icon) return;

        if (document.body.classList.contains('dark-mode')) {

            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');

        } else {

            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');

        }
    });

});


// ==========================================
// SMOOTH SCROLL
// ==========================================

document.addEventListener('DOMContentLoaded', function () {

    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(function (link) {

        link.addEventListener('click', function (e) {

            const targetId = this.getAttribute('href');

            // Boş # linklerini engelle
            if (!targetId || targetId === '#') {
                return;
            }

            // KVKK gibi özel modal linkleri smooth scroll'a sokma
            if (targetId === '#kvkk') {
                return;
            }

            const targetSection = document.querySelector(targetId);

            if (!targetSection) {
                return;
            }

            e.preventDefault();

            const navbar = document.querySelector('.navbar');
            const navHeight = navbar ? navbar.offsetHeight : 0;

            const targetPosition =
                targetSection.getBoundingClientRect().top +
                window.pageYOffset -
                navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

        });

    });

});


// ==========================================
// SAYFA YÜKLENME ANİMASYONU
// ==========================================

window.addEventListener('load', function () {

    const loaderWrapper = document.querySelector('.loader-wrapper');

    if (!loaderWrapper) return;

    setTimeout(function () {
        loaderWrapper.classList.add('fade-out');
    }, 300);

});


// ==========================================
// FORMSPREE İLETİŞİM FORMU
// ==========================================

document.addEventListener('DOMContentLoaded', function () {

    const form = document.getElementById('my-form');
    const status = document.getElementById('form-status');
    const btn = document.getElementById('form-btn');

    if (!form) return;

    form.addEventListener('submit', async function (event) {

        event.preventDefault();

        const data = new FormData(form);

        // Butonu kilitle
        if (btn) {
            btn.disabled = true;
            btn.innerHTML =
                '<i class="fa-solid fa-spinner fa-spin"></i> Gönderiliyor...';
        }

        try {

            const response = await fetch(form.action, {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {

                if (status) {
                    status.className = 'success';

                    status.innerHTML =
                        '<i class="fa-solid fa-circle-check" style="font-size:20px;"></i> ' +
                        'Harika! Mesajın alındı, en kısa sürede dönüş yapacağım.';
                }

                form.reset();

            } else {

                if (status) {
                    status.className = 'error';

                    status.innerHTML =
                        '<i class="fa-solid fa-circle-exclamation" style="font-size:20px;"></i> ' +
                        'Bir sorun oluştu, lütfen tekrar deneyin.';
                }

            }

        } catch (error) {

            console.error('Form gönderme hatası:', error);

            if (status) {
                status.className = 'error';

                status.innerHTML =
                    '<i class="fa-solid fa-wifi" style="font-size:20px;"></i> ' +
                    'Bağlantı hatası! İnternetinizi kontrol edin.';
            }

        } finally {

            // Her durumda butonu tekrar aktif et
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = 'Mesaj Gönder';
            }

        }

    });

});


// ==========================================
// KVKK MODAL
// ==========================================

document.addEventListener('DOMContentLoaded', function () {

    const kvkkLink = document.getElementById('kvkk-link');
    const kvkkOverlay = document.getElementById('kvkk-overlay');
    const kvkkClose = document.getElementById('kvkk-close');
    const kvkkOk = document.getElementById('kvkk-ok');

    if (!kvkkLink || !kvkkOverlay) {
        return;
    }


    // ------------------------------
    // MODALI AÇ
    // ------------------------------

    function openKvkk(event) {

        if (event) {
            event.preventDefault();
        }

        kvkkOverlay.classList.add('active');

        // Sayfanın arkada kaymasını engelle
        document.body.style.overflow = 'hidden';
    }


    // ------------------------------
    // MODALI KAPAT
    // ------------------------------

    function closeKvkk() {

        kvkkOverlay.classList.remove('active');

        // Sayfanın normal kaydırmasını geri getir
        document.body.style.overflow = '';
    }


    // KVKK linki
    kvkkLink.addEventListener('click', openKvkk);


    // X butonu
    if (kvkkClose) {
        kvkkClose.addEventListener('click', closeKvkk);
    }


    // "Okudum / Kapat" butonu
    if (kvkkOk) {
        kvkkOk.addEventListener('click', closeKvkk);
    }


    // Modal dışındaki karanlık alana tıklama
    kvkkOverlay.addEventListener('click', function (event) {

        if (event.target === kvkkOverlay) {
            closeKvkk();
        }

    });


    // ESC tuşu
    document.addEventListener('keydown', function (event) {

        if (event.key === 'Escape') {
            closeKvkk();
        }

    });

});