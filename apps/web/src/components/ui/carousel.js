var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
import * as React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
var CarouselContext = React.createContext(null);
function useCarousel() {
    var context = React.useContext(CarouselContext);
    if (!context) {
        throw new Error('useCarousel must be used within a <Carousel />');
    }
    return context;
}
var Carousel = React.forwardRef(function (_a, ref) {
    var _b = _a.orientation, orientation = _b === void 0 ? 'horizontal' : _b, opts = _a.opts, setApi = _a.setApi, plugins = _a.plugins, className = _a.className, children = _a.children, props = __rest(_a, ["orientation", "opts", "setApi", "plugins", "className", "children"]);
    var _c = useEmblaCarousel(__assign(__assign({}, opts), { axis: orientation === 'horizontal' ? 'x' : 'y' }), plugins), carouselRef = _c[0], api = _c[1];
    var _d = React.useState(false), canScrollPrev = _d[0], setCanScrollPrev = _d[1];
    var _e = React.useState(false), canScrollNext = _e[0], setCanScrollNext = _e[1];
    var onSelect = React.useCallback(function (api) {
        if (!api) {
            return;
        }
        setCanScrollPrev(api.canScrollPrev());
        setCanScrollNext(api.canScrollNext());
    }, []);
    var scrollPrev = React.useCallback(function () {
        api === null || api === void 0 ? void 0 : api.scrollPrev();
    }, [api]);
    var scrollNext = React.useCallback(function () {
        api === null || api === void 0 ? void 0 : api.scrollNext();
    }, [api]);
    var handleKeyDown = React.useCallback(function (event) {
        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            scrollPrev();
        }
        else if (event.key === 'ArrowRight') {
            event.preventDefault();
            scrollNext();
        }
    }, [scrollPrev, scrollNext]);
    React.useEffect(function () {
        if (!api || !setApi) {
            return;
        }
        setApi(api);
    }, [api, setApi]);
    React.useEffect(function () {
        if (!api) {
            return;
        }
        onSelect(api);
        api.on('reInit', onSelect);
        api.on('select', onSelect);
        return function () {
            api === null || api === void 0 ? void 0 : api.off('select', onSelect);
        };
    }, [api, onSelect]);
    return (<CarouselContext.Provider value={{
            carouselRef: carouselRef,
            api: api,
            opts: opts,
            orientation: orientation || ((opts === null || opts === void 0 ? void 0 : opts.axis) === 'y' ? 'vertical' : 'horizontal'),
            scrollPrev: scrollPrev,
            scrollNext: scrollNext,
            canScrollPrev: canScrollPrev,
            canScrollNext: canScrollNext,
        }}>
        <div ref={ref} onKeyDownCapture={handleKeyDown} className={cn('relative', className)} role="region" aria-roledescription="carousel" {...props}>
          {children}
        </div>
      </CarouselContext.Provider>);
});
Carousel.displayName = 'Carousel';
var CarouselContent = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    var _b = useCarousel(), carouselRef = _b.carouselRef, orientation = _b.orientation;
    return (<div ref={carouselRef} className="overflow-hidden">
      <div ref={ref} className={cn('flex', orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col', className)} {...props}/>
    </div>);
});
CarouselContent.displayName = 'CarouselContent';
var CarouselItem = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    var orientation = useCarousel().orientation;
    return (<div ref={ref} role="group" aria-roledescription="slide" className={cn('min-w-0 shrink-0 grow-0 basis-full', orientation === 'horizontal' ? 'pl-4' : 'pt-4', className)} {...props}/>);
});
CarouselItem.displayName = 'CarouselItem';
var CarouselPrevious = React.forwardRef(function (_a, ref) {
    var className = _a.className, _b = _a.variant, variant = _b === void 0 ? 'outline' : _b, _c = _a.size, size = _c === void 0 ? 'icon' : _c, props = __rest(_a, ["className", "variant", "size"]);
    var _d = useCarousel(), orientation = _d.orientation, scrollPrev = _d.scrollPrev, canScrollPrev = _d.canScrollPrev;
    return (<Button ref={ref} variant={variant} size={size} className={cn('absolute  h-8 w-8 rounded-full', orientation === 'horizontal'
            ? '-left-12 top-1/2 -translate-y-1/2'
            : '-top-12 left-1/2 -translate-x-1/2 rotate-90', className)} disabled={!canScrollPrev} onClick={scrollPrev} {...props}>
      <ArrowLeft className="h-4 w-4"/>
      <span className="sr-only">Previous slide</span>
    </Button>);
});
CarouselPrevious.displayName = 'CarouselPrevious';
var CarouselNext = React.forwardRef(function (_a, ref) {
    var className = _a.className, _b = _a.variant, variant = _b === void 0 ? 'outline' : _b, _c = _a.size, size = _c === void 0 ? 'icon' : _c, props = __rest(_a, ["className", "variant", "size"]);
    var _d = useCarousel(), orientation = _d.orientation, scrollNext = _d.scrollNext, canScrollNext = _d.canScrollNext;
    return (<Button ref={ref} variant={variant} size={size} className={cn('absolute h-8 w-8 rounded-full', orientation === 'horizontal'
            ? '-right-12 top-1/2 -translate-y-1/2'
            : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90', className)} disabled={!canScrollNext} onClick={scrollNext} {...props}>
      <ArrowRight className="h-4 w-4"/>
      <span className="sr-only">Next slide</span>
    </Button>);
});
CarouselNext.displayName = 'CarouselNext';
export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, };
