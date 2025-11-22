require("dotenv").config();
const cluster = require("cluster");
const os = require("os");

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Primary process started. PID: ${process.pid}`);
  console.log(`Starting ${numCPUs} worker processes...`);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Auto restart crashed workers
  cluster.on("exit", (worker, code, signal) => {
    console.log(
      `Worker ${worker.process.pid} died. Starting a new one...`
    );
    cluster.fork();
  });

} else {
  // Worker processes run the actual server
  const express = require("express");
  const bodyParser = require("body-parser");
  const cors = require("cors");
  const connectDB = require("./src/config/db");
  const authRoutes = require("./src/routes/authRoutes");

  const app = express();

  // ---- Middleware ---- //
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // ---- Connect to MongoDB ---- //
  connectDB();

  // ---- Routes ---- //
  app.use("/auth", authRoutes);

  // ---- Health Check Route ---- //
  app.get("/", (req, res) => {
    res.json({
      message: "API Running",
      worker: process.pid,
    });
  });

  // ---- Start Server ---- //
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () =>
    console.log(`Worker running on port ${PORT} with PID: ${process.pid}`)
  );
}
