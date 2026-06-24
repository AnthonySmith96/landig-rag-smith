migrate((app) => {
  let collection;
  try {
    collection = app.findCollectionByNameOrId("config_app");
  } catch {
    return;
  }

  const existingNames = {};
  for (const f of collection.fields) {
    existingNames[f.getName()] = true;
  }

  if (!existingNames["supported_languages"]) {
    collection.fields.add(new TextField({ name: "supported_languages", required: false }));
    app.save(collection);
  }

  try {
    const record = app.findFirstRecordByData("config_app", "key", "main");
    if (!record.getString("supported_languages")) {
      record.set("supported_languages", "Español");
      app.save(record);
    }
  } catch {
    // Ignore
  }
}, (app) => {
  try {
    const collection = app.findCollectionByNameOrId("config_app");
    collection.fields.removeByName("supported_languages");
    app.save(collection);
  } catch {
    // Ignore
  }
});
