/**
 * ============================================================================
 * KUSHAL // DEVELOPER PORTFOLIO CORE JAVASCRIPT
 * ============================================================================
 * 
 * Features:
 * 1. Web Audio API: Synthesizer for 8-bit retro sound effects (safe in-browser)
 * 2. Theme Controller: Dark/Light theme toggle with auto-detection & persistence
 * 3. AI Chat Simulation: Interactive assistant with simulated responses & backend instructions
 * 4. Contact Form: Client-side validation with feedback & Resend email integration notes
 * 5. Projects Modal: Detailed inspection view for featured projects
 * 6. Navigation: Scrollspy active highlighting and mobile drawer menu
 * 7. Dynamic Canvas: Ambient cyber grid & matrix particles
 * 8. Utilities: Dynamic copyright year & accessibility enhancements
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. Dynamic Year Initialization
  // --------------------------------------------------------------------------
  const currentYearEl = document.getElementById('current-year');
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

  // --------------------------------------------------------------------------
  // 2. Web Audio API - Retro 8-bit Synthesizer
  // --------------------------------------------------------------------------
  class RetroSoundSystem {
    constructor() {
      this.audioCtx = null;
      this.enabled = true;
    }

    init() {
      if (!this.audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
          this.audioCtx = new AudioContextClass();
        }
      }
      if (this.audioCtx && this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
    }

    playTone(frequency, duration, type = 'square', gainLevel = 0.04) {
      if (!this.enabled) return;
      try {
        this.init();
        if (!this.audioCtx) return;

        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(frequency, this.audioCtx.currentTime);

        gain.gain.setValueAtTime(gainLevel, this.audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start();
        osc.stop(this.audioCtx.currentTime + duration);
      } catch (e) {
        // Audio policy ignore
      }
    }

    blip() {
      this.playTone(880, 0.04, 'square', 0.03);
    }

    click() {
      this.playTone(440, 0.08, 'sawtooth', 0.05);
    }

    powerUp() {
      if (!this.enabled) return;
      try {
        this.init();
        if (!this.audioCtx) return;
        const now = this.audioCtx.currentTime;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.18);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.2);
      } catch (e) {}
    }

    themeSwitch() {
      if (!this.enabled) return;
      this.playTone(520, 0.06, 'sine', 0.07);
      setTimeout(() => this.playTone(780, 0.09, 'sine', 0.07), 70);
    }

    toggle() {
      this.enabled = !this.enabled;
      if (this.enabled) this.powerUp();
      return this.enabled;
    }
  }

  const soundSys = new RetroSoundSystem();

  // Attach global sound listeners to buttons and links with data-sound
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-sound]').forEach((el) => {
      const soundType = el.getAttribute('data-sound');
      el.addEventListener('mouseenter', () => {
        if (soundType === 'blip') soundSys.blip();
      });
      el.addEventListener('click', () => {
        if (soundType === 'click') soundSys.click();
        else if (soundType === 'blip') soundSys.blip();
      });
    });

    const soundBtn = document.getElementById('sound-toggle-btn');
    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        const isEnabled = soundSys.toggle();
        const icon = soundBtn.querySelector('.sound-icon');
        const label = soundBtn.querySelector('.sound-label');
        if (isEnabled) {
          if (icon) icon.textContent = '🔊';
          if (label) label.textContent = 'AUDIO: ON';
        } else {
          if (icon) icon.textContent = '🔇';
          if (label) label.textContent = 'AUDIO: OFF';
        }
      });
    }
  });

  // --------------------------------------------------------------------------
  // 3. Theme Controller (Dark / Light Night Mode with System Preference)
  // --------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const htmlRoot = document.documentElement;

  function applyTheme(theme, save = true) {
    htmlRoot.setAttribute('data-theme', theme);
    if (save) localStorage.setItem('kushal_portfolio_theme', theme);

    if (themeToggleBtn) {
      const icon = themeToggleBtn.querySelector('.theme-icon');
      const label = themeToggleBtn.querySelector('.theme-label');
      if (theme === 'dark') {
        if (icon) icon.textContent = '🌙';
        if (label) label.textContent = 'CYBER_NIGHT';
      } else {
        if (icon) icon.textContent = '☀️';
        if (label) label.textContent = 'CYBER_DAY';
      }
    }
  }

  const savedTheme = localStorage.getItem('kushal_portfolio_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  if (savedTheme) {
    applyTheme(savedTheme, false);
  } else {
    applyTheme(prefersDark.matches ? 'dark' : 'light', false);
  }

  prefersDark.addEventListener('change', (e) => {
    if (!localStorage.getItem('kushal_portfolio_theme')) {
      applyTheme(e.matches ? 'dark' : 'light', false);
    }
  });

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      soundSys.themeSwitch();
      const currentTheme = htmlRoot.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme, true);
    });
  }

  // --------------------------------------------------------------------------
  // 4. Hero Typing Animation Effect
  // --------------------------------------------------------------------------
  const typingTarget = document.getElementById('typing-text');
  if (typingTarget) {
    const roles = [
      'B.E CSE Student',
      'Aspiring Software Developer',
      'Frontend & Python Learner',
      'Web & Tech Enthusiast',
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeDelay = 90;

    function typeLoop() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typingTarget.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typeDelay = 45;
      } else {
        typingTarget.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typeDelay = 85;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typeDelay = 1800;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeDelay = 400;
      }

      setTimeout(typeLoop, typeDelay);
    }
    typeLoop();
  }

  // --------------------------------------------------------------------------
  // 5. Ambient Cyber Canvas Grid & Matrix Particles
  // --------------------------------------------------------------------------
  const canvas = document.getElementById('cyber-bg-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = 45;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: Math.random() * 0.8 + 0.3,
        size: Math.floor(Math.random() * 3) + 2,
        color: Math.random() > 0.4 ? '#ff2a5f' : '#00f0ff',
      });
    }

    let gridOffset = 0;

    function renderCanvas() {
      ctx.clearRect(0, 0, width, height);

      ctx.strokeStyle = 'rgba(255, 42, 95, 0.08)';
      ctx.lineWidth = 1;
      const gridSize = 40;

      gridOffset = (gridOffset + 0.25) % gridSize;

      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = gridOffset; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      particles.forEach((p) => {
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);

        p.x += p.vx;
        p.y += p.vy;

        if (p.y > height) {
          p.y = -5;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
      });

      requestAnimationFrame(renderCanvas);
    }
    renderCanvas();
  }

  // --------------------------------------------------------------------------
  // 6. Vertical Navigation Spy & Mobile Hamburger Menu
  // --------------------------------------------------------------------------
  const navLinks = document.querySelectorAll('.vertical-navbar .nav-link');
  const sections = document.querySelectorAll('main section[id]');
  const sidebar = document.querySelector('.sidebar-header');
  const mobileToggle = document.getElementById('mobile-nav-toggle');

  if (mobileToggle && sidebar) {
    mobileToggle.addEventListener('click', () => {
      sidebar.classList.toggle('mobile-open');
      const expanded = sidebar.classList.contains('mobile-open');
      mobileToggle.setAttribute('aria-expanded', expanded);
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (sidebar && sidebar.classList.contains('mobile-open')) {
        sidebar.classList.remove('mobile-open');
        if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0,
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((sec) => navObserver.observe(sec));

  // --------------------------------------------------------------------------
  // 7. Projects Data & Interactive Modal Dialog Controller
  // --------------------------------------------------------------------------
  const projectData = {
    '1': {
      title: 'Neural Link Telemetry Dashboard',
      image: 'assets/project1.jpg',
      category: 'AI & TELEMETRY',
      description:
        'A comprehensive real-time neural network telemetry station built to monitor cognitive AI training status, loss convergence charts, layer activation maps, and multi-node system throughput.',
      highlights: [
        'Engineered responsive React interface with interactive D3.js visual charts.',
        'Simulated low-latency live telemetry feeds displaying 16,000 node coordinates.',
        'Structured modular component tree with reusable pixel-art HUD containers.',
        'Integrated automated anomaly alerts and system status logs.',
      ],
      tags: ['React', 'JavaScript', 'CSS3', 'Python API', 'Git', 'GitHub'],
      repoUrl: 'https://github.com/kushaldkush29-web',
      liveUrl: '#projects',
    },
    '2': {
      title: 'Cybernetic City Network Engine',
      image: 'assets/project2.jpg',
      category: 'SIMULATION & DATA',
      description:
        'An interactive isometric distributed systems visualizer and traffic simulation engine modeling packet flow bottlenecks, cluster node failovers, and server grid coordination in retro pixel-art.',
      highlights: [
        'Built 60 FPS deterministic canvas rendering loop with custom pixel shaders.',
        'Simulated autonomous node routing algorithms and cluster failover mechanisms.',
        'Clean, accessible UI controls for adjusting traffic velocity and node densities.',
        'Comprehensive documentation and modular JavaScript architecture.',
      ],
      tags: ['JavaScript', 'HTML5 Canvas', 'CSS3', 'Algorithms', 'Git'],
      repoUrl: 'https://github.com/kushaldkush29-web',
      liveUrl: '#projects',
    },
    '3': {
      title: 'Quantum Ledger Trading Terminal',
      image: 'assets/project3.jpg',
      category: 'FINTECH & DATA',
      description:
        'An algorithmic order book visualizer and cryptographic ledger terminal providing real-time candlestick telemetry, depth chart rendering, and dark-mode trading telemetry.',
      highlights: [
        'Designed real-time candlestick charts with technical indicators.',
        'Integrated clean REST API communication for transaction verification.',
        'Keyboard-navigable shortcuts and responsive layout across desktop and mobile.',
        'Crafted with pixel-perfect contrast and accessibility focus states.',
      ],
      tags: ['React', 'Python', 'REST APIs', 'CSS Grid', 'GitHub'],
      repoUrl: 'https://github.com/kushaldkush29-web',
      liveUrl: '#projects',
    },
  };

  const projectCards = document.querySelectorAll('.project-card');
  const inspectTriggers = document.querySelectorAll('.inspect-trigger');
  const modal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalDismissBtn = document.getElementById('modal-dismiss-btn');
  const modalTitle = document.getElementById('modal-project-title');
  const modalImg = document.getElementById('modal-project-img');
  const modalDesc = document.getElementById('modal-project-description');
  const modalHighlights = document.getElementById('modal-project-highlights');
  const modalTags = document.getElementById('modal-project-tags');
  const modalLiveLink = document.getElementById('modal-live-link');
  const modalRepoLink = document.getElementById('modal-repo-link');

  function openProjectModal(projectId) {
    const data = projectData[projectId];
    if (!data || !modal) return;

    soundSys.powerUp();

    modalTitle.textContent = data.title;
    modalImg.src = data.image;
    modalImg.alt = `${data.title} Detailed Screenshot`;
    modalDesc.textContent = data.description;

    modalHighlights.innerHTML = '';
    data.highlights.forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item;
      modalHighlights.appendChild(li);
    });

    modalTags.innerHTML = '';
    data.tags.forEach((tag) => {
      const span = document.createElement('span');
      span.className = 'tech-tag';
      span.textContent = tag;
      modalTags.appendChild(span);
    });

    modalLiveLink.href = data.liveUrl;
    modalRepoLink.href = data.repoUrl;

    modal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    if (modalCloseBtn) modalCloseBtn.focus();
  }

  function closeProjectModal() {
    if (!modal) return;
    soundSys.blip();
    modal.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }

  projectCards.forEach((card) => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;
      const pid = card.getAttribute('data-project-id');
      openProjectModal(pid);
    });
  });

  inspectTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const pid = trigger.getAttribute('data-project-id');
      openProjectModal(pid);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
  if (modalDismissBtn) modalDismissBtn.addEventListener('click', closeProjectModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeProjectModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && !modal.hasAttribute('hidden')) {
      closeProjectModal();
    }
  });

  // --------------------------------------------------------------------------
  // 8. AI Chat Assistant Interface
  // --------------------------------------------------------------------------
  const termForm = document.getElementById('terminal-form');
  const termInput = document.getElementById('terminal-input');
  const termScreen = document.getElementById('terminal-screen');
  const clearBtn = document.getElementById('clear-term-btn');
  const quickChips = document.querySelectorAll('.quick-cmd-chip');
  const typingIndicator = document.getElementById('ai-typing-indicator');

  function appendChatMessage(text, type = 'bot-msg', isHtml = false) {
    if (!termScreen) return;
    const line = document.createElement('div');
    line.className = `term-line ${type}`;
    if (isHtml) {
      line.innerHTML = text;
    } else {
      line.textContent = text;
    }
    termScreen.appendChild(line);
    termScreen.scrollTop = termScreen.scrollHeight;
  }

  function generateSimulatedResponse(query) {
    const q = query.toLowerCase().trim();

    if (q.includes('who') || q.includes('about') || q.includes('kushal') || q.includes('bio')) {
      return `Kushal is a motivated B.E Computer Science & Engineering (CSE) student and beginner developer exploring modern web technologies, Python, and software fundamentals.`;
    } else if (q.includes('skill') || q.includes('stack') || q.includes('technolog')) {
      return `Kushal is actively building foundational skills in HTML5, CSS3, JavaScript (ES6+), React, Python, Git, GitHub, and responsive web design. Check out the dedicated Skills section for a full visual breakdown!`;
    } else if (q.includes('project') || q.includes('work') || q.includes('portfolio')) {
      return `Kushal has built several featured projects including:
1. Neural Link Telemetry Dashboard (React & Python)
2. Cybernetic City Simulation (Canvas & JavaScript)
3. Quantum Ledger Trading Terminal (React & APIs)
Explore the Projects section above to view source code on GitHub!`;
    } else if (q.includes('contact') || q.includes('email') || q.includes('hire') || q.includes('reach')) {
      return `You can connect with Kushal for internships, entry-level opportunities, and collaborations via:
- GitHub: https://github.com/kushaldkush29-web
- LinkedIn: https://www.linkedin.com/in/kushal-d-bb5b8a397
- Direct Email: kushaldkush29@gmail.com
Or submit a message using the Contact form below!`;
    } else if (q.includes('interest') || q.includes('hobby') || q.includes('passion')) {
      return `Kushal is passionate about learning computer science fundamentals, building modern web user interfaces, writing clean Python code, and exploring open-source projects.`;
    } else {
      return `Thanks for asking! Kushal is a B.E CSE student eager to learn and explore new internship and developer opportunities. You can ask me about his projects, skills, or use the Contact form to send him a message directly.`;
    }
  }

  let isAiResponding = false;

  function handleUserMessage(message) {
    const raw = message.trim();
    if (!raw || isAiResponding) return;

    isAiResponding = true;
    soundSys.click();
    appendChatMessage(`> You: ${raw}`, 'user-msg');

    if (typingIndicator) typingIndicator.removeAttribute('hidden');

    // Simulated asynchronous AI response
    setTimeout(() => {
      if (typingIndicator) typingIndicator.setAttribute('hidden', '');
      const reply = generateSimulatedResponse(raw);
      soundSys.blip();
      appendChatMessage(`KUSHAL_AI: ${reply}`, 'bot-msg');
      isAiResponding = false;
    }, 500);
  }

  if (termForm && termInput) {
    termForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = termInput.value;
      if (!val.trim() || isAiResponding) return;
      termInput.value = '';
      handleUserMessage(val);
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      soundSys.blip();
      if (termScreen) {
        termScreen.innerHTML = '';
        appendChatMessage('[SYSTEM] Chat session history cleared.', 'system-msg');
      }
    });
  }

  quickChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      if (cmd && !isAiResponding) handleUserMessage(cmd);
    });
  });

  // --------------------------------------------------------------------------
  // 9. Contact Form Validation & Submission Handler
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('cyber-contact-form');
  const formFeedback = document.getElementById('form-feedback');
  const nameInput = document.getElementById('sender-name');
  const emailInput = document.getElementById('sender-email');
  const messageInput = document.getElementById('sender-message');
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      // Reset errors
      if (nameError) nameError.textContent = '';
      if (emailError) emailError.textContent = '';
      if (messageError) messageError.textContent = '';
      if (formFeedback) {
        formFeedback.className = 'form-feedback';
        formFeedback.textContent = '';
      }

      if (nameInput) {
        nameInput.classList.remove('input-error');
        if (!nameInput.value.trim()) {
          if (nameError) nameError.textContent = 'Please enter your name.';
          nameInput.classList.add('input-error');
          isValid = false;
        }
      }

      if (emailInput) {
        emailInput.classList.remove('input-error');
        if (!emailInput.value.trim()) {
          if (emailError) emailError.textContent = 'Please enter your email address.';
          emailInput.classList.add('input-error');
          isValid = false;
        } else if (!validateEmail(emailInput.value.trim())) {
          if (emailError) emailError.textContent = 'Please enter a valid email format (name@example.com).';
          emailInput.classList.add('input-error');
          isValid = false;
        }
      }

      if (messageInput) {
        messageInput.classList.remove('input-error');
        if (!messageInput.value.trim()) {
          if (messageError) messageError.textContent = 'Please enter your message payload.';
          messageInput.classList.add('input-error');
          isValid = false;
        }
      }

      if (!isValid) {
        soundSys.blip();
        if (formFeedback) {
          formFeedback.className = 'form-feedback error';
          formFeedback.textContent = '⚠ Please fix the errors above before sending.';
        }
        return;
      }

      // Valid submission simulation
      soundSys.powerUp();
      if (formFeedback) {
        formFeedback.className = 'form-feedback';
        formFeedback.textContent = 'TRANSMITTING MESSAGE ENCRYPTED PACKET...';
      }

      setTimeout(() => {
        if (formFeedback) {
          formFeedback.className = 'form-feedback success';
          formFeedback.textContent = `✓ Message successfully sent! Thank you, ${nameInput.value.trim()}. I will reply promptly.`;
        }
        contactForm.reset();
      }, 1000);
    });
  }
})();
