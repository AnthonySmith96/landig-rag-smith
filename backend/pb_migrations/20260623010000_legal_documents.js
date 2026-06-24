migrate((app) => {
  const collectionName = "legal_documents";
  
  // Create collection if missing
  try {
    app.findCollectionByNameOrId(collectionName);
  } catch {
    const collection = new Collection({
      type: "base",
      name: collectionName,
      listRule: "is_active = true",
      viewRule: "is_active = true",
      createRule: null,
      updateRule: null,
      deleteRule: null,
      fields: [
        {
          name: "key",
          type: "text",
          required: true
        },
        {
          name: "title",
          type: "text",
          required: true
        },
        {
          name: "content",
          type: "text",
          required: true
        },
        {
          name: "is_active",
          type: "bool",
          default: true
        },
        {
          name: "created",
          type: "autodate",
          onCreate: true,
          onUpdate: false
        },
        {
          name: "updated",
          type: "autodate",
          onCreate: true,
          onUpdate: true
        }
      ],
      indexes: [
        "CREATE UNIQUE INDEX idx_legal_documents_key ON legal_documents (key)"
      ]
    });
    app.save(collection);
  }

  // Seed data
  const collection = app.findCollectionByNameOrId(collectionName);

  const privacyContent = [
    "POLÍTICA DE PRIVACIDAD Y PROTECCIÓN DE DATOS PERSONALES",
    "",
    "1. Responsable del Tratamiento",
    "Anthony Smith Victoria Godínez y la marca CyberIndustree (en adelante, 'el Responsable'), con correo electrónico de contacto contact@anthonysmith.org, se comprometen a proteger la privacidad y los datos personales de los usuarios. Esta política describe cómo recopilamos, utilizamos y protegemos la información obtenida a través de anthonysmith.org y nuestros servicios SaaS asociados.",
    "",
    "2. Datos que Recopilamos",
    "- Datos de Contacto: Nombre y dirección de correo electrónico cuando el usuario solicita activamente información, propuestas comerciales o asistencia técnica.",
    "- Datos de Telemetría y Chat: Registros técnicos generados durante el uso de nuestro asistente de Inteligencia Artificial (chat_logs). Estos registros se utilizan exclusivamente para depuración, control de abuso y auditoría de seguridad del RAG. Las entradas de los usuarios son truncadas y anonimizadas para prevenir el almacenamiento involuntario de datos personales identificables (PII).",
    "- Retos de Seguridad: El token de Cloudflare Turnstile utilizado para validar la legitimidad de las solicitudes y prevenir actividades maliciosas (bots).",
    "",
    "3. Finalidad del Tratamiento",
    "Los datos personales recopilados se tratan para las siguientes finalidades:",
    "- Facilitar la interacción profesional con Anthony Smith y el soporte sobre el ecosistema CyberIndustree.",
    "- Optimizar el rendimiento y seguridad de la infraestructura y el chatbot.",
    "- Cumplir con requerimientos legales o de seguridad del servidor (VPS).",
    "",
    "4. Medidas de Seguridad y Privacidad en IA",
    "Nuestros asistentes conversacionales implementan políticas activas de prevención de fuga de información (PII Redaction) y filtrado de datos sensibles en el servidor. Nunca almacenamos llaves privadas (API Keys) ni credenciales de los usuarios en los registros conversacionales. Toda llamada a modelos de lenguaje (Groq, OpenRouter) se realiza mediante conexiones cifradas temporales.",
    "",
    "5. Ejercicio de Derechos ARCO",
    "Los usuarios pueden ejercer sus derechos de Acceso, Rectificación, Cancelación y Oposición (ARCO) enviando una solicitud formal por escrito a contact@anthonysmith.org. El Responsable responderá a las solicitudes legítimas en un plazo máximo establecido por la legislación aplicable.",
    "",
    "6. Actualizaciones",
    "Esta Política de Privacidad puede actualizarse periódicamente para reflejar cambios tecnológicos, mejoras en la seguridad o modificaciones operativas del ecosistema SaaS."
  ].join("\n");

  const termsContent = [
    "TÉRMINOS Y CONDICIONES DEL SERVICIO",
    "",
    "1. Aceptación de los Términos",
    "Al acceder y utilizar este sitio web y los recursos digitales asociados provistos por Anthony Smith y CyberIndustree, usted acepta de manera incondicional estos Términos del Servicio. Si no está de acuerdo con alguna sección de este documento, le solicitamos abstenerse de usar el sitio.",
    "",
    "2. Descripción del Servicio y Uso del Chatbot de IA",
    "El sitio web proporciona información sobre el portafolio profesional de Anthony Smith, guías técnicas, el ecosistema de productos de CyberIndustree (Escanfit, ContARM, Gomi, Menú Digital, Open-GuardIAn) y un asistente interactivo de IA para responder dudas en lenguaje natural. El chatbot se ofrece 'tal cual es' para propósitos informativos y de demostración técnica. El usuario se compromete a no realizar ataques de inyección de prompts ('jailbreaks'), consultas maliciosas ni saturar el servidor. Se aplican reglas estrictas de límite de peticiones (Rate Limit) por IP y/o sesión para evitar el abuso de los recursos de nuestro VPS.",
    "",
    "3. Propiedad Intelectual",
    "Todo el software, código fuente (incluidos hooks de PocketBase, lógica Angular, scripts de Rust), diseños, marcas, logotipos y contenidos de esta plataforma son propiedad exclusiva de Anthony Smith y CyberIndustree, o se utilizan bajo licencia. Queda estrictamente prohibida la reproducción, distribución o ingeniería inversa de los productos sin la autorización expresa y por escrito del autor.",
    "",
    "4. Limitación de Responsabilidad",
    "El Responsable realiza sus mejores esfuerzos para garantizar la disponibilidad y precisión del sitio y del asistente conversacional. Sin embargo, no se garantiza que la plataforma esté libre de errores técnicos o interrupciones del proveedor de LLM. Bajo ninguna circunstancia seremos responsables de daños directos, indirectos o incidentales resultantes del uso o la imposibilidad de uso del sitio web o de la información provista por la IA.",
    "",
    "5. Modificaciones del Servicio",
    "Nos reservamos el derecho de modificar, suspender o discontinuar cualquier sección del sitio web o sus herramientas digitales en cualquier momento, con el fin de optimizar el rendimiento de la infraestructura y el consumo de RAM/CPU de nuestro servidor local.",
    "",
    "6. Jurisdicción y Ley Aplicable",
    "Cualquier controversia relacionada con el uso de esta plataforma se resolverá bajo las leyes vigentes y ante los tribunales competentes en el Estado de Guanajuato, México."
  ].join("\n");

  const privacyData = {
    key: "privacy",
    title: "Política de Privacidad",
    content: privacyContent
  };

  const termsData = {
    key: "terms",
    title: "Términos del Servicio",
    content: termsContent
  };

  for (const item of [privacyData, termsData]) {
    let record;
    try {
      record = app.findFirstRecordByData(collectionName, "key", item.key);
    } catch {
      record = new Record(collection);
    }
    record.set("key", item.key);
    record.set("title", item.title);
    record.set("content", item.content);
    record.set("is_active", true);
    app.save(record);
  }
}, (app) => {
  try {
    const collection = app.findCollectionByNameOrId("legal_documents");
    app.delete(collection);
  } catch {
    // Already deleted
  }
});
