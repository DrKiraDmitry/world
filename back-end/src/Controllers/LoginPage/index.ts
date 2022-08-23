import { Response, Request } from "express";
import { pool } from "../../Plagins/query";
import jwt from "jsonwebtoken";
import { UserTypes } from "../../Types/UserTypes";
import bcrypt from "bcrypt";

interface RegisterType {
  email: string;
  password: string;
}

const UserOneFoe = (email: string) => {
  return pool
    .query("SELECT * FROM users WHERE email = $1", [email])
    .then((r) => r.rows.length > 0)
    .catch((e) => console.log(e));
};

const UserOneRegister = (email: string): Promise<UserTypes> => {
  return pool
    .query("SELECT * FROM users WHERE email = $1", [email])
    .then((r) => (r.rows.length > 0 ? r.rows[0] : null))
    .catch((e) => console.log(e));
};

const postRegister = async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body as RegisterType;
    if (!(email && password)) return response.status(400).send("All input is required");
    const oldUser = await UserOneFoe(email);
    if (Boolean(oldUser)) return response.status(400).send("This user must be fuck");
    const encryptPassword = await bcrypt.hash(password, 10);
    const newUser = await pool
      .query("INSERT INTO users (email, password, created_at) VALUES ($1, $2, $3) RETURNING *", [
        email,
        encryptPassword,
        new Date(),
      ])
      .then((r) => r.rows[0])
      .catch((e) => console.log(e));
    response.status(201).json(newUser);
  } catch (e) {
    console.log(e);
  }
};

const postLogin = async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body as RegisterType;
    if (!(email && password)) return response.status(400).send("All input is required");

    const user = await UserOneRegister(email);
    if (!user) return response.status(400).send("Unknown");
    if (!process.env["TOKEN_KEY"]) return response.status(400).send("Bad token");
    if (!(await bcrypt.compare(password, user.password))) return response.status(400).send("Password not equal");
    const token = jwt.sign({ id: user.id }, process.env.TOKEN_KEY, {
      expiresIn: "7d",
    });
    return response.status(200).json({ id: user.id, email: user.email, token });
  } catch (e) {
    console.log(e);
    return response.status(404).json({ message: "User not found" });
  }
};

export default {
  postRegister,
  postLogin,
};
