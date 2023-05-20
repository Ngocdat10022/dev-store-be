import App from "./app";
import AuthRouter from "./routes/auth.router";
const app = new App([new AuthRouter()]);

app.listen();
