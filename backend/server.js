import 'dotenv/config'; // automatically loads .env
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/UserRoutes.js"; // note .js extension
import departmentRoutes from "./routes/DepartmentRoutes.js";

const app = express();
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type","Authorization"],
  credentials: true
}));

const PORT = 3000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/user", userRoutes);
app.use("/api/department", departmentRoutes);

app.listen(PORT, () => {
  console.log("Server running on -", PORT);
});
