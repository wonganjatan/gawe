import "dotenv/config";
import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes"

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json())
app.use(cors());

app.use("/api", userRoutes)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
