import { getBanhMi } from "banhmi";

const domains = [
  "agent_flow",
  "agent_walk",
  "about",
  "concept",
  "concept_client",
  "concept_server",
  "concept_item",
  "concept_flow",
  "concept_history",
  "concept_action",
  "concept_map",
] as const;
type Domain = (typeof domains)[number];
const views = ["s", "m", "l", "all"] as const;
type View = (typeof views)[number];

const banhmi = getBanhMi<Domain, View>({
  srcDir: import.meta.dir,
  outDir: "./src/generated",
  prefix: "walker_skill_",
});

export const { PAGE, TEXT, CODE, TABLE, FRONTMATTER, write } = banhmi;
export default banhmi;
