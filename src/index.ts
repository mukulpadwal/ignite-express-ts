#!/usr/bin/env node

import path from "node:path";
import fs from "node:fs";
import {
  askQuestions,
  copyTemplate,
  initGit,
  installDependencies,
  showBanner,
  validateProjectName,
} from "./utils/index.js";

async function main() {
  // Display CLI banner with gradient
  showBanner();

  // Get the project name from CLI arguments
  let rawName = process.argv[2] || ".";

  // Determine the target directory for the new project
  const cwd = process.cwd();
  const targetDir = rawName === "." ? cwd : path.join(cwd, rawName);

  // Validate and sanitize project name
  const projectName =
    rawName === "." ? path.basename(cwd) : validateProjectName(rawName);

  // Prevent overwriting existing directories
  if (rawName !== "." && fs.existsSync(targetDir)) {
    console.error(
      `❌ Directory "${projectName}" already exists. Choose another name.`
    );
    process.exit(1);
  }

  // Ask questions (package manager, language, features, git)
  const { packageManager, language, features, git } = await askQuestions();

  // Copy base template + features
  copyTemplate(targetDir, { language, features });

  // Change working directory to the project folder
  process.chdir(targetDir);

  // Install project dependencies via npm
  installDependencies(packageManager);

  // Initialize git repository if user agreed
  if (git) initGit();

  // Display final success message and next steps
  console.log(`\n✅ Project ready at ./${projectName}`);
  console.log(`👉 Next steps:`);
  if (rawName !== ".") {
    console.log(`   cd ${projectName}`);
  }
  console.log(`   ${packageManager} run dev`);
  console.log(
    `\n💡 ${
      git
        ? "A new git repo has been initialized. (run `git remote add origin <url>` to connect it)"
        : "Git initialization skipped. (run `git init` manually)"
    } `
  );
}

main().catch((err) => {
  console.error("❌ Something went wrong:");
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
