import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';
import store from './app/store';
import { router } from './routes/router';
import './styles/websiteBase.less';

const domNode = document.getElementById('app');
if (!domNode) {
  throw new Error('Root element not found. Ensure index.html has <div id="app"></div>');
}
const root = createRoot(domNode);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);