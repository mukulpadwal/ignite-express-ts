import figlet from "figlet";
import { gradientText } from "./gradient.js";

export function showBanner() {
  const banner = figlet.textSync("Ignite Express TS", {
    font: "Slant",
    horizontalLayout: "default",
    verticalLayout: "default",
  });
  console.log(gradientText(banner, [255, 100, 100], [100, 100, 255]));
  console.log("\n🚀 Welcome to Ignite Express TS CLI!\n");
}
