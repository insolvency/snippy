import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";

interface PictureGridProps {
	name: string;
	previewUrl: string;
}

function PictureGridCard({ name, previewUrl }: PictureGridProps) {
	return (
		<Card sx={{ width: 320 }}>
			<CardMedia
				sx={{ height: 140 }}
				image={previewUrl}
				title={name}
			/>
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{name}
				</Typography>
			</CardContent>
			<CardActions>
				<Button size="small">Details</Button>
				<Button size="small" color="error">Delete</Button>
			</CardActions>
		</Card>
	);
}

function PictureGrid() {
	return (
		<Grid container spacing={1}>
			<Grid item>
				<PictureGridCard name="IMG_4578.png" previewUrl="https://i.ibb.co/fYsT0jZ/image.png" />
			</Grid>
			<Grid item>
				<PictureGridCard name="IMG_4578.png" previewUrl="https://i.ibb.co/fYsT0jZ/image.png" />
			</Grid>
			<Grid item>
				<PictureGridCard name="IMG_4578.png" previewUrl="https://i.ibb.co/fYsT0jZ/image.png" />
			</Grid>
			<Grid item>
				<PictureGridCard name="IMG_4578.png" previewUrl="https://i.ibb.co/fYsT0jZ/image.png" />
			</Grid>
			<Grid item>
				<PictureGridCard name="IMG_4578.png" previewUrl="https://i.ibb.co/fYsT0jZ/image.png" />
			</Grid>
			<Grid item>
				<PictureGridCard name="IMG_4578.png" previewUrl="https://i.ibb.co/fYsT0jZ/image.png" />
			</Grid>
			<Grid item>
				<PictureGridCard name="IMG_4578.png" previewUrl="https://i.ibb.co/fYsT0jZ/image.png" />
			</Grid>
		</Grid>
	)
}

export default PictureGrid;