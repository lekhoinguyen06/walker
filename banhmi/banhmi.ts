import { getBanhMi } from "banhmi";

const domains = [
  "introduction",
  "getting-started",
  "concepts",
  "developer::preferences",
  "fundamentals",
  "fundamentals::server",
  "fundamentals::client",
  "fundamentals::item",
  "fundamentals::map",
  "fundamentals::action",
  "fundamentals::flow",
  "react",
] as const;
type Domain = (typeof domains)[number];
const views = ["$s", "$m", "$l"] as const;
type View = (typeof views)[number];

const banhmi = getBanhMi<Domain, View>({
  srcDir: import.meta.dir,
  outDir: "./generated",
  prefix: "w::",
});

export const { PAGE, TEXT, CODE, TABLE, FRONTMATTER, write } = banhmi;
export default banhmi;
