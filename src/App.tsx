import { CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

import { LanguageProvider } from './hooks/useTranslation';
import Layout from './components/Layout';
import Routes from './components/Routes';
import { UserProvider } from './hooks/useLoggedInUser';
import { ThemeProvider } from './hooks/useTheme';
import { AppProvider } from './hooks/useApps';
import { DrawerProvider } from './hooks/useDrawer';

const App = () => (
	<UserProvider>
		<LanguageProvider>
			<ThemeProvider>
				<AppProvider>
					<DrawerProvider>
						<BrowserRouter>
							<CssBaseline />
							<Layout>
								<Routes />
							</Layout>
						</BrowserRouter>
					</DrawerProvider>
				</AppProvider>
			</ThemeProvider>
		</LanguageProvider>
	</UserProvider>
);

export default App;
