import { readFile, writeFile } from "fs/promises";

export async function markdownToJS(
  inputPath: string,
  outputPath: string,
  variableName: string = "markdown",
): Promise<void> {
  const md = await readFile(inputPath, "utf-8");
  await writeFile(
    outputPath,
    `// This file is generated from ${inputPath}. Do not edit it directly.\n\nexport const ${variableName} = \`${md.replace(/`/g, "\\`")}\`;\n`,
  );
}

await markdownToJS("./walker-skill.md", "./index.ts", "walkerSkill");
