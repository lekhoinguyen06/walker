import type { WalkerElementProps } from "@repo/core";
import slugify from "slugify";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      ["walker-element"]: WalkerElementProps;
    }
  }
}

export function Item(
  props: Pick<WalkerElementProps, "id" | "description"> & {
    children?: React.ReactNode;
  },
) {
  return (
    <walker-element
      id={slugify(props.id)}
      type="item"
      description={props.description}
    >
      {props.children}
    </walker-element>
  );
}

export function Page(
  props: Pick<WalkerElementProps, "id" | "description"> & {
    children?: React.ReactNode;
  },
) {
  return (
    <walker-element
      id={slugify(props.id)}
      type="page"
      description={props.description}
    >
      {props.children}
    </walker-element>
  );
}

export function App(
  props: Pick<WalkerElementProps, "id" | "description"> & {
    children?: React.ReactNode;
  },
) {
  return (
    <walker-element
      id={slugify(props.id)}
      type="app"
      description={props.description}
    >
      {props.children}
    </walker-element>
  );
}
