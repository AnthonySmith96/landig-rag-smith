routerAdd("GET", "/api/custom/debug-logs", (c) => {
  const records = $app.findRecordsByFilter("chat_logs", "1=1", "-created", 5, 0);
  const logs = records.map(r => ({
    message: r.getString("user_message_truncated"),
    error: r.getString("error"),
    out: r.getBool("out_of_bounds")
  }));
  return c.json(200, logs);
});

