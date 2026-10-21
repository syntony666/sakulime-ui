import { cpSync, mkdirSync } from "node:fs";

mkdirSync("dist/themes", { recursive: true });
cpSync("src/tokens.css", "dist/tokens.css");
cpSync("src/themes", "dist/themes", { recursive: true });
console.log("copied tokens.css + themes/ to dist/");
