import { createContext, FC, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';

import { onAuthChanged } from '../utils/firebase';

type Users = User | null;
const UserContext = createContext<Users>(undefined as never);

export const UserProvider: FC = ({ children }) => {
	// We can improve this by saving and loading the initial state from local storage
	const [user, setUser] = useState<Users>(null);
	// Setup onAuthChanged once when component is mounted
	useEffect(() => {
		onAuthChanged(u => setUser(u));
	}, []);
	return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useLoggedInUser = () => useContext(UserContext);
