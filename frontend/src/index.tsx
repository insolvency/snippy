import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from './components/pages/Root';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/login",
				element: <Login />,
			},
		],
	},
]);

const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});

const root = ReactDOM.createRoot(
  	document.getElementById('root') as HTMLElement
);

root.render(
	<React.StrictMode>
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<RouterProvider router={router} />
		</ThemeProvider>
	</React.StrictMode>
);