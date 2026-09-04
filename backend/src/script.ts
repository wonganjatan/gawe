import "dotenv/config";
import { db } from "./prisma/db";

async function main() {
  const runtime = await db.connect({ url: process.env.DATABASE_URL! });

  const users = await db.orm.public.User
    .select("id", "email", "name")
    .limit(2)
    .all();

  console.log(users);

  await runtime.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});