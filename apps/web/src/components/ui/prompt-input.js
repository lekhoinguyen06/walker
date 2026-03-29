'use client';
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
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import React, { createContext, useContext, useLayoutEffect, useRef, useState, } from 'react';
var PromptInputContext = createContext({
    isLoading: false,
    value: '',
    setValue: function () { },
    maxHeight: 240,
    onSubmit: undefined,
    disabled: false,
    textareaRef: React.createRef(),
});
function usePromptInput() {
    return useContext(PromptInputContext);
}
function PromptInput(_a) {
    var className = _a.className, _b = _a.isLoading, isLoading = _b === void 0 ? false : _b, _c = _a.maxHeight, maxHeight = _c === void 0 ? 240 : _c, value = _a.value, onValueChange = _a.onValueChange, onSubmit = _a.onSubmit, children = _a.children, _d = _a.disabled, disabled = _d === void 0 ? false : _d, onClick = _a.onClick, props = __rest(_a, ["className", "isLoading", "maxHeight", "value", "onValueChange", "onSubmit", "children", "disabled", "onClick"]);
    var _e = useState(value || ''), internalValue = _e[0], setInternalValue = _e[1];
    var textareaRef = useRef(null);
    var handleChange = function (newValue) {
        setInternalValue(newValue);
        onValueChange === null || onValueChange === void 0 ? void 0 : onValueChange(newValue);
    };
    var handleClick = function (e) {
        var _a;
        if (!disabled)
            (_a = textareaRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        onClick === null || onClick === void 0 ? void 0 : onClick(e);
    };
    return (<TooltipProvider>
      <PromptInputContext.Provider value={{
            isLoading: isLoading,
            value: value !== null && value !== void 0 ? value : internalValue,
            setValue: onValueChange !== null && onValueChange !== void 0 ? onValueChange : handleChange,
            maxHeight: maxHeight,
            onSubmit: onSubmit,
            disabled: disabled,
            textareaRef: textareaRef,
        }}>
        <div onClick={handleClick} className={cn('border-input bg-background cursor-text rounded-3xl border p-2 shadow-xs', disabled && 'cursor-not-allowed opacity-60', className)} {...props}>
          {children}
        </div>
      </PromptInputContext.Provider>
    </TooltipProvider>);
}
function PromptInputTextarea(_a) {
    var className = _a.className, onKeyDown = _a.onKeyDown, _b = _a.disableAutosize, disableAutosize = _b === void 0 ? false : _b, props = __rest(_a, ["className", "onKeyDown", "disableAutosize"]);
    var _c = usePromptInput(), value = _c.value, setValue = _c.setValue, maxHeight = _c.maxHeight, onSubmit = _c.onSubmit, disabled = _c.disabled, textareaRef = _c.textareaRef;
    var adjustHeight = function (el) {
        if (!el || disableAutosize)
            return;
        el.style.height = 'auto';
        if (typeof maxHeight === 'number') {
            el.style.height = "".concat(Math.min(el.scrollHeight, maxHeight), "px");
        }
        else {
            el.style.height = "min(".concat(el.scrollHeight, "px, ").concat(maxHeight, ")");
        }
    };
    var handleRef = function (el) {
        textareaRef.current = el;
        adjustHeight(el);
    };
    useLayoutEffect(function () {
        if (!textareaRef.current || disableAutosize)
            return;
        var el = textareaRef.current;
        el.style.height = 'auto';
        if (typeof maxHeight === 'number') {
            el.style.height = "".concat(Math.min(el.scrollHeight, maxHeight), "px");
        }
        else {
            el.style.height = "min(".concat(el.scrollHeight, "px, ").concat(maxHeight, ")");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, maxHeight, disableAutosize]);
    var handleChange = function (e) {
        adjustHeight(e.target);
        setValue(e.target.value);
    };
    var handleKeyDown = function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSubmit === null || onSubmit === void 0 ? void 0 : onSubmit();
        }
        onKeyDown === null || onKeyDown === void 0 ? void 0 : onKeyDown(e);
    };
    return (<Textarea ref={handleRef} value={value} onChange={handleChange} onKeyDown={handleKeyDown} className={cn('text-primary min-h-[44px] w-full resize-none border-none bg-transparent shadow-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0', className)} rows={1} disabled={disabled} {...props}/>);
}
function PromptInputActions(_a) {
    var children = _a.children, className = _a.className, props = __rest(_a, ["children", "className"]);
    return (<div className={cn('flex items-center gap-2', className)} {...props}>
      {children}
    </div>);
}
function PromptInputAction(_a) {
    var tooltip = _a.tooltip, children = _a.children, className = _a.className, _b = _a.side, side = _b === void 0 ? 'top' : _b, props = __rest(_a, ["tooltip", "children", "className", "side"]);
    var disabled = usePromptInput().disabled;
    return (<Tooltip {...props}>
      <TooltipTrigger asChild disabled={disabled} onClick={function (event) { return event.stopPropagation(); }}>
        {children}
      </TooltipTrigger>
      <TooltipContent side={side} className={className}>
        {tooltip}
      </TooltipContent>
    </Tooltip>);
}
export { PromptInput, PromptInputTextarea, PromptInputActions, PromptInputAction, };
