import { existsSync, readFileSync } from 'node:fs';

export const readWorkflow = name => {
  const url = new URL(`../../.github/workflows/${name}.yml`, import.meta.url);
  return existsSync(url) ? readFileSync(url, 'utf8') : '';
};

export function shellBlocks(source) {
  const lines = source.split('\n');
  const blocks = [];
  for (let i = 0; i < lines.length; i++) {
    const match = lines[i].match(/^(\s*)run: \|$/);
    if (!match) continue;
    const indent = match[1].length + 2;
    const block = [];
    while (i + 1 < lines.length) {
      const line = lines[i + 1];
      if (line.trim() && !line.startsWith(' '.repeat(indent))) break;
      block.push(line.slice(indent));
      i++;
    }
    blocks.push(block.join('\n'));
  }
  return blocks;
}
