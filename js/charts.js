/**
 * Herencia Pinolera - Charts & Visualizations Engine
 * Pure Canvas & SVG rendering (100% Offline-capable, zero external dependencies)
 * - Multidimensional Radar Chart (Herencia Pinolera vs Traditional Model)
 * - Value Distribution Comparison Bar Chart (90% Community vs 80% Intermediary Coyotaje)
 * - Youth Apprentice Evolution & Recovery Projection Line Chart
 */

class HPCharts {
  // Draw the Multidimensional Impact Radar Chart (Reproducing Page 9 of the proposal PDF)
  drawRadarChart(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    
    const rect = canvas.getBoundingClientRect();
    const width = rect.width || 500;
    const height = rect.height || 420;
    
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2 + 10;
    const radius = Math.min(width, height) * 0.36;

    const dimensions = [
      { label: "Digitalización de\nSaberes Ancestrales", traditional: 0.20, herencia: 1.00 },
      { label: "Retención de\nValor Comunal", traditional: 0.20, herencia: 0.90 },
      { label: "Ingreso Neto\ndel Artesano", traditional: 0.25, herencia: 0.95 },
      { label: "Inclusión Lingüística\ny Offline-First", traditional: 0.10, herencia: 1.00 },
      { label: "Trazabilidad y\nCertificación QR", traditional: 0.00, herencia: 1.00 },
      { label: "Atracción de\nAprendices Juveniles", traditional: 0.20, herencia: 0.95 }
    ];

    const numAxes = dimensions.length;
    const angleStep = (Math.PI * 2) / numAxes;

    // Draw concentric polygon grid levels (20%, 40%, 60%, 80%, 100%)
    const levels = [0.2, 0.4, 0.6, 0.8, 1.0];
    levels.forEach(level => {
      ctx.beginPath();
      for (let i = 0; i < numAxes; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const x = centerX + Math.cos(angle) * (radius * level);
        const y = centerY + Math.sin(angle) * (radius * level);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.25)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Percentage label on the vertical axis
      ctx.fillStyle = '#94A3B8';
      ctx.font = '10px Inter, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(`${Math.round(level * 100)}%`, centerX - 8, centerY - radius * level + 4);
    });

    // Draw radial axis spokes and labels
    dimensions.forEach((dim, i) => {
      const angle = i * angleStep - Math.PI / 2;
      const endX = centerX + Math.cos(angle) * radius;
      const endY = centerY + Math.sin(angle) * radius;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.3)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Axis label position
      const labelRadius = radius + 32;
      const labelX = centerX + Math.cos(angle) * labelRadius;
      const labelY = centerY + Math.sin(angle) * labelRadius;

      ctx.fillStyle = '#E2E8F0';
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const lines = dim.label.split('\n');
      lines.forEach((line, lineIdx) => {
        ctx.fillText(line, labelX, labelY + (lineIdx * 13) - ((lines.length - 1) * 6));
      });
    });

    // 1. Draw Traditional Model polygon (Orange dashed / fill)
    ctx.beginPath();
    dimensions.forEach((dim, i) => {
      const angle = i * angleStep - Math.PI / 2;
      const x = centerX + Math.cos(angle) * (radius * dim.traditional);
      const y = centerY + Math.sin(angle) * (radius * dim.traditional);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fillStyle = 'rgba(234, 88, 12, 0.25)';
    ctx.fill();
    ctx.strokeStyle = '#EA580C';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Traditional points
    dimensions.forEach((dim, i) => {
      const angle = i * angleStep - Math.PI / 2;
      const x = centerX + Math.cos(angle) * (radius * dim.traditional);
      const y = centerY + Math.sin(angle) * (radius * dim.traditional);
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#EA580C';
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });

    // 2. Draw Herencia Pinolera Model polygon (Blue / Teal fill)
    ctx.beginPath();
    dimensions.forEach((dim, i) => {
      const angle = i * angleStep - Math.PI / 2;
      const x = centerX + Math.cos(angle) * (radius * dim.herencia);
      const y = centerY + Math.sin(angle) * (radius * dim.herencia);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fillStyle = 'rgba(14, 165, 233, 0.35)';
    ctx.fill();
    ctx.strokeStyle = '#0284C7';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Herencia Pinolera points
    dimensions.forEach((dim, i) => {
      const angle = i * angleStep - Math.PI / 2;
      const x = centerX + Math.cos(angle) * (radius * dim.herencia);
      const y = centerY + Math.sin(angle) * (radius * dim.herencia);
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#0284C7';
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.stroke();
    });
  }

  // Draw Value Distribution Comparison Bar Chart (Page 3 of PDF)
  drawValueDistributionChart(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    const rect = canvas.getBoundingClientRect();
    const width = rect.width || 440;
    const height = rect.height || 280;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, width, height);

    const barWidth = 70;
    const chartHeight = 180;
    const bottomY = 220;
    const col1X = width * 0.28;
    const col2X = width * 0.68;

    // Title
    ctx.fillStyle = '#F1F5F9';
    ctx.font = 'bold 13px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Distribución del Valor de Venta Final', width / 2, 22);

    // Axis lines
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(40, bottomY);
    ctx.lineTo(width - 30, bottomY);
    ctx.stroke();

    // Column 1: Traditional Model (80% Coyotaje, 20% Artisan)
    // Top 80% (Coyotaje)
    const h1Coyotaje = chartHeight * 0.80;
    const y1Coyotaje = bottomY - chartHeight;
    ctx.fillStyle = '#EA580C'; // Orange
    ctx.fillRect(col1X - barWidth / 2, y1Coyotaje, barWidth, h1Coyotaje);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 12px Inter, sans-serif';
    ctx.fillText('80%', col1X, y1Coyotaje + h1Coyotaje / 2);

    // Bottom 20% (Artisan)
    const h1Artisan = chartHeight * 0.20;
    const y1Artisan = bottomY - h1Artisan;
    ctx.fillStyle = '#0284C7'; // Blue
    ctx.fillRect(col1X - barWidth / 2, y1Artisan, barWidth, h1Artisan);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText('20%', col1X, y1Artisan + h1Artisan / 2 + 4);

    // Column 2: Herencia Pinolera Model (90% Community, 10% Platform)
    // Top 10% (Platform)
    const h2Platform = chartHeight * 0.10;
    const y2Platform = bottomY - chartHeight;
    ctx.fillStyle = '#EA580C';
    ctx.fillRect(col2X - barWidth / 2, y2Platform, barWidth, h2Platform);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText('10%', col2X, y2Platform + h2Platform / 2 + 4);

    // Bottom 90% (Community & Artisans)
    const h2Comm = chartHeight * 0.90;
    const y2Comm = bottomY - h2Comm;
    ctx.fillStyle = '#0284C7';
    ctx.fillRect(col2X - barWidth / 2, y2Comm, barWidth, h2Comm);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText('90%', col2X, y2Comm + h2Comm / 2);

    // Column Labels
    ctx.fillStyle = '#CBD5E1';
    ctx.font = '11px Inter, sans-serif';
    ctx.fillText('Modelo Tradicional\n(Coyotaje)', col1X, bottomY + 20);
    ctx.fillText('Herencia Pinolera\n(Propuesto)', col2X, bottomY + 20);
  }

  // Draw Youth Apprentice Decline vs Recovery Line Chart (Page 3 of PDF)
  drawApprenticeTrendChart(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    const rect = canvas.getBoundingClientRect();
    const width = rect.width || 440;
    const height = rect.height || 280;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, width, height);

    const padLeft = 45;
    const padRight = 30;
    const padTop = 35;
    const padBottom = 40;
    const chartW = width - padLeft - padRight;
    const chartH = height - padTop - padBottom;

    // Title
    ctx.fillStyle = '#F1F5F9';
    ctx.font = 'bold 13px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Evolución de Aprendices Juveniles Activos', width / 2, 20);

    const points = [
      { year: '2014', value: 100, isProj: false },
      { year: '2016', value: 90, isProj: false },
      { year: '2018', value: 78, isProj: false },
      { year: '2020', value: 68, isProj: false },
      { year: '2022', value: 60, isProj: false },
      { year: '2024', value: 55, isProj: false },
      { year: '2026+', value: 135, isProj: true }
    ];

    const minVal = 40;
    const maxVal = 140;

    // Grid lines
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.2)';
    ctx.lineWidth = 1;
    [40, 60, 80, 100, 120, 140].forEach(val => {
      const y = padTop + chartH - ((val - minVal) / (maxVal - minVal)) * chartH;
      ctx.beginPath();
      ctx.moveTo(padLeft, y);
      ctx.lineTo(width - padRight, y);
      ctx.stroke();

      ctx.fillStyle = '#94A3B8';
      ctx.font = '10px Inter, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(`${val}%`, padLeft - 6, y + 3);
    });

    const getX = (idx) => padLeft + (idx / (points.length - 1)) * chartW;
    const getY = (val) => padTop + chartH - ((val - minVal) / (maxVal - minVal)) * chartH;

    // 1. Draw Historical Fall Line (Red/Orange)
    ctx.beginPath();
    for (let i = 0; i <= 5; i++) {
      const x = getX(i);
      const y = getY(points[i].value);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = '#EF4444';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // 2. Draw Projected Recovery Line (Teal/Green dashed)
    ctx.beginPath();
    ctx.setLineDash([5, 4]);
    ctx.moveTo(getX(5), getY(points[5].value));
    ctx.lineTo(getX(6), getY(points[6].value));
    ctx.strokeStyle = '#10B981';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.setLineDash([]); // Reset dash

    // Draw Points & Labels
    points.forEach((p, idx) => {
      const x = getX(idx);
      const y = getY(p.value);

      ctx.beginPath();
      ctx.arc(x, y, p.isProj ? 6 : 4.5, 0, Math.PI * 2);
      ctx.fillStyle = p.isProj ? '#10B981' : '#EF4444';
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Year Label
      ctx.fillStyle = '#CBD5E1';
      ctx.font = '11px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(p.year, x, height - padBottom + 18);

      // Value Callout
      ctx.fillStyle = p.isProj ? '#34D399' : '#FCA5A5';
      ctx.font = 'bold 10px Inter, sans-serif';
      ctx.fillText(`${p.value}%`, x, y - 10);
    });

    // Annotation Box for -45% fall
    ctx.fillStyle = 'rgba(239, 68, 68, 0.15)';
    ctx.strokeStyle = '#EF4444';
    ctx.lineWidth = 1;
    ctx.fillRect(width * 0.45, padTop + 35, 120, 24);
    ctx.strokeRect(width * 0.45, padTop + 35, 120, 24);
    ctx.fillStyle = '#FECACA';
    ctx.font = 'bold 10px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Caída acumulada: -45%', width * 0.45 + 60, padTop + 50);
  }
}

window.hpCharts = new HPCharts();
