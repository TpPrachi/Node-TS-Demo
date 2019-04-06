import * as bodyParser from "body-parser"; // pull information from HTML POST (express4)
import * as compression from "compression";
import * as dotenv from "dotenv";
import * as express from "express";
import * as l10n from "jm-ez-l10n";
import * as methodOverride from "method-override"; // simulate DELETE and PUT (express4)
import * as morgan from "morgan"; // log requests to the console (express4)
import * as path from "path";
import { Routes } from "./routes";

dotenv.config();

export class App {
  protected app: express.Application;
  constructor() {
    const NODE_ENV = process.env.NODE_ENV;
    const PORT = process.env.PORT as string;
    this.app = express();

    if (NODE_ENV === "development") {
      this.app.use(express.static(path.join(process.cwd(), "public")));
      // set the static files location of bower_components
      this.app.use("/bower_components", express.static(path.join(process.cwd(), "bower_components")));
      this.app.use(morgan("dev")); // log every request to the console
    } else {
      this.app.use(compression());
      // set the static files location /public/img will be /img for users
      this.app.use(express.static(path.join(process.cwd(), "dist"), { maxAge: "7d" }));
    }
    l10n.setTranslationsFile("en", "src/language/translation.en.json");
    this.app.use(l10n.enableL10NExpress);
    this.app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
    this.app.use(bodyParser.json(), (error, req, res, next) => {
      if (error) {
        return res.status(400).json({ error: req.t("ERR_GENRIC_SYNTAX") });
      }
      next();
    });
    this.app.use(bodyParser.json()); // parse application/vnd.api+json as json
    this.app.use(methodOverride());
    const routes = new Routes(NODE_ENV);
    this.app.use("/api/v1", routes.path());
    this.app.listen(PORT, () => {
      console.log(`The server is running in port localhost: ${process.env.PORT}`);
    });
  }
}
