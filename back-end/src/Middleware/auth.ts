import jwt from "jsonwebtoken";

const tokenKey = process.env["TOKEN_KEY"];

export function authenticateToken(req: any, res: any, next: any) {
  const authHeader = req.headers["authorization"];

  if (authHeader == null) return res.sendStatus(401);

  jwt.verify(authHeader, tokenKey as string, (err: any, user: any) => {
    console.log(err);

    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
}
