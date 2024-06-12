import React from "react";
import Note from "./Note";
import Masonry from "react-masonry-css";

const NoteList = ({ Tasks, statusFilter, onDelete, onSelect, onUpdate }) => {
	const breakpointColumnsObj = {
		default: 4,
		1100: 3,
		700: 2,
		500: 1,
	};

	return (
		<Masonry
			breakpointCols={breakpointColumnsObj}
			className="my-masonry-grid"
			columnClassName="my-masonry-grid_column"
			style={{ display: "flex", justifyContent: "center" }}
		>
			{Tasks.filter(
				(task) => statusFilter === "All" || task.noteStatus === statusFilter
			).map((task) => (
				<div key={task._id} style={{ width: "100%", padding: "8px" }}>
					<Note
						id={task._id}
						title={task.title}
						content={task.content}
						noteStatus={task.noteStatus}
						onDelete={onDelete}
						onSelect={onSelect}
						onUpdate={onUpdate}
					/>
				</div>
			))}
		</Masonry>
	);
};

export default NoteList;
