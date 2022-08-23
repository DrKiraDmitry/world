import express, { Express } from "express";
import "dotenv/config";
import cors from "cors";
import todoRoutes from "./Routes";
import db from "./Controllers/Users";
import LP from "./Controllers/LoginPage";
import bp from "body-parser";
import { authenticateToken } from "./Middleware/auth";
import { ThiefPageTypes } from "./Types/ThiefPageTypes";
import { getThiefPage } from "./Controllers/ThiefPage/ThiefPage";

const app: Express = express();

const PORT: string | number = process.env.PORT || 4000;

app.use(cors());
app.use(todoRoutes);
app.use(bp.json());

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});
app.get("/users", db.getUsers);
app.get("/user", authenticateToken, db.getUserById);
app.put("/users/:id", db.updateUser);
app.delete("/users/:id", db.deleteUser);
app.post("/register", LP.postRegister);
app.post("/login", LP.postLogin);

app.post<any, string, ThiefPageTypes>("/thief-page", getThiefPage);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`);
});
