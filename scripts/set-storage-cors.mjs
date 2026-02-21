#!/usr/bin/env node
/**
 * Apply CORS config to the Firebase Storage bucket.
 * Run from project root. Uses GOOGLE_APPLICATION_CREDENTIALS or gcloud default credentials.
 *
 *   node scripts/set-storage-cors.mjs
 *   npm run storage:cors
 */

import { Storage } from "@google-cloud/storage";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BUCKET_NAMES = [
  "credigo-bc4c7.firebasestorage.app",
  "credigo-bc4c7.appspot.com",
];
const PROJECT_ID = "credigo-bc4c7";

async function main() {
  const corsPath = join(__dirname, "..", "cors.json");
  const cors = JSON.parse(readFileSync(corsPath, "utf8"));

  const storage = new Storage({ projectId: PROJECT_ID });

  for (const bucketName of BUCKET_NAMES) {
    try {
      const bucket = storage.bucket(bucketName);
      await bucket.getMetadata(); // verify bucket exists
      console.log("Setting CORS on bucket:", bucketName);
      await bucket.setMetadata({ cors });
      console.log("CORS updated successfully.");
      return;
    } catch (err) {
      if (err.code === 404 || err.message?.includes("does not exist")) {
        continue;
      }
      throw err;
    }
  }
  throw new Error("Bucket not found. Tried: " + BUCKET_NAMES.join(", ") + ". Ensure GOOGLE_APPLICATION_CREDENTIALS points to a key for project credigo-bc4c7.");
}

main().catch((err) => {
  console.error("Failed to set CORS:", err.message);
  if (err.message?.includes("Could not load the default credentials")) {
    console.error("\n1. Firebase Console → Project settings → Service accounts → Generate new private key");
    console.error("2. Set: export GOOGLE_APPLICATION_CREDENTIALS=/path/to/key.json");
    console.error("3. Run: npm run storage:cors");
  }
  if (err.message?.includes("Bucket not found")) {
    console.error("\nNo Storage bucket exists yet. In Firebase Console:");
    console.error("  1. Go to Build → Storage → Get started");
    console.error("  2. Create the default bucket (may require Blaze plan)");
    console.error("  3. Run: npm run storage:cors");
  }
  process.exit(1);
});
