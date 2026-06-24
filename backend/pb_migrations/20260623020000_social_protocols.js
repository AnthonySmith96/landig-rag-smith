migrate((app) => {
  const collectionName = "social_protocols";

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
          name: "title",
          type: "text",
          required: true
        },
        {
          name: "handle",
          type: "text",
          required: true
        },
        {
          name: "url",
          type: "url",
          required: true
        },
        {
          name: "icon",
          type: "text",
          required: true
        },
        {
          name: "card_style",
          type: "select",
          required: true,
          values: ["youtube", "github", "linkedin", "x", "standard"],
          maxSelect: 1
        },
        {
          name: "badge",
          type: "text",
          required: false
        },
        {
          name: "priority",
          type: "number",
          default: 0
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
        "CREATE INDEX idx_social_protocols_priority ON social_protocols (priority)"
      ]
    });
    app.save(collection);
  }

  // Seed data
  const collection = app.findCollectionByNameOrId(collectionName);

  const initialProtocols = [
    {
      title: "YouTube",
      handle: "@anthonysmith",
      url: "https://www.youtube.com/",
      icon: "smart_display",
      card_style: "youtube",
      badge: "",
      priority: 10
    },
    {
      title: "GitHub",
      handle: "github.com/cyberindustree",
      url: "https://github.com/cyberindustree",
      icon: "code",
      card_style: "github",
      badge: "Código abierto",
      priority: 20
    },
    {
      title: "LinkedIn",
      handle: "/in/anthonysmith",
      url: "https://www.linkedin.com/in/anthonysmith",
      icon: "work",
      card_style: "linkedin",
      badge: "",
      priority: 30
    },
    {
      title: "X (Twitter)",
      handle: "@anthonysmith",
      url: "https://x.com/anthonysmith",
      icon: "x",
      card_style: "x",
      badge: "",
      priority: 40
    }
  ];

  for (const item of initialProtocols) {
    let record;
    try {
      // Find existing by title to avoid duplication
      record = app.findFirstRecordByData(collectionName, "title", item.title);
    } catch {
      record = new Record(collection);
    }
    record.set("title", item.title);
    record.set("handle", item.handle);
    record.set("url", item.url);
    record.set("icon", item.icon);
    record.set("card_style", item.card_style);
    record.set("badge", item.badge);
    record.set("priority", item.priority);
    record.set("is_active", true);
    app.save(record);
  }
}, (app) => {
  try {
    const collection = app.findCollectionByNameOrId("social_protocols");
    app.delete(collection);
  } catch {
    // Already deleted
  }
});
