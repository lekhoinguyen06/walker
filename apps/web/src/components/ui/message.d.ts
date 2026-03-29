import { Tooltip } from '@/components/ui/tooltip';
import { Markdown } from './markdown';
export type MessageProps = {
    children: React.ReactNode;
    className?: string;
} & React.HTMLProps<HTMLDivElement>;
declare const Message: ({ children, className, ...props }: MessageProps) => import("react").JSX.Element;
export type MessageAvatarProps = {
    src: string;
    alt: string;
    fallback?: string;
    delayMs?: number;
    className?: string;
};
declare const MessageAvatar: ({ src, alt, fallback, delayMs, className, }: MessageAvatarProps) => import("react").JSX.Element;
export type MessageContentProps = {
    children: React.ReactNode;
    markdown?: boolean;
    className?: string;
} & React.ComponentProps<typeof Markdown> & React.HTMLProps<HTMLDivElement>;
declare const MessageContent: ({ children, markdown, className, ...props }: MessageContentProps) => import("react").JSX.Element;
export type MessageActionsProps = {
    children: React.ReactNode;
    className?: string;
} & React.HTMLProps<HTMLDivElement>;
declare const MessageActions: ({ children, className, ...props }: MessageActionsProps) => import("react").JSX.Element;
export type MessageActionProps = {
    className?: string;
    tooltip: React.ReactNode;
    children: React.ReactNode;
    side?: 'top' | 'bottom' | 'left' | 'right';
} & React.ComponentProps<typeof Tooltip>;
declare const MessageAction: ({ tooltip, children, className, side, ...props }: MessageActionProps) => import("react").JSX.Element;
export { Message, MessageAvatar, MessageContent, MessageActions, MessageAction, };
//# sourceMappingURL=message.d.ts.map