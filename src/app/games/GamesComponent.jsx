import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GameFilter from '../common/SortAndFilterComponent';
import GamesPaginate from '../common/GamesPaginate';
import AddGame from './AddGameContainer';
import './games.css';
import GameBoxtop from '../common/GameBoxtopComponent';
import { CollectionDetails } from './CollectionDetails';

export class GameCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editing: false
		}
	}
	toggleEditing = () => {
		this.setState({
			...this.state,
			editing: !this.state.editing
		});
	}
	editGame = gameId => {
		this.toggleEditing();
	}
    render() {
        if (this.state.editing) return (
					<div className='game-card'>
						<h2>Edit Game</h2>
						<button onClick={() => this.toggleEditing()}>Cancel</button>
					</div>
				)
		else return (
			<GameBoxtop 
				game={this.props.game} 
				listManager={
					<CollectionDetails 
						game={this.props.game} 
						dispatch={this.props.dispatch} 
					/>}
				editCollectionDetails={this.editGame} 
				dispatch={this.props.dispatch} 
				// toggleEditing={this.toggleEditing}
				/>
		)
	}
}

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


export class GamesComponent extends Component {
	GameList(props) {
		const { games } = props;
		const cards = games.map((game, i) => {
			return (
				<GameCard 
					game={game} 
					key={i}
					dispatch={props.dispatch}
				/>
			);
		});
	
		return (
			<div className="game-list">
				{cards}
			</div>
		);
	}

	render() {
		const { collection } = this.props;
		const filterMethods = [
			...FilterMethods,
			{
				name: 'Number of Plays',
				field: 'numPlays',
				range: { min: 0, max: 1000},
				step: 10,
				valueDescripter: 'Plays'
			},
		]

		return (
			<section>
				<h2>Manage Game List</h2>
				<AddGame />
				<GameFilter 
					collection={collection}
					updateList={this.props.updateList}
					filterMethods={filterMethods}
				/>
				<GamesPaginate 
					collection={collection}
					updateList={this.props.updateList}
				/>
				<this.GameList 
					games={collection.games}
					dispatch={this.props.dispatch}
				/>
				<GamesPaginate 
					collection={collection}
					updateList={this.props.updateList}
					view='pagination only'
				/>
			</section>
		);
	}
	
}

GamesComponent.propTypes = {
	collection: PropTypes.object.isRequired
};

export default GamesComponent;