import { FC, useCallback, useMemo } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material';

import { useTheme } from '../hooks/useTheme';

const ThemeButton: FC = () => {
	const [mode, setMode] = useTheme();
	const isDark = useMemo(() => mode === 'dark', [mode]);
	const changeMode = useCallback((dark: boolean) => {
		setMode(dark ? 'light' : 'dark');
	}, []);
	return (
		<Tooltip title={isDark ? 'Light Mode' : 'Dark Mode'}>
			<IconButton size="large" onClick={() => changeMode(isDark)}>
				{isDark ? (
					<LightMode fontSize="inherit" />
				) : (
					<DarkMode fontSize="inherit" />
				)}
			</IconButton>
		</Tooltip>
	);
};

export default ThemeButton;
