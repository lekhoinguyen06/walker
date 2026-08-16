import type { WalkerElementProps } from "@repo/core";
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

export function Base(props: BaseElementProps) {
  return <walker-element {...props}>{props.children}</walker-element>;
}

export type ItemElementProps = Pick<
  WalkerElementProps,
  "id" | "description"
> & {
  children?: React.ReactNode;
  value?: Record<string, any>;
};

export function Item(props: ItemElementProps) {
  return (
    <walker-element
      id={slugify(props.id)}
      type="item"
      description={props.description}
      value={JSON.stringify(props.value || {})}
    >
      {props.children}
    </walker-element>
  );
}

export type PageElementProps = Pick<
  WalkerElementProps,
  "id" | "description" | "scope"
> & {
  children?: React.ReactNode;
  value?: Record<string, any>;
};

export function Page(props: PageElementProps) {
  return (
    <walker-element
      id={slugify(props.id)}
      type="page"
      description={props.description}
      scope={props.scope}
      value={JSON.stringify(props.value || {})}
    >
      {props.children}
    </walker-element>
  );
}

export type AppElementProps = Pick<
  WalkerElementProps,
  "id" | "description" | "scope"
> & {
  children?: React.ReactNode;
  value?: Record<string, any>;
};

export function App(props: AppElementProps) {
  return (
    <walker-element
      id={slugify(props.id)}
      type="app"
      description={props.description}
      scope={props.scope}
      value={JSON.stringify(props.value || {})}
    >
      {props.children}
    </walker-element>
  );
}
