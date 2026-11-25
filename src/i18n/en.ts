import type { TranslationKey } from './vi';

export const en: Record<TranslationKey, string> = {
  // Header & Navigation HUD
  brand_name: 'PHUC TRAN',
  hero_first: 'PHUC',
  hero_last: 'TRAN',
  hud_filmstrip: 'FILMSTRIP',
  hud_xray: 'X-RAY',
  hud_auto: 'AUTO',
  hud_stop: 'STOP',
  hud_invert: 'DARK',
  hud_light: 'LIGHT',
  hud_search: 'SEARCH',

  // Act Titles (6 Acts)
  act_01: 'MONOLITH',
  act_02: 'STACK',
  act_03: 'WORKS',
  act_04: 'SIGNAL',
  act_05: 'ALGORITHMS',
  act_06: 'FINALE',

  // Act 01: MONOLITH
  a1_avail: 'AVAILABLE · CAN THO, VN',
  a1_role: 'SOFTWARE ENGINEER · BACKEND ARCHITECT',
  a1_sub: 'C# / ASP.NET Core Clean Architecture, PostgreSQL & Constraint-Solving Systems.',
  a1_drag_hint: 'HOLD SPACE FOR X-RAY · DRAG · WHEEL · ← →',
  a1_enter: 'ENTER EXHIBITION',

  // Act 02: TECH STACK
  stack_tag: '02 · TECHNOLOGY MATRIX',
  stack_title: 'TECH STACK',
  stack_hint: 'HOVER ANY ICON TO REVEAL BRAND COLOR',
  stack_count: '23 CORE TECHNOLOGIES',

  // Act 03: WORKS
  a2_tag: '03 · SELECTED PRODUCTION WORKS',
  a2_hint: 'HOVER FOR GENERATIVE FORM · CLICK FOR CASE STUDY',
  a2_systems: '04 PRODUCTION SYSTEMS',
  iris_overview_lbl: 'SYSTEM OVERVIEW',
  iris_highlights_lbl: 'ENGINEERING HIGHLIGHTS',
  iris_flow_lbl: 'ARCHITECTURAL DATA FLOW',
  iris_repo_btn: 'OPEN GITHUB REPOSITORY ↗',
  iris_close: '[ CLOSE ]',

  // Act 04: SIGNAL
  a3_tag: '04 · BORDERLESS PARTICLE ARCHITECTURE FLOW',
  a3_full_trace: 'FULL CQRS TRACE',
  a3_cache_hit: 'CACHE HIT · BYPASSED DOMAIN/DB',
  a3_redis_shortcut: 'REDIS SHORTCUT',
  a3_on: 'ON',
  a3_off: 'OFF',
  a3_fire: 'FIRE SIGNAL',
  a3_click_hub: 'CLICK LAYER TO PEEK C#',

  // Act 05: ALGORITHMS (ALL 4 PROJECTS)
  a4_tag: '05 · ALGORITHM PLAYGROUND — ALL 4 PROJECTS',
  a4_csp_title: 'CTU-SCHEDULER · CSP',
  a4_csp_desc_0: '4 CTU courses overlapping — step solver to prune conflicting orbits',
  a4_csp_desc_1: 'STEP 1 · LOCKED CT201 TO MON 07:30 — DETECTED CLASH ON CT202',
  a4_csp_desc_2: 'STEP 2 · PRUNED CONFLICTING SLOT — ALIGNING CT202 & CT203',
  a4_csp_desc_3: 'SOLVED · ALL 4 COURSE ORBITS HARMONIZED · 0 CONFLICTS',
  a4_csp_btn: 'STEP / SOLVE ORBITS',

  a4_news_title: 'NEWSHUB · GEMINI AI',
  a4_news_desc: 'Simulates automated ingestion and 3-bullet Gemini 1.5 Pro TL;DR synthesis in <350ms.',
  a4_news_btn: 'RUN AI DIGEST',
  a4_news_running: 'STREAMING...',
  a4_news_idle: 'CLICK TO STREAM TL;DR SYNTHESIS FOR ASP.NET CORE 9 ARTICLE...',
  a4_news_b1: 'Clean Architecture cleanly decouples Domain and Application layers.',
  a4_news_b2: 'PostgreSQL compound indexing sustains sub-50ms paginated queries.',
  a4_news_b3: 'Stateless JWT & rate limiting protect the Gemini AI pipeline.',

  a4_hire_title: 'SMARTHIRE · ATS MATCH',
  a4_hire_desc: 'Compare candidate resume vectors against Senior Backend JD (C# .NET Core, PostgreSQL).',
  a4_hire_cand_a: 'PHUC TRAN (C# CLEAN ARCH)',
  a4_hire_cand_b: 'FRESHER B (REACT FRONTEND)',
  a4_hire_score: 'ATS COMPATIBILITY',
  a4_hire_skill_1: 'C# .NET CORE',
  a4_hire_skill_2: 'CLEAN ARCH',
  a4_hire_skill_3: 'POSTGRESQL',
  a4_hire_skill_4: 'REACT / TS',

  a4_nim_reset: 'RESET PILES',
  a4_nim_player_turn: 'YOUR TURN · CLICK A PILE TO REMOVE 1 STONE',
  a4_nim_ai_turn: 'AI COMPUTING OPTIMAL BOUTON XOR...',
  a4_nim_player_win: 'YOU WIN · OPPONENT LEFT AT ZERO',
  a4_nim_ai_win: 'AI WINS · PROVABLY OPTIMAL PLAY',
  a4_nim_n_pos: 'N-POSITION (WINNING MOVE EXISTS)',
  a4_nim_p_pos: 'P-POSITION (BALANCED ZERO)',
  a4_foot: '4 INTERACTIVE SANDBOXES · CTU SOFTWARE ENGINEERING',

  // Act 06: FINALE
  a5_marquee: 'BACKEND ARCHITECTURE · CLEAN CODE · CAN THO · ',
  a5_tag: '06 · FINALE & AUDIO',
  a5_prompt: 'OPEN FOR COLLABORATION · CLICK TO COPY',
  a5_copied: 'COPIED TRANTRONGPHUC1501@GMAIL.COM',
  a5_audio_playing: 'PLAYING',
  a5_audio_paused: 'PAUSED',

  // Filmstrip & X-Ray
  film_title: 'ALL 6 ACTS · CLICK TO JUMP',
  film_enter: 'OPEN ACT →',
  xray_header: 'X-RAY ARCHITECTURAL LOUPE · LIVE TELEMETRY',
  xray_release_hint: 'RELEASE SPACE TO CLOSE LOUPE',

  // Command Palette (cmdk)
  cmd_placeholder: 'Type a command or search acts, projects...',
  cmd_empty: 'No matching actions found.',
  cmd_group_acts: 'EXHIBITION ACTS',
  cmd_group_works: 'PRODUCTION WORKS',
  cmd_group_sys: 'SYSTEM ACTIONS',
  cmd_auto: 'Auto-Play Full Exhibition + Soundtrack',
  cmd_filmstrip: 'Toggle Filmstrip Overview (G)',
  cmd_xray: 'Toggle X-Ray Blueprint Loupe (Hold Space)',
  cmd_invert: 'Invert Monochrome Mode (Light / Black)',
  cmd_lang: 'Switch Language (VI / EN)',
  cmd_audio: 'Play / Pause Soundtrack',
  cmd_email: 'Copy Official Email',
};
