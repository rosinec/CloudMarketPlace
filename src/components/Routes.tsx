import { FC } from 'react';
import { Switch, Route, Redirect, RouteProps } from 'react-router-dom';

import { useLoggedInUser } from '../hooks/useLoggedInUser';
import Home from '../pages/Home';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';

type Props = {
	C: () => JSX.Element;
	isLogged: boolean;
} & RouteProps;

const AuthenticatedRoute: FC<Props> = ({ C, isLogged, ...rest }) => (
	<Route
		{...rest}
		render={() => (isLogged ? <C /> : <Redirect to="/login" />)}
	/>
);

const Routes = () => {
	const user = useLoggedInUser();
	const isLogged = user !== null;
	return (
		<Switch>
			{!user && <Route path="/login" exact component={Login} />}
			<AuthenticatedRoute C={Home} isLogged={isLogged} path="/" />

			<Route component={NotFound} />
		</Switch>
	);
};
export default Routes;
