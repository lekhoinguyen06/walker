var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { cn } from '@/lib/utils';
import { StickToBottom } from 'use-stick-to-bottom';
function ChatContainerRoot(_a) {
    var children = _a.children, className = _a.className, props = __rest(_a, ["children", "className"]);
    return (<StickToBottom className={cn('flex overflow-y-auto', className)} resize="smooth" initial="instant" role="log" {...props}>
      {children}
    </StickToBottom>);
}
function ChatContainerContent(_a) {
    var children = _a.children, className = _a.className, props = __rest(_a, ["children", "className"]);
    return (<StickToBottom.Content className={cn('flex w-full flex-col', className)} {...props}>
      {children}
    </StickToBottom.Content>);
}
function ChatContainerScrollAnchor(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (<div className={cn('h-px w-full shrink-0 scroll-mt-4', className)} aria-hidden="true" {...props}/>);
}
export { ChatContainerRoot, ChatContainerContent, ChatContainerScrollAnchor };
