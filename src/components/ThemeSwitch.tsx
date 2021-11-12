import { FC, useCallback, useMemo } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material';

import { useTheme } from '../hooks/useTheme';
import { useTranslation } from '../hooks/useTranslation';

const ThemeButton: FC = () => {
	const t = useTranslation();
	const [mode, setMode] = useTheme();
	const isDark = useMemo(() => mode === 'dark', [mode]);
	const changeMode = useCallback((dark: boolean) => {
		setMode(dark ? 'light' : 'dark');
	}, []);
	return (
		<Tooltip title={isDark ? t('theme.light') : t('theme.dark')}>
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
