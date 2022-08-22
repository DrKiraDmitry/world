"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../Plagins/query");
const getUsers = (request, response) => {
    return query_1.pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};
const getUserById = (request, response) => {
    const id = parseInt(request.user.id);
    query_1.pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows[0]);
    });
};
const updateUser = (request, response) => {
    const id = parseInt(request.params.id);
    const { name, email } = request.body;
    query_1.pool.query("UPDATE users SET name = $1, email = $2 WHERE id = $3", [name, email, id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).send(`User modified with ID: ${id}`);
    });
};
const deleteUser = (request, response) => {
    const id = parseInt(request.params.id);
    query_1.pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).send(`User deleted with ID: ${id}`);
    });
};
exports.default = {
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
};
