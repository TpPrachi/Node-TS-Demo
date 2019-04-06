import * as _ from "lodash";

export class Middleware {


  public authenticateServer = (req, res, next) => {
    if (req.method !== "OPTIONS") {
      const { headers } = req;
      if (req.body && req.body.userId) {
          // Authenticate USER
      } else {
        return next();
      }
    } else {
      res.status(401).json({ error: req.t("ERR_TOKEN_EXP") });
    }
  }
}
