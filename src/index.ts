#!/usr/bin/env node

import path from "node:path";
import fs from "node:fs";
import {
  copyTemplate,
  initGit,
  installDependencies,
  showBanner,
  validateProjectName,
} from "./utils/index.js";

function main() {
  // Display CLI banner with gradient
  showBanner();

  // Get the project name from CLI arguments
  const rawName = process.argv[2];

  if (!rawName) {
    console.error("❌ Please provide a project name:\n");
    console.error("   ignite-express-ts my-app\n");
    process.exit(1);
  }

  // Validate and sanitize project name
  const projectName = validateProjectName(rawName);

  // Determine the target directory for the new project
  const targetDir = path.join(process.cwd(), projectName);

  // Prevent overwriting existing directories
  if (fs.existsSync(targetDir)) {
    console.error(
      `❌ Directory "${projectName}" already exists. Choose another name.`
    );
    process.exit(1);
  }

  // Copy the template files into the target directory
  copyTemplate(targetDir);

  // Change working directory to the project folder
  process.chdir(targetDir);

  // Install project dependencies via npm
  installDependencies();

  // Initialize git repository unless skipped via --no-git
  const shouldInitGit = !process.argv.includes("--no-git");
  if (shouldInitGit) initGit();

  // Display final success message and next steps
  console.log(`\n✅ Project ready at ./${projectName}`);
  console.log(`👉 Next steps:`);
  console.log(`   cd ${projectName}`);
  console.log(`   npm run dev`);
  console.log(
    `\n💡 ${
      shouldInitGit
        ? "A new git repo has been initialized."
        : "Git initialization skipped."
    } (run \`git remote add origin <url>\` to connect it)`
  );
}

main();
