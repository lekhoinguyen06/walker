import { cn } from '@/lib/utils';
import React from 'react';

type TypoProp = {
  children?: React.ReactNode;
  className?: string;
};

export function TH1({ children, className }: TypoProp) {
  return (
    <h1
      className={cn(
        'scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance',
        className,
      )}
    >
      {children}
    </h1>
  );
}

export function TH2({ children, className }: TypoProp) {
  return (
    <h2
      className={cn(
        'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function TH3({ children, className }: TypoProp) {
  return (
    <h3
      className={cn(
        'scroll-m-20 text-2xl font-semibold tracking-tight',
        className,
      )}
    >
      {children}
    </h3>
  );
}

export function TH4({ children, className }: TypoProp) {
  return (
    <h4
      className={cn(
        'scroll-m-20 text-xl font-semibold tracking-tight',
        className,
      )}
    >
      {children}
    </h4>
  );
}

export function TLarge({ children, className }: TypoProp) {
  return (
    <div className={cn('text-lg font-semibold', className)}>{children}</div>
  );
}

export function TMuted({ children, className }: TypoProp) {
  return (
    <p className={cn('text-muted-foreground text-sm', className)}>{children}</p>
  );
}

export function TPara({ children, className }: TypoProp) {
  return (
    <p className={cn('leading-7 not-first:mt-6', className)}>{children}</p>
  );
}

export function TSmall({ children, className }: TypoProp) {
  return (
    <small className={cn('text-sm leading-none font-medium', className)}>
      {children}
    </small>
  );
}

type TypoListProp = {
  list: string[];
  className?: string;
};

export function TList({ list, className }: TypoListProp) {
  return (
    <ul className={cn('my-6 ml-6 list-disc [&>li]:mt-2', className)}>
      {list.map((each, i) => (
        <li key={i}>{each}</li>
      ))}
    </ul>
  );
}
