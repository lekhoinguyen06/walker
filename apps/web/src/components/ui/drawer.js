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
import { Drawer as DrawerPrimitive } from 'vaul';
import { cn } from '@/lib/utils';
var Drawer = function (_a) {
    var _b = _a.shouldScaleBackground, shouldScaleBackground = _b === void 0 ? true : _b, props = __rest(_a, ["shouldScaleBackground"]);
    return (<DrawerPrimitive.Root shouldScaleBackground={shouldScaleBackground} {...props}/>);
};
Drawer.displayName = 'Drawer';
var DrawerTrigger = DrawerPrimitive.Trigger;
var DrawerPortal = DrawerPrimitive.Portal;
var DrawerClose = DrawerPrimitive.Close;
var DrawerOverlay = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (<DrawerPrimitive.Overlay ref={ref} className={cn('fixed inset-0 z-50 bg-black/80', className)} {...props}/>);
});
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;
var DrawerContent = React.forwardRef(function (_a, ref) {
    var className = _a.className, children = _a.children, props = __rest(_a, ["className", "children"]);
    return (<DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content ref={ref} className={cn('fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background', className)} {...props}>
      <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted"/>
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>);
});
DrawerContent.displayName = 'DrawerContent';
var DrawerHeader = function (_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (<div className={cn('grid gap-1.5 p-4 text-center sm:text-left', className)} {...props}/>);
};
DrawerHeader.displayName = 'DrawerHeader';
var DrawerFooter = function (_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (<div className={cn('mt-auto flex flex-col gap-2 p-4', className)} {...props}/>);
};
DrawerFooter.displayName = 'DrawerFooter';
var DrawerTitle = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (<DrawerPrimitive.Title ref={ref} className={cn('text-lg font-semibold leading-none tracking-tight', className)} {...props}/>);
});
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;
var DrawerDescription = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (<DrawerPrimitive.Description ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props}/>);
});
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;
export { Drawer, DrawerPortal, DrawerOverlay, DrawerTrigger, DrawerClose, DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle, DrawerDescription, };
