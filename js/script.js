const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const menuOverlay = document.getElementById('menu-overlay');
const menuIcon = menuToggle.querySelector('i');

function toggleMenu() {
    const isOpen = mobileMenu.classList.contains('menu-open');
    if (isOpen) {
        mobileMenu.classList.remove('menu-open');
        menuOverlay.classList.remove('active');
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
        document.body.classList.remove('menu-open');
        document.body.style.overflow = 'auto';
    } else {
        mobileMenu.classList.add('menu-open');
        menuOverlay.classList.add('active');
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-times');
        document.body.classList.add('menu-open');
        document.body.style.overflow = 'hidden';
    }
}

menuToggle.addEventListener('click', toggleMenu);
menuOverlay.addEventListener('click', toggleMenu);
document.querySelectorAll('[data-close-menu]').forEach(link => {
    link.addEventListener('click', toggleMenu);
});

const typedText = document.getElementById('typed-text');
const texts = ['Full Stack Developer', 'Android Developer', 'Freelancer'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentText = texts[textIndex];
    if (isDeleting) {
        typedText.textContent = currentText.substring(0, charIndex--);
        if (charIndex < 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }
    } else {
        typedText.textContent = currentText.substring(0, charIndex++);
        if (charIndex > currentText.length) {
            isDeleting = true;
            charIndex = currentText.length;
            setTimeout(type, 1000);
            return;
        }
    }
    setTimeout(type, isDeleting ? 50 : 100);
}
type();

const skillBars = document.querySelectorAll('.skill-progress');
function animateSkillBars() {
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = `${width}%`;
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
    reveals.forEach(section => {
        const windowHeight = window.innerHeight;
        const elementTop = section.getBoundingClientRect().top;
        if (elementTop < windowHeight - 150) {
            section.classList.add('active');
        }
    });
}

const particlesContainer = document.getElementById('particles');
function createParticles() {
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

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            formMessage.textContent = 'Lütfen tüm alanları doldurun.';
            formMessage.classList.remove('text-green-400', 'hidden');
            formMessage.classList.add('text-red-400');
            return;
        }

        try {
            const response = await fetch('https://formspree.io/f/mpwdealb', {
                method: 'POST',
                body: JSON.stringify({ name, email, message }),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                formMessage.textContent = 'Mesajınız başarıyla gönderildi. Yönlendiriliyorsunuz...';
                formMessage.classList.remove('text-red-400', 'hidden');
                formMessage.classList.add('text-green-400');

                form.reset();

                setTimeout(() => {
                    window.location.href = 'https://mustafa-ciftci-portfoy.netlify.app/tesekkurler.html';
                }, 1000);

            } else {
                throw new Error('Form gönderimi başarısız.');
            }

        } catch (error) {
            formMessage.textContent = 'Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.';
            formMessage.classList.remove('text-green-400', 'hidden');
            formMessage.classList.add('text-red-400');
        }
    });
});

window.addEventListener('scroll', () => {
    revealSections();
    if (document.querySelector('#skills').getBoundingClientRect().top < window.innerHeight) {
        animateSkillBars();
    }
    if (document.querySelector('#home').getBoundingClientRect().top < window.innerHeight) {
        animateStats();
    }
});

revealSections();
animateSkillBars();
animateStats();

document.addEventListener('DOMContentLoaded', function () {
    const whatsappToggle = document.getElementById('whatsapp-toggle');
    const whatsappPopup = document.getElementById('whatsapp-popup');
    const closeWhatsapp = document.getElementById('close-whatsapp');

    whatsappToggle.addEventListener('click', function () {
        whatsappPopup.classList.toggle('active');
    });

    closeWhatsapp.addEventListener('click', function () {
        whatsappPopup.classList.remove('active');
    });

    document.addEventListener('click', function (event) {
        if (!event.target.closest('#whatsapp-widget') && whatsappPopup.classList.contains('active')) {
            whatsappPopup.classList.remove('active');
        }
    });
});