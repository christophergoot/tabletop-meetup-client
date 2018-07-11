import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleGameSearch, addGameById } from '../../actions/collections';
import './add-game.css';
import GameBoxtop from './game-boxtop';
import Spinner from './spinner';
// import TextField from '@material-ui/core/TextField';

class AddGame extends Component {
	handleChange = () => event => {
		const query = event.target.value.trim().toLowerCase();
		console.log('TODO: add a spinner starting at AddGame.handleChange');
		this.props.dispatch(handleGameSearch(query));
	}
	
	selectGameById = gameId => {
		// console.log('you selected game with id ' + gameId);


		// do nothing to the input
		// update state with collections.addGame.gameSearchDrop: 'select'
		
		// if game exists in collection, open boxtop with existing values

		return <GameBoxtop />

	}

	dropdown = () => {
		if (this.props.drop === 'search') return this.searchResults()
		else if (this.props.drop === 'select') return <GameBoxtop />
		return 'this should be empty'
	}

	searchResults = () => {
		const results = this.props.gameSearchResults.map((game,i) => (
			<li key={i}
				onClick={e => this.selectGameById(game.id)}
			>
				{game.name} ({game.yearPublished})
			</li>
		));
		
		return (
			<ul className='add-game-dropdown'>
				{results}
			</ul>
		);
	}

	spinner = () => {
		if (this.props.currentSearches > 0) 
			return <Spinner tooltip='BoardGameGeek is really this slow' />
		else return ''
	}

	render() {
			return (
				<form>
					<div>
						<input 
							id='game-search-input'
							type='text'
							placeholder='Add a Game'
							onChange={this.handleChange()}
						/>
						{this.spinner()}
					</div>
					{this.dropdown()}
				</form>
			);
	}
}

function mapStateToProps(state) {
	return {
		gameSearchResults: state.collections.addGame.gameSearchResults,
		drop: state.collections.addGame.gameSearchDrop,
		currentSearches: state.collections.addGame.currentSearches
	};
}

export default connect(mapStateToProps)(AddGame);