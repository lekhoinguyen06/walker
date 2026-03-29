import { Textarea } from '@/components/ui/textarea';
import { Tooltip } from '@/components/ui/tooltip';
import React from 'react';
export type PromptInputProps = {
    isLoading?: boolean;
    value?: string;
    onValueChange?: (value: string) => void;
    maxHeight?: number | string;
    onSubmit?: () => void;
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
} & React.ComponentProps<'div'>;
declare function PromptInput({ className, isLoading, maxHeight, value, onValueChange, onSubmit, children, disabled, onClick, ...props }: PromptInputProps): React.JSX.Element;
export type PromptInputTextareaProps = {
    disableAutosize?: boolean;
} & React.ComponentProps<typeof Textarea>;
declare function PromptInputTextarea({ className, onKeyDown, disableAutosize, ...props }: PromptInputTextareaProps): React.JSX.Element;
export type PromptInputActionsProps = React.HTMLAttributes<HTMLDivElement>;
declare function PromptInputActions({ children, className, ...props }: PromptInputActionsProps): React.JSX.Element;
export type PromptInputActionProps = {
    className?: string;
    tooltip: React.ReactNode;
    children: React.ReactNode;
    side?: 'top' | 'bottom' | 'left' | 'right';
} & React.ComponentProps<typeof Tooltip>;
declare function PromptInputAction({ tooltip, children, className, side, ...props }: PromptInputActionProps): React.JSX.Element;
export { PromptInput, PromptInputTextarea, PromptInputActions, PromptInputAction, };
//# sourceMappingURL=prompt-input.d.ts.map