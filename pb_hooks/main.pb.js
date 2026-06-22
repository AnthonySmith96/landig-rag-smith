onRecordCreate((e) => {
  return require(`${__hooks}/_starklab_helpers.pb.js`).handleRecordCreate(e);
}, "knowledge_base", "reels", "portfolio");

onRecordUpdate((e) => {
  return require(`${__hooks}/_starklab_helpers.pb.js`).handleRecordUpdate(e);
}, "knowledge_base", "reels", "portfolio");

routerAdd("POST", "/api/custom/chat", (e) => {
  return require(`${__hooks}/_starklab_helpers.pb.js`).handleChat(e);
}, $apis.bodyLimit(4096));

routerAdd("POST", "/api/custom/reindex", (e) => {
  return require(`${__hooks}/_starklab_helpers.pb.js`).handleReindex(e);
}, $apis.requireSuperuserAuth(), $apis.bodyLimit(1024));

routerAdd("GET", "/{path...}", $apis.static("pb_public", true));
