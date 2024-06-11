import React from "react";
import Note from "./Note";

const NoteList = ({ Tasks, statusFilter, onDelete, onSelect }) => {
	return (
		<div>
			{Tasks.filter((task) => (statusFilter === "All" || task.noteStatus === statusFilter)).map((task) => {
				return (
					<Note
						key={task._id}
						id={task._id}
						title={task.title}
						content={task.content}
						noteStatus={task.noteStatus}
						onDelete={onDelete}
						onSelect={onSelect}
					/>
				);
			})}
		</div>
	);
};

export default NoteList;
