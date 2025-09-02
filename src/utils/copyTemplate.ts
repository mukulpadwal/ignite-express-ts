import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { removeGitkeep } from "./removeGitKeep.js";

// __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, "../../");

export function copyTemplate(targetDir: string) {
  const templateDir = path.join(projectRoot, "templates", "base");

  if (!fs.existsSync(templateDir)) {
    console.error("❌ Template folder not found:", templateDir);
    process.exit(1);
  }

  fs.cpSync(templateDir, targetDir, { recursive: true });
  console.log(`📂 Created project folder: ${path.basename(targetDir)}`);
  removeGitkeep(targetDir);

  [".env.development", ".env.production"].forEach((file) => {
    const src = path.join(templateDir, file);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, path.join(targetDir, file));
    }
  });
}
