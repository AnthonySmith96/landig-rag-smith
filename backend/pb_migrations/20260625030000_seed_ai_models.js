migrate((app) => {
  try {
    const record = app.findFirstRecordByData("config_app", "key", "main");
    let needsSave = false;
    
    if (!record.getString("active_provider")) {
      record.set("active_provider", "openrouter");
      needsSave = true;
    }
    if (!record.getString("active_model")) {
      record.set("active_model", "meta-llama/llama-3-8b-instruct");
      needsSave = true;
    }
    if (!record.getString("embedding_provider")) {
      record.set("embedding_provider", "openrouter");
      needsSave = true;
    }
    if (!record.getString("embedding_model")) {
      // Provide a valid embedding model for OpenRouter
      record.set("embedding_model", "openai/text-embedding-3-small");
      needsSave = true;
    }

    if (needsSave) {
      app.save(record);
    }
  } catch {
    // Config record may not exist yet
  }
}, (app) => {
  // We can't really revert a seed without knowing the previous state,
  // but if needed, we could set them back to empty strings.
  try {
    const record = app.findFirstRecordByData("config_app", "key", "main");
    record.set("active_provider", "");
    record.set("active_model", "");
    record.set("embedding_provider", "");
    record.set("embedding_model", "");
    app.save(record);
  } catch {
    // Ignore if record doesn't exist
  }
});
