"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const Routes_1 = __importDefault(require("./Routes"));
const Users_1 = __importDefault(require("./Controllers/Users"));
const LoginPage_1 = __importDefault(require("./Controllers/LoginPage"));
const body_parser_1 = __importDefault(require("body-parser"));
const auth_1 = require("./Middleware/auth");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
app.use((0, cors_1.default)());
app.use(Routes_1.default);
app.use(body_parser_1.default.json());
app.get("/", (request, response) => {
    response.json({ info: "Node.js, Express, and Postgres API" });
});
app.get("/users", Users_1.default.getUsers);
app.get("/user", auth_1.authenticateToken, Users_1.default.getUserById);
app.put("/users/:id", Users_1.default.updateUser);
app.delete("/users/:id", Users_1.default.deleteUser);
app.post("/register", LoginPage_1.default.postRegister);
app.post("/login", LoginPage_1.default.postLogin);
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}.`);
});
