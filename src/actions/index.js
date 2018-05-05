export const LOGOUT = 'LOGOUT';
export const logout = () => ({
	type: LOGOUT
});

export const LOGIN = 'LOGIN';
export const login = () => ({
	type: LOGIN
});

export const EDIT_GAME = 'EDIT_GAME';
export const editGame = (gameId) => ({
	type: EDIT_GAME,
	gameId
});

export const REMOVE_GAME = 'REMOVE_GAME';
export const removeGame = (gameId) => ({
	type: REMOVE_GAME,
	gameId
}); 