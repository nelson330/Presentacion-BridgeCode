/**
 * Herencia Pinolera - Database & Initial State
 * Ecosistema Tecnológico-Comunitario Offline-First
 * IV Rally Nacional de Innovación "Nicaragua Innova 2026"
 */

const HP_DATA = {
  projectInfo: {
    name: "Herencia Pinolera",
    tagline: "Ecosistema Tecnológico-Comunitario Offline-First para el Rescate, Formación y Trazabilidad de Saberes Tradicionales",
    edition: "IV Rally Nacional de Innovación Nicaragua Innova 2026",
    entities: ["Comisión Nacional de Economía Creativa", "CNU", "INATEC", "MIFIC", "MINJUVE", "SECN"],
    center: "Centro Tecnológico Ricardo Morales Avilés",
    category: "Innovación Tecnológica",
    team: [
      { name: "Nelson Uriel Anton Conrado", role: "Tutor / Mentor" },
      { name: "Jose Giovanny Ampiè Perez", role: "T.E. Programación - Marketing" },
      { name: "Josseling Tatiana Vargas Jarquin", role: "T.E. Programación - Marketing" },
      { name: "Eliab Nathanael Blas Ochoa", role: "T.E. Programación - Comunicador" },
      { name: "Madisson Elith Ureña Mojica", role: "T.E. Programación - Diseño Gráfico" }
    ]
  },

  languages: [
    { code: "es", name: "Español", flag: "🇳🇮", greeting: "¡Bienvenidos a Herencia Pinolera!", voiceText: "Bienvenido al portal comunitario de saberes ancestrales de Nicaragua." },
    { code: "mi", name: "Miskitu", flag: "🛶", greeting: "Yamni balna Herencia Pinolera ra!", voiceText: "Yamni balna. Wan yabal kaisa naha aisan wauhtaya ra wan kumi kumi wauhtika ba dukiara." },
    { code: "my", name: "Mayangna", flag: "🌿", greeting: "Pani balna yamni Herencia Pinolera kau!", voiceText: "Pani yamni. Kuring kaupak wan kalcha karang yangna dukiara." },
    { code: "kr", name: "Kriol", flag: "🌴", greeting: "Welkom to Herencia Pinolera!", voiceText: "Welkom tu wi komyuniti platform fi kip wi hancraft and ansestal nolej alaiv." }
  ],

  stats: {
    saberesDigitalizados: 48,
    artesanosMaestros: 32,
    jovenesAprendices: 145,
    piezasTrazadasQR: 680,
    fondoComunitarioAcumulado: 42850, // C$
    retencionComunalPorcentaje: 90, // %
    ahorroIntermediacion: 80 // % vs coyotaje
  },

  artisans: [
    {
      id: "art-1",
      name: "Don Santos López",
      age: 72,
      location: "San Juan de Oriente, Masaya",
      territory: "Pacífico Sur",
      trade: "Alfarería Precolombina & Bruñido",
      language: "Español / Lenguas del Pacífico",
      experience: "56 años",
      avatar: "assets/images/artisan_santos.svg",
      bio: "Maestro alfarero de tercera generación. Especialista en arcillas volcánicas, modelado en torno manual y técnica de bruñido con canto rodado precolombino.",
      specialty: "Cerámica policromada y barro negro ceremonial",
      modulesCount: 6,
      studentsCount: 38,
      rating: 4.95,
      phone: "+505 8823-1102",
      communityPledge: "Transmitir la técnica del bruñido para que el barro de nuestra tierra siga vivo en las manos de los jóvenes."
    },
    {
      id: "art-2",
      name: "Maestro Avelino Taylor",
      age: 74,
      location: "Territorio Mayangna Sauni As, Bonanza",
      territory: "Costa Caribe Norte (RACCN)",
      trade: "Artesanía en Tuno y Fibras del Bosque",
      language: "Mayangna / Miskitu / Español",
      experience: "60 años",
      avatar: "assets/images/artisan_avelino.svg",
      bio: "Sabio de la comunidad de Bonanza. Domina la extracción sostenible de la corteza del árbol de Tuno en el corazón de Bosawás, su macerado tradicional y teñido con raíces silvestres.",
      specialty: "Corteza de Tuno, tapices ceremoniales y bolsos",
      modulesCount: 5,
      studentsCount: 29,
      rating: 5.0,
      phone: "+505 8456-9901",
      communityPledge: "El árbol de Tuno nos da cobijo y vestido; enseñamos a cortarlo sin matar el árbol."
    },
    {
      id: "art-3",
      name: "Doña Miriam Gómez",
      age: 68,
      location: "Barrio Monimbó, Masaya",
      territory: "Pacífico Sur",
      trade: "Tejido de Hamacas & Tintes Naturales",
      language: "Español",
      experience: "50 años",
      avatar: "assets/images/artisan_miriam.svg",
      bio: "Guardiana del tejido en telar de cuatro cuadros y nudos de macramé monimboseño. Utiliza tinturas botánicas de sacuanjoche, jiquilite y achiote.",
      specialty: "Hamacas de hilo fino de algodón y henequén",
      modulesCount: 4,
      studentsCount: 42,
      rating: 4.92,
      phone: "+505 8912-3344",
      communityPledge: "Monimbó es corazón de fuego y manos tejedoras; ningún muchacho debe olvidar cómo hilar la paz."
    },
    {
      id: "art-4",
      name: "Maestra Deborah Hodgson",
      age: 65,
      location: "Punta Fría, Bluefields",
      territory: "Costa Caribe Sur (RACCS)",
      trade: "Cestería de Bambú & Herbolaria Kriol",
      language: "Kriol / Miskitu / Español",
      experience: "47 años",
      avatar: "assets/images/artisan_deborah.svg",
      bio: "Maestra de medicina ancestral afrocaribeña y cestería marina. Elabora canastas en tiras de bambú curado en agua salada y ungüentos de aceite de coco puro.",
      specialty: "Cestería marina y bálsamos botánicos curativos",
      modulesCount: 4,
      studentsCount: 26,
      rating: 4.88,
      phone: "+505 8677-4421",
      communityPledge: "Wi roots deh inna di bush an di sea. Wi teach di pickney fi rispek di herbs."
    }
  ],

  apprentices: [
    {
      id: "app-1",
      name: "Bryan Centeno",
      age: 19,
      location: "San Juan de Oriente, Masaya",
      mentorId: "art-1",
      mentorName: "Don Santos López",
      trade: "Alfarería Precolombina",
      progress: 90,
      status: "Certificado con Pasaporte QR",
      badge: "Maestro del Bruñido Volcánico 2026",
      kitStatus: "Entregado (Kit de Torno y Arcillas)",
      avatar: "assets/images/apprentice_bryan.svg",
      piecesCreated: 14,
      earningsTotal: 18450, // C$
      activeQuote: "Antes pensaba irme a la ciudad a trabajar en bodega. Ahora gano más creando arte en mi pueblo y la plataforma me paga el 75% directo sin coyotes."
    },
    {
      id: "app-2",
      name: "Kenel Taylor Coleman",
      age: 18,
      location: "Bonanza, Mayangna Sauni As",
      mentorId: "art-2",
      mentorName: "Maestro Avelino Taylor",
      trade: "Corteza de Tuno & Telas del Bosque",
      progress: 75,
      status: "Fase Práctica Avanzada",
      badge: "Guardián del Tuno de Bosawás",
      kitStatus: "Entregado (Mazo de Guayacán y Tintes)",
      avatar: "assets/images/apprentice_kenel.svg",
      piecesCreated: 8,
      earningsTotal: 12200,
      activeQuote: "Yangna tunu wauhtika yamuk yang. Aprendo en mi lengua Mayangna con los videos offline en la tablet comunal."
    },
    {
      id: "app-3",
      name: "Lucía Jarquín",
      age: 21,
      location: "Monimbó, Masaya",
      mentorId: "art-3",
      mentorName: "Doña Miriam Gómez",
      trade: "Tejido de Hamacas Monimbó",
      progress: 85,
      status: "Fase de Producción Final",
      badge: "Tejedora de Urdimbres de Paz",
      kitStatus: "Entregado (Bastidor y Carreteles)",
      avatar: "assets/images/apprentice_lucia.svg",
      piecesCreated: 11,
      earningsTotal: 15600,
      activeQuote: "El horario flexible me permite estudiar en la secundaria técnica y en las tardes tejer con doña Miriam."
    },
    {
      id: "app-4",
      name: "Shanice Campbell",
      age: 20,
      location: "Bluefields, RACCS",
      mentorId: "art-4",
      mentorName: "Maestra Deborah Hodgson",
      trade: "Herbolaria Ancestral & Cestería",
      progress: 95,
      status: "Graduada con Pasaporte QR",
      badge: "Curandera & Tejedora del Caribe",
      kitStatus: "Entregado (Mortero y Fibras)",
      avatar: "assets/images/apprentice_shanice.svg",
      piecesCreated: 19,
      earningsTotal: 19800,
      activeQuote: "Wi sell to eco-tourists with di QR code and they know exactly who made it and where the coconut oil came from."
    }
  ],

  courses: [
    {
      id: "course-1",
      title: "Alfarería y Bruñido Precolombino con Piedra de Río",
      trade: "Alfarería",
      artisanId: "art-1",
      artisanName: "Don Santos López",
      location: "San Juan de Oriente",
      difficulty: "Intermedio",
      duration: "4 Módulos Asíncronos + 2 Talleres Prácticos (3 hrs)",
      offlineSize: "42 MB (Videos, audios en Miskitu y Español)",
      languagesAvailable: ["Español", "Miskitu", "Mayangna"],
      councilApproved: true,
      description: "Aprende la extracción de arcilla volcánica, amasado ancestral sin burbujas, torneado manual a tracción y la técnica del bruñido espejo usando piedras de río sagradas.",
      lessons: [
        { id: "L1", title: "Módulo 1: Selección y colado del barro volcánico", duration: "12 min", audioVoice: "Explicación paso a paso de la mezcla de arcilla negra y barro rojo." },
        { id: "L2", title: "Módulo 2: Torno tradicional y vaciado de pieza", duration: "18 min", audioVoice: "Modelado manual con fuerza de pulgares y equilibrio rítmico." },
        { id: "L3", title: "Módulo 3: Aplicación de engobes minerales y secado a sombra", duration: "15 min", audioVoice: "Coloración natural con tierras de colores sin esmaltes plásticos." },
        { id: "L4", title: "Módulo 4: Bruñido milenario con canto rodado y quema de leña", duration: "22 min", audioVoice: "Pulido a mano hasta lograr el brillo cerámico tradicional." }
      ]
    },
    {
      id: "course-2",
      title: "Corteza de Tuno Ancestral: Del Árbol a la Tela Sagrada",
      trade: "Textilería & Fibras",
      artisanId: "art-2",
      artisanName: "Maestro Avelino Taylor",
      location: "Territorio Mayangna Sauni As",
      difficulty: "Avanzado",
      duration: "5 Módulos Asíncronos + 3 Talleres Prácticos",
      offlineSize: "38 MB (100% Offline con audio en Mayangna y Miskitu)",
      languagesAvailable: ["Mayangna", "Miskitu", "Español"],
      councilApproved: true,
      description: "Transmisión del saber milenario del pueblo Mayangna. Cosecha respetuosa de la corteza viva del árbol de Tuno, remojo en río de montaña y golpeado con mazo de guayacán hasta transformar la corteza en tela flexible.",
      lessons: [
        { id: "L21", title: "Módulo 1: Protocolo espiritual de permiso al bosque y corte", duration: "14 min", audioVoice: "Petición a los espíritus de la selva y corte perimetral sin dañar el cambium." },
        { id: "L22", title: "Módulo 2: Desprendimiento y lavado en agua corriente", duration: "16 min", audioVoice: "Lavado para eliminar la savia amarga y ablandar la fibra leñosa." },
        { id: "L23", title: "Módulo 3: El arte del mazo de madera pesada", duration: "25 min", audioVoice: "Golpeteo rítmico cruzado que expande la corteza al doble de su tamaño." },
        { id: "L24", title: "Módulo 4: Teñido con semillas de achiote y corteza de mangle", duration: "20 min", audioVoice: "Fijación orgánica con ceniza vegetal de río." }
      ]
    },
    {
      id: "course-3",
      title: "Tejido de Hamacas Monimboseñas en Nudo de Panal",
      trade: "Tejido Tradicional",
      artisanId: "art-3",
      artisanName: "Doña Miriam Gómez",
      location: "Monimbó, Masaya",
      difficulty: "Principiante a Intermedio",
      duration: "4 Módulos Asíncronos + 2 Talleres Prácticos",
      offlineSize: "34 MB",
      languagesAvailable: ["Español", "Kriol"],
      councilApproved: true,
      description: "Elaboración de urdimbre y nudos tradicionales de Monimbó. Montaje del bastidor de madera de cedro, espaciado de hilos y confección de la guarda decorativa con flecos trenzados.",
      lessons: [
        { id: "L31", title: "Módulo 1: Montaje del bastidor y cálculo de brazadas", duration: "10 min", audioVoice: "Medición en brazadas tradicionales para lograr el cuerpo de 2 metros." },
        { id: "L32", title: "Módulo 2: El nudo doble cruzado y tensión uniforme", duration: "20 min", audioVoice: "Técnica de muñeca para mantener los cuadros alineados sin pandeos." },
        { id: "L33", title: "Módulo 3: Confección de cabuyeras reforzadas", duration: "15 min", audioVoice: "Tejido de los extremos que resisten más de 200 kg de peso." }
      ]
    },
    {
      id: "course-4",
      title: "Herbolaria Ancestral y Bálsamos Botánicos del Caribe",
      trade: "Medicina Ancestral",
      artisanId: "art-4",
      artisanName: "Maestra Deborah Hodgson",
      location: "Bluefields",
      difficulty: "Intermedio",
      duration: "3 Módulos + 2 Prácticas de Laboratorio Comunal",
      offlineSize: "29 MB",
      languagesAvailable: ["Kriol", "Español", "Miskitu"],
      councilApproved: true,
      description: "Identificación de plantas curativas de la Costa Caribe: noni silvestre, zacate limón, gavilana, copal y maceración lenta en aceite de coco virgen prensado en frío.",
      lessons: [
        { id: "L41", title: "Módulo 1: Identificación y recolección lunar de hierbas", duration: "15 min", audioVoice: "Horas frescas de la mañana para cortar hojas con mayor concentración de aceites." },
        { id: "L42", title: "Módulo 2: Maceración al calor del sol caribeño", duration: "18 min", audioVoice: "Extracción lenta en frascos oscuros con resina de copal aromático." }
      ]
    }
  ],

  governanceRecords: [
    {
      id: "gov-1",
      title: "Canto Ritual del Sikro y Curación de Fiebre con Raíz de Bejuco",
      submittedBy: "Consejo de Curanderos de Waspam (Río Coco)",
      category: "Medicina Espiritual & Ritual",
      region: "Costa Caribe Norte",
      dateSubmitted: "2026-08-14",
      status: "RESTRICTED_SACRED",
      decisionDate: "2026-08-20",
      councilSignatures: ["Anciano Miskitu Wihta Carlos", "Socia Mayor Doña Elvia Poveda", "GTI Mayangna Sauni As"],
      reasoning: "Contiene invocaciones ceremoniales y fórmulas que pertenecen exclusivamente al linaje de ancianos curanderos. No debe comercializarse ni publicarse en canales turísticos abiertos para evitar apropiación indebida.",
      lockerTag: "BOVEDA_SAGRADA_RESTRINGIDA_001",
      icon: "🔒"
    },
    {
      id: "gov-2",
      title: "Técnica de Bruñido con Ágatas de Río y Arcilla Negra de San Juan",
      submittedBy: "Don Santos López (Tutor)",
      category: "Alfarería Tradicional",
      region: "Masaya",
      dateSubmitted: "2026-08-16",
      status: "APPROVED_OPEN",
      decisionDate: "2026-08-22",
      councilSignatures: ["Consejo de Ancianos de Monimbó", "Tutor Nelson Conrado", "Delegado INATEC Masaya"],
      reasoning: "Saber de dominio comunitario patrimonial apto para formación juvenil, replicación técnica y certificación en mercado justo con código QR.",
      lockerTag: "RUTA_OFICIAL_PUBLICA_HP_2026",
      icon: "✅"
    },
    {
      id: "gov-3",
      title: "Fórmula de Infusión Espiritual de Protección Chamánica",
      submittedBy: "Maestro Chamán Asang (Territorio Mayangna)",
      category: "Espiritualidad Ancestral",
      region: "Bonanza",
      dateSubmitted: "2026-08-23",
      status: "RESTRICTED_SACRED",
      decisionDate: "2026-08-26",
      councilSignatures: ["Consejo de Ancianos Asang", "GTI Mayangna"],
      reasoning: "Conocimiento reservado para ritos de paso y protección comunitaria en asamblea indígena. Restringido bajo bóveda criptográfica comunal.",
      lockerTag: "BOVEDA_SAGRADA_RESTRINGIDA_002",
      icon: "🔒"
    },
    {
      id: "gov-4",
      title: "Extracción y Macerado de Corteza de Tuno Sostenible",
      submittedBy: "Maestro Avelino Taylor",
      category: "Textiles Forestales",
      region: "Bonanza",
      dateSubmitted: "2026-08-18",
      status: "APPROVED_OPEN",
      decisionDate: "2026-08-24",
      councilSignatures: ["GTI Mayangna Sauni As", "Tutor Nelson Conrado", "Delegado CNEC"],
      reasoning: "Técnica artesanal sostenible que permite rescatar el uso del Tuno frente a plásticos sintéticos. Genera ingresos directos a las familias mayangnas.",
      lockerTag: "RUTA_OFICIAL_PUBLICA_HP_2026",
      icon: "✅"
    },
    {
      id: "gov-5",
      title: "Tintura Orgánica con Sacuanjoche y Cáscara de Jícaro",
      submittedBy: "Doña Miriam Gómez",
      category: "Tintes Botánicos",
      region: "Monimbó, Masaya",
      dateSubmitted: "2026-08-25",
      status: "PENDING_REVIEW",
      decisionDate: null,
      councilSignatures: [],
      reasoning: "En proceso de revisión por los mayores del Barrio Monimbó para verificar proporciones y aval de uso abierto.",
      lockerTag: "EN_REVISION_CONSEJO",
      icon: "⏳"
    }
  ],

  products: [
    {
      id: "prod-1",
      qrCode: "HP-NIC-2026-ALF-042",
      name: "Vasija Ceremonial Jaguar de Barro Negro Bruñido",
      category: "Alfarería Precolombina",
      price: 1850,
      priceUSD: 50.50,
      image: "assets/images/product_vasija.svg",
      location: "San Juan de Oriente, Masaya",
      masterArtisan: "Don Santos López (72 años)",
      masterId: "art-1",
      youngMaker: "Bryan Centeno (19 años)",
      apprenticeId: "app-1",
      rawMaterial: "100% Arcilla volcánica de cantera comunal y engobe de óxido férrico",
      sustainabilityBadge: "Materia Prima 100% Sostenible y Libre de Plomo",
      councilValidation: "Avalado por el Consejo de Mayores de San Juan de Oriente - Acta #2026-04",
      creationDate: "2026-08-20",
      description: "Vasija modelada a mano en torno de tracción y bruñida con cuarzo de río. Inspirada en la iconografía chorotega del jaguar solar. Acabado brillante natural sin barnices químicos.",
      splitBreakdown: {
        makerPercent: 75,
        makerAmount: 1387.50,
        masterPercent: 15,
        masterAmount: 277.50,
        communalFundPercent: 5,
        communalFundAmount: 92.50,
        pwaMaintenancePercent: 5,
        pwaMaintenanceAmount: 92.50
      },
      dimensions: "Alto: 26cm | Diámetro: 22cm | Peso: 1.8 kg",
      inStock: 4
    },
    {
      id: "prod-2",
      qrCode: "HP-NIC-2026-TUN-019",
      name: "Tapiz Ancestral de Corteza de Tuno 'Espíritu de Bosawás'",
      category: "Textiles Indígenas",
      price: 2450,
      priceUSD: 66.85,
      image: "assets/images/product_tuno.svg",
      location: "Territorio Mayangna Sauni As, Bonanza",
      masterArtisan: "Maestro Avelino Taylor (74 años)",
      masterId: "art-2",
      youngMaker: "Kenel Taylor Coleman (18 años)",
      apprenticeId: "app-2",
      rawMaterial: "Corteza de árbol de Tuno cosechada bajo plan de manejo forestal indígena y tintes de achiote",
      sustainabilityBadge: "Certificado de Bosque Vivo y Cosecha Sostenible",
      councilValidation: "Avalado por el Gobierno Territorial Indígena Mayangna Sauni As",
      creationDate: "2026-08-18",
      description: "Lienzo de fibra vegetal pura macerada a mano. Pintado con tintes naturales que representan los ríos y cerros sagrados de la reserva de la biosfera Bosawás.",
      splitBreakdown: {
        makerPercent: 75,
        makerAmount: 1837.50,
        masterPercent: 15,
        masterAmount: 367.50,
        communalFundPercent: 5,
        communalFundAmount: 122.50,
        pwaMaintenancePercent: 5,
        pwaMaintenanceAmount: 122.50
      },
      dimensions: "Largo: 90cm | Ancho: 55cm | Peso: 450 g",
      inStock: 6
    },
    {
      id: "prod-3",
      qrCode: "HP-NIC-2026-HAM-088",
      name: "Hamaca Matrimonial de Monimbó en Nudo de Panal y Sacuanjoche",
      category: "Tejido Artesanal",
      price: 3200,
      priceUSD: 87.30,
      image: "assets/images/product_hamaca.svg",
      location: "Barrio Monimbó, Masaya",
      masterArtisan: "Doña Miriam Gómez (68 años)",
      masterId: "art-3",
      youngMaker: "Lucía Jarquín (21 años)",
      apprenticeId: "app-3",
      rawMaterial: "Hilo de algodón peinado con tinte de sacuanjoche y maderas de cedro",
      sustainabilityBadge: "Comercio Justo y Relevo Generacional Comunitario",
      councilValidation: "Avalado por el Consejo Comunal Indígena de Monimbó",
      creationDate: "2026-08-22",
      description: "Hamaca tejida a mano con más de 12,000 cruces de hilo. Flecos decorativos con doble nudo festón y varillas de cedro talladas con motivos florales.",
      splitBreakdown: {
        makerPercent: 75,
        makerAmount: 2400.00,
        masterPercent: 15,
        masterAmount: 480.00,
        communalFundPercent: 5,
        communalFundAmount: 160.00,
        pwaMaintenancePercent: 5,
        pwaMaintenanceAmount: 160.00
      },
      dimensions: "Cuerpo: 2.40m x 1.60m | Resistencia: 240 kg",
      inStock: 3
    },
    {
      id: "prod-4",
      qrCode: "HP-NIC-2026-HER-105",
      name: "Cofre de Bálsamos y Cestería Marina Afrocaribeña",
      category: "Medicina & Cestería",
      price: 1350,
      priceUSD: 36.80,
      image: "assets/images/product_caribe.svg",
      location: "Punta Fría, Bluefields",
      masterArtisan: "Maestra Deborah Hodgson (65 años)",
      masterId: "art-4",
      youngMaker: "Shanice Campbell (20 años)",
      apprenticeId: "app-4",
      rawMaterial: "Bambú salinizado, aceite de coco virgen prensado en frío y cera de abeja melipona",
      sustainabilityBadge: "Ingredientes 100% Orgánicos y Cestería Marina Biodegradable",
      councilValidation: "Avalado por la Asociación de Curanderos y Artesanos de Bluefields",
      creationDate: "2026-08-25",
      description: "Canasta tejida en tiras de bambú que resguarda dos frascos de bálsamo regenerador de resina de copal y zacate limón. Alivia dolores musculares y aromatiza con esencia tropical.",
      splitBreakdown: {
        makerPercent: 75,
        makerAmount: 1012.50,
        masterPercent: 15,
        masterAmount: 202.50,
        communalFundPercent: 5,
        communalFundAmount: 67.50,
        pwaMaintenancePercent: 5,
        pwaMaintenanceAmount: 67.50
      },
      dimensions: "Cofre: 18x18x12cm | Contenido: 2x 120ml",
      inStock: 8
    }
  ],

  rawMaterialsDirectory: [
    {
      id: "mat-1",
      name: "Corteza de Árbol de Tuno (Poulsenia armata)",
      producerGroup: "Cooperativa Indígena Forestal Mayangna Sauni As",
      region: "Bonanza, Reserva Bosawás",
      pricePerUnit: "C$ 180.00 / vara (3 metros)",
      stockAvailable: "240 varas",
      sustainabilityStatus: "Cosecha rotativa certificada por asamblea comunal",
      applications: "Tapices, carteras, sombreros, lienzos artísticos"
    },
    {
      id: "mat-2",
      name: "Arcilla Roja y Negra de Cantera Volcánica",
      producerGroup: "Comité de Minería Artesanal de San Juan de Oriente",
      region: "Cerro La Barranca, Masaya",
      pricePerUnit: "C$ 250.00 / quintal colado",
      stockAvailable: "85 quintales",
      sustainabilityStatus: "Extracción manual sin maquinaria pesada ni dinamita",
      applications: "Alfarería, jarrones, platos ceremoniales, esculturas"
    },
    {
      id: "mat-3",
      name: "Fibra de Henequén y Pita Silvestre",
      producerGroup: "Asociación de Mujeres Extractoras de Pita de Monimbó",
      region: "Masaya y Carazo",
      pricePerUnit: "C$ 120.00 / libra peinada",
      stockAvailable: "150 libras",
      sustainabilityStatus: "Cultivo agroecológico de cercas vivas",
      applications: "Hamacas, cordelería, alforjas, calzado artesanal"
    },
    {
      id: "mat-4",
      name: "Tintes Botánicos: Añil, Achiote y Jiquilite",
      producerGroup: "Red de Huertos Botánicos Ancestrales de Rivas y Masaya",
      region: "Pacífico de Nicaragua",
      pricePerUnit: "C$ 95.00 / frasco de 250g en pasta",
      stockAvailable: "60 frascos",
      sustainabilityStatus: "100% Biodegradable, fijación con ceniza de roble",
      applications: "Teñido textil, pintura en tuno, pátinas en cerámica"
    }
  ],

  budgetTable: [
    {
      item: 1,
      description: "Tablets reforzadas para Facilitadores Territoriales",
      unit: "Equipo",
      quantity: 4,
      unitPrice: 9150.00,
      total: 36600.00,
      category: "Equipamiento y Hardware"
    },
    {
      item: 2,
      description: "Micro-Servidores Locales Portátiles (Raspberry Pi 5)",
      unit: "Unidad",
      quantity: 4,
      unitPrice: 4575.00,
      total: 18300.00,
      category: "Equipamiento y Hardware"
    },
    {
      item: 3,
      description: "Kits de Materia Prima e Insumos para Aprendices",
      unit: "Kit",
      quantity: 30,
      unitPrice: 1200.00,
      total: 36000.00,
      category: "Insumos y Formación"
    },
    {
      item: 4,
      description: "Honorarios Docentes a Maestros Artesanos",
      unit: "Módulo",
      quantity: 50,
      unitPrice: 800.00,
      total: 40000.00,
      category: "Insumos y Formación"
    },
    {
      item: 5,
      description: "Estipendios para Facilitadores y Traductores",
      unit: "Mes",
      quantity: 4,
      unitPrice: 7500.00,
      total: 30000.00,
      category: "Facilitación y Validación Ética"
    },
    {
      item: 6,
      description: "Impresión de Pasaportes y Etiquetas QR inalterables",
      unit: "Millar",
      quantity: 3,
      unitPrice: 2200.00,
      total: 6600.00,
      category: "Trazabilidad y Sostenibilidad"
    },
    {
      item: 7,
      description: "Infraestructura Cloud, Hosting y Dominio",
      unit: "Anual",
      quantity: 1,
      unitPrice: 11500.00,
      total: 11500.00,
      category: "Tecnología y Cloud"
    },
    {
      item: 8,
      description: "Logística de Talleres y Asambleas Comunitarias",
      unit: "Taller",
      quantity: 4,
      unitPrice: 4500.00,
      total: 18000.00,
      category: "Logística Comunitaria"
    },
    {
      item: 9,
      description: "Fondo de Imprevistos y Contingencias",
      unit: "Global",
      quantity: 1,
      unitPrice: 9000.00,
      total: 9000.00,
      category: "Contingencias"
    }
  ],

  canvasModel: {
    sociosClave: [
      "Instituciones Estatales: SECN, INATEC, CNEC, MINJUVE, MIFIC",
      "Gobiernos Territoriales Indígenas: RACCN / RACCS (Mayangna Sauni As, GTI)",
      "Autoridades Tradicionales: Consejos de Ancianos de Monimbó, San Juan de Oriente y Costa Caribe",
      "Sector Privado: Cadenas hoteleras ecológicas, exportadores éticos y compradores corporativos RSE"
    ],
    actividadesClave: [
      "Digitalización asistida en territorio con facilitadores",
      "Curaduría ética y filtro sagrado vs abierto con Consejos de Ancianos",
      "Traducción y locución en 4 lenguas (Miskitu, Mayangna, Kriol, Español)",
      "Trazabilidad y emisión de Pasaportes Digitales QR inalterables",
      "Acompañamiento a talleres prácticos de 1 a 2 horas"
    ],
    propuestaValor: [
      "Salvaguarda Cultural: Rescate digital de saberes orales en peligro de extinción",
      "Formación Inclusiva: Pedagogía híbrida asíncrona modular 100% offline-first",
      "Comercio Justo: Retención directa del 90% del valor en la comunidad",
      "Soberanía Indígena: Matriz de protección estricta para conocimientos sagrados"
    ],
    relacionesClientes: [
      "Acompañamiento comunitario y validación en asambleas",
      "Transparencia radical con desglose de precios en el Pasaporte QR",
      "Vínculo intergeneracional activo entre abuelos y jóvenes",
      "Impacto ético comprobado para compradores corporativos"
    ],
    segmentoClientes: [
      "Beneficiarios Directos: +30,000 familias artesanas y jóvenes aprendices rurales",
      "Compradores Éticos: Turistas culturales, coleccionistas de arte nacional",
      "Mercado Corporativo / RSE: Regalos institucionales y eventos con valor social",
      "Sector Exportación: Cadenas de comercio justo en Norteamérica y Europa"
    ],
    recursosClave: [
      "Maestros artesanos sabios y facilitadores bilingües territoriales",
      "Arquitectura PWA Offline-First con micro-servidores Raspberry Pi 5",
      "Kits de insumos y tablets reforzadas para registro en campo",
      "Bóveda sagrada comunal e infraestructura de firma digital"
    ],
    canales: [
      "PWA Offline-First accesible en teléfonos y tablets sin conexión",
      "Centros Comunitarios y Casas de Cultura Locales",
      "Pasaportes Digitales QR adheridos físicamente a cada pieza",
      "Ferias territoriales de Economía Creativa y ecoturismo"
    ],
    estructuraCostos: [
      "Equipamiento y Servidores Locales: C$ 54,900.00",
      "Kits de Insumos y Honorarios Formativos: C$ 76,000.00",
      "Facilitación Bilingüe y Validación Ética: C$ 48,000.00",
      "Sostenibilidad, Cloud y Logística: C$ 27,100.00",
      "Total Inversión Inicial: C$ 206,000.00"
    ],
    fuentesIngresos: [
      "Retención Directa al Artesano y Joven Aprendiz (90% del valor final)",
      "Fondo Rotatorio Comunitario (5-7% por pieza para insumos y becas)",
      "Tarifa de Sostenibilidad de Infraestructura PWA (3-5%)",
      "Servicios B2B / Catálogo Corporativo RSE con trazabilidad personalizada",
      "Fondos Concursables y Fomento de la Economía Creativa"
    ]
  },

  implementationRoadmap: [
    {
      phase: "ETAPA 1 (M1 - M3)",
      title: "Diagnóstico y Curaduría Territorial",
      description: "Mapeo etnográfico en Pacífico y Costa Caribe. Asambleas comunitarias con Consejos de Ancianos. Definición de matriz sagrado vs abierto.",
      deliverables: ["Padrón de 30 maestros sabios", "Primeras 15 microcápsulas grabadas", "Firma de acuerdos de custodia comunitaria"]
    },
    {
      phase: "ETAPA 2 (M4 - M6)",
      title: "Desarrollo PWA y Despliegue de Servidores Locales",
      description: "Programación PWA Offline-First con Service Workers e IndexedDB. Traducción a Miskitu, Mayangna y Kriol. Configuración de 4 Raspberry Pi 5.",
      deliverables: ["PWA funcional con motor de audio multilingüe", "Generador de Pasaporte QR", "4 micro-servidores portátiles activos"]
    },
    {
      phase: "ETAPA 3 (M7 - M9)",
      title: "Piloto Comunitario y Primera Generación",
      description: "Despliegue en 4 comunidades piloto (Masaya, San Juan de Oriente, Bonanza, Bluefields). Formación de 30 aprendices con kits de insumos.",
      deliverables: ["30 jóvenes graduados con insignia digital", "150 piezas certificadas con QR", "Primeras ventas en mercado ético"]
    },
    {
      phase: "ETAPA 4 (M10 - M12)",
      title: "Escalamiento y Sostenibilidad Autosuficiente",
      description: "Activación plena del Fondo Rotatorio Comunal. Transferencia técnica a centros INATEC y consolidación del canal corporativo y turístico.",
      deliverables: ["+100 aprendices activos", "Autosuficiencia financiera del fondo comunal", "90% retención del margen en creadores"]
    }
  ]
};

if (typeof window !== 'undefined') {
  window.HP_DATA = HP_DATA;
}
