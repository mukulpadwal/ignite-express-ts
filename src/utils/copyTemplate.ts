import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { removeGitkeep } from "./removeGitKeep.js";

// __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Relative path to templates from this file
const templateDir = path.join(__dirname, "../../templates/base");

export function copyTemplate(targetDir: string) {
  if (!fs.existsSync(templateDir)) {
    console.error("❌ Template folder not found:", templateDir);
    process.exit(1);
  }

  fs.cpSync(templateDir, targetDir, { recursive: true });
  console.log(`📂 Created project folder: ${path.basename(targetDir)}`);
  removeGitkeep(targetDir);

  // Copy environment files
  [".env.development", ".env.production"].forEach((file) => {
    const src = path.join(templateDir, file);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, path.join(targetDir, file));
    }
  });

  // Copy gitignore
  const gitignoreSrc = path.join(templateDir, "gitignore");
  if (fs.existsSync(gitignoreSrc)) {
    fs.copyFileSync(gitignoreSrc, path.join(targetDir, ".gitignore"));
    const leftover = path.join(targetDir, "gitignore");
    if (fs.existsSync(leftover)) fs.rmSync(leftover);
  }
}
