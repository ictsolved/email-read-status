import { Router } from "express";

import controller from "../controllers/email.controller.mjs";
import validator from "../validators/email.validator.mjs";

const router = Router();

router
  .get("/emails", controller.getEmails)
  .post("/emails", validator.createEmail, controller.createEmail);

export default router;
