// DOM yüklendiğinde çalışacak kodlar
document.addEventListener('DOMContentLoaded', function() {
    // Typing effect başlat
    initTypingEffect();
    
    // Scroll animasyonları
    initScrollAnimations();
    
    // Form gönderimi
    initContactForm();
    
    // Isotope filtreleme
    initIsotope();
    
    // Smooth scroll
    initSmoothScroll();
    
    // Video modal kontrolleri
    initVideoModal();
    
    // WhatsApp widget
    initWhatsAppWidget();
    
    // Sidebar navigasyon aktif bölüm takibi
    initSectionTracker();
});

// Typing Effect
function initTypingEffect() {
    const typedTextSpan = document.querySelector("#typed-text");
    if (!typedTextSpan) return;
    
    const textArray = ["Full Stack Developer", "Web Geliştirici", "Mobil Uygulama Geliştirici", "E-Ticaret Uzmanı"];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            textArrayIndex++;
            if(textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }

    if(textArray.length) setTimeout(type, newTextDelay + 250);
}

// Scroll animasyonları
function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = function() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const revealTop = element.getBoundingClientRect().top;
            
            if (revealTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // İlk yüklemede kontrol et
}

// İletişim formu işlemleri
function initContactForm() {
    const contactForm = document.getElementById('contact');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitButton = contactForm.querySelector('#form-submit');
            if (!submitButton) return;
            
            const originalText = submitButton.textContent;
            
            // Yükleme durumu
            submitButton.innerHTML = '<span class="loading"></span> Gönderiliyor...';
            submitButton.disabled = true;
            
            try {
                const formData = new FormData(contactForm);
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    showFormMessage('Mesajınız başarıyla gönderildi! En kısa sürede dönüş yapacağım.', 'success');
                    contactForm.reset();
                } else {
                    throw new Error('Form gönderimi başarısız');
                }
            } catch (error) {
                showFormMessage('Bir hata oluştu. Lütfen daha sonra tekrar deneyin veya direkt olarak iletişim bilgilerimden ulaşın.', 'error');
            } finally {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }
        });
    }
}

function showFormMessage(message, type) {
    let messageDiv = document.getElementById('form-message');
    
    if (!messageDiv) {
        messageDiv = document.createElement('div');
        messageDiv.id = 'form-message';
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            contactSection.appendChild(messageDiv);
        }
    }
    
    messageDiv.textContent = message;
    messageDiv.className = `alert alert-${type}`;
    messageDiv.style.display = 'block';
    
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}

// Isotope filtreleme
function initIsotope() {
    const isotopeGrid = document.querySelector('.isotope-box');
    
    if (isotopeGrid && typeof Isotope !== 'undefined') {
        const iso = new Isotope(isotopeGrid, {
            itemSelector: '.isotope-item',
            layoutMode: 'fitRows',
            percentPosition: true,
            fitRows: {
                gutter: 20
            }
        });
        
        // Filtre butonları
        const filterButtons = document.querySelectorAll('.isotope-toolbar input[type="radio"]');
        
        filterButtons.forEach(button => {
            button.addEventListener('change', function() {
                const filterValue = this.getAttribute('data-type');
                iso.arrange({ filter: filterValue === '*' ? '*' : `[data-type="${filterValue}"]` });
            });
        });
    }
}

// Smooth scroll
function initSmoothScroll() {
    const menuLinks = document.querySelectorAll('.main-menu a, .hero-buttons a[href^="#"]');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Mobil menüyü kapat
                    const mobileMenu = document.getElementById('menu');
                    if (mobileMenu && mobileMenu.classList.contains('active')) {
                        mobileMenu.classList.remove('active');
                    }
                }
            }
        });
    });
}

// Video modal kontrolleri
function initVideoModal() {
    const videoBtns = document.querySelectorAll('.video-btn');
    const videoModal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    const closeModal = document.querySelector('.close-modal');
    
    if (videoModal && modalVideo) {
        videoBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const videoSrc = this.getAttribute('data-video');
                if (videoSrc) {
                    modalVideo.src = videoSrc;
                    videoModal.style.display = 'block';
                    modalVideo.play();
                }
            });
        });
        
        if (closeModal) {
            closeModal.addEventListener('click', function() {
                videoModal.style.display = 'none';
                modalVideo.pause();
                modalVideo.currentTime = 0;
            });
        }
        
        window.addEventListener('click', function(event) {
            if (event.target === videoModal) {
                videoModal.style.display = 'none';
                modalVideo.pause();
                modalVideo.currentTime = 0;
            }
        });
    }
}

// WhatsApp widget
function initWhatsAppWidget() {
    const whatsappToggle = document.getElementById('whatsapp-toggle');
    const whatsappPopup = document.getElementById('whatsapp-popup');
    const closeWhatsapp = document.getElementById('close-whatsapp');
    
    if (whatsappToggle && whatsappPopup) {
        whatsappToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            whatsappPopup.classList.toggle('show');
        });
        
        if (closeWhatsapp) {
            closeWhatsapp.addEventListener('click', function(e) {
                e.stopPropagation();
                whatsappPopup.classList.remove('show');
            });
        }
        
        // Dışarı tıklayınca kapat
        document.addEventListener('click', function(e) {
            if (!whatsappToggle.contains(e.target) && !whatsappPopup.contains(e.target)) {
                whatsappPopup.classList.remove('show');
            }
        });
        
        // Otomatik açılma (ilk ziyarette)
        setTimeout(() => {
            if (!localStorage.getItem('whatsappShown')) {
                whatsappPopup.classList.add('show');
                localStorage.setItem('whatsappShown', 'true');
                
                // 30 saniye sonra kapat
                setTimeout(() => {
                    whatsappPopup.classList.remove('show');
                }, 30000);
            }
        }, 10000);
    }
}

// Bölüm takibi ve sidebar aktif menü güncelleme
function initSectionTracker() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.main-menu a');
    
    function updateActiveNav() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('data-section');
            }
        });
        
        navLinks.forEach(link => {
            link.parentElement.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.parentElement.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // İlk yüklemede aktif menüyü ayarla
}

// Sayfa yükleme animasyonu
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Preloader varsa kaldır
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 500);
    }
});

// Intersection Observer ile animasyonlar
if ('IntersectionObserver' in window) {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    if (skillBars.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const width = entry.target.style.width || entry.target.getAttribute('data-width') || '100%';
                    entry.target.style.width = width;
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        skillBars.forEach(bar => {
            observer.observe(bar);
        });
    }
}

// Klavye kısayolları
document.addEventListener('keydown', function(e) {
    // Escape ile modal kapatma
    if (e.key === 'Escape') {
        const videoModal = document.getElementById('videoModal');
        if (videoModal && videoModal.style.display === 'block') {
            videoModal.style.display = 'none';
            const modalVideo = document.getElementById('modalVideo');
            if (modalVideo) {
                modalVideo.pause();
                modalVideo.currentTime = 0;
            }
        }
        
        const whatsappPopup = document.getElementById('whatsapp-popup');
        if (whatsappPopup && whatsappPopup.classList.contains('show')) {
            whatsappPopup.classList.remove('show');
        }
    }
});

// Viewport boyut değişikliklerini takip et
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Isotope yeniden düzenleme
        const isotopeGrid = document.querySelector('.isotope-box');
        if (isotopeGrid && typeof Isotope !== 'undefined') {
            isotopeGrid.isotope('layout');
        }
    }, 250);
});