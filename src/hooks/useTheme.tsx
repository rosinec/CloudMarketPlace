import {
	createContext,
	Dispatch,
	FC,
	SetStateAction,
	useContext,
	useState
} from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material';

// eslint-disable-next-line import/no-named-as-default
import theme from '../utils/theme';

type Themes = 'light' | 'dark';
type ThemeState = [Themes, Dispatch<SetStateAction<Themes>>];

export const ThemeContext = createContext<ThemeState>(undefined as never);

export const ThemeProvider: FC = ({ children }) => {
	const [mode, setMode] = useState<Themes>('dark');
	return (
		<ThemeContext.Provider value={[mode, setMode]}>
			<MuiThemeProvider theme={theme(mode)}>{children}</MuiThemeProvider>
		</ThemeContext.Provider>
	);
};

export const useTheme = () => useContext(ThemeContext);
