import React, { useState } from "react";

const CreateArea = (props) => {
	const [note, setNote] = useState({
		title: "",
		content: "",
	});

	const handleChnage = (event) => {
		const { name, value } = event.target;

		setNote((prevNote) => {
			return {
				...prevNote,
				[name]: value,
			};
		});
	};

	const submitNote = (event) => {
		props.onAdd(note);
		setNote({
			title: "",
			content: "",
		});
		event.preventDefault(); // prevent refresh
	};

	return (
		<div>
			<form>
				<input
					name="title"
					onChange={handleChnage}
					value={note.title}
					placeholder="Title"
				/>
				<textarea
					name="content"
					onChange={handleChnage}
					value={note.content}
					placeholder="Take a note..."
					rows="3"
				/>
				<button onClick={submitNote}>Add</button>
			</form>
		</div>
	);
};

export default CreateArea;
