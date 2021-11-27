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
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';

type Props = {
	C: FC;
} & RouteProps;

export const AuthenticatedRoute: FC<Props> = ({ C, ...rest }) => {
	const user = useLoggedInUser();
	const isLogged = user !== null;
	console.log(!user);
	console.log(user !== null);
	return (
		<Route
			{...rest}
			render={() => (isLogged ? <C /> : <Redirect to="/login" />)}
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
			<AuthenticatedRoute C={AppDetail} exact path="/apps/:name" />
			<Route component={NotFound} />
		</Switch>
	);
};
export default Routes;
