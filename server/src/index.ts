import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import projectRoutes from "./routes/projectRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import userRoutes from "./routes/userRoutes.js";
// Configure

const app = express();
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/projects", projectRoutes);
app.use("/tasks", taskRoutes);
app.use("/search", searchRoutes);
app.use("/users", userRoutes);
app.use("/teams", teamRoutes);

console.log("DATABASE_URL in app:", process.env.DATABASE_URL);

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function testDb() {
  try {
    const projects = await prisma.project.findMany();
    console.log("DB connected! Projects:", projects);
  } catch (err) {
    console.error("DB connection failed:", err);
  } finally {
    await prisma.$disconnect();
  }
}

testDb();

// Server
const port = Number(process.env.PORT) || 5000;
app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});
export default app;
