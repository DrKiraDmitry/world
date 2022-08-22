"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokenKey = process.env["TOKEN_KEY"];
function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    if (authHeader == null)
        return res.sendStatus(401);
    jsonwebtoken_1.default.verify(authHeader, tokenKey, (err, user) => {
        console.log(err);
        if (err)
            return res.sendStatus(403);
        req.user = user;
        next();
    });
}
exports.authenticateToken = authenticateToken;
