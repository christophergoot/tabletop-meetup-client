import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addGameEdit } from '../../actions/collections';
import TextField from '@material-ui/core/TextField';

function mapStateToProps(state) {
	return {
		isEditing: state.collections.addGame.isEditing
	};
}

class AddGame extends Component {
	handleChange = () => event => {
		console.log('query is ' + event.target.value);
	}
	
	render() {
		if (this.props.isEditing)
			return (
				<form>
					{/* <TextField
						label='Search for Game' 
						autoFocus
						onChange={this.handleChange()}
					/> */}
					<input 
						type='text'
						palceholder='Search for Game'
						onChange={this.handleChange()}
					/>
					<button onClick={() => this.props.dispatch(addGameEdit())}>
					X
					</button>
				</form>
			);
		else return (
			<div>
				<a onClick={() => this.props.dispatch(addGameEdit())}>add a game</a>
			</div>
		);
	}
}

export default connect(mapStateToProps)(AddGame);