import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Home() {
	return (
		<Box>
			<Typography variant="h3" mb={3}>View Images</Typography>
			<div>You need to <Link to="/login" style={{ color: "white" }}>login</Link> to view your images.</div>
		</Box>
		
	)
}

export default Home;