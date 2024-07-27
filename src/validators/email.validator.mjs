import { body, validationResult } from "express-validator";

const createEmail = [
  body("subject")
    .isString()
    .withMessage("Invalid Subject")
    .notEmpty()
    .withMessage("Subject is required"),

  body("recipients")
    .isArray()
    .withMessage("Invalid Recipients")
    .notEmpty()
    .withMessage("Recipient is required"),

  body("recipients.*.type")
    .isIn(["to", "cc"])
    .withMessage('Missing "to" or "cc"'),

  body("recipients.*.recipient").isEmail().withMessage("Invalid Email Address"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export default { createEmail };
