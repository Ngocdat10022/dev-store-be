import express, { Request, Response } from "express";
import { logger } from "./utils/logger";
import { NODE_ENV, PORT } from "../src/config";

class App {
  public app: express.Application;
  public env: string;
  public port: string;

  constructor() {
    this.app = express();
    this.port = PORT;
    this.env = NODE_ENV;
  }

  public useSend() {
    this.app.get("/", (req: Request, res: Response) => {
      res.json("test api");
    });
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
