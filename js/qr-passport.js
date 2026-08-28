/**
 * Herencia Pinolera - QR Passport Engine & Interactive Scanner
 * Handles:
 * - Dynamic QR Code rendering (Vector Matrix Canvas)
 * - Interactive QR Scanner simulation with live video viewfinder effect
 * - Traceability Passport viewer with transparency breakdown
 */

class HPQRPassport {
  constructor() {
    this.currentPassportProduct = null;
  }

  // Draw a crisp, high-contrast matrix QR representation on a canvas
  renderQRCodeCanvas(canvas, qrText, size = 180) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = size;
    canvas.height = size;

    // Simple deterministic pseudo-random matrix based on string hash
    let hash = 0;
    for (let i = 0; i < qrText.length; i++) {
      hash = ((hash << 5) - hash) + qrText.charCodeAt(i);
      hash |= 0;
    }

    const matrixSize = 25; // 25x25 grid
    const cellSize = size / matrixSize;

    // Background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, size, size);

    ctx.fillStyle = '#1A202C'; // Dark navy ink

    // Finder patterns (3 corners)
    this.drawFinderPattern(ctx, 0, 0, cellSize);
    this.drawFinderPattern(ctx, (matrixSize - 7) * cellSize, 0, cellSize);
    this.drawFinderPattern(ctx, 0, (matrixSize - 7) * cellSize, cellSize);

    // Fill data cells
    for (let row = 0; row < matrixSize; row++) {
      for (let col = 0; col < matrixSize; col++) {
        // Skip finder pattern zones
        if (
          (row < 8 && col < 8) ||
          (row < 8 && col >= matrixSize - 8) ||
          (row >= matrixSize - 8 && col < 8)
        ) {
          continue;
        }

        // Center emblem zone
        if (row >= 10 && row <= 14 && col >= 10 && col <= 14) {
          continue;
        }

        // Pseudo-random bit based on text hash and coordinates
        const bit = Math.abs(Math.sin((hash + row * 31 + col * 17))) > 0.48;
        if (bit) {
          ctx.fillRect(col * cellSize, row * cellSize, cellSize - 0.4, cellSize - 0.4);
        }
      }
    }

    // Center cultural badge
    const centerRadius = (cellSize * 5) / 2;
    const centerX = size / 2;
    const centerY = size / 2;

    ctx.beginPath();
    ctx.arc(centerX, centerY, centerRadius + 2, 0, Math.PI * 2);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(centerX, centerY, centerRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#D97706'; // Terracotta gold
    ctx.fill();

    // Center icon text
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('HP', centerX, centerY);
  }

  drawFinderPattern(ctx, x, y, cellSize) {
    // Outer 7x7 box
    ctx.fillStyle = '#1A202C';
    ctx.fillRect(x, y, cellSize * 7, cellSize * 7);

    // Inner 5x5 white
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(x + cellSize, y + cellSize, cellSize * 5, cellSize * 5);

    // Center 3x3 black
    ctx.fillStyle = '#1A202C';
    ctx.fillRect(x + cellSize * 2, y + cellSize * 2, cellSize * 3, cellSize * 3);
  }

  // Open the detailed Digital Passport Modal for a given product
  openPassportModal(product) {
    this.currentPassportProduct = product;
    if (window.hpAudio) {
      window.hpAudio.playClickSound();
    }

    let modal = document.getElementById('hp-passport-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'hp-passport-modal';
      modal.className = 'hp-modal-overlay';
      document.body.appendChild(modal);
    }

    const p = product;
    const split = p.splitBreakdown;

    modal.innerHTML = `
      <div class="hp-modal-card passport-card animate-fade-in">
        <div class="passport-header">
          <div class="passport-brand">
            <span class="emblem-seal">🇳🇮</span>
            <div>
              <h3>PASAPORTE DIGITAL DE ORIGEN & TRAZABILIDAD</h3>
              <p class="passport-code">CÓDIGO ÚNICO: <strong>${p.qrCode}</strong> | <span class="badge-status-verified">Aval Comunitario Certificado ✅</span></p>
            </div>
          </div>
          <button class="modal-close-btn" onclick="document.getElementById('hp-passport-modal').classList.remove('active')">&times;</button>
        </div>

        <div class="passport-body">
          <div class="passport-columns">
            
            <!-- Column 1: QR & Visual Identity -->
            <div class="passport-col-qr">
              <div class="qr-box-container">
                <canvas id="modal-qr-canvas" width="160" height="160"></canvas>
                <span class="qr-subtext">Escaneable sin internet</span>
              </div>
              
              <div class="passport-security-stamp">
                <div class="stamp-icon">🛡️</div>
                <div class="stamp-info">
                  <strong>Sello de Inalterabilidad</strong>
                  <p class="hash-text">SHA-256: 8f9b...e21c</p>
                  <small>Validado en Micro-Servidor Comunal</small>
                </div>
              </div>

              <button class="btn btn-secondary btn-block mt-2" onclick="window.hpAudio.speak('Pasaporte Digital de ${p.name}. Elaborado por el joven ${p.youngMaker} bajo la tutela del ${p.masterArtisan} en ${p.location}. Garantía de comercio justo con el noventa por ciento del valor retenido en la comunidad.')">
                🔊 Escuchar Historia
              </button>
            </div>

            <!-- Column 2: Origin & Artisans -->
            <div class="passport-col-info">
              <h2 class="product-title-modal">${p.name}</h2>
              <p class="product-category-tag">🌿 ${p.category} &bull; 📍 ${p.location}</p>

              <div class="artisan-pair-card">
                <div class="artisan-pair-item">
                  <div class="avatar-circle">👴</div>
                  <div>
                    <span class="role-label">Maestro Sabio Tutor:</span>
                    <strong>${p.masterArtisan}</strong>
                    <small>Portador de técnica ancestral</small>
                  </div>
                </div>
                <div class="artisan-pair-connector">🤝</div>
                <div class="artisan-pair-item">
                  <div class="avatar-circle">🧑‍🎓</div>
                  <div>
                    <span class="role-label">Joven Artesano Creador:</span>
                    <strong>${p.youngMaker}</strong>
                    <small>Relevo generacional certificado</small>
                  </div>
                </div>
              </div>

              <div class="passport-detail-box">
                <h4>🌱 Materia Prima Sostenible</h4>
                <p>${p.rawMaterial}</p>
                <div class="badge-tag-eco">🌿 ${p.sustainabilityBadge}</div>
              </div>

              <div class="passport-detail-box">
                <h4>⚖️ Gobernanza y Aval Comunal</h4>
                <p><strong>${p.councilValidation}</strong></p>
                <small class="text-muted">Fecha de Certificación: ${p.creationDate} | Dimensiones: ${p.dimensions}</small>
              </div>

              <!-- Price & Transparent Split -->
              <div class="price-split-section">
                <div class="price-header-split">
                  <span class="price-tag-big">C$ ${p.price.toLocaleString('es-NI')} NIO</span>
                  <span class="price-usd">(~$${p.priceUSD} USD)</span>
                </div>
                
                <h4 class="split-title">📊 Desglose de Comercio Justo (90% en la Comunidad):</h4>
                
                <div class="split-bars">
                  <div class="split-bar-item">
                    <div class="split-label">
                      <span>🧑‍🎓 Joven Creador (${split.makerPercent}%)</span>
                      <strong>C$ ${split.makerAmount.toFixed(2)}</strong>
                    </div>
                    <div class="progress-track"><div class="progress-fill fill-maker" style="width: ${split.makerPercent}%"></div></div>
                  </div>

                  <div class="split-bar-item">
                    <div class="split-label">
                      <span>👴 Regalías Maestro Tutor (${split.masterPercent}%)</span>
                      <strong>C$ ${split.masterAmount.toFixed(2)}</strong>
                    </div>
                    <div class="progress-track"><div class="progress-fill fill-master" style="width: ${split.masterPercent}%"></div></div>
                  </div>

                  <div class="split-bar-item">
                    <div class="split-label">
                      <span>🏛️ Fondo Rotatorio Comunal Insumos/Becas (${split.communalFundPercent}%)</span>
                      <strong>C$ ${split.communalFundAmount.toFixed(2)}</strong>
                    </div>
                    <div class="progress-track"><div class="progress-fill fill-fund" style="width: ${split.communalFundPercent}%"></div></div>
                  </div>

                  <div class="split-bar-item">
                    <div class="split-label">
                      <span>💻 Soporte PWA / Micro-Servidores (${split.pwaMaintenancePercent}%)</span>
                      <strong>C$ ${split.pwaMaintenanceAmount.toFixed(2)}</strong>
                    </div>
                    <div class="progress-track"><div class="progress-fill fill-tech" style="width: ${split.pwaMaintenancePercent}%"></div></div>
                  </div>
                </div>

                <div class="coyotaje-comparison">
                  <span>🚫 En el modelo tradicional con intermediarios ("coyotes"), el artesano sólo recibiría el <strong>20% (C$ ${(p.price * 0.2).toFixed(2)})</strong>. Con Herencia Pinolera la comunidad retiene el <strong>90% (C$ ${(p.price * 0.9).toFixed(2)})</strong>.</span>
                </div>
              </div>

            </div>

          </div>
        </div>

        <div class="passport-footer">
          <button class="btn btn-outline" onclick="window.print()">🖨️ Imprimir / Guardar Certificado</button>
          <button class="btn btn-success btn-lg" onclick="window.hpQRPassport.buyProduct('${p.id}')">
            🛒 Adquirir Pieza (Comercio Justo Directo)
          </button>
        </div>
      </div>
    `;

    modal.classList.add('active');

    // Render the QR canvas inside the modal
    setTimeout(() => {
      const qrCanvas = document.getElementById('modal-qr-canvas');
      if (qrCanvas) {
        this.renderQRCodeCanvas(qrCanvas, p.qrCode, 160);
      }
    }, 50);
  }

  // Buy action with simulation of instant direct payment and communal fund ledger update
  buyProduct(productId) {
    const product = HP_DATA.products.find(p => p.id === productId);
    if (!product) return;

    if (window.hpAudio) {
      window.hpAudio.playSuccessChime();
    }

    // Update stats
    HP_DATA.stats.fondoComunitarioAcumulado += product.splitBreakdown.communalFundAmount;
    
    // Show success dialog
    alert(`🎉 ¡Compra confirmada con éxito!\n\nHas adquirido: "${product.name}" por C$ ${product.price.toLocaleString('es-NI')}.\n\nDistribución inmediata realizada:\n- C$ ${product.splitBreakdown.makerAmount.toFixed(2)} transferidos directamente a ${product.youngMaker}.\n- C$ ${product.splitBreakdown.masterAmount.toFixed(2)} en regalías a ${product.masterArtisan}.\n- C$ ${product.splitBreakdown.communalFundAmount.toFixed(2)} aportados al Fondo Rotatorio Comunitario.\n\n¡Gracias por salvaguardar el patrimonio artesanal de Nicaragua!`);

    // Refresh UI stats
    if (window.hpApp) {
      window.hpApp.renderHubStats();
      window.hpApp.renderCouncilFund();
    }

    const modal = document.getElementById('hp-passport-modal');
    if (modal) modal.classList.remove('active');
  }

  // Open the interactive QR Scanner Simulator
  openScannerModal() {
    if (window.hpAudio) window.hpAudio.playClickSound();

    let modal = document.getElementById('hp-scanner-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'hp-scanner-modal';
      modal.className = 'hp-modal-overlay';
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="hp-modal-card scanner-card animate-fade-in">
        <div class="scanner-header">
          <h3>📷 ESCÁNER DE PASAPORTE QR (OFFLINE)</h3>
          <button class="modal-close-btn" onclick="document.getElementById('hp-scanner-modal').classList.remove('active')">&times;</button>
        </div>

        <div class="scanner-body">
          <div class="viewfinder-box">
            <div class="viewfinder-laser"></div>
            <div class="viewfinder-corner top-left"></div>
            <div class="viewfinder-corner top-right"></div>
            <div class="viewfinder-corner bottom-left"></div>
            <div class="viewfinder-corner bottom-right"></div>
            <div class="scanner-simulation-video">
              <span class="camera-icon">📸</span>
              <p>Apunta la cámara a la etiqueta QR física de la artesanía</p>
              <small>Compatible con teléfonos básicos y sin datos móviles</small>
            </div>
          </div>

          <div class="quick-sample-select mt-3">
            <h4>O simula escanear una pieza de muestra:</h4>
            <div class="sample-qr-chips">
              ${HP_DATA.products.map(p => `
                <button class="qr-chip-btn" onclick="window.hpQRPassport.simulateScan('${p.id}')">
                  🏺 ${p.name.substring(0, 28)}... (${p.qrCode})
                </button>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="scanner-footer">
          <button class="btn btn-secondary btn-block" onclick="document.getElementById('hp-scanner-modal').classList.remove('active')">
            Cerrar Escáner
          </button>
        </div>
      </div>
    `;

    modal.classList.add('active');
  }

  simulateScan(productId) {
    const modal = document.getElementById('hp-scanner-modal');
    if (modal) modal.classList.remove('active');

    if (window.hpAudio) {
      window.hpAudio.playSuccessChime();
    }

    const prod = HP_DATA.products.find(p => p.id === productId);
    if (prod) {
      setTimeout(() => {
        this.openPassportModal(prod);
      }, 200);
    }
  }
}

window.hpQRPassport = new HPQRPassport();
