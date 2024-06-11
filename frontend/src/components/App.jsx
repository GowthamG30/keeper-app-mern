import React, { useState, useEffect } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
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

	return (
		<div>
			<Header />
			<CreateArea onAdd={addNote} />
			<DropdownButton
				id="dropdown-basic-button"
				title={statusFilter}
				onSelect={(eventKey) => setStatusFilter(eventKey)}
			>
				<Dropdown.Item eventKey="All">All</Dropdown.Item>
				<Dropdown.Item eventKey="To Do">To Do</Dropdown.Item>
				<Dropdown.Item eventKey="In Progress">In Progress</Dropdown.Item>
				<Dropdown.Item eventKey="Done">Done</Dropdown.Item>
			</DropdownButton>
			{Tasks.filter((task) => (statusFilter === "All" || task.noteStatus === statusFilter)).map((task) => {
				return (
					<Note
						key={task._id}
						id={task._id}
						title={task.title}
						content={task.content}
						noteStatus={task.noteStatus}
						onDelete={deleteNode}
						onSelect={updateState}
					/>
				);
			})}
			<Footer />
		</div>
	);
};

export default App;
