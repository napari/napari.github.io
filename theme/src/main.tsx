import { hydrate } from 'react-dom';

import { App } from '@/components/App';
import { JupyterBookProvider } from '@/context/jupyterBook';

const body = document.querySelector('body');
body?.classList.remove('no-js');

hydrate(
  <JupyterBookProvider>
    <App />
  </JupyterBookProvider>,
  document.getElementById('app'),
);
