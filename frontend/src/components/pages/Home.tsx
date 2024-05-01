import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import PictureGrid from "../PictureGrid";

function Home() {
	const [loggedIn] = useState<boolean>(true);

	return (
		<Box>
			<Typography variant="h3" mb={3}>View Images</Typography>

			{loggedIn ? 
				<PictureGrid /> :
				<div>You need to <Link to="/login" style={{ color: "white" }}>login</Link> to view your images.</div>
			}
		</Box>
		
	)
}

export default Home;