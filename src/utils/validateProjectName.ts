// Validate project name
export function validateProjectName(name: string) {
  const trimmed = name.trim();
  if (!trimmed || /[<>:"\/\\|?*]/.test(trimmed)) {
    console.error("❌ Invalid project name. Use alphanumeric, -, or _ characters only.");
    process.exit(1);
  }
  return trimmed;
}