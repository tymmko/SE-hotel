import * as React from 'react';
import { createRoot } from 'react-dom/client';
import {
	BrowserRouter as Router,
	Routes,
	Route
} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './app/store';
import { Home } from './pages';
import './styles/websiteBase.less';

const domNode = document.getElementById('app')!;
const root = createRoot(domNode);

const App = () => {
	return (
		<Provider store={store}>
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
				</Routes>
			</Router>
		</Provider>
	)
}

root.render(<App />);
