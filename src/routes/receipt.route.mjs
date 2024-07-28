import { Router } from "express";

import controller from "../controllers/receipt.controller.mjs";
import validator from "../validators/receipt.validator.mjs";

const router = Router();

router
  .get("/latest-receipts", controller.latestReceipts)
  .get("/email-receipts/:emailId", validator.emailId, controller.emailReceipts)
  .put("/receipts", validator.markAsSelfRead, controller.markAsSelfRead)
  .get("/receipt/:token", controller.trackReceipt);

export default router;
