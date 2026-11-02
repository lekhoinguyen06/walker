import { FRONTMATTER, PAGE, TEXT } from "../../banhmi";

PAGE("fundamentals", {});

FRONTMATTER(
  {
    name: "Fundamentals",
    description:
      "These are the fundamental elements that make up the Walker framework.",
  },
  {
    domainRefs: [
      "fundamentals::client",
      "fundamentals::server",
      "fundamentals::action",
      "fundamentals::flow",
      "fundamentals::item",
      "fundamentals::map",
    ],
  },
);
