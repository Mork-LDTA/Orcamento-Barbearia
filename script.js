/* ======================================
   Studio Sharper — Landing Page Script
   ====================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ====== SMOOTH SCROLL ======
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Close mobile nav if open
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });

    // ====== NAVBAR ======
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const floatingCta = document.getElementById('floatingCta');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        // Navbar background
        if (scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Floating CTA
        if (scrollY > 600) {
            floatingCta.classList.add('visible');
        } else {
            floatingCta.classList.remove('visible');
        }
    });

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // ====== SCROLL ANIMATIONS ======
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, parseInt(delay));
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-animate]').forEach(el => {
        observer.observe(el);
    });

    // ====== HERO PARTICLES ======
    const particlesContainer = document.getElementById('heroParticles');
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (4 + Math.random() * 4) + 's';
        particle.style.width = (2 + Math.random() * 3) + 'px';
        particle.style.height = particle.style.width;
        particle.style.opacity = (0.2 + Math.random() * 0.4);
        particlesContainer.appendChild(particle);
    }

    // ====== BOOKING SIMULATION ======
    const bookingStep1 = document.getElementById('bookingStep1');
    const bookingStep2 = document.getElementById('bookingStep2');
    const bookingStep3 = document.getElementById('bookingStep3');
    const selectedServiceText = document.getElementById('selectedServiceText');
    const successDetails = document.getElementById('successDetails');
    const todayDate = document.getElementById('todayDate');

    // Set today's date
    const today = new Date();
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    todayDate.textContent = today.toLocaleDateString('pt-BR', options);

    let selectedService = '';
    let selectedPrice = '';

    // Service selection
    document.querySelectorAll('.service-item').forEach(item => {
        item.addEventListener('click', () => {
            selectedService = item.getAttribute('data-service');
            selectedPrice = item.getAttribute('data-price');
            selectedServiceText.textContent = `${selectedService} — R$ ${selectedPrice},00`;
            
            bookingStep1.classList.add('hidden');
            bookingStep2.classList.remove('hidden');
        });
    });

    // Back button
    document.getElementById('backToStep1').addEventListener('click', () => {
        bookingStep2.classList.add('hidden');
        bookingStep1.classList.remove('hidden');
        // Reset time selections
        document.querySelectorAll('.time-slot').forEach(slot => {
            slot.classList.remove('selected');
        });
    });

    // Time slot selection
    document.querySelectorAll('.time-slot').forEach(slot => {
        slot.addEventListener('click', () => {
            if (slot.classList.contains('unavailable')) return;
            
            document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
            slot.classList.add('selected');

            const selectedTime = slot.getAttribute('data-time');

            // Show confirmation after a short delay
            setTimeout(() => {
                bookingStep2.classList.add('hidden');
                bookingStep3.classList.remove('hidden');
                successDetails.innerHTML = `
                    <strong>${selectedService}</strong><br>
                    📅 ${today.toLocaleDateString('pt-BR')} às ${selectedTime}<br>
                    💰 R$ ${selectedPrice},00
                `;
            }, 600);
        });
    });

    // Reset booking
    document.getElementById('resetBooking').addEventListener('click', () => {
        bookingStep3.classList.add('hidden');
        bookingStep1.classList.remove('hidden');
        document.querySelectorAll('.time-slot').forEach(slot => {
            slot.classList.remove('selected');
        });
    });

    // ====== WHATSAPP BOT SIMULATION ======
    const whatsappChat = document.getElementById('whatsappChat');
    const startChatBtn = document.getElementById('startChatBtn');
    const restartChat = document.getElementById('restartChat');
    let chatRunning = false;

    const chatScript = [
        { type: 'sent', text: 'Oi, quero agendar um corte de cabelo', delay: 500 },
        { type: 'typing', delay: 1200 },
        { type: 'received', text: 'Olá! Bem-vindo ao Studio Sharper! 💈✂️\n\nFicarei feliz em ajudar você a agendar. Temos os seguintes serviços:', delay: 0 },
        { type: 'received', text: '1️⃣ Corte Masculino — R$ 45\n2️⃣ Barba Completa — R$ 35\n3️⃣ Corte + Barba — R$ 70\n4️⃣ Pigmentação — R$ 55\n\nQual serviço você prefere?', delay: 800 },
        { type: 'sent', text: 'Quero o corte + barba', delay: 2000 },
        { type: 'typing', delay: 1500 },
        { type: 'received', text: 'Ótima escolha! 🔥 O Corte + Barba é um dos nossos mais pedidos!\n\nTemos os seguintes horários disponíveis para hoje:', delay: 0 },
        { type: 'received', text: '✅ 10:30\n✅ 14:00\n✅ 14:30\n✅ 16:00\n✅ 16:30\n\nQual horário fica melhor para você?', delay: 600 },
        { type: 'sent', text: '14:00', delay: 2000 },
        { type: 'typing', delay: 1500 },
        { type: 'received', text: '✅ *Agendamento Confirmado!*\n\n📋 *Resumo:*\n• Serviço: Corte + Barba\n• Horário: Hoje às 14:00\n• Valor: R$ 70,00\n• Duração: ~50 min\n\nVou te enviar um lembrete 1h antes. Até lá! 😉💈', delay: 0 },
    ];

    function addChatMessage(type, text) {
        if (type === 'typing') {
            const typing = document.createElement('div');
            typing.className = 'typing-indicator';
            typing.id = 'typingIndicator';
            typing.innerHTML = '<span></span><span></span><span></span>';
            whatsappChat.appendChild(typing);
            whatsappChat.scrollTop = whatsappChat.scrollHeight;
            return;
        }

        // Remove typing indicator if exists
        const existingTyping = document.getElementById('typingIndicator');
        if (existingTyping) existingTyping.remove();

        const bubble = document.createElement('div');
        bubble.className = `chat-bubble ${type}`;
        
        const now = new Date();
        const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
        
        // Handle multi-line text with bold markdown
        const formattedText = text.replace(/\n/g, '<br>').replace(/\*(.*?)\*/g, '<strong>$1</strong>');
        bubble.innerHTML = `${formattedText}<div class="chat-time">${timeStr}</div>`;
        
        whatsappChat.appendChild(bubble);
        whatsappChat.scrollTop = whatsappChat.scrollHeight;
    }

    async function runChatScript() {
        if (chatRunning) return;
        chatRunning = true;

        for (let i = 0; i < chatScript.length; i++) {
            const step = chatScript[i];
            
            await new Promise(resolve => setTimeout(resolve, step.delay));
            
            if (!chatRunning) return;
            
            addChatMessage(step.type, step.text);
        }
        
        chatRunning = false;
    }

    startChatBtn.addEventListener('click', () => {
        if (!chatRunning) {
            runChatScript();
        }
    });

    restartChat.addEventListener('click', () => {
        chatRunning = false;
        setTimeout(() => {
            whatsappChat.innerHTML = '<div class="chat-date-divider">Hoje</div>';
            runChatScript();
        }, 300);
    });

    // Auto-start chat when visible
    const chatObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !chatRunning) {
                setTimeout(() => runChatScript(), 800);
                chatObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    chatObserver.observe(document.querySelector('.phone-frame'));

    // ====== PANEL TABS ======
    const panelTabs = document.querySelectorAll('.panel-tab');
    const tabPanels = document.querySelectorAll('.tab-panel');

    panelTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            
            panelTabs.forEach(t => t.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));
            
            tab.classList.add('active');
            document.getElementById(`tab-${tabId}`).classList.add('active');

            // Trigger animations for the activated tab
            if (tabId === 'metas') {
                animateMeta();
            } else if (tabId === 'financeiro') {
                animateChartBars();
            }
        });
    });

    // ====== META ANIMATION ======
    function animateMeta() {
        const targetPercent = 75;
        const targetValue = 15000;
        const metaTotal = 20000;
        const faltam = metaTotal - targetValue;

        const progressCircle = document.getElementById('progressCircle');
        const metaPercent = document.getElementById('metaPercent');
        const metaAtual = document.getElementById('metaAtual');
        const metaBarFill = document.getElementById('metaBarFill');
        const metaFaltam = document.getElementById('metaFaltam');

        // Reset
        progressCircle.style.strokeDashoffset = 534;
        metaBarFill.style.width = '0%';

        // Animate after a small delay
        requestAnimationFrame(() => {
            setTimeout(() => {
                // Circular progress
                const offset = 534 - (534 * targetPercent / 100);
                progressCircle.style.strokeDashoffset = offset;

                // Bar progress
                metaBarFill.style.width = targetPercent + '%';

                // Counter animation
                animateCounter(metaPercent, 0, targetPercent, 2000, '%');
                animateCounter(metaAtual, 0, targetValue, 2000, '', 'R$ ', true);

                metaFaltam.textContent = `R$ ${faltam.toLocaleString('pt-BR')}`;
            }, 200);
        });
    }

    function animateCounter(element, start, end, duration, suffix = '', prefix = '', isCurrency = false) {
        const range = end - start;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + range * eased);
            
            if (isCurrency) {
                element.textContent = `${prefix}${current.toLocaleString('pt-BR')}`;
            } else {
                element.textContent = `${prefix}${current}${suffix}`;
            }

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    // Trigger meta animation when panel comes into view
    const metaObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateMeta();
                metaObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    metaObserver.observe(document.getElementById('painel'));

    // ====== CHART BARS ANIMATION ======
    function animateChartBars() {
        const bars = document.querySelectorAll('.chart-bar');
        bars.forEach((bar, index) => {
            const height = bar.getAttribute('data-height');
            bar.style.height = '0px';
            setTimeout(() => {
                bar.style.setProperty('--bar-height', height + '%');
                bar.style.height = height + '%';
            }, 100 + index * 100);
        });
    }

    // ====== ADD SVG GRADIENT for circular progress ======
    const svgDefs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    gradient.setAttribute('id', 'progressGradient');
    gradient.setAttribute('x1', '0%');
    gradient.setAttribute('y1', '0%');
    gradient.setAttribute('x2', '100%');
    gradient.setAttribute('y2', '0%');

    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('stop-color', '#E8741A');

    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop2.setAttribute('offset', '100%');
    stop2.setAttribute('stop-color', '#F5A623');

    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    svgDefs.appendChild(gradient);

    const svg = document.querySelector('.circular-progress svg');
    if (svg) {
        svg.insertBefore(svgDefs, svg.firstChild);
    }

    // ====== DATE DISPLAY ======
    // Already set above

    console.log('🏢 Studio Sharper Landing Page — Powered by Mork Development Technology');
});
