import { createContext, FC, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { onSnapshot } from 'firebase/firestore';

import { UserData, usersCollection, onAuthChanged } from '../utils/firebase';

type CustomUser = (User & UserData) | null;
type Users = User | null;
const UserContext = createContext<[CustomUser, boolean]>(undefined as never);

export const UserProvider: FC = ({ children }) => {
	// We can improve this by saving and loading the initial state from local storage
	const [user, setUser] = useState<Users>(null);
	const [loading, setLoading] = useState<boolean>(false);

	const [userData, setUserData] = useState<UserData>();

	// Setup onAuthChanged once when component is mounted
	useEffect(() => {
		onAuthChanged(u => {
			setLoading(true);
			setUser(u);
			console.log(u);

			const unsubscribe = onSnapshot(usersCollection, snapshot => {
				setUserData(
					snapshot.docs.find(data => data.id === user?.email)?.data()
				);
				setLoading(false);
			});
			return () => {
				unsubscribe();
			};
		});
	}, [user]);

	console.log(user);

	return (
		<UserContext.Provider
			value={[user ? ({ ...user, ...userData } as CustomUser) : null, loading]}
		>
			{children}
		</UserContext.Provider>
	);
};

export const useLoggedInUser = () => {
	const [user] = useContext(UserContext);
	return user;
};

export const useUsersLoading = () => {
	const [, loading] = useContext(UserContext);
	return loading;
};
