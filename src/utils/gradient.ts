import chalk from "chalk";

/**
 * Linearly interpolate between two numbers
 */
function lerp(start: number, end: number, t: number): number {
  return Math.round(start + (end - start) * t);
}

/**
 * Apply a gradient across text
 *
 * @param text - The text to colorize (can be multiline)
 * @param startColor - RGB tuple for gradient start
 * @param endColor - RGB tuple for gradient end
 */
export function gradientText(
  text: string,
  startColor: [number, number, number],
  endColor: [number, number, number]
): string {
  return text
    .split("")
    .map((char, i, arr) => {
      const t = i / Math.max(arr.length - 1, 1);
      const r = lerp(startColor[0], endColor[0], t);
      const g = lerp(startColor[1], endColor[1], t);
      const b = lerp(startColor[2], endColor[2], t);
      return chalk.rgb(r, g, b)(char);
    })
    .join("");
}
