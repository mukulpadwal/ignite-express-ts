#!/usr/bin/env node
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";
import { execSync } from "node:child_process";
import figlet from "figlet";
import { gradientText } from "./utils/gradient.js";
import { removeGitkeep } from "./utils/removeGitKeep.js";

// __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Banner
const banner = figlet.textSync("Ignite Express TS", {
  font: "Slant",
  horizontalLayout: "default",
  verticalLayout: "default",
});
console.log(gradientText(banner, [255, 100, 100], [100, 100, 255]));
console.log("\n🚀 Welcome to Ignite Express CLI!\n");

// Get project name
const projectName = process.argv[2];

if (!projectName) {
  console.error("❌ Please provide a project name:\n");
  console.error("   ignite-express-ts my-app\n");
  process.exit(1);
}

// Define target dir
const targetDir = path.join(process.cwd(), projectName);

// Prevent overwriting
if (fs.existsSync(targetDir)) {
  console.error(
    `❌ Directory "${projectName}" already exists. Choose another name.`
  );
  process.exit(1);
}

// Copy base template
const templateDir = path.join(__dirname, "../templates/base");
fs.cpSync(templateDir, targetDir, { recursive: true });
console.log(`📂 Created project folder: ${projectName}`);

removeGitkeep(targetDir);

// Move into project
process.chdir(targetDir);

// Install deps
console.log("📦 Installing dependencies...\n");
try {
  execSync("npm install", { stdio: "inherit" });
} catch (err) {
  console.error("❌ Failed to install dependencies.");
  process.exit(1);
}

// Initialize git repo
try {
  execSync("git init", { stdio: "ignore" });
  execSync("git add .", { stdio: "ignore" });
  execSync('git commit -m "chore: initial commit"', { stdio: "ignore" });
  console.log("📦 Initialized a new git repository.");
} catch (err) {
  console.warn("⚠️ Could not initialize git repository. Skipping...");
}

// Done
console.log(`\n✅ Project ready at ./${projectName}`);
console.log(`👉 Next steps:`);
console.log(`   cd ${projectName}`);
console.log(`   npm run dev`);
console.log(
  `\n💡 A new git repo has been initialized. (run \`git remote add origin <url>\` to connect it)`
);
