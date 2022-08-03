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
Object.defineProperty(exports, "__esModule", { value: true });
const Users_1 = require("../Users");
const query_1 = require("../../Plagins/query");
const postRegister = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = request.body;
        if (!(email && password))
            return response.status(400).send("All input is required");
        const oldUser = yield (0, Users_1.getUserOneFoe)(email);
        console.log(email);
        if (Boolean(oldUser))
            return response.status(400).send("This user must be fuck");
        const newUser = yield query_1.pool
            .query("INSERT INTO users (email, password, created_at) VALUES ($1, $2, $3) RETURNING *", [
            email,
            password,
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
exports.default = {
    postRegister,
};
