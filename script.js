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
// Sınav Tarihleri (Yıl-Ay-Gün Saat:Dakika:Saniye)
const examDates = {
  YKS: "2027-06-20T10:15:00",
  KPSS: "2027-07-18T10:15:00",
  AGS: "2027-09-12T10:00:00",
  DGS: "2027-07-04T10:15:00",
  ALES: "2027-04-18T10:15:00",
  LGS: "2027-06-06T09:30:00"
};

let timerInterval = null;
let selectedExam = "YKS";

// Modalı Aç / Kapat
function toggleModal(show) {
  const modal = document.getElementById("examModal");
  if (show) {
    modal.classList.add("active");
    startCountdown();
  } else {
    modal.classList.remove("active");
    clearInterval(timerInterval);
  }
}

// Seçilen Sınav Değiştiğinde
function changeExam() {
  const selector = document.getElementById("examSelector");
  selectedExam = selector.value;
  document.getElementById("examTitle").innerText = `${selectedExam}'ye Kalan Süre`;
  startCountdown();
}

// Canlı Geri Sayım Mantığı
function startCountdown() {
  clearInterval(timerInterval);

  function updateTimer() {
    const targetDate = new Date(examDates[selectedExam]).getTime();
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
      document.getElementById("days").innerText = "00";
      document.getElementById("hours").innerText = "00";
      document.getElementById("minutes").innerText = "00";
      document.getElementById("seconds").innerText = "00";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days < 10 ? '0' + days : days;
    document.getElementById("hours").innerText = hours < 10 ? '0' + hours : hours;
    document.getElementById("minutes").innerText = minutes < 10 ? '0' + minutes : minutes;
    document.getElementById("seconds").innerText = seconds < 10 ? '0' + seconds : seconds;
  }

  updateTimer();
  timerInterval = setInterval(updateTimer, 1000);
}

// Modal dışına tıklayınca kapatma
window.onclick = function(event) {
  const modal = document.getElementById("examModal");
  if (event.target === modal) {
    toggleModal(false);
  }
};
// Modal Açma / Kapama İşlemleri
const modal = document.getElementById('sinavModal');
const btn = document.getElementById('sinavTakvimiBtn');
const closeBtn = document.getElementById('modalKapat');

if (btn) {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'flex';
    });
}

if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
}

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Canlı Sayaç Motoru
const sinavTarihleri = {
    'yks': '2027-06-20T10:15:00',
    'lgs': '2027-06-06T09:30:00',
    'kpss-lisans': '2027-07-18T10:15:00',
    'kpss-onlisans': '2026-10-04T10:15:00',
    'kpss-ortaoğretim': '2026-10-25T10:15:00',
    'ales': '2026-11-22T10:15:00',
    'dgs': '2027-07-04T10:15:00',
    'ags': '2027-09-12T10:15:00'
};

function sayaciGuncelle() {
    const simdi = new Date().getTime();

    for (const [key, tarihStr] of Object.entries(sinavTarihleri)) {
        const hedefTarih = new Date(tarihStr).getTime();
        const fark = hedefTarih - simdi;

        const el = document.getElementById(`timer-${key}`);
        if (!el) continue;

        if (fark <= 0) {
            el.innerHTML = "Sınav Yapıldı / Tamamlandı";
            continue;
        }

        const gun = Math.floor(fark / (1000 * 60 * 60 * 24));
        const saat = Math.floor((fark % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const dakika = Math.floor((fark % (1000 * 60 * 60)) / (1000 * 60));
        const saniye = Math.floor((fark % (1000 * 60)) / 1000);

        el.innerHTML = `${gun}g ${saat}s ${dakika}d ${saniye}s`;
    }
}

setInterval(sayaciGuncelle, 1000);
sayaciGuncelle();
const modal = document.getElementById('sinavModal');
const btn = document.getElementById('sinavTakvimiBtn');
const closeBtn = document.getElementById('modalKapat');

if (btn) {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('active'); // Pop-up'ı ekranda ortalar
    });
}

if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active'); // Kapatır
    });
}

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});
window.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('sinavModal');
    const btn = document.getElementById('openExamCalendar');
    const closeBtn = document.getElementById('modalKapat');

    if (btn) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (modal) modal.style.display = 'flex';
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            if (modal) modal.style.display = 'none';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    window.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('sinavModal');
    const btn = document.getElementById('openExamCalendar');
    const closeBtn = document.getElementById('modalKapat');

    if (btn) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (modal) modal.style.display = 'flex';
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            if (modal) modal.style.display = 'none';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Görseldeki Hedef Tarihe Göre Güncellenmiş Sınav Tarihleri
    const sinavTarihleri = {
        'yks': '2027-06-19T10:15:00',             // 19 Haziran 2027 Saat 10:15
        'lgs': '2027-06-06T09:30:00',
        'kpss-lisans': '2027-07-18T10:15:00',
        'kpss-onlisans': '2026-10-04T10:15:00',
        'kpss-ortaoğretim': '2026-10-25T10:15:00',
        'ales': '2026-11-29T10:15:00',
        'dgs': '2027-07-04T10:15:00',
        'ags': '2027-09-12T10:15:00'
    };

    function sayaciGuncelle() {
        const simdi = new Date().getTime();

        for (const [key, tarihStr] of Object.entries(sinavTarihleri)) {
            const hedefTarih = new Date(tarihStr).getTime();
            const fark = hedefTarih - simdi;

            const el = document.getElementById(`timer-${key}`);
            if (!el) continue;

            if (fark <= 0) {
                el.innerHTML = "Sınav Tamamlandı";
                continue;
            }

            const gun = Math.floor(fark / (1000 * 60 * 60 * 24));
            const saat = Math.floor((fark % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const dakika = Math.floor((fark % (1000 * 60 * 60)) / (1000 * 60));
            const saniye = Math.floor((fark % (1000 * 60)) / 1000);

            el.innerHTML = `${gun}g ${saat}s ${dakika}d ${saniye}s`;
        }
    }

    setInterval(sayaciGuncelle, 1000);
    sayaciGuncelle();
});