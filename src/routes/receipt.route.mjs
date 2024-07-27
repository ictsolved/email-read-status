import { Router } from "express";

import controller from "../controllers/receipt.controller.mjs";
import IdValidator from "../validators/id.validator.mjs";
import validator from "../validators/receipt.validator.mjs";

const router = Router();

router
  .get("/receipts/:id", IdValidator.id, controller.getReceipts)
  .put("/receipts", validator.markAsSelfRead, controller.markAsSelfRead)
  .get("/receipt/:token", controller.trackReceipt);

export default router;
