migrate((app) => {
  let collection;
  try {
    collection = app.findCollectionByNameOrId("config_app");
  } catch {
    // config_app does not exist yet; initial migration should run first.
    return;
  }

  // Collect existing field names to avoid duplicates.
  const existingNames = {};
  try {
    for (const f of collection.fields) {
      existingNames[f.getName()] = true;
    }
  } catch {
    // Fall back: try iterating differently.
    try {
      const fieldsList = collection.fields;
      if (fieldsList && fieldsList.length) {
        for (let i = 0; i < fieldsList.length; i++) {
          existingNames[fieldsList[i].getName()] = true;
        }
      }
    } catch {
      // Cannot enumerate fields; proceed and let addField handle conflicts.
    }
  }

  const fieldsToAdd = [];

  if (!existingNames["contact_email"]) {
    fieldsToAdd.push(new TextField({ name: "contact_email", required: false }));
  }

  if (!existingNames["avatar"]) {
    fieldsToAdd.push(new FileField({
      name: "avatar",
      maxSelect: 1,
      maxSize: 2097152,
      mimeTypes: ["image/jpeg", "image/png", "image/webp"],
      thumbs: ["256x256"]
    }));
  }

  if (!existingNames["memory_max_summaries"]) {
    fieldsToAdd.push(new NumberField({ name: "memory_max_summaries", onlyInt: true }));
  }

  if (!existingNames["memory_summarize_every"]) {
    fieldsToAdd.push(new NumberField({ name: "memory_summarize_every", onlyInt: true }));
  }

  if (!existingNames["persona_name"]) {
    fieldsToAdd.push(new TextField({ name: "persona_name", required: false }));
  }

  if (fieldsToAdd.length > 0) {
    for (const field of fieldsToAdd) {
      collection.fields.add(field);
    }
    app.save(collection);
  }

  // Seed defaults into existing config record if present.
  try {
    const record = app.findFirstRecordByData("config_app", "key", "main");
    let needsSave = false;

    if (!record.getString("persona_name")) {
      record.set("persona_name", "Anthony");
      needsSave = true;
    }
    if (record.getFloat("memory_max_summaries") === 0) {
      record.set("memory_max_summaries", 3);
      needsSave = true;
    }
    if (record.getFloat("memory_summarize_every") === 0) {
      record.set("memory_summarize_every", 4);
      needsSave = true;
    }

    if (needsSave) {
      app.save(record);
    }
  } catch {
    // Config record may not exist yet.
  }
}, (app) => {
  // Down migration: remove added fields.
  try {
    const collection = app.findCollectionByNameOrId("config_app");
    const fieldsToRemove = ["contact_email", "avatar", "memory_max_summaries", "memory_summarize_every", "persona_name"];
    for (const fieldName of fieldsToRemove) {
      try {
        collection.fields.removeByName(fieldName);
      } catch {
        // Field may not exist.
      }
    }
    app.save(collection);
  } catch {
    // Collection may not exist.
  }
});
