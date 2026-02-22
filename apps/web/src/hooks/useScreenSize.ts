import { BREAKPOINTS } from '@/constants/breakpoint';
import { useMediaQuery } from 'usehooks-ts';

export function useScreenSize() {
  const isSmall = useMediaQuery(`(max-width: ${BREAKPOINTS.md - 1}px)`);
  const isMedium = useMediaQuery(
    `(min-width: ${BREAKPOINTS.md}px) and (max-width: ${BREAKPOINTS.lg - 1}px)`,
  );
  const isLarge = useMediaQuery(`(min-width: ${BREAKPOINTS.lg}px)`);

  return {
    isSmall,
    isMedium,
    isLarge,
  };
}
