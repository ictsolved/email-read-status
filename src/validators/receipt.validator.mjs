import { body, validationResult } from "express-validator";

const markAsSelfRead = [
  body("id").isInt({ gt: 0 }).withMessage("Invalid Receipt ID").toInt(),
  body("readBySelf").isBoolean().withMessage("Invalid Read Status"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export default { markAsSelfRead };
