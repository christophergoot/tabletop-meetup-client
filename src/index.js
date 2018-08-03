import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './components/app/app';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


import './index.css';

import WebFont from 'webfontloader';

WebFont.load({
	google: {
		families: ['Roboto Slab', 'Noto Emoji', 'Arimo', 'Lobster', 'serif', 'Chela One', 'cursive']
	}
});

const muiTheme = getMuiTheme({
	palette: {
		type: 'dark',
		floatingLabelFocusStyle: {
			color: 'red'
		}

	},
	floatingLabelFocusStyle: {
		color: 'red'
	},
	textField: {
		floatingLabelColor: '#d9b44a',
		labelColor: '#d9b44a',

	},
});

ReactDOM.render(
	<Provider store={store}>
		<MuiThemeProvider muiTheme={muiTheme}>
			<App />
		</MuiThemeProvider>
	</Provider>, 
	document.getElementById('root')
);

registerServiceWorker();
