export async function wait(ms: number) {
  // logger({ title: "WAIT", content: "Waiting" + ms + "ms" })
  return new Promise((resolve) => setTimeout(resolve, ms));
}
