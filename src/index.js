const express = require("express");
const cors = require("cors");
const app = express();

const notesRouter = require("./router/notes.router");
const userRouter = require("./router/users.router");
const { auth } = require("./middlewares/auth");

require("dotenv").config();
require("./db");

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use("/api/notes", auth, notesRouter);
app.use("/api/users", userRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT} port`);
});
