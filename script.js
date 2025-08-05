 document.addEventListener('DOMContentLoaded', () => {

            const preloader = document.getElementById('preloader');
            window.addEventListener('load', () => {
                preloader.classList.add('hidden');
            });
         try {
            if(window.innerWidth > 700)  AOS.init({
                offset: 100,
                delay: 0,
                duration: 800, 
                easing: 'ease-in-out',
                once: true, 
                mirror: false, 
                anchorPlacement: 'top-bottom',
            
            });
        else document.getElementById('aos-styles').remove();}catch(e){'error'}

            // Header Scroll Effect
            const header = document.getElementById('header');
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });

            // Smooth Scroll for Navigation
            document.querySelectorAll('.nav-links a, .scroll-down').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        const headerOffset = header.offsetHeight; // Adjust for fixed header height
                        const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                        const offsetPosition = elementPosition - headerOffset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: "smooth"
                        });

                        // Close mobile menu if open
                        const navLinks = document.querySelector('.nav-links');
                        const mobileMenu = document.getElementById('mobile-menu');
                        if (navLinks.classList.contains('active')) {
                            navLinks.classList.remove('active');
                            mobileMenu.classList.remove('active');
                        }
                    }
                });
            });

            // Typewriter Effect
            const typedTextSpan = document.querySelector('.typed-text');
            const textArray = ["Shivam Sharma", "A Web Developer", "A UI/UX Enthusiast"];
            const typingDelay = 100;
            const erasingDelay = 50;
            const newTextDelay = 1500; // Delay between current and next text
            let textArrayIndex = 0;
            let charIndex = 0;

            function type() {
                if (charIndex < textArray[textArrayIndex].length) {
                    if (!typedTextSpan.classList.contains("typing")) typedTextSpan.classList.add("typing");
                    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
                    charIndex++;
                    setTimeout(type, typingDelay);
                } else {
                    typedTextSpan.classList.remove("typing");
                    setTimeout(erase, newTextDelay);
                }
            }

            function erase() {
                if (charIndex > 0) {
                    if (!typedTextSpan.classList.contains("typing")) typedTextSpan.classList.add("typing");
                    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
                    charIndex--;
                    setTimeout(erase, erasingDelay);
                } else {
                    typedTextSpan.classList.remove("typing");
                    textArrayIndex++;
                    if (textArrayIndex >= textArray.length) textArrayIndex = 0;
                    setTimeout(type, typingDelay + 1100);
                }
            }

            type();


            // Mobile Menu Toggle
            const mobileMenu = document.getElementById('mobile-menu');
            const navLinks = document.querySelector('.nav-links');

            mobileMenu.addEventListener('click', () => {
                mobileMenu.classList.toggle('active');
                navLinks.classList.toggle('active');
            });

            // Highlight Active Nav Link on Scroll using Intersection Observer
            const sections = document.querySelectorAll('section');
            const navLi = document.querySelectorAll('.nav-links li a');

            const observerOptions = {
                root: null,
                rootMargin: '-30% 0px -70% 0px',
                threshold: 0
            };

            const sectionObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        navLi.forEach(link => {
                            link.classList.remove('active');
                            if (link.getAttribute('href').substring(1) === entry.target.id) {
                                link.classList.add('active');
                            }
                        });
                    }
                });
            }, observerOptions);

            sections.forEach(section => {
                sectionObserver.observe(section);
            });

            // Scroll to Top Button
            const scrollToTopBtn = document.getElementById('scrollToTopBtn');
            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) { // Show button after scrolling down 300px
                    scrollToTopBtn.style.display = 'block';
                } else {
                    scrollToTopBtn.style.display = 'none';
                }
            });

            scrollToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });

            // Animate Skill Progress Bars on scroll
            const skillProgressElements = document.querySelectorAll('.skill-progress');
            const skillObserverOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.5 // When 50% of the element is visible
            };

            const skillObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const skillCard = entry.target.closest('.skill-card');
                        if (skillCard) {
                            const progress = skillCard.dataset.progress || 0;
                            entry.target.style.width = progress + '%';
                        }
                        observer.unobserve(entry.target); // Stop observing once animated
                    }
                });
            }, skillObserverOptions);

            skillProgressElements.forEach(el => {
                skillObserver.observe(el);
            });

            // Update current year in footer
            document.getElementById('current-year').textContent = new Date().getFullYear();
           setTimeout(() => {
                console.clear();
            console.log('%cShivam Sharma', `position:absolute;z-index: 1;background: linear-gradient(45deg, #121212, #2a005c, #001f3f, #121212);filter: blur(50px);color: transparent;background-clip: text;padding: 10px;font-size: 2rem;font-family: Georgia, "Times New Roman", Times, serif;text-shadow: 0 0 30px #ffffff60;`)
          }, 200) 
          });

        document.getElementById('contactForm').addEventListener('submit', (e) => {
            e.preventDefault();
            let userName = e.srcElement[0].value,
            mail = e.srcElement[1].value,
            sub = e.srcElement[2].value,
            mes = e.srcElement[3].value,
            text = `Hello Developer,\n ${userName} wants to contact you:\n Subject: ${sub}\n\n ${mes}\n\nMail: ${mail}`;
            window.open(`mailto:shivam8299.sharma@gmail.com?subject=${sub}&body=${encodeURIComponent(text)}`, '_blank');
        });
