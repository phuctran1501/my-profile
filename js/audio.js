/**
 * High-Fidelity Audio Engine, Synchronized Lyrics & Real Web Audio Visualizer
 * Soundtrack: "assets/xuong-rong-intro.mp3" ("xương rồng (intro)" by Dangrangto)
 * Can Tho University (CTU) Blue Edition
 */

const SONG_LYRICS = [
  { time: 0, text: "♪ [Intro melody — Dangrangto x DONAL] ♪" },
  { time: 17.0, text: "Oh-oh... Oh-oh-oh..." },
  { time: 21.0, text: "Hm-mm-mm..." },
  { time: 29.5, text: "Chắc em không lộng lẫy, kiêu sa tựa hoa hồng" },
  { time: 33.5, text: "Chắc em không gần gũi, trên thân toàn gai nhọn" },
  { time: 37.0, text: "Chắc hương thơm chẳng vấn vương bao người xiêu lòng" },
  { time: 41.0, text: "Điều gì khiến cho ai từng đến bên em rồi cũng sẽ chọn đi?" },
  { time: 45.0, text: "Thế gian kia tàn nhẫn coi em là xương rồng" },
  { time: 48.5, text: "Vậy thì có hay không một người sẽ tới đây?" },
  { time: 52.5, text: "Nắm lấy tay em khi vừa thức dậy" },
  { time: 56.0, text: "Ôm lấy em thật chặt vào lúc này, baby..." },
  { time: 60.0, text: "Một người chịu đi tưới mát chiếc cây khô cằn" },
  { time: 63.5, text: "Dù là cỏ lạ và hoa thơm kéo tới đây vô vàn" },
  { time: 67.2, text: "Mặc kệ trời nắng cháy rát ở nơi sa mạc" },
  { time: 70.8, text: "Và mặc kệ là nhiều gai đâm nhưng vẫn luôn chọn cố gắng" },
  { time: 74.8, text: "Vì mình cần được yêu cũng giống như xương rồng" },
  { time: 78.2, text: "Cần phải đón lấy chút sương mai để nở nụ hoa hồng" },
  { time: 82.0, text: "Chờ một người đặc biệt để sà vào lòng thật lâu" },
  { time: 85.0, text: "Làm dịu bao cơn đau em thường cất giấu" },
  { time: 88.0, text: "Em đừng khóc..." },
  { time: 91.5, text: "Ai sẽ lau đi hết nước mắt em long lanh?" },
  { time: 95.0, text: "Mạnh mẽ lắm cũng sẽ có khi mong manh" },
  { time: 98.8, text: "Nắng cháy da nhưng trong lòng trăm đợt sóng đánh" },
  { time: 102.2, text: "Bởi vì vết thương lòng đâm sâu, em trở thành chiếc xương rồng" },
  { time: 108.5, text: "Quay đi, em bỏ lại mình của ngày xưa" },
  { time: 112.2, text: "Không cho ai làm tổn thương em nữa..." },
  { time: 120.0, text: "♪ [Outro — Dangrangto x CTU Engineering] ♪" }
];

class HiFiAudioEngine {
  constructor() {
    this.audio = document.getElementById('local-audio-player');
    this.isPlaying = false;
    this.audioUnlocked = false;

    // Island Dock Audio Controls
    this.dockAudioBtn = document.getElementById('dock-audio-btn');
    this.dockSoundwave = document.getElementById('dock-soundwave');
    this.dockPlayIcon = document.getElementById('dock-play-icon');

    // Lounge Audio Controls
    this.toggleBtn = document.getElementById('deck-toggle-btn');
    this.btnLabel = document.getElementById('deck-btn-label');
    this.timeDisplay = document.getElementById('deck-time-display');
    this.volumeSlider = document.getElementById('deck-volume-slider');
    this.visualizerBars = document.querySelectorAll('.spectrum-bar');
    this.lyricsContainer = document.getElementById('lyrics-scroll-container');

    // Real Web Audio API Analyser
    this.audioCtx = null;
    this.analyser = null;
    this.source = null;
    this.dataArray = null;

    this.currentLyricIdx = -1;
    this.animFrameId = null;

    this.init();
  }

  init() {
    if (!this.audio) {
      this.audio = new Audio('assets/xuong-rong-intro.mp3');
      this.audio.loop = true;
    }

    this.audio.volume = 0.8;
    this.renderLyrics();

    // Listeners for Dock audio button
    if (this.dockAudioBtn) {
      this.dockAudioBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.toggle();
      });
    }

    // Listeners for Lounge audio toggle button
    if (this.toggleBtn) {
      this.toggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.toggle();
      });
    }

    // Volume Slider
    if (this.volumeSlider) {
      this.volumeSlider.addEventListener('input', (e) => {
        this.audio.volume = parseFloat(e.target.value);
      });
    }

    // First user gesture unlocks audio
    const unlockHandler = () => {
      this.setupWebAudio();
      if (!this.audioUnlocked) {
        this.play();
      }
      window.removeEventListener('click', unlockHandler);
      window.removeEventListener('keydown', unlockHandler);
      window.removeEventListener('touchstart', unlockHandler);
    };

    window.addEventListener('click', unlockHandler, { once: true });
    window.addEventListener('keydown', unlockHandler, { once: true });
    window.addEventListener('touchstart', unlockHandler, { once: true });

    // Native audio events
    this.audio.addEventListener('timeupdate', () => {
      this.updateTimeDisplay();
      this.updateLyrics();
    });

    this.audio.addEventListener('play', () => {
      this.isPlaying = true;
      this.audioUnlocked = true;
      this.setupWebAudio();
      this.updateUI(true);
      this.startVisualizer();
    });

    this.audio.addEventListener('pause', () => {
      this.isPlaying = false;
      this.updateUI(false);
      this.stopVisualizer();
    });

    this.audio.addEventListener('ended', () => {
      this.audio.currentTime = 0;
      this.audio.play();
    });
  }

  setupWebAudio() {
    if (this.analyser) return;
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;

      this.audioCtx = new AudioContextClass();
      this.analyser = this.audioCtx.createAnalyser();
      this.analyser.fftSize = 64;
      this.analyser.smoothingTimeConstant = 0.75;

      this.source = this.audioCtx.createMediaElementSource(this.audio);
      this.source.connect(this.analyser);
      this.analyser.connect(this.audioCtx.destination);
      this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    } catch (e) {
      // Graceful fallback to synthetic rhythm
      this.analyser = null;
    }
  }

  renderLyrics() {
    if (!this.lyricsContainer) return;
    this.lyricsContainer.innerHTML = '';

    SONG_LYRICS.forEach((item, idx) => {
      const line = document.createElement('div');
      line.className = 'py-2 px-3 text-xs font-mono cursor-pointer transition-colors duration-200 text-[var(--text-tertiary)] hover:text-[#1f5ca9] dark:hover:text-sky-400 rounded-lg';
      line.setAttribute('data-idx', idx);
      line.setAttribute('data-time', item.time);
      line.textContent = item.text;

      line.addEventListener('click', (e) => {
        e.stopPropagation();
        this.audio.currentTime = item.time;
        if (!this.isPlaying) this.play();
      });

      this.lyricsContainer.appendChild(line);
    });
  }

  updateLyrics() {
    const curTime = this.audio.currentTime;

    let activeIdx = -1;
    for (let i = 0; i < SONG_LYRICS.length; i++) {
      if (curTime >= SONG_LYRICS[i].time) {
        activeIdx = i;
      } else {
        break;
      }
    }

    if (activeIdx !== this.currentLyricIdx && activeIdx >= 0) {
      this.currentLyricIdx = activeIdx;

      if (this.lyricsContainer) {
        const lines = this.lyricsContainer.children;
        for (let i = 0; i < lines.length; i++) {
          const l = lines[i];
          if (i === activeIdx) {
            l.className = 'py-2 px-3 text-xs font-mono font-bold cursor-pointer transition-all duration-200 text-[#1f5ca9] dark:text-sky-400 bg-blue-900/10 rounded-lg scale-[1.01]';
            const container = this.lyricsContainer;
            const targetTop = l.offsetTop - container.offsetTop;
            container.scrollTo({
              top: Math.max(0, targetTop - (container.clientHeight / 2) + 16),
              behavior: 'smooth'
            });
          } else {
            l.className = 'py-2 px-3 text-xs font-mono cursor-pointer transition-colors duration-200 text-[var(--text-tertiary)] hover:text-[#1f5ca9] dark:hover:text-sky-400 rounded-lg';
          }
        }
      }
    }
  }

  startVisualizer() {
    if (this.animFrameId) cancelAnimationFrame(this.animFrameId);

    const render = () => {
      if (!this.isPlaying) return;

      if (this.analyser && this.dataArray) {
        this.analyser.getByteFrequencyData(this.dataArray);

        // Update spectrum bars with real frequency bins
        if (this.visualizerBars && this.visualizerBars.length > 0) {
          for (let i = 0; i < this.visualizerBars.length; i++) {
            const bar = this.visualizerBars[i];
            const binIdx = Math.min(i * 2 + 1, this.dataArray.length - 1);
            const val = this.dataArray[binIdx] || 0;
            const height = Math.max(6, Math.floor((val / 255) * 56));
            bar.style.height = `${height}px`;
          }
        }

        // Update Dock mini soundwave bars
        if (this.dockSoundwave) {
          const bars = this.dockSoundwave.querySelectorAll('.soundwave-bar');
          bars.forEach((b, idx) => {
            const val = this.dataArray[idx * 3] || 0;
            const h = Math.max(4, Math.floor((val / 255) * 16));
            b.style.height = `${h}px`;
          });
        }

      } else {
        // Fallback rhythmic synthesis
        const t = this.audio.currentTime;
        const beat = (t % 0.631) / 0.631;
        const kick = Math.pow(Math.max(0, 1 - beat * 2.2), 2);
        const snare = Math.pow(Math.max(0, Math.sin(t * Math.PI * 3.16)), 3);

        if (this.visualizerBars && this.visualizerBars.length > 0) {
          for (let i = 0; i < this.visualizerBars.length; i++) {
            const bar = this.visualizerBars[i];
            const phase = i * 0.45;
            const osc = Math.sin(t * 12 + phase) * 0.35 + 0.65;
            const height = Math.max(6, Math.floor((kick * 36 + snare * 24 + osc * 16)));
            bar.style.height = `${Math.min(56, height)}px`;
          }
        }
      }

      this.animFrameId = requestAnimationFrame(render);
    };

    this.animFrameId = requestAnimationFrame(render);
  }

  stopVisualizer() {
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
    if (this.visualizerBars) {
      this.visualizerBars.forEach((bar, idx) => {
        bar.style.height = `${(idx % 3 + 2) * 5}px`;
      });
    }
  }

  play() {
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    const promise = this.audio.play();
    if (promise !== undefined) {
      promise
        .then(() => {
          this.isPlaying = true;
          this.audioUnlocked = true;
          this.updateUI(true);
        })
        .catch((err) => {
          console.log('Audio playback pending user gesture:', err);
        });
    }
  }

  pause() {
    this.audio.pause();
    this.isPlaying = false;
    this.updateUI(false);
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  updateTimeDisplay() {
    const cur = Math.floor(this.audio.currentTime) || 0;
    const dur = Math.floor(this.audio.duration) || 245;
    const format = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
    const formatted = `${format(cur)} / ${format(dur)}`;

    if (this.timeDisplay) {
      this.timeDisplay.textContent = formatted;
    }
  }

  updateUI(playing) {
    const isVi = (window.currentLang || 'vi') === 'vi';

    // Update Island Dock Soundwave and Play Icon
    if (this.dockSoundwave) {
      this.dockSoundwave.classList.toggle('soundwave-paused', !playing);
    }
    if (this.dockPlayIcon) {
      this.dockPlayIcon.textContent = playing ? '⏸' : '▶';
    }

    // Update Lounge Button Label
    if (this.btnLabel) {
      this.btnLabel.textContent = playing 
        ? (isVi ? 'TẠM DỪNG' : 'PAUSE') 
        : (isVi ? 'PHÁT BẢN NHẠC' : 'PLAY AUDIO');
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.hiFiDeck = new HiFiAudioEngine();
});
