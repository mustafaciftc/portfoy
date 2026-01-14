// Masaüstü + mobil için hamburger menü toggle (her ekranda çalışsın)
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('menu-toggle');
    const close  = document.getElementById('menu-close');
    const menu   = document.getElementById('menu');
    const wrapper = document.getElementById('page-wraper');

    if (!toggle || !menu || !wrapper) {
        console.error("Menü elementleri eksik!");
        return;
    }

    // Tıklama ile aç/kapat
    toggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        menu.classList.toggle('active');
        wrapper.classList.toggle('menu-open');
    });

    // Kapatma ikonu
    close.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        menu.classList.remove('active');
        wrapper.classList.remove('menu-open');
    });

    // Dışarı tıklayınca kapat
    document.addEventListener('click', (e) => {
        if (menu.classList.contains('active') &&
            !menu.contains(e.target) &&
            !toggle.contains(e.target)) {
            menu.classList.remove('active');
            wrapper.classList.remove('menu-open');
        }
    });

    // Linklere tıklayınca kapat (mobil için zaten vardı, geniş ekran için de tutarlı olsun)
    document.querySelectorAll('.main-menu a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            wrapper.classList.remove('menu-open');
        });
    });
});