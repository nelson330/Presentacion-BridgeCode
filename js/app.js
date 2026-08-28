/**
 * Herencia Pinolera - Main Application Controller
 * Ecosistema Tecnológico-Comunitario Offline-First
 * IV Rally Nacional de Innovación "Nicaragua Innova 2026"
 */

class HPApp {
  constructor() {
    this.currentView = 'hub';
    this.currentLanguage = 'es';
    this.isOffline = false;
    this.isMobileView = false;
    this.audioGuideEnabled = true;
    this.offlineQueue = JSON.parse(localStorage.getItem('hp_offline_queue') || '[]');
    
    // Dynamic runtime state
    this.governanceList = [...HP_DATA.governanceRecords];
    this.coursesList = [...HP_DATA.courses];
    this.productsList = [...HP_DATA.products];
    this.activeCourseIndex = 0;
    this.activeLessonIndex = 0;
    this.selectedArtisanId = 'art-1';
  }

  init() {
    console.log("Initializing Herencia Pinolera PWA...");
    this.bindEvents();
    this.setLanguage('es');
    this.navigate('hub');
    this.renderHubStats();
    this.renderArtisansList();
    this.renderApprenticeCourses();
    this.renderCouncilBoard();
    this.renderMarketplace();
    this.renderMaterialsDirectory();
    this.renderBudgetTable();
    this.renderCanvas();
    this.renderRoadmap();
    this.updateOfflineBadge();

    // Init Service Worker if supported
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('service-worker.js').catch(err => {
        console.log("Service worker registration note (normal in file preview):", err);
      });
    }
  }

  bindEvents() {
    // Navigation items
    document.querySelectorAll('[data-view-target]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const view = e.currentTarget.getAttribute('data-view-target');
        this.navigate(view);
      });
    });

    // Language buttons
    document.querySelectorAll('[data-lang-code]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const lang = e.currentTarget.getAttribute('data-lang-code');
        this.setLanguage(lang);
      });
    });

    // Offline simulation toggle
    const offlineToggle = document.getElementById('toggle-offline-mode');
    if (offlineToggle) {
      offlineToggle.addEventListener('change', (e) => {
        this.setOfflineMode(e.target.checked);
      });
    }

    // Sync button
    const syncBtn = document.getElementById('btn-sync-offline');
    if (syncBtn) {
      syncBtn.addEventListener('click', () => this.syncOfflineQueue());
    }

    // Mobile View Toggle
    const mobileToggle = document.getElementById('btn-toggle-mobile-frame');
    if (mobileToggle) {
      mobileToggle.addEventListener('click', () => this.toggleMobileFrame());
    }

    // Voice narrator toggle
    const voiceToggle = document.getElementById('btn-toggle-voice-guide');
    if (voiceToggle) {
      voiceToggle.addEventListener('click', () => this.toggleVoiceGuide());
    }
  }

  navigate(viewName) {
    this.currentView = viewName;
    if (window.hpAudio) window.hpAudio.playClickSound();

    // Update active state in navbars
    document.querySelectorAll('.nav-link, .bottom-nav-item').forEach(el => {
      if (el.getAttribute('data-view-target') === viewName) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });

    // Show selected view panel
    document.querySelectorAll('.view-panel').forEach(panel => {
      if (panel.id === `view-${viewName}`) {
        panel.classList.add('active');
      } else {
        panel.classList.remove('active');
      }
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Draw charts if impact view is selected
    if (viewName === 'impact') {
      setTimeout(() => {
        if (window.hpCharts) {
          window.hpCharts.drawRadarChart('radarCanvas');
          window.hpCharts.drawValueDistributionChart('distroCanvas');
          window.hpCharts.drawApprenticeTrendChart('apprenticeTrendCanvas');
        }
      }, 100);
    }
  }

  setLanguage(langCode) {
    this.currentLanguage = langCode;
    if (window.hpAudio) window.hpAudio.setLanguage(langCode);

    // Update UI active buttons
    document.querySelectorAll('[data-lang-code]').forEach(btn => {
      if (btn.getAttribute('data-lang-code') === langCode) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Apply translations
    const dict = HP_TRANSLATIONS[langCode] || HP_TRANSLATIONS.es;
    
    // Update data-i18n elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const keys = key.split('.');
      let val = dict;
      for (const k of keys) {
        if (val && val[k] !== undefined) {
          val = val[k];
        } else {
          val = null;
          break;
        }
      }
      if (val) el.textContent = val;
    });

    // Audio greeting playback
    const langObj = HP_DATA.languages.find(l => l.code === langCode);
    if (langObj && this.audioGuideEnabled && window.hpAudio) {
      window.hpAudio.speak(langObj.greeting, langCode);
    }
  }

  setOfflineMode(isOffline) {
    this.isOffline = isOffline;
    this.updateOfflineBadge();
    const banner = document.getElementById('offline-status-banner');
    if (banner) {
      if (isOffline) {
        banner.className = 'status-banner banner-offline animate-slide-down';
        banner.innerHTML = `
          <div class="banner-content">
            <span class="pulse-dot offline"></span>
            <strong>MODO 100% OFFLINE ACTIVO</strong> &bull; Conectado a Micro-Servidor Local Comunitario (Raspberry Pi 5). Las operaciones se guardan en IndexedDB local.
          </div>
        `;
      } else {
        banner.className = 'status-banner banner-online animate-slide-down';
        banner.innerHTML = `
          <div class="banner-content">
            <span class="pulse-dot online"></span>
            <strong>CONEXIÓN CLOUD / P2P ACTIVA</strong> &bull; Sincronizado en tiempo real con el Ecosistema Nacional Herencia Pinolera.
          </div>
        `;
      }
    }
    if (window.hpAudio) {
      window.hpAudio.speak(isOffline ? "Modo desconectado activado. Operando con micro-servidor local Raspberry Pi." : "Modo en línea activado.");
    }
  }

  updateOfflineBadge() {
    const badge = document.getElementById('nav-offline-indicator');
    if (badge) {
      if (this.isOffline) {
        badge.innerHTML = `<span class="indicator-icon">📶🔒</span> <span class="indicator-text">Offline Local</span>`;
        badge.className = 'nav-badge badge-offline';
      } else {
        badge.innerHTML = `<span class="indicator-icon">🌐✨</span> <span class="indicator-text">En Línea P2P</span>`;
        badge.className = 'nav-badge badge-online';
      }
    }
  }

  toggleMobileFrame() {
    this.isMobileView = !this.isMobileView;
    const container = document.getElementById('app-shell-container');
    const toggleBtn = document.getElementById('btn-toggle-mobile-frame');
    if (container) {
      if (this.isMobileView) {
        container.classList.add('mobile-pwa-frame');
        if (toggleBtn) toggleBtn.innerHTML = `🖥️ Vista Pantalla Completa`;
      } else {
        container.classList.remove('mobile-pwa-frame');
        if (toggleBtn) toggleBtn.innerHTML = `📱 Simular Móvil PWA`;
      }
    }
    if (window.hpAudio) window.hpAudio.playClickSound();
  }

  toggleVoiceGuide() {
    this.audioGuideEnabled = !this.audioGuideEnabled;
    const btn = document.getElementById('btn-toggle-voice-guide');
    if (btn) {
      btn.classList.toggle('active', this.audioGuideEnabled);
      btn.innerHTML = this.audioGuideEnabled ? `🔊 Audio: Activado` : `🔇 Audio: Silenciado`;
    }
    if (window.hpAudio) {
      window.hpAudio.isMuted = !this.audioGuideEnabled;
      if (this.audioGuideEnabled) {
        window.hpAudio.speak("Audio guía activada para navegación inclusiva.");
      }
    }
  }

  // Sync simulated offline queue
  syncOfflineQueue() {
    if (window.hpAudio) window.hpAudio.playSuccessChime();
    const count = this.offlineQueue.length + 3;
    this.offlineQueue = [];
    localStorage.removeItem('hp_offline_queue');

    alert(`📡 Sincronización P2P Exitosa:\n\nSe han sincronizado ${count} paquetes de datos con el Micro-Servidor Raspberry Pi 5 local.\n- Nuevas firmas del Consejo de Ancianos actualizadas.\n- Microcápsulas técnicas respaldadas.\n- Balance del Fondo Rotatorio actualizado.`);
    
    this.renderHubStats();
    this.renderCouncilFund();
  }

  // HUB & STATS
  renderHubStats() {
    const s = HP_DATA.stats;
    const setStat = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    };
    setStat('stat-saberes', s.saberesDigitalizados);
    setStat('stat-maestros', s.artesanosMaestros);
    setStat('stat-aprendices', s.jovenesAprendices);
    setStat('stat-piezas-qr', s.piezasTrazadasQR);
    setStat('stat-fondo', `C$ ${s.fondoComunitarioAcumulado.toLocaleString('es-NI')}`);
    setStat('stat-retencion', `${s.retencionComunalPorcentaje}%`);
  }

  // ARTISAN FLOW (A1 - A8)
  renderArtisansList() {
    const container = document.getElementById('artisans-selection-grid');
    if (!container) return;

    container.innerHTML = HP_DATA.artisans.map(art => `
      <div class="artisan-card ${art.id === this.selectedArtisanId ? 'selected' : ''}" onclick="window.hpApp.selectArtisan('${art.id}')">
        <div class="artisan-card-header">
          <img src="${art.avatar}" alt="${art.name}" class="artisan-avatar-img">
          <div>
            <h4>${art.name}</h4>
            <span class="artisan-age">${art.age} años &bull; ${art.location}</span>
          </div>
        </div>
        <div class="artisan-card-body">
          <p class="artisan-trade">🏺 <strong>${art.trade}</strong></p>
          <p class="artisan-bio">${art.bio}</p>
          <div class="artisan-pledge">🗣️ "${art.communityPledge}"</div>
        </div>
        <div class="artisan-card-footer">
          <span class="badge-tag">🗣️ ${art.language}</span>
          <button class="btn btn-sm btn-outline" onclick="event.stopPropagation(); window.hpAudio.speak('${art.name}, maestro artesano de ${art.location}. Especialidad: ${art.trade}. Mensaje: ${art.communityPledge}')">
            🔊 Escuchar
          </button>
        </div>
      </div>
    `).join('');
  }

  selectArtisan(artId) {
    this.selectedArtisanId = artId;
    this.renderArtisansList();
    const art = HP_DATA.artisans.find(a => a.id === artId);
    if (art && window.hpAudio) {
      window.hpAudio.speak(`Seleccionado ${art.name}. Portal del maestro activo.`);
    }
  }

  // Simulate A3: Recording audio capsule
  startRecordingCapsule() {
    const canvas = document.getElementById('capsule-visualizer-canvas');
    const timer = document.getElementById('capsule-record-timer');
    const btnStart = document.getElementById('btn-start-record');
    const btnStop = document.getElementById('btn-stop-record');

    if (btnStart) btnStart.disabled = true;
    if (btnStop) btnStop.disabled = false;

    window.hpAudio.startSimulatorRecording(canvas, timer);
  }

  stopRecordingCapsule() {
    const timer = document.getElementById('capsule-record-timer');
    const btnStart = document.getElementById('btn-start-record');
    const btnStop = document.getElementById('btn-stop-record');

    if (btnStart) btnStart.disabled = false;
    if (btnStop) btnStop.disabled = true;

    const result = window.hpAudio.stopSimulatorRecording(timer);
    
    // Add to pending review
    const newRecord = {
      id: `gov-${Date.now()}`,
      title: "Nueva Microcápsula Grabada en Campo por Maestro",
      submittedBy: "Don Santos López (Asistido por Facilitador)",
      category: "Alfarería & Cerámica Ancestral",
      region: "Masaya",
      dateSubmitted: new Date().toISOString().split('T')[0],
      status: "PENDING_REVIEW",
      decisionDate: null,
      councilSignatures: [],
      reasoning: "Grabación de técnica asistida por voz. En espera de filtro sagrado vs abierto por el Consejo de Ancianos.",
      lockerTag: "EN_REVISION_CONSEJO",
      icon: "⏳"
    };

    HP_DATA.governanceRecords.unshift(newRecord);
    this.renderCouncilBoard();

    alert(`🎙️ ¡Microcápsula registrada con éxito!\n\nDuración: ${result.duration}\nAlmacenada localmente en la cola offline de la PWA.\nHa sido enviada a la bandeja de curaduría del Consejo de Ancianos para dictamen de soberanía cultural.`);
  }

  // Simulate A4: Schedule workshop
  scheduleArtisanWorkshop(event) {
    event.preventDefault();
    if (window.hpAudio) window.hpAudio.playSuccessChime();
    alert(`📅 ¡Taller práctico programado con éxito!\n\nHorario: Sábados 2:00 PM - 4:00 PM (2 horas intensivas)\nLugar: Taller Comunitario Los Laureles, San Juan de Oriente.\nCupo: 6 aprendices asignados.\n\nSe ha emitido la alerta auditiva a los jóvenes inscritos en el territorio.`);
  }

  // Simulate A5: Master auditory alert test
  testMasterAuditoryAlert() {
    if (window.hpAudio) {
      window.hpAudio.playArtisanAlert();
      setTimeout(() => {
        window.hpAudio.speak("Alerta comunitaria: El joven aprendiz Bryan Centeno ha completado la pieza de alfarería y solicita tu validación presencial.");
      }, 500);
    }
  }

  // Simulate A7: Master certify student piece
  certifyStudentPiece() {
    if (window.hpAudio) {
      window.hpAudio.playCouncilStamp();
      window.hpAudio.playSuccessChime();
    }
    HP_DATA.stats.piezasTrazadasQR++;
    this.renderHubStats();
    alert(`📜 ¡Firma y Aval del Maestro Registrado!\n\nLa pieza 'Vasija Ceremonial Jaguar' elaborada por el aprendiz Bryan Centeno ha sido validada.\nSe ha generado el Código QR de trazabilidad inalterable y la pieza está lista para venta en el Mercado Ético.`);
  }

  // APPRENTICE FLOW (B1 - B8)
  renderApprenticeCourses() {
    const container = document.getElementById('courses-carousel-container');
    if (!container) return;

    container.innerHTML = HP_DATA.courses.map((course, idx) => `
      <div class="course-card ${idx === this.activeCourseIndex ? 'active-course' : ''}" onclick="window.hpApp.selectCourse(${idx})">
        <div class="course-header">
          <span class="course-trade-badge">🌿 ${course.trade}</span>
          <span class="course-offline-size">💾 ${course.offlineSize}</span>
        </div>
        <h3>${course.title}</h3>
        <p class="course-artisan">👴 Maestro Tutor: <strong>${course.artisanName}</strong> (${course.location})</p>
        <p class="course-desc">${course.description}</p>
        
        <div class="course-languages-chips">
          ${course.languagesAvailable.map(l => `<span class="lang-chip">🗣️ ${l}</span>`).join('')}
        </div>

        <div class="course-actions mt-3">
          <button class="btn btn-sm btn-primary" onclick="event.stopPropagation(); window.hpApp.downloadCourseOffline('${course.id}')">
            💾 Descargar Offline
          </button>
          <button class="btn btn-sm btn-secondary" onclick="event.stopPropagation(); window.hpApp.openLessonViewer(${idx})">
            ▶️ Ver Micro-Ruta (${course.lessons.length} Módulos)
          </button>
        </div>
      </div>
    `).join('');

    this.renderActiveLessonContent();
  }

  selectCourse(idx) {
    this.activeCourseIndex = idx;
    this.activeLessonIndex = 0;
    this.renderApprenticeCourses();
  }

  downloadCourseOffline(courseId) {
    if (window.hpAudio) window.hpAudio.playSuccessChime();
    const c = HP_DATA.courses.find(item => item.id === courseId);
    alert(`📥 ¡Módulo "${c.title}" descargado a IndexedDB!\n\nTamaño: ${c.offlineSize}\nPuedes acceder a todos los videos, transcripciones y audios en lenguas originarias 100% sin conexión.`);
  }

  renderActiveLessonContent() {
    const container = document.getElementById('active-lesson-viewer');
    if (!container) return;

    const course = HP_DATA.courses[this.activeCourseIndex];
    if (!course) return;

    const lesson = course.lessons[this.activeLessonIndex] || course.lessons[0];

    container.innerHTML = `
      <div class="lesson-viewer-box">
        <div class="lesson-header">
          <div>
            <span class="badge-tag">Módulo ${this.activeLessonIndex + 1} de ${course.lessons.length}</span>
            <h3>${lesson.title}</h3>
            <span class="lesson-duration">⏱️ Duración: ${lesson.duration} &bull; 💾 Disponible Offline</span>
          </div>
          <button class="btn btn-outline btn-sm" onclick="window.hpAudio.speak('${lesson.title}. ${lesson.audioVoice}')">
            🔊 Escuchar Explicación
          </button>
        </div>

        <div class="lesson-video-placeholder">
          <div class="video-overlay">
            <span class="play-btn-big" onclick="window.hpApp.playLessonAudio('${lesson.title}', '${lesson.audioVoice}')">▶️</span>
            <p>Reproductor de Microcápsula Técnica Asíncrona</p>
            <small>Audio sincronizado en Miskitu, Mayangna, Kriol y Español</small>
          </div>
        </div>

        <div class="lesson-transcript-box">
          <h4>📝 Transcripción & Ficha Técnica Didáctica:</h4>
          <p>${lesson.audioVoice}</p>
        </div>

        <div class="lesson-nav-buttons">
          <button class="btn btn-outline" ${this.activeLessonIndex === 0 ? 'disabled' : ''} onclick="window.hpApp.prevLesson()">
            ⬅️ Módulo Anterior
          </button>
          <button class="btn btn-success" onclick="window.hpApp.completeLessonStep()">
            ✅ Marcar Módulo Completado
          </button>
          <button class="btn btn-primary" ${this.activeLessonIndex === course.lessons.length - 1 ? 'disabled' : ''} onclick="window.hpApp.nextLesson()">
            Siguiente Módulo ➡️
          </button>
        </div>
      </div>
    `;
  }

  playLessonAudio(title, content) {
    if (window.hpAudio) {
      window.hpAudio.playSuccessChime();
      window.hpAudio.speak(`${title}. ${content}`);
    }
  }

  nextLesson() {
    const course = HP_DATA.courses[this.activeCourseIndex];
    if (this.activeLessonIndex < course.lessons.length - 1) {
      this.activeLessonIndex++;
      this.renderActiveLessonContent();
    }
  }

  prevLesson() {
    if (this.activeLessonIndex > 0) {
      this.activeLessonIndex--;
      this.renderActiveLessonContent();
    }
  }

  completeLessonStep() {
    if (window.hpAudio) window.hpAudio.playSuccessChime();
    alert("🎉 ¡Progreso guardado!\nHas completado este módulo técnico. Tu registro ha sido sincronizado localmente.");
    this.nextLesson();
  }

  // Request kit with rotating communal fund
  requestCommunalKit(event) {
    event.preventDefault();
    if (window.hpAudio) window.hpAudio.playSuccessChime();
    alert(`📦 ¡Solicitud de Kit de Insumos Aprobada!\n\nFinanciamiento: 100% cubierto por el Fondo Rotatorio Comunitario (Sin costo inicial para el aprendiz).\nInsumos: Arcillas seleccionadas, torno portátil y juego de piedras de bruñido.\nEntrega: Centro Comunitario Local / Facilitador Territorial.`);
  }

  // COUNCIL OF ELDERS & GOVERNANCE FLOW (C1 - C6)
  renderCouncilBoard() {
    const container = document.getElementById('governance-records-grid');
    if (!container) return;

    container.innerHTML = HP_DATA.governanceRecords.map(rec => {
      let statusBadge = '';
      if (rec.status === 'RESTRICTED_SACRED') {
        statusBadge = `<span class="badge-status-sacred">🔒 Conocimiento Sagrado (Bóveda Restringida)</span>`;
      } else if (rec.status === 'APPROVED_OPEN') {
        statusBadge = `<span class="badge-status-approved">✅ Avalado Abierto (Ficha Oficial)</span>`;
      } else {
        statusBadge = `<span class="badge-status-pending">⏳ Pendiente de Dictamen del Consejo</span>`;
      }

      return `
        <div class="gov-record-card ${rec.status.toLowerCase()}">
          <div class="gov-card-header">
            <div>
              <span class="gov-category-tag">${rec.category} &bull; 📍 ${rec.region}</span>
              <h4>${rec.title}</h4>
            </div>
            <span class="gov-icon-state">${rec.icon}</span>
          </div>

          <div class="gov-card-body">
            <p class="submitted-by">👤 Presentado por: <strong>${rec.submittedBy}</strong> (Fecha: ${rec.dateSubmitted})</p>
            <p class="gov-reasoning">⚖️ <strong>Criterio Comunitario:</strong> ${rec.reasoning}</p>
            <div class="locker-tag-badge">🏷️ Etiqueta de Custodia: <code>${rec.lockerTag}</code></div>
          </div>

          <div class="gov-card-footer">
            ${statusBadge}
            ${rec.status === 'PENDING_REVIEW' ? `
              <div class="gov-action-buttons">
                <button class="btn btn-sm btn-danger" onclick="window.hpApp.decisionSacred('${rec.id}')">
                  🔒 Bóveda Sagrada
                </button>
                <button class="btn btn-sm btn-success" onclick="window.hpApp.decisionApprove('${rec.id}')">
                  ✅ Avalar Público
                </button>
              </div>
            ` : `
              <button class="btn btn-sm btn-outline" onclick="window.hpAudio.speak('Registro de gobernanza: ${rec.title}. Estado: ${rec.status === 'RESTRICTED_SACRED' ? 'Conocimiento sagrado protegido' : 'Conocimiento abierto avalado'}. ${rec.reasoning}')">
                🔊 Escuchar Dictamen
              </button>
            `}
          </div>
        </div>
      `;
    }).join('');

    this.renderCouncilFund();
  }

  decisionSacred(recordId) {
    const rec = HP_DATA.governanceRecords.find(r => r.id === recordId);
    if (!rec) return;

    if (window.hpAudio) window.hpAudio.playCouncilStamp();

    rec.status = 'RESTRICTED_SACRED';
    rec.icon = '🔒';
    rec.decisionDate = new Date().toISOString().split('T')[0];
    rec.lockerTag = `BOVEDA_SAGRADA_${Math.floor(Math.random() * 900 + 100)}`;
    rec.reasoning = "Dictamen del Consejo de Ancianos: Saber ceremonial reservado para la custodia íntima de la comunidad. No apto para uso turístico ni comercial.";
    
    this.renderCouncilBoard();
    alert(`🔒 ¡Dictamen Solemne Emitido!\n\n"${rec.title}" ha sido protegido bajo la Bóveda Sagrada Comunal.\nNadie fuera de la comunidad podrá comercializarlo ni apropiarse de este conocimiento.`);
  }

  decisionApprove(recordId) {
    const rec = HP_DATA.governanceRecords.find(r => r.id === recordId);
    if (!rec) return;

    if (window.hpAudio) {
      window.hpAudio.playCouncilStamp();
      window.hpAudio.playSuccessChime();
    }

    rec.status = 'APPROVED_OPEN';
    rec.icon = '✅';
    rec.decisionDate = new Date().toISOString().split('T')[0];
    rec.lockerTag = `RUTA_OFICIAL_PUBLICA_HP_2026`;
    rec.reasoning = "Dictamen del Consejo de Ancianos: Saber abierto avalado para transmisión formativa y comercialización ética con Pasaporte QR.";

    this.renderCouncilBoard();
    alert(`✅ ¡Aval Comunitario Otorgado!\n\n"${rec.title}" ha sido aprobado como Ficha Técnica Oficial.\nSe ha habilitado en la ruta formativa de los jóvenes y en el catálogo ético.`);
  }

  renderCouncilFund() {
    const s = HP_DATA.stats;
    const balanceEl = document.getElementById('council-fund-balance');
    if (balanceEl) {
      balanceEl.textContent = `C$ ${s.fondoComunitarioAcumulado.toLocaleString('es-NI')}`;
    }
  }

  // MARKETPLACE & QR FLOW
  renderMarketplace() {
    const container = document.getElementById('products-market-grid');
    if (!container) return;

    container.innerHTML = HP_DATA.products.map(prod => `
      <div class="market-product-card">
        <div class="product-img-wrapper">
          <img src="${prod.image}" alt="${prod.name}" class="product-main-img">
          <span class="product-badge-qr">📱 ${prod.qrCode}</span>
        </div>

        <div class="product-card-body">
          <span class="product-territory">📍 ${prod.location}</span>
          <h3 class="product-title">${prod.name}</h3>
          
          <div class="artisan-makers-mini">
            <span>👴 ${prod.masterArtisan}</span>
            <span>🧑‍🎓 ${prod.youngMaker}</span>
          </div>

          <p class="product-desc-short">${prod.description.substring(0, 110)}...</p>

          <div class="product-price-row">
            <div>
              <span class="price-val">C$ ${prod.price.toLocaleString('es-NI')}</span>
              <span class="price-usd-sub">~$${prod.priceUSD} USD</span>
            </div>
            <span class="stock-tag">🟢 ${prod.inStock} disponibles</span>
          </div>
        </div>

        <div class="product-card-footer">
          <button class="btn btn-outline btn-block" onclick="window.hpQRPassport.openPassportModal(HP_DATA.products.find(p => p.id === '${prod.id}'))">
            🔍 Ver Pasaporte QR
          </button>
          <button class="btn btn-success btn-block mt-1" onclick="window.hpQRPassport.buyProduct('${prod.id}')">
            🛒 Comprar (90% a Creador)
          </button>
        </div>
      </div>
    `).join('');
  }

  // MATERIALS DIRECTORY
  renderMaterialsDirectory() {
    const container = document.getElementById('materials-directory-grid');
    if (!container) return;

    container.innerHTML = HP_DATA.rawMaterialsDirectory.map(mat => `
      <div class="material-card">
        <div class="material-header">
          <h4>🌱 ${mat.name}</h4>
          <span class="badge-tag">📍 ${mat.region}</span>
        </div>
        <div class="material-body">
          <p class="producer-group">👥 <strong>Comité Productor:</strong> ${mat.producerGroup}</p>
          <p class="price-unit">💰 <strong>Precio Justo Comunal:</strong> ${mat.pricePerUnit}</p>
          <p class="stock">📦 <strong>Existencia Local:</strong> ${mat.stockAvailable}</p>
          <div class="sustainability-box">
            <span>🌿 <strong>Trazabilidad Ecológica:</strong> ${mat.sustainabilityStatus}</span>
          </div>
          <p class="applications">🎨 <strong>Usos:</strong> ${mat.applications}</p>
        </div>
        <div class="material-footer">
          <button class="btn btn-sm btn-outline btn-block" onclick="window.hpApp.requestMaterialKit('${mat.name}')">
            📦 Solicitar Lote para Taller
          </button>
        </div>
      </div>
    `).join('');
  }

  requestMaterialKit(materialName) {
    if (window.hpAudio) window.hpAudio.playSuccessChime();
    alert(`📦 ¡Pedido de Materia Prima registrado!\n\nSe ha generado la orden comunal para: "${materialName}".\nLos extractores locales recibirán el pago justo directo.`);
  }

  // BUDGET & CANVAS
  renderBudgetTable() {
    const tbody = document.getElementById('budget-table-body');
    if (!tbody) return;

    let totalGlobal = 0;
    tbody.innerHTML = HP_DATA.budgetTable.map(item => {
      totalGlobal += item.total;
      return `
        <tr>
          <td class="text-center font-bold">${item.item}</td>
          <td><strong>${item.description}</strong><br><small class="text-muted">${item.category}</small></td>
          <td class="text-center">${item.unit}</td>
          <td class="text-center font-bold">${item.quantity}</td>
          <td class="text-right">C$ ${item.unitPrice.toLocaleString('es-NI', { minimumFractionDigits: 2 })}</td>
          <td class="text-right font-bold text-terracotta">C$ ${item.total.toLocaleString('es-NI', { minimumFractionDigits: 2 })}</td>
        </tr>
      `;
    }).join('');

    const totalEl = document.getElementById('budget-total-val');
    if (totalEl) totalEl.textContent = `C$ ${totalGlobal.toLocaleString('es-NI', { minimumFractionDigits: 2 })}`;
  }

  renderCanvas() {
    const c = HP_DATA.canvasModel;
    const populateList = (id, items) => {
      const el = document.getElementById(id);
      if (el) {
        el.innerHTML = items.map(item => `<li>${item}</li>`).join('');
      }
    };

    populateList('canvas-socios', c.sociosClave);
    populateList('canvas-actividades', c.actividadesClave);
    populateList('canvas-propuesta', c.propuestaValor);
    populateList('canvas-relaciones', c.relacionesClientes);
    populateList('canvas-segmento', c.segmentoClientes);
    populateList('canvas-recursos', c.recursosClave);
    populateList('canvas-canales', c.canales);
    populateList('canvas-costos', c.estructuraCostos);
    populateList('canvas-ingresos', c.fuentesIngresos);
  }

  renderRoadmap() {
    const container = document.getElementById('roadmap-timeline-container');
    if (!container) return;

    container.innerHTML = HP_DATA.implementationRoadmap.map(stage => `
      <div class="roadmap-card">
        <div class="roadmap-phase-badge">${stage.phase}</div>
        <h4>${stage.title}</h4>
        <p class="roadmap-desc">${stage.description}</p>
        <div class="roadmap-deliverables">
          <strong>Hitos / Entregables:</strong>
          <ul>
            ${stage.deliverables.map(d => `<li>✅ ${d}</li>`).join('')}
          </ul>
        </div>
      </div>
    `).join('');
  }
}

// Instantiate global app on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.hpApp = new HPApp();
  window.hpApp.init();
});
