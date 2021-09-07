import 'modern-normalize/modern-normalize.css';
import '@/scss/tailwind.scss';
import '@/scss/main.scss';

import { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
