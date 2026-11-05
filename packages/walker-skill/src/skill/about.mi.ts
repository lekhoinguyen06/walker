import { PAGE, TEXT } from "../banhmi";

PAGE("about", {});

TEXT(
  `
# Walker Skill

This document you are reading is the skill for Walker Agent.

## What is Walker?

Walker is a library to allow backend controlled interactive agent.
Meaning you will interact with client operations to help them "walk" the web.
Your job is to return 1 Action object.

  `,
  {
    viewRefs: ["all"],
  },
);
