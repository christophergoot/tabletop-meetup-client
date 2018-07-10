import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleGameSearch, addGameById } from '../../actions/collections';
import './add-game.css';
// import TextField from '@material-ui/core/TextField';

class AddGame extends Component {
	handleChange = () => event => {
		const query = event.target.value.trim().toLowerCase();
		console.log('query is ' + query);
		this.props.dispatch(handleGameSearch(query));
	}
	
	selectGameById = gameId => {
		// document.getElementById('game-search-input').value = '';
		console.log('you selected game with id ' + gameId);

	}

	searchResults = () => {
		const results = this.props.gameSearchResults.map((game,i) => (
			<li key={i}
				onClick={e => this.selectGameById(game.id)}
			>
				{game.name} ({game.yearPublished})
			</li>
		));
		return results;
	}

	render() {
			return (
				<form>
					<input 
						id='game-search-input'
						type='text'
						placeholder='Add a Game'
						onChange={this.handleChange()}
					/>
					<ul className='add-game-dropdown'>
						{this.searchResults()}
					</ul>
				</form>
			);
	}
}

function mapStateToProps(state) {
	return {
		isEditing: state.collections.addGame.isEditing,
		gameSearchResults: state.collections.addGame.gameSearchResults
	};
}

export default connect(mapStateToProps)(AddGame);