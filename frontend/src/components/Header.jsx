import React from "react";
import {
	Typography,
	AppBar,
	Toolbar,
	useTheme,
	useMediaQuery,
} from "@mui/material";

const Header = () => {
	const theme = useTheme();
	const isScreenSmall = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<AppBar position="fixed" elevation={0} style={{ borderWidth: "0px" }}>
			<Toolbar>
				<Typography
					variant={isScreenSmall ? "h4" : "h4"}
					component="div"
					sx={{ flexGrow: 1, textAlign: isScreenSmall ? "center" : "left" }}
				>
					Notate
				</Typography>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
