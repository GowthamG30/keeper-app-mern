import React, { useState } from "react";
import Note from "./Note";
import { Box } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import Masonry from "react-masonry-css";
import TagFilter from "./TagFilter";

const NoteList = ({ Tasks, onDelete, onSelect, onUpdate }) => {
	const theme = useTheme();
	const [selectedTags, setSelectedTags] = useState(["All"]);

	const handleToggleTag = (tag) => {
		if (tag === "All") {
			setSelectedTags(["All"]);
		} else {
			setSelectedTags((prev) =>
				prev.includes(tag)
					? prev.filter((t) => t !== tag) // remove if it's already there
					: [...prev.filter((t) => t !== "All"), tag] // add everything except "All" and then add that specific tag
			);
		}
	};

	const filteredTasks = Tasks.filter(
		(task) =>
			selectedTags.includes("All") || selectedTags.includes(task.noteStatus)
	);

	const tags = ["All", "To Do", "In Progress", "Done"];

	const breakpointColumnsObj = {
		default: 5,
		1920: 5, // xl
		1280: 3, // lg
		960: 2, // md
		600: 1, // sm
	};

	return (
		<>
			<TagFilter
				tags={tags}
				selectedTags={selectedTags}
				onToggleTag={handleToggleTag}
			/>
			<Box style={{ margin: "5%" }}>
				<Masonry
					breakpointCols={breakpointColumnsObj}
					className="my-masonry-grid"
					columnClassName="my-masonry-grid_column"
					style={{ display: "flex", justifyContent: "center" }}
				>
					{filteredTasks.map((task) => (
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
		</>
	);
};

export default NoteList;
