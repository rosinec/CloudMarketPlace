import {
	createContext,
	FC,
	useContext,
	useEffect,
	useMemo,
	useState
} from 'react';
import { User } from 'firebase/auth';
import { onSnapshot } from 'firebase/firestore';

import { Admin, adminsCollection, onAuthChanged } from '../utils/firebase';

type CustomUser = (User & { isAdmin: boolean }) | null;
type Users = User | null;
const UserContext = createContext<[CustomUser, boolean]>(undefined as never);

export const UserProvider: FC = ({ children }) => {
	// We can improve this by saving and loading the initial state from local storage
	const [user, setUser] = useState<Users>(null);
	const [loading, setLoading] = useState<boolean>(false);

	const [adminIds, setAdminIds] = useState<Admin[]>([]);
	const isAdmin = useMemo(
		() => !!adminIds.find(adminId => adminId === user?.email),
		[user, adminIds]
	);

	useEffect(() => {
		setLoading(true);
		const unsubscribe = onSnapshot(adminsCollection, snapshot => {
			setAdminIds(snapshot.docs.map(data => data.id));
			setLoading(false);
		});
		return () => {
			unsubscribe();
		};
	}, []);

	// Setup onAuthChanged once when component is mounted
	useEffect(() => {
		onAuthChanged(u => setUser(u));
	}, []);

	return (
		<UserContext.Provider
			value={[user ? ({ ...user, isAdmin } as CustomUser) : null, loading]}
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
