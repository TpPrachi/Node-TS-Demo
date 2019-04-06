import { Request, Response } from "express";
import { AccountUtils } from "./accountUtils";

export class AccountsController {
  private accountUtils: AccountUtils = new AccountUtils();

  public createUser = async (req: Request, res: Response) => {
    try {
      const result = await this.accountUtils.createUserUtils(req.userId);
      res.status(result.code).json(result.result);
    } catch (error) {
      res.status(error.code).json({ error: error.error, data: error.result });
    }
  }
}
