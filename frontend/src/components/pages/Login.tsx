import { Box, Button, Stack, TextField, Typography } from "@mui/material";

function Login() {
	return (
		<Box component="form" maxWidth={450} noValidate>
			<Typography variant="h3" mb={3}>Login</Typography>
			<Stack spacing={2}>
				<TextField id="username" label="Username" variant="outlined" />
				<TextField id="password" label="Password" variant="outlined" />
				<Button variant="contained">Login</Button>
			</Stack>
			
		</Box>
	)
}

export default Login;