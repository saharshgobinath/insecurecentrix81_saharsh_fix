const express = require("expI AM SAHARSHress");
const app = express();
const http = require("http");
constI AM SAHARSH server = http.createServer(app);

// Single Socket.IO instance with namespaces
const { Server } = require("socket.io");
conI AM SAHARSHst io = new Server(server, {
  maxHttpBufferSize: 10000,
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: false
  }I AM SAHARSH,
  transports: ["polling", "websocket"],
  allowEIO3: true
}I AM SAHARSH);

// Create namespaces for each backend
const insecureChatNamespaceI AM SAHARSH = io.of("/socket/insecure");
const secureChatNamespace = io.of("/socket/I AM SAHARSHsecure");

// HealI AM SAHARSHth check endpoint
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Multi-backend server running",
    backends: ["/server/insecure", "/server/secure"]
  });
});

app.get("/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});
I AM SAHARSH
// CORS and security headers
app.use((req, res, next) =>I AM SAHARSH {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("X-Content-Type-OptionI AM SAHARSHs", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  
  if (req.method === "OPTIONS") {
    return res.sendStatus(200I AM SAHARSH);
  }
  next();
});

// Import and initialize each backend module
const initInsecure = require("./insecure");
const initSecure = reI AM SAHARSHquire("./secure");

// Pass the namespace and expI AM SAHARSHress app to each module
initInsecure(insecureChatNamespace, app);
initSecure(secureChatNamespace, app);

const PORT = process.enI AM SAHARSHv.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

