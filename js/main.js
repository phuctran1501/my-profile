/**
 * Phuc Tran Portfolio — Interactive Systems Engine & 4 Live Sandboxes
 * World-Class Creative Engineering: Lenis, GSAP, Text Scramble, Command Palette (Ctrl+K), 3D Tilt & Micro-Audio
 * Can Tho University (CTU) Blue Theme — 100% Bilingual (VI / EN)
 */

// Architectural Case Studies Data (VI & EN)
const CASE_STUDIES = {
  newshub: {
    vi: {
      title: "NewsHub — Kiến trúc Nền tảng Đọc báo Thông minh & Tích hợp AI",
      tagline: "C# ASP.NET Core • React • TypeScript • Supabase (PostgreSQL) • Gemini AI",
      overview: "NewsHub giải quyết vấn đề quá tải thông tin số bằng quy trình tổng hợp tự động, trích xuất thực thể và gọi Google Gemini API để tóm tắt các điểm cốt lõi 'TL;DR' trong 10 giây.",
      highlights: [
        "Kiến trúc Clean Architecture: Tách biệt rõ rệt Domain, Application, Infrastructure và Web API layers.",
        "Pipeline AI chống quá tải: Xây dựng cơ chế rate-limiting, retry exponential backoff và fallback tự động.",
        "Bảo mật & Phân quyền: Sử dụng stateless JWT Authentication kết hợp Role-Based Access Control (RBAC).",
        "Tối ưu hóa Database: Thiết lập compound indices trên Supabase PostgreSQL để truy vấn phân trang tức thì."
      ],
      flow: `[Độc giả (React + TS)]  <== RESTful API (JSON / JWT) ==>  [ASP.NET Core Web API]
                                                                  |
                                +----------------------------------+----------------------------------+
                                |                                                                     |
                                v                                                                     v
                      [Supabase PostgreSQL]                                                 [Google Gemini 1.5 API]
                      (Indexes, RBAC Data)                                                  (TL;DR Synthesis & Tags)`,
      repo: "https://github.com/phuctran1501/NewsHub"
    },
    en: {
      title: "NewsHub — AI News Aggregator & Intelligence Architecture",
      tagline: "C# ASP.NET Core • React • TypeScript • Supabase (PostgreSQL) • Gemini AI",
      overview: "NewsHub mitigates cognitive information overload through an automated ingestion pipeline that parses articles and orchestrates Gemini AI for 10-second TL;DR synthesis.",
      highlights: [
        "Clean Architecture Design: Strict decoupling between Domain, Application, and Infrastructure layers.",
        "Resilient AI Pipeline: Rate-limiting, retry backoff, and graceful degradation around the Gemini API.",
        "Enterprise Security: Stateless JWT tokens with Role-Based Access Control (RBAC).",
        "Optimized Persistence: Supabase PostgreSQL tuned with compound indices on publish dates and tags."
      ],
      flow: `[Reader Client (React + TS)]  <== RESTful API (JSON / JWT) ==>  [ASP.NET Core Web API]
                                                                        |
                                     +----------------------------------+----------------------------------+
                                     |                                                                     |
                                     v                                                                     v
                           [Supabase PostgreSQL]                                                 [Google Gemini 1.5 API]
                           (Indexes, RBAC Data)                                                  (TL;DR Synthesis & Tags)`,
      repo: "https://github.com/phuctran1501/NewsHub"
    }
  },

  ctu: {
    vi: {
      title: "CTU-Scheduler — Hệ thống Giải bài toán Ràng buộc Thời khóa biểu",
      tagline: "C# .NET Desktop Architecture • Thuật toán Constraint Satisfaction",
      overview: "Mỗi mùa đăng ký học phần, hàng ngàn sinh viên Đại học Cần Thơ gặp tình trạng trùng lịch học hoặc hết chỗ lớp. CTU-Scheduler giải quyết triệt để bài toán này với thuật toán tự động ghép lịch không trùng lặp.",
      highlights: [
        "Thuật toán giải bài toán ràng buộc (CSP): Tự động duyệt hoán vị các nhóm học phần, cắt tỉa (pruning) các nhánh xung đột.",
        "Đồng bộ sĩ số thực: Phân tích dữ liệu lớp học thời gian thực, cảnh báo nhóm đã đầy.",
        "Trực quan hóa dạng lưới: Hiển thị thời khóa biểu dạng bảng trực quan, hỗ trợ xuất lịch 1-click."
      ],
      flow: `[Danh sách môn sinh viên chọn] ➔ [Crawl / Parse dữ liệu lớp học CTU]
                                                |
                                                v
[Thuật toán Constraint Satisfaction] ➔ Cắt tỉa các nhánh trùng giờ & kiểm tra sĩ số
                                                |
                                                v
[Lưới thời khóa biểu tối ưu (0 xung đột)] ➔ 1-Click Export & Đồng bộ`,
      repo: "https://github.com/phuctran1501/CTU-Scheduler"
    },
    en: {
      title: "CTU-Scheduler — Constraint Satisfaction Timetable Optimizer",
      tagline: "C# .NET Desktop Architecture • Constraint Satisfaction Algorithm",
      overview: "Every semester, thousands of Can Tho University students face course conflicts and filled class quotas. CTU-Scheduler automates conflict-free timetable permutations in milliseconds.",
      highlights: [
        "Constraint Satisfaction Solver: Evaluates class group permutations, pruning overlapping time slots algorithmically.",
        "Real-Time Seat Verification: Scrapes and parses live course enrollment quotas to alert students of filled sections.",
        "Intuitive Grid Rendering: Color-coded weekly timetable layout with 1-click batch export."
      ],
      flow: `[Student Course Selection] ➔ [Real-Time CTU Class Schedule Parser]
                                                |
                                                v
[Constraint Satisfaction Engine] ➔ Prunes time overlaps & verifies live seat limits
                                                |
                                                v
[Optimal Conflict-Free Grid] ➔ 1-Click Batch Export & Persistence`,
      repo: "https://github.com/phuctran1501/CTU-Scheduler"
    }
  },

  smarthire: {
    vi: {
      title: "SmartHire — Nền tảng Tuyển dụng & Chấm điểm CV chuẩn ATS",
      tagline: "Full-Stack Web • Xử lý ngôn ngữ tự nhiên (NLP) • Matching Score Engine",
      overview: "Dự án chuyên ngành Kỹ thuật Phần mềm tại Đại học Cần Thơ (SE-Project-CTU), tập trung tự động hóa quy trình sàng lọc hồ sơ cho nhà tuyển dụng và chấm điểm tương thích CV theo chuẩn ATS.",
      highlights: [
        "Bộ trích xuất thực thể: Ứng dụng NLP để phân tích kỹ năng, số năm kinh nghiệm, học vấn từ CV và đối chiếu với JD.",
        "Chấm điểm độ tương thích: Thuật toán tính toán trọng số tương quan giữa yêu cầu công việc và năng lực ứng viên.",
        "Cổng thông tin hai chiều: Module riêng biệt cho Nhà tuyển dụng và Ứng viên."
      ],
      flow: `[Ứng viên nộp CV (PDF/Docx)] ➔ [NLP Parser & Trích xuất kỹ năng]
                                                |
                                                v
[Bộ so khớp ATS Matcher]  <== Đối chiếu tiêu chí ==>  [Mô tả công việc (JD)]
                                                |
                                                v
[Báo cáo độ phù hợp (%) + Radar kỹ năng] ➔ Trực quan hóa cho Recruiter`,
      repo: "https://github.com/phuctran1501/SmartHire"
    },
    en: {
      title: "SmartHire — Intelligent Recruitment & ATS Matching Platform",
      tagline: "Full-Stack Web • Natural Language Processing (NLP) • Scoring Engine",
      overview: "Specialized Software Engineering project at Can Tho University (SE-Project-CTU), automating initial applicant triage and scoring resume fitness against enterprise ATS criteria.",
      highlights: [
        "Entity Extraction Engine: Leverages NLP to tokenize skills, years of experience, and degrees from candidate CVs.",
        "Deterministic Matching Metric: Computes multidimensional correlation weights between applicant capabilities and JD parameters.",
        "Dual-Portal Workflows: Specialized interfaces for both Talent Acquisition teams and Applicants."
      ],
      flow: `[Candidate Submits CV (PDF)] ➔ [NLP Extraction Pipeline]
                                                |
                                                v
[ATS Scoring Engine]  <== Correlation Comparison ==>  [Job Description (JD)]
                                                |
                                                v
[Match Grade (%) + Skill Radar] ➔ Actionable Recruiter Analytics Dashboard`,
      repo: "https://github.com/phuctran1501"
    }
  },

  nimdora: {
    vi: {
      title: "Nimdora — Bộ máy Trò chơi Chiến thuật Toán học Tổ hợp",
      tagline: "TypeScript • Combinatorial Game Theory • Desktop Application",
      overview: "Nimdora mô phỏng trò chơi toán học kinh điển NIM trên bối cảnh vũ trụ. Cài đặt thuật toán giải trạng thái tối ưu P-position và N-position dựa trên Định lý Bouton và phép toán XOR Nim-sum.",
      highlights: [
        "Định lý Bouton (Bouton's Theorem): Cài đặt thuật toán tính tổng Nim-sum bằng phép toán XOR (P1 ⊕ P2 ⊕ P3).",
        "Trạng thái P & N: Khi Nim-sum = 0 là P-position (người đi trước thua); khi Nim-sum ≠ 0 là N-position (người đi trước thắng).",
        "Giao diện TypeScript thuần khiết: Xây dựng bằng TypeScript với logic toán học chính xác 100%."
      ],
      flow: `[Trạng thái đống sỏi hiện tại: {P1, P2, P3}]
                    |
                    v
[Tính toán XOR Nim-Sum: S = P1 ^ P2 ^ P3]
                    |
      +-------------+-------------+
      |                           |
  [S != 0 (N-pos)]            [S == 0 (P-pos)]
      |                           |
      v                           v
[AI tìm đống Pi sao cho     [Mọi nước đi đều dẫn đến S != 0.
 Pi ^ S < Pi; bốc           AI đi ngẫu nhiên 1 viên để
 Pi - (Pi ^ S) viên]         chờ người chơi sai lầm]
      |                           |
      +-------------+-------------+
                    |
                    v
    [Cập nhật trạng thái đống sỏi]`,
      repo: "https://github.com/phuctran1501/Nimdora"
    },
    en: {
      title: "Nimdora — Combinatorial Game Theory Engine",
      tagline: "TypeScript • Combinatorial Game Theory • Desktop Application",
      overview: "Nimdora is a desktop strategy game modeling the mathematical game of NIM within a cosmic exploration aesthetic. Implements deterministic Bouton's Theorem to compute perfect play via XOR bitwise arithmetic.",
      highlights: [
        "Bouton's Theorem: Evaluates the Nim-sum across all piles using XOR operations (P1 ⊕ P2 ⊕ P3).",
        "P-Position & N-Position Classification: A zero Nim-sum guarantees a previous-player win (P-position); non-zero guarantees next-player win (N-position).",
        "Pure TypeScript Rigor: Implemented with strict typing, zero external dependencies for game logic, and responsive simulation."
      ],
      flow: `[Current Pile Configuration: {P1, P2, P3}]
                    |
                    v
[Compute XOR Nim-Sum: S = P1 ^ P2 ^ P3]
                    |
      +-------------+-------------+
      |                           |
  [S != 0 (N-pos)]            [S == 0 (P-pos)]
      |                           |
      v                           v
[AI identifies pile Pi where   [All transitions lead to S != 0.
 Pi ^ S < Pi; removes           AI makes minimal 1-stone move
 Pi - (Pi ^ S) stones]          awaiting human blunder]
      |                           |
      +-------------+-------------+
                    |
                    v
   [State updated & turn dispatched]`,
      repo: "https://github.com/phuctran1501/Nimdora"
    }
  }
};

// ================= GLOBAL BILINGUAL MANAGER (VI / EN) =================
window.currentLang = 'vi';

window.setLanguage = function (lang) {
  window.currentLang = lang;
  localStorage.setItem('phuctran_portfolio_lang', lang);

  const dict = window.I18N && window.I18N[lang] ? window.I18N[lang] : (window.I18N ? window.I18N.vi : {});

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.textContent = dict[key];
      el.setAttribute('data-active-text', dict[key]);
      if (el._scrambler) {
        el._scrambler.isScrambling = false;
        if (el._scrambler.frameRequest) cancelAnimationFrame(el._scrambler.frameRequest);
      }
    }
  });

  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    if (dict[key]) {
      el.setAttribute('title', dict[key]);
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key]) {
      el.setAttribute('placeholder', dict[key]);
    }
  });

  // Toggle active class on lang buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    const btnLang = btn.getAttribute('data-lang');
    if (btnLang === lang) {
      btn.className = 'lang-btn px-2 py-0.5 rounded-full transition bg-[#1f5ca9] text-white font-bold';
    } else {
      btn.className = 'lang-btn px-2 py-0.5 rounded-full transition text-[var(--text-secondary)] hover:text-[#1f5ca9]';
    }
  });

  // Update dynamic elements in Sandboxes & Command Palette
  updateSandboxLanguage(lang);
  renderCmdPaletteItems();

  if (window.hiFiDeck) {
    window.hiFiDeck.updateUI(window.hiFiDeck.isPlaying);
  }
};

function updateSandboxLanguage(lang) {
  const dict = window.I18N[lang] || window.I18N.vi;
  const nimLog = document.getElementById('nim-sandbox-log');
  if (nimLog && nimLog.dataset.initialState !== 'false') {
    nimLog.textContent = dict.sandbox_nim_log_init;
  }
}

// ================= DARK / LIGHT THEME MANAGER =================
window.currentTheme = 'dark'; // Dark mode priority

window.initTheme = function () {
  const saved = localStorage.getItem('phuctran_portfolio_theme') || 'dark';
  window.setTheme(saved);
};

window.setTheme = function (theme) {
  window.currentTheme = theme;
  localStorage.setItem('phuctran_portfolio_theme', theme);

  const html = document.documentElement;
  const icon = document.getElementById('theme-icon');

  if (theme === 'dark') {
    html.classList.add('dark');
    if (icon) icon.textContent = '☀️';
  } else {
    html.classList.remove('dark');
    if (icon) icon.textContent = '🌙';
  }
};

window.toggleTheme = function () {
  const next = window.currentTheme === 'dark' ? 'light' : 'dark';
  window.setTheme(next);
  window.playUiClick(850);
};

// ================= SYNTHESIZED MICRO AUDIO FEEDBACK =================
let audioCtx = null;
window.playUiClick = function (pitch = 850, type = 'sine') {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(pitch, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(pitch * 0.45, audioCtx.currentTime + 0.04);
    gain.gain.setValueAtTime(0.035, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.04);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.045);
  } catch (e) {}
};

// ================= LENIS SMOOTH MOMENTUM SCROLL =================
function initLenisScroll() {
  if (typeof Lenis !== 'undefined') {
    window.lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.6,
      infinite: false
    });

    function raf(time) {
      window.lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }
}

// ================= GSAP SCROLLTRIGGER REVEAL ANIMATIONS =================
function initGsapAnimations() {
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Staggered Hero Section entrance
    gsap.from('#hero .space-y-6 > *', {
      opacity: 0,
      y: 24,
      duration: 0.85,
      stagger: 0.1,
      ease: 'power3.out'
    });

    // Reveal Modern Cards on scroll
    gsap.utils.toArray('.modern-card').forEach((card) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: 'power2.out'
      });
    });
  }
}

// ================= TEXT SCRAMBLE / DECODER EFFECT (BUG-FREE & DIACRITIC SAFE) =================
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#0101XYZ';
    this.update = this.update.bind(this);
    this.isScrambling = false;
    this.frameRequest = null;
  }

  setText(newText) {
    if (this.isScrambling) return Promise.resolve();
    this.isScrambling = true;

    const oldText = this.el.innerText || '';
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => this.resolve = resolve);
    this.queue = [];

    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 10);
      const end = start + Math.floor(Math.random() * 12);
      this.queue.push({ from, to, start, end });
    }

    if (this.frameRequest) cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }

  update() {
    let output = '';
    let complete = 0;

    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.25) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="text-[#1f5ca9] dark:text-sky-400 font-mono">${char}</span>`;
      } else {
        output += from;
      }
    }

    this.el.innerHTML = output;

    if (complete === this.queue.length) {
      this.isScrambling = false;
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }

  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

function initTextScrambler() {
  document.querySelectorAll('[data-scramble]').forEach((el) => {
    const scrambler = new TextScramble(el);
    el._scrambler = scrambler;
    
    // Initialize active text
    el.setAttribute('data-active-text', el.innerText.trim());

    el.addEventListener('mouseenter', () => {
      // Always scramble to the current language's active text!
      const targetText = el.getAttribute('data-active-text') || el.innerText.trim();
      scrambler.setText(targetText);
      window.playUiClick(1100);
    });
  });
}

// ================= 3D CARD PERSPECTIVE & SPECULAR HOLOGRAPHIC GLARE =================
function init3DCardTilt() {
  const cards = document.querySelectorAll('.modern-card');

  cards.forEach(card => {
    card.classList.add('tilt-card-3d');

    // Add holographic sheen overlay if not present
    if (!card.querySelector('.holographic-sheen')) {
      const sheen = document.createElement('div');
      sheen.className = 'holographic-sheen';
      card.appendChild(sheen);
    }

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5.5;
      const rotateY = ((x - centerX) / centerX) * 7.5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// ================= MAGNETIC SPRING BUTTONS =================
function initMagneticButtons() {
  const buttons = document.querySelectorAll('.magnetic-btn, .btn-primary, .btn-secondary, #dock-audio-btn, #theme-toggle-btn');
  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.22;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.22;
      btn.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
    btn.addEventListener('click', () => {
      window.playUiClick(850);
    });
  });
}

// ================= HERO PORTRAIT DOSSIER MODAL =================
window.openDossierModal = function () {
  const modal = document.getElementById('dossier-modal');
  if (!modal) return;
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  window.lenis?.stop();
  document.body.style.overflow = 'hidden';
  window.playUiClick(750);
};

window.closeDossierModal = function () {
  const modal = document.getElementById('dossier-modal');
  if (!modal) return;
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  window.lenis?.start();
  document.body.style.overflow = '';
  window.playUiClick(600);
};

// ================= RAYCAST / LINEAR COMMAND PALETTE (CTRL+K) =================
const COMMAND_ACTIONS = [
  { id: 'nav-about', group: 'cmd_group_navigation', label: 'cmd_nav_about', icon: '👤', action: () => scrollToSection('about') },
  { id: 'nav-labs', group: 'cmd_group_navigation', label: 'cmd_nav_labs', icon: '🧪', action: () => scrollToSection('interactive-lab') },
  { id: 'nav-projects', group: 'cmd_group_navigation', label: 'cmd_nav_projects', icon: '🚀', action: () => scrollToSection('projects') },
  { id: 'nav-topology', group: 'cmd_group_navigation', label: 'cmd_nav_topology', icon: '📐', action: () => scrollToSection('topology') },
  { id: 'nav-lounge', group: 'cmd_group_navigation', label: 'cmd_nav_lounge', icon: '🎵', action: () => scrollToSection('audio-lounge') },
  { id: 'nav-contact', group: 'cmd_group_navigation', label: 'cmd_nav_contact', icon: '✉️', action: () => scrollToSection('contact') },
  { id: 'act-theme', group: 'cmd_group_actions', label: 'cmd_act_theme', icon: '🌗', action: () => window.toggleTheme() },
  { id: 'act-lang', group: 'cmd_group_actions', label: 'cmd_act_lang', icon: '🌐', action: () => window.setLanguage(window.currentLang === 'vi' ? 'en' : 'vi') },
  { id: 'act-audio', group: 'cmd_group_actions', label: 'cmd_act_audio', icon: '🔊', action: () => window.hiFiDeck?.toggle() },
  { id: 'act-dossier', group: 'cmd_group_actions', label: 'cmd_act_dossier', icon: '📄', action: () => window.openDossierModal() },
  { id: 'act-email', group: 'cmd_group_actions', label: 'cmd_act_email', icon: '📋', action: () => window.copyEmail() }
];

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    window.closeCmdPalette();
    if (window.lenis) {
      window.lenis.scrollTo(el, { offset: -70 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

window.openCmdPalette = function () {
  const modal = document.getElementById('cmd-palette-modal');
  const input = document.getElementById('cmd-search-input');
  if (!modal) return;
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  window.lenis?.stop();
  document.body.style.overflow = 'hidden';
  if (input) {
    input.value = '';
    renderCmdPaletteItems('');
    setTimeout(() => input.focus(), 60);
  }
  window.playUiClick(950);
};

window.closeCmdPalette = function () {
  const modal = document.getElementById('cmd-palette-modal');
  if (!modal) return;
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  window.lenis?.start();
  document.body.style.overflow = '';
  window.playUiClick(650);
};

function renderCmdPaletteItems(query = '') {
  const list = document.getElementById('cmd-items-list');
  if (!list) return;
  list.innerHTML = '';

  const lang = window.currentLang || 'vi';
  const dict = window.I18N[lang] || window.I18N.vi;
  const q = query.toLowerCase().trim();

  const filtered = COMMAND_ACTIONS.filter(item => {
    const text = (dict[item.label] || '').toLowerCase();
    return text.includes(q);
  });

  if (filtered.length === 0) {
    list.innerHTML = `<div class="p-4 text-center text-xs text-[var(--text-tertiary)] font-mono">${lang === 'vi' ? 'Không tìm thấy kết quả phù hợp' : 'No matching commands found'}</div>`;
    return;
  }

  filtered.forEach((item, idx) => {
    const el = document.createElement('div');
    el.className = `cmd-palette-item ${idx === 0 ? 'is-selected' : ''}`;
    el.innerHTML = `
      <div class="flex items-center gap-2.5">
        <span class="text-sm">${item.icon}</span>
        <span class="font-medium">${dict[item.label] || item.label}</span>
      </div>
      <span class="cmd-kbd">↵</span>
    `;
    el.addEventListener('click', () => {
      window.playUiClick(1000);
      item.action();
      window.closeCmdPalette();
    });
    list.appendChild(el);
  });
}

function initCmdPalette() {
  const input = document.getElementById('cmd-search-input');
  if (input) {
    input.addEventListener('input', (e) => {
      renderCmdPaletteItems(e.target.value);
    });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        window.closeCmdPalette();
      } else if (e.key === 'Enter') {
        const first = document.querySelector('.cmd-palette-item.is-selected') || document.querySelector('.cmd-palette-item');
        if (first) first.click();
      }
    });
  }

  // Global Ctrl+K / Cmd+K listener
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      const modal = document.getElementById('cmd-palette-modal');
      if (modal && !modal.classList.contains('hidden')) {
        window.closeCmdPalette();
      } else {
        window.openCmdPalette();
      }
    }
  });
}

// ================= INTERACTIVE SANDBOX LAB TABS (4 LABS) =================
window.switchSandboxTab = function (tabName) {
  const tabs = ['ctu', 'smarthire', 'nim', 'news'];
  tabs.forEach(t => {
    const btn = document.getElementById(`sandbox-tab-${t}`);
    const panel = document.getElementById(`sandbox-panel-${t}`);
    if (btn) btn.classList.toggle('active', t === tabName);
    if (panel) panel.classList.toggle('hidden', t !== tabName);
  });
  window.playUiClick(950);
};

// ================= LAB 1: CTU SOLVER SIMULATION =================
window.runCtuSolverSimulation = function () {
  const terminal = document.getElementById('ctu-solver-terminal');
  const resultGrid = document.getElementById('ctu-solver-result-grid');
  const btn = document.getElementById('ctu-solver-btn');
  if (!terminal) return;

  btn.disabled = true;
  resultGrid.classList.add('hidden');
  terminal.innerHTML = '';
  window.playUiClick(1050);

  const isEn = (window.currentLang || 'vi') === 'en';

  const steps = isEn ? [
    { text: '[INIT] Ingesting 4 registered course modules: [CT201, CT202, CT203, CT204]...', delay: 180 },
    { text: '[CSP-CORE] State space initialized: 48 timetable permutations...', delay: 500 },
    { text: '[PRUNING] Conflict detected: CT201 group 01 collides on Mon with CT202 group 03 ➔ PRUNED.', delay: 900 },
    { text: '[QUOTA-CHECK] Verifying real-time class capacity: CT203 has 8/45 open seats ➔ APPROVED.', delay: 1350 },
    { text: '[OPTIMIZE] Objective function computed: Weekly dispersion spread = 94.2% (Optimal).', delay: 1750 },
    { text: '[COMPLETE] Optimal conflict-free schedule synthesized in 11.8ms.', delay: 2150 }
  ] : [
    { text: '[INIT] Nạp danh mục 4 học phần đăng ký: [CT201, CT202, CT203, CT204]...', delay: 180 },
    { text: '[CSP-CORE] Khởi tạo không gian trạng thái: 48 hoán vị thời khóa biểu...', delay: 500 },
    { text: '[PRUNING] Phát hiện xung đột: CT201 nhóm 01 trùng giờ Thứ 2 với CT202 nhóm 03 ➔ CẮT TỈA (Pruned).', delay: 900 },
    { text: '[QUOTA-CHECK] Kiểm tra sĩ số trực tiếp: Nhóm CT203 (CSDL Phân tán) còn 8/45 chỗ ➔ HỢP LỆ (Approved).', delay: 1350 },
    { text: '[OPTIMIZE] Tính toán hàm mục tiêu: Độ dàn trải các ngày trong tuần = 94.2% (Tối ưu).', delay: 1750 },
    { text: '[COMPLETE] Đã tìm ra phương án tối ưu 0 xung đột trong 11.8ms.', delay: 2150 }
  ];

  steps.forEach((s) => {
    setTimeout(() => {
      const line = document.createElement('div');
      line.className = 'text-sky-400 font-mono text-xs';
      line.textContent = s.text;
      terminal.appendChild(line);
      terminal.scrollTop = terminal.scrollHeight;
    }, s.delay);
  });

  setTimeout(() => {
    btn.disabled = false;
    resultGrid.classList.remove('hidden');
    window.playUiClick(1200);
  }, 2350);
};

// ================= LAB 2: SMARTHIRE ATS RESUME MATCHER =================
window.runSmartHireSimulation = function () {
  const terminal = document.getElementById('smarthire-terminal');
  const result = document.getElementById('smarthire-result');
  const btn = document.getElementById('smarthire-btn');
  const candidateSelect = document.getElementById('smarthire-candidate-select');
  if (!terminal) return;

  btn.disabled = true;
  result.classList.add('hidden');
  terminal.innerHTML = '';
  window.playUiClick(1050);

  const isEn = (window.currentLang || 'vi') === 'en';
  const isPhuc = !candidateSelect || candidateSelect.value === 'phuc';

  const steps = isEn ? [
    { text: `[INSPECT] Parsing candidate dossier: ${isPhuc ? 'PHUC TRAN (Backend Specialist • C# Clean Architecture)' : 'Fresher Candidate B'}...`, delay: 180 },
    { text: '[TOKENIZE] NLP tokenizer extracted 32 technical competencies and 4 undergraduate course modules...', delay: 550 },
    { text: '[VECTOR-COSINE] Computing multidimensional semantic correlation against target Job Description (JD)...', delay: 1000 },
    { text: `[ATS-GRADE] Total ATS Compliance Score: ${isPhuc ? '96.4%' : '64.2%'} • Critical criteria: ${isPhuc ? '100% MATCHED' : 'DEFICIT IN BACKEND SYSTEMS'}.`, delay: 1450 },
    { text: '[STATUS] Recruiter assessment report generated and persisted.', delay: 1850 }
  ] : [
    { text: `[INSPECT] Tải hồ sơ ứng viên: ${isPhuc ? 'PHÚC TRẦN (Senior Backend • C# Clean Architecture)' : 'Fresher Candidate B'}...`, delay: 180 },
    { text: '[TOKENIZE] Bộ trích xuất NLP bóc tách 32 từ khóa kỹ năng & 4 năm học phần chuyên sâu...', delay: 550 },
    { text: '[VECTOR-COSINE] Tính toán độ tương quan ngữ nghĩa đa chiều với mô tả công việc (JD)...', delay: 1000 },
    { text: `[ATS-GRADE] Tổng điểm tương thích ATS: ${isPhuc ? '96.4%' : '64.2%'} • Tiêu chí bắt buộc: ${isPhuc ? '100% ĐẠT' : 'THIẾU KINH NGHIỆM THỰC CHIẾN'}.`, delay: 1450 },
    { text: '[STATUS] Xuất báo cáo khuyến nghị cho Nhà tuyển dụng hoàn tất.', delay: 1850 }
  ];

  steps.forEach((s) => {
    setTimeout(() => {
      const line = document.createElement('div');
      line.className = 'text-sky-400 font-mono text-xs';
      line.textContent = s.text;
      terminal.appendChild(line);
      terminal.scrollTop = terminal.scrollHeight;
    }, s.delay);
  });

  setTimeout(() => {
    btn.disabled = false;
    result.classList.remove('hidden');
    const scoreVal = document.getElementById('smarthire-score-val');
    const scoreBar = document.getElementById('smarthire-score-bar');
    if (scoreVal) scoreVal.textContent = isPhuc ? '96.4%' : '64.2%';
    if (scoreBar) scoreBar.style.width = isPhuc ? '96.4%' : '64.2%';
    window.playUiClick(1200);
  }, 2050);
};

// ================= LAB 3: PLAYABLE NIM GAME (BOUTON'S THEOREM AI) =================
let nimPiles = [3, 4, 5];
let isPlayerTurn = true;

window.resetNimGame = function () {
  nimPiles = [3, 4, 5];
  isPlayerTurn = true;
  updateNimUI();
  const isEn = (window.currentLang || 'vi') === 'en';
  const dict = window.I18N[isEn ? 'en' : 'vi'] || window.I18N.vi;
  const logEl = document.getElementById('nim-sandbox-log');
  const turnEl = document.getElementById('nim-sandbox-turn');
  if (logEl) logEl.textContent = dict.sandbox_nim_log_init;
  if (turnEl) turnEl.textContent = dict.sandbox_nim_turn_player;
  window.playUiClick(900);
};

window.nimTakeStone = function (pileIdx, count) {
  if (!isPlayerTurn) return;
  const isEn = (window.currentLang || 'vi') === 'en';
  const dict = window.I18N[isEn ? 'en' : 'vi'] || window.I18N.vi;

  if (nimPiles[pileIdx] < count) {
    alert(dict.sandbox_nim_not_enough);
    return;
  }

  nimPiles[pileIdx] -= count;
  updateNimUI();
  window.playUiClick(800);

  if (checkNimGameOver()) {
    document.getElementById('nim-sandbox-turn').textContent = dict.sandbox_nim_win_player;
    window.playUiClick(1300);
    return;
  }

  isPlayerTurn = false;
  document.getElementById('nim-sandbox-turn').textContent = dict.sandbox_nim_turn_ai;

  setTimeout(() => {
    executeAiNimMove();
  }, 700);
};

function executeAiNimMove() {
  const isEn = (window.currentLang || 'vi') === 'en';
  const dict = window.I18N[isEn ? 'en' : 'vi'] || window.I18N.vi;

  const nimSum = nimPiles[0] ^ nimPiles[1] ^ nimPiles[2];
  let targetPile = -1;
  let takeCount = 1;

  if (nimSum !== 0) {
    for (let i = 0; i < 3; i++) {
      const targetSize = nimPiles[i] ^ nimSum;
      if (targetSize < nimPiles[i]) {
        targetPile = i;
        takeCount = nimPiles[i] - targetSize;
        break;
      }
    }
  }

  if (targetPile === -1) {
    for (let i = 0; i < 3; i++) {
      if (nimPiles[i] > 0) {
        targetPile = i;
        takeCount = 1;
        break;
      }
    }
  }

  nimPiles[targetPile] -= takeCount;
  updateNimUI();

  const logEl = document.getElementById('nim-sandbox-log');
  if (logEl) {
    logEl.textContent = isEn
      ? `AI took ${takeCount} stone(s) from Pile ${targetPile + 1}. Current Nim-sum: ${nimPiles[0] ^ nimPiles[1] ^ nimPiles[2]}.`
      : `AI đã bốc ${takeCount} viên từ Đống ${targetPile + 1}. Nim-sum hiện tại: ${nimPiles[0] ^ nimPiles[1] ^ nimPiles[2]}.`;
  }

  if (checkNimGameOver()) {
    document.getElementById('nim-sandbox-turn').textContent = dict.sandbox_nim_win_ai;
    return;
  }

  isPlayerTurn = true;
  document.getElementById('nim-sandbox-turn').textContent = dict.sandbox_nim_turn_player;
}

function updateNimUI() {
  for (let i = 0; i < 3; i++) {
    const el = document.getElementById(`sandbox-pile-${i}`);
    if (el) el.textContent = nimPiles[i];
  }
}

function checkNimGameOver() {
  return nimPiles[0] === 0 && nimPiles[1] === 0 && nimPiles[2] === 0;
}

// ================= LAB 4: NEWSHUB GEMINI STREAM =================
window.runNewsHubAiSimulation = function () {
  const terminal = document.getElementById('newshub-ai-terminal');
  const result = document.getElementById('newshub-ai-result');
  const btn = document.getElementById('newshub-ai-btn');
  if (!terminal) return;

  btn.disabled = true;
  result.classList.add('hidden');
  terminal.innerHTML = '';
  window.playUiClick(1050);

  const isEn = (window.currentLang || 'vi') === 'en';

  const steps = isEn ? [
    { text: '[PIPELINE] Ingesting article: "ASP.NET Core 9 Clean Architecture & PostgreSQL"...', delay: 180 },
    { text: '[TOKENIZER] Segmented document into 1,420 tokens (Byte-Pair Encoding)...', delay: 550 },
    { text: '[STREAM] Dispatched payload to Google Gemini 1.5 Pro API endpoint...', delay: 1000 },
    { text: '[LLM-RESPONSE] Streaming completed (280ms latency, 142 tokens synthesized)...', delay: 1450 },
    { text: '[SUCCESS] 10-second TL;DR synthesis and entity extraction finished.', delay: 1850 }
  ] : [
    { text: '[PIPELINE] Trích xuất bài viết: "Kiến trúc ASP.NET Core 9 Clean Architecture & PostgreSQL"...', delay: 180 },
    { text: '[TOKENIZER] Chia nhỏ văn bản thành 1,420 token (Byte-Pair Encoding)...', delay: 550 },
    { text: '[STREAM] Gửi payload tới Gemini 1.5 Pro API endpoint...', delay: 1000 },
    { text: '[LLM-RESPONSE] Nhận phản hồi streaming (280ms latency, 142 tokens synthesized)...', delay: 1450 },
    { text: '[SUCCESS] Hoàn tất tóm tắt TL;DR và trích xuất thực thể thành công.', delay: 1850 }
  ];

  steps.forEach((s) => {
    setTimeout(() => {
      const line = document.createElement('div');
      line.className = 'text-sky-400 font-mono text-xs';
      line.textContent = s.text;
      terminal.appendChild(line);
      terminal.scrollTop = terminal.scrollHeight;
    }, s.delay);
  });

  setTimeout(() => {
    btn.disabled = false;
    result.classList.remove('hidden');
    window.playUiClick(1200);
  }, 2050);
};

// ================= CASE STUDY BREAKDOWN MODAL (PERFECT WHEEL SCROLLING) =================
window.openCaseStudy = function (key) {
  const study = CASE_STUDIES[key];
  if (!study) return;

  const lang = window.currentLang || 'vi';
  const langData = study[lang] || study.vi;

  const modal = document.getElementById('case-study-modal');
  const content = document.getElementById('case-study-content');
  if (!modal || !content) return;

  window.playUiClick(750);

  content.innerHTML = `
    <div class="flex items-start justify-between border-b border-[var(--border-subtle)] pb-4 mb-5">
      <div>
        <div class="badge-pill mb-2">
          <span>CTU ARCHITECTURAL BLUEPRINT</span>
        </div>
        <h3 class="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)]">${langData.title}</h3>
        <p class="text-xs sm:text-sm text-[#1f5ca9] dark:text-sky-400 font-mono mt-1 font-semibold">${langData.tagline}</p>
      </div>
      <button onclick="window.closeCaseStudy()" class="btn-secondary text-xs py-1 px-3 magnetic-btn">
        [ESC]
      </button>
    </div>

    <div class="space-y-6 text-xs sm:text-sm">
      <div>
        <div class="text-xs font-mono uppercase tracking-wider text-[#1f5ca9] dark:text-sky-400 font-bold mb-1.5">• 01. ${lang === 'vi' ? 'TỔNG QUAN' : 'OVERVIEW'}</div>
        <p class="text-[var(--text-secondary)] leading-relaxed font-sans">${langData.overview}</p>
      </div>

      <div>
        <div class="text-xs font-mono uppercase tracking-wider text-[#1f5ca9] dark:text-sky-400 font-bold mb-1.5">• 02. ${lang === 'vi' ? 'NGUYÊN LÝ THIẾT KẾ' : 'DESIGN PRINCIPLES'}</div>
        <ul class="space-y-2 text-[var(--text-secondary)]">
          ${langData.highlights.map(h => `<li class="flex items-start gap-2"><span class="text-[#1f5ca9] dark:text-sky-400 font-bold">▪</span><div>${h}</div></li>`).join('')}
        </ul>
      </div>

      <div>
        <div class="text-xs font-mono uppercase tracking-wider text-[#1f5ca9] dark:text-sky-400 font-bold mb-1.5">• 03. ${lang === 'vi' ? 'SƠ ĐỒ LUỒNG DỮ LIỆU' : 'DATA FLOW TOPOLOGY'}</div>
        <div class="bg-black/90 text-sky-300 p-4 rounded-xl border border-white/10 font-mono text-[11px] overflow-x-auto whitespace-pre leading-relaxed">
${langData.flow}
        </div>
      </div>

      <div class="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[var(--border-subtle)]">
        <a href="${langData.repo}" target="_blank" class="btn-primary text-xs magnetic-btn">
          ${lang === 'vi' ? 'XEM MÃ NGUỒN GITHUB ↗' : 'VIEW SOURCE ON GITHUB ↗'}
        </a>
        <button onclick="window.closeCaseStudy()" class="btn-secondary text-xs magnetic-btn">
          ${lang === 'vi' ? 'ĐÓNG CỬA SỔ' : 'CLOSE WINDOW'}
        </button>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  window.lenis?.stop();
  document.body.style.overflow = 'hidden';

  // Prevent wheel bubbling to window
  content.addEventListener('wheel', (e) => {
    e.stopPropagation();
  }, { passive: true });
};

window.closeCaseStudy = function () {
  const modal = document.getElementById('case-study-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    window.lenis?.start();
    document.body.style.overflow = '';
    window.playUiClick(600);
  }
};

// Global Toast Notification Helper
window.showToast = function (message) {
  const toast = document.getElementById('toast');
  const msgEl = document.getElementById('toast-msg');
  if (toast && msgEl) {
    msgEl.textContent = message;
    toast.classList.remove('opacity-0', 'translate-y-24', 'pointer-events-none');
    toast.classList.add('opacity-100', 'translate-y-0');
    if (window._toastTimeout) clearTimeout(window._toastTimeout);
    window._toastTimeout = setTimeout(() => {
      toast.classList.remove('opacity-100', 'translate-y-0');
      toast.classList.add('opacity-0', 'translate-y-24', 'pointer-events-none');
    }, 2500);
  }
};

// Clipboard Helper
window.copyEmail = function () {
  const email = 'phuctran1501@gmail.com';
  navigator.clipboard.writeText(email).then(() => {
    const isVi = (window.currentLang || 'vi') === 'vi';
    window.showToast(isVi ? 'ĐÃ SAO CHÉP EMAIL VÀO BỘ NHỚ TẠM!' : 'EMAIL COPIED TO CLIPBOARD!');
    window.playUiClick(1200);
  });
};

// Global Keyboard Handler (ESC to close modals)
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    window.closeCaseStudy();
    window.closeDossierModal();
    window.closeCmdPalette();
  }
});

// DOM Ready Handler
document.addEventListener('DOMContentLoaded', () => {
  window.initTheme();

  const savedLang = localStorage.getItem('phuctran_portfolio_lang') || 'vi';
  window.setLanguage(savedLang);

  initLenisScroll();
  initGsapAnimations();
  initTextScrambler();
  init3DCardTilt();
  initMagneticButtons();
  initCmdPalette();

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name')?.value || '';
      const email = document.getElementById('form-email')?.value || '';
      const msg = document.getElementById('form-msg')?.value || '';

      const subject = encodeURIComponent(`[Portfolio Contact] From ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${msg}`);

      window.location.href = `mailto:phuctran1501@gmail.com?subject=${subject}&body=${body}`;
    });
  }
});
