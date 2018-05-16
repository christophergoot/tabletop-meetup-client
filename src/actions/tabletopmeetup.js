'user strict';

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

export const SORT_GAMES = 'SORT_GAMES';
export const sortGames = (games, sortMethod) => ({
	type: SORT_GAMES,
	games,
	sortMethod
});