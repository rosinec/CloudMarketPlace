import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

import theme from './utils/theme';
import { LanguageProvider } from './hooks/useTranslation';
import Layout from './components/Layout';
import Routes from './components/Routes';
import { UserProvider } from './hooks/useLoggedInUser';

const App = () => (
	<UserProvider>
		<LanguageProvider>
			<ThemeProvider theme={theme}>
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
