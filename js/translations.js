/**
 * Herencia Pinolera - Multilingual Dictionaries (4 Languages)
 * 1. Español (ES)
 * 2. Miskitu (MI)
 * 3. Mayangna (MY)
 * 4. Kriol (KR)
 */

const HP_TRANSLATIONS = {
  es: {
    appName: "Herencia Pinolera",
    tagline: "Ecosistema Tecnológico Offline-First para Saberes Tradicionales",
    nav: {
      hub: "Inicio & Hub",
      artisan: "Maestro Artesano",
      apprentice: "Aprendiz Joven",
      council: "Consejo de Ancianos",
      market: "Mercado Ético & QR",
      materials: "Materias Primas",
      impact: "Impacto & Rally 2026"
    },
    audioGuide: "Audio-Guía Activa",
    audioGuidePrompt: "Haz clic en cualquier ícono de bocina para escuchar la explicación en tu lengua.",
    offlineMode: "Modo Offline",
    offlineActive: "100% Desconectado (Micro-Servidor Local)",
    onlineActive: "En línea (Sincronizado)",
    syncNow: "Sincronizar Datos",
    syncSuccess: "¡Sincronización P2P completada con éxito con el micro-servidor comunal!",
    selectLanguage: "Seleccionar Idioma",
    listenAudio: "Escuchar narración en audio",
    recordAudio: "Grabar audio / Microcápsula",
    
    // Hub
    hubTitle: "Rescate, Formación y Trazabilidad de Saberes Tradicionales",
    hubSubtitle: "Salvaguardando el patrimonio inmaterial y empoderando a artesanos y jóvenes en Nicaragua sin depender de conexión a internet.",
    statsSaberes: "Saberes Digitalizados",
    statsMaestros: "Maestros Sabios",
    statsAprendices: "Jóvenes Aprendices",
    statsTrazabilidad: "Piezas con Pasaporte QR",
    statsFondo: "Fondo Comunal",
    statsRetencion: "Retención en Comunidad",

    // Artisan flow
    artisanTitle: "Portal del Maestro Artesano & Portador del Saber",
    artisanSubtitle: "Graba técnicas paso a paso, gestiona talleres y valida a tus aprendices con asistencia de voz.",
    stepA1: "1. Registro Asistido",
    stepA2: "2. Idioma Nativo",
    stepA3: "3. Grabar Técnica",
    stepA4: "4. Horarios Talleres",
    stepA5: "5. Alertas Sonoras",
    stepA6: "6. Taller Práctico",
    stepA7: "7. Certificar Aprendiz",
    stepA8: "8. Billetera y Honorarios",
    recordCapsule: "Grabar Microcápsula Técnica",
    recordInstruction: "Presiona el botón rojo para iniciar la grabación asistida por voz.",
    scheduleWorkshop: "Programar Taller Presencial (1-2 hrs)",
    validateStudent: "Firmar Aval y Certificar Pieza",
    masterWallet: "Billetera Comunitaria: Honorarios C$ y Regalías",

    // Apprentice flow
    apprenticeTitle: "Ruta de Formación y Emprendimiento Juvenil",
    apprenticeSubtitle: "Aprende un oficio ancestral a tu propio ritmo, solicita insumos y vende con pasaporte digital.",
    stepB1: "1. Elegir Oficio",
    stepB2: "2. Descargar Offline",
    stepB3: "3. Solicitar Insumos",
    stepB4: "4. Estudio Asíncrono",
    stepB5: "5. Reservar Taller",
    stepB6: "6. Producir Pieza",
    stepB7: "7. Pasaporte QR",
    stepB8: "8. Venta Directa",
    downloadOfflineBtn: "Descargar Módulo Offline",
    requestKitBtn: "Solicitar Kit con Fondo Comunal",
    reserveWorkshopBtn: "Reservar Taller con Maestro",
    generatePassportBtn: "Generar Pasaporte QR & Insignia",

    // Council flow
    councilTitle: "Panel de Curaduría y Consejo de Ancianos",
    councilSubtitle: "Soberanía Cultural y Auditoría Comunitaria de Saberes Ancestrales.",
    sacredLocker: "Bóveda Sagrada (Restringido)",
    openKnowledge: "Conocimiento Abierto (Formativo)",
    pendingDecision: "Pendiente de Dictamen",
    evaluateSaber: "Evaluar Registro",
    approveForPublic: "Aprobar & Avalar Ficha Técnica",
    moveToSacredLocker: "Proteger en Bóveda Sagrada",
    communalFundTitle: "Monitoreo del Fondo Rotatorio Comunitario (5% de ventas)",

    // Marketplace & QR
    marketTitle: "Mercado Ético, Turismo Cultural & Pasaporte QR",
    marketSubtitle: "Cada pieza narra la historia del maestro, el aprendiz y su origen sostenible.",
    scanQRBtn: "Escanear Pasaporte QR",
    viewPassportDetails: "Ver Pasaporte Digital",
    verifiedAuthenticity: "Certificación de Autenticidad Comunitaria",
    priceBreakdown: "Desglose Transparente del Precio (90% en la comunidad)",
    buyEthicalPiece: "Adquirir Pieza con Comercio Justo",

    // Materials
    materialsTitle: "Directorio de Materias Primas Sostenibles",
    materialsSubtitle: "Red local de extractores comunitarios y banco de materiales.",
    requestMaterial: "Solicitar Materia Prima para Taller",

    // Impact & Rally
    impactTitle: "Impacto Multidimensional, Modelo Canvas y Rally 2026",
    impactSubtitle: "Propuesta ganadora presentada en el IV Rally Nacional de Innovación.",
    radarTitle: "Evaluación de Impacto Multidimensional",
    budgetTitle: "Presupuesto Detallado (C$ 206,000)",
    canvasTitle: "Lienzo de Modelo de Negocios CANVAS",
    roadmapTitle: "Plan de Implementación (12 Meses)"
  },

  mi: {
    appName: "Herencia Pinolera",
    tagline: "Wauhtaya nani ba offline-first dukiara wan kalcha preservamun",
    nav: {
      hub: "Kaina & Hub",
      artisan: "Kukas / Maestro",
      apprentice: "Joven Aprendiz",
      council: "Anciano Nani Kansl",
      market: "Maket & QR Wauhtaya",
      materials: "Pani Insumos",
      impact: "Impacto & Rally 2026"
    },
    audioGuide: "Aisan Guía Auka",
    audioGuidePrompt: "Bocina nani ba clik muns wina aisan ba walbia man aisan ra.",
    offlineMode: "Offline Mode (Desconectado)",
    offlineActive: "100% Offline (Micro-Servidor Local)",
    onlineActive: "Online (Sincronizado)",
    syncNow: "Sincronizar Dataka",
    syncSuccess: "¡Sincronización P2P yamni takaskikan micro-servidor ra!",
    selectLanguage: "Aisan Laka Wahbia",
    listenAudio: "Aisan ba walbia",
    recordAudio: "Aisan ba grabamun / Microcápsula",
    
    // Hub
    hubTitle: "Wan Saberes Ancestrales ba Klaki Sakbia bara Lan Takbia",
    hubSubtitle: "Preservamun wan identidad Nicaragüense dukiara, internet apu sin aukan yabal ra.",
    statsSaberes: "Saberes Digitalizados",
    statsMaestros: "Kukas & Maestros",
    statsAprendices: "Wahma & Mairin Nani",
    statsTrazabilidad: "Piezas QR Pasaporte",
    statsFondo: "Komyuniti Lala Fund",
    statsRetencion: "90% Retención Comunal",

    // Artisan flow
    artisanTitle: "Kukas & Maestro Nani Portal",
    artisanSubtitle: "Técnica nani ba aisan ra grabamun, taller laka daukbia bara wahma nani ba certifikamun.",
    stepA1: "1. Registro Asistido",
    stepA2: "2. Miskitu Aisan",
    stepA3: "3. Técnica Grabamun",
    stepA4: "4. Taller Horarios",
    stepA5: "5. Alerta Walbia",
    stepA6: "6. Taller Práctico",
    stepA7: "7. Wahma Certifikamun",
    stepA8: "8. Lala Pain Cobramun",
    recordCapsule: "Microcápsula Técnica Grabamun",
    recordInstruction: "Botón pauni ba priskis aisan ba asistido grabamun dukiara.",
    scheduleWorkshop: "Taller Presencial Planimun (1-2 hrs)",
    validateStudent: "Aval Firmamun bara Certifikamun",
    masterWallet: "Billetera Comunal: Honorarios bara Regalías",

    // Apprentice flow
    apprenticeTitle: "Wahma Nani Lan Taki Bara Negocio Yabal",
    apprenticeSubtitle: "Oficio ancestral lan taks man tiempo ra, insumos baks bara QR pasaporte wal atis.",
    stepB1: "1. Oficio Wahbia",
    stepB2: "2. Offline Descargamun",
    stepB3: "3. Insumo Baks",
    stepB4: "4. Lan Takbia",
    stepB5: "5. Taller Reservamun",
    stepB6: "6. Pieza Daukbia",
    stepB7: "7. QR Pasaporte",
    stepB8: "8. Ati Yabal",
    downloadOfflineBtn: "Offline Módulo Descargamun",
    requestKitBtn: "Kit Insumos Baks (Fondo Comunal)",
    reserveWorkshopBtn: "Kukas Wal Taller Reservamun",
    generatePassportBtn: "QR Pasaporte & Insignia Sakan",

    // Council flow
    councilTitle: "Anciano Nani Kansl & Gobernanza",
    councilSubtitle: "Soberanía Cultural bara Wan Saberes Sakuan Ba Auditamun.",
    sacredLocker: "Bóveda Sagrada (Restringido)",
    openKnowledge: "Abierto Formativo (Público)",
    pendingDecision: "Revision Ra Ba",
    evaluateSaber: "Saber Ba Walbia",
    approveForPublic: "Aprobar & Aval Firmamun",
    moveToSacredLocker: "Bóveda Sagrada Ra Daukbia",
    communalFundTitle: "Komyuniti Fund Monitoreamun (5% Ati Lala)",

    // Marketplace & QR
    marketTitle: "Maket Ético, Turismo & QR Pasaporte",
    marketSubtitle: "Kumi kumi pieza nani ba kukas bara wahma stori ba aisi ba.",
    scanQRBtn: "QR Pasaporte Escaneamun",
    viewPassportDetails: "Pasaporte Digital Kaiki",
    verifiedAuthenticity: "Autenticidad Comunitaria Sello",
    priceBreakdown: "Lala Desglose (90% Komyuniti Ra)",
    buyEthicalPiece: "Pieza Ba Atis (Comercio Justo)",

    // Materials
    materialsTitle: "Pani Insumos Sostenibles",
    materialsSubtitle: "Tuno, Barro, Pita nani sakan lista.",
    requestMaterial: "Materia Prima Baks",

    // Impact & Rally
    impactTitle: "Impacto, Canvas Modelo & Rally 2026",
    impactSubtitle: "Propuesta ganadora IV Rally Nacional Nicaragua Innova 2026.",
    radarTitle: "Radar de Impacto Multidimensional",
    budgetTitle: "Presupuesto (C$ 206,000)",
    canvasTitle: "CANVAS Modelo Negocio",
    roadmapTitle: "12 Kati Plan"
  },

  my: {
    appName: "Herencia Pinolera",
    tagline: "Yabal kaupak asang kalcha kuring offline-first yamuk yangna",
    nav: {
      hub: "Kuring & Hub",
      artisan: "Kukas / Maestro",
      apprentice: "Joven Aprendiz",
      council: "Anciano Balna",
      market: "Maket & QR Yabal",
      materials: "Asang Insumos",
      impact: "Impacto & Rally"
    },
    audioGuide: "Yulna Guía",
    audioGuidePrompt: "Bocina kau clik yamunin man yulna kau yul ba walnin dukiara.",
    offlineMode: "Offline Mode",
    offlineActive: "100% Desconectado (Micro-Servidor Local)",
    onlineActive: "Online (Sincronizado)",
    syncNow: "Sincronizar Dataka",
    syncSuccess: "¡Sincronización P2P yamni takaskikan micro-servidor ra!",
    selectLanguage: "Yulna Wahnin",
    listenAudio: "Yulna ba walnin",
    recordAudio: "Yulna grabamunin",

    // Hub
    hubTitle: "Wan Saberes Ancestrales Klaki Saknin bara Lan Taknin",
    hubSubtitle: "Preservamun wan identidad Mayangna bara Nicaragüense dukiara.",
    statsSaberes: "Saberes Digitalizados",
    statsMaestros: "Maestros Sabios",
    statsAprendices: "Jóvenes Aprendices",
    statsTrazabilidad: "Piezas con Pasaporte QR",
    statsFondo: "Fondo Comunal",
    statsRetencion: "90% Retención Comunal",

    // Artisan flow
    artisanTitle: "Maestro & Anciano Balna Portal",
    artisanSubtitle: "Técnica grabamunin, taller planimunin bara wahma certifikamunin.",
    stepA1: "1. Registro Asistido",
    stepA2: "2. Mayangna Yulna",
    stepA3: "3. Técnica Grabamunin",
    stepA4: "4. Taller Horarios",
    stepA5: "5. Alerta Walnin",
    stepA6: "6. Taller Práctico",
    stepA7: "7. Wahma Aval Yamnin",
    stepA8: "8. Lala Cobramunin",
    recordCapsule: "Microcápsula Grabamunin",
    recordInstruction: "Botón pauni ba priskis yulna asistido grabamunin dukiara.",
    scheduleWorkshop: "Taller Presencial Planimunin",
    validateStudent: "Aval Firmamunin",
    masterWallet: "Billetera Comunal: Honorarios C$",

    // Apprentice flow
    apprenticeTitle: "Wahma Balna Lan Taknin bara Negocio",
    apprenticeSubtitle: "Tuno wauhtika bara oficio lan taknin, insumos baks bara atinin.",
    stepB1: "1. Oficio Wahnin",
    stepB2: "2. Offline Descargamunin",
    stepB3: "3. Insumo Baks",
    stepB4: "4. Lan Taknin",
    stepB5: "5. Taller Reservamunin",
    stepB6: "6. Pieza Yamnin",
    stepB7: "7. QR Pasaporte",
    stepB8: "8. Atinin Yabal",
    downloadOfflineBtn: "Offline Descargamunin",
    requestKitBtn: "Kit Insumos Baks",
    reserveWorkshopBtn: "Maestro Wal Taller Reservamunin",
    generatePassportBtn: "QR Pasaporte Saknin",

    // Council flow
    councilTitle: "Anciano Balna & GTI Sauni As",
    councilSubtitle: "Soberanía Cultural bara Kalcha Protegemunin.",
    sacredLocker: "Bóveda Sagrada (Restringido)",
    openKnowledge: "Abierto Formativo (Público)",
    pendingDecision: "Revision Ra Ba",
    evaluateSaber: "Saber Ba Kaiki",
    approveForPublic: "Aprobar & Aval Firmamunin",
    moveToSacredLocker: "Bóveda Sagrada Ra Daukba",
    communalFundTitle: "Komyuniti Fund Monitoreamunin",

    // Marketplace & QR
    marketTitle: "Maket Ético & Tuno QR Pasaporte",
    marketSubtitle: "Kumi kumi tunu pieza nani ba stori kumi kumi aisi ba.",
    scanQRBtn: "QR Pasaporte Escaneamunin",
    viewPassportDetails: "Pasaporte Digital Kaiki",
    verifiedAuthenticity: "Autenticidad Comunitaria",
    priceBreakdown: "Lala Desglose (90% Komyuniti Ra)",
    buyEthicalPiece: "Pieza Ba Atinin",

    // Materials
    materialsTitle: "Tuno & Asang Insumos",
    materialsSubtitle: "Corteza de Tuno, tintes achiote bara fibras.",
    requestMaterial: "Materia Prima Baks",

    // Impact & Rally
    impactTitle: "Impacto Multidimensional & Rally 2026",
    impactSubtitle: "Propuesta ganadora IV Rally Nacional Nicaragua Innova 2026.",
    radarTitle: "Radar de Impacto Multidimensional",
    budgetTitle: "Presupuesto (C$ 206,000)",
    canvasTitle: "CANVAS Modelo Negocio",
    roadmapTitle: "12 Kati Plan"
  },

  kr: {
    appName: "Herencia Pinolera",
    tagline: "Offline-First Tech Ecosystem fi Ansestal Craft & Fair Trade",
    nav: {
      hub: "Home & Hub",
      artisan: "Masta Artisan",
      apprentice: "Young Lernah",
      council: "Oul Piipl Kansl",
      market: "Ethical Market & QR",
      materials: "Raw Materials",
      impact: "Impact & Rally"
    },
    audioGuide: "Audio-Gaid Active",
    audioGuidePrompt: "Tap pan di speaker aikan fi hier di explanieshan in yuh langwij.",
    offlineMode: "Offline Mode",
    offlineActive: "100% Offline (Local Micro-Servah)",
    onlineActive: "Online (Sync Done)",
    syncNow: "Sync Data Now",
    syncSuccess: "¡P2P sync finish successfully wid di komyuniti servah!",
    selectLanguage: "Chuuze Langwij",
    listenAudio: "Lisin to di audio",
    recordAudio: "Rikord Audio / Mikrokapsyul",

    // Hub
    hubTitle: "Reskyu, Chrienin & Dijital Tracing fi Ansestal Nolej",
    hubSubtitle: "Savin wi inmatierial heritage and empawerin artisans inna Nicaragua widout needin internet.",
    statsSaberes: "Dijitalaiz Nolej",
    statsMaestros: "Wise Masta Artisans",
    statsAprendices: "Young Lernahs",
    statsTrazabilidad: "QR Dijital Paspuot",
    statsFondo: "Komyuniti Fond",
    statsRetencion: "90% Komyuniti Retenshan",

    // Artisan flow
    artisanTitle: "Masta Artisan & Nolej Kuipah Portal",
    artisanSubtitle: "Rikord step-by-step tekniks, set wokshap taim and satifai yuh lernahs wid vois asis.",
    stepA1: "1. Asisted Rejista",
    stepA2: "2. Nativ Langwij",
    stepA3: "3. Rikord Teknik",
    stepA4: "4. Wokshap Taim",
    stepA5: "5. Vois Alet",
    stepA6: "6. Praktis Seshan",
    stepA7: "7. Satifai Pickney",
    stepA8: "8. Wallet & Payout",
    recordCapsule: "Rikord Teknik Mikrokapsyul",
    recordInstruction: "Press di red botn fi staat vois-gaided rikuodin.",
    scheduleWorkshop: "Set In-Porson Wokshap (1-2 hrs)",
    validateStudent: "Sain Aval & Satifai Piis",
    masterWallet: "Komyuniti Wallet: Fees C$ & Royalties",

    // Apprentice flow
    apprenticeTitle: "Young Lernah Chrienin & Bizniz Paat",
    apprenticeSubtitle: "Laan ansestal kraft at yuh own pies, apply fi suplay kits, and sel wid dijital paspuot.",
    stepB1: "1. Pik Craft",
    stepB2: "2. Donlod Offline",
    stepB3: "3. Aplai fi Kit",
    stepB4: "4. Self Stody",
    stepB5: "5. Buk Wokshap",
    stepB6: "6. Mek Piis",
    stepB7: "7. QR Paspuot",
    stepB8: "8. Darek Siel",
    downloadOfflineBtn: "Donlod Offline Modul",
    requestKitBtn: "Aplai fi Raw Material Kit",
    reserveWorkshopBtn: "Buk Wokshap wid Masta",
    generatePassportBtn: "Jeneriet QR Paspuot & Baj",

    // Council flow
    councilTitle: "Komyuniti Kurieshan & Oul Piipl Kansl",
    councilSubtitle: "Kolchural Savrinti & Ansestal Nolej Auditin.",
    sacredLocker: "Siekred Vault (Restrik)",
    openKnowledge: "Oupn Nolej (Edyukieshanal)",
    pendingDecision: "Piyendin Reviu",
    evaluateSaber: "Audit Nolej Rekod",
    approveForPublic: "Apruuv & Sain Teknikaal Sheet",
    moveToSacredLocker: "Protekt in Siekred Vault",
    communalFundTitle: "Komyuniti Fond Monitrin (5% pan all siels)",

    // Marketplace & QR
    marketTitle: "Ethical Market, Kolchural Turizim & QR Paspuot",
    marketSubtitle: "Evry piis tel di stori of di masta, di lernah, and di sostienabl orijin.",
    scanQRBtn: "Skan QR Paspuot",
    viewPassportDetails: "Vyu Dijital Paspuot",
    verifiedAuthenticity: "Komyuniti Satifikieshan of Orijin",
    priceBreakdown: "Kliar Prais Desglose (90% to komyuniti)",
    buyEthicalPiece: "Bai Piis (Fiey Tred)",

    // Materials
    materialsTitle: "Sostienabl Raw Materials Dairektry",
    materialsSubtitle: "Lokal komyuniti suplayahs of Tuno, Klei, Pita and Wood.",
    requestMaterial: "Rikwest Material fi Wokshap",

    // Impact & Rally
    impactTitle: "Multidimenshanal Impact & Rally 2026",
    impactSubtitle: "Winin propouzal presented at di IV Rally Nacional Nicaragua Innova 2026.",
    radarTitle: "Multidimenshanal Impact Riedad",
    budgetTitle: "Ditield Bojet (C$ 206,000)",
    canvasTitle: "CANVAS Bizniz Model",
    roadmapTitle: "12-Mont Roadmap"
  }
};

if (typeof window !== 'undefined') {
  window.HP_TRANSLATIONS = HP_TRANSLATIONS;
}
