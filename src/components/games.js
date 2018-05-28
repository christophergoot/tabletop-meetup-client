import React from 'react';
import { connect } from 'react-redux';
import { fetchCollection } from '../actions/collections';
import GameFilter from './game-filter';
import GameList from './game-list';
import GameSort from './game-sort';
import GamesPaginate from './games-paginate';
import requiresLogin from './requires-login';


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
				<GamesPaginate 
					dispatch={dispatch}
					collection={collection}
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

export default requiresLogin()(connect(mapStateToProps)(Games));