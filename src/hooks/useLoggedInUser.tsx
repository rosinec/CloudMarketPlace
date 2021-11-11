import { createContext, FC, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';

import { onAuthChanged } from '../utils/firebase';

const UserContext = createContext<User | null>(null);

export const UserProvider: FC = ({ children }) => {
	// We can improve this by saving and loading the initial state from local storage
	const [userState, setUserState] = useState<User | null>(null);
	// Setup onAuthChanged once when component is mounted
	useEffect(() => {
		onAuthChanged(u => setUserState(u));
	}, []);
	return (
		<UserContext.Provider value={userState}>{children}</UserContext.Provider>
	);
};

export const useLoggedInUser = () => useContext(UserContext);
