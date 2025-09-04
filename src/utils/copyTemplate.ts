import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { removeGitkeep } from "./removeGitKeep.js";
import { mergePackageJson } from "./mergePackageJson.js";

// __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Relative path to templates from this file
const templatesBaseDir = path.join(__dirname, "../../templates/base");
const featuresDir = path.join(__dirname, "../../templates/features");

export function copyTemplate(
  targetDir: string,
  { language, features }: { language: string; features: string[] }
) {
  // Step 1: Copy Base Template (choose ts or js)
  const baseTemplate = path.join(
    templatesBaseDir,
    language.toLowerCase() === "typescript" ? "ts" : "js"
  );

  if (!fs.existsSync(baseTemplate)) {
    console.error("❌ Template folder not found:", baseTemplate);
    process.exit(1);
  }

  fs.cpSync(baseTemplate, targetDir, { recursive: true });
  console.log(`📂 Created project folder: ${path.basename(targetDir)}`);
  removeGitkeep(targetDir);

  // Copy environment files
  [".env.development", ".env.production"].forEach((file) => {
    const src = path.join(baseTemplate, file);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, path.join(targetDir, file));
    }
  });

  // Copy gitignore
  const gitignoreSrc = path.join(baseTemplate, "gitignore");
  if (fs.existsSync(gitignoreSrc)) {
    fs.copyFileSync(gitignoreSrc, path.join(targetDir, ".gitignore"));
    const leftover = path.join(targetDir, "gitignore");
    if (fs.existsSync(leftover)) fs.rmSync(leftover);
  }

  // Step 2: Apply Selected Features
  for (const feature of features) {
    const featurePath = path.join(featuresDir, feature);

    if (fs.existsSync(featurePath)) {
      console.log(`\n✨ Adding feature: ${feature}`);
      fs.cpSync(featurePath, targetDir, { recursive: true });

      // Merge package.json snippet if present
      const snippetPath = path.join(featurePath, "package-snippet.json");

      if (fs.existsSync(snippetPath)) {
        mergePackageJson(snippetPath, path.join(targetDir, "package.json"));
      }

      const copiedSnippet = path.join(targetDir, "package-snippet.json");

      if (fs.existsSync(copiedSnippet)) {
        fs.unlinkSync(copiedSnippet);
      }
    } else {
      console.warn(`⚠️ Feature "${feature}" not found in templates/features`);
    }
  }
}
