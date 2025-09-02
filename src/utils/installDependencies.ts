import { execSync } from "node:child_process";

export function installDependencies() {
  console.log("\n📦 Installing dependencies...");
  try {
    execSync("npm install", { stdio: "inherit" });
    console.log("\n📦 Dependencies installed...\n");
  } catch {
    console.error(
      "❌ Failed to install dependencies. Try running `npm install` manually."
    );
    process.exit(1);
  }
}
