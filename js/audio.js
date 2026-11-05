/**
 * High-Fidelity Audio Engine, Synced Lyrics & Mini Walkman HUD
 * Audio Source: "assets/xuong-rong-intro.mp3" ("xương rồng (intro)" by Dangrangto)
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

    // UI Elements
    this.toggleBtn = document.getElementById('deck-toggle-btn');
    this.headerBtn = document.getElementById('header-music-btn');
    this.floatingBtn = document.getElementById('floating-music-btn');
    this.unlockBanner = document.getElementById('audio-unlock-banner');
    this.timeDisplay = document.getElementById('deck-time-display');
    this.volumeSlider = document.getElementById('deck-volume-slider');
    this.statusPill = document.getElementById('audio-status-pill');
    this.reels = document.querySelectorAll('.cassette-reel');
    this.miniReels = document.querySelectorAll('.mini-cassette-reel');
    this.visualizerBars = document.querySelectorAll('.spectrum-bar');
    this.lyricsContainer = document.getElementById('lyrics-scroll-container');

    // Mini Walkman HUD Elements
    this.walkmanLyric = document.getElementById('walkman-marquee-lyric');
    this.walkmanTimeLabel = document.getElementById('walkman-time-label');
    this.walkmanProgressBar = document.getElementById('walkman-progress-bar');
    this.walkmanProgressContainer = document.getElementById('walkman-progress-container');
    this.walkmanMuteBtn = document.getElementById('walkman-mute-btn');
    this.walkmanMuteIcon = document.getElementById('walkman-mute-icon');

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

    // Toggle button listeners
    if (this.toggleBtn) {
      this.toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggle();
      });
    }

    if (this.headerBtn) {
      this.headerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggle();
      });
    }

    if (this.floatingBtn) {
      this.floatingBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggle();
      });
    }

    if (this.volumeSlider) {
      this.volumeSlider.addEventListener('input', (e) => {
        this.audio.volume = parseFloat(e.target.value);
      });
    }

    // Mini Walkman progress bar scrubbing
    if (this.walkmanProgressContainer) {
      this.walkmanProgressContainer.addEventListener('click', (e) => {
        e.stopPropagation();
        const rect = this.walkmanProgressContainer.getBoundingClientRect();
        const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        const dur = this.audio.duration || 245;
        this.audio.currentTime = ratio * dur;
        if (!this.isPlaying) this.play();
      });
    }

    // Mini Walkman Mute Button
    if (this.walkmanMuteBtn) {
      this.walkmanMuteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleMute();
      });
    }

    // First interaction unlocks audio
    const triggerFirstAudioUnlock = () => {
      if (!this.audioUnlocked) {
        this.play();
      }
      window.removeEventListener('click', triggerFirstAudioUnlock);
      window.removeEventListener('keydown', triggerFirstAudioUnlock);
      window.removeEventListener('touchstart', triggerFirstAudioUnlock);
    };

    window.addEventListener('click', triggerFirstAudioUnlock, { once: true });
    window.addEventListener('keydown', triggerFirstAudioUnlock, { once: true });
    window.addEventListener('touchstart', triggerFirstAudioUnlock, { once: true });

    // Audio native events
    this.audio.addEventListener('timeupdate', () => {
      this.updateTimeDisplay();
      this.updateLyrics();
      this.updateProgressBar();
    });

    this.audio.addEventListener('play', () => {
      this.isPlaying = true;
      this.audioUnlocked = true;
      if (this.unlockBanner) {
        this.unlockBanner.classList.add('opacity-0', 'pointer-events-none');
        setTimeout(() => this.unlockBanner.remove(), 400);
      }
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

  renderLyrics() {
    if (!this.lyricsContainer) return;
    this.lyricsContainer.innerHTML = '';

    SONG_LYRICS.forEach((item, idx) => {
      const line = document.createElement('div');
      line.className = 'lyric-line py-1.5 px-3 text-xs font-mono cursor-pointer transition-colors duration-150 text-slate-500 hover:text-[#1f5ca9]';
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
      const activeText = SONG_LYRICS[activeIdx].text;

      // Update main lyrics container
      if (this.lyricsContainer) {
        const lines = this.lyricsContainer.querySelectorAll('.lyric-line');
        lines.forEach((l, i) => {
          if (i === activeIdx) {
            l.classList.add('active-lyric');
            const container = this.lyricsContainer;
            const targetTop = l.offsetTop - container.offsetTop;
            container.scrollTo({
              top: Math.max(0, targetTop - (container.clientHeight / 2) + 16),
              behavior: 'smooth'
            });
          } else {
            l.classList.remove('active-lyric');
          }
        });
      }

      // Update Mini Walkman Marquee Ticker
      if (this.walkmanLyric) {
        this.walkmanLyric.textContent = activeText;
      }
    }
  }

  updateProgressBar() {
    const cur = this.audio.currentTime || 0;
    const dur = this.audio.duration || 245;
    const pct = Math.min(100, (cur / dur) * 100);

    if (this.walkmanProgressBar) {
      this.walkmanProgressBar.style.width = `${pct}%`;
    }
  }

  toggleMute() {
    this.audio.muted = !this.audio.muted;
    if (this.walkmanMuteIcon) {
      this.walkmanMuteIcon.textContent = this.audio.muted ? '🔇' : '🔊';
    }
  }

  startVisualizer() {
    if (this.animFrameId) cancelAnimationFrame(this.animFrameId);

    const render = () => {
      if (!this.isPlaying) return;

      const t = this.audio.currentTime;
      const beat = (t % 0.631) / 0.631;
      const kick = Math.pow(Math.max(0, 1 - beat * 2.2), 2);
      const snare = Math.pow(Math.max(0, Math.sin(t * Math.PI * 3.16)), 3);

      if (this.visualizerBars && this.visualizerBars.length > 0) {
        for (let i = 0; i < this.visualizerBars.length; i++) {
          const bar = this.visualizerBars[i];
          const phase = i * 0.45;
          const osc = Math.sin(t * 12 + phase) * 0.35 + 0.65;
          const height = Math.max(4, Math.floor((kick * 18 + snare * 12 + osc * 8)));
          bar.style.height = `${Math.min(28, height)}px`;
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
      this.visualizerBars.forEach(bar => {
        bar.style.height = '4px';
      });
    }
  }

  play() {
    const promise = this.audio.play();
    if (promise !== undefined) {
      promise
        .then(() => {
          this.isPlaying = true;
          this.audioUnlocked = true;
          this.updateUI(true);
        })
        .catch((err) => {
          console.log('Audio autoplay awaiting interaction:', err);
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
    if (this.walkmanTimeLabel) {
      this.walkmanTimeLabel.textContent = formatted;
    }
  }

  updateUI(playing) {
    this.reels.forEach(r => r.classList.toggle('animate-spin-reel', playing));
    this.miniReels.forEach(r => r.classList.toggle('mini-reel-spin', playing));

    const isVi = (window.currentLang || 'vi') === 'vi';
    const label = document.getElementById('deck-btn-label');
    if (label) {
      label.textContent = playing 
        ? (isVi ? 'TẠM DỪNG' : 'PAUSE') 
        : (isVi ? 'PHÁT NHẠC' : 'PLAY AUDIO');
    }

    if (this.statusPill) {
      this.statusPill.textContent = playing 
        ? (isVi ? 'ĐANG PHÁT' : 'PLAYING') 
        : (isVi ? 'TẠM DỪNG' : 'PAUSED');
      this.statusPill.classList.toggle('text-[#1f5ca9]', playing);
      this.statusPill.classList.toggle('text-slate-400', !playing);
    }

    const floatIcon = document.getElementById('floating-music-icon');
    if (floatIcon) {
      floatIcon.textContent = playing ? '⏸' : '▶';
    }
    const miniIcon = document.getElementById('walkman-mini-icon');
    if (miniIcon) {
      miniIcon.textContent = playing ? '⏸' : '▶';
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.hiFiDeck = new HiFiAudioEngine();
});
