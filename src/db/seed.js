// Run once after `npm run db:push`:
//   node src/db/seed.js
//
// Edit YOUR_EMAIL and YOUR_PASSWORD below first.

import "dotenv/config";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import bcrypt from "bcryptjs";
import { users, siteSettings } from "./schema.js";

const YOUR_EMAIL    = "your@email.com";   // ← change this
const YOUR_PASSWORD = "yourpassword";     // ← change this

async function seed() {
  const client = postgres(process.env.DATABASE_URL, { ssl: "require" });
  const db = drizzle(client);

  // Create admin user
  const hashed = await bcrypt.hash(YOUR_PASSWORD, 12);
  await db.insert(users).values({ email: YOUR_EMAIL, password: hashed });
  console.log(`✓ Admin user: ${YOUR_EMAIL}`);

  // Create the single site_settings row
  await db.insert(siteSettings).values({ id: 1, isLive: false });
  console.log("✓ site_settings row created");

  await client.end();
  console.log("✓ Seed complete.");
}

seed().catch((e) => { console.error(e); process.exit(1); });
