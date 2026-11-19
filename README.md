<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./assets/dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="./assets/light.svg">
  <img alt="Walker" src="./assets/light.svg">
</picture>

Walk the web, walk the earth.

## Why

The world is not building for the observers. We building Walker for those who care about what they do. We are building the world for **people to work with their agents**, rather than agents working for them.

## How

We are building libraries for both frontend and backend frameworks to become Walker. Essentially, we are sending JSON objects.

Here is the flow. The Walker Client sends a Map of Items to the Walker Server. Walker Server then returns an Action to the Walker Client. The Walker Client holds Flows, which decide which type of Action it accepts and a handler to execute. That's it! Anything else is up to the developer.

## Where

You can imagine Walker as an extension arm for MCP, or Model Client Protocal :) Your chat agent can now send back a text message, what we call a Walker Guide. If your user like it, they can copy it and paste it into the Walker Panel.

A little comparison between the three:

|             | Browser/device control agents                  | MCP                        | Walker                 |
| ----------- | ---------------------------------------------- | -------------------------- | ---------------------- |
| Observable? | ✓ (see everything, even sensitive information) | ✗ (only lines of thoughts) | ✓ (click, input, etc.) |
| Context?    | ✗ (unless your app is popular)                 | ✓                          | ✓                      |
| Experience? | ✗ (depends on the agent application)           | ✓ (no interaction)         | ✓ (by you)             |
| Interface?  | ✗ (depends on the agent application)           | ✓ (only in chat box)       | ✓ (by you)             |
