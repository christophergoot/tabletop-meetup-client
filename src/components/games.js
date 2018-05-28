import React from 'react';
import GameList from './game-list';
import GameSort from './game-sort';
import GameFilter from './game-filter';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { fetchCollection } from '../actions/collections';


export class Games extends React.Component {
	componentDidMount() {
		const { userId } = this.props;
		this.props.dispatch(fetchCollection(userId));
	}

	render() {
		const { collection, dispatch } = this.props;
		const { games, sort } = collection;
		// const gameList = games.list;
	
		return (
			<section>
				<h1>Manage Game List</h1>
				<GameFilter />
				<GameSort 
					dispatch={dispatch}
					collection={collection}
					sort={sort}
				/>
				<GameList 
					games={games}
					dispatch={dispatch}
				/>
			</section>
		);
	}
}

const mapStateToProps = state => {
	return ({
		// games: state.collections.list.games.find(c => c.userId === state.auth.currentUser.userId),
		collection: state.collections.list,
		userId: state.auth.currentUser.userId
	});
};

// const mapDispatchToProps = dispatch => {
// 	return ({
// 		sortGames: this.SORT_GAMES
// 	});
// };

export default requiresLogin()(connect(mapStateToProps)(Games));