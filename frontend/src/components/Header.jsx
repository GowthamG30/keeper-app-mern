import React from "react";
import { Typography, AppBar, Toolbar, useTheme } from "@mui/material";

const Header = () => {
	const theme = useTheme();

	return (
		<AppBar position="fixed" elevation={0} style={{ borderWidth: "0px" }}>
			<Toolbar>
				<Typography
					variant="h4"
					component="div"
					sx={{ flexGrow: 1, textAlign: "left" }}
				>
					Notate
				</Typography>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
