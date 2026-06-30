onRecordCreate((e) => {
  return require(`${__hooks}/_starklab_helpers.js`).handleRecordCreate(e);
}, "knowledge_base", "reels", "portfolio");

onRecordUpdate((e) => {
  return require(`${__hooks}/_starklab_helpers.js`).handleRecordUpdate(e);
}, "knowledge_base", "reels", "portfolio");

routerAdd("GET", "/api/custom/site-config", (e) => {
  return require(`${__hooks}/_starklab_helpers.js`).handleSiteConfig(e);
});

routerAdd("POST", "/api/custom/chat", (e) => {
  return require(`${__hooks}/_starklab_helpers.js`).handleChat(e);
}, $apis.bodyLimit(4096));

routerAdd("GET", "/api/custom/chat/history", (e) => {
  return require(`${__hooks}/_starklab_helpers.js`).handleChatHistory(e);
});

routerAdd("POST", "/api/custom/reindex", (e) => {
  return require(`${__hooks}/_starklab_helpers.js`).handleReindex(e);
}, $apis.requireSuperuserAuth(), $apis.bodyLimit(1024));

routerAdd("GET", "/{path...}", (e) => {
  const reqPath = e.request.url.path || "";
  if (reqPath.startsWith("/api/") || reqPath.startsWith("/_/")) {
    return e.notFoundError("Route not found");
  }
  // Serve static files from pb_public with SPA fallback (indexFallback=true)
  return $apis.static("pb_public", true)(e);
});
