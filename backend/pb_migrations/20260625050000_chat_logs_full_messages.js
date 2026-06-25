migrate((app) => {
  let collection;
  try {
    collection = app.findCollectionByNameOrId("chat_logs");
  } catch {
    return;
  }

  const existingNames = {};
  for (const f of collection.fields) {
    existingNames[f.getName()] = true;
  }

  if (!existingNames["user_message"]) {
    collection.fields.add(new TextField({ name: "user_message", required: false }));
  }
  
  if (!existingNames["assistant_response"]) {
    collection.fields.add(new TextField({ name: "assistant_response", required: false }));
  }

  app.save(collection);
}, (app) => {
  try {
    const collection = app.findCollectionByNameOrId("chat_logs");
    collection.fields.removeByName("user_message");
    collection.fields.removeByName("assistant_response");
    app.save(collection);
  } catch {
    // Ignore
  }
});
