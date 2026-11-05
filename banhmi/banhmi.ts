import { getBanhMi } from "banhmi";

const domains = ["developer_preference"] as const;
type Domain = (typeof domains)[number];
const views = ["s", "m", "l"] as const;
type View = (typeof views)[number];

const banhmi = getBanhMi<Domain, View>({
  srcDir: import.meta.dir,
  outDir: "./banhmi/generated",
  prefix: "walker_",
});

export const { PAGE, TEXT, CODE, TABLE, FRONTMATTER, write } = banhmi;
export default banhmi;
