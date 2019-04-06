import {
  IsNotEmpty, IsPositive,
} from "class-validator";
import { Model } from "../../../model";

export class UserAccountModel extends Model {
  @IsNotEmpty()
  @IsPositive()
  public userId: number;

  constructor(body: any) {
    super();
    const {
      userId,
    } = body;

    this.userId = userId;
  }
}
