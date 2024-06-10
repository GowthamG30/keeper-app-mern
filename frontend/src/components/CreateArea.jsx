import React, { useState } from "react";

const CreateArea = (props) => {
	const [emptyTitle, setEmptyTitle] = useState(false);

	const [note, setNote] = useState({
		title: "",
		content: "",
	});

	const handleChange = (event) => {
		const { name, value } = event.target;

		setNote((prevNote) => {
			return {
				...prevNote,
				[name]: value,
			};
		});
	};

	const submitNote = (event) => {
		if(note.title === "") {
			setEmptyTitle(true);
			setTimeout(() => {
				setEmptyTitle(false);
			}, 2000);
		}
		else {
			props.onAdd(note);
			setNote({
				title: "",
				content: "",
			});
		}
		
		event.preventDefault(); // prevent refresh
	};

	return (
		<div>
			<form>
				<input
					name="title"
					onChange={handleChange}
					value={note.title}
					placeholder="Title"
				/>
				<textarea
					name="content"
					onChange={handleChange}
					value={note.content}
					placeholder="Take a note..."
					rows="3"
				/>
				<button onClick={submitNote}>Add</button>
			</form>
			{
				emptyTitle ?
					<div className="alert alert-warning" role="alert">
						Title cannot be empty!
					</div>
				:
				<div className="alert alert-warning empty-alert" role="alert">
					&nbsp;
				</div>
			}
		</div>
	);
};

export default CreateArea;
