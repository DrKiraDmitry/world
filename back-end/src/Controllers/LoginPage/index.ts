import { Response, Request } from "express";
import { getUserOneFoe } from "../Users";
import Users from "../Users";
import { pool } from "../../Plagins/query";

interface RegisterType {
  email: string;
  password: string;
}

const postRegister = async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body as RegisterType;
    if (!(email && password)) response.status(400).send("All input is required");
    const oldUser = getUserOneFoe(email);
    if (Boolean(oldUser)) response.status(400).send("This user must be fuck");
    const newUser = await pool.query(
      "INSERT INTO users (email, password, createdAt) VALUES ($1, $2, $3) RETURNING *",
      [email, password, new Date()],
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(201).send(`User added with ID: ${results.rows[0].id}`);
      }
    );
    response.status(201).json(newUser);
  } catch (e) {
    console.log(e);
  }
};

export default {
  postRegister,
};
