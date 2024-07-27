import { param, validationResult } from "express-validator";

const id = [
  param("id").isInt({ gt: 0 }).withMessage("Invalid ID").toInt(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export default { id };
