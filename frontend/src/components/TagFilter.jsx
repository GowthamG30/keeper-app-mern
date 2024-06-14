import React from "react";
import { Box, Chip, useTheme, useMediaQuery } from "@mui/material";

const TagFilter = ({ tags, selectedTags, onToggleTag }) => {
	const theme = useTheme();
	const isScreenSmall = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<Box
			mb={2}
			mt={2}
			ml={isScreenSmall ? "1%" : "auto"}
			mr={isScreenSmall ? "1%" : "5%"}
			display="flex"
			flexWrap="wrap"
			justifyContent={isScreenSmall ? "center" : "flex-end"}
			gap={1}
		>
			{tags.map((tag) => (
				<Chip
					key={tag}
					label={tag}
					clickable
					color={selectedTags.includes(tag) ? "secondary" : "default"}
					onClick={() => onToggleTag(tag)}
				/>
			))}
		</Box>
	);
};

export default TagFilter;
