import { execSync } from "node:child_process";
import ora from "ora";

export function initGit() {
  const spinner = ora("🔧 Initializing git repository...").start();

  try {
    execSync("git init", { stdio: "ignore" });
    execSync("git add .", { stdio: "ignore" });
    execSync('git commit -m "chore: initial commit"', { stdio: "ignore" });

    spinner.succeed(" Git repository initialized.");
  } catch {
    spinner.warn(
      "⚠️ Git not available or failed. Skipping git initialization."
    );
  }
}
