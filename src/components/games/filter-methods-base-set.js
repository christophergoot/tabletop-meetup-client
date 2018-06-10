export const FilterMethods = [
	{
		name: 'Player Count',
		field: 'minPlayers',
		range: { min: 1, max: 10},
		step: 1,
		valueDescripter: 'Players'
	},
	{
		name: 'Time',
		field: 'playingTime',
		range: { min: 0, max: 240},
		step: 5,
		valueDescripter: 'Minutes'
	},
	{
		name: 'Rating',
		field: 'averageRating',
		range: { min: 0, max: 10},
		step: 0.5,
		valueDescripter: 'Rating'
	},
	{
		name: 'BGG Rank',
		field: 'rank',
		range: { min: 0, max: 10000},
		step: 100,
		valueDescripter: 'Game Rank'
	},
	{
		name: 'Year Published',
		field: 'yearPublished',
		range: { min: 1954, max: new Date().getFullYear() + 1},
		step: 1,
		valueDescripter: 'Year Published'
	},
	{
		name: 'Number of Plays',
		field: 'numPlays',
		range: { min: 0, max: 1000},
		step: 10,
		valueDescripter: 'Plays'
	},
	{
		name: 'Is Owned',
		field: 'owned'
	},
	{
		name: 'Want to Play',
		field: 'wantToPlay'
	},
	{
		name: 'Want to Buy',
		field: 'wantToBuy'
	},
	{
		name: 'Previously Owned',
		field: 'previousOwned'
	},
	{
		name: 'On Wishlist',
		field: 'wishlist'
	}

];
