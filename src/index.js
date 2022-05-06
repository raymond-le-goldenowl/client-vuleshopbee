import React from 'react';
import {Provider} from 'react-redux';
import {createRoot} from 'react-dom/client';

import * as serviceWorker from './serviceWorker';
import 'react-toastify/dist/ReactToastify.css';
import {store} from 'App/store';
import App from 'App';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
	// <React.StrictMode>
	<Provider store={store}>
		<App />
	</Provider>,
	// </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
