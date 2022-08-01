import express, { Express } from "express";
import cors from "cors";
import todoRoutes from "./Routes";
import db from "./Controllers/Users";
import LP from "./Controllers/LoginPage";
import bp from "body-parser";

const app: Express = express();

const PORT: string | number = process.env.PORT || 4000;

app.use(cors());
app.use(todoRoutes);
app.use(bp.json());
app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});
app.get("/users", db.getUsers);
app.get("/users/:id", db.getUserById);
app.put("/users/:id", db.updateUser);
app.delete("/users/:id", db.deleteUser);
app.post("/register", LP.postRegister);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`);
});
