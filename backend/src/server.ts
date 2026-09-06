import "dotenv/config";
import express from "express";
import cors from "cors";
import bcrypt from 'bcrypt'
import { prisma } from "./lib/prisma";
import userRoutes from "./routes/users.routes"
import authRoutes from "./routes/auth.routes"

const app = express();
const PORT = process.env.PORT || 3001;

const ADMIN_EMAIL = process.env.INITIAL_ADMIN_EMAIL || "example@email.com"
const ADMIN_PASSWORD = process.env.INITIAL_ADMIN_PASSWORD || "abc123"

app.use(express.json())
app.use(cors());

app.use("/api", userRoutes)
app.use("/api", authRoutes)

async function initAdmin() {
    const isExists = await prisma.user.findFirst({ 
        where: {
            username: "admin"
        }
    })
    if (isExists) {
        console.log("Admin is already exist")
        return
    }
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
    await prisma.user.create({
        data: {
            firstName: "Admin",
            lastName: "User",
            username: "admin",
            email: ADMIN_EMAIL,
            hashedPassword,
            role: "ADMIN"
        }
    });
}

app.listen(PORT, async () => {
    await initAdmin()
    console.log(`Server running on port ${PORT}`)
});
