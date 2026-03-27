import { body } from "express-validator";

export const createMessageValidator = [
  body("chat")
    .notEmpty()
    .withMessage("Chat ID is required")
    .isMongoId()
    .withMessage("Invalid Chat ID"),

  body("content")
    .notEmpty()
    .withMessage("Message content is required")
    .isString()
    .withMessage("Content must be a string")
    .trim()
    .isLength({ min: 1, max: 5000 })
    .withMessage("Content must be between 1 to 5000 characters"),

  body("role")
    .notEmpty()
    .withMessage("Role is required")
    .isIn(["user", "ai"])
    .withMessage("Role must be either 'user' or 'ai'"),
];