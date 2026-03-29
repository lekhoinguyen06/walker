import { Components } from 'react-markdown';
export type MarkdownProps = {
  children: string;
  id?: string;
  className?: string;
  components?: Partial<Components>;
};
declare function MarkdownComponent({
  children,
  id,
  className,
  components,
}: MarkdownProps): import('react').JSX.Element;
declare const Markdown: import('react').MemoExoticComponent<
  typeof MarkdownComponent
>;
export { Markdown };
//# sourceMappingURL=markdown.d.ts.map
