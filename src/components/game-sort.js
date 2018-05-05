import React from 'react';

export default function GameSort(props) {
    return (
		<div>Sort
			<span className="sort selected">name</span>
			<span className="sort">rating</span>
			<span className="sort">play time</span>
			<span className="sort">weight</span>
			<span className="sort">year</span>
		</div>
	);
};