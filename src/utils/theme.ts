import { createTheme } from '@mui/material';

export const theme = (mode: 'light' | 'dark') => {
	const isDark = mode === 'dark';
	return createTheme({
		palette: {
			mode,
			primary: isDark ? { main: '#f2d45c' } : { main: '#1976d2' }
		}
	});
};

export default theme;
