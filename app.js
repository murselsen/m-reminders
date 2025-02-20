const express = require("express");
const app = express();
const port = 3000;
app.set("view engine", "ejs");

app.use("/public", express.static("public"));
app.use("/node", express.static("node_modules"));

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
