/**
 * Dynamically call soft navigation if possible, else call hard navigation
 * @param {string} dest - The destination URL or path to navigate to.
 * @param {{ replace?: boolean }} [options] - Optional navigation settings.
 */
export function dynamicNavigator(dest: string, options?: { replace: boolean }) {
  if (window === undefined || document === undefined) return;

  return new Promise<void>((resolve) => {
    try {
      const url = new URL(dest, window.location.origin);

      const sameOrigin = url.origin === window.location.origin;

      // Soft navigation
      if (sameOrigin) {
        const handler = () => {
          window.removeEventListener('popstate', handler);
          resolve();
        };

        window.addEventListener('popstate', handler);

        if (options?.replace) {
          window.history.replaceState(
            {},
            '',
            url.pathname + url.search + url.hash,
          );
        } else {
          window.history.pushState(
            {},
            '',
            url.pathname + url.search + url.hash,
          );
        }

        window.dispatchEvent(
          new PopStateEvent('popstate', { state: window.history.state }),
        );
      } else {
        // Hard navigation
        if (options?.replace) {
          window.location.replace(dest);
        } else {
          window.location.assign(dest);
        }
        resolve();
      }
    } catch (error) {
      console.log('Navigator error: ' + error);

      // Navigate anyway
      if (options?.replace) {
        window.location.replace(dest);
      } else {
        window.location.assign(dest);
      }
      resolve();
    }
  });
}
