"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const users_1 = __importDefault(require("./controllers/users"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
app.use((0, cors_1.default)());
app.use(routes_1.default);
app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' });
});
app.get('/users', users_1.default.getUsers);
app.get('/users/:id', users_1.default.getUserById);
app.post('/users', users_1.default.createUser);
app.put('/users/:id', users_1.default.updateUser);
app.delete('/users/:id', users_1.default.deleteUser);
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}.`);
});
