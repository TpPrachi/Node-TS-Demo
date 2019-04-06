import * as jwt from "jsonwebtoken";

export class Jwt {
  /*
  * getAuthToken
  */
  public static getAuthToken(data) {
    return jwt.encode(data, process.env.JwtSecret);
  }

  /*
  * decodeAuthToken
  */
  public static decodeAuthToken(token) {
    if (token) {
      try {
        return jwt.verify(token, process.env.JwtSecret);
      } catch (error) {
        // logger.error(error);
        return false;
      }
    }
    return false;
  }
}
