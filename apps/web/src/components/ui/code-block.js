var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
import React, { useEffect, useState } from 'react';
import { codeToHtml } from 'shiki';
function CodeBlock(_a) {
    var children = _a.children, className = _a.className, props = __rest(_a, ["children", "className"]);
    return (<div className={cn('not-prose flex w-full flex-col overflow-clip border', 'border-border bg-card text-card-foreground rounded-xl', className)} {...props}>
      {children}
    </div>);
}
function CodeBlockCode(_a) {
    var code = _a.code, _b = _a.language, language = _b === void 0 ? 'tsx' : _b, _c = _a.theme, theme = _c === void 0 ? 'github-light' : _c, className = _a.className, props = __rest(_a, ["code", "language", "theme", "className"]);
    var _d = useState(null), highlightedHtml = _d[0], setHighlightedHtml = _d[1];
    useEffect(function () {
        function highlight() {
            return __awaiter(this, void 0, void 0, function () {
                var html;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!code) {
                                setHighlightedHtml('<pre><code></code></pre>');
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, codeToHtml(code, { lang: language, theme: theme })];
                        case 1:
                            html = _a.sent();
                            setHighlightedHtml(html);
                            return [2 /*return*/];
                    }
                });
            });
        }
        highlight();
    }, [code, language, theme]);
    var classNames = cn('w-full overflow-x-auto text-[13px] [&>pre]:px-4 [&>pre]:py-4', className);
    // SSR fallback: render plain code if not hydrated yet
    return highlightedHtml ? (<div className={classNames} dangerouslySetInnerHTML={{ __html: highlightedHtml }} {...props}/>) : (<div className={classNames} {...props}>
      <pre>
        <code>{code}</code>
      </pre>
    </div>);
}
function CodeBlockGroup(_a) {
    var children = _a.children, className = _a.className, props = __rest(_a, ["children", "className"]);
    return (<div className={cn('flex items-center justify-between', className)} {...props}>
      {children}
    </div>);
}
export { CodeBlockGroup, CodeBlockCode, CodeBlock };
