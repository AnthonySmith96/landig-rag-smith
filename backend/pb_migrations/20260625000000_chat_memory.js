migrate((app) => {
  try {
    app.findCollectionByNameOrId("chat_memory");
    return;
  } catch {
    // Collection does not exist, create below.
  }

  const collection = new Collection({
    type: "base",
    name: "chat_memory",
    listRule: null,
    viewRule: null,
    createRule: null,
    updateRule: null,
    deleteRule: null,
    fields: [
      {
        name: "user_id",
        type: "text",
        required: true
      },
      {
        name: "summary",
        type: "text",
        required: true
      },
      {
        name: "turn_count",
        type: "number",
        onlyInt: true,
        min: null,
        max: null,
        default: 0
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
      "CREATE INDEX idx_chat_memory_user_created ON chat_memory (user_id, created)",
      "CREATE INDEX idx_chat_memory_user_id ON chat_memory (user_id)"
    ]
  });

  app.save(collection);
}, (app) => {
  try {
    app.delete(app.findCollectionByNameOrId("chat_memory"));
  } catch {
    // Collection was not created by this migration.
  }
});
