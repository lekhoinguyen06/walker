import {
  ObservedAttributes,
  type ItemType,
  type ObservedAttributesType,
} from "walker-core";
import { useScope } from "@/hooks/useScope";
import slugify from "slugify";

export interface WalkerElementProps<T = unknown> extends ItemType {
  children?: T;
}

export class WalkerElement extends HTMLElement {
  constructor(props: WalkerElementProps) {
    super();
  }

  static observedAttributes: readonly ObservedAttributesType[] =
    ObservedAttributes;
}

customElements.define("walker-element", WalkerElement);

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
      refId={props.refId ?? null}
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
