import { CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

import { LanguageProvider } from './hooks/useTranslation';
import Layout from './components/Layout';
import Routes from './components/Routes';
import { UserProvider } from './hooks/useLoggedInUser';
import { ThemeProvider } from './hooks/useTheme';
import { AppProvider } from './hooks/useApps';
import { FilterDrawerProvider } from './hooks/useFilterDrawer';
import { CategoryProvider } from './hooks/useCategory';

const App = () => (
	<UserProvider>
		<LanguageProvider>
			<ThemeProvider>
				<AppProvider>
					<CategoryProvider>
						<FilterDrawerProvider>
							<BrowserRouter>
								<CssBaseline />
								<Layout>
									<Routes />
								</Layout>
							</BrowserRouter>
						</FilterDrawerProvider>
					</CategoryProvider>
				</AppProvider>
			</ThemeProvider>
		</LanguageProvider>
	</UserProvider>
);

export default App;
