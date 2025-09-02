import fs from "node:fs";
import path from "node:path";

// Remove .gitkeep files
export function removeGitkeep(dir: string) {
  for (const file of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      removeGitkeep(fullPath);
    } else if (file === ".gitkeep") {
      fs.unlinkSync(fullPath);
    }
  }
}
