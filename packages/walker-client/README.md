# walker-client

The client SDK for Walker Server. This package is used internally for `walker-dom`. To interact with Walker Server OpenAPI Specification, you can go [here](https://docs.walker.vstaffs.com/api-reference/get-apiwalkerhealth)

## Usage

```ts
import { postApiWalkerWalk } from "walker-client";
import { createClient } from "walker-client/client";

const client = createClient({
  baseUrl: ctx.baseUrl,
});
const result = await postApiWalkerWalk({
  client,
  body: {
    histories,
    flows: ctx.flows.filter((f) => uniqueFlowKeys.has(f.command)),
    map,
    skills: [],
    userPrompt: getUserPrompt(),
  },
});
```

## More on Walker

To start using Walker, check out our document [here](https://docs.walker.vstaffs.com).
