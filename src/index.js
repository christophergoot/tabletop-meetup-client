import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './components/app/app';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


import './index.css';

const muiTheme = getMuiTheme({
	// palette: {
	// 	textColor: 'rgb(165, 252, 35)',
	// },	
	// textField: {
	// 	floatingLabelColor: 'green'
	// },
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
