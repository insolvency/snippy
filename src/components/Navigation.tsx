import { AppBar, Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import ImageIcon from '@mui/icons-material/Image';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface NavigationProps {
	children: React.ReactNode;
	drawerWidth: number;
}

interface NavigationDrawerButtonProps {
	icon: React.ReactNode;
	text: string;
}

function NavigationDrawerButton({ icon, text }: NavigationDrawerButtonProps) {
	return (
		<ListItem disablePadding>
			<ListItemButton>
				<ListItemIcon>
					{icon}
				</ListItemIcon>
				<ListItemText primary={text} />
			</ListItemButton>
		</ListItem>
	)
}

function Navigation({ children, drawerWidth }: NavigationProps) {
	return (
		<Box sx={{ display: "flex" }}>
			<AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
				<Toolbar>
					<Typography variant="h6" noWrap component="div">
						Snippy
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer
				variant="permanent"
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					[`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
				}}
			>
				<Toolbar />
				<Box sx={{ overflow: "auto" }}>
					<List>
						<NavigationDrawerButton text="View Images" icon={<ImageIcon />} />
					</List>

					<List sx={{ marginTop: "auto" }}>
						<NavigationDrawerButton text="Login" icon={<AccountCircleIcon />} />
					</List>
				</Box>
			</Drawer>

			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				<Toolbar />
				{children}
			</Box>
		</Box>
	)
}

export default Navigation;