import { Router } from "express";
import { createChatValidator } from "../Validators/chat.validator.js";
import validate from "../middlewares/validate.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const chatRouter = Router();


export default chatRouter;