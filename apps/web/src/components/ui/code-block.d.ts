import React from 'react';
export type CodeBlockProps = {
  children?: React.ReactNode;
  className?: string;
} & React.HTMLProps<HTMLDivElement>;
declare function CodeBlock({
  children,
  className,
  ...props
}: CodeBlockProps): React.JSX.Element;
export type CodeBlockCodeProps = {
  code: string;
  language?: string;
  theme?: string;
  className?: string;
} & React.HTMLProps<HTMLDivElement>;
declare function CodeBlockCode({
  code,
  language,
  theme,
  className,
  ...props
}: CodeBlockCodeProps): React.JSX.Element;
export type CodeBlockGroupProps = React.HTMLAttributes<HTMLDivElement>;
declare function CodeBlockGroup({
  children,
  className,
  ...props
}: CodeBlockGroupProps): React.JSX.Element;
export { CodeBlockGroup, CodeBlockCode, CodeBlock };
//# sourceMappingURL=code-block.d.ts.map
