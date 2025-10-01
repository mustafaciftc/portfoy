document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuOverlay = document.getElementById('menu-overlay');
    let menuIcon;

    if (menuToggle) {
        menuIcon = menuToggle.querySelector('i');

        function toggleMenu() {
            const isOpen = mobileMenu.classList.contains('menu-open');
            if (isOpen) {
                mobileMenu.classList.remove('menu-open');
                menuOverlay.classList.remove('active');
                if (menuIcon) {
                    menuIcon.classList.remove('fa-times');
                    menuIcon.classList.add('fa-bars');
                }
                document.body.classList.remove('menu-open');
                document.body.style.overflow = 'auto';
            } else {
                mobileMenu.classList.add('menu-open');
                menuOverlay.classList.add('active');
                if (menuIcon) {
                    menuIcon.classList.remove('fa-bars');
                    menuIcon.classList.add('fa-times');
                }
                document.body.classList.add('menu-open');
                document.body.style.overflow = 'hidden';
            }
        }

        menuToggle.addEventListener('click', toggleMenu);
        if (menuOverlay) {
            menuOverlay.addEventListener('click', toggleMenu);
        }

        document.querySelectorAll('[data-close-menu]').forEach(link => {
            link.addEventListener('click', toggleMenu);
        });
    }

    const typedText = document.getElementById('typed-text');
    if (typedText) {
        const texts = ['Full Stack Developer', 'Android Developer', 'Freelancer'];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingDelay = 100;

        function type() {
            const currentText = texts[textIndex];

            if (isDeleting) {
                typedText.textContent = currentText.substring(0, charIndex--);
                if (charIndex < 0) {
                    isDeleting = false;
                    textIndex = (textIndex + 1) % texts.length;
                    typingDelay = 100;
                }
            } else {
                typedText.textContent = currentText.substring(0, charIndex++);
                if (charIndex > currentText.length) {
                    isDeleting = true;
                    typingDelay = 1000;
                }
            }

            setTimeout(type, isDeleting ? 50 : typingDelay);
        }

        setTimeout(type, 500);
    }

    const skillBars = document.querySelectorAll('.skill-progress');
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = `${width}%`;
            bar.style.opacity = '1';
        });
    }

    const stats = document.querySelectorAll('.stat-number');
    function animateStats() {
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            let count = 0;
            const increment = target / 50;

            const updateCount = () => {
                if (count < target) {
                    count += increment;
                    stat.textContent = Math.ceil(count);
                    requestAnimationFrame(updateCount);
                } else {
                    stat.textContent = target;
                }
            };

            updateCount();
        });
    }

    const reveals = document.querySelectorAll('.reveal');
    function revealSections() {
        const windowHeight = window.innerHeight;

        reveals.forEach(section => {
            const elementTop = section.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
                section.classList.add('active');
            }
        });
    }

    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        function createParticles() {
            particlesContainer.innerHTML = '';

            for (let i = 0; i < 75; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                particle.style.left = `${Math.random() * 100}vw`;
                particle.style.top = `${Math.random() * 100}vh`;
                particle.style.animationDelay = `${Math.random() * 5}s`;
                particlesContainer.appendChild(particle);
            }
        }
        createParticles();
    }

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const submitButton = contactForm.querySelector('button[type="submit"]');
            const formMessage = document.getElementById('form-message');
            const formData = new FormData(contactForm);

            const name = formData.get('name')?.toString().trim();
            const email = formData.get('email')?.toString().trim();
            const message = formData.get('message')?.toString().trim();

            if (!name || !email || !message) {
                showFormMessage('Lütfen tüm gerekli alanları doldurun.', 'error');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormMessage('Lütfen geçerli bir e-posta adresi girin.', 'error');
                return;
            }

            if (submitButton) {
                submitButton.disabled = true;
                const originalText = submitButton.innerHTML;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Gönderiliyor...';
            }

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    showFormMessage('Mesajınız başarıyla gönderildi. En kısa sürede sizinle iletişime geçeceğim.', 'success');
                    contactForm.reset();

                    setTimeout(() => {
                        window.location.href = 'https://mustafa-ciftci-portfoy.netlify.app/tesekkurler.html';
                    }, 3000);
                } else {
                    throw new Error('Form gönderilemedi');
                }
            } catch (error) {
                console.error('Form gönderim hatası:', error);
                showFormMessage('Mesaj gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin veya doğrudan e-posta gönderin.', 'error');
            } finally {
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.innerHTML = '<span class="mr-2">Gönder</span><i class="fas fa-paper-plane"></i>';
                }
            }
        });

        function showFormMessage(message, type) {
            const formMessage = document.getElementById('form-message');
            if (!formMessage) return;

            formMessage.textContent = message;
            formMessage.classList.remove('hidden', 'text-green-400', 'text-red-400');

            if (type === 'success') {
                formMessage.classList.add('text-green-400');
            } else {
                formMessage.classList.add('text-red-400');
            }

            setTimeout(() => {
                formMessage.classList.add('hidden');
            }, 5000);
        }
    }

    const whatsappToggle = document.getElementById('whatsapp-toggle');
    const whatsappPopup = document.getElementById('whatsapp-popup');
    const closeWhatsapp = document.getElementById('close-whatsapp');

    if (whatsappToggle && whatsappPopup) {
        whatsappToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            whatsappPopup.classList.toggle('active');
        });

        if (closeWhatsapp) {
            closeWhatsapp.addEventListener('click', function () {
                whatsappPopup.classList.remove('active');
            });
        }

        document.addEventListener('click', function (event) {
            if (!event.target.closest('#whatsapp-widget') && whatsappPopup.classList.contains('active')) {
                whatsappPopup.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', () => {
        revealSections();

        const skillsSection = document.querySelector('#skills');
        if (skillsSection && skillsSection.getBoundingClientRect().top < window.innerHeight) {
            animateSkillBars();
        }

        const homeSection = document.querySelector('#home');
        if (homeSection && homeSection.getBoundingClientRect().top < window.innerHeight) {
            animateStats();
        }
    });

    revealSections();

    window.addEventListener('resize', function () {
        if (particlesContainer) {
            createParticles();
        }
    });
});

function playVideoModal() {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        cursor: pointer;
    `;

    const video = document.createElement('video');
    video.src = './videos/Kayıt 2025-08-25 193525.mp4';
    video.controls = true;
    video.autoplay = true;
    video.style.maxWidth = '90%';
    video.style.maxHeight = '90%';
    video.style.cursor = 'auto';

    video.addEventListener('click', function (e) {
        e.stopPropagation();
    });

    modal.appendChild(video);
    document.body.appendChild(modal);

    function closeModal() {
        video.pause();
        document.body.removeChild(modal);
        document.removeEventListener('keydown', handleKeyPress);
    }

    function handleKeyPress(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    }

    modal.addEventListener('click', closeModal);
    document.addEventListener('keydown', handleKeyPress);
}

 function openVideoModal(videoSrc) {
      const modal = document.getElementById('videoModal');
      const video = document.getElementById('modalVideo');
      
      video.src = videoSrc;
      modal.classList.add('active');
      video.play();
      
      // ESC tuşu ile kapatma
      document.addEventListener('keydown', handleEscKey);
    }

    function closeVideoModal() {
      const modal = document.getElementById('videoModal');
      const video = document.getElementById('modalVideo');
      
      modal.classList.remove('active');
      video.pause();
      video.currentTime = 0;
      
      document.removeEventListener('keydown', handleEscKey);
    }

    function handleEscKey(event) {
      if (event.key === 'Escape') {
        closeVideoModal();
      }
    }

    // Modal dışına tıklayarak kapatma
    document.getElementById('videoModal').addEventListener('click', function(event) {
      if (event.target === this) {
        closeVideoModal();
      }
    });

    // Video hover efektleri
    document.addEventListener('DOMContentLoaded', function() {
      const videos = document.querySelectorAll('.video-container video');
      
      videos.forEach(video => {
        video.addEventListener('mouseenter', function() {
          this.play().catch(e => console.log('Video oynatma hatası:', e));
        });
        
        video.addEventListener('mouseleave', function() {
          this.pause();
          this.currentTime = 0;
        });
      });

      // Proje kartlarına hover efekti
      const projectCards = document.querySelectorAll('.project-card');
      projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
          this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
          this.style.transform = 'translateY(0)';
        });
      });
    });

   