import React from 'react';
import './collection-details.css';

export default class CollectionDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editing: false
		};
	}

	updateCollection = e => {
		e.preventDefault();
		console.log('updating collection');
		this.setState({editing: false});
	}

	createCheckbox = (label, labelId, checked) => {
	
		return (
			<div key={labelId}>
				<input 
					type="checkbox" 
					id={labelId}
					name={labelId}
					defaultChecked={checked} />
				<label htmlFor={labelId} >
					{label}
				</label>
			</div>
		); 
	}
	render() {
		const { game } = this.props;
		const collectionFields = [
			{ owned: 'Own' },
			{ wantToPlay: 'Want to Play' },
			{ previousOwned: 'Prev. Owned' },
			{ forTrade: 'For Trade' },
			{ want: 'Want in Trade' },
			{ wantToBuy: 'Want to Buy' },
			{ preOrdered: 'Pre-ordered' },
			{ wishList: 'Wishlist' }
		];
		const collectionDetails = collectionFields.map((field, i) => {
			if (game[Object.keys(field)]) return (
				<p key={i}>{(field[Object.keys(field)])}</p>
			)
			return ("");
		});
		const checkBoxes = collectionFields.map((field, i) => {
			return (this.createCheckbox(
				field[Object.keys(field)], 
				Object.keys(field),
				game[Object.keys(field)])
			);
		});
		if (this.state.editing) return (
			<div className='collection-details editing'>
				<form onSubmit={this.updateCollection}>
					{checkBoxes}
					<button type='submit'>
						Save
					</button>
					<button onClick={e => this.setState({editing: false})}>
						Cancel
					</button>
				</form>
			</div>			
		)
		else return (
			<div 
				className='collection-details'
				onClick={e => this.setState({editing: true})} >
				{collectionDetails}
			</div>
		)
	}
}