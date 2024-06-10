import e from "cors";
import React, { useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

const Note = (props) => {
	const handleClick = () => {
		props.onDelete(props.id);
	};

	const handleSelect = (eventKey) => {
		props.onSelect(props.id, eventKey);
	};

	return (
		<div className="note">
			<h1>{props.title}</h1>
			<p>{props.content}</p>
			<div>
				<DropdownButton
					id="dropdown-basic-button"
					title={props.noteStatus}
					onSelect={(eventKey) => handleSelect(eventKey)}
				>
					<Dropdown.Item eventKey="To Do">To Do</Dropdown.Item>
					<Dropdown.Item eventKey="In Progress">In Progress</Dropdown.Item>
					<Dropdown.Item eventKey="Done">Done</Dropdown.Item>
				</DropdownButton>
				<button className="del" onClick={handleClick}>
					DELETE
				</button>
			</div>
		</div>
	);
};

export default Note;
