import { Router } from "express";
import { createChatValidator } from "../Validators/chat.validator.js";
import validate from "../middlewares/validate.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const messageRouter = Router();
export default messageRouter;