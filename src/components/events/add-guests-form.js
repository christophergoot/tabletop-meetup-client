import React, { Component } from 'react';
import { AutoComplete } from 'redux-form-material-ui';
// import { AutoComplete as MUIAutoComplete } from 'material-ui';
import { Field } from 'redux-form';

class AddGuestsForm extends Component {
	addGuestField(){
		// write to the store new array
		this.props.addGuest();
	}


	fuzzyFilter(searchQuery, key) {
		const compareString = key.toLowerCase();
		let searchText = '';
		if (searchQuery) searchText = searchQuery.toLowerCase();
		let searchTextIndex = 0;
		for (let index = 0; index < key.length; index++) {
			if (compareString[index] === searchText[searchTextIndex]) {
				searchTextIndex += 1;
			}
		}
		return searchTextIndex === searchText.length;
	}

	handleSearchByTextChange(text){
		console.log('autocomplete text change in add guests form', text);
	}
	guestFields(guests, allUsers) {
		const markup = guests.map((guest,i) => 
			<div key={i}>
				{/* <Field
					name={'guest-' + i}
					component={AutoComplete}
					floatingLabelText="Add User"
					openOnFocus
					filter={this.fuzzyFilter}
					dataSourceConfig={{text: 'displayName', value: 'userId'}}
					dataSource={allUsers}
				/> */}
				<Field
					name={'guest-' + i}
					label="Search Suggestions"
					component={AutoComplete}
					floatingLabelText="Search By Suggestions"
					openOnFocus
					filter={this.fuzzyFilter}
					dataSourceConfig={{text: 'displayName', value: 'userId'}}
					dataSource={allUsers}
					onChange={this.handleSearchByTextChange} //handle the onChange event by handleSearchByTextChange func
					onBlur={() => {}}
				/>
				<button onClick={() => this.props.removeGuest(i)}>
					X
				</button>
			</div>
		);
		return markup;
	}
	render() {

		return (
			<div>
				{this.guestFields(this.props.guestList, this.props.allUsers)}
				<a onClick={() => this.props.addGuest()}>Add Additional Guest</a>
			</div>
		);
	}
}

export default AddGuestsForm;