import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { connection } from "../database/db.config";
class AuthController {
  public signUp = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const db = connection();
      const q = "SELECT * from user WHERE email=? OR username=?";
      const { username, email, password } = req.body;
      db.query(q, [email.trim(), username.trim()], async (err, data: []) => {
        if (err) return res.status(409).json(err);
        if (data.length) res.status(409).json("user or email already exits");

        if (data.length === 0) {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
          const q = "INSERT INTO user(`username`,`email`,`password`) VALUES(?)";
          const value = [username, email, hashedPassword];

          db.query(q, [value], (err, data) => {
            if (err) return res.status(409).json(err);
            res.status(200).json("create user successfully");
          });
        }
      });
    } catch (error) {}
  };
}

export default AuthController;
