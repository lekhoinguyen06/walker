type WalkerErrorProps = {
  retry?: boolean;
  message: string;
  log?: string;
};

export class WalkerError extends Error {
  retry: boolean;
  log?: string;
  constructor(props: WalkerErrorProps) {
    super(props.message);
    this.name = "WalkerError";
    this.retry = props.retry ?? true;
    this.log = props.log;
  }
}

export const WALKER_MISTAKE_MSG = "Walker is making a mistake, hang on.";
export const DEVELOPER_MISTAKE_MSG =
  "Something went wrong, please contact developer.";
