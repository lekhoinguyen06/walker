# Tasks

## Todo

- Write OpenAPI spec
- Create `vstaffs-sdk` using fern
- Publish `vstaffs-sdk` to npm
- Authenticate Concierge Walk and Chat endpoints excluding internal services, which ares Dashboard and Playground
- Create `walker-cli` using Ink and `vstaffs-sdk`
- Deploy `walker-cli` to npm
- Update Dashboard to use this new api.vstaffs.com endpoint using `vstaffs-sdk` package
- Update Playground to use this new api.vstaffs.com endpoint using `vstaffs-sdk` package
- Move from Prisma to Drizzle ORM
- Update OAuth client callbacks

## Backlog

- Register other package names `walker-svelte`, `walker-vue`, `walker-angular`, and `walker-prompts` to npm
- Error cases tests
- Spread config options
- Add none flow for none walk purposes
- Add `action.end: boolean` attribute in Action to declare walk ended to clean history, survey star, and cleanup callbacks
