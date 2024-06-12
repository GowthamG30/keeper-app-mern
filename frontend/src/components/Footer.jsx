import React from "react";
import { Typography, Container } from "@mui/material";

const Footer = () => {
	const date = new Date();
	return (
		<Container maxWidth="sm" style={{ marginTop: "20px" }}>
			<Typography variant="body2" align="center" color="textSecondary">
				Copyright © {date.getFullYear()} Notate
			</Typography>
		</Container>
	);
};

export default Footer;
