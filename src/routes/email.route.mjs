import { Router } from "express";

import controller from "../controllers/email.controller.mjs";
import validator from "../validators/email.validator.mjs";
import pValidator from "../validators/pagination.validator.mjs";

const router = Router();

router
  .get(
    "/emails",
    pValidator.pagination,
    validator.getEmails,
    controller.getEmails
  )
  .post("/emails", validator.createEmail, controller.createEmail)
  .get(
    "/email-addresses",
    validator.searchEmailAddress,
    controller.searchEmailAddress
  );

export default router;
