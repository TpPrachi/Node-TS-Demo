// Import only what we need from express
import { Router } from "express";
import { Validator } from "../../../validate";
import { UserAccountModel } from "./accountModel";
import { AccountsController } from "./accountsController";

// Assign router to the express.Router() instance
const router: Router = Router();
const v: Validator = new Validator();
const accountsController = new AccountsController();

// The / here corresponds to the route that the WelcomeController
// is mounted on in the server.ts file.
// In this case it"s /welcome
router.post("/create", v.validate(UserAccountModel), accountsController.createUser);

// Export the express.Router() instance to be used by server.ts
export const AccountRoute: Router = router;
