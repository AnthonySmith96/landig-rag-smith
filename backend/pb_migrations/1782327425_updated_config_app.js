/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_681517392")

  // update field
  collection.fields.addAt(22, new Field({
    "help": "",
    "hidden": false,
    "id": "file376926767",
    "maxSelect": 1,
    "maxSize": 971528,
    "mimeTypes": [
      "image/jpeg",
      "image/png",
      "image/webp"
    ],
    "name": "avatar",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": [
      "256x256"
    ],
    "type": "file"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_681517392")

  // update field
  collection.fields.addAt(22, new Field({
    "help": "",
    "hidden": false,
    "id": "file376926767",
    "maxSelect": 1,
    "maxSize": 2097152,
    "mimeTypes": [
      "image/jpeg",
      "image/png",
      "image/webp"
    ],
    "name": "avatar",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": [
      "256x256"
    ],
    "type": "file"
  }))

  return app.save(collection)
})
