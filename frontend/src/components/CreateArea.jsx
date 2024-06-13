import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

const CreateArea = (props) => {
	const theme = useTheme();
	const isScreenSmall = useMediaQuery(theme.breakpoints.down("sm"));

	const [emptyTitle, setEmptyTitle] = useState(false);
	const [isTitleEditMode, setTitleEditMode] = useState(false);
	const [note, setNote] = useState({
		title: "",
		content: "",
	});

	const handleClick = () => {
		setTitleEditMode(true);
	};

	const handleBlur = () => {
		if (note.title.trim() === "") {
			setTitleEditMode(false);
		}
	};

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
			setTitleEditMode(false);
		}
	};

	return (
		<Box
			component="form"
			onSubmit={submitNote}
			width={isScreenSmall ? "75%" : "30%"}
			mx="auto"
			marginTop="75px"
			display="flex"
			flexDirection="column"
			border="1px solid rgb(95, 99, 104)"
			borderRadius={theme.shape.borderRadius}
			padding={theme.spacing(2)}
		>
			{!isTitleEditMode ? (
				<TextField
					label="Take a note..."
					variant="standard"
					onClick={handleClick}
					fullWidth
					margin="normal"
				/>
			) : (
				<>
					<TextField
						label="Title"
						name="title"
						variant="standard"
						value={note.title}
						onChange={handleChange}
						fullWidth
						margin="normal"
						autoFocus
						onBlur={handleBlur}
					/>
					<TextField
						label="Content"
						name="content"
						variant="standard"
						value={note.content}
						onChange={handleChange}
						fullWidth
						multiline
						maxRows={Infinity}
						margin="normal"
					/>
				</>
			)}
			{emptyTitle && (
				<Alert severity="warning">Please enter a title for the note.</Alert>
			)}
			{isTitleEditMode && (
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
			)}
		</Box>
	);
};

export default CreateArea;
