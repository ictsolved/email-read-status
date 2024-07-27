import { Router } from "express";
import path from "path";

import email from "./email.route.mjs";
import receipt from "./receipt.route.mjs";

const router = Router();

router.use("/", email);
router.use("/", receipt);

router.get("*", function (req, res) {
  res.setHeader("content-type", "image/gif");
  res.sendFile(`${path.resolve()}/public/image.gif`);
});

export default router;
