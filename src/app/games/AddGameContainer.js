import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleGameSearch } from '../../actions/collections';
import './add-game.css';
import _ from 'lodash';
import AddGameComponent from './AddGameComponent';
// import TextField from '@material-ui/core/TextField';

class AddGame extends Component {
	constructor(props) {
		super(props);
		this.debounceChange = _.debounce(
			query => this.props.dispatch(handleGameSearch(query)), 
			1000);
	}

	render() {
		return <AddGameComponent 
			gameSearchResults={this.props.gameSearchResults}
			drop={this.props.drop}
			currentSearches={this.props.currentSearches}
			selectedGame={this.props.selectedGame}
			errorMessage={this.props.errorMessage}
			debounceChange={this.debounceChange}
			dispatch={this.props.dispatch}
		/>;
	}
}

function mapStateToProps(state) {
	return {
		gameSearchResults: state.collections.addGame.gameSearchResults,
		drop: state.collections.addGame.gameSearchDrop,
		currentSearches: state.collections.addGame.currentSearches,
		selectedGame: state.collections.addGame.selectedGame,
		errorMessage: state.collections.addGame.gameSearchError
	};
}

export default connect(mapStateToProps)(AddGame);