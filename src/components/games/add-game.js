import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleGameSearch, selectGameByGame } from '../../actions/collections';
import './add-game.css';
import GameBoxtop from './game-boxtop';
import Spinner from './spinner';
import _ from 'lodash';
import GameCard from '../collections/game-card';
// import TextField from '@material-ui/core/TextField';

class AddGame extends Component {
	constructor(props) {
		super(props);
		this.debounceChange = _.debounce(
			query => this.props.dispatch(handleGameSearch(query)), 
			1000)
	}

	

	handleChange = () => event => {
		const query = event.target.value.trim().toLowerCase();
		this.debounceChange(query);
		// this.props.dispatch(handleGameSearch(query));
	}
	
	handleGameSelect = game => {
		// console.log('you selected game with id ' + gameId);
		const tempGame = {
			gameId: game.id,
			name: game.name,
			yearPublished: game.yearPublished, 
			thumbnail: '', 
			averageRating: 0, 
			minPlayers: 0, 
			maxPlayers: 0, 
			playingTime: 0
		};

		this.props.dispatch(selectGameByGame(tempGame));
		// do nothing to the input
		// update state.collections.addGame.gameSearchDrop: 'select'
		

		// if game exists in collection, open boxtop with existing values


	}

	dropdown = () => {
		if (this.props.drop === 'search') return this.searchResults()
		else if (this.props.drop === 'select') return (
			<div className='select-game-dropdown'>
				<GameCard game={this.props.selectedGame}/>
			</div>)
		return 'this should be empty'
	}

	searchResults = () => {
		const results = this.props.gameSearchResults.map((game,i) => (
			<li key={i}
				onClick={e => this.handleGameSelect(game)}
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
			return <Spinner 
				tooltip='waiting on BoardGameGeek.com'
				style={{}} />
		else return ''
	}

	render() {
			return (
				<form>
					<div
						style={{height:'30px',dispaly:'flex'}}
						className='center-horrizonal'
					>
						<input 
							id='game-search-input'
							type='text'
							placeholder='Add a Game'
							onChange={this.handleChange()}
						/>
						<div style={{width:'40px'}}>{this.spinner()}</div>
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
		currentSearches: state.collections.addGame.currentSearches,
		selectedGame: state.collections.addGame.selectedGame
	};
}

export default connect(mapStateToProps)(AddGame);