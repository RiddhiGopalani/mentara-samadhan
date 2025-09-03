import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import tasksRoutes from "./routes/tasks.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => res.json({ ok: true, message: "To-Do API is running" }));

app.use("/api/tasks", tasksRoutes);

app.use(errorHandler);

export default app;
