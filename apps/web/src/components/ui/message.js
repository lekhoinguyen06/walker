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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Markdown } from './markdown';
var Message = function (_a) {
    var children = _a.children, className = _a.className, props = __rest(_a, ["children", "className"]);
    return (<div className={cn('flex gap-3', className)} {...props}>
    {children}
  </div>);
};
var MessageAvatar = function (_a) {
    var src = _a.src, alt = _a.alt, fallback = _a.fallback, delayMs = _a.delayMs, className = _a.className;
    return (<Avatar className={cn('h-8 w-8 shrink-0', className)}>
      <AvatarImage src={src} alt={alt}/>
      {fallback && (<AvatarFallback delayMs={delayMs}>{fallback}</AvatarFallback>)}
    </Avatar>);
};
var MessageContent = function (_a) {
    var children = _a.children, _b = _a.markdown, markdown = _b === void 0 ? false : _b, className = _a.className, props = __rest(_a, ["children", "markdown", "className"]);
    var classNames = cn('rounded-lg p-2 text-foreground bg-secondary prose break-words whitespace-normal', className);
    return markdown ? (<Markdown className={classNames} {...props}>
      {children}
    </Markdown>) : (<div className={classNames} {...props}>
      {children}
    </div>);
};
var MessageActions = function (_a) {
    var children = _a.children, className = _a.className, props = __rest(_a, ["children", "className"]);
    return (<div className={cn('text-muted-foreground flex items-center gap-2', className)} {...props}>
    {children}
  </div>);
};
var MessageAction = function (_a) {
    var tooltip = _a.tooltip, children = _a.children, className = _a.className, _b = _a.side, side = _b === void 0 ? 'top' : _b, props = __rest(_a, ["tooltip", "children", "className", "side"]);
    return (<TooltipProvider>
      <Tooltip {...props}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side} className={className}>
          {tooltip}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>);
};
export { Message, MessageAvatar, MessageContent, MessageActions, MessageAction, };
