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
import * as React from 'react';
import { cn } from '@/lib/utils';
var Card = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (<div ref={ref} className={cn('rounded-xl border bg-card text-card-foreground shadow', className)} {...props}/>);
});
Card.displayName = 'Card';
var CardHeader = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (<div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props}/>);
});
CardHeader.displayName = 'CardHeader';
var CardTitle = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (<div ref={ref} className={cn('font-semibold leading-none tracking-tight', className)} {...props}/>);
});
CardTitle.displayName = 'CardTitle';
var CardDescription = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (<div ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props}/>);
});
CardDescription.displayName = 'CardDescription';
var CardContent = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (<div ref={ref} className={cn('p-6 pt-0', className)} {...props}/>);
});
CardContent.displayName = 'CardContent';
var CardFooter = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (<div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props}/>);
});
CardFooter.displayName = 'CardFooter';
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, };
