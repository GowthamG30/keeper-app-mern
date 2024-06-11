import React, { useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import MuiButton from '@mui/material/Button';

const Note = (props) => {
	// const handleEdit = () => {
	// 	props.onEdit(props.id);
	// };

	const handleDelete = () => {
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
				{/* <MuiButton variant="contained" onClick={handleEdit}>Edit</MuiButton> */}
				<MuiButton variant="contained" onClick={handleDelete}>Delete</MuiButton>
				{/* <button className="del" onClick={handleDelete}>
					DELETE
				</button> */}
			</div>
		</div>
	);
};

export default Note;
