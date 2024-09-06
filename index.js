const express = require("express");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
app.use(express.json());

app.use("/api", taskRoutes);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
