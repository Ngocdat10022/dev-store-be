import express from "express";
import cors from "cors";
import { logger } from "./utils/logger";
import { CREDENTIALS, NODE_ENV, ORIGIN, PORT } from "../src/config";

import { Routes } from "./interface/router.interface";
import bodyParser from "body-parser";

class App {
  public app: express.Application;
  public env: string;
  public port: string;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = PORT;
    this.env = NODE_ENV;

    this.initializeMiddlewares();
    this.initializeRouters(routes);
  }

  public initializeRouters(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use("/api/v1", route.router);
    });
  }
  public initializeMiddlewares() {
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }
  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }
}

export default App;
