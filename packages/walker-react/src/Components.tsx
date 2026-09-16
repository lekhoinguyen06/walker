import type { WalkerElementProps } from "walker-core";
import slugify from "slugify";
import { useActive } from "./useActive";

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

export type ElementProps = BaseElementProps;

export function Base(props: BaseElementProps) {
  const { active } = useActive(slugify(props.id));
  return (
    <walker-element {...props} id={slugify(props.id)} scope={active}>
      {props.children}
    </walker-element>
  );
}

export function Item(props: ElementProps) {
  const { active } = useActive(slugify(props.id));
  return (
    <walker-element
      {...props}
      id={slugify(props.id)}
      type="item"
      scope={active}
    >
      {props.children}
    </walker-element>
  );
}

export function Page(props: ElementProps) {
  const { active } = useActive(slugify(props.id));
  return (
    <walker-element
      {...props}
      id={slugify(props.id)}
      type="page"
      scope={active}
    >
      {props.children}
    </walker-element>
  );
}

export function App(props: ElementProps) {
  const { active } = useActive(slugify(props.id));
  console.log("Is in active scope", active);
  return (
    <walker-element {...props} id={slugify(props.id)} type="app" scope={active}>
      {props.children}
    </walker-element>
  );
}
