import express, { Express } from "express";
import "dotenv/config";
import cors from "cors";
import todoRoutes from "./Routes";
import db from "./Controllers/Users";
import LP from "./Controllers/LoginPage";
import bp from "body-parser";
import auth from "./Middleware/auth";
import jwt from "jsonwebtoken";
import { pool } from "./Plagins/query";

const app: Express = express();
const tokenKey = process.env["TOKEN_KEY"];

const PORT: string | number = process.env.PORT || 4000;

app.use(cors());
app.use(todoRoutes);
app.use(bp.json());
// app.use((req, res, next) => {
//   if (req.headers.authorization && tokenKey) {
//     jwt.verify(req.headers.authorization.split(" ")[1], tokenKey, (err, payload) => {
//       if (err) next();
//       else if (payload && typeof payload !== "string" && payload.id) {
//         const user = pool.query("SELECT * FROM users WHERE id = $1", [payload.id]).then((r) => (req.user = r.rows[0]));
//       }
//     });
//   }
//   next();
// });

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});
app.get("/users", db.getUsers);
app.get("/users/:id", db.getUserById);
app.put("/users/:id", db.updateUser);
app.delete("/users/:id", db.deleteUser);
app.post("/register", LP.postRegister);
app.post("/login", LP.postLogin);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`);
});
