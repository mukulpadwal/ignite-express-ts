import inquirer from "inquirer";

export async function askQuestions() {
  const { packageManager } = await inquirer.prompt([
    {
      type: "list",
      name: "packageManager",
      message: "Which package manager would you like to use?",
      choices: ["npm", "yarn", "pnpm", "bun"],
      default: "npm",
    },
  ]);

  const { language } = await inquirer.prompt([
    {
      type: "list",
      name: "language",
      message: "Which language do you want to use?",
      choices: ["TypeScript", "JavaScript"],
      default: "TypeScript",
    },
  ]);

  const { features } = await inquirer.prompt([
    {
      type: "checkbox",
      name: "features",
      message: "Select additional features to include:",
      choices: [{ name: "Prettier", value: "prettier" }],
    },
  ]);

  const { git } = await inquirer.prompt([
    {
      type: "confirm",
      name: "git",
      message: "Initialize a git repository?",
      default: true,
    },
  ]);

  return { packageManager, language, features, git };
}
