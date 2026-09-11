// Beklenmeyen hatalarda sitenin çökmesini engelle
window.addEventListener('error', function(e) {
    console.warn('Hata yakalandı, sayfa çalışmaya devam ediyor:', e.message);
    return true;
});

// Tıklama ve istek sınırlayıcı (Kilitlenmeyi önler)
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}
// Örnek: Sayfa kaydırma (scroll) veya buton tıklama olaylarını korumaya alma
window.addEventListener('scroll', throttle(function() {
    // Scroll işlemleri burada güvenle çalışır
}, 100));
// Tema değiştirme butonunu buluyoruz
const themeToggleBtn = document.getElementById('theme-toggle');

// Butona tıklandığında çalışacak fonksiyon
themeToggleBtn.addEventListener('click', () => {
    // Body elementine 'dark-mode' class'ını ekler veya çıkarır
    document.body.classList.toggle('dark-mode');
    
    // Butondaki ikonu değiştirme (Ay / Güneş)
    const icon = themeToggleBtn.querySelector('i');
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
});
// FORMSPREE HAVALI BİLDİRİM KUTUSU KODU
const form = document.getElementById("my-form");
const status = document.getElementById("form-status");
const btn = document.getElementById("form-btn");

if (form) {
    async function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        
        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Gönderiliyor...';

        fetch(event.target.action, {
            method: form.method,
            body: data,
            headers: { 'Accept': 'application/json' }
        }).then(response => {
            if (response.ok) {
                status.className = "success";
                status.innerHTML = '<i class="fa-solid fa-circle-check" style="font-size: 20px;"></i> Harika! Mesajın alındı, en kısa sürede dönüş yapacağım.';
                form.reset();
                btn.innerHTML = 'Mesaj Gönder';
                btn.disabled = false;
            } else {
                status.className = "error";
                status.innerHTML = '<i class="fa-solid fa-circle-exclamation" style="font-size: 20px;"></i> Bir sorun oluştu, lütfen tekrar deneyin.';
                btn.innerHTML = 'Mesaj Gönder';
                btn.disabled = false;
            }
        }).catch(error => {
            status.className = "error";
            status.innerHTML = '<i class="fa-solid fa-wifi" style="font-size: 20px;"></i> Bağlantı hatası! İnternetinizi kontrol edin.';
            btn.innerHTML = 'Mesaj Gönder';
            btn.disabled = false;
        });
    }
    
    form.addEventListener("submit", handleSubmit);
}
window.addEventListener('DOMContentLoaded', () => {
  // # ile başlayan tüm linkleri yakala
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');

      // Geçerli bir id var mı kontrol et
      if (targetId && targetId !== '#') {
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
          e.preventDefault(); // Varsayılan hızlı atlamayı durdur

          // Hedef bölümün sayfanın üstünden olan mesafesini hesapla
          const navbar = document.querySelector('.navbar');
          const navHeight = navbar ? navbar.offsetHeight : 0;
          const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navHeight;

          // Smooth scroll işlemini başlat
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
});
<script>
    window.addEventListener('load', () => {
        const loaderWrapper = document.querySelector('.loader-wrapper');
        if (loaderWrapper) {
            setTimeout(() => {
                loaderWrapper.classList.add('fade-out');
            }, 300);
        }
    });
</script>
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('my-form');

  if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault(); // Beyaz "Teşekkürler" sayfasına gitmeyi engeller

      const formData = new FormData(this);
      const actionUrl = this.getAttribute('action');
      const statusText = document.getElementById('form-status');

      try {
        const response = await fetch(actionUrl, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          if (statusText) {
            statusText.textContent = "Mesajınız başarıyla gönderildi!";
            statusText.style.color = "#22c55e";
          } else {
            alert('Mesajınız başarıyla gönderildi!');
          }
          contactForm.reset();
        } else {
          if (statusText) {
            statusText.textContent = "Bir hata oluştu. Lütfen tekrar deneyin.";
            statusText.style.color = "#ef4444";
          } else {
            alert('Bir hata oluştu. Lütfen tekrar deneyin.');
          }
        }
      } catch (error) {
        alert('Bağlantı hatası oluştu.');
      }
    });
  }
});
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function() {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.innerText = 'Gönderiliyor...';
        }
    });
}
