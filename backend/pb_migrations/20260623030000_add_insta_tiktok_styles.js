migrate((app) => {
  const collection = app.findCollectionByNameOrId("social_protocols");

  let field;
  try {
    if (collection.fields) {
      field = collection.fields.getByName("card_style");
    }
  } catch {
    // collection.fields is missing or getByName failed
  }

  if (!field) {
    try {
      if (collection.schema) {
        field = collection.schema.getFieldByName("card_style");
      }
    } catch {
      // collection.schema is missing or getFieldByName failed
    }
  }

  if (field) {
    if (field.options && field.options.values !== undefined) {
      field.options.values = ["youtube", "github", "linkedin", "x", "instagram", "tiktok", "standard"];
    } else {
      field.values = ["youtube", "github", "linkedin", "x", "instagram", "tiktok", "standard"];
    }
    app.save(collection);
  }
}, (app) => {
  const collection = app.findCollectionByNameOrId("social_protocols");

  let field;
  try {
    if (collection.fields) {
      field = collection.fields.getByName("card_style");
    }
  } catch {
    // fallback
  }

  if (!field) {
    try {
      if (collection.schema) {
        field = collection.schema.getFieldByName("card_style");
      }
    } catch {
      // fallback
    }
  }

  if (field) {
    if (field.options && field.options.values !== undefined) {
      field.options.values = ["youtube", "github", "linkedin", "x", "standard"];
    } else {
      field.values = ["youtube", "github", "linkedin", "x", "standard"];
    }
    app.save(collection);
  }
});
