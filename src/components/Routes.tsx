import { Switch, Route } from 'react-router-dom';

import { useLoggedInUser } from '../hooks/useLoggedInUser';
import Home from '../pages/Home';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';

const Routes = () => {
	const [user] = useLoggedInUser();
	return (
		<Switch>
			<Route path="/" exact component={Home} />
			{!user && <Route path="/login" exact component={Login} />}
			<Route component={NotFound} />
		</Switch>
	);
};
export default Routes;
