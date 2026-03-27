import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import chatRouter from "./routes/chat.routes.js";
import messageRouter from "./routes/message.routes.js";
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true
}));
app.use("/api/auth", authRouter)
app.use("/api/message", messageRouter)
app.use("/api/chat", chatRouter)
export default app;

