// import MOCK_DATA from './mock-data';

function loadGameList(collection) {
	const list = document.querySelector(".game-list");
	const cards = collection.map(game => {
		if (game.owned) {
			const { name, thumbnail, yearPublished, averageRating, minPlayers, maxPlayers, playingTime} = game;
			const card = 
				`<div class='game-card'>
					<h3><a href>${name}</a> (${yearPublished})</h3>
					<span>${averageRating.toFixed(2)} Average Rating</span>
					<span>${minPlayers} to ${maxPlayers} Players</span>
					<span>${playingTime} Min Playing Time</span>
					<span class='game-action'>edit</span>
					<span class='game-action'>remove</span>
				</div>`;
			return card;
		}
		return "";
	});
	list.innerHTML = cards.join("");
}

window.onload = function() {
	loadGameList(MOCK_DATA);
}