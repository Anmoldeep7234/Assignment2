const express = require("express");
const path = require("path");
const LegoData = require("./modules/legoSets");
// Express app
const app = express();
// instance of legoSet
const legoData = new LegoData();


const HTTP_PORT = process.env.PORT || 8080;

app.use(express.static("views"));

// Route: Home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "home.html"));
});

// Route: About page
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "about.html"));
});
// Route:Get all sets or sets by theme
app.get("/lego/sets", async (req, res) => {
  try {
    const theme = req.query.theme;
    const sets = theme
      ? await legoData.getSetsByTheme(theme)
      : await legoData.getAllSets();
    res.json(sets);
  } catch (err) {
    res.status(404).json({ error: err.toString() });
  }
});

// Route: Get set by set_num
app.get("/lego/sets/:set_num", async (req, res) => {
  try {
    const set = await legoData.getSetByNum(req.params.set_num);
    res.json(set);
  } catch (err) {
    res.status(404).json({ error: err.toString() });
  }
});

// Custom 404 route
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

//  start server
(async () => {
  try {
    await legoData.initialize();
    app.listen(HTTP_PORT, () => {
      console.log(`Server running at http://localhost:${HTTP_PORT}`);
    });
  } catch (err) {
    console.error("Failed to initialize Lego data:", err);
  }
})();