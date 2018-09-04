import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../../app/common/Spinner';
import { GameCard } from './GamesComponent';
import { selectGameByGame, toggleGameSearchDrop } from '../../actions/collections';

class AddGameComponent extends Component {
	
	handleChange = () => event => {
		const query = event.target.value.trim().toLowerCase();
		this.props.debounceChange(query);
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
	}

	errorMessage = () => {
		if (this.props.errorMessage) return (<p className='error'>{this.props.errorMessage}</p>)
		else return ''
	}

	dropdown = () => {
		if (this.props.drop === 'search' && this.props.gameSearchResults.length > 0) return this.searchResults()
		else if (this.props.drop === 'select' && this.props.gameSearchResults.length === 0) return (
			<ul className='add-game-dropdown'>
				<li>No results found</li>
			</ul>)
		else if (this.props.drop === 'select') return (
			<div className='select-game-dropdown'>
				<div className='select-game-container'>
					<GameCard 
						game={this.props.selectedGame}
						dispatch={this.props.dispatch}
						/>
					<button className='x-button' onClick={e => this.props.dispatch(toggleGameSearchDrop('search'))}>X</button>
				</div>
			</div>)
		return ''
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
			<div>
				<div
					style={{height:'30px',dispaly:'flex'}}
					className='center-horrizonal'
				>
					<input 
						id='game-search-input'
						type='text'
						placeholder='Add a Game'
						autoComplete='off'
						onChange={this.handleChange()}
					/>
					<div style={{width:'40px'}}>{this.spinner()}</div>
				</div>
				{this.errorMessage()}
				{this.dropdown()}
			</div>
		);
	}
}

AddGameComponent.propTypes = {
	gameSearchResults: PropTypes.array.isRequired,
	drop: PropTypes.string.isRequired,
	currentSearches: PropTypes.number.isRequired,
	selectedGame: PropTypes.object.isRequired,
	errorMessage: PropTypes.string.isRequired
};

export default AddGameComponent;