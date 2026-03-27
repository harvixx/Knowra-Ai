import "dotenv/config";
import http from "http";
import app from "./src/app.js";
import connectToDb from "./src/config/database.js";

const PORT = process.env.PORT || 3000;
let isDbConnected = false;

// 🔌 Create HTTP server (important for scalability, sockets, etc.)
const server = http.createServer(app);

// 🧠 Start server immediately (independent of DB)
server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

// 🔗 DB connection (separate + resilient)
async function initDb() {
    try {
        await connectToDb();
        isDbConnected = true;
        console.log("✅ Database connected");
    } catch (err) {
        console.error("❌ DB connection failed:", err.message);

        // 🔁 Retry after delay
        
    }
}

initDb();


// ❤️ Health check route (VERY IMPORTANT)
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "OK",
        db: isDbConnected ? "connected" : "disconnected",
        uptime: process.uptime(),
        timestamp: new Date()
    });
});


// 💣 Global error handlers (production must-have)
process.on("uncaughtException", (err) => {
    console.error("💥 Uncaught Exception:", err.message);
    process.exit(1); // crash → let process manager restart
});

process.on("unhandledRejection", (err) => {
    console.error("💥 Unhandled Rejection:", err.message);
    process.exit(1);
});


// 🛑 Graceful shutdown (VERY IMPORTANT)
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

function shutdown() {
    console.log("🛑 Shutting down server...");

    server.close(() => {
        console.log("💤 Server closed");

        // Optional: close DB connection here
        process.exit(0);
    });

    // Force shutdown after timeout
    setTimeout(() => {
        console.error("⚠️ Force shutdown");
        process.exit(1);
    }, 10000);
}