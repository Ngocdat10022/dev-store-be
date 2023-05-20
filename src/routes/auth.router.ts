import { Router } from "express";
import { Routes } from "../interface/router.interface";
import AuthController from "../controller/auth.controller";

class AuthRouter implements Routes {
  public path = "/auth";
  public router = Router();
  public authController = new AuthController();
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/signup`, this.authController.signUp);
  }
}

export default AuthRouter;
