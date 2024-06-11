import React, { useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import MuiButton from '@mui/material/Button';
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';

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
				<FormControl variant="outlined">
					<Select
						value={props.noteStatus}
						onChange={(event) => handleSelect(event.target.value)}
						displayEmpty
					>
						<MenuItem value="To Do">To Do</MenuItem>
						<MenuItem value="In Progress">In Progress</MenuItem>
						<MenuItem value="Done">Done</MenuItem>
					</Select>
				</FormControl>
				<div>
					<IconButton onClick={handleDelete}>
						<DeleteIcon />
					</IconButton>
				</div>
			</div>
		</div>
	);
};

export default Note;
