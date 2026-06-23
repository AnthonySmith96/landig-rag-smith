migrate((app) => {
  const kbRecords = [
    {
      slug: "biografia-datos-generales",
      intent: "datos_personales_biografia",
      title: "Datos Generales, Personales y Biografía de Anthony Smith",
      content: "Nombre Legal: Anthony Smith Victoria Godínez. Ubicación: Guanajuato, México. Profesional y emprendedor con enfoque en desarrollo de software, arquitectura de sistemas e inteligencia artificial. Su trayectoria está definida por una mentalidad de constructor autónomo, resiliencia y una fuerte autosuficiencia financiera y operativa que lo caracteriza como desarrollador full-stack.",
      tags: ["biografia", "datos-personales", "origen"],
      keywords: ["anthony smith", "victoria godinez", "residencia", "guanajuato"],
      priority: 10,
      source_url: ""
    },
    {
      slug: "educacion-academica",
      intent: "estudios_educacion",
      title: "Formación Académica y Estudios de Anthony Smith",
      content: "Anthony Smith es Licenciado en Sistemas de Información Administrativa por la Universidad de Guanajuato. Con el objetivo de profundizar en tecnología de vanguardia, es estudiante de la Maestría en Inteligencia Artificial en la UVEG (Universidad Virtual del Estado de Guanajuato), iniciando sus módulos formalmente el 1 de septiembre de 2025. Combina su base administrativa-sistemas con conocimientos avanzados de IA aplicada y analítica.",
      tags: ["educacion", "estudios", "universidad-de-guanajuato", "maestria", "ia"],
      keywords: ["licenciatura", "sistemas de informacion administrativa", "uveg", "maestria inteligencia artificial", "universidad de guanajuato"],
      priority: 8,
      source_url: ""
    },
    {
      slug: "perfil-psicologico-arquetipo",
      intent: "identidad_filosofia",
      title: "Identidad Profesional, Mentalidad Stark y Filosofía de Trabajo",
      content: "Anthony Smith posee una mentalidad orientada a la construcción, eficiencia y soberanía tecnológica (Arquetipo \"Stark\"). Se considera un \"Maker\" e inventor. Su filosofía de trabajo dicta que no delega la resolución de problemas técnicos complejos; prefiere ensuciarse las manos y entender la mecánica de fondo de las cosas. Detesta profundamente la ineficiencia y el software inflado (\"bloatware\"). Su propósito principal es potenciar a emprendedores mediante soluciones de software escalables y ligeras, lograr la independencia financiera y construir en público compartiendo sus experiencias reales. Como estrategia de marca personal, incorpora el humor de gimnasio (\"Gym Bros\", memes) como embudo de marketing para la captación de usuarios en ecosistemas tecnológicos.",
      tags: ["filosofia", "arquetipo-stark", "maker", "marca-personal", "gym-bro"],
      keywords: ["maker", "eficiencia", "bloatware", "construir en publico", "gym bro", "marketing", "soberania tecnologica", "arquetipo stark"],
      priority: 9,
      source_url: ""
    },
    {
      slug: "stack-tecnico-desarrollo",
      intent: "stack_tecnico_habilidades",
      title: "Stack Tecnológico y Habilidades de Desarrollo de Anthony Smith",
      content: "Anthony Smith es Arquitecto Frontend y Desarrollador Fullstack, especialista en optimizar rendimiento en entornos SaaS con recursos limitados. Su stack principal incluye:\n- Frontend: Angular (nivel experto, standalone components, Signals como paradigma principal), TypeScript, JavaScript, HTML5, CSS3, SCSS y TailwindCSS, con enfoque en interfaces ultra-fluidas, Glassmorphism y animaciones de alto rendimiento.\n- Backend y Base de Datos: PocketBase (CMS y backend principal con hooks Goja/JS y migraciones), Rust (seguridad y herramientas open source), Python, Django, SQLite y SQL tradicional.\n- Infraestructura y DevOps: Linux (Ubuntu Server), Nginx (caché y rate limiting), Caddy, Docker, Certbot (SSL), Git y GitHub.\n- IA y Análisis de Datos: Integración y despliegue de LLMs (Groq, OpenRouter, DeepSeek, Llama, GPT OSS), embeddings de OpenAI, búsqueda híbrida/RAG, automatización en Shell y Python, Data Studio, Power BI y Qlik View. Defiende el Open Source y la ejecución local y privada de modelos de IA.",
      tags: ["stack", "tecnologias", "angular", "pocketbase", "rust", "ia", "devops"],
      keywords: ["angular 22", "signals", "typescript", "pocketbase", "goja hooks", "rust", "nginx", "ubuntu vps", "rag", "embeddings", "groq", "openrouter", "sqlite"],
      priority: 10,
      source_url: ""
    },
    {
      slug: "trayectoria-sector-publico",
      intent: "experiencia_gobierno",
      title: "Experiencia Profesional y Logros en el Sector Público",
      content: "Anthony Smith se desempeña como Coordinador de Inteligencia Presupuestal / Coordinador de Análisis Prospectivo en la Dirección General de Presupuesto dentro de la Secretaría de Finanzas del Estado de Guanajuato. Opera con una mentalidad ágil tipo startup dentro del gobierno. Ha liderado y centralizado múltiples responsabilidades técnicas debido a la limitada capacidad de personal formal: diseño, desarrollo y mantenimiento de portales web de finanzas, backend, gobernanza de datos, soporte de infraestructura y herramientas internas para directivos y consulta ciudadana. Sus mayores hitos en gobierno incluyen la arquitectura del Portal de Presupuesto Abierto, la creación de Clarita Cuentas (IA conversacional ciudadana) y el desarrollo del sistema PASG 3.0 para mitigar la deuda técnica del estado.",
      tags: ["gobierno", "sector-publico", "secretaria-de-finanzas", "guanajuato", "presupuesto"],
      keywords: ["coordinador de analisis prospectivo", "inteligencia presupuestal", "secretaria de finanzas", "finanzas guanajuato", "gobierno abierto", "pasg 3.0", "presupuesto abierto"],
      priority: 9,
      source_url: ""
    },
    {
      slug: "cyberindustree-ecosistema",
      intent: "emprendimiento_cyberindustree",
      title: "CyberIndustree: Marca Matriz y Ecosistema de Productos",
      content: "CyberIndustree es la marca matriz y \"Venture Builder\" de Anthony Smith, bajo la cual desarrolla y distribuye su propio ecosistema de productos SaaS:\n1. Escanfit: SaaS para gestión de gimnasios y control de acceso, gratuito para gimnasios con monetización de extras (Coach IA, macros).\n2. ContARM: SaaS de administración y contabilidad para despachos y contadores independientes en México.\n3. Menú Digital: Solución de menús digitales QR marca blanca para restaurantes.\n4. Gomi (askgomi.com): IA privada de entretenimiento con humor sarcástico, cobros Stripe, OAuth y selector Fast/Smart/Legendary.\n5. Open-GuardIAn: Software Open Source en Rust para protección de privacidad de datos (PII) al interactuar con agentes de IA.",
      tags: ["cyberindustree", "saas", "productos", "emprendimiento"],
      keywords: ["cyberindustree", "escanfit", "contarm", "menu digital", "gomi", "open-guardian", "saas", "venture builder"],
      priority: 8,
      source_url: ""
    },
    {
      slug: "estilo-vida-hobbies",
      intent: "hobbies_estilo_vida",
      title: "Estilo de Vida, Rutina de Gimnasio y Hobbies de Anthony Smith",
      content: "Anthony Smith equilibra su vida profesional con una disciplina física rigurosa y hobbies prácticos:\n- Disciplina Física: Rutina estricta de gimnasio enfocada en hipertrofia y fuerza a las 5:30 AM (60 a 90 minutos diarios), registrando meticulosamente cargas y composición corporal.\n- Cultura Maker y Bricolaje: Construcción física en drywall (tablaroca) en su casa, mecánica automotriz resolutiva (reparación del sistema de bloqueo de su vehículo Ford) y diseño de un Go-Kart personalizado desde cero.\n- Agricultura y Botánica Urbana: Cultiva en altura árboles de guayaba, plantas de papa y suculentas.\n- Mototurismo: Apasionado del motociclismo de ruta (interés en KTM, Kawasaki, Bajaj) y viajes nacionales/internacionales exploratorios (Oaxaca, Tijuana, Colombia).\n- Cocina Técnica: Experimenta elaborando salsas (chimichurri), aderezos desde cero y alimentos proteicos vegetales.",
      tags: ["hobbies", "gimnasio", "maker", "motociclismo", "agricultura", "estilo-vida"],
      keywords: ["entrenamiento 5:30 am", "drywall", "go-kart", "mototurismo", "salsa chimichurri", "guayabas", "papas", "suculentas", "ktm", "kawasaki", "ford"],
      priority: 7,
      source_url: ""
    },
    {
      slug: "hitos-vida-viajes-premios",
      intent: "premios_hitos_vida",
      title: "Emprendimientos Tempranos, Viajes y Premios de Anthony Smith",
      content: "Desde joven, Anthony Smith mostró resiliencia y empaje operativo, trabajando como empacador de supermercado, vendedor de elotes, dulces y dando soporte técnico. Su primer gran éxito comercial fue SmithClean (jabones artesanales de sábila químicamente optimizados) con el cual financió su universidad y compró sus primeros autos, siendo galardonado con el premio \"Hecho Joven\" (Guanajoven 2019). Posteriormente fundó As-Card (tarjeta inteligente NFC/QR) ganando múltiples hackathones y los premios:\n- Rumbo a Japón (viaje exploratorio a Japón, 2019)\n- Premio SICES (viaje a Chicago, 2019)\n- 1° Lugar en Digitalización de Empresas (PYMERO / Konfío, 2021).\nEn pandemia fundó 'La Barra', un restaurante que creció a múltiples sucursales y cuya gestión automatizó antes de delegarlo y transferirlo para centrarse en software.",
      tags: ["hitos", "premios", "viajes", "smithclean", "as-card", "la-barra", "japon"],
      keywords: ["smithclean", "as-card", "la barra", "viaje a japon", "viaje a chicago", "konfio", "hecho joven", "hackathones"],
      priority: 8,
      source_url: ""
    },
    {
      slug: "filosofia-despliegue-servidores",
      intent: "infraestructura_despliegue",
      title: "Servidores, Infraestructura y Filosofía de Despliegue de Anthony Smith",
      content: "Anthony Smith aboga por un estilo de despliegue pragmático, quirúrgico y de bajo costo. Tiene amplia experiencia administrando VPS Linux (Ubuntu) con recursos limitados (ej. DigitalOcean, VPS de 6 USD mensuales). Su filosofía consiste en exprimir el hardware sin sobreingeniería: prefiere usar NginX/Caddy, Certbot, systemd y Cloudflare como proxy/seguridad. Para el chatbot, opta por SQLite y PocketBase con hooks Goja nativos, evitando servicios y contenedores adicionales (como Docker, ChromaDB o Python en backend) que consuman recursos innecesarios de RAM/CPU. Realiza despliegues quirúrgicos, actualizando solo los archivos necesarios y reiniciando servicios concretos en caliente.",
      tags: ["infraestructura", "servidores", "vps", "cloudflare", "pocketbase", "nginx"],
      keywords: ["digitalocean", "vps ubuntu", "certbot ssl", "caddy", "sqlite performance", "hooks goja", "despliegues quirurgicos", "bajo costo vps"],
      priority: 9,
      source_url: ""
    }
  ];

  const portfolioRecords = [
    {
      slug: "escanfit",
      project_name: "Escanfit",
      one_liner: "Plataforma SaaS (B2B2C) para la gestión integral de gimnasios y control de acceso.",
      description: "Modelo estratégico de captación de base de datos ofreciendo software gratuito para gimnasios y monetización mediante funcionalidades Premium para el usuario final (ej. Coach de IA, seguimiento de macros).",
      impact: "Facilita la digitalización masiva de gimnasios y permite monetizar mediante servicios premium integrados de IA para los atletas.",
      tech_stack: ["Angular", "PocketBase", "TypeScript", "TailwindCSS", "IA"],
      role: "Arquitecto de Software y Creador",
      url: "",
      repo_url: "",
      tags: ["saas", "gimnasios", "ia", "fitness"],
      keywords: ["escanfit", "gym", "macros", "control de acceso", "saas fitness"]
    },
    {
      slug: "contarm",
      project_name: "ContARM",
      one_liner: "SaaS especializado para firmas contables en México.",
      description: "Sistema contable y de administración para despachos y contadores independientes en México. Diseñado con Angular CSR en frontend, backend ligero con PocketBase, despliegue seguro con Nginx, Certbot y VPN de WireGuard.",
      impact: "Automatiza e incrementa la seguridad operativa de despachos contables en México.",
      tech_stack: ["Angular", "PocketBase", "Nginx", "Certbot", "WireGuard"],
      role: "Arquitecto y Desarrollador Fullstack",
      url: "",
      repo_url: "",
      tags: ["saas", "contabilidad", "finanzas", "seguridad"],
      keywords: ["contarm", "contadores", "mexico", "wireguard", "despachos contables"]
    },
    {
      slug: "menu-digital",
      project_name: "Menú Digital",
      one_liner: "Plataforma escalable 'White Label' para restaurantes.",
      description: "Plataforma de menú con código QR originada a partir del código base propietario desarrollado para el restaurante 'La Barra'. Permite la digitalización rápida del menú de restaurantes.",
      impact: "Digitalización ágil del menú físico, mejorando la experiencia del comensal y reduciendo costos operativos.",
      tech_stack: ["Angular", "PocketBase", "TypeScript", "TailwindCSS"],
      role: "Creador y Desarrollador",
      url: "",
      repo_url: "",
      tags: ["restaurantes", "menudigital", "qr", "whitelabel"],
      keywords: ["menu digital", "la barra", "qr", "restaurantes", "whitelabel"]
    },
    {
      slug: "gomi",
      project_name: "Gomi (askgomi.com)",
      one_liner: "Plataforma privada de IA enfocada en el entretenimiento.",
      description: "Funciona como un oráculo de humor sarcástico y 'brainrot' con memoria de contexto ultracorta (3 iteraciones) para latencia mínima. Implementa Angular SSR, PocketBase, Nginx, Cloudflare, systemd, Certbot y VPS en Ubuntu. Incluye cobros con Stripe, Google OAuth y selector de modos Fast/Smart/Legendary.",
      impact: "Generación de contenido viral y humor sarcástico en tiempo real con latencia mínima, monetizado vía Stripe.",
      tech_stack: ["Angular SSR", "PocketBase", "Nginx", "Cloudflare", "Stripe", "Google OAuth", "Groq", "OpenRouter"],
      role: "Creador y Desarrollador Único",
      url: "https://askgomi.com",
      repo_url: "",
      tags: ["entretenimiento", "ia", "chatbot", "saas"],
      keywords: ["gomi", "askgomi", "humor", "stripe", "brainrot", "groq", "openrouter"]
    },
    {
      slug: "open-guardian",
      project_name: "Open-GuardIAn",
      one_liner: "Proyecto Open Source en Rust para proteger a usuarios de agentes de IA.",
      description: "Herramienta de seguridad que ofrece funciones de prevención de borrado accidental y censura de PII (Datos Personales Identificables) para interactuar de forma segura con agentes inteligentes.",
      impact: "Proporciona una capa intermedia de seguridad para mitigar fugas de datos y acciones no deseadas de los LLMs.",
      tech_stack: ["Rust", "Security", "AI Safety", "PII Redaction"],
      role: "Creador y Desarrollador Principal",
      url: "",
      repo_url: "",
      tags: ["opensource", "seguridad", "rust", "ia"],
      keywords: ["open-guardian", "rust", "pii", "seguridad ia", "agentes"]
    },
    {
      slug: "as-card",
      project_name: "As-Card",
      one_liner: "Tarjeta de presentación inteligente NFC y QR.",
      description: "Primer gran salto tecnológico en la trayectoria de Anthony Smith. Un sistema de tarjetas inteligentes que permite compartir datos de contacto al instante. Ganador de múltiples hackathones.",
      impact: "Facilitó el networking empresarial inteligente y sentó las bases para futuros proyectos de hardware y software interconectados.",
      tech_stack: ["NFC", "QR Codes", "Web Technologies", "Hardware integration"],
      role: "Creador y Cofundador",
      url: "",
      repo_url: "",
      tags: ["hardware", "nfc", "networking", "iot"],
      keywords: ["as-card", "nfc", "tarjeta inteligente", "qr", "hackathon"]
    },
    {
      slug: "smithclean",
      project_name: "SmithClean",
      one_liner: "Negocio de manufactura y venta de jabón artesanal con fórmula química mejorada.",
      description: "Emprendimiento temprano de jabón artesanal mejorado químicamente a partir de sábila. Con las ganancias financió sus estudios universitarios en Sistemas de Información Administrativa y sus primeros autos. Ganador de 'Hecho Joven' (Guanajoven 2019).",
      impact: "Sustento de carrera profesional y demostración temprana de mentalidad emprendedora y de ejecución autónoma.",
      tech_stack: ["Chemistry", "Manufacturing", "Sales", "Business Operations"],
      role: "Fundador y Operador",
      url: "",
      repo_url: "",
      tags: ["emprendimiento", "quimica", "hechojoven", "sabila"],
      keywords: ["smithclean", "jabon", "guanajoven", "sabila", "hecho joven"]
    },
    {
      slug: "la-barra",
      project_name: "La Barra",
      one_liner: "Negocio gastronómico fundado en pandemia.",
      description: "Restaurante que creció a múltiples sucursales (Noria Alta, Valle de Santiago). Operación y sistemas de menús y cobros desarrollados internamente por Anthony, posteriormente delegado y transferido por completo para enfocarse en el desarrollo de software.",
      impact: "Inicio de la plataforma Menú Digital en momentos críticos de pandemia.",
      tech_stack: ["Business Operations", "Software Interno", "Gastronomía"],
      role: "Fundador y Desarrollador del Sistema",
      url: "",
      repo_url: "",
      tags: ["restaurantes", "pandemia", "operaciones"],
      keywords: ["la barra", "restaurante", "noria alta", "valle de santiago", "pandemia"]
    },
    {
      slug: "clarita-cuentas",
      project_name: "Clarita Cuentas",
      one_liner: "Chatbot de transparencia y participación ciudadana impulsado por IA.",
      description: "Asistente virtual del Portal de Presupuesto Abierto de Guanajuato. Traduce información presupuestaria compleja a lenguaje ciudadano, resolviendo dudas sobre ingresos, egresos, deuda, inversión y paquete fiscal. Diseñado con arquitectura RAG (Python, Flask, ChromaDB, MySQL, PocketBase).",
      impact: "Más de 49,000 interacciones y 7,800 usuarios en 2025. Redujo la brecha de transparencia y ganó reconocimiento regional en fichas de innovación.",
      tech_stack: ["Python", "Flask", "ChromaDB", "MySQL", "PocketBase", "RAG", "LLM", "Guanajuato"],
      role: "Arquitecto Técnico y Desarrollador",
      url: "https://presupuestoabierto.guanajuato.gob.mx",
      repo_url: "",
      tags: ["govtech", "transparencia", "ia", "rag", "gobierno"],
      keywords: ["clarita cuentas", "clarita", "presupuesto abierto", "finanzas guanajuato", "rag gobierno"]
    },
    {
      slug: "presupuesto-abierto-portal",
      project_name: "Portal de Presupuesto Abierto de Guanajuato",
      one_liner: "Portal público estatal de transparencia presupuestal.",
      description: "Optimización y despliegue del portal público de transparencia del Estado de Guanajuato. Soporta consultas masivas mediante servidores Linux configurados con NGINX y caché a nivel de servidor.",
      impact: "Estabilización de plataforma crítica de finanzas públicas estatales bajo alta concurrencia.",
      tech_stack: ["Linux", "NGINX", "DevOps", "Finanzas Públicas"],
      role: "Arquitecto Técnico de Infraestructura",
      url: "https://presupuestoabierto.guanajuato.gob.mx",
      repo_url: "",
      tags: ["govtech", "linux", "nginx", "optimizacion"],
      keywords: ["presupuesto abierto", "finanzas", "servidores", "nginx", "transparencia"]
    },
    {
      slug: "pasg-3-0",
      project_name: "PASG 3.0 (Plataforma de Auditoría y Seguimiento del Gasto)",
      one_liner: "Sistema estatal para la auditoría y seguimiento del gasto público de Guanajuato.",
      description: "Plataforma interna del gobierno estatal liderada y desarrollada técnicamente por Anthony Smith para eliminar la deuda técnica acumulada en la fiscalización del gasto público.",
      impact: "Eliminación de deuda técnica de sistemas estatales anteriores, agilizando los tiempos de auditoría presupuestal.",
      tech_stack: ["Sistemas Internos", "SQL", "TypeScript", "Angular"],
      role: "Líder Técnico y Desarrollador principal",
      url: "",
      repo_url: "",
      tags: ["govtech", "auditoria", "sistemas internos", "finanzas"],
      keywords: ["pasg", "auditoria del gasto", "finanzas guanajuato", "deuda tecnica"]
    },
    {
      slug: "chatdgp-v2",
      project_name: "ChatDGP V2 / ZINEG",
      one_liner: "Herramienta de análisis presupuestario inteligente para directivos y enlaces.",
      description: "Sistema interno de inteligencia presupuestal que permite consultas por tabla, búsqueda asistida de conceptos, catálogos, sinónimos y auditoría con SQLite. Ofrece respuestas en lenguaje natural y exportación a Excel.",
      impact: "Agiliza la toma de decisiones y el análisis de información financiera/presupuestaria de enlaces de gobierno.",
      tech_stack: ["SQLite", "Python", "RAG", "Excel Export", "Natural Language"],
      role: "Arquitecto e Implementador",
      url: "",
      repo_url: "",
      tags: ["ia", "sistemas internos", "finanzas", "analisis de datos"],
      keywords: ["chatdgp", "zineg", "auditoria", "directivos", "presupuesto"]
    }
  ];

  // Helper functions for normalization
  function safeString(value) {
    if (typeof value === "string") return value;
    if (value === null || value === undefined) return "";
    return String(value);
  }

  function normalizeText(value) {
    return safeString(value)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9@._:/\-\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function jsonTokens(value) {
    if (Array.isArray(value)) {
      return value.map(safeString).join(" ");
    }
    if (value && typeof value === "object") {
      return Object.keys(value).map((key) => safeString(value[key])).join(" ");
    }
    return "";
  }

  function joinParts(parts) {
    return parts.map(safeString).filter((part) => part.trim().length > 0).join("\n");
  }

  function buildKbSourceText(data) {
    return joinParts([
      data.intent,
      data.title,
      data.content,
      jsonTokens(data.tags),
      jsonTokens(data.keywords),
      data.source_url || ""
    ]);
  }

  function buildPortfolioSourceText(data) {
    return joinParts([
      data.project_name,
      data.one_liner,
      data.description,
      data.impact,
      data.role,
      jsonTokens(data.tech_stack),
      jsonTokens(data.tags),
      jsonTokens(data.keywords),
      data.url || ""
    ]);
  }

  // Seeding knowledge_base records
  const kbCollection = app.findCollectionByNameOrId("knowledge_base");
  for (const item of kbRecords) {
    let record;
    try {
      record = app.findFirstRecordByData("knowledge_base", "slug", item.slug);
    } catch {
      record = new Record(kbCollection);
    }

    const source = buildKbSourceText(item);
    const searchText = normalizeText(source);

    record.set("slug", item.slug);
    record.set("intent", item.intent);
    record.set("title", item.title);
    record.set("content", item.content);
    record.set("tags", item.tags);
    record.set("keywords", item.keywords);
    record.set("search_text", searchText);
    record.set("priority", item.priority);
    record.set("source_url", item.source_url);
    record.set("is_active", true);
    record.set("embedding_status", "pending");
    record.set("embedding", []);

    app.save(record);
  }

  // Seeding portfolio records
  const portfolioCollection = app.findCollectionByNameOrId("portfolio");
  for (const item of portfolioRecords) {
    let record;
    try {
      record = app.findFirstRecordByData("portfolio", "slug", item.slug);
    } catch {
      record = new Record(portfolioCollection);
    }

    const source = buildPortfolioSourceText(item);
    const searchText = normalizeText(source);

    record.set("slug", item.slug);
    record.set("project_name", item.project_name);
    record.set("one_liner", item.one_liner);
    record.set("description", item.description);
    record.set("impact", item.impact);
    record.set("tech_stack", item.tech_stack);
    record.set("role", item.role);
    record.set("url", item.url);
    record.set("repo_url", item.repo_url);
    record.set("tags", item.tags);
    record.set("keywords", item.keywords);
    record.set("search_text", searchText);
    record.set("is_active", true);
    record.set("embedding_status", "pending");
    record.set("embedding", []);

    app.save(record);
  }
}, (app) => {
  const kbSlugs = [
    "biografia-datos-generales",
    "educacion-academica",
    "perfil-psicologico-arquetipo",
    "stack-tecnico-desarrollo",
    "trayectoria-sector-publico",
    "cyberindustree-ecosistema",
    "estilo-vida-hobbies",
    "hitos-vida-viajes-premios",
    "filosofia-despliegue-servidores"
  ];

  const portfolioSlugs = [
    "escanfit",
    "contarm",
    "menu-digital",
    "gomi",
    "open-guardian",
    "as-card",
    "smithclean",
    "la-barra",
    "clarita-cuentas",
    "presupuesto-abierto-portal",
    "pasg-3-0",
    "chatdgp-v2"
  ];

  for (const slug of kbSlugs) {
    try {
      const record = app.findFirstRecordByData("knowledge_base", "slug", slug);
      app.delete(record);
    } catch {
      // Record not found or already deleted
    }
  }

  for (const slug of portfolioSlugs) {
    try {
      const record = app.findFirstRecordByData("portfolio", "slug", slug);
      app.delete(record);
    } catch {
      // Record not found or already deleted
    }
  }
});
