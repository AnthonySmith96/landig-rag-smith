migrate((app) => {
  let collection;
  try {
    collection = app.findCollectionByNameOrId("config_app");
  } catch {
    return;
  }

  const existingNames = {};
  try {
    for (const f of collection.fields) {
      existingNames[f.getName()] = true;
    }
  } catch {
    try {
      const fieldsList = collection.fields;
      if (fieldsList && fieldsList.length) {
        for (let i = 0; i < fieldsList.length; i++) {
          existingNames[fieldsList[i].getName()] = true;
        }
      }
    } catch {}
  }

  const fieldsToAdd = [];
  const textFields = [
    { name: "brand_name", default: "Anthony Smith" },
    { name: "site_title", default: "Anthony Smith | Descifrando la arquitectura del mañana" },
    { name: "site_description", default: "Portafolio y asistente técnico de IA de Anthony Smith." },
    { name: "hero_line_1", default: "Diseñando" },
    { name: "hero_line_2", default: "el software" },
    { name: "hero_line_3", default: "del mañana" },
    { name: "hero_paragraph", default: "Experto en arquitectura e implementación de software empresarial potenciado por Inteligencia Artificial. Integración de chatbots, agentes autónomos y arquitecturas de alto rendimiento para desplegar ecosistemas escalables y eficientes." },
    { name: "cta_text", default: "Contrátame" },
    { name: "welcome_message", default: "¿Qué onda? Soy Anthony 👋 Pregúntame lo que quieras sobre tech, IA, desarrollo de software o los temas de mis reels." },
    { name: "chat_header", default: "Chat con Anthony" },
    { name: "footer_brand", default: "CyberIndustree" },
    { name: "footer_text", default: "Hecho con 🖤 por Cyberindustree" },
    { name: "contact_tagline", default: "Arquitectura técnica, sistemas Angular y productos con IA aplicada." },
    { name: "contact_cta", default: "Hablemos" }
  ];

  for (const t of textFields) {
    if (!existingNames[t.name]) {
      fieldsToAdd.push(new TextField({ name: t.name, required: false }));
    }
  }

  if (fieldsToAdd.length > 0) {
    for (const field of fieldsToAdd) {
      collection.fields.add(field);
    }
    app.save(collection);
  }

  // Seed defaults
  try {
    const record = app.findFirstRecordByData("config_app", "key", "main");
    let needsSave = false;
    for (const t of textFields) {
      if (!record.getString(t.name)) {
        record.set(t.name, t.default);
        needsSave = true;
      }
    }
    if (needsSave) {
      app.save(record);
    }
  } catch {}

}, (app) => {
  try {
    const collection = app.findCollectionByNameOrId("config_app");
    const fieldsToRemove = [
      "brand_name", "site_title", "site_description", "hero_line_1", "hero_line_2",
      "hero_line_3", "hero_paragraph", "cta_text", "welcome_message", "chat_header",
      "footer_brand", "footer_text", "contact_tagline", "contact_cta"
    ];
    for (const fieldName of fieldsToRemove) {
      try {
        collection.fields.removeByName(fieldName);
      } catch {}
    }
    app.save(collection);
  } catch {}
});
