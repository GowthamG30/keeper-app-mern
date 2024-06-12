import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

const CreateArea = (props) => {
	const theme = useTheme();

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
		<Box
			component="form"
			onSubmit={submitNote}
			width="30%"
			mx="auto"
			marginTop="75px"
			display="flex"
			flexDirection="column"
			border="1px solid rgb(95, 99, 104)"
			borderRadius={theme.shape.borderRadius}
			padding={theme.spacing(2)}
		>
			<TextField
				label="Title"
				name="title"
				variant="standard"
				value={note.title}
				onChange={handleChange}
				fullWidth
				margin="normal"
			/>
			<TextField
				label="Content"
				name="content"
				variant="standard"
				value={note.content}
				onChange={handleChange}
				fullWidth
				multiline
				rows={4}
				margin="normal"
			/>
			{emptyTitle && (
				<Alert severity="warning">Please enter a title for the note.</Alert>
			)}
			<Box
				sx={{
					display: "flex",
					justifyContent: "flex-end",
					marginTop: theme.spacing(2),
				}}
			>
				<IconButton type="submit" color="secondary">
					<AddIcon />
				</IconButton>
			</Box>
		</Box>
	);
};

export default CreateArea;
