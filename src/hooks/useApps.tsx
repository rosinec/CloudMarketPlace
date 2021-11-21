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

type ThemeState = [App[], Dispatch<SetStateAction<App[]>>];

export const AppContext = createContext<ThemeState>(undefined as never);

export const AppProvider: FC = ({ children }) => {
	const [apps, setApps] = useState<App[]>([]);

	useEffect(() => {
		const unsubscribe = onSnapshot(appsCollection, snapshot => {
			setApps(snapshot.docs.map(doc => doc.data()));
		});
		return () => {
			unsubscribe();
		};
	}, []);
	return (
		<AppContext.Provider value={[apps, setApps]}>
			{children}
		</AppContext.Provider>
	);
};

export const useApp = () => useContext(AppContext);

export const useAppByName = (name: string) => {
	const [apps] = useContext(AppContext);
	return apps.find(app => app.name === name) ?? apps[0];
};
