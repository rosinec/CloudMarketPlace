import { createContext, FC, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { onSnapshot } from '@firebase/firestore';

import { adminsCollection, onAuthChanged } from '../utils/firebase';

type CustomUser = (User & { isAdmin: boolean }) | null;
type Users = User | null;
const UserContext = createContext<CustomUser>(undefined as never);

export const UserProvider: FC = ({ children }) => {
	// We can improve this by saving and loading the initial state from local storage
	const [user, setUser] = useState<Users>(null);
	const [isAdmin, setIsAdmin] = useState<boolean>(false);
	// Setup onAuthChanged once when component is mounted
	useEffect(() => {
		onAuthChanged(u => setUser(u));
	}, []);

	useEffect(() => {
		// Call onSnapshot() to listen to changes
		const unsubscribe = onSnapshot(adminsCollection, snapshot => {
			// Access .docs property of snapshot
			setIsAdmin(
				!!snapshot.docs
					.map(doc => doc.data())
					.find(admin => admin.uid === user?.uid)
			);
		});
		// Don't forget to unsubscribe from listening to changes
		return () => {
			unsubscribe();
		};
	}, [user]);

	return (
		<UserContext.Provider
			value={
				user ? ({ ...user, isAdmin: isAdmin ?? false } as CustomUser) : null
			}
		>
			{children}
		</UserContext.Provider>
	);
};

export const useLoggedInUser = () => useContext(UserContext);
