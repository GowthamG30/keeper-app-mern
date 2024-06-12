import React, { useState } from "react";
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
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

const Note = (props) => {
	const theme = useTheme();

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
						variant="standard"
						value={editedNote.title}
						onChange={handleEditedNote}
						fullWidth
						margin="normal"
					/>
					<TextField
						label="Content"
						name="content"
						variant="standard"
						value={editedNote.content}
						onChange={handleEditedNote}
						fullWidth
						multiline
						rows={props.content.length > 100 ? 8 : 4}
						margin="normal"
					/>
					<Box display="flex" alignItems="center">
						<IconButton
							onClick={handleSave}
							variant="contained"
							color="secondary"
							style={{ marginRight: "8px" }}
						>
							<SaveIcon />
						</IconButton>
						<IconButton
							onClick={handleCancel}
							variant="contained"
							color="secondary"
						>
							<CancelIcon />
						</IconButton>
					</Box>
				</>
			) : (
				<>
					<Typography variant="h5" gutterBottom>
						{props.title}
					</Typography>
					<Typography
						variant="body1"
						paragraph
						sx={{
							whiteSpace: "pre-wrap",
							textAlign: "left",
						}}
					>
						{props.content}
					</Typography>
					<Box display="flex" alignItems="center">
						<Box display="flex" marginRight="auto">
							<IconButton
								onClick={handleEdit}
								style={{ marginRight: "8px" }}
								color="secondary"
							>
								<EditIcon />
							</IconButton>
							<IconButton onClick={handleDelete} color="secondary">
								<DeleteIcon />
							</IconButton>
						</Box>
						<FormControl variant="outlined" color="secondary">
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
					</Box>
				</>
			)}
		</Paper>
	);
};

export default Note;
