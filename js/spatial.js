/**
 * Phuc Tran — Extensible Multi-UI Engine & Universal Spatial Radar
 * Can Tho University (CTU) Architecture Edition
 *
 * Supported UI Modes:
 *   1. Spatial Canvas (🌐 Infinite 2D matrix map with camera pan/zoom & bus wires)
 *   2. Linear Flow (📜 Classic vertical responsive scroll with smooth flow)
 *   3. Cyber Conveyor (🚂 High-tech horizontal workstation conveyor rail)
 *
 * Features:
 *   - Universal Radar HUD active & tracking across ALL modes
 *   - Extensible Random UI Switcher [🎲 RANDOM UI]
 *   - 60fps Matrix Transforms & Zero-Overhead Mode Switching
 */

class UIEngine {
  constructor() {
    this.viewport = document.getElementById('spatial-viewport');
    this.world = document.getElementById('spatial-world');
    this.connectionsSvg = document.getElementById('spatial-connections');
    this.radarContainer = document.getElementById('radar-nodes-container');
    this.radarFrustum = document.getElementById('radar-camera-frustum');
    this.coordsDisplay = document.getElementById('spatial-coords-hud');
    this.randomBtn = document.getElementById('ui-mode-random-btn') || document.getElementById('spatial-mode-toggle-btn');
    this.modeLabelEl = document.getElementById('ui-mode-label');
    this.modeCurrentEl = document.getElementById('ui-mode-current');

    // Supported UI Mode Pool (Extensible for future layouts)
    this.modes = [
      {
        id: 'spatial',
        icon: '🌐',
        nameVi: 'BẢN ĐỒ KHÔNG GIAN',
        nameEn: 'SPATIAL CANVAS',
        descVi: 'Bản đồ 2D không gian vô cực',
        descEn: 'Infinite 2D Spatial Canvas'
      },
      {
        id: 'linear',
        icon: '📜',
        nameVi: 'CUỘN TRUYỀN THỐNG',
        nameEn: 'LINEAR FLOW',
        descVi: 'Dòng chảy cuộn trang dọc cổ điển',
        descEn: 'Classic Vertical Linear Flow'
      },
      {
        id: 'conveyor',
        icon: '🚂',
        nameVi: 'BĂNG CHUYỀN RAY',
        nameEn: 'CYBER CONVEYOR',
        descVi: 'Đường ray băng chuyền phân vùng',
        descEn: 'Horizontal Workstation Rail'
      }
    ];

    // Determine initial mode from storage or desktop screen width
    const saved = localStorage.getItem('phuctran_view_mode');
    const isValidSaved = saved && this.modes.some(m => m.id === saved);
    if (isValidSaved) {
      this.currentMode = saved;
    } else {
      this.currentMode = (window.innerWidth >= 1024) ? 'spatial' : 'linear';
    }

    // Camera Transform State for Spatial Mode
    this.camera = { x: 0, y: 0, scale: 1.0 };
    this.isDragging = false;
    this.dragStart = { x: 0, y: 0 };
    this.dragCamStart = { x: 0, y: 0 };
    this.activeNodeId = 'hero';

    // 6 Primary Stations/Nodes
    this.nodes = {
      hero: { x: 0, y: 0, w: 1150, h: 1250, label: 'NEXUS / BIO & PHILOSOPHY', shortLabel: 'NEXUS' },
      'audio-deck-section': { x: 0, y: 1450, w: 1150, h: 540, label: 'HI-FI AUDIO DECK', shortLabel: 'AUDIO' },
      'interactive-lab': { x: 1350, y: 0, w: 1150, h: 850, label: 'LIVE ALGORITHM LABS', shortLabel: 'LABS' },
      projects: { x: 1350, y: 1450, w: 1150, h: 920, label: 'PRODUCTION PROJECTS', shortLabel: 'PROJ' },
      topology: { x: 0, y: 2200, w: 1150, h: 620, label: 'SYSTEM TOPOLOGY', shortLabel: 'TOPO' },
      contact: { x: 1350, y: 2550, w: 1150, h: 650, label: 'UPLINK TRANSMISSION', shortLabel: 'UPLINK' }
    };

    // Node Sequence Order for Linear / Conveyor navigation
    this.nodeSequence = ['hero', 'audio-deck-section', 'interactive-lab', 'projects', 'topology', 'contact'];

    // Spatial coordinate space boundaries
    this.worldBounds = {
      minX: -100,
      minY: -100,
      totalW: 2750,
      totalH: 3450,
      radarW: 160,
      radarH: 112
    };

    this.init();
  }

  init() {
    if (!this.viewport || !this.world) return;

    this.setMode(this.currentMode, false);

    // Bind event listeners
    this.bindMouseEvents();
    this.bindTouchEvents();
    this.bindScrollEvents();
    this.bindResizeEvents();
    this.bindNavLinks();

    // Initial bus connections
    this.drawConnections();
  }

  // ================= MODE LIFECYCLE & MANAGEMENT =================

  setMode(modeId, animate = true) {
    const modeObj = this.modes.find(m => m.id === modeId) || this.modes[0];
    this.currentMode = modeObj.id;

    // Reset all mode classes
    this.modes.forEach(m => {
      document.body.classList.remove(`mode-${m.id}`);
    });
    document.body.classList.remove('spatial-canvas-active');

    // Apply active mode class
    document.body.classList.add(`mode-${this.currentMode}`);
    if (this.currentMode === 'spatial') {
      document.body.classList.add('spatial-canvas-active');
    }

    // Handle container resets
    if (this.currentMode === 'spatial') {
      Object.keys(this.nodes).forEach(id => {
        const el = document.getElementById(id);
        if (el) {
          el.classList.add('spatial-node');
          const n = this.nodes[id];
          el.style.left = `${n.x}px`;
          el.style.top = `${n.y}px`;
          el.style.width = `${n.w}px`;
        }
      });
      if (this.connectionsSvg) this.connectionsSvg.style.display = 'block';
      this.drawConnections();
      setTimeout(() => {
        this.warpTo(this.activeNodeId || 'hero', animate);
      }, 50);
    } else {
      // In Linear and Conveyor: clear absolute spatial coordinates and transform
      Object.keys(this.nodes).forEach(id => {
        const el = document.getElementById(id);
        if (el) {
          el.classList.add('spatial-node');
          el.style.left = '';
          el.style.top = '';
          el.style.width = '';
        }
      });
      this.world.style.transform = '';
      if (this.connectionsSvg) this.connectionsSvg.style.display = 'none';

      if (this.currentMode === 'linear') {
        const targetNode = document.getElementById(this.activeNodeId);
        if (targetNode && animate) {
          setTimeout(() => {
            targetNode.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 60);
        } else {
          window.scrollTo({ top: 0, behavior: 'instant' });
        }
      } else if (this.currentMode === 'conveyor') {
        this.viewport.scrollTo({ left: 0, behavior: 'instant' });
      }
    }

    // Save preference
    localStorage.setItem('phuctran_view_mode', this.currentMode);

    // Update buttons & telemetry
    this.updateToggleBtn();
    this.renderRadarPins();
    this.updateRadarHUD();
    this.highlightNode(this.activeNodeId || 'hero');
  }

  randomizeMode() {
    const otherModes = this.modes.filter(m => m.id !== this.currentMode);
    const nextMode = otherModes[Math.floor(Math.random() * otherModes.length)];

    this.setMode(nextMode.id, true);

    // Trigger feedback toast
    const isVi = (window.currentLang || 'vi') === 'vi';
    const modeName = isVi ? nextMode.nameVi : nextMode.nameEn;
    const toastPrefix = isVi ? 'ĐÃ ĐỔI GIAO DIỆN:' : 'SWITCHED UI:';
    if (window.showToast) {
      window.showToast(`${toastPrefix} ${modeName}`);
    }
  }

  // Alias for backward compatibility
  toggleMode() {
    this.randomizeMode();
  }

  updateToggleBtn() {
    const isVi = (window.currentLang || 'vi') === 'vi';
    const text = isVi ? 'ĐỔI GIAO DIỆN' : 'RANDOM UI';

    if (this.modeLabelEl) {
      this.modeLabelEl.textContent = text;
    } else if (this.randomBtn) {
      this.randomBtn.textContent = text;
    }
  }

  // ================= UNIVERSAL RADAR HUD =================

  renderRadarPins() {
    if (!this.radarContainer) return;
    const { minX, minY, totalW, totalH, radarW, radarH } = this.worldBounds;
    let html = '';

    if (this.currentMode === 'spatial') {
      // 2D Matrix Projection
      Object.keys(this.nodes).forEach(id => {
        const n = this.nodes[id];
        const rx = Math.round(((n.x - minX) / totalW) * radarW);
        const ry = Math.round(((n.y - minY) / totalH) * radarH);
        const rw = Math.round((n.w / totalW) * radarW);
        const rh = Math.round((n.h / totalH) * radarH);

        html += `
          <button onclick="window.uiEngine.navigateTo('${id}')" 
                  data-node="${id}" 
                  id="radar-pin-${id}" 
                  class="radar-node-pin absolute border border-[#1f5ca9]/70 bg-[#071120]/80 hover:bg-[#1f5ca9] text-[7px] font-mono font-bold text-sky-300 flex items-center justify-center transition"
                  style="left: ${rx}px; top: ${ry}px; width: ${rw}px; height: ${rh}px;"
                  title="${n.label}">
            ${n.shortLabel}
          </button>
        `;
      });
    } else if (this.currentMode === 'linear') {
      // 2 Columns of 3 vertical stations in the 160x112 box
      const colW = 74;
      const rowH = 30;
      this.nodeSequence.forEach((id, index) => {
        const n = this.nodes[id];
        const col = index % 2;
        const row = Math.floor(index / 2);
        const left = col === 0 ? 4 : 82;
        const top = row * 36 + 4;

        html += `
          <button onclick="window.uiEngine.navigateTo('${id}')" 
                  data-node="${id}" 
                  id="radar-pin-${id}" 
                  class="radar-node-pin absolute border border-[#1f5ca9]/70 bg-[#071120]/80 hover:bg-[#1f5ca9] text-[7px] font-mono font-bold text-sky-300 flex items-center justify-center transition"
                  style="left: ${left}px; top: ${top}px; width: ${colW}px; height: ${rowH}px;"
                  title="${n.label}">
            ${n.shortLabel}
          </button>
        `;
      });
    } else if (this.currentMode === 'conveyor') {
      // 6 Horizontal Track Nodes along the rail
      const pinW = 23;
      const pinH = 88;
      this.nodeSequence.forEach((id, index) => {
        const n = this.nodes[id];
        const left = index * 26 + 3;

        html += `
          <button onclick="window.uiEngine.navigateTo('${id}')" 
                  data-node="${id}" 
                  id="radar-pin-${id}" 
                  class="radar-node-pin absolute border border-[#1f5ca9]/70 bg-[#071120]/80 hover:bg-[#1f5ca9] text-[6.5px] font-mono font-bold text-sky-300 flex items-center justify-center transition [writing-mode:vertical-rl] py-1"
                  style="left: ${left}px; top: 12px; width: ${pinW}px; height: ${pinH}px;"
                  title="${n.label}">
            ${n.shortLabel}
          </button>
        `;
      });
    }

    this.radarContainer.innerHTML = html;
  }

  updateRadarHUD() {
    if (!this.radarFrustum) return;
    const { minX, minY, totalW, totalH, radarW, radarH } = this.worldBounds;

    if (this.currentMode === 'spatial') {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // Camera view rectangle in world coordinate space
      const camWorldX = -this.camera.x / this.camera.scale;
      const camWorldY = -this.camera.y / this.camera.scale;
      const camWorldW = vw / this.camera.scale;
      const camWorldH = vh / this.camera.scale;

      // Map to radar coordinates
      const fx = ((camWorldX - minX) / totalW) * radarW;
      const fy = ((camWorldY - minY) / totalH) * radarH;
      const fw = (camWorldW / totalW) * radarW;
      const fh = (camWorldH / totalH) * radarH;

      this.radarFrustum.style.left = `${Math.round(fx)}px`;
      this.radarFrustum.style.top = `${Math.round(fy)}px`;
      this.radarFrustum.style.width = `${Math.max(10, Math.round(fw))}px`;
      this.radarFrustum.style.height = `${Math.max(10, Math.round(fh))}px`;

      this.updateCoordsDisplay();
    } else if (this.currentMode === 'linear') {
      const docH = Math.max(1, document.documentElement.scrollHeight);
      const winH = window.innerHeight;
      const maxScroll = Math.max(1, docH - winH);
      const scrollRatio = Math.min(1, Math.max(0, window.scrollY / maxScroll));

      const fh = Math.max(18, Math.round((winH / docH) * radarH));
      const fy = Math.round(scrollRatio * (radarH - fh));

      this.radarFrustum.style.left = '2px';
      this.radarFrustum.style.top = `${fy}px`;
      this.radarFrustum.style.width = `${radarW - 4}px`;
      this.radarFrustum.style.height = `${fh}px`;

      if (this.coordsDisplay) {
        const pct = Math.round(scrollRatio * 100);
        this.coordsDisplay.textContent = `SCROLL: ${pct}% • ${Math.round(window.scrollY)}PX`;
      }
    } else if (this.currentMode === 'conveyor') {
      const maxScroll = Math.max(1, this.viewport.scrollWidth - this.viewport.clientWidth);
      const scrollRatio = Math.min(1, Math.max(0, this.viewport.scrollLeft / maxScroll));

      const fw = Math.max(22, Math.round((this.viewport.clientWidth / this.viewport.scrollWidth) * radarW));
      const fx = Math.round(scrollRatio * (radarW - fw));

      this.radarFrustum.style.left = `${fx}px`;
      this.radarFrustum.style.top = '2px';
      this.radarFrustum.style.width = `${fw}px`;
      this.radarFrustum.style.height = `${radarH - 4}px`;

      if (this.coordsDisplay) {
        const pct = Math.round(scrollRatio * 100);
        this.coordsDisplay.textContent = `TRACK: ${pct}% • ${Math.round(this.viewport.scrollLeft)}PX`;
      }
    }
  }

  navigateTo(nodeId) {
    if (this.currentMode === 'spatial') {
      this.warpTo(nodeId, true);
    } else if (this.currentMode === 'linear') {
      const el = document.getElementById(nodeId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        this.activeNodeId = nodeId;
        this.highlightNode(nodeId);
      }
    } else if (this.currentMode === 'conveyor') {
      const el = document.getElementById(nodeId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', inline: 'start' });
        this.activeNodeId = nodeId;
        this.highlightNode(nodeId);
      }
    }
  }

  // ================= SPATIAL CAMERA ENGINE =================

  warpTo(nodeId, smooth = true) {
    let node = this.nodes[nodeId];
    if (!node) {
      nodeId = 'hero';
      node = this.nodes['hero'];
    }

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Responsive scaling
    const targetScale = Math.min(1.0, Math.max(0.65, (vw * 0.88) / node.w));

    // Center node in viewport
    const centerX = node.x + node.w / 2;
    const centerY = node.y + node.h / 2;

    this.camera.scale = targetScale;
    this.camera.x = (vw / 2) - (centerX * targetScale);
    this.camera.y = (vh / 2) - (centerY * targetScale);

    this.activeNodeId = nodeId;

    if (smooth) {
      this.world.style.transition = 'transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)';
    } else {
      this.world.style.transition = 'none';
    }

    this.renderTransform();
    this.highlightNode(nodeId);
  }

  renderTransform() {
    this.world.style.transform = `translate3d(${Math.round(this.camera.x)}px, ${Math.round(this.camera.y)}px, 0) scale(${this.camera.scale.toFixed(3)})`;
    this.updateRadarHUD();
  }

  highlightNode(nodeId) {
    document.querySelectorAll('.spatial-node').forEach(el => {
      el.classList.toggle('spatial-node-active', el.id === nodeId);
    });

    document.querySelectorAll('.radar-node-pin').forEach(pin => {
      const isActive = pin.dataset.node === nodeId;
      pin.classList.toggle('active', isActive);
      if (isActive) {
        pin.style.borderColor = '#38bdf8';
        pin.style.backgroundColor = 'rgba(31, 92, 169, 0.9)';
      } else {
        pin.style.borderColor = 'rgba(31, 92, 169, 0.6)';
        pin.style.backgroundColor = 'rgba(7, 17, 32, 0.8)';
      }
    });
  }

  detectActiveNode() {
    if (this.currentMode === 'spatial') {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const viewCenterX = (vw / 2 - this.camera.x) / this.camera.scale;
      const viewCenterY = (vh / 2 - this.camera.y) / this.camera.scale;

      let closestId = 'hero';
      let minDist = Infinity;

      Object.keys(this.nodes).forEach(id => {
        const n = this.nodes[id];
        const cx = n.x + n.w / 2;
        const cy = n.y + n.h / 2;
        const d = Math.hypot(viewCenterX - cx, viewCenterY - cy);
        if (d < minDist) {
          minDist = d;
          closestId = id;
        }
      });

      this.activeNodeId = closestId;
      this.highlightNode(closestId);
    } else if (this.currentMode === 'linear') {
      let currentId = 'hero';
      this.nodeSequence.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            currentId = id;
          }
        }
      });
      this.activeNodeId = currentId;
      this.highlightNode(currentId);
    } else if (this.currentMode === 'conveyor') {
      let currentId = 'hero';
      this.nodeSequence.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.left <= window.innerWidth * 0.45) {
            currentId = id;
          }
        }
      });
      this.activeNodeId = currentId;
      this.highlightNode(currentId);
    }
  }

  updateCoordsDisplay() {
    if (!this.coordsDisplay) return;
    const normX = Math.round(-this.camera.x);
    const normY = Math.round(-this.camera.y);
    const pctZoom = Math.round(this.camera.scale * 100);
    this.coordsDisplay.textContent = `X: ${normX} • Y: ${normY} • ZOOM: ${pctZoom}%`;
  }

  drawConnections() {
    if (!this.connectionsSvg) return;

    const totalW = 2800;
    const totalH = 3400;
    this.connectionsSvg.setAttribute('width', totalW);
    this.connectionsSvg.setAttribute('height', totalH);
    this.connectionsSvg.setAttribute('viewBox', `0 0 ${totalW} ${totalH}`);

    const links = [
      ['hero', 'audio-deck-section'],
      ['audio-deck-section', 'topology'],
      ['interactive-lab', 'projects'],
      ['projects', 'contact'],
      ['hero', 'interactive-lab'],
      ['audio-deck-section', 'projects'],
      ['topology', 'contact']
    ];

    let svgHtml = '';
    links.forEach(([srcId, dstId]) => {
      const s = this.nodes[srcId];
      const d = this.nodes[dstId];
      if (s && d) {
        let x1, y1, x2, y2;
        if (s.x === d.x) {
          x1 = s.x + s.w / 2;
          y1 = s.y + s.h;
          x2 = d.x + d.w / 2;
          y2 = d.y;
        } else {
          x1 = s.x + s.w;
          y1 = s.y + 250;
          x2 = d.x;
          y2 = d.y + 250;
        }

        const midX = (x1 + x2) / 2;
        const pathData = s.x === d.x
          ? `M ${x1} ${y1} V ${y2}`
          : `M ${x1} ${y1} H ${midX} V ${y2} H ${x2}`;

        svgHtml += `<path d="${pathData}" class="bus-wire" />`;
      }
    });

    this.connectionsSvg.innerHTML = svgHtml;
  }

  // ================= RADAR CONTROLS (ZOOM / RESET) =================

  zoomIn() {
    if (this.currentMode === 'spatial') {
      this.camera.scale = Math.min(1.25, this.camera.scale * 1.15);
      this.world.style.transition = 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)';
      this.renderTransform();
    } else if (this.currentMode === 'linear') {
      window.scrollBy({ top: -350, behavior: 'smooth' });
    } else if (this.currentMode === 'conveyor') {
      this.viewport.scrollBy({ left: -450, behavior: 'smooth' });
    }
  }

  zoomOut() {
    if (this.currentMode === 'spatial') {
      this.camera.scale = Math.max(0.45, this.camera.scale * 0.85);
      this.world.style.transition = 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)';
      this.renderTransform();
    } else if (this.currentMode === 'linear') {
      window.scrollBy({ top: 350, behavior: 'smooth' });
    } else if (this.currentMode === 'conveyor') {
      this.viewport.scrollBy({ left: 450, behavior: 'smooth' });
    }
  }

  resetOrigin() {
    if (this.currentMode === 'spatial') {
      this.warpTo('hero', true);
    } else if (this.currentMode === 'linear') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.activeNodeId = 'hero';
      this.highlightNode('hero');
    } else if (this.currentMode === 'conveyor') {
      this.viewport.scrollTo({ left: 0, behavior: 'smooth' });
      this.activeNodeId = 'hero';
      this.highlightNode('hero');
    }
  }

  // ================= EVENT LISTENERS =================

  bindMouseEvents() {
    // Spatial Mode Dragging
    this.viewport.addEventListener('mousedown', (e) => {
      if (e.target.closest('button, a, input, select, textarea, .chamfer-btn, .lyric-line, .spectrum-bar, .radar-hud, #floating-audio-dock, #case-study-modal, #dossier-modal, pre, code')) {
        return;
      }

      if (this.currentMode === 'spatial') {
        this.isDragging = true;
        this.viewport.classList.add('is-dragging');
        this.dragStart = { x: e.clientX, y: e.clientY };
        this.dragCamStart = { x: this.camera.x, y: this.camera.y };
        this.world.style.transition = 'none';
      } else if (this.currentMode === 'conveyor') {
        this.isDragging = true;
        this.viewport.classList.add('is-dragging');
        this.dragStart = { x: e.clientX, y: e.clientY };
        this.dragScrollStart = this.viewport.scrollLeft;
      }
    });

    window.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;

      if (this.currentMode === 'spatial') {
        const dx = e.clientX - this.dragStart.x;
        const dy = e.clientY - this.dragStart.y;
        this.camera.x = this.dragCamStart.x + dx;
        this.camera.y = this.dragCamStart.y + dy;
        this.renderTransform();
      } else if (this.currentMode === 'conveyor') {
        const dx = e.clientX - this.dragStart.x;
        this.viewport.scrollLeft = this.dragScrollStart - dx;
      }
    });

    window.addEventListener('mouseup', () => {
      if (!this.isDragging) return;
      this.isDragging = false;
      this.viewport.classList.remove('is-dragging');
      this.detectActiveNode();
    });

    // Wheel event: Zooming in Spatial, Horizontal scrolling in Conveyor
    this.viewport.addEventListener('wheel', (e) => {
      if (e.target.closest('.lyrics-scroll-box, #case-study-content, #case-study-modal, #dossier-modal, pre, code')) {
        return;
      }

      if (this.currentMode === 'spatial') {
        e.preventDefault();
        const zoomFactor = e.deltaY < 0 ? 1.08 : 0.92;
        const newScale = Math.max(0.45, Math.min(1.25, this.camera.scale * zoomFactor));

        const rect = this.viewport.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        this.camera.x = mouseX - (mouseX - this.camera.x) * (newScale / this.camera.scale);
        this.camera.y = mouseY - (mouseY - this.camera.y) * (newScale / this.camera.scale);
        this.camera.scale = newScale;

        this.world.style.transition = 'transform 0.08s ease-out';
        this.renderTransform();
      } else if (this.currentMode === 'conveyor') {
        // Shift wheel delta to horizontal scroll
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
          e.preventDefault();
          this.viewport.scrollLeft += e.deltaY * 1.5;
        }
      }
    }, { passive: false });
  }

  bindTouchEvents() {
    let touchStartDist = 0;
    let touchStartScale = 1;

    this.viewport.addEventListener('touchstart', (e) => {
      if (e.target.closest('button, a, input, select, textarea, .chamfer-btn, .lyric-line, .radar-hud, #floating-audio-dock')) return;

      if (this.currentMode === 'spatial') {
        if (e.touches.length === 1) {
          this.isDragging = true;
          this.dragStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
          this.dragCamStart = { x: this.camera.x, y: this.camera.y };
          this.world.style.transition = 'none';
        } else if (e.touches.length === 2) {
          this.isDragging = false;
          const dx = e.touches[0].clientX - e.touches[1].clientX;
          const dy = e.touches[0].clientY - e.touches[1].clientY;
          touchStartDist = Math.hypot(dx, dy);
          touchStartScale = this.camera.scale;
        }
      }
    }, { passive: true });

    this.viewport.addEventListener('touchmove', (e) => {
      if (this.currentMode === 'spatial') {
        if (this.isDragging && e.touches.length === 1) {
          const dx = e.touches[0].clientX - this.dragStart.x;
          const dy = e.touches[0].clientY - this.dragStart.y;
          this.camera.x = this.dragCamStart.x + dx;
          this.camera.y = this.dragCamStart.y + dy;
          this.renderTransform();
        } else if (e.touches.length === 2 && touchStartDist > 0) {
          const dx = e.touches[0].clientX - e.touches[1].clientX;
          const dy = e.touches[0].clientY - e.touches[1].clientY;
          const dist = Math.hypot(dx, dy);
          const factor = dist / touchStartDist;
          this.camera.scale = Math.max(0.45, Math.min(1.25, touchStartScale * factor));
          this.renderTransform();
        }
      }
    }, { passive: true });

    this.viewport.addEventListener('touchend', () => {
      if (this.currentMode === 'spatial') {
        this.isDragging = false;
        this.detectActiveNode();
      }
    });
  }

  bindScrollEvents() {
    // Window scroll for Linear mode
    window.addEventListener('scroll', () => {
      if (this.currentMode === 'linear') {
        this.updateRadarHUD();
        this.detectActiveNode();
      }
    }, { passive: true });

    // Viewport scroll for Conveyor mode
    if (this.viewport) {
      this.viewport.addEventListener('scroll', () => {
        if (this.currentMode === 'conveyor') {
          this.updateRadarHUD();
          this.detectActiveNode();
        }
      }, { passive: true });
    }
  }

  bindResizeEvents() {
    window.addEventListener('resize', () => {
      this.renderRadarPins();
      this.updateRadarHUD();
      if (this.currentMode === 'spatial') {
        this.drawConnections();
      }
    });
  }

  bindNavLinks() {
    document.querySelectorAll('header nav a, #mobile-menu a, .spatial-nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          let targetId = href.substring(1);
          if (targetId === 'about') targetId = 'hero';
          if (this.nodes[targetId]) {
            e.preventDefault();
            this.navigateTo(targetId);
          }
        }
      });
    });
  }
}

// Instantiate engine and expose globally
document.addEventListener('DOMContentLoaded', () => {
  window.uiEngine = new UIEngine();
  window.spatialEngine = window.uiEngine; // Backward compatibility
});