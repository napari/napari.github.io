import 'modern-normalize/modern-normalize.css';
import '@/scss/tailwind.scss';
import '@/scss/global.scss';

import dayjs from 'dayjs';
import isSameOrBeforePlugin from 'dayjs/plugin/isSameOrBefore';
import { AppProps } from 'next/app';

import { ApplicationProvider } from '@/components/ApplicationProvider';

dayjs.extend(isSameOrBeforePlugin);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApplicationProvider>
      <Component {...pageProps} />
    </ApplicationProvider>
  );
}
