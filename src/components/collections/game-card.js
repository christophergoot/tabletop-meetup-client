import React from 'react';
import { connect } from 'react-redux';
import GameBoxtop from '../games/game-boxtop';
import EditGame from './edit-game';
import CollectionDetails from './collection-details';

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
		// this.setState({
		// 	editing: true
		// });
	}

    render() {
        if (this.state.editing) return (
			<EditGame 
				gameId={this.props.game.gameId}
				cancelEdit={() => this.toggleEditing()} />
		)
		else return (
			<GameBoxtop 
				game={this.props.game} 
				listManager={<CollectionDetails 
					game={this.props.game} 
					dispatch={this.props.dispatch}/>}
				editCollectionDetails={this.editGame} 
				dispatch={this.props.dispatch} 
				// toggleEditing={this.toggleEditing}
				/>
		)
	}
}

function mapStateToProps(state) {
	return {

	};
}


export default connect(mapStateToProps)(GameCard);