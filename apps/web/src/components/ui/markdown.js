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
import { marked } from 'marked';
import { memo, useId, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import { CodeBlock, CodeBlockCode } from './code-block';
function parseMarkdownIntoBlocks(markdown) {
    var tokens = marked.lexer(markdown);
    return tokens.map(function (token) { return token.raw; });
}
function extractLanguage(className) {
    if (!className)
        return 'plaintext';
    var match = className.match(/language-(\w+)/);
    return match ? match[1] : 'plaintext';
}
var INITIAL_COMPONENTS = {
    code: function CodeComponent(_a) {
        var _b, _c, _d, _e, _f, _g;
        var className = _a.className, children = _a.children, props = __rest(_a, ["className", "children"]);
        var isInline = !((_c = (_b = props.node) === null || _b === void 0 ? void 0 : _b.position) === null || _c === void 0 ? void 0 : _c.start.line) ||
            ((_e = (_d = props.node) === null || _d === void 0 ? void 0 : _d.position) === null || _e === void 0 ? void 0 : _e.start.line) === ((_g = (_f = props.node) === null || _f === void 0 ? void 0 : _f.position) === null || _g === void 0 ? void 0 : _g.end.line);
        if (isInline) {
            return (<span className={cn('bg-primary-foreground rounded-sm px-1 font-mono text-sm', className)} {...props}>
          {children}
        </span>);
        }
        var language = extractLanguage(className);
        return (<CodeBlock className={className}>
        <CodeBlockCode code={children} language={language}/>
      </CodeBlock>);
    },
    pre: function PreComponent(_a) {
        var children = _a.children;
        return <>{children}</>;
    },
};
var MemoizedMarkdownBlock = memo(function MarkdownBlock(_a) {
    var content = _a.content, _b = _a.components, components = _b === void 0 ? INITIAL_COMPONENTS : _b;
    return (<ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]} components={components}>
        {content}
      </ReactMarkdown>);
}, function propsAreEqual(prevProps, nextProps) {
    return prevProps.content === nextProps.content;
});
MemoizedMarkdownBlock.displayName = 'MemoizedMarkdownBlock';
function MarkdownComponent(_a) {
    var children = _a.children, id = _a.id, className = _a.className, _b = _a.components, components = _b === void 0 ? INITIAL_COMPONENTS : _b;
    var generatedId = useId();
    var blockId = id !== null && id !== void 0 ? id : generatedId;
    var blocks = useMemo(function () { return parseMarkdownIntoBlocks(children); }, [children]);
    return (<div className={className}>
      {blocks.map(function (block, index) { return (<MemoizedMarkdownBlock key={"".concat(blockId, "-block-").concat(index)} content={block} components={components}/>); })}
    </div>);
}
var Markdown = memo(MarkdownComponent);
Markdown.displayName = 'Markdown';
export { Markdown };
