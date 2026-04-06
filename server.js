const app = require("./app");
const initDb = require("./models/initDb");

const PORT = 3000;

initDb();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
