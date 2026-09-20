import type { WalkerElementProps } from "walker-core";
import { useScope } from "@/hooks/useScope";
import slugify from "slugify";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      ["walker-element"]: WalkerElementProps;
    }
  }
}

export type ElementProps = Required<
  Pick<WalkerElementProps, "id" | "description">
> &
  Partial<WalkerElementProps> & {
    children?: React.ReactNode;
  };

export function Base(props: ElementProps) {
  const { active } = useScope(props.id);
  return (
    <walker-element
      id={slugify(props.id)}
      description={props.description}
      type={props.type ?? "item"}
      raw={false}
      content={false}
      scope={active}
      state={props.state ?? ""}
    >
      {props.children}
    </walker-element>
  );
}

export function Item(props: ElementProps) {
  return (
    <Base type="item" {...props}>
      {props.children}
    </Base>
  );
}

export function Page(props: ElementProps) {
  return (
    <Base type="page" {...props}>
      {props.children}
    </Base>
  );
}

export function Link(props: ElementProps) {
  return (
    <Base type="link" {...props}>
      {props.children}
    </Base>
  );
}

export function App(props: ElementProps) {
  return (
    <Base type="app" {...props}>
      {props.children}
    </Base>
  );
}
