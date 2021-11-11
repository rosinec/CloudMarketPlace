import { FC, useCallback } from 'react';
import { Switch } from '@mui/material';

import { useTheme } from '../hooks/useTheme';

const ThemeButton: FC = () => {
	const [_, setMode] = useTheme();
	const handleThemeChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const { checked } = event.target;
			setMode(checked ? 'light' : 'dark');
		},
		[]
	);
	return <Switch defaultChecked color="default" onChange={handleThemeChange} />;
};

export default ThemeButton;
