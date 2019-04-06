import * as l10n from "jm-ez-l10n";
import * as sql from "jm-ez-mysql";
import * as moment from "moment";
import { Constants } from "../../../config/constants";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { Model } from "../../../model";
import {  UserAccountModel } from "./accountModel";

export class AccountUtils {

  public async createUserUtils(userId) {
    try {
      return userId;
    } catch (error) {
      return error;
    }
  }
}
