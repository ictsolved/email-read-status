import { query, validationResult } from "express-validator";

const pagination = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Invalid Page Number")
    .toInt(),
  query("pageSize")
    .optional()
    .isInt({ min: 10, max: 100 })
    .withMessage("Page size must be between 10 and 100")
    .toInt(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export default { pagination };
