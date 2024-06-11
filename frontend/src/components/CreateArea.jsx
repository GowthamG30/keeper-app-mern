import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";
import AddIcon from "@mui/icons-material/Add";

const CreateArea = (props) => {
	const [emptyTitle, setEmptyTitle] = useState(false);
	const [note, setNote] = useState({
		title: "",
		content: "",
	});

	const handleChange = (event) => {
		const { name, value } = event.target;
		setNote((prevNote) => ({
			...prevNote,
			[name]: value,
		}));
	};

	const submitNote = (event) => {
		event.preventDefault(); // prevent refresh
		if (note.title.trim() === "") {
			setEmptyTitle(true);
			setTimeout(() => {
				setEmptyTitle(false);
			}, 2000);
		} else {
			props.onAdd(note);
			setNote({
				title: "",
				content: "",
			});
			setEmptyTitle(false);
		}
	};

	return (
		<div>
			<form onSubmit={submitNote}>
				<TextField
					label="Title"
					name="title"
					variant="outlined"
					value={note.title}
					onChange={handleChange}
					fullWidth
					margin="normal"
				/>
				<TextField
					label="Content"
					name="content"
					variant="outlined"
					value={note.content}
					onChange={handleChange}
					fullWidth
					multiline
					rows={4}
					margin="normal"
				/>
				{emptyTitle && (
					<Alert
						severity="warning"
						style={{
							position: "absolute",
							top: "-50px",
							left: "0",
							right: "0",
						}}
					>
						Please enter a title for the note.
					</Alert>
				)}
				<IconButton type="submit" color="primary">
					<AddIcon />
				</IconButton>
			</form>
		</div>
	);
};

export default CreateArea;
