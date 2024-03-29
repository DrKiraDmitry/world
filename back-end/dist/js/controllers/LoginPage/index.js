"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../Plagins/query");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserOneFoe = (email) => {
    return query_1.pool
        .query("SELECT * FROM users WHERE email = $1", [email])
        .then((r) => r.rows.length > 0)
        .catch((e) => console.log(e));
};
const UserOneRegister = (email) => {
    return query_1.pool
        .query("SELECT * FROM users WHERE email = $1", [email])
        .then((r) => (r.rows.length > 0 ? r.rows[0] : null))
        .catch((e) => console.log(e));
};
const postRegister = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = request.body;
        if (!(email && password))
            return response.status(400).send("All input is required");
        const oldUser = yield UserOneFoe(email);
        if (Boolean(oldUser))
            return response.status(400).send("This user must be fuck");
        const encryptPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = yield query_1.pool
            .query("INSERT INTO users (email, password, created_at) VALUES ($1, $2, $3) RETURNING *", [
            email,
            encryptPassword,
            new Date(),
        ])
            .then((r) => r.rows[0])
            .catch((e) => console.log(e));
        response.status(201).json(newUser);
    }
    catch (e) {
        console.log(e);
    }
});
const postLogin = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = request.body;
        if (!(email && password))
            return response.status(400).send("All input is required");
        const user = yield UserOneRegister(email);
        if (!user)
            return response.status(400).send("Unknown");
        if (!process.env["TOKEN_KEY"])
            return response.status(400).send("Bad token");
        if (!(yield bcrypt_1.default.compare(password, user.password)))
            return response.status(400).send("Password not equal");
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.TOKEN_KEY, {
            expiresIn: "7d",
        });
        return response.status(200).json({ id: user.id, email: user.email, token });
    }
    catch (e) {
        console.log(e);
        return response.status(404).json({ message: "User not found" });
    }
});
exports.default = {
    postRegister,
    postLogin,
};
