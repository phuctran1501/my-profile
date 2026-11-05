/**
 * Phuc Tran Portfolio — Interactive Systems Engine & 4 Live Sandboxes
 * Can Tho University (CTU) Blue Theme — Zero "//" Marks
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
      flow: `
[Độc giả (React + TS)]  <== RESTful API (JSON / JWT) ==>  [ASP.NET Core Web API]
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
      flow: `
[Reader Client (React + TS)]  <== RESTful API (JSON / JWT) ==>  [ASP.NET Core Web API]
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
      flow: `
[Danh sách môn sinh viên chọn] ➔ [Crawl / Parse dữ liệu lớp học CTU]
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
      flow: `
[Student Course Selection] ➔ [Real-Time CTU Class Schedule Parser]
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
      flow: `
[Ứng viên nộp CV (PDF/Docx)] ➔ [NLP Parser & Trích xuất kỹ năng]
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
      flow: `
[Candidate Submits CV (PDF)] ➔ [NLP Extraction Pipeline]
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
      flow: `
[Trạng thái đống sỏi hiện tại: {P1, P2, P3}]
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
      flow: `
[Current Pile Configuration: {P1, P2, P3}]
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

// Global Language Manager (VI / EN)
window.currentLang = 'vi';
window.setLanguage = function (lang) {
  window.currentLang = lang;
  localStorage.setItem('phuctran_portfolio_lang', lang);

  const dict = window.I18N && window.I18N[lang] ? window.I18N[lang] : window.I18N.vi;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  // Toggle active class on lang switcher buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    const btnLang = btn.getAttribute('data-lang');
    if (btnLang === lang) {
      btn.className = 'lang-btn px-2.5 py-1 transition bg-[#1f5ca9] text-white font-bold border border-[#1f5ca9]';
    } else {
      btn.className = 'lang-btn px-2.5 py-1 transition text-slate-500 border border-transparent hover:text-[#1f5ca9]';
    }
  });

  if (window.hiFiDeck) {
    window.hiFiDeck.updateUI(window.hiFiDeck.isPlaying);
  }

  if (window.spatialEngine && window.spatialEngine.updateToggleBtn) {
    window.spatialEngine.updateToggleBtn();
  }
};

// ================= DARK / LIGHT THEME MANAGER =================
window.currentTheme = 'dark'; // Default to elegant CTU Dark Mode (toned down)

window.initTheme = function () {
  const saved = localStorage.getItem('phuctran_portfolio_theme') || 'dark';
  window.setTheme(saved);
};

window.setTheme = function (theme) {
  window.currentTheme = theme;
  localStorage.setItem('phuctran_portfolio_theme', theme);

  const html = document.documentElement;
  const toggleBtn = document.getElementById('theme-toggle-btn');

  if (theme === 'dark') {
    html.classList.add('dark');
    if (toggleBtn) {
      toggleBtn.innerHTML = '<span>⛅</span>';
    }
  } else {
    html.classList.remove('dark');
    if (toggleBtn) {
      toggleBtn.innerHTML = '<span>🌙</span>';
    }
  }
};

window.toggleTheme = function () {
  const next = window.currentTheme === 'dark' ? 'light' : 'dark';
  window.setTheme(next);
};

// ================= 3D GYROSCOPIC TILT FOR HERO PORTRAIT STAGE =================
function initHeroStage3D() {
  const stage = document.querySelector('.hero-stage-container');
  const card = document.querySelector('.hero-stage-card');
  if (!stage || !card) return;

  stage.addEventListener('mousemove', (e) => {
    const rect = stage.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 12;

    card.style.transform = `perspective(1200px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;

    const telemetryEl = document.getElementById('hero-telemetry-coords');
    if (telemetryEl) {
      telemetryEl.textContent = `ROT_X: ${rotateX.toFixed(1)}° • ROT_Y: ${rotateY.toFixed(1)}°`;
    }
  });

  stage.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    const telemetryEl = document.getElementById('hero-telemetry-coords');
    if (telemetryEl) {
      telemetryEl.textContent = 'CTU_SYSTEM • 3D_IDLE';
    }
  });
}

// ================= HERO PORTRAIT DOSSIER MODAL =================
window.openDossierModal = function () {
  const modal = document.getElementById('dossier-modal');
  if (!modal) return;
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.style.overflow = 'hidden';
};

window.closeDossierModal = function () {
  const modal = document.getElementById('dossier-modal');
  if (!modal) return;
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  document.body.style.overflow = '';
};

// ================= INTERACTIVE SANDBOX LAB TABS (4 LABS) =================
window.switchSandboxTab = function (tabName) {
  const tabs = ['ctu', 'smarthire', 'nim', 'news'];
  tabs.forEach(t => {
    const btn = document.getElementById(`sandbox-tab-${t}`);
    const panel = document.getElementById(`sandbox-panel-${t}`);
    if (t === tabName) {
      if (btn) {
        btn.className = 'sandbox-tab-btn px-4 py-2 bg-[#1f5ca9] text-white border border-[#1f5ca9] font-bold transition';
      }
      if (panel) panel.classList.remove('hidden');
    } else {
      if (btn) {
        btn.className = 'sandbox-tab-btn px-4 py-2 bg-transparent text-[var(--text-muted)] border border-[var(--border-line)] hover:text-[#1f5ca9] hover:bg-blue-50/10 transition';
      }
      if (panel) panel.classList.add('hidden');
    }
  });
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

  const steps = [
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
      line.className = 'text-[#38bdf8] font-mono text-xs';
      line.textContent = s.text;
      terminal.appendChild(line);
      terminal.scrollTop = terminal.scrollHeight;
    }, s.delay);
  });

  setTimeout(() => {
    btn.disabled = false;
    resultGrid.classList.remove('hidden');
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

  const isPhuc = !candidateSelect || candidateSelect.value === 'phuc';

  const steps = [
    { text: `[INSPECT] Tải hồ sơ ứng viên: ${isPhuc ? 'PHÚC TRẦN (Senior Backend • C# Clean Architecture)' : 'Fresher Candidate B'}...`, delay: 180 },
    { text: '[TOKENIZE] Bộ trích xuất NLP bóc tách 32 từ khóa kỹ năng & 4 năm học phần chuyên sâu...', delay: 550 },
    { text: '[VECTOR-COSINE] Tính toán độ tương quan ngữ nghĩa đa chiều với mô tả công việc (JD)...', delay: 1000 },
    { text: `[ATS-GRADE] Tổng điểm tương thích ATS: ${isPhuc ? '96.4%' : '64.2%'} • Tiêu chí bắt buộc: ${isPhuc ? '100% ĐẠT' : 'THIẾU KINH NGHIỆM THỰC CHIẾN'}.`, delay: 1450 },
    { text: '[STATUS] Xuất báo cáo khuyến nghị cho Nhà tuyển dụng hoàn tất.', delay: 1850 }
  ];

  steps.forEach((s) => {
    setTimeout(() => {
      const line = document.createElement('div');
      line.className = 'text-[#38bdf8] font-mono text-xs';
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
  }, 2050);
};

// ================= LAB 3: PLAYABLE NIM GAME (BOUTON'S THEOREM AI) =================
let nimPiles = [3, 4, 5];
let isPlayerTurn = true;

window.resetNimGame = function () {
  nimPiles = [3, 4, 5];
  isPlayerTurn = true;
  updateNimUI();
  const logEl = document.getElementById('nim-sandbox-log');
  if (logEl) {
    logEl.textContent = 'Trạng thái khởi tạo: Nim-sum = 3 ^ 4 ^ 5 = 2. Nhấp nút -1, -2, -3 để đi nước cờ của bạn!';
  }
};

window.nimTakeStone = function (pileIdx, count) {
  if (!isPlayerTurn) return;
  if (nimPiles[pileIdx] < count) {
    alert('Đống này không đủ số lượng sỏi để bốc!');
    return;
  }

  nimPiles[pileIdx] -= count;
  updateNimUI();

  if (checkNimGameOver()) {
    document.getElementById('nim-sandbox-turn').textContent = '🎉 BẠN ĐÃ THẮNG! (BẠN ĐÃ BỐC VIÊN SỎI CUỐI CÙNG)';
    return;
  }

  isPlayerTurn = false;
  document.getElementById('nim-sandbox-turn').textContent = 'AI đang tính toán tổng Nim-sum...';

  setTimeout(() => {
    executeAiNimMove();
  }, 800);
};

function executeAiNimMove() {
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
    logEl.textContent = `AI đã bốc ${takeCount} viên từ Đống ${targetPile + 1}. Nim-sum hiện tại: ${nimPiles[0] ^ nimPiles[1] ^ nimPiles[2]}.`;
  }

  if (checkNimGameOver()) {
    document.getElementById('nim-sandbox-turn').textContent = '🤖 AI ĐÃ THẮNG! (Định lý Bouton chứng minh AI luôn thắng nếu bắt đầu từ N-position)';
    return;
  }

  isPlayerTurn = true;
  document.getElementById('nim-sandbox-turn').textContent = 'Lượt của bạn (Người chơi)';
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

  const steps = [
    { text: '[PIPELINE] Trích xuất bài viết: "Kiến trúc ASP.NET Core 9 Clean Architecture & PostgreSQL"...', delay: 180 },
    { text: '[TOKENIZER] Chia nhỏ văn bản thành 1,420 token (Byte-Pair Encoding)...', delay: 550 },
    { text: '[STREAM] Gửi payload tới Gemini 1.5 Pro API endpoint...', delay: 1000 },
    { text: '[LLM-RESPONSE] Nhận phản hồi streaming (280ms latency, 142 tokens synthesized)...', delay: 1450 },
    { text: '[SUCCESS] Hoàn tất tóm tắt TL;DR và trích xuất thực thể thành công.', delay: 1850 }
  ];

  steps.forEach((s) => {
    setTimeout(() => {
      const line = document.createElement('div');
      line.className = 'text-[#38bdf8] font-mono text-xs';
      line.textContent = s.text;
      terminal.appendChild(line);
      terminal.scrollTop = terminal.scrollHeight;
    }, s.delay);
  });

  setTimeout(() => {
    btn.disabled = false;
    result.classList.remove('hidden');
  }, 2050);
};

// ================= CASE STUDY BREAKDOWN MODAL =================
window.openCaseStudy = function (key) {
  const study = CASE_STUDIES[key];
  if (!study) return;

  const lang = window.currentLang || 'vi';
  const langData = study[lang] || study.vi;

  const modal = document.getElementById('case-study-modal');
  const content = document.getElementById('case-study-content');
  if (!modal || !content) return;

  content.innerHTML = `
    <div class="flex items-start justify-between border-b border-[var(--border-line)] pb-5 mb-5">
      <div>
        <div class="inline-flex items-center gap-2 px-2.5 py-0.5 text-xs font-mono bg-blue-900/20 text-[#1f5ca9] border border-blue-500/30 mb-2 font-bold">
          <span>CTU ARCHITECTURAL BLUEPRINT • V2.0</span>
        </div>
        <h3 class="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-main)]">${langData.title}</h3>
        <p class="text-xs sm:text-sm text-[#1f5ca9] font-mono mt-1 font-semibold">${langData.tagline}</p>
      </div>
      <button onclick="window.closeCaseStudy()" class="px-3 py-1.5 text-[var(--text-dim)] hover:text-[#1f5ca9] border border-[var(--border-line)] hover:border-[#1f5ca9] transition font-mono text-xs font-semibold">
        [ESC • CLOSE]
      </button>
    </div>

    <div class="space-y-6 text-xs sm:text-sm">
      <div>
        <div class="text-xs font-mono uppercase tracking-wider text-[#1f5ca9] font-bold mb-1.5">• 01. TỔNG QUAN</div>
        <p class="text-[var(--text-muted)] leading-relaxed font-sans">${langData.overview}</p>
      </div>

      <div>
        <div class="text-xs font-mono uppercase tracking-wider text-[#1f5ca9] font-bold mb-1.5">• 02. NGUYÊN LÝ THIẾT KẾ</div>
        <ul class="space-y-2 text-[var(--text-muted)]">
          ${langData.highlights.map(h => `<li class="flex items-start gap-2"><span class="text-[#1f5ca9] font-bold">▪</span><div>${h}</div></li>`).join('')}
        </ul>
      </div>

      <div>
        <div class="text-xs font-mono uppercase tracking-wider text-[#1f5ca9] font-bold mb-1.5">• 03. SƠ ĐỒ LUỒNG DỮ LIỆU</div>
        <div class="bg-slate-950 text-sky-300 p-4 border border-slate-800 font-mono text-[11px] overflow-x-auto whitespace-pre">
${langData.flow}
        </div>
      </div>

      <div class="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[var(--border-line)]">
        <a href="${langData.repo}" target="_blank" class="chamfer-btn magnetic-btn px-4 py-2 bg-[#1f5ca9] hover:bg-[#0f3d75] text-white font-bold text-xs font-mono transition">
          ${lang === 'vi' ? 'XEM MÃ NGUỒN GITHUB ↗' : 'VIEW SOURCE ON GITHUB ↗'}
        </a>
        <button onclick="window.closeCaseStudy()" class="chamfer-btn magnetic-btn px-4 py-2 bg-[var(--bg-surface)] hover:bg-[var(--bg-card)] text-[var(--text-main)] hover:text-[#1f5ca9] text-xs font-mono border border-[var(--border-line)] transition font-semibold">
          ${lang === 'vi' ? 'ĐÓNG CỬA SỔ' : 'CLOSE WINDOW'}
        </button>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.style.overflow = 'hidden';
  if (window.initMagneticHover) window.initMagneticHover();
};

window.closeCaseStudy = function () {
  const modal = document.getElementById('case-study-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
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
  });
};

// ================= MAGNETIC HOVER EFFECT =================
window.initMagneticHover = function () {
  const magneticEls = document.querySelectorAll('.magnetic-btn, .chamfer-btn');
  
  magneticEls.forEach(el => {
    if (el.dataset.magneticBound) return;
    el.dataset.magneticBound = 'true';

    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      const pull = 0.25;
      el.style.transform = `translate(${x * pull}px, ${y * pull}px)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });
};

// ================= SPOTLIGHT BORDER GLOW =================
window.initSpotlightBorders = function () {
  const cards = document.querySelectorAll('.spotlight-card, .arch-card');

  cards.forEach(card => {
    if (card.dataset.spotlightBound) return;
    card.dataset.spotlightBound = 'true';

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
};

// ================= HUD MINIMIZATION CONTROLLERS =================
window.toggleRadarMinimize = function () {
  const radar = document.getElementById('spatial-radar-hud');
  const minBtn = document.getElementById('radar-min-btn');
  if (!radar) return;

  const isMin = radar.classList.toggle('is-minimized');
  if (minBtn) {
    minBtn.textContent = isMin ? '[+]' : '_';
    minBtn.title = isMin ? 'Mở rộng Radar' : 'Thu nhỏ Radar';
  }
  localStorage.setItem('phuctran_radar_minimized', isMin ? 'true' : 'false');
};

window.toggleWalkmanMinimize = function () {
  const dock = document.getElementById('floating-audio-dock');
  const minBtn = document.getElementById('walkman-min-btn');
  if (!dock) return;

  const isMin = dock.classList.toggle('is-minimized');
  if (minBtn) {
    minBtn.textContent = isMin ? '[+]' : '_';
    minBtn.title = isMin ? 'Mở rộng Walkman' : 'Thu nhỏ Walkman';
  }
  localStorage.setItem('phuctran_walkman_minimized', isMin ? 'true' : 'false');
};

window.initHUDMinState = function () {
  if (localStorage.getItem('phuctran_radar_minimized') === 'true') {
    const radar = document.getElementById('spatial-radar-hud');
    const minBtn = document.getElementById('radar-min-btn');
    if (radar) radar.classList.add('is-minimized');
    if (minBtn) {
      minBtn.textContent = '[+]';
      minBtn.title = 'Mở rộng Radar';
    }
  }

  if (localStorage.getItem('phuctran_walkman_minimized') === 'true') {
    const dock = document.getElementById('floating-audio-dock');
    const minBtn = document.getElementById('walkman-min-btn');
    if (dock) dock.classList.add('is-minimized');
    if (minBtn) {
      minBtn.textContent = '[+]';
      minBtn.title = 'Mở rộng Walkman';
    }
  }
};

// Global Keyboard Handler (ESC to close modals)
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    window.closeCaseStudy();
    window.closeDossierModal();
  }
});

// DOM Ready Handler
document.addEventListener('DOMContentLoaded', () => {
  window.initTheme();

  const savedLang = localStorage.getItem('phuctran_portfolio_lang') || 'vi';
  window.setLanguage(savedLang);

  initHeroStage3D();
  window.initMagneticHover();
  window.initSpotlightBorders();
  window.initHUDMinState();

  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
    });
  }

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name')?.value || '';
      const email = document.getElementById('form-email')?.value || '';
      const msg = document.getElementById('form-msg')?.value || '';

      const subject = encodeURIComponent(`[Portfolio Transmission] From ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${msg}`);

      window.location.href = `mailto:phuctran1501@gmail.com?subject=${subject}&body=${body}`;
    });
  }
});
