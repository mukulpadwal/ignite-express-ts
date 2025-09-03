import { execSync } from "node:child_process";

export function installDependencies(packageManager: string) {
  console.log(`\n📦 Installing dependencies with ${packageManager}...`);

  const commands: Record<string, string> = {
    npm: "npm install",
    yarn: "yarn install",
    pnpm: "pnpm install",
    bun: "bun install",
  };

  const cmd = commands[packageManager] || "npm install";

  try {
    execSync(cmd, { stdio: "inherit" });
    console.log(`\n✅ Dependencies installed with ${packageManager}!\n`);
  } catch {
    console.error(
      `❌ Failed to install dependencies with ${packageManager}. Try running \`${cmd}\` manually.`
    );
    process.exit(1);
  }
}
