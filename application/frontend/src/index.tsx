import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import store from './app/store';
import { router } from './routes/router';
import './styles/websiteBase.less';

const domNode = document.getElementById('app')!;
const root = createRoot(domNode);

const App = () => {
	return (
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	);
};

root.render(<App />);