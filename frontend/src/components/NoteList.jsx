import React from "react";
import Note from "./Note";
import { Box } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import Masonry from "react-masonry-css";

const NoteList = ({ Tasks, statusFilter, onDelete, onSelect, onUpdate }) => {
	const theme = useTheme();
	const breakpointColumnsObj = {
		default: 5,
		1920: 5, // xl
		1280: 3, // lg
		960: 2, // md
		600: 1, // sm
	};

	return (
		<Box style={{ margin: "5%" }}>
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
		</Box>
	);
};

export default NoteList;
