import { FC } from 'react';
import { Switch, Route, Redirect, RouteProps } from 'react-router-dom';

import { useLoggedInUser } from '../hooks/useLoggedInUser';
import AppDetail from '../pages/AppDetail';
import All from '../pages/All';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';

type Props = {
	C: FC;
} & RouteProps;

export const AuthenticatedRoute: FC<Props> = ({ C, ...rest }) => {
	const user = useLoggedInUser();
	return (
		<Route
			{...rest}
			render={() => (!user ? <C /> : <Redirect to="/login" />)}
		/>
	);
};

const Routes = () => {
	const user = useLoggedInUser();
	return (
		<Switch>
			<Route
				path="/login"
				exact
				render={() => (!user ? <Login /> : <Redirect to="/" />)}
			/>
			<Route component={All} exact path="/" />
			<AuthenticatedRoute C={AppDetail} exact path="/apps/:name" />
			<Route component={NotFound} />
		</Switch>
	);
};
export default Routes;
