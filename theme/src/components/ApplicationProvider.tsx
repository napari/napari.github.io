import { StylesProvider, ThemeProvider } from '@material-ui/styles';
import NextPlausibleProvider from 'next-plausible';
import { ReactNode, useEffect } from 'react';

import { MediaContextProvider } from '@/components/media';
import { theme } from '@/theme';

interface ProviderProps {
  children: ReactNode;
}

/**
 * Provider for Material UI related features. This handles removing SSR styles
 * on the client and injects the theme object into the entire component tree.
 */
function MaterialUIProvider({ children }: ProviderProps) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    jssStyles?.parentElement?.removeChild?.(jssStyles);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <StylesProvider
        // By default, Material UI will inject styles at the bottom of the
        // body so that it has higher priority over other CSS rules. This
        // makes it harder to override CSS, so we use `injectFirst` to
        // inject styles in the head element instead:
        // https://material-ui.com/styles/advanced/#injectfirst
        injectFirst
      >
        {children}
      </StylesProvider>
    </ThemeProvider>
  );
}

/**
 * Provider for Plausible functionality. This works by fetching the
 * `plausible.js` script via `next-plausible` and providing a typed
 * `plausible()` function in `hooks/usePlausible.ts`.
 *
 * By default, data will be sent to https://plausible.io/dev.napari-hub.org
 * dashboard. For production, data will be sent to
 * https://plausible.io/napari-hub.org.
 */
function PlausibleProvider({ children }: ProviderProps) {
  return (
    <NextPlausibleProvider
      domain="napari.org"
      enabled={process.env.PLAUSIBLE === 'true'}
      trackOutboundLinks
    >
      {children}
    </NextPlausibleProvider>
  );
}

export function ApplicationProvider({ children }: ProviderProps) {
  return (
    <PlausibleProvider>
      <MediaContextProvider>
        <MaterialUIProvider>{children}</MaterialUIProvider>
      </MediaContextProvider>
    </PlausibleProvider>
  );
}
