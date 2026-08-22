import type { WalkerElementProps } from "walker-core";
import slugify from "slugify";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      ["walker-element"]: WalkerElementProps;
    }
  }
}

export type BaseElementProps = WalkerElementProps & {
  children?: React.ReactNode;
};

export type ElementProps = Omit<WalkerElementProps, "type" | "scope"> & {
  scope?: WalkerElementProps["scope"];
  children?: React.ReactNode;
};

export function Base(props: BaseElementProps) {
  return <walker-element {...props}>{props.children}</walker-element>;
}

export function Item(props: ElementProps) {
  return (
    <walker-element
      {...props}
      id={slugify(props.id)}
      type="item"
      scope={props.scope ? props.scope : "inactive"}
    >
      {props.children}
    </walker-element>
  );
}

export function Page(props: ElementProps) {
  return (
    <walker-element
      {...props}
      id={slugify(props.id)}
      type="page"
      scope={props.scope ? props.scope : "inactive"}
    >
      {props.children}
    </walker-element>
  );
}

export function App(props: ElementProps) {
  return (
    <walker-element
      {...props}
      id={slugify(props.id)}
      type="app"
      scope={props.scope ? props.scope : "active"}
    >
      {props.children}
    </walker-element>
  );
}
