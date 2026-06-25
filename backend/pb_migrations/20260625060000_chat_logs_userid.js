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

  if (!existingNames["user_id"]) {
    collection.fields.add(new TextField({ name: "user_id", required: false }));
    app.save(collection);
  }

  try {
    app.db().newQuery("CREATE INDEX IF NOT EXISTS idx_chat_logs_user_id ON chat_logs (user_id)").execute();
    app.db().newQuery("CREATE INDEX IF NOT EXISTS idx_chat_logs_user_id_created ON chat_logs (user_id, created)").execute();
  } catch (err) {
    // Indexes might already exist
  }
}, (app) => {
  try {
    app.db().newQuery("DROP INDEX IF EXISTS idx_chat_logs_user_id_created").execute();
    app.db().newQuery("DROP INDEX IF EXISTS idx_chat_logs_user_id").execute();
  } catch (err) {
    // Ignore
  }

  try {
    const collection = app.findCollectionByNameOrId("chat_logs");
    collection.fields.removeByName("user_id");
    app.save(collection);
  } catch {
    // Ignore
  }
});
