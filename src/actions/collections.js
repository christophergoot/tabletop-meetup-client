import { loadAuthToken } from '../local-storage';
// import { API_BASE_URL } from '../config';
const API_BASE_URL = 'http://localhost:3030/api';

export const FETCH_COLLECTION_SUCCESS = 'FETCH_COLLECTION_SUCCESS';
export const fetchCollectionSuccess = collection => ({
	type: FETCH_COLLECTION_SUCCESS,
	collection
});

export const fetchCollection = (userId) =>  dispatch => {
	const authToken = loadAuthToken();
	// const authToken = localStorage.getItem('authToken');
	// return loadAuthToken().then(authToken => { 
	const thisHeaders = new Headers();
	thisHeaders.append('Authorization', `Bearer ${authToken}`);
	fetch(`${API_BASE_URL}/collections/${userId}`, {
		'method': 'GET',
		'mode': 'cors',
		'headers': thisHeaders
	}).then(res => {
		if (!res.ok) {
			return Promise.reject(res.statusText);
		}
		return res.json();
	}).then(res => {
		dispatch(fetchCollectionSuccess(res));
	});
};


// var misCabeceras = new Headers();
// misCabeceras.append('Authorization', 'Bearer pepe el loco');
// var miInit = { method: 'GET',
// 	headers: misCabeceras,
// 	mode: 'cors',
// 	cache: 'default' };

// fetch('https://images.pexels.com/photos/39517/rose-flower-blossom-bloom-39517.jpeg?cs=srgb&dl=flowers-petals-plants-39517.jpg&fm=jpg',miInit)
// 	.then(function(response) {
// 		console.log(response);
// 	}).catch(e => console.log(e));
