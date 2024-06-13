import React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

const StatusFilter = ({ statusFilter, onSelect }) => {
	const theme = useTheme();
	const isScreenSmall = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<Box
			mb={2}
			mt={2}
			ml={isScreenSmall ? "1%" : "auto"}
			mr={isScreenSmall ? "1%" : "5%"}
			display="flex"
			justifyContent={isScreenSmall ? "center" : "flex-end"}
		>
			<FormControl
				variant="outlined"
				style={{
					minWidth: isScreenSmall ? "75%" : "200px",
					maxWidth: isScreenSmall ? "75%" : "200px",
				}}
			>
				<Select
					value={statusFilter}
					onChange={(event) => onSelect(event.target.value)}
					displayEmpty
					MenuProps={{
						anchorOrigin: {
							vertical: "bottom",
							horizontal: "right",
						},
						transformOrigin: {
							vertical: "top",
							horizontal: "right",
						},
						PaperProps: {
							style: {
								backgroundColor: theme.palette.background.paper,
								color: theme.palette.text.primary,
							},
						},
					}}
				>
					<MenuItem value="All">All</MenuItem>
					<MenuItem value="To Do">To Do</MenuItem>
					<MenuItem value="In Progress">In Progress</MenuItem>
					<MenuItem value="Done">Done</MenuItem>
				</Select>
			</FormControl>
		</Box>
	);
};

export default StatusFilter;
