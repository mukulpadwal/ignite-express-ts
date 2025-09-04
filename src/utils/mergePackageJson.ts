import fs from "node:fs";

function sortObject(obj: Record<string, string>) {
  return Object.keys(obj)
    .sort()
    .reduce((acc, key) => {
      acc[key] = obj[key];
      return acc;
    }, {} as Record<string, string>);
}

export function mergePackageJson(snippetPath: string, targetPath: string) {
  const snippet = JSON.parse(fs.readFileSync(snippetPath, "utf-8"));
  const target = JSON.parse(fs.readFileSync(targetPath, "utf-8"));

  if (snippet.dependencies) {
    target.dependencies = {
      ...(target.dependencies ?? {}),
      ...snippet.dependencies,
    };

    target.dependencies = sortObject(target.dependencies);
  }

  if (snippet.devDependencies) {
    target.devDependencies = {
      ...(target.devDependencies ?? {}),
      ...snippet.devDependencies,
    };
    target.devDependencies = sortObject(target.devDependencies);
  }

  if (snippet.scripts) {
    target.scripts = {
      ...(target.scripts ?? {}),
      ...snippet.scripts,
    };
  }

  fs.writeFileSync(targetPath, JSON.stringify(target, null, 2) + "\n");
}
