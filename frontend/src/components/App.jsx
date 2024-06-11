import React, { useState, useEffect } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import StatusFilter from "./StatusFilter";
import NoteList from "./NoteList";
import axios from "axios";

const App = () => {
	const [Tasks, setTasks] = useState([]);
	const [statusFilter, setStatusFilter] = useState("All");

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
			.put("/api/updateStatus/" + id, params, {
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

	const deleteNode = (id) => {
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

	const handleStatusFilter = (eventKey) => {
		setStatusFilter(eventKey);
	};

	return (
		<div>
			<Header />
			<CreateArea onAdd={addNote} />
			<StatusFilter statusFilter={statusFilter} onSelect={handleStatusFilter} />
			<NoteList statusFilter={statusFilter} Tasks={Tasks} onDelete={deleteNode} onSelect={updateState} />
			<Footer />
		</div>
	);
};

export default App;
