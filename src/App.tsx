import { CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

import { LanguageProvider } from './hooks/useTranslation';
import Layout from './components/Layout';
import Routes from './components/Routes';
import { UserProvider } from './hooks/useLoggedInUser';
import { ThemeProvider } from './hooks/useTheme';
import { AppProvider } from './hooks/useApps';

const App = () => (
	<UserProvider>
		<LanguageProvider>
			<ThemeProvider>
				<AppProvider>
					<BrowserRouter>
						<CssBaseline />
						<Layout>
							<Routes />
						</Layout>
					</BrowserRouter>
				</AppProvider>
			</ThemeProvider>
		</LanguageProvider>
	</UserProvider>
);

export default App;
