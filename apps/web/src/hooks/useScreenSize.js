import { BREAKPOINTS } from '@/constants/breakpoint';
import { useMediaQuery } from 'usehooks-ts';
export function useScreenSize() {
    var isSmall = useMediaQuery("(max-width: ".concat(BREAKPOINTS.md - 1, "px)"));
    var isMedium = useMediaQuery("(min-width: ".concat(BREAKPOINTS.md, "px) and (max-width: ").concat(BREAKPOINTS.lg - 1, "px)"));
    var isLarge = useMediaQuery("(min-width: ".concat(BREAKPOINTS.lg, "px)"));
    return {
        isSmall: isSmall,
        isMedium: isMedium,
        isLarge: isLarge,
    };
}
