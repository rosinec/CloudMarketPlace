import {
	createContext,
	Dispatch,
	FC,
	SetStateAction,
	useContext,
	useEffect,
	useState
} from 'react';
import { onSnapshot } from '@firebase/firestore';

import { App, appsCollection } from '../utils/firebase';

type ThemeState = [App[], Dispatch<SetStateAction<App[]>>, boolean];

export const AppContext = createContext<ThemeState>(undefined as never);

export const AppProvider: FC = ({ children }) => {
	const [apps, setApps] = useState<App[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		setLoading(true);
		const unsubscribe = onSnapshot(appsCollection, snapshot => {
			setApps(snapshot.docs.map(doc => doc.data()));
			setLoading(false);
		});
		return () => {
			unsubscribe();
		};
	}, []);
	return (
		<AppContext.Provider value={[apps, setApps, loading]}>
			{children}
		</AppContext.Provider>
	);
};

export const useApp = () => useContext(AppContext);

export const useAppsLoading = () => {
	const [, , loading] = useContext(AppContext);
	return loading;
};

export const useAppByName = (name: string) => {
	const [apps] = useContext(AppContext);
	return apps.find(app => app.name === name) ?? apps[0];
};
