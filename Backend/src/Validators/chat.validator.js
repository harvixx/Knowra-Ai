import { body } from "express-validator";

export const createChatValidator = [
  body("title")
    .optional()
    .isString()
    .withMessage("Title must be a string")
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Title must be between 1 to 100 characters"),
];