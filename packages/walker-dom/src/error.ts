export class WalkerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "WalkerError";
  }
}
