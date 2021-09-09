import { StylesProvider, ThemeProvider } from '@material-ui/styles';
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

export function ApplicationProvider({ children }: ProviderProps) {
  return (
    <MediaContextProvider>
      <MaterialUIProvider>{children}</MaterialUIProvider>
    </MediaContextProvider>
  );
}
