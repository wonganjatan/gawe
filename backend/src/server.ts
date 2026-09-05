import "dotenv/config";
import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes"
import { UserRepository } from "./modules/user/UserRepository";
import bcrypt from 'bcrypt'
import { prisma } from "./lib/prisma";

const app = express();
const PORT = process.env.PORT || 3001;

const ADMIN_EMAIL = process.env.INITIAL_ADMIN_EMAIL || "example@email.com"
const ADMIN_PASSWORD = process.env.INITIAL_ADMIN_PASSWORD || "abc123"

app.use(express.json())
app.use(cors());

app.use("/api", userRoutes)

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
