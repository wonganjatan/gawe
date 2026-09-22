import "dotenv/config";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes"
import userRoutes from "./routes/users.routes"
import projectRoutes from "./routes/projects.routes"
import taskRoutes from "./routes/tasks.routes"
import seedData from "./data/seedData";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json())
app.use(cors());

app.use("/api", authRoutes)
app.use("/api", userRoutes)
app.use("/api", projectRoutes)
app.use("/api", taskRoutes)

app.listen(PORT, async () => {
    await seedData()
    console.log(`Server running on port ${PORT}`)
});
