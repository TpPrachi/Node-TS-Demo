import * as l10n from "jm-ez-l10n";
import { Middleware } from "./middleware";
import { AccountRoute } from "./v1/modules/account/accountRoute";

import express = require("express");

export class Routes {
  protected basePath: string;

  constructor(NODE_ENV: string) {
    switch (NODE_ENV) {
      case "production":
        this.basePath = "/app/dist";
        break;
      case "development":
        this.basePath = "/app/public";
        break;
    }
  }

  public defaultRoute(req: express.Request, res: express.Response) {
    res.json({
      message: "Hello !",
    });
  }

  public path() {
    // cp.generateUrl()
    const router = express.Router();
    const middleware = new Middleware();
    router.use(middleware.authenticateServer);
    router.use("/account", AccountRoute);
    router.all("/*", (req, res) => {
      return res.status(404).json({
        error: l10n.t("ERR_URL_NOT_FOUND"),
      });
    });
    return router;
  }
}
