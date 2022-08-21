import jwt from "jsonwebtoken";

const tokenKey = process.env["TOKEN_KEY"];

export function authenticateToken(req: any, res: any, next: any) {
  console.log(req);
  const authHeader = req.headers["Authorized"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, tokenKey as string, (err: any, user: any) => {
    console.log(err);

    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
}
