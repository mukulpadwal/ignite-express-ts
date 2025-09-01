#!/usr/bin/env node
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";
import { execSync } from "node:child_process";
import figlet from "figlet";
import gradient from "gradient-string";

// __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Banner
const banner = figlet.textSync("Ignite Express", {
  font: "Slant",
  horizontalLayout: "default",
  verticalLayout: "default",
});
console.log(gradient.pastel.multiline(banner));
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
  console.error(`❌ Directory "${projectName}" already exists. Choose another name.`);
  process.exit(1);
}

// Copy base template
const templateDir = path.join(__dirname, "../templates/base");
fs.cpSync(templateDir, targetDir, { recursive: true });
console.log(`📂 Created project folder: ${projectName}`);

// Remove .gitkeep files
function removeGitkeep(dir) {
  for (const file of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      removeGitkeep(fullPath);
    } else if (file === ".gitkeep") {
      fs.unlinkSync(fullPath);
    }
  }
}
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

// Done
console.log(`\n✅ Project ready at ./${projectName}`);
console.log(`👉 Next steps:\n   cd ${projectName} && npm run dev\n`);
