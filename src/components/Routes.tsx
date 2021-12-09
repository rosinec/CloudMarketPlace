import { FC, useEffect } from 'react';
import {
	Switch,
	Route,
	Redirect,
	RouteProps,
	useHistory
} from 'react-router-dom';

import { useLoggedInUser, useUsersLoading } from '../hooks/useLoggedInUser';
import AppDetail from '../pages/AppDetail';
import All from '../pages/All';
import MyApps from '../pages/MyApps';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import AddApp from '../pages/AddApp';
import Trending from '../pages/Trending';

type Props = {
	C: FC;
} & RouteProps;

export const AuthenticatedRoute: FC<Props> = ({ C, ...rest }) => {
	const user = useLoggedInUser();
	const isLogged = user !== null;

	return (
		<Route
			{...rest}
			render={() => (isLogged ? <C /> : <Redirect to="/login" />)}
		/>
	);
};

export const AdminRoute: FC<Props> = ({ C, ...rest }) => {
	const user = useLoggedInUser();
	const isLogged = user !== null;

	return (
		<Route
			{...rest}
			render={() =>
				isLogged && user.isAdmin ? <C /> : <Redirect to="/login" />
			}
		/>
	);
};

const Routes = () => {
	const userLoading = useUsersLoading();
	const user = useLoggedInUser();
	const { push } = useHistory();
	useEffect(() => {
		push('/');
	}, [userLoading]);

	return (
		<Switch>
			{!user && <Route path="/login" exact component={Login} />}
			<Route component={All} exact path="/" />
			<Route component={Trending} exact path="/category/:name" />
			<AdminRoute C={AddApp} exact path="/apps/add" />
			<AuthenticatedRoute C={AppDetail} exact path="/apps/:name" />
			<AuthenticatedRoute C={MyApps} exact path="/myapps/" />
			<Route component={NotFound} />
		</Switch>
	);
};
export default Routes;
