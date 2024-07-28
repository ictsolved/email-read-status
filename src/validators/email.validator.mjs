import { query, body, validationResult } from "express-validator";

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

  body("recipients.*.recipient")
    .isEmail()
    .normalizeEmail()
    .withMessage("Invalid Email Address"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const getEmails = [
  query("emailAddress")
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage("Invalid Email Address"),

  query("emailAddressId")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("Invalid Email Address ID")
    .toInt(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { emailAddress, emailAddressId } = req.query;
    if (emailAddress && emailAddressId) {
      return res.status(400).json({
        error: "Both Email Address and Email Address ID cannot be provided",
      });
    }

    next();
  },
];

const searchEmailAddress = [
  query("q")
    .isString()
    .withMessage("Invalid Search Query")
    .notEmpty()
    .withMessage("Search query is required")
    .toLowerCase(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  },
];

export default { createEmail, getEmails, searchEmailAddress };
