import { CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

import { LanguageProvider } from './hooks/useTranslation';
import Layout from './components/Layout';
import Routes from './components/Routes';
import { UserProvider } from './hooks/useLoggedInUser';
import { ThemeProvider } from './hooks/useTheme';

const App = () => (
	<UserProvider>
		<LanguageProvider>
			<ThemeProvider>
				<BrowserRouter>
					<CssBaseline />
					<Layout>
						<Routes />
					</Layout>
				</BrowserRouter>
			</ThemeProvider>
		</LanguageProvider>
	</UserProvider>
);

export default App;
