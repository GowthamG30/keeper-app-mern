import React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const StatusFilter = ({ statusFilter, onSelect }) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<Box
			mb={2}
			mt={2}
			ml={isMobile ? 0 : "auto"}
			mr={isMobile ? 0 : 2}
			display="flex"
			justifyContent="flex-end"
		>
			<FormControl
				variant="outlined"
				style={{ minWidth: isMobile ? "100%" : "200px" }}
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
						getContentAnchorEl: null,
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
