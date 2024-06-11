import React, { useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const Note = (props) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editedNote, setEditedNote] = useState({
		title: props.title,
		content: props.content,
	});

	const handleEditedNote = (e) => {
		const { name, value } = e.target;
		setEditedNote((prevNote) => ({
			...prevNote,
			[name]: value,
		}));
	};

	const handleEdit = () => {
		setIsEditing(true);
	};

	const handleSave = () => {
		props.onUpdate(props.id, editedNote);
		setIsEditing(false);
	};

	const handleCancel = () => {
		setEditedNote({
			title: props.title,
			content: props.content,
		});
		setIsEditing(false);
	};

	const handleDelete = () => {
		props.onDelete(props.id);
	};

	const handleSelect = (eventKey) => {
		props.onSelect(props.id, eventKey);
	};

	return (
		<Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
			{isEditing ? (
				<>
					<TextField
						label="Title"
						name="title"
						variant="outlined"
						value={editedNote.title}
						onChange={handleEditedNote}
						fullWidth
						margin="normal"
					/>
					<TextField
						label="Content"
						name="content"
						variant="outlined"
						value={editedNote.content}
						onChange={handleEditedNote}
						fullWidth
						multiline
						rows={4}
						margin="normal"
					/>
					<div>
						<IconButton
							onClick={handleSave}
							variant="contained"
							color="primary"
							style={{ marginRight: "8px" }}
						>
							<SaveIcon />
						</IconButton>
						<IconButton
							onClick={handleCancel}
							variant="outlined"
							color="secondary"
						>
							<CancelIcon />
						</IconButton>
					</div>
				</>
			) : (
				<>
					<Typography variant="h5" gutterBottom>
						{props.title}
					</Typography>
					<Typography variant="body1" paragraph>
						{props.content}
					</Typography>
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
						<IconButton onClick={handleEdit} style={{ marginRight: "8px" }}>
							<EditIcon />
						</IconButton>
						<IconButton onClick={handleDelete}>
							<DeleteIcon />
						</IconButton>
					</div>
				</>
			)}
		</Paper>
	);
};

export default Note;
