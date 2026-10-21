import { cpSync, mkdirSync } from "node:fs";

mkdirSync("dist/themes", { recursive: true });
cpSync("packages/core/dist/sakulime.css", "dist/sakulime.css");
cpSync("packages/core/dist/sakulime.js", "dist/sakulime.js");
cpSync("packages/tokens/src/tokens.css", "dist/tokens.css");
cpSync("packages/tokens/src/themes", "dist/themes", { recursive: true });
console.log("assembled dist/ from packages");
