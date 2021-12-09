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

import { Category, categoryCollection } from '../utils/firebase';

type ThemeState = [Category[], Dispatch<SetStateAction<Category[]>>, boolean];

export const CategoryContext = createContext<ThemeState>(undefined as never);

export const CategoryProvider: FC = ({ children }) => {
	const [categories, setCategories] = useState<Category[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		setLoading(true);
		const unsubscribe = onSnapshot(categoryCollection, snapshot => {
			setCategories(snapshot.docs.map(doc => doc.data()));
			setLoading(false);
		});
		return () => {
			unsubscribe();
		};
	}, []);
	return (
		<CategoryContext.Provider value={[categories, setCategories, loading]}>
			{children}
		</CategoryContext.Provider>
	);
};

export const useCategory = () => useContext(CategoryContext);

export const useCategoryLoading = () => {
	const [, , loading] = useContext(CategoryContext);
	return loading;
};

export const useCategoryByName = (name: string) => {
	const [categories] = useContext(CategoryContext);
	console.log(categories);
	return categories.find(category => category.name === name) ?? undefined;
};
