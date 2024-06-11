import React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const StatusFilter = ({ statusFilter, onSelect }) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<FormControl
			variant="outlined"
			style={{ minWidth: isMobile ? "100%" : "200px" }}
		>
			<Select
				value={statusFilter}
				onChange={(event) => onSelect(event.target.value)}
				displayEmpty
			>
				<MenuItem value="All">All</MenuItem>
				<MenuItem value="To Do">To Do</MenuItem>
				<MenuItem value="In Progress">In Progress</MenuItem>
				<MenuItem value="Done">Done</MenuItem>
			</Select>
		</FormControl>
	);
};

export default StatusFilter;
