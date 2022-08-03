import { Response, Request } from "express";
import { getUserOneFoe } from "../Users";
import { pool } from "../../Plagins/query";

interface RegisterType {
  email: string;
  password: string;
}

const postRegister = async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body as RegisterType;
    if (!(email && password)) return response.status(400).send("All input is required");
    const oldUser = await getUserOneFoe(email);
    console.log(email);
    if (Boolean(oldUser)) return response.status(400).send("This user must be fuck");
    const newUser = await pool
      .query("INSERT INTO users (email, password, created_at) VALUES ($1, $2, $3) RETURNING *", [
        email,
        password,
        new Date(),
      ])
      .then((r) => r.rows[0])
      .catch((e) => console.log(e));
    response.status(201).json(newUser);
  } catch (e) {
    console.log(e);
  }
};

export default {
  postRegister,
};
