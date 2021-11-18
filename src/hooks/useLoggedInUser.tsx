import { createContext, FC, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { getDoc } from 'firebase/firestore';

import { adminsDocument, onAuthChanged } from '../utils/firebase';

type CustomUser = (User & { isAdmin: boolean }) | null;
type Users = User | null;
const UserContext = createContext<CustomUser>(undefined as never);

export const UserProvider: FC = ({ children }) => {
	// We can improve this by saving and loading the initial state from local storage
	const [user, setUser] = useState<Users>(null);
	const [isAdmin, setIsAdmin] = useState<boolean>(false);
	// Setup onAuthChanged once when component is mounted
	useEffect(() => {
		onAuthChanged(u => {
			setUser(u);
			getDoc(adminsDocument(String(u?.email))).then(data =>
				setIsAdmin(data.exists())
			);
		});
	}, []);

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
