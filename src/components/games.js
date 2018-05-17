import React from 'react';
import GameList from './game-list';
import GameSort from './game-sort';
import GameFilter from './game-filter';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';


// export default function Games(props) {
export class Games extends React.Component {
	render() {
		return (
			<section>
				<h1>Manage Game List</h1>
				<GameFilter />
				<GameSort 
					dispatch={this.props.dispatch}
					collection={this.props.collection}
				/>
				<GameList 
					collection={this.props.collection}
					dispatch={this.props.dispatch}
				/>
			</section>
		);
	}
}

const mapStateToProps = state => {
	return ({
		collection: state.collections.find(c => c.userId === state.auth.currentUser.userId)
	});
};

// const mapDispatchToProps = dispatch => {
// 	return ({
// 		sortGames: this.SORT_GAMES
// 	});
// };

export default requiresLogin()(connect(mapStateToProps)(Games));