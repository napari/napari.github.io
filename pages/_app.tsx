import 'modern-normalize/modern-normalize.css';
import '@/scss/tailwind.scss';
import '@/scss/global.scss';

import { AppProps } from 'next/app';

import { ApplicationProvider } from '@/components/ApplicationProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApplicationProvider>
      <Component {...pageProps} />
    </ApplicationProvider>
  );
}
