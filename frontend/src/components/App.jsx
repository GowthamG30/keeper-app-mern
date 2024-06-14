import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import CreateArea from "./CreateArea";
import NoteList from "./NoteList";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
	palette: {
		primary: {
			main: "#202124",
		},
		secondary: {
			main: "rgb(95, 99, 104)",
		},
		background: {
			default: "#202124",
			paper: "#202124",
		},
		text: {
			primary: "#e8eaed",
			secondary: "rgb(95, 99, 104)",
		},
	},
	components: {
		MuiPaper: {
			styleOverrides: {
				root: {
					border: "1px solid rgb(95, 99, 104)",
					borderRadius: "10px",
				},
			},
		},
	},
});

const App = () => {
	const [Tasks, setTasks] = useState([]);

	useEffect(() => {
		axios
			.get("/api/all")
			.then((res) => setTasks(res.data))
			.catch((err) => console.error(err));
	}, []);

	const addNote = (newNote) => {
		const params = JSON.stringify({
			title: newNote.title,
			content: newNote.content,
			noteStatus: "To Do",
		});

		axios
			.post("/api/add", params, {
				headers: {
					"content-type": "application/json",
				},
			})
			.then((addRes) => {
				axios
					.get("/api/all")
					.then((allRes) => setTasks(allRes.data))
					.catch((err) => console.error(err));
			})
			.catch((err) => console.error(err));
	};

	const updateState = (id, status) => {
		const params = JSON.stringify({
			noteStatus: status,
		});

		axios
			.put("/api/update/" + id, params, {
				headers: {
					"content-type": "application/json",
				},
			})
			.then((stateRes) => {
				axios
					.get("/api/all")
					.then((allRes) => setTasks(allRes.data))
					.catch((err) => console.error(err));
			})
			.catch((err) => console.error(err));
	};

	const updateNote = (id, updatedNote) => {
		const params = JSON.stringify({
			title: updatedNote.title,
			content: updatedNote.content,
		});

		axios
			.put("/api/update/" + id, params, {
				headers: {
					"content-type": "application/json",
				},
			})
			.then((updateRes) => {
				axios
					.get("/api/all")
					.then((allRes) => setTasks(allRes.data))
					.catch((err) => console.error(err));
			})
			.catch((err) => console.error(err));
	};

	const deleteNote = (id) => {
		axios
			.delete("/api/del/" + id)
			.then((delRes) => {
				axios
					.get("/api/all")
					.then((allRes) => setTasks(allRes.data))
					.catch((err) => console.error(err));
			})
			.catch((err) => console.error(err));
	};

	return (
		<>
			<ThemeProvider theme={theme}>
				<Header />
				<CreateArea onAdd={addNote} />
				<NoteList
					Tasks={Tasks}
					onDelete={deleteNote}
					onSelect={updateState}
					onUpdate={updateNote}
				/>
				<Footer />
			</ThemeProvider>
		</>
	);
};

export default App;
