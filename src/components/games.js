import React from 'react';
import GameList from './game-list';
import GameSort from './game-sort';
import GameFilter from './game-filter';
// import { MOCK_PLAYER_COLLECTION } from './mock-data';
import { connect } from 'react-redux';


// export default function Games(props) {
export class Games extends React.Component {
	render() {
		return (
			<section>
				<h1>Manage Game List</h1>
				<GameFilter />
				<GameSort />
				<GameList 
					collection={this.props.collection}
					dispatch={this.props.dispatch}
					 />
			</section>
		);
	}
}

const mapStateToProps = state => ({
	collection: state.collection
});

export default connect(mapStateToProps)(Games);