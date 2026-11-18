type WalkerErrorProps = {
  retry?: boolean;
  message: string;
};

export class WalkerError extends Error {
  retry: boolean;
  constructor(props: WalkerErrorProps) {
    super(props.retry ? props.message + " Retrying..." : props.message);
    this.name = "WalkerError";
    this.retry = props.retry ?? true;
  }
}
