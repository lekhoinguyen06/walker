import type { WalkerElement, WalkerElementProps } from "@repo/core";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      walker: WalkerElementProps;
    }
  }
}

export function Item(props: WalkerElementProps) {
  return <walker key={props.key} type="item" description={props.description} />;
}

export function Page(props: WalkerElementProps) {
  return <walker key={props.key} type="page" description={props.description} />;
}
